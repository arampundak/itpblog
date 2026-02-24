Designed for real-time ==communication between devices in an IP-based networked device ecosystem==. It ==operates over TCP/IP using a publish/subscribe model==, where devices (referred to as clients) can ==publish messages to specific topics or subscribe to topics to receive messages==.
**Message Queuing Telemetry Transport** is a broker, the broker is a message router. The broker receives messages published by clients, filters them by topic, and distributes the messages to subscribed clients. ==It does not generate or consume data directly but rather routes messages between clients==.
Clients that send messages - ==publishers are separated from subscribers== - those that receive messages, allowing them to exchange information without requiring direct connections or awareness of each other’s existence.

main components: Publisher, Subscriber, Broker, and Topic.

Messages are organized into **topics**. Typically, a topic represents a device, with each sub-topic representing its characteristics. For example, a weather station might have the main topic “station” with subtopics “temperature”, “humidity”, “air quality”, and so forth. The weather station itself would send messages to each of the subtopics, and a web client might subscribe to those topics to graph them onscreen over time. ==All communication is message-based, not session-based==.

Resources:
MQTT.js - https://github.com/mqttjs/MQTT.js?tab=readme-ov-file#example


In MQTT world
The HTTP server only serves:
`index.html`
`script.js` 
`style.css`
the browser connects directly to the broker over WebSockets. So the live data never touches the HTTP server.
MQTT still requires wifi connection on both sides - the device and the computer - MQTT is just the messaging protocol used over that network.

You use MQTT in **two places**:
1. On the **ESP32 (C++)** → it **publishes**
2. In the **browser (JavaScript)** → it **subscribes**
3. While having an **MQTT broker** (the message router)

It listens on:
- `1883` (MQTT over TCP)
- `9001` (MQTT over WebSockets for browser)
The broker does **nothing but route messages**.

I installed mosquitto on terminal
next is ==Step 3: Enable WebSockets==

---
References:
- [An Introduction to MQTT](https://itp.nyu.edu/networks/explanations/an-introduction-to-mqtt/) by Liyan Ibrahim 
- [MQTT Examples](https://tigoe.github.io/mqtt-examples/) for Arduino and JavaScript
- Try out a [desktop or mobile client](https://tigoe.github.io/mqtt-examples/#desktop-and-mobile-client-apps) with an [existing MQTT broker](https://tigoe.github.io/mqtt-examples/#mqtt-brokers) like mosquitto.org or shiftr.io