>**Device Project 3: Data Display Device**
This is your final. Due in week 14. Work alone or in groups of two or three on this.
The goal with this assignment is to display information from a web API in physical form that is readable, useful, and that works aestehtically in the space which it lives. The technical goal is to strengthen our skills in building devices which read from the internet and communicate those changes in the physical world using HTTP/S REST APIs.
Make a device which reads from a RESTful web API and displays pertinent information in physical form. You may read directly from an existing public RESTful API, or create your own. Your device may also have a physical user interface, or it may be entirely driven by the data it’s receiving. It should also have a web interface for configuring it.
Features
Your device must have the following features:
> - Be able to run for multiple days
> - Read data via HTTP/S and a REST API
> - Display the data in physical form
> - Include physical input to access the system state
> - Physical enclosure, so we are not looking at the electronics, but are looking at the physical interface instead.
> - Means to access a more detailed web-based display and control panel, including the status of the physical device and the value of the controlling data from the API.

202060420

![[condev - restapi ideation arjun style.webp]]
This piece of technology inspired me
https://www.youtube.com/watch?v=LOICNiwDKaE&list=LL&index=6

**REST-API Restaurant - Making Connectivity Visible Through Play**
A handheld game console that teaches API structure through restaurant management gameplay.
![[condev - restapi concept.jpeg]]
## The Journey: From Layers to Restaurants

My first instinct was to map the connection process to the TCP/IP model's four layers:
1. **Link Layer** - WiFi scanning, signal strength
2. **Internet Layer** - IP address assignment, routing
3. **Transport Layer** - TCP handshake, port connections
4. **Application Layer** - HTTP requests, API calls

I imagined each layer as a "world" or "level" in a game - you progress through the network stack to reach your data. The player would be a packet traveling through these layers.
**The problem:** This approach was too focused on the connection process and not enough on what makes APIs unique - their **structure and methods**. I mind was set on showing and explaining the infrastructures that allows us to use the inteernet.

### Exploring Game Mechanics
I looked at simple joystick-based games:
- **Snake** - growing as you collect data
- **Flappy Bird** - dodging network obstacles
- **Vertical scroller** - moving through network space
- **Pac-Man** - navigating network topology
Each had potential for teaching connectivity, but none captured the essence of **constructing API requests**. Additionally I couldn't find one aPI to commit to 

### The Breakthrough: Fabri & Restaurant Analogy

While researching API documentation, Fabri and I found the classic **restaurant analogy for APIs**:
- **Customer** = Client/User (you want data)
- **Kitchen** = Server (where data is stored)
- **Waiter** = API (the intermediary)
- **Menu** = API specification (what you can request)

This led to the realization: **RESTAURANT + API = REST-API** (which happyly relates to RESTful API standards)

And more importantly: **Restaurant management games already exist** - games like Overcooked where you prepare orders, manage time pressure, and serve customers. The mechanics were perfect for teaching API structure.
Overcoocked:
![[condev - overcoocked 2.webp]]

## The Game Concept: REST-API Restaurant

### Core Design (developed with Fabri)
**You are the cook in a restaurant. Customers arrive with orders that must be prepared using the correct HTTP method and sent to the right API endpoint.**
### The Abstraction: Shape + Color = Request

Instead of text-based orders, we use **visual encoding** inspired by the card game SET:

**SHAPE = HTTP METHOD**
- ○ Circle = GET (retrieve data)
- ◇ Diamond = POST (create new)
- □ Square = PUT (update existing)
- △ Triangle = DELETE (remove)

**COLOR = API ENDPOINT**
- 🔴 Red = S&P Stock API
- 🔵 Blue = Philips Hue Lights
- 🟡 Yellow = Weather API
- 🟢 Green = NASA Data
- (More colors = more APIs)
![[condev - game play.jpeg]]

### Gameplay Flow

1. **Customer arrives** with shape + color (blue circle = GET request to Hue API)
2. **Navigate to method station**
    - Use joystick to move to correct shape station
    - Press button to start "cooking" the request
    - Request takes 1-3 seconds to prepare (freeing you to start other orders)
3. **Take prepared request to color zone**
    - Navigate to matching API color zone
    - Press button to "paint" it (this triggers the actual API call)
    - API responds with data
4. **Deliver to customer**
    - Navigate back to customer
    - Customer shows satisfaction + you get points
    - Real-world effect happens (Hue light changes, data displays on screen)
5. **Multiple simultaneous orders**
    - New customers queue up while requests are cooking
    - Time pressure increases
    - Juggling multiple orders = higher score multiplier

### API Selection Strategy

**Why these APIs:**
**Philips Hue (Blue)** - I already built a Hue controller for Device Project 1, so I understand the API structure:
- GET /lights → returns all lights
- PUT /lights/{id}/state → changes light state
- Immediate physical feedback when request succeeds

**Weather API (Yellow)** - Simple, always changing, universal appeal:
- GET only (simpler for early game)
- Shows current conditions, forecasts

**S&P Stock (Red)** - Real-time data that changes during market hours:
- GET current value
- POST to track specific stocks
- Teaches difference between read vs. create operations

**NASA APIs (Green)** - Fun, educational, varied endpoints:
- GET asteroid data
- GET Mars rover photos
- GET astronomy picture of the day

**Some APIs support only certain methods** - this becomes a teaching tool. Weather might only support GET, while Hue supports GET, PUT, POST. The game naturally teaches which operations make sense for different data sources.

![[condev - restapi controler.jpeg]]
### Technical Implementation

**Hardware:**
- XIAO ESP32-C3 (I'm familiar with this from previous projects)
- 400x240 OLED display (high refresh rate for smooth gameplay)
- Analog 2-axis joystick with select button
- Power switch
- Rechargeable battery for multi-day operation

**Form Factor:**
- Handheld game console (Playdate-inspired)
- Chunky, comfortable to hold
- Screen + joystick positioned for one-handed or two-handed play

**Web Control Panel (Brief requirement):**
- Shows device connection status
- Displays API call history and success rate
- Configuration: add new API endpoints, adjust difficulty
- High score leaderboard
- Network configuration interface