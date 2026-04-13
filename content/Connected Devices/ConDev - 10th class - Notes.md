20260407

If you make your system slow )just a tiny bit) people slow their expectations.
Make the change in your local system (Arduino with neopixel) match the dlay the bue bridge is having while sending to the Ardiuno.
when dealing with multiple devices in a system - make the responsesin sync with the one you can control the least.
Read the snesor all the time - send only when needed.

How you make what you can control understandable and readable is a good challenge. Regarding physical interface. 
Pick a friend and let them operate it. Then let them ask questions.

Final - HTTP API
Explore another web based API and come with a physical interface. By next week - pick one.
Sunrise & Sunset

How do i make a device display what I need to know - and how do people interact / understanding it.

References:
https://www.dwbowen.com/

Bluetooth:
Theres version 1, 2, 4. 
In version 1 and 2 it was 
Version 4 = BLE, low energy they shifted to publish and subscribe module.
toolBLEx - scans for bluetooth devices in your area. Pick the device and access it. It has characteristics and properties that you can change. 
Two types of devices:
Central - hosts services
Peripheral - scans for service 
Normal BT is continuously sending and receiving data, BT Low Energy is similar to Philips Hue - where it asks and receives only when needed.
