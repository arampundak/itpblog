>**Build a tiny data pipeline from a physical sensor to a human-readable display.**
“Pretty and useful” =  **a form that helps someone understand change over time**

Read:
- [[That ‘Internet of Things’ Thing]]
- [[Why ‘Smart’ Objects May Be a Dumb Idea]]
-  

---

**Only the connection initiation matters**
**Client = asks**
**Server = answers**
**Client / Server is NOT about who sends data.**  
**It’s about who STARTS the connection.**
Client - eats at a restaurant, server - serves the dish. They often change between themselves.
Netcat - a port on my ethernet, EN0 (default wifi). The program that puts the data in the port.
Port - common time & place, like itp, where to go to get the data

1. Arduino sends sensor data (JSON), Client - asks hi are you there?
2. Netcat logs it to a file, Server - “I’m here. If someone connects, I’ll accept it.”
3. Python serves that file, Server - listening on port 8080
4. Browser fetches it, Client - Browser sends an HTTP request: “GET /log.json”
5. JavaScript displays it meaningfully, Server - initiates an HTTP request
Arduino → Netcat → log.json → Python HTTP → Browser → JavaScript

---

**WifiNina_Startup & WifiStatus**
- Found "WifiStatus" from Tigoe git page
- Created a new tab in Arduino IDE "arduino_secrets.h" and added my wifi name and passward
```
#define SECRETS_SSID "Maya&Aram"

#define SECRETS_PASS "my_pass"
```
- Uploaded the sketch to Arduino
- anddddd - ==its connected to my network!==

![[condev wifistatus.webp]]

---
**TestHTTPClient**
Making a request and waiting for response.
In this example we use the Arduino to connect to my home wifi and create a client to see a website "www,example.com". 
Popular thing to do is to get information from the web to make a web client or [[HTTP]] client. Theres a library that does this really well.
4 types of requests:
GET - asking for more information from the server.
POST - sending new information to the server. Form.
PUT - updating previously posted data. 
DELETE - to delete posted data.

---

**Connected Device Data Dashboard**
I uploaded WifiTCPCLientLogger to my Arduino.
Searched with `ipconfig getifaddr en0` my computers IP address, and changed it in the code. 
I netcated `nc -klw 2 8080` in the terminal to get readings from the Arduino sketch
Then `nc -lk 8080 | tee log.json` to write the sensor data to a log.json file in the same directory (main).
What this does:
- `nc -lk 8080` → listens for Arduino TCP messages
- `tee log.json` → prints incoming data to the terminal also writes it to `log.json`
Made it better with:
```
nc -lk 8080 | while read line; do
  echo "$(date +%H:%M:%S) $line"
done | tee -a log.json
```
so now it is also keeping track of time - but it didnt work for next part.
I `cd` my way to where the IDE file is saved together with index.html and script.js and ran 
`nc -l 8080 >> log.json & python3 -m http.server` 
I opened `http://localhost:8000` on my browser and now I can see the Arduino's reading on my browser.
![[condev Data Dashboard.webp]]
**Arduino → netcat/tee → log file → HTTP server → Chrome**.
This is the first stage in sending information from Arduino to a server. Next stage is getting a sensor and designing the webpage. 

---

