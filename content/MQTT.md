MQTT is a broker, the broker is a message router.
In MQTT world
The HTTP server only serves:
`index.html`
`script.js` 
`style.css`
the browser connects directly to the broker over WebSockets. So the live data never touches the HTTP server.
MQTT still requires wifi connection ob both sides - the device and the computer - MQTT is just the messaging protocol used over that network.

You use MQTT in **two places**:
1. On the **ESP32 (C++)** → it **publishes**
2. In the **browser (JavaScript)** → it **subscribes**
3. While having an **MQTT broker** (the message router)

It listens on:
- `1883` (MQTT over TCP)
- `9001` (MQTT over WebSockets for browser)
The broker does **nothing but route messages**.

I installed mosquitto on terminal
next is ==Step 3: Enable WebSockets (very important)==