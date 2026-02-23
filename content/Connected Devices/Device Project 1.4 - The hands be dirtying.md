Last episode [[Device Project 1.3 - MyMap]] - Tom suggested us to go back to our roots and show we can do our first steps before we're running the marathon. So:

I'm trying to make everything happen with my fingertips so I understand.

1. **Device (ESP32)**
- Reads a button press to operate a WiFi scan
- Sends data over WiFi to computer connected to the same WiFi

2. **Server on laptop (the bridge)**
- Receives the ESP32 data by TCP 
- Makes the latest data available to a browser page.
- Framework: **netcat → log file → simple HTTP server**

3. **Browser dashboard (HTML/CSS/JS)**
- Shows the **current reading** and **recent history**.
- Uses DOM elements (divs, lists, etc).
- Uses responsive layout (works on phone too).
- Pulls data using `fetch()`

---

**What makes your laptop a server?**

1. Turning your laptop into a **TCP server listening on port 8080**
- `nc -klw 2 8080`
- Whatever ESP32 sends → append into `log.json`

1. HTTP Web Server
- `python3 -m http.server` - turns your laptop into a **web server** on port 8000.
- OPEN http://localhost:8000 browser is asking laptop: "Please give me files from this folder." -> data becomes accessible to the webpage.

3. `fetch()` Browser → ask the HTTP server → give me log.json, fetch is reading the file that netcat is writing to.

**How does ESP32 know where to send data?**
`const char serverAddress[] = "10.23.11.145"; int port = 8080;`
That IP address is the laptop’s IP address on the WiFi network.
1. ESP32 connects to WiFi using:
`WiFi.begin(SECRET_SSID, SECRET_PASS);`
Has to be on the same local network as laptop.
2. Open a TCP connection to that IP and port
`client.connect(serverAddress, port);`

| Layer                | Protocol   |
| -------------------- | ---------- |
| ESP32 → laptop       | TCP        |
| laptop → file        | filesystem |
| browser → laptop     | HTTP       |
| browser updates page | DOM        |

---

After understanding the conceptual side I started tinkering with the esp32 and code.

**First part of the assignment - make the esp32 run code sense WiFi**
- Ran code to send json by TCP from esp32 to listening NetCat
- It didn't work - I didn't know what wasn't working, is it the WiFi scan? is it the button?
- I ran a diagnostic code - Serial Monitor showing when button is pressed and listing WiFi's to double check my process before reaching NetCat
- It didn't work
- I looked again at the circuit and at older documentation
- I found the button is not set correctly
I understood the importance of having indicators - **I will add an LED to show a scan has been made**
- Rewrote code with LLM and ==uploaded== it
- ==Pressed== button
It worked!
- IDE serial.port said "button pressed" and "Scan #1 starting..."
Note to self (add LED -> button pressed -> LED blinks red, sent to HTTP shines green)
- ==I got a wifi scan in serial port==
`nc -klw 2 8080` -> `{"scanId":1,"espIp":"0.0.0.0","netCount":16,"networks":[{"ssid":"sandbox370","rssi":-70,"enc":"WPA2"},{"ssid":"frontporch370","rssi":-70,"enc":"WPA2"},{"ssid":"eduroam","rssi":-71,"enc":"WPA2-E"},{"ssid":"nyuguest-legacy","rssi":-71,"enc":"Open"},{"ssid":"nyu-android","rssi":-71,"enc":"WPA2"},{"ssid":"eduroam","rssi":-78,"enc":"WPA2-E"},{"ssid":"nyuguest-legacy","rssi":-78,"enc":"Open"},{"ssid":"nyu-android","rssi":-78,"enc":"WPA2"},{"ssid":"sandbox370","rssi":-78,"enc":"WPA2"},{"ssid":"frontporch370","rssi":-78,"enc":"WPA2"},{"ssid":"eduroam","rssi":-85,"enc":"WPA2-E"},{"ssid":"sandbox370","rssi":-85,"enc":"WPA2"},{"ssid":"nyu-android","rssi":-86,"enc":"WPA2"},{"ssid":"frontporch370","rssi":-86,"enc":"WPA2"},{"ssid":"DIRECT-70362_QL-810W","rssi":-87,"enc":"WPA2"},{"ssid":"nyuguest-legacy","rssi":-87,"enc":"Open"}]}`

![[condev esp32scan_button.webp]]

Then
- ==`^C`== to stop the scan
- ==`cd`== to a specific repository
- ==`nc -klw 2 8080 >> log.ndjson`== - creates a .ndjson in said repository
Created! 
- ==Pressed== button twice more just to see

>Right now the data **lives as a file on laptop** (`log.ndjson`). 
The browser can’t read files directly; it can only request files over **HTTP** from a **web server**.
lets recall:
>2. HTTP Server
>- `python3 -m http.server` - turns your laptop into a **web server** on port 8000.
>- OPEN http://localhost:8000 browser is asking laptop: "Please give me files from this folder." -> data becomes accessible to the webpage.
>- **Web page**: `index.html` opened in the browser.
>- **Dashboard**: that web page + JS that fetches data and updates DOM.
>- **Fetch**: the browser asking the HTTP server for a file (`GET /log.ndjson`).

---

**Second part of the assignment: sending the data from the repository to an HTTP server**
- Got help of LLM to ==write index.html / script.js / style.css==
- In the repository - ==saved said files to live happily together==
- I ==opened 2 terminals==. And `cd`ed my way to the repository
	On terminal A - ==`nc -klw 2 8080 >> log.ndjson`==
	On terminal B - ==python3 -m http.server==
- ==Opened browser== http://localhost:8000 
- ==Pressed Button==
- MAGIC!

![[condev esp32scan_button http.webp]]

![[condev esp32scan_button terminal AandB.webp]]

The folder is acting like “mini server root.”
- `netcat` writes **log.ndjson**
- `python http.server` serves files **from that exact folder**
- The browser fetches `log.ndjson` from that served directory
So:
- A device doesn’t talk to a webpage directly.
- It talks to a server.
- The webpage talks to the server.
- Files on disk become API endpoints when served over HTTP.

```
ESP32  --(TCP)-->  netcat
                    |
                    v
                 log.ndjson (file)
                    |
                    v
Browser --(HTTP fetch)--> python http.server
```

Started looking into [[MQTT]]

---

To do
- Change Device Data Dashboard
- Device diagram - OLED, button, LEDs
- System diagram

How do we assign spatial meaning to each scan?
How do I prevent the visualization from lying?
2 ideas:
1. Device becomes a **WiFi compass** - spatial without coordinates.
Signal-seeking device:
- stronger → move forward
- weaker → move backward

2. Explicit zone selector (cleanest)
- Define 3 anchor spots physically taped on floor.
- The device instructs:
    - “Go to Anchor A”
    - “Press”
    - “Go to Anchor B”
    - “Press”
    - “Go to Anchor C”
    - “Press”

This is a protocol.
The spatial meaning comes from the procedure.
Not from hidden inference.
This makes the system about:
“Measurement ritual.”



