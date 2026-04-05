For this project I will use:
Rotary Encoder
I2C OLED Display Module 0.96 inches
[[XIAO ESP32 C3]]

Understanding behind the hood:
**HTTP sits on top of TCP.** It uses the same connection underneath, but adds a structured "language" both sides agree on. TCP as road, and HTTP as the rules of the road.

When your sending a PUT to turn a light blue, it will:
1. Send a **request** — with the URL, the method (PUT), and the JSON body
2. Wait and receive a **response** — that list of `{"success": ...}` objects you saw

