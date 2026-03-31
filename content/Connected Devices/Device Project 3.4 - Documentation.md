## WiFi Rex

### The Idea

A handheld game device that uses the WiFi environment around you as a gameplay mechanic. The stronger the WiFi signal, the easier the game. The weaker it is, the harder. Walk toward a router - game gets easier. Walk away - obstacles grow taller. It turns a physical space into a difficulty curve.

---

### The Hardware

An **Adafruit ESP32 Feather V2** microcontroller with a **1.5" 128×128 grayscale OLED display** wired via I2C. Two buttons are wired to GPIO pins - one for jumping, one for mode switching and power. The whole thing fits in your hand. When you hold the side button for 3 seconds, it deep-sleeps to save power and wakes on button press.

![[condev - device doc 1.webp]]
![[condev - device doc 3.webp]]


---

### The Game

The known and loved T-Rex endless runner from Google Chrome. A pixel dinosaur runs across the screen, tap to jump over cactus obstacles. The twist: obstacle height is calculated directly from WiFi signal strength using a linear map:

```
RSSI -40 dBm (strong) → obstacle height 10px (easy)
RSSI -80 dBm (weak)   → obstacle height 25px (hard)
```

Score builds up over time. Reaching the target score completes the level. Scores are stored locally on the device and uploaded to a leaderboard server over MQTT when you power it off.

---

### The WiFi Scanner

Pressing the side button switches to a scanner mode that continuously scans nearby WiFi networks and displays them ranked by signal strength. The strongest network becomes the "level", its RSSI sets the game difficulty when you switch back. You can "mark" a specific network to track it: the display shows whether you're getting closer or farther in real time.

The scanning runs asynchronously (non-blocking) so the game physics and display never freeze while channels are being scanned.
![[condev - device doc 2.webp]]
![[condev - device doc 4.webp]]


---

### The Data Collection: Column Scans

The core research use-case: mapping WiFi signal strength across physical space. You walk to a specific position in a building (in our case the columns spread across the ITP floor), press the front button, and the device:

1. Does a fresh WiFi scan capturing every visible access point — SSID, BSSID, RSSI, channel, encryption type
2. Connects to your WiFi network
3. Connects to an MQTT broker (tigoe.net)
4. Syncs the clock via NTP to get an accurate Unix timestamp
5. Publishes a single JSON message (`wifirex/scan_batch`) containing all detected networks plus metadata: player name, scan number, event ID, timestamp

Each boot of the device generates a random 3-character player name (like `MPC` or `C6Q`). This acts as a session ID - every scan taken in that boot session shares the same player name. The scan counter increments from 1 each session. Together, `player + scan_number` tells you exactly which physical location a scan came from.

---

### The Dashboard

Three browser-based visualizations are served by the Node server:

**Word cloud** (`/`) - WiFi network names rendered at sizes proportional to signal strength. Stronger networks appear bigger. A playback slider lets you scrub through historical snapshots in time.

**Table view** (`/old`) - Raw data: scores, online players, last-will messages, and scan entries in tabular form.

**Floorplan overlay** (`/floorplan`) - The research visualization. A building floorplan image with red marker dots placed at each measurement position. The code detects these markers automatically by scanning the image pixels for red-outlined, black-centered squares. Each marker position is matched to a scan by number — scan #1 goes to marker 1, scan #2 to marker 2, and so on. A bar chart showing signal strengths of all detected networks is drawn directly next to each marker on the floorplan. You can filter by player session (boot ID), switch between BSSID-level and SSID-level views, and delete accidental duplicate scans per position.

---

for Arduino IDE settings, Additional Boards Manager URLs: https://raw.githubusercontent.com/espressif/arduino-esp32/gh-pages/package_esp32_index.json

