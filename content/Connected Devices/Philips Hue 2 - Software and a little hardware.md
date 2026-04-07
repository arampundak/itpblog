20260406

Summery of todays events:
- I used Claude AI with a method is called **Socratic teaching** - they asked questions that led me to figure things out by myself
- I've started with [[Philips Hue 1 - Getting the Jist]] and worked my way to understand the JSON sends by PUT & GET requests.
- Then I planned to build a small device inspired by: ![[ref - screen with knob.webp|300]]
- And made a circuit with the following parts (while documenting them for future use):
	[[Rotary Encoder]]
	I2C OLED Display Module 0.96 inches
	[[XIAO ESP32 C3]]
- Went over Amelia's blog:
	- She was sending HSB values continuously and the light kept flickering. Tom confirmed - **don't send PUT requests continuously**.
	- Using a NeoPixel

### Hardware:
A potentiometer gives you an _absolute_ position (always 0-1023). A [[Rotary Encoder]] gives you _relative_ movement - code needs to track a running number and increment/decrement it with each click.

By using an OLED screen I can create two states - two "screens":
- **Navigation state** — browsing the menu
- **Control state** — controlling a specific light
### Software:
**HTTP sits on top of TCP.** It uses the same connection underneath, but adds a structured "language" both sides agree on. TCP as road, and HTTP as the rules of the road.

When your sending a PUT to turn a light blue, it will:
1. Send a **request** — with the URL, the method (PUT), and the JSON body
2. Wait and receive a **response** — that list of `{"success": ...}` objects you saw

**Reference Points for 16-bit Hue**
RED - 0 / 65535
GREEN - 21845
BLUE - 43690

### Pseudo Codes
I had an iterative process writing and understanding pseudo code by myself:

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
	- turning: scroll through lights (3-9) 
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

#### 2nd try
```cpp
// Blinking light sketch

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
WORKED!
Light 8 physically blinked on and off every 2 seconds
### OLED test
Downloaded 
- **U8g2** by oliver
- **ArduinoJson** 

Uploaded a code to see the screen working. At first it didn't work, I added `Wire.begin(8, 9);` because GPIO8 conflict is real - you need to explicitly tell the ESP32 which pins to use for I2C.
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

The Encoder didn't work, or it worked but not feeding live, I tried switching it, I tried another code... nothing reasonable.
![[condev - encoder not work.webp|300]]
![[condev - ph encoder not.webp|300]]
After finishing I talked with Ines who showed me she was using 'EncoderStepCounter' library. Ill try that next time.
### Controlling light 5 with Potentiometer
![[condev - chnaging light with pot.mp4|300]]

After not succeeding troubleshooting the encoder, I tried using a potentiometer and a button.

**Hardware added:**
- `Wire.begin(8, 9)` - explicitly sets I2C pins for OLED (needed because GPIO8 conflicts with onboard LED)
- `U8g2` library driving the OLED display
- Potentiometer on GPIO0 reading brightness
- Button on GPIO2 confirming and sending

**setup():**
- Shows "Connecting..." on OLED while WiFi connects
- Shows "Connected!" on OLED when done
- The OLED gives visual feedback without needing a computer connected

**loop():**
- Reads potentiometer value (0-4095)
- Maps it to Hue brightness range (0-254)
- Updates OLED live showing current brightness value
- On button press — sends PUT only if brightness changed by more than 5 (`lastBrightness` noise filter)
- Waits for button release before continuing

**What happened when uploaded:**
- OLED showed "Connecting..." then "Connected!"
- Turning the pot updated the brightness number on screen in real time
- Pressing the button sent the brightness value to lamp 5
- The lamp physically changed brightness based on the pot position

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


