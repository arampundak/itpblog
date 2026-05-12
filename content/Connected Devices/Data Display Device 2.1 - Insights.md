Firstly - The collaboration with Fabri has been amazing and eye opening, i've earned a friend (that I highly appreciate) for life.
## Connection to Course Themes - Network Literacy

One thing this project did teach me deeply is what Tom means by "network literacy." Before this course, I thought of APIs as these abstract things that happened somewhere else. Now I understand that every time I make an API call, whether it's from an ESP32 or from JavaScript in a browser, I'm having a conversation with another computer using a specific protocol, and that protocol has rules and expectations.

REST APIs are essentially just structured ways of asking another computer to do something: "Give me this resource" (GET), "Create this new thing" (POST), "Change this thing" (PUT), "Delete this thing" (DELETE). And when you make one of those requests, you get back not just the data you asked for, but also metadata about whether it worked (status codes like 200, 201, 404, 500) and information about how to follow up (headers, rate limits, etc.).
I've learned so much about this while doing [[Philips Hue 2 - Software and a little hardware]].

Building a device that teaches this to others forced me to think about these concepts more clearly than I would have otherwise. What does DELETE actually mean? Well, it means you're asking the server to remove a resource, and if that resource doesn't exist, you get a 404, and if it does exist and gets deleted successfully, you get a 204 (no content). Those status codes aren't arbitrary, they're part of the vocabulary of HTTP.

The MQTT part taught me a different lesson about network protocols. MQTT is pub/sub instead of request/response, which means the communication pattern is fundamentally different from HTTP. The device publishes messages to topics, and the server subscribes to those topics. Neither side has to know about the other's existence, they just both have to agree on the topic names. That loose coupling is powerful, but it also means you have to think differently about state management and message ordering.
