### The MQTT Pipeline

The ESP32 publishes to an MQTT broker at tigoe.net on port 1883. A Node.js server running locally subscribes to five topics:

|Topic|What it carries|
|---|---|
|`wifirex/scores`|Game scores with player, SSID, RSSI|
|`wifirex/players`|Online/offline status|
|`wifirex/lastwill`|Auto-published by broker on unexpected disconnect|
|`wifirex/scans`|Individual network entries (older format)|
|`wifirex/scan_batch`|Full scan snapshot as one JSON array|

The Node server uses Socket.IO to relay messages to any open browser in real time, and persists scan batches to a local JSON file (`column_scans.json`).

![[condev - mqtt explorer tigoe.net.webp]]
