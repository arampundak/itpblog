Continue reading [[Device Project 1.2 - Concept]]

When Fabri and me decided to work together we were looking for a "fun sensor"... we couldnt find any so we decided to use the power of the microcontroller to detect networks and work our way from there.
First few thoughts were:
- Mapping of Wifi signals - checking to visualize wifi signals
	find all the hotspots on the floor by signals strength. SSID - nyu can have bSSID (base station) address for each individual hotspot, im on nyu on that hotspot or another hotspot. Ideally my device has the strongest signal and connect to it. 
- Mapping of AirDrop clients around me - can we tell who is closer and by how much?
- Site that shows what bathroom is occupied in the itp corridor, or a physical interpataion of the lock being closed - parking lot. how do you make a dashboard with a validation of privacy. 
- Temperature - where is it the hottest on the floor

Referances
https://www.instagram.com/tim_rodenbroeker/?hl=en
[[The Immaterials project - Timo Arnall]] - showing invisable infastructures

We had a conversation with Tom that was very interesting but we still didn't feel like we have a project or a question at hand.
Conversation with Tom - 04.02.26 - "_Wi-Fi surveyor’s tool_"
**Wi-Fi Surveyor: An Intentional Tool for Mapping Invisible Infrastructure** / **Seeing Wi-Fi by Choosing to Measure It**
A. “Why” beats “how”
- Why does someone need this?
- What decision does it help them make?
- What does it tell them that their laptop doesn’t?
B. Automation is not always better
- It ties **human judgment** to data
- It guarantees **context** (“I chose _this_ spot, at _this_ moment”)
- It avoids false precision
C. This is a _surveyor’s tool_, not a scientific instrument
- A tool used _in the field_
- Designed for **workflow**, not raw accuracy
D. Don’t fight the phone — design around what it can’t do well
- **Embodied interaction**
- **Physical confirmation**
- **Focused, single-purpose tools**
- **Intentional logging**

Core Concept:
A handheld device that allows a person to **intentionally measure and log Wi-Fi signal strength at chosen locations**, rather than passively recording data. Each measurement is taken by a deliberate physical action, tied to human perception of place. The device sends data via MQTT to a web dashboard, where spatial and temporal patterns of Wi-Fi coverage can be explored over time.

---

With some more time to think I cam to Fabri with these 'New More thoughts': 
Social presence of infrastructure
I remember a project by Eran Hileli showing in AR the invisible devices around us talking to themselves: [[Invisible Roommates - Eran Hilleli & Nicole He]]. It made me think of [[Invisibility of interfaces and infrastructures]] and how we can show these in a way that will make people rethink their surroundings? or make people see & experience space differently?
**Invisibility of interfaces & infrastructures** → things that shape space but don’t announce themselves.
Not “How strong is Wi-Fi here?”  
but  
**“Who (or what) is already here with me?”**
- “What invisible actors are coexisting with me in this space?”
- “How crowded is this environment _digitally_?”
- “How alive / inhabited is a room beyond humans?”

> Local Devices - Find all devices connected to the local network using `arp -a`. This module also pings all possible ip's in the local network to build the arp table. https://github.com/DylanPiercey/local-devices

Core Concept:
A device that reveals the _digital presence_ of a space by detecting and logging devices on the local network. Rather than showing technical identifiers, it translates network activity into a physical, experiential output — allowing people to sense how digitally “inhabited” a room is over time.

This reframes infrastructure as **co-presence**, not utility.
Creatures that live in the space and only reveal themselves when you look the right way.

Metaphors / how to show the concept

1. **Ghosts in the Background - open computer camera - shows you and in the background - ghosts
- Everything happens in text
- Devices become symbols
- The space becomes a living terminal
https://www.reddit.com/r/creativecoding/comments/1lqt0z2/ascii_portal_hand_tracking_a_realtime_webcam/
![[condev device project 2.webp]]

2. Binoculars (pokemon go style) - Look through a lens to see another level of the world OR a camera that takes a picture of space and shows it to you with all the devices and their interaction
![[condev device project 3.webp]]
![[condev device project 4.webp]]

3. Airtraffic Radar Sonar
![[condev device project 1.webp]]





