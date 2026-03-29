240326

On the Picket line with Shawn

We talked about: 
[[UDP]] - Universal Datagram Protocol
[[SSH]] - Secure Shell
[[FTP]] - File Transfer Protocol 
[[POP3]] - Post Office Protocol version 3

Vannevar Bush invented the idea
Tim Berners-Lee reinterpreted it to be Hyper Text 
HTML is how you create documents (Hyper Text Markup Language)
you send and receive them via HTTP

HTTP uses [[TCP]] to talk to servers and clients. 
HTTP is session-less, it gets the result and disconnects.
Sockets - an open connection to keep data at will
[[Websocket]] is for real time data transfer. 

Node is javascript for the command line, its powerful in the server side. Normally to be used with digital ocean.
We are going to use node to build a basic HTTP server, using a library named "Express".

We downloaded 
```javescript
import express from 'express'

const app = express()

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})
```

npm install express