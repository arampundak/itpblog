#resource #software #networks 

Provisioning is the IT process of setting up, configuring, and making IT infrastructure—such as servers, software, network components, or user accounts—available to users and systems. It acts as a foundational deployment step, enabling rapid, authorized access to resources while ensuring security. Key benefits include faster onboarding, automation-driven efficiency, improved security, and optimized resource utilization.

Talked about over ConDev - for setting up and ESP32 to receive wifi from a mobile device.
The microcontroller opens up a hot spot connection to be seen as a server -> serves a webpage over http -> to be seen on your iphone -> to fill out the wifi name and pass -> microcontroller closes hotspot and tries to connect to the wifi

**Asked an LLM:**
Here's your understanding with a bit more precision:

1. **ESP32 creates its own WiFi network (SoftAP mode)** - Acts as an access point that your phone can see and connect to (like "ESP32_Setup" or similar)
2. **Runs a web server** - Serves an HTML configuration page, typically at `192.168.4.1` (default gateway IP)
3. **You connect your iPhone** - Join the ESP32's network, then navigate to that IP address in your browser to see the config page
4. **Fill in credentials** - Enter your home WiFi SSID and password in the web form
5. **ESP32 switches modes** - Closes the SoftAP, switches to Station (STA) mode, and attempts to connect to your WiFi network using those credentials

**A few common variations/details:**

- Some implementations use a **captive portal** that auto-opens the page when you connect (like airport WiFi) - this requires DNS trickery
- Some keep both modes running simultaneously (**AP+STA dual mode**) so you can still access the config page even after connecting
- Credentials are usually stored in EEPROM/flash memory so the ESP32 remembers them after power cycles
- Good implementations include a "reset" button/mechanism to re-enable the SoftAP if you need to change networks

**Alternative provisioning methods** you might encounter:

- **BLE provisioning** (Bluetooth instead of WiFi hotspot)
- **SmartConfig** (phone broadcasts encrypted credentials)
- **WPS** (push-button pairing)