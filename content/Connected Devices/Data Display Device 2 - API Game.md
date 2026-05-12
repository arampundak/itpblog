Teaching RESTful APIs Through Play

_Aram Pundak & Fabrizio Guccione_  
_Connected Devices, Spring 2026_

## What It Is
The API Game Fabri and I created is an tiny-arcade-style educational device that teaches people about RESTful API methods through hands-on play. Players hold an ESP32-based handheld controller with a color screen and joystick, choose HTTP verbs (GET, POST, PUT, DELETE) in response to prompts, and watch their actions execute against a live Google Calendar displayed on a big screen beside them. Each button press fires a real API call - when you pick DELETE, an event actually disappears from the calendar. The goal is to score points by choosing the correct verb for each task, but wrong choices execute too, creating real consequences that help players understand what each HTTP method actually does.

## The Problem We Wanted to Solve
Coming into this project, Fabri and I kept talking about how API calls are doing so much invisible work to make the internet what it is (a reminder to what sparks imagination of many creators nowadays - the [[Invisibility of interfaces and infrastructures]]), but most people don't really understand what's happening when they click "add to cart" or "delete message." We wanted to make that visible and tangible, to take something abstract we learned about in class - REST APIs and turn it into something one could physically interact with and immediately see the results of. Our device idea was meta in a way: we weren't trying to show and celebrate a specific API, we were trying to teach (ourselves &) people what APIs are through a game format. I think that ambition was both the strength and the weakness of this project, which I'll get into more later.

## How It Works for the Player
A full play session takes about 90 seconds and has three phases:

**1. Name Entry (10-15 seconds)**  
You use the joystick to scroll through the alphabet (up/down), pressing the button to lock in each letter of your 3-character arcade name. After finishing the [[Device Project 3.4 - Documentation]], we wanted to have a better game interface, this part was inspired by classic arcade games where you'd enter your initials for the leaderboard.

**2. Tutorial (15-20 seconds)**  
Four scripted prompts walk you through each HTTP verb one at a time: "Refresh calendar" (GET), "Add an event" (POST), "Update an event" (PUT), "Remove an event" (DELETE). You have to press the right verb to advance: pressing the wrong one does nothing. During this phase, the Python agent running on our server is also seeding the dummy Google Calendar with 3-5 events in the background, so there's actually something to work with when the timed round starts. We learned the hard way that if the first random task is DELETE and the calendar is empty, you get an error code instead of points.

**3. Timed Round (60 seconds)**  
This is the actual game. Prompts appear on the handheld screen one after another: "Add an event," "Remove an event," "Update an event," "Refresh calendar." You move a little character sprite with the joystick toward one of four verb boxes (GET, POST, PUT, DELETE) and press the button to fire the call. Every single action hits the real Google Calendar API - there's no simulation happening. You get +3 points for the correct verb and -2 for the wrong one. The wrong action still executes though, and that's on purpose. If you accidentally DELETE when you should have POST'd, that event is actually gone from the calendar. Your score can go negative.

**4. Results & Replay**  
Your final score goes up on the leaderboard. The handheld shows "PLAY AGAIN?" with a 10-second countdown. If you press the button you get another round with the same name (score resets, tutorial skipped). If you wait, it goes back to idle mode and the next person can walk up.

## The Big Screen
While someone's playing, there's a second screen showing everything happening on the Google Calendar in real time. We wanted bystanders to see the cause and effect - when a player presses DELETE, the event should visibly disappear from the calendar view.

The display has three main sections:

- **Left side (most of the screen):** A rendered calendar view showing actual events from the Google Calendar. Events appear, change titles, and disappear as the player makes API calls.
- **Right column:** A scrolling live log of API requests. Each entry shows the HTTP method, the endpoint path, and the status code, color-coded by verb (green for POST, orange for PUT, red for DELETE, blue for GET).
- **Bottom strip:** Leaderboard showing the top 10 scores.

The big screen is all vanilla HTML, CSS, and JavaScript. It connects to our backend via WebSocket and just renders whatever state gets pushed to it. We initially considered just embedding the actual Google Calendar page, but the refresh isn't immediate enough to feel responsive to player actions.

## The Hardware - Handheld Controller

