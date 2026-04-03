20260331

==Looking for significant change from sensor data is KEY!==
What we have been talking about for the past 9 weeks
![[condev - client server.webp]]
SQLite - a database, text files are great for a specific kind of size, sometimes theres a useful limit for saving text - so we'll need another way of storing and then accessing the data.

**Diving into DATA**
Patterns of meaning in action 
Overall environmental change 
Sending the data reliably and sending it somewhere 
Overall system

Final Project: What we can do with HTTP
API -> Physical form

User Control of Something

---

Philips Hue
The Philips Hue app is an HTML request.
In the course website:
https://itp.nyu.edu/classes/light/resources/philips-hue-control/
Tom's system:
https://tigoe.github.io/hue-control/client-example-js/index.html?ip=172.22.151.226
172.22.151.226
And we need a password
Sending an HTTP request and get a JSON response
The lamps are using Zigby to the translator (box) the bridge listens to http requests and translates to Zigby home automation requests. 
Controller -> HTTP request -> Bridge -> Light Bulb
![[condev - hue.webp]]
**Web API**
Philips Hue maintains a good documentation of their Web HUE API V1. By using id (IP address) you can GET information about the lights.
![[condev - api debugger.webp]]

---

To do this by a micro-controller we need the HTTP Library: Arduino HTTP Client.
We need the light number the command and the property, we combine to them to a string called "request".

>PUT - put in database for the 1st time
POST - updating
But it depends in the API

The latest message 

