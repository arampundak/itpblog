20260406
End of night before - the build didn't work like I wanted, but i've learned a bunch!

For this project I will use:
[[Rotary Encoder]]
I2C OLED Display Module 0.96 inches
[[XIAO ESP32 C3]]

### Understanding behind the hood:
**HTTP sits on top of TCP.** It uses the same connection underneath, but adds a structured "language" both sides agree on. TCP as road, and HTTP as the rules of the road.

When your sending a PUT to turn a light blue, it will:
1. Send a **request** — with the URL, the method (PUT), and the JSON body
2. Wait and receive a **response** — that list of `{"success": ...}` objects you saw

A potentiometer gives you an _absolute_ position (always 0-1023). A rotary encoder gives you _relative_ movement - code needs to track a running number and increment/decrement it with each click.

Two states, two "screens":
- **Navigation state** — browsing the menu
- **Control state** — controlling a specific light

From Amelia's blog:
- She was sending HSB values continuously and the light kept flickering. Tom confirmed - **don't send PUT requests continuously**.
- The NeoPixel idea - I had the same one :)

### Pseudo Codes

**Pseudo Code 1**
SETUP: 
- connect to wifi
- GET to know the lights 
LOOP:
- if navigation state: choose the light
- if control state: PUT the users choices

**Pseudo Code 2**
SETUP: 
- connect to WiFi (sandbox370) 
- GET /lights → store available lights + current values 
- set state = NAVIGATION 

LOOP: 
- if state = NAVIGATION: 
	- turning: scroll through lights (3-7) 
	- clicking: select light → state = CONTROL, sub-state = SUB-MENU 

- if state = CONTROL: 
	- if sub-state = SUB-MENU: 
	- turning: scroll (on/off, brightness, color, GO BACK) 
	- clicking: enter selection 
		- GO BACK → state = NAVIGATION 
	- if sub-state = ON-OFF: 
	- turning: toggle ON / OFF 
	- clicking: → PUT {"on": true/false} → sub-state = SUB-MENU 
	- if sub-state = BRIGHTNESS: 
		- turning: change value (0-254) 
		- clicking: → PUT {"bri": value} → sub-state = SUB-MENU 
	- if sub-state = COLOR: 
		- turning: change hue value (0-65535) 
		- clicking: → PUT {"hue": value, "sat": 254} → sub-state = SUB-MENU

**About strings for code**
In C++, a String is wrapped in quote marks `"like this"`. So if you want to put quote marks **inside** a string, the compiler gets confused:
```cpp
"{" on": true}"  // compiler thinks the string ends at the 2nd "
```
The backslash is an **escape character** — it tells the compiler "this quote mark is part of the string, not the end of it":
```cpp
"{\"on\": true}"  // compiler understands the whole thing is one string
```
It's like saying "this quote mark is literal, don't interpret it."

### Code
#### 1st try
```cpp
#include "WiFi.h"
#include "arduino_secrets.h"
#include "HTTPClient.h"
char ssid[] = SECRET_SSID;
char pass[] = SECRET_PASS;
char hueHubIP[] = "172.22.151.226"; // IP address of the HUE bridge
String hueUserName = "QL6AHnxaf3-3YER9xoBCp8DRDsfweUcfuuAtmqP5"; // hue bridge username

void setup() {
//Initialize serial and wait for port to open:
Serial.begin(9600);
// while (!Serial); // wait for serial port to connect.
WiFi.begin(ssid, pass);
while (WiFi.status() != WL_CONNECTED) {
delay(500);
Serial.print(".");
}

// you're connected now, so print out the data:
Serial.print("You're connected to the network IP = ");
IPAddress ip = WiFi.localIP();
Serial.println(ip);
HTTPClient http;
http.begin("http://172.22.151.226/api/QL6AHnxaf3-3YER9xoBCp8DRDsfweUcfuuAtmqP5/lights/8/state");
http.addHeader("Content-Type", "application/json");
int responseCode = http.PUT("{\"on\": true}");
Serial.println(responseCode);
http.end();
}
void loop() {
}
```

WORKED! 
I built a microcontroller that connects to WiFi and controls a Philips Hue light over HTTP.

Reference Points for 16-bit Hue
RED - 0 / 65535
GREEN - 21845
BLUE - 43690

