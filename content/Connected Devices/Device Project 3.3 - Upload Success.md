20260305

After succeeding with uploading and controlling the device software we set out so check the WiFi of the itp floor. We had several rounds of WiFi detection from around the floor - to be sent to Tom's [[MQTT]] broker.
This is our simple json dashboard with Player score for the game side and WiiFi san entries with time stamp.

Scan pouring to mqtt
![[condev - wifi rex leaderboard dashboard - scan pouring.mp4]]
Player score:
![[condev - wifi rex leaderboard dashboard - scan pouring.mp4]]

I learned about [[Epoch Time]]

All that we have sent to the [[MQTT]] broker

```
# WiFi Rex Leaderboard

Disconnected from local bridge

## Recent Scores

|Player|Score|Network|Signal|Time|
|---|---|---|---|---|
|3DJ|22|sandbox370|-74 dBm|11:13:33 PM|
|3DJ|22|sandbox370|-74 dBm|10:58:11 PM|
|3DJ|22|sandbox370|-74 dBm|10:05:03 PM|

## Online Players

- No players online

## Last Will Messages

- GS6 disconnected (last score: 0)
- GS6 disconnected (last score: 0)
- GS6 disconnected (last score: 0)
- GS6 disconnected (last score: 0)
- GS6 disconnected (last score: 0)
- GS6 disconnected (last score: 0)
- GS6 disconnected (last score: 0)
- GS6 disconnected (last score: 0)
- GS6 disconnected (last score: 0)
- GS6 disconnected (last score: 0)

## Recent WiFi Scan Entries

|Time|Player|Event|Idx|SSID|BSSID|RSSI|Ch|Enc|Hidden|
|---|---|---|---|---|---|---|---|---|---|
|11:13:33 PM|S6P|S6P-1772765183-ba2f5179|1/16|eduroam|50:5C:88:52:4E:C1|-69|11|wpa2_enterprise|no|
|11:13:33 PM|S6P|S6P-1772765183-ba2f5179|2/16|nyuguest-legacy|50:5C:88:52:4E:C7|-69|11|open|no|
|11:13:33 PM|S6P|S6P-1772765183-ba2f5179|3/16|nyu-android|50:5C:88:52:4E:C8|-69|11|wpa2_psk|no|
|11:13:33 PM|S6P|S6P-1772765183-ba2f5179|4/16|eduroam|50:5C:88:52:13:B1|-75|6|wpa2_enterprise|no|
|11:13:33 PM|S6P|S6P-1772765183-ba2f5179|5/16|nyuguest-legacy|50:5C:88:52:13:B7|-75|6|open|no|
|11:13:33 PM|S6P|S6P-1772765183-ba2f5179|6/16|nyu-android|50:5C:88:52:13:B8|-75|6|wpa2_psk|no|
|11:13:33 PM|S6P|S6P-1772765183-ba2f5179|7/16|sandbox370|50:5C:88:52:13:B3|-76|6|wpa2_psk|no|
|11:13:33 PM|S6P|S6P-1772765183-ba2f5179|8/16|frontporch370|50:5C:88:52:13:B6|-76|6|wpa2_psk|no|
|11:13:33 PM|S6P|S6P-1772765183-ba2f5179|9/16|eduroam|50:5C:88:54:54:F1|-84|11|wpa2_enterprise|no|
|11:13:33 PM|S6P|S6P-1772765183-ba2f5179|10/16|frontporch370|50:5C:88:54:54:F6|-84|11|wpa2_psk|no|
|11:13:33 PM|S6P|S6P-1772765183-ba2f5179|11/16|nyuguest-legacy|50:5C:88:54:54:F7|-85|11|open|no|
|11:13:33 PM|S6P|S6P-1772765183-ba2f5179|12/16|nyu-android|50:5C:88:54:54:F8|-85|11|wpa2_psk|no|
|11:13:33 PM|S6P|S6P-1772765183-ba2f5179|13/16|OFMTA1XWIFI|00:30:44:39:3C:FA|-88|6|wpa2_psk|no|
|11:13:33 PM|S6P|S6P-1772765183-ba2f5179|14/16|DIRECT-70362_QL-810W|4E:EB:BD:84:3D:68|-90|11|wpa2_psk|no|
|11:13:33 PM|S6P|S6P-1772765183-ba2f5179|15/16|PT_DOCK_NET|90:72:40:18:DE:78|-91|6|wpa2_psk|no|
|11:13:33 PM|S6P|S6P-1772765183-ba2f5179|16/16|(hidden)|10:2C:B1:A6:63:CD|-93|10|wpa2_psk|yes|
|11:13:33 PM|S6P|S6P-1772765245-fdbba657|1/14|DIRECT-70362_QL-810W|4E:EB:BD:84:3D:68|-43|11|wpa2_psk|no|
|11:13:33 PM|S6P|S6P-1772765245-fdbba657|2/14|(hidden)|10:2C:B1:A6:63:CD|-67|10|wpa2_psk|yes|
|11:13:33 PM|S6P|S6P-1772765245-fdbba657|3/14|DIRECT-cc-HP M283 LaserJet|B6:B5:B6:57:E5:CC|-74|6|wpa2_psk|no|
|11:13:33 PM|S6P|S6P-1772765245-fdbba657|4/14|nyuguest-legacy|50:5C:88:52:11:D7|-76|1|open|no|
|11:13:33 PM|S6P|S6P-1772765245-fdbba657|5/14|nyu-android|50:5C:88:52:11:D8|-76|1|wpa2_psk|no|
|11:13:33 PM|S6P|S6P-1772765245-fdbba657|6/14|eduroam|50:5C:88:52:11:D1|-77|1|wpa2_enterprise|no|
|11:13:33 PM|S6P|S6P-1772765245-fdbba657|7/14|sandbox370|50:5C:88:52:11:D3|-77|1|wpa2_psk|no|
|11:13:33 PM|S6P|S6P-1772765245-fdbba657|8/14|frontporch370|50:5C:88:52:11:D6|-77|1|wpa2_psk|no|
|11:13:33 PM|S6P|S6P-1772765245-fdbba657|9/14|nyu-android|50:5C:88:52:4E:C8|-80|11|wpa2_psk|no|
|11:13:33 PM|S6P|S6P-1772765245-fdbba657|10/14|frontporch370|50:5C:88:52:4E:C6|-81|11|wpa2_psk|no|
|11:13:33 PM|S6P|S6P-1772765245-fdbba657|11/14|nyuguest-legacy|50:5C:88:52:4E:C7|-81|11|open|no|
|11:13:33 PM|S6P|S6P-1772765245-fdbba657|12/14|sandbox370|50:5C:88:52:02:43|-85|11|wpa2_psk|no|
|11:13:33 PM|S6P|S6P-1772765245-fdbba657|13/14|eduroam|50:5C:88:52:02:41|-86|11|wpa2_enterprise|no|
|11:13:33 PM|S6P|S6P-1772765245-fdbba657|14/14|frontporch370|50:5C:88:52:02:46|-86|11|wpa2_psk|no|
|11:13:33 PM|S6P|S6P-1772765304-6866affd|1/15|(hidden)|10:2C:B1:A6:63:CD|-55|10|wpa2_psk|yes|
|11:13:33 PM|S6P|S6P-1772765304-6866affd|2/15|eduroam|50:5C:88:52:11:D1|-70|1|wpa2_enterprise|no|
|11:13:33 PM|S6P|S6P-1772765304-6866affd|3/15|sandbox370|50:5C:88:52:11:D3|-70|1|wpa2_psk|no|
|11:13:33 PM|S6P|S6P-1772765304-6866affd|4/15|frontporch370|50:5C:88:52:11:D6|-70|1|wpa2_psk|no|
|11:13:33 PM|S6P|S6P-1772765304-6866affd|5/15|nyuguest-legacy|50:5C:88:52:11:D7|-70|1|open|no|
|11:13:33 PM|S6P|S6P-1772765304-6866affd|6/15|nyu-android|50:5C:88:52:11:D8|-70|1|wpa2_psk|no|
|11:13:33 PM|S6P|S6P-1772765304-6866affd|7/15|DIRECT-cc-HP M283 LaserJet|B6:B5:B6:57:E5:CC|-79|6|wpa2_psk|no|
|11:13:33 PM|S6P|S6P-1772765304-6866affd|8/15|Rehearsal Rack 2|20:23:51:F9:DE:D6|-81|3|wpa2_psk|no|
|11:13:33 PM|S6P|S6P-1772765304-6866affd|9/15|eduroam|50:5C:88:51:FD:A1|-85|6|wpa2_enterprise|no|
|11:13:33 PM|S6P|S6P-1772765304-6866affd|10/15|sandbox370|50:5C:88:51:FD:A3|-85|6|wpa2_psk|no|
|11:13:33 PM|S6P|S6P-1772765304-6866affd|11/15|nyuguest-legacy|50:5C:88:51:FD:A7|-86|6|open|no|
|11:13:33 PM|S6P|S6P-1772765304-6866affd|12/15|frontporch370|50:5C:88:51:FD:A6|-87|6|wpa2_psk|no|
|11:13:33 PM|S6P|S6P-1772765304-6866affd|13/15|nyu-android|50:5C:88:51:FD:A8|-88|6|wpa2_psk|no|
|11:13:33 PM|S6P|S6P-1772765304-6866affd|14/15|DIRECT-70362_QL-810W|4E:EB:BD:84:3D:68|-89|11|wpa2_psk|no|
|11:13:33 PM|S6P|S6P-1772765304-6866affd|15/15|island-0F1580|24:C9:A1:4F:15:83|-91|6|wpa2_psk|no|
|11:13:33 PM|3DJ|3DJ-1772766264-8e2b85e9|1/11|sandbox370|50:5C:88:52:4E:C3|-75|11|wpa2_psk|no|
|11:13:33 PM|3DJ|3DJ-1772766264-8e2b85e9|2/11|nyu-android|50:5C:88:52:4E:C8|-75|11|wpa2_psk|no|
|11:13:33 PM|3DJ|3DJ-1772766264-8e2b85e9|3/11|eduroam|50:5C:88:52:4E:C1|-76|11|wpa2_enterprise|no|
|11:13:33 PM|3DJ|3DJ-1772766264-8e2b85e9|4/11|frontporch370|50:5C:88:52:4E:C6|-76|11|wpa2_psk|no|
|11:13:33 PM|3DJ|3DJ-1772766264-8e2b85e9|5/11|nyuguest-legacy|50:5C:88:52:4E:C7|-76|11|open|no|
|11:13:33 PM|3DJ|3DJ-1772766264-8e2b85e9|6/11|sandbox370|50:5C:88:52:13:B3|-80|6|wpa2_psk|no|
|11:13:33 PM|3DJ|3DJ-1772766264-8e2b85e9|7/11|frontporch370|50:5C:88:52:13:B6|-80|6|wpa2_psk|no|
|11:13:33 PM|3DJ|3DJ-1772766264-8e2b85e9|8/11|eduroam|50:5C:88:52:13:B1|-81|6|wpa2_enterprise|no|
|11:13:33 PM|3DJ|3DJ-1772766264-8e2b85e9|9/11|nyuguest-legacy|50:5C:88:52:13:B7|-81|6|open|no|
|11:13:33 PM|3DJ|3DJ-1772766264-8e2b85e9|10/11|nyu-android|50:5C:88:52:13:B8|-81|6|wpa2_psk|no|
|11:13:33 PM|3DJ|3DJ-1772766264-8e2b85e9|11/11|OFMTA1XWIFI|00:30:44:39:3C:FA|-87|6|wpa2_psk|no|
|11:13:33 PM|3DJ|3DJ-1772766312-826ddec9|1/18|eduroam|50:5C:88:52:13:B1|-80|6|wpa2_enterprise|no|
|11:13:33 PM|3DJ|3DJ-1772766312-826ddec9|2/18|eduroam|50:5C:88:52:4E:C1|-80|11|wpa2_enterprise|no|
|11:13:33 PM|3DJ|3DJ-1772766312-826ddec9|3/18|sandbox370|50:5C:88:52:4E:C3|-80|11|wpa2_psk|no|
|11:13:33 PM|3DJ|3DJ-1772766312-826ddec9|4/18|frontporch370|50:5C:88:52:4E:C6|-80|11|wpa2_psk|no|
|11:13:33 PM|3DJ|3DJ-1772766312-826ddec9|5/18|nyuguest-legacy|50:5C:88:52:4E:C7|-80|11|open|no|
|11:13:33 PM|3DJ|3DJ-1772766312-826ddec9|6/18|nyu-android|50:5C:88:52:4E:C8|-80|11|wpa2_psk|no|
|11:13:33 PM|3DJ|3DJ-1772766312-826ddec9|7/18|nyuguest-legacy|50:5C:88:52:13:B7|-81|6|open|no|
|11:13:33 PM|3DJ|3DJ-1772766312-826ddec9|8/18|nyu-android|50:5C:88:52:13:B8|-81|6|wpa2_psk|no|
|11:13:33 PM|3DJ|3DJ-1772766312-826ddec9|9/18|sandbox370|50:5C:88:52:13:B3|-81|6|wpa2_psk|no|
|11:13:33 PM|3DJ|3DJ-1772766312-826ddec9|10/18|frontporch370|50:5C:88:52:13:B6|-81|6|wpa2_psk|no|
|11:13:33 PM|3DJ|3DJ-1772766312-826ddec9|11/18|sandbox370|50:5C:88:54:54:F3|-85|11|wpa2_psk|no|
|11:13:33 PM|3DJ|3DJ-1772766312-826ddec9|12/18|frontporch370|50:5C:88:54:54:F6|-85|11|wpa2_psk|no|
|11:13:33 PM|3DJ|3DJ-1772766312-826ddec9|13/18|nyuguest-legacy|50:5C:88:54:54:F7|-85|11|open|no|
|11:13:33 PM|3DJ|3DJ-1772766312-826ddec9|14/18|nyu-android|50:5C:88:54:54:F8|-85|11|wpa2_psk|no|
|11:13:33 PM|3DJ|3DJ-1772766312-826ddec9|15/18|eduroam|50:5C:88:54:54:F1|-86|11|wpa2_enterprise|no|
|11:13:33 PM|3DJ|3DJ-1772766312-826ddec9|16/18|OFMTA1XWIFI|00:30:44:39:3C:FA|-92|6|wpa2_psk|no|
|11:13:33 PM|3DJ|3DJ-1772766312-826ddec9|17/18|DIRECT-70362_QL-810W|4E:EB:BD:84:3D:68|-92|11|wpa2_psk|no|
|11:13:33 PM|3DJ|3DJ-1772766312-826ddec9|18/18|DIRECT-cc-HP M283 LaserJet|B6:B5:B6:57:E5:CC|-94|6|wpa2_psk|no|
|10:58:11 PM|S6P|S6P-1772765183-ba2f5179|1/16|eduroam|50:5C:88:52:4E:C1|-69|11|wpa2_enterprise|no|
|10:58:11 PM|S6P|S6P-1772765183-ba2f5179|2/16|nyuguest-legacy|50:5C:88:52:4E:C7|-69|11|open|no|
|10:58:11 PM|S6P|S6P-1772765183-ba2f5179|3/16|nyu-android|50:5C:88:52:4E:C8|-69|11|wpa2_psk|no|
|10:58:11 PM|S6P|S6P-1772765183-ba2f5179|4/16|eduroam|50:5C:88:52:13:B1|-75|6|wpa2_enterprise|no|
|10:58:11 PM|S6P|S6P-1772765183-ba2f5179|5/16|nyuguest-legacy|50:5C:88:52:13:B7|-75|6|open|no|
|10:58:11 PM|S6P|S6P-1772765183-ba2f5179|6/16|nyu-android|50:5C:88:52:13:B8|-75|6|wpa2_psk|no|
|10:58:11 PM|S6P|S6P-1772765183-ba2f5179|7/16|sandbox370|50:5C:88:52:13:B3|-76|6|wpa2_psk|no|
|10:58:11 PM|S6P|S6P-1772765183-ba2f5179|8/16|frontporch370|50:5C:88:52:13:B6|-76|6|wpa2_psk|no|
|10:58:11 PM|S6P|S6P-1772765183-ba2f5179|9/16|eduroam|50:5C:88:54:54:F1|-84|11|wpa2_enterprise|no|
|10:58:11 PM|S6P|S6P-1772765183-ba2f5179|10/16|frontporch370|50:5C:88:54:54:F6|-84|11|wpa2_psk|no|
|10:58:11 PM|S6P|S6P-1772765183-ba2f5179|11/16|nyuguest-legacy|50:5C:88:54:54:F7|-85|11|open|no|
|10:58:11 PM|S6P|S6P-1772765183-ba2f5179|12/16|nyu-android|50:5C:88:54:54:F8|-85|11|wpa2_psk|no|
|10:58:11 PM|S6P|S6P-1772765183-ba2f5179|13/16|OFMTA1XWIFI|00:30:44:39:3C:FA|-88|6|wpa2_psk|no|
|10:58:11 PM|S6P|S6P-1772765183-ba2f5179|14/16|DIRECT-70362_QL-810W|4E:EB:BD:84:3D:68|-90|11|wpa2_psk|no|
|10:58:11 PM|S6P|S6P-1772765183-ba2f5179|15/16|PT_DOCK_NET|90:72:40:18:DE:78|-91|6|wpa2_psk|no|
|10:58:11 PM|S6P|S6P-1772765183-ba2f5179|16/16|(hidden)|10:2C:B1:A6:63:CD|-93|10|wpa2_psk|yes|
|10:58:11 PM|S6P|S6P-1772765245-fdbba657|1/14|DIRECT-70362_QL-810W|4E:EB:BD:84:3D:68|-43|11|wpa2_psk|no|
|10:58:11 PM|S6P|S6P-1772765245-fdbba657|2/14|(hidden)|10:2C:B1:A6:63:CD|-67|10|wpa2_psk|yes|
|10:58:11 PM|S6P|S6P-1772765245-fdbba657|3/14|DIRECT-cc-HP M283 LaserJet|B6:B5:B6:57:E5:CC|-74|6|wpa2_psk|no|
|10:58:11 PM|S6P|S6P-1772765245-fdbba657|4/14|nyuguest-legacy|50:5C:88:52:11:D7|-76|1|open|no|
|10:58:11 PM|S6P|S6P-1772765245-fdbba657|5/14|nyu-android|50:5C:88:52:11:D8|-76|1|wpa2_psk|no|
|10:58:11 PM|S6P|S6P-1772765245-fdbba657|6/14|eduroam|50:5C:88:52:11:D1|-77|1|wpa2_enterprise|no|
|10:58:11 PM|S6P|S6P-1772765245-fdbba657|7/14|sandbox370|50:5C:88:52:11:D3|-77|1|wpa2_psk|no|
|10:58:11 PM|S6P|S6P-1772765245-fdbba657|8/14|frontporch370|50:5C:88:52:11:D6|-77|1|wpa2_psk|no|
|10:58:11 PM|S6P|S6P-1772765245-fdbba657|9/14|nyu-android|50:5C:88:52:4E:C8|-80|11|wpa2_psk|no|
|10:58:11 PM|S6P|S6P-1772765245-fdbba657|10/14|frontporch370|50:5C:88:52:4E:C6|-81|11|wpa2_psk|no|
|10:58:11 PM|S6P|S6P-1772765245-fdbba657|11/14|nyuguest-legacy|50:5C:88:52:4E:C7|-81|11|open|no|
|10:58:11 PM|S6P|S6P-1772765245-fdbba657|12/14|sandbox370|50:5C:88:52:02:43|-85|11|wpa2_psk|no|
|10:58:11 PM|S6P|S6P-1772765245-fdbba657|13/14|eduroam|50:5C:88:52:02:41|-86|11|wpa2_enterprise|no|
|10:58:11 PM|S6P|S6P-1772765245-fdbba657|14/14|frontporch370|50:5C:88:52:02:46|-86|11|wpa2_psk|no|
|10:58:11 PM|S6P|S6P-1772765304-6866affd|1/15|(hidden)|10:2C:B1:A6:63:CD|-55|10|wpa2_psk|yes|
|10:58:11 PM|S6P|S6P-1772765304-6866affd|2/15|eduroam|50:5C:88:52:11:D1|-70|1|wpa2_enterprise|no|
|10:58:11 PM|S6P|S6P-1772765304-6866affd|3/15|sandbox370|50:5C:88:52:11:D3|-70|1|wpa2_psk|no|
|10:58:11 PM|S6P|S6P-1772765304-6866affd|4/15|frontporch370|50:5C:88:52:11:D6|-70|1|wpa2_psk|no|
|10:58:11 PM|S6P|S6P-1772765304-6866affd|5/15|nyuguest-legacy|50:5C:88:52:11:D7|-70|1|open|no|
|10:58:11 PM|S6P|S6P-1772765304-6866affd|6/15|nyu-android|50:5C:88:52:11:D8|-70|1|wpa2_psk|no|
|10:58:11 PM|S6P|S6P-1772765304-6866affd|7/15|DIRECT-cc-HP M283 LaserJet|B6:B5:B6:57:E5:CC|-79|6|wpa2_psk|no|
|10:58:11 PM|S6P|S6P-1772765304-6866affd|8/15|Rehearsal Rack 2|20:23:51:F9:DE:D6|-81|3|wpa2_psk|no|
|10:58:11 PM|S6P|S6P-1772765304-6866affd|9/15|eduroam|50:5C:88:51:FD:A1|-85|6|wpa2_enterprise|no|
|10:58:11 PM|S6P|S6P-1772765304-6866affd|10/15|sandbox370|50:5C:88:51:FD:A3|-85|6|wpa2_psk|no|
|10:58:11 PM|S6P|S6P-1772765304-6866affd|11/15|nyuguest-legacy|50:5C:88:51:FD:A7|-86|6|open|no|
|10:58:11 PM|S6P|S6P-1772765304-6866affd|12/15|frontporch370|50:5C:88:51:FD:A6|-87|6|wpa2_psk|no|
|10:58:11 PM|S6P|S6P-1772765304-6866affd|13/15|nyu-android|50:5C:88:51:FD:A8|-88|6|wpa2_psk|no|
|10:58:11 PM|S6P|S6P-1772765304-6866affd|14/15|DIRECT-70362_QL-810W|4E:EB:BD:84:3D:68|-89|11|wpa2_psk|no|
|10:58:11 PM|S6P|S6P-1772765304-6866affd|15/15|island-0F1580|24:C9:A1:4F:15:83|-91|6|wpa2_psk|no|
|10:58:11 PM|3DJ|3DJ-1772766264-8e2b85e9|1/11|sandbox370|50:5C:88:52:4E:C3|-75|11|wpa2_psk|no|
|10:58:11 PM|3DJ|3DJ-1772766264-8e2b85e9|2/11|nyu-android|50:5C:88:52:4E:C8|-75|11|wpa2_psk|no|
|10:58:11 PM|3DJ|3DJ-1772766264-8e2b85e9|3/11|eduroam|50:5C:88:52:4E:C1|-76|11|wpa2_enterprise|no|
|10:58:11 PM|3DJ|3DJ-1772766264-8e2b85e9|4/11|frontporch370|50:5C:88:52:4E:C6|-76|11|wpa2_psk|no|
|10:58:11 PM|3DJ|3DJ-1772766264-8e2b85e9|5/11|nyuguest-legacy|50:5C:88:52:4E:C7|-76|11|open|no|
|10:58:11 PM|3DJ|3DJ-1772766264-8e2b85e9|6/11|sandbox370|50:5C:88:52:13:B3|-80|6|wpa2_psk|no|
|10:58:11 PM|3DJ|3DJ-1772766264-8e2b85e9|7/11|frontporch370|50:5C:88:52:13:B6|-80|6|wpa2_psk|no|
|10:58:11 PM|3DJ|3DJ-1772766264-8e2b85e9|8/11|eduroam|50:5C:88:52:13:B1|-81|6|wpa2_enterprise|no|
|10:58:11 PM|3DJ|3DJ-1772766264-8e2b85e9|9/11|nyuguest-legacy|50:5C:88:52:13:B7|-81|6|open|no|
|10:58:11 PM|3DJ|3DJ-1772766264-8e2b85e9|10/11|nyu-android|50:5C:88:52:13:B8|-81|6|wpa2_psk|no|
|10:58:11 PM|3DJ|3DJ-1772766264-8e2b85e9|11/11|OFMTA1XWIFI|00:30:44:39:3C:FA|-87|6|wpa2_psk|no|
|10:58:11 PM|3DJ|3DJ-1772766312-826ddec9|1/18|eduroam|50:5C:88:52:13:B1|-80|6|wpa2_enterprise|no|
|10:58:11 PM|3DJ|3DJ-1772766312-826ddec9|2/18|eduroam|50:5C:88:52:4E:C1|-80|11|wpa2_enterprise|no|
|10:58:11 PM|3DJ|3DJ-1772766312-826ddec9|3/18|sandbox370|50:5C:88:52:4E:C3|-80|11|wpa2_psk|no|
|10:58:11 PM|3DJ|3DJ-1772766312-826ddec9|4/18|frontporch370|50:5C:88:52:4E:C6|-80|11|wpa2_psk|no|
|10:58:11 PM|3DJ|3DJ-1772766312-826ddec9|5/18|nyuguest-legacy|50:5C:88:52:4E:C7|-80|11|open|no|
|10:58:11 PM|3DJ|3DJ-1772766312-826ddec9|6/18|nyu-android|50:5C:88:52:4E:C8|-80|11|wpa2_psk|no|
|10:58:11 PM|3DJ|3DJ-1772766312-826ddec9|7/18|nyuguest-legacy|50:5C:88:52:13:B7|-81|6|open|no|
|10:58:11 PM|3DJ|3DJ-1772766312-826ddec9|8/18|nyu-android|50:5C:88:52:13:B8|-81|6|wpa2_psk|no|
|10:58:11 PM|3DJ|3DJ-1772766312-826ddec9|9/18|sandbox370|50:5C:88:52:13:B3|-81|6|wpa2_psk|no|
|10:58:11 PM|3DJ|3DJ-1772766312-826ddec9|10/18|frontporch370|50:5C:88:52:13:B6|-81|6|wpa2_psk|no|
|10:58:11 PM|3DJ|3DJ-1772766312-826ddec9|11/18|sandbox370|50:5C:88:54:54:F3|-85|11|wpa2_psk|no|
|10:58:11 PM|3DJ|3DJ-1772766312-826ddec9|12/18|frontporch370|50:5C:88:54:54:F6|-85|11|wpa2_psk|no|
|10:58:11 PM|3DJ|3DJ-1772766312-826ddec9|13/18|nyuguest-legacy|50:5C:88:54:54:F7|-85|11|open|no|
|10:58:11 PM|3DJ|3DJ-1772766312-826ddec9|14/18|nyu-android|50:5C:88:54:54:F8|-85|11|wpa2_psk|no|
|10:58:11 PM|3DJ|3DJ-1772766312-826ddec9|15/18|eduroam|50:5C:88:54:54:F1|-86|11|wpa2_enterprise|no|
|10:58:11 PM|3DJ|3DJ-1772766312-826ddec9|16/18|OFMTA1XWIFI|00:30:44:39:3C:FA|-92|6|wpa2_psk|no|
|10:58:11 PM|3DJ|3DJ-1772766312-826ddec9|17/18|DIRECT-70362_QL-810W|4E:EB:BD:84:3D:68|-92|11|wpa2_psk|no|
|10:58:11 PM|3DJ|3DJ-1772766312-826ddec9|18/18|DIRECT-cc-HP M283 LaserJet|B6:B5:B6:57:E5:CC|-94|6|wpa2_psk|no|
|10:04:41 PM|3DJ|3DJ-1772766312-826ddec9|18/18|DIRECT-cc-HP M283 LaserJet|B6:B5:B6:57:E5:CC|-94|6|wpa2_psk|no|
|10:04:41 PM|3DJ|3DJ-1772766312-826ddec9|17/18|DIRECT-70362_QL-810W|4E:EB:BD:84:3D:68|-92|11|wpa2_psk|no|
```