Previous episode [[Device Project 1.2 - Concept]]

After the last episodes where Fabri and I understood what we can and can't do, we enveloped our project to be combined with a device Cody Frost and I started developing last semester for Tandem Makerspace Prototyping Fund - A mapping device that lets you record your location to build a map of your beings. Thinking about the [[Invisibility of interfaces and infrastructures]] and  viewing a city from Wifi perspective made the connection between the projects viable.

We set out to develop our device:
![[condev IMG_7145 copy.webp]]
![[condev IMG_7157 copy.webp]]

We switched to esp32 and took it for a spin on 370 Jay st, to simulate different areas of the city with different Wifi's we did two scans - one over itp 4th floor and one on the 12th floor. We want to develop our understand of what can be said about those areas with Wifi and what do they tell us about the infrastructure and people setting them up.

Fabri rewrote the code (without AI) - fetches the json file recorded from esp32 with all the wifi names and information to be sent to a local host through an http server, Python for setting up the local server -> js for taking the data from the json to display on html on the server - what we didn't do (but did last week) is the esp32 sending the data to the server, This will also be a problem with MyMap device, but this is next weeks problem.

For next week I want to get my hands dirty with the code, while also thinking about cartography and how we can show the information as an interesting reading of space.

Wifi scan 4th floor

|          |             |          |                |                            |                   |
| -------- | ----------- | -------- | -------------- | -------------------------- | ----------------- |
| **scan** | **network** | **rssi** | **encryption** | **ssid**                   | **bssid**         |
| **0**    | 1           | -77      | WPA2           | DIRECT-09-HP M252 LaserJet | 42:B8:9A:C0:21:09 |
| **0**    | 2           | -81      | WPA2           | frontporch370              | 50:5C:88:51:DF:46 |
| **0**    | 3           | -81      | WPA2-E         | eduroam                    | 50:5C:88:52:11:71 |
| **0**    | 4           | -81      | WPA2           | frontporch370              | 50:5C:88:52:11:76 |
| **0**    | 5           | -81      | WPA2           | nyu-android                | 50:5C:88:52:11:78 |
| **0**    | 6           | -82      | WPA2-E         | eduroam                    | 50:5C:88:51:DF:41 |
| **0**    | 7           | -82      | Open           | nyuguest-legacy            | 50:5C:88:51:DF:47 |
| **0**    | 8           | -82      | WPA2           | nyu-android                | 50:5C:88:51:DF:48 |
| **0**    | 9           | -82      | Open           | nyuguest-legacy            | 50:5C:88:52:11:77 |
| **0**    | 10          | -82      | WPA2           | sandbox370                 | 50:5C:88:51:DF:43 |
| **0**    | 11          | -82      | WPA2           | Rehearsal Rack 2           | 20:23:51:F9:DE:D6 |
| **0**    | 12          | -83      | WPA2           | sandbox370                 | 50:5C:88:52:11:73 |
| **0**    | 13          | -83      | WPA2           | sandbox370                 | 50:5C:88:52:11:D3 |
| **0**    | 14          | -84      | WPA2           | sandbox370                 | 50:5C:88:51:FD:A3 |
| **0**    | 15          | -84      | WPA2           | frontporch370              | 50:5C:88:52:11:D6 |
| **0**    | 16          | -85      | WPA2-E         | eduroam                    | 50:5C:88:51:FD:A1 |
| **0**    | 17          | -85      | WPA2           | nyu-android                | 50:5C:88:51:FD:A8 |
| **0**    | 18          | -85      | WPA2           | frontporch370              | 50:5C:88:51:FD:A6 |
| **0**    | 19          | -86      | Open           | nyuguest-legacy            | 50:5C:88:51:FD:A7 |
| **0**    | 20          | -87      | WPA2           | 370 Jay St - Rm 324_AP     | D2:12:55:78:F2:75 |
| **0**    | 21          | -88      | Open           | nyuguest-legacy            | 50:5C:88:52:11:D7 |
| **0**    | 22          | -88      | WPA2           | nyu-android                | 50:5C:88:52:11:D8 |
| **0**    | 23          | -89      | WPA2-E         | eduroam                    | 50:5C:88:52:11:D1 |
| **0**    | 24          | -94      | WPA2           | Rehearsal Rack 1           | 20:23:51:F9:DA:8E |
| **0**    | 25          | -97      | WPA2           | CiscoAirProvision          | 28:AC:9E:00:32:29 |
Wifi scan 12th floor

|   |   |   |   |   |   |
|---|---|---|---|---|---|
|**scan**|**network**|**rssi**|**encryption**|**ssid**|**bssid**|
|**0**|1|-58|WPA2|humanfuel|6C:F3:7F:69:F8:C0|
|**0**|2|-64|WPA2|DSL_wifi|9C:53:22:C5:BF:B3|
|**0**|3|-65|WPA2|DSL_wifi_2.4GHz|D2:53:22:C5:BF:B6|
|**0**|4|-70|WPA2-E|eduroam|50:5C:88:53:48:E1|
|**0**|5|-70|Open|nyuguest-legacy|50:5C:88:53:48:E5|
|**0**|6|-70|WPA2|nyu-android|50:5C:88:53:48:E6|
|**0**|7|-72|WPA2-E|eduroam|50:5C:88:51:09:21|
|**0**|8|-72|Open|nyuguest-legacy|50:5C:88:51:09:25|
|**0**|9|-72|WPA2|nyu-android|50:5C:88:51:09:26|
|**0**|10|-72|Open|HPCP1525-a3c45c|60:D8:19:A3:C4:5C|
|**0**|11|-75|WPA2|humanfuel|6C:F3:7F:69:F1:E0|
|**0**|12|-77|WPA2|floodnet-lab-2G|B0:6E:BF:DE:71:68|
|**0**|13|-77|WPA2-E|eduroam|50:5C:88:52:A7:D1|
|**0**|14|-77|Open|nyuguest-legacy|50:5C:88:52:A7:D5|
|**0**|15|-77|WPA2|nyu-android|50:5C:88:52:A7:D6|
|**0**|16|-78|WPA2-E|eduroam|50:5C:88:52:1A:41|
|**0**|17|-78|Open|nyuguest-legacy|50:5C:88:52:1A:45|
|**0**|18|-78|WPA2|nyu-android|50:5C:88:52:1A:46|
|**0**|19|-82|WPA2-E|eduroam|50:5C:88:53:E7:E1|
|**0**|20|-83|Open|nyuguest-legacy|50:5C:88:53:E7:E5|
|**0**|21|-83|WPA2|nyu-android|50:5C:88:53:E7:E6|
|**0**|22|-85|WPA2/WPA3|momo-lab|54:AF:97:16:09:84|
|**0**|23|-85|WPA2|momo-iot-2.4ghz|56:AF:97:16:09:84|
|**0**|24|-85|WPA2|mom-lab-hidden-cam|40:ED:00:AB:2D:9A|
|**0**|25|-85|WPA2-E|eduroam|50:5C:88:54:3F:01|
|**0**|26|-86|Open|SolsticePod|D8:0F:99:63:26:4F|
|**0**|27|-86|Open|nyuguest-legacy|50:5C:88:54:3F:05|
|**0**|28|-86|WPA2|nyu-android|50:5C:88:54:3F:06|
|**0**|29|-89|WPA2|DIRECT-56-HP M428fdw LJ|16:CB:19:9C:B4:56|