The controller is built around an ESP32 DevKit connected to a 2.2" ILI9341 TFT display (320x240 pixels, SPI, running in landscape orientation), an analog 2-axis joystick with its own click button, and a separate tactile action button for firing actions.
I had a pleasure getting to know these hardware pieces, and I feel more confident tinkering with them.

The display uses the `TFT_eSPI` library with rotation 1 for landscape. The joystick center reads around 2048 on the ADC (out of 4096), and we needed a deadzone of 500 to prevent drift - without that, the sprite would slowly wander on its own even when you weren't touching the joystick.

## System Architecture: How Everything Connects

This was the part where I wish I'd invested more time understanding it deeply while we were building it, instead of learning it retrospectively. But here's how the four main pieces talk to each other:

```
ESP32 + ILI9341 + joystick + button (handheld)
    │
    │  MQTT over TLS (port 8883)
    ▼
Mosquitto broker (on DigitalOcean droplet — tinydrop.win)
    │
    ▼
Python agent (on same droplet)
    ├── Google Calendar API (OAuth2, refresh token on server only)
    ├── SQLite leaderboard
    └── Game state machine (task generation, scoring, session flow)
    │
    ▼
FastAPI + WebSocket server (same droplet, port 8010)
    │
    │  WSS via Nginx reverse proxy at /apigame/
    ▼
Big screen browser (Chromium kiosk on mini PC → HDMI → monitor)
```

The ESP32 connects to the Mosquitto MQTT broker over [[TLS]] at `mqtt.tinydrop.win:8883`. The Python agent sits on the same [[Droplet]] and subscribes locally on `127.0.0.1:1883` (no TLS needed since it's on the same machine). Everything uses the `apigame/` topic prefix so it doesn't collide with the [[Tinydrop]] project that's already running on the same server.

The [[OAuth2]] refresh token for the Google Calendar never touches the ESP32 - it stays on the droplet in a `.env` file. The agent does all the token management and API calls server-side, which was a design choice to keep the sensitive credentials off the handheld device.

### Data Flow for a Single Player Action

When a player presses the button, here's what happens:

1. Player moves sprite to POST box and presses the action button
2. ESP32 publishes `{"verb":"POST"}` to `apigame/device/handheld-01/action` via MQTT
3. Mosquitto routes the message to the Python agent
4. Agent checks if POST is the correct answer → scores it (+3 or -2)
5. Agent calls `events().insert()` on the Google Calendar API
6. Agent publishes the result (score, HTTP status code) back to ESP32 via MQTT
7. Agent publishes the full calendar state + last request via MQTT
8. FastAPI web server picks up the state message and pushes it over WebSocket
9. Big screen browser receives the WebSocket message and re-renders calendar + log

The whole round-trip from button press to both screens updating takes about 150-300ms depending on how fast Google's API responds.

## The API - Google Calendar

We're using Google Calendar API v3 through the `google-api-python-client` SDK (Software Development Kit). Authentication is [[OAuth2]] with a refresh token (scope: `calendar.events`) - the calendar is just a dummy Google account we created for this project.

### Operations Mapped to HTTP Verbs

|Game Verb|What Happens|Calendar API Call|HTTP Method on the Wire|
|---|---|---|---|
|GET|"Refresh calendar"|`events().list()`|GET|
|POST|"Add an event"|`events().insert()`|POST|
|PUT|"Update an event"|`events().patch()`|PATCH*|
|DELETE|"Remove an event"|`events().delete()`|DELETE|

A note on PUT vs PATCH: We labeled this as PUT in the game UI for clean four-verb symmetry, but the actual implementation uses PATCH because Google Calendar's PUT requires full resource replacement. We made this choice deliberately - we thought learning the most common REST terminology was more useful for beginners than getting into the PATCH/PUT nuances. But it still bugs me a little that we're not being technically precise here.

### What the API Gives Us

When we call `events().list()`, we get back a list of event objects with fields like `id`, `summary` (the event title), `start.dateTime`, and `end.dateTime`. The agent keeps an in-memory list of current event IDs so it can pick random targets for PUT and DELETE operations.

For POST (insert), the agent generates a random event with a title pulled from a pool ("Coffee with Sam," "Dentist," "Standup," "Lunch meeting," "Team sync," "1:1 with Jordan," "Code review," "Design crit," "Office hours," "Workshop") and a random time offset from now.

The calendar resets between players: on each new session the agent wipes everything and seeds 3 fresh events.

## Why MQTT Instead of HTTP for the Controller

We went with MQTT instead of having the ESP32 make direct HTTP requests to our server. The reasons:

- MQTT keeps a persistent connection, so there's no connection overhead per action
- Pub/sub means the agent can push tasks and results to the device, so the device doesn't have to poll
- Message sizes are tiny (under 500 bytes of JSON) and PubSubClient handles them fine with a 512-byte buffer
- TLS on port 8883 was already configured on the Mosquitto broker from the tinydrop project, so we could reuse the same cert and user credentials

Getting TLS working from the ESP32 was the painful part of MQTT. Embedding the Let's Encrypt root cert in the firmware and making `WiFiClientSecure` actually accept it was a fight. But once it was working, it never dropped.

---
## What I Learned - The Hard Parts

This is the section I've been dreading writing, because it requires me to be honest about how this project went. I'm going to split this into two parts: the technical challenges we solved, and the process challenges I didn't handle well.

### Technical Challenges We Tackled

**Display Performance**  
The ILI9341 over SPI can be really slow if you redraw the entire screen every frame. We had to optimize to only redraw the parts that actually changed (score, timer, task text, response row) instead of clearing the whole screen every loop. At 40MHz SPI frequency it runs smoothly enough at about 30 FPS for the sprite animation. This was one area where I actually got my hands dirty debugging frame rates and timing.

**Joystick Calibration**  
The analog readings from the joystick needed that big deadzone I mentioned earlier (500 out of 4096 ADC range). Without it, tiny voltage fluctuations would make the sprite drift. This felt like one of those hardware realities you can't learn from reading documentation - you have to see it happening and measure it yourself.

**TLS Handshake**  
Getting the ESP32 to successfully complete a TLS handshake with Mosquitto took way longer than it should have. Certificate validation kept failing until we figured out the exact format the ESP32 needed for the Let's Encrypt root cert. Fabri spent a lot of time on this, and I helped debug by watching the serial monitor output. This is where I started to realize how much invisible infrastructure work goes into making "secure" connections actually secure.

**Empty Calendar Edge Case**  
If the calendar ends up empty mid-round (because someone deleted everything), the agent has to catch the 404s and force the next task to POST so there's something to work with again. This was the kind of edge case that only shows up when you're actually playing the game, not when you're planning it.

### Process Challenges - Where I Fell Short

Here's the harder part to write: I don't think I learned as much from this project as I should have.

Fabri and I scoped this project too ambitiously. We wanted to build something impressive and meaningful: a complete system with firmware, backend, database, WebSockets, API integration, and a polished UI. And we did build that. But in the process, we divided the work in a way that let me avoid really understanding large parts of it.

Fabri took most of the Python backend - the MQTT-to-Calendar bridge, the game state machine, the scoring logic. I focused more on the ESP32 firmware side and the physical interface. That division made sense for getting things done, but it meant I never had to work through the server-side logic myself. I can explain what the system does now, but if you asked me to rebuild the Python agent from scratch, I'd struggle. I relied too much on Claude to scaffold things and not enough on my own understanding.

This course pushed me way out of my comfort zone, and I learned a ton about network literacy, connectivity protocols, MQTT pub/sub patterns, REST API semantics, and how devices actually talk to the internet. But I also took shortcuts. I didn't invest enough time "hard coding" these concepts into myself by writing them from scratch and debugging them deeply. I feel a bit ashamed about that, even though I know it's a normal part of learning and it's okay to not master everything in one semester.

If I were doing this again, I'd scope smaller and go deeper. Maybe just the handheld controller and a simple server endpoint, but I'd make sure I understood every single line of code I wrote. That would have been more valuable than building something that looks complete but leaves gaps in my understanding.

### Google Calendar API - Strengths and Weaknesses

**Strengths:**

- The Python SDK handles token refresh automatically, so once you build credentials from the refresh token, you can forget about it. The API is also fast - most calls come back in under 200ms.
- The events resource is straightforward: list, insert, patch, delete all do what you expect.
- Seeing the calendar actually change when you press a button feels really good. That immediate visual feedback is what makes the whole game work. The API being fast and reliable is crucial for that.

**Weaknesses:**

- OAuth2 setup is a pain for a project like this. Creating the GCP project, enabling the API, getting the OAuth credentials working - that part was manageable. The annoying part was the "unverified app" warning and the refresh token expiring after 7 days if you're in Testing mode. All that ceremony for a demo project felt like overkill.
- The PUT vs PATCH thing I mentioned earlier forced us to simplify our terminology. Google Calendar doesn't have a clean PUT endpoint for events that does what most people think PUT does. Their "update" method is actually PATCH semantics. I think we made the right call hiding that complexity from players, but it still bothers me that we're not being technically precise.
- If you're building a real production system with this API, you'd need to think hard about quota management. For our use case it was fine, but I can see how it would become a problem at scale.

## How We Used Claude

I want to be transparent about the role AI tools played in this project, because I think it's relevant to my learning process.

We used Claude pretty heavily throughout. A lot of the firmware modules (display rendering, MQTT client, game UI, input handling) were scaffolded with Claude and then adjusted to work with our specific hardware. Same for the Python agent, the MQTT-to-Calendar bridge, the task engine state machine, and the scoring logic were all structured with Claude's help. The most useful thing was debugging the TLS handshake between the ESP32 and the Mosquitto broker, that would have taken way longer to figure out without it.

The FastAPI WebSocket relay and the big screen JavaScript were also Claude-assisted. Basically, Claude was like having a very knowledgeable pair programmer who could quickly give you working code for common patterns.

That said, we had to go back and understand what was generated pretty thoroughly. There were edge cases Claude didn't handle (like what happens when the calendar is empty mid-round, or the joystick deadzone calibration) that we had to fix ourselves. Claude is a tool, not a replacement for knowing what's going on.

My main takeaway is that using AI to write code is incredibly powerful for prototyping, but it can also create a false sense of understanding. If you're not careful, you end up with a working system that you don't fully understand. That's what happened to me on parts of this project, and it's something I want to be more conscious of going forward.

## Sources and References

- Adeniya Adenike, ["Understanding APIs: A Restaurant Analogy for Product Managers"](https://adeniyaadenike.medium.com/understanding-apis-a-restaurant-analogy-for-product-managers-837821281853) — the article that gave us the restaurant/API game idea
- [Overcooked](https://ghosttowngames.com/game/overcooked/) by Ghost Town Games — the game that inspired our main game loop
- [Overcooked-AI](https://github.com/HumanCompatibleAI/overcooked_ai) — open-source Overcooked implementation we looked at for game layout ideas
- [TFT_eSPI library](https://github.com/Bodmer/TFT_eSPI) by Bodmer — display driver for the ILI9341
- [PubSubClient](https://github.com/knolleary/pubsubclient) by Nick O'Leary — MQTT client for Arduino/ESP32
- [ArduinoJson](https://github.com/bblanchon/ArduinoJson) by Benoit Blanchon — JSON parsing on ESP32
- [Google Calendar API documentation](https://developers.google.com/calendar/api/v3/reference) — reference for events resource, OAuth2 flow
- [Using TFT_eSPI with VS Code and PlatformIO](https://www.instructables.com/Using-TFTeSPI-Library-With-Visual-Studio-Code-and-/) — setup guide for the display library
- Arduino forum: [shooter game for ST7735/ST77xx TFT](https://forum.arduino.cc/t/new-shooter-game-for-st7735-st77xx-tft/1300256) — reference for TFT game rendering patterns
- [arduino-lcd-keypad-shield-games](https://github.com/dadecoza/arduino-lcd-keypad-shield-games) — looked at for small-screen game UI patterns
- YouTube tutorials on ESP32 TFT games: [link 1](https://www.youtube.com/watch?v=mam9-iFeFJk), [link 2](https://www.youtube.com/watch?v=hCa8F8fbHLQ), [link 3](https://www.youtube.com/watch?v=SqxVIVnzkR0)
- [esp-kmeans](https://github.com/johpro/esp-kmeans) — k-means clustering on ESP32, referenced from prior HUE project work
- Claude (Anthropic) — used extensively for firmware modules, Python agent structure, and debugging MQTT/TLS
- Tom Igoe's Connected Devices class at ITP/NYU — course framework and assignment spec
- Fabrizio Guccione — project partner who handled most of the backend implementation
- [Project GitHub Repository](https://github.com/FabriGu/apiGame) — all source code and documentation

---

_This project was created for Connected Devices (Spring 2026) at NYU ITP, taught by Tom Igoe._