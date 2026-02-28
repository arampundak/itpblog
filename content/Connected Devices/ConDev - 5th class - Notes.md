240226

A discussion on battery use in IoT - How people are getting used to technology? whats the tech change and society change? 

[[Frozen In Time - The Great Blizzard of 1888]]

Being able to see our sense of data - and how the data changes over time. 
When you give a user a sense of change - an LED blinking - it matters how they perceive this indication.
Tool making / Expressive making - how we know what we know - look and see that over time are making this true. How do we see something over time, how do we describe what we want the audience to see smell etc. 
Look at the data yourself - don't throw it immediately to an LLM. 
==Sense accurately - REPORT accurately== 
State Machine - shifts from one state to another based on a shift happening, indicates the state of the machine - LED to say connected to the network, LED to say "my sensor is working". Ask - who is using the device? what would make them trust the device?
Taking an action -> That action succeed -> Change of state
*Melanotic EDI - how much cyan light do we get - and how does that effects our Melatonin levels.*
What this class is about = Ask: What do I care about? Make an assumption about it, Use the readings to understand the hypothesis.
Determine Location - that would change the device. Outside means robust, itp floor is easier, home might be different. 

Tom: 2 use cases
1. I want to know if there is wifi - Booz
2. How can we examine where the best wifi is: we are making a scanning tool. "you are not your own user": NYU IT job is to see if wifi is working well. How does wifi changes over time, we could have a hypothesis - some of the wifi hotspots on the floor shut down at night because no one is using them for a time period - we can check that with a mobile tool - adding BSSID to know when and where we took the measurement tool. Our device is a detective, a tool to find out about the wifi. To check Upload-Download performances we need high band width - and microcontrollers are not good with that.

---

![[condev - class 5.1.webp]]

MQTT in class with Tigoe.net
- ==downloaded== MQTT explorer
- This app is a client
- Name of this specific broker ==shifter.io==
- host - know to need to connect to the host: =="public.cloud.shifter.io"==
- Port - you might get 2, secure and insecure - ==1883==
- User name and Pass - depends on the broker, some are set up with a password some are not, in our case - Username: public, Pass: public
- Press "Connect"

We did the same thing with tigoe.net
webserver is a program running on server
server never emmets a message it waits for the client's request
https://github.com/tigoe/mqtt-examples/blob/main/arduino-clients/ArduinoMqttClient/ArduinoMqttClient.ino

---
MQTT in class with Arduino


---

TALK TO IT PPL!