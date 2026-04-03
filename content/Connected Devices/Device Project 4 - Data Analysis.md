### The Idea - Recap

A handheld game device that uses the WiFi environment around you as a gameplay mechanic. The stronger the WiFi signal, the easier the game. It turns a physical space into a difficulty curve.
### The Data Collection: Column Scans

The core research use-case: mapping WiFi signal strength across physical space. In order to understand the WiFi signal across the floor Fabri and I created a dashboard with a floor plan and scanned the floor at each column. 
![[condev - 4 data analysis.webp]]

The device:
1. Does a fresh WiFi scan capturing every visible access point — SSID, BSSID, RSSI, channel, encryption type
2. Connects to WiFi network ('sandbox370')
3. Connects to an MQTT broker (tigoe.net)
4. Syncs the clock via NTP to get an accurate Unix timestamp
5. Publishes a single JSON message (`wifirex/scan_batch`) containing all detected networks plus metadata: player name, scan number, event ID, timestamp

Each boot of the device generates a random 3-character player name (like `MPC` or `C6Q`). This acts as a session ID — every scan taken in that boot session shares the same player name. The scan counter increments from 1 each session. Together, `player + scan_number` tells you exactly which physical location a scan came from.

 At column #3 'sanbox370' is at -66dBm: 
 ![[condev - 4 data analysis 2.webp]]

---
While trying to get all the scans we found difficulties connecting to 'sandbox370' and had to find our way around each column.

![[condev - 4 fabri 1.webp]]
![[condev - 4 fabri 2.webp]]
![[condev - 4 fabri 3.webp]]
![[condev - 4 fabri 4.webp]]

---
The channel number is the most useful piece of data. Because the NYU infrastructure uses channels 1, 6, and 11 on separate physical APs, the dominant channel in each scan essentially tells you which AP you're closest to - giving you a rough mapping of AP locations from signal readings alone, without needing floor plan coordinates.
### 1. The NYU infrastructure is a single physical AP broadcasting 5 SSIDs simultaneously

In every single scan, `eduroam`, `sandbox370`, `frontporch370`, `nyuguest-legacy`, and `nyu-android` appear with **identical RSSI values** on the same channel. They're not separate routers - they're one radio broadcasting all five networks at once. This is standard enterprise AP configuration. It means in your bar charts, you're seeing the same physical device represented 5 times.

### 2. The dominant channel flips by position — and maps to different physical APs

The NYU APs operate on all three non-overlapping 2.4GHz channels (1, 6, 11). As you walk down the corridor, the dominant channel switches, telling you which physical AP you're closest to:

|C6Q scan|Dominant channel|Strongest RSSI|
|---|---|---|
|1|ch1|-62|
|2|ch6|-65|
|3-4|ch6|-65|
|5|ch1|-60|
|6-7|ch11|-59 / -57 ← strongest of all NYU readings|
|8|ch1|-61|

You were walking past at least 3 distinct physical access points. Scans 6-7 (ch11 dominant at -57/-59) are the closest any position got to an AP — likely right next to it. The channel flip pattern gives you a rough AP map of the corridor even without any floor plan.



Look at
https://www.amazon.com/dp/B0DP6FXP31/ref=sspa_dk_detail_0?pd_rd_i=B0DP6FXP31&pd_rd_w=V4PmK&content-id=amzn1.sym.386c274b-4bfe-4421-9052-a1a56db557ab&pf_rd_p=386c274b-4bfe-4421-9052-a1a56db557ab&pf_rd_r=SGJ9YTY5G82KP1QBJRKA&pd_rd_wg=syTBT&pd_rd_r=58d99da8-2602-4c7a-acda-0aaaf29b9af4&sp_csd=d2lkZ2V0TmFtZT1zcF9kZXRhaWxfdGhlbWF0aWM&th=1

https://www.amazon.com/dp/B0FWK8GJ3M/ref=sspa_dk_detail_1?pd_rd_i=B0FWK8GJ3M&pd_rd_w=V4PmK&content-id=amzn1.sym.386c274b-4bfe-4421-9052-a1a56db557ab&pf_rd_p=386c274b-4bfe-4421-9052-a1a56db557ab&pf_rd_r=SGJ9YTY5G82KP1QBJRKA&pd_rd_wg=syTBT&pd_rd_r=58d99da8-2602-4c7a-acda-0aaaf29b9af4&sp_csd=d2lkZ2V0TmFtZT1zcF9kZXRhaWxfdGhlbWF0aWM&th=1

