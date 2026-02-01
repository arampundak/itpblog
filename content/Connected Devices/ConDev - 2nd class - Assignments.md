>**Build a tiny data pipeline from a physical sensor to a human-readable display.**
“Pretty and useful” =  **a form that helps someone understand change over time**

**Only the connection initiation matters**
**Client = asks**
**Server = answers**
**Client / Server is NOT about who sends data.**  
**It’s about who STARTS the connection.**

1. Arduino sends sensor data (JSON), Client - asks hi are you there?
2. Netcat logs it to a file, Server - “I’m here. If someone connects, I’ll accept it.”
3. Python serves that file, Server - listening on port 8080
4. Browser fetches it, Client - Browser sends an HTTP request: “GET /log.json”
5. JavaScript displays it meaningfully, Server - initiates an HTTP request
Arduino → Netcat → log.json → Python HTTP → Browser → JavaScript

---

WifiNina_Startup
- Found "WifiStatus" from Tigoe git page
- Created a new tab in Arduino IDE "arduino_secrets.h" and added my wifi name and passward
```
#define SECRETS_SSID "Maya&Aram"

#define SECRETS_PASS "Leondaking"
```
- Uploaded the sketch to Arduino
- anddddd - its connected to my network!
![[condev wifistatus.webp]]

---
WifiStatus
Popular thing to do is to get information from the web to make a web client or [[HTTP]] client. 
4 types of requests:
GET - asking for more information from the server.
POST - sending new information to the server.
PUT - updating previously posted data. 
DELETE - to delete posted data.