#### 2nd try
```cpp
#include "WiFi.h"
#include "arduino_secrets.h"
#include "HTTPClient.h"
char ssid[] = SECRET_SSID;
char pass[] = SECRET_PASS;
char hueHubIP[] = "172.22.151.226"; // IP address of the HUE bridge
String hueUserName = "QL6AHnxaf3-3YER9xoBCp8DRDsfweUcfuuAtmqP5"; // hue bridge username

void setup() {
//Initialize serial and wait for port to open:
Serial.begin(9600);
// while (!Serial); // wait for serial port to connect.
WiFi.begin(ssid, pass);
while (WiFi.status() != WL_CONNECTED) {
delay(500);
Serial.print(".");
}
Serial.println("Connected!");
IPAddress ip = WiFi.localIP();
Serial.println(ip);
}

void sendRequest(int lightNumber, String body) {
String url = "http://172.22.151.226/api/QL6AHnxaf3-3YER9xoBCp8DRDsfweUcfuuAtmqP5/lights/";
url += lightNumber;
url += "/state";
HTTPClient http;
http.begin(url); // what goes here instead of the hardcoded URL?
http.addHeader("Content-Type", "application/json");
int responseCode = http.PUT(body); // what goes here instead of hardcoded JSON?
http.end();
}

void loop() {
sendRequest(8, "{\"on\": true}");
delay(2000);
sendRequest(8, "{\"on\": false}");
delay(2000);
}
```

### OLED and such
Downloaded 
- **U8g2** by oliver
- **ArduinoJson** 

Uploded a code to see the screen working. At first it didn't work, I added `Wire.begin(8, 9);` because GPIO8 conflict is real - you need to explicitly tell the ESP32 which pins to use for I2C.
``` cpp
#include <Wire.h>
#include <U8g2lib.h>
U8G2_SSD1306_128X64_NONAME_F_HW_I2C u8g2(U8G2_R0, U8X8_PIN_NONE);

void setup() {
Wire.begin(8, 9);
u8g2.begin();
u8g2.clearBuffer();
u8g2.setFont(u8g2_font_ncenB08_tr);
u8g2.drawStr(0, 20, "Hue Controller");
u8g2.sendBuffer();
}

void loop() {
}
```
![[condev - ph screen.webp]]

**Checking the Encoder** 
Only the click:
```cpp
#define SW 2

void setup() {
Serial.begin(9600);
pinMode(SW, INPUT_PULLUP);
}

void loop() {
if (digitalRead(SW) == LOW) {
Serial.println("pressed!");
delay(300);
}
}
```

The Encoder didn't work, or it worked but not feeling live, I tried switching it, I tried another code... nothing reasonable.
![[condev - encoder not work.webp]]
![[condev - ph encoder not.webp]]

### Controlling light 5 with Potentiometer
After trying to troubleshoot without success, I switched to using a potentiometer and a button.
```cpp
#include "WiFi.h"
#include "arduino_secrets.h"
#include "HTTPClient.h"
#include <Wire.h>
#include <U8g2lib.h>
  
char ssid[] = SECRET_SSID;
char pass[] = SECRET_PASS;
U8G2_SSD1306_128X64_NONAME_F_HW_I2C u8g2(U8G2_R0, U8X8_PIN_NONE);
#define SW 2
#define POT 0
int lastBrightness = -1;

void setup() {
Serial.begin(9600);
Wire.begin(8, 9);
u8g2.begin();
pinMode(SW, INPUT_PULLUP);
u8g2.clearBuffer();
u8g2.setFont(u8g2_font_ncenB08_tr);
u8g2.drawStr(0, 20, "Connecting...");
u8g2.sendBuffer();

WiFi.begin(ssid, pass);
while (WiFi.status() != WL_CONNECTED) {
delay(500);
Serial.print(".");
}
Serial.println("Connected!");
u8g2.clearBuffer();
u8g2.drawStr(0, 20, "Connected!");
u8g2.sendBuffer();
delay(1000);
}

void sendRequest(int lightNumber, String body) {
String url = "http://172.22.151.226/api/QL6AHnxaf3-3YER9xoBCp8DRDsfweUcfuuAtmqP5/lights/";
url += lightNumber;
url += "/state";
HTTPClient http;
http.begin(url);
http.addHeader("Content-Type", "application/json");
http.PUT(body);
http.end();
}

void loop() {
int potValue = analogRead(POT);
int brightness = map(potValue, 0, 4095, 0, 254);
Serial.println(brightness);
u8g2.clearBuffer();
u8g2.setFont(u8g2_font_ncenB08_tr);
u8g2.drawStr(0, 20, "Brightness:");
char buf[10];
itoa(brightness, buf, 10);
u8g2.drawStr(0, 40, buf);
u8g2.sendBuffer();

if (digitalRead(SW) == LOW) {
if (abs(brightness - lastBrightness) > 5) { // only if changed by more than 5
String body = "{\"on\": true, \"bri\": ";
body += brightness;
body += "}";
sendRequest(5, body);
lastBrightness = brightness;
}

delay(1000);
while (digitalRead(SW) == LOW);
}
}
```

This works...
![[condev - chnaging light with pot.mp4]]
