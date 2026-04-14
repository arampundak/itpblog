20260414

We talked about [[API]] for the Data Display Device project. 
Explore the API and express that - how many astroids go past earth at moon distance? we don't know - but NASA does!

**How to open API json in a readable way**
Go to NASA site
generate api key
get long string starting with https://
put date
put in single quotes
open terminal
`curl ... >> astroids.json` (just a name of file) that will sit on the desktop
`code asteroids.json` - to open the file in VScode
cmd K
cmd F
get a nicely formatted file in json form

Intro to NODE.js
Web server setup connect to micro services small node.js programs that can serve dynamic data or connect to other protocols like mqtt. A micro service is a program that can respond to web request or can take a web request and interface with another service like mqtt or data.
NGINX.org - what Tom uses for his site

Run node.js on local desktop
Setting up RESTful web service with nginx (and node.js)
node,js is a command line tool. node is javascript
it runs real time engine javascript in the command line interface.
IT sets up building web servers, web clients, mqtt servers - all in the terminal.
node.js to javascript is like arduino to C++
tigoe.github.io - Node examples.
/light/8 = RESTful web service, the / is the definition.

**4 lines server example**
The program is requesting access to a specific port - listen to incoming request from that port, ill listen to http format request and respond in the same format.
The FourLine server is a folder
oldar.server.js is the program
package.json describes the project 
public folder is for ppl to see, it has 
in VScode:
``` bash
cd FourLineServer
node server.js
```
Now we have a server! we can find the ip address adding /8080.

---
We are creating a server from fresh
Open a new folder, cd to the folder, then:
```bash
touch server.js # create a new text file in the folder
npm install express # install the node library in the same folder, by default is "node_modules" with all the shit files needed for express. npm alse created "package.json"
```

we good practiced how to keep the folders lean and clean and mean.
you download only server.js and package.json is a manifest that holds what is inside the shipment, it holds the libraries references and names but not the libraries themselves - thats for you/me to download by:
1. create a js file
2. install any libraries you need using npm install
3. do npm init to create a package.json file
4. write code
then
5. just upload the files and package.json in a directory

---
NGINX
is the gate way to all these micro services
**a server can close itself (lose connection) if you don't use the terminal for a period of time due to security with SSH.**
When we define a session between two hosts - how long the session is open (tell it to keep for 30 mins even if theres no connection). this session is a gateway for a third party to intercept the communication.
`ps -a` - to look at the communication? 
There are tools to see the server pm2 is a program which runs scripts as constant services, like a manager, to start process or stop. `pm2 start proxey-service` `logout` to exit the process while keeping the program running in the background, while if we don't use these tools and we close the terminal it will kill the server as it is in the foreground together with you in the terminal.

POST request to the server?
`curl -X POST -d 'hello=class' http...`

