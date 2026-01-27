We downloaded WifiNina from the Arduino library manager. 
sandbox370 - a wifi network 
pass: tisch school of the art tandem school of engineering ! together ?
We ran 'ScanNetwrok' example from WifiNina
rule: Listen more then you speak

---

We wrote in the terminal this `nc -klw 2 8080` 
What it means:
nc: netcat 
-klw: keep, listening (to new connection from people), wait
2: seconds - im listening for 2 seconds
8080: listen on port

1. We opened "simpleTCPClient" code from Tom's github.
2. We created (setup) another file "arduino_secret.h" because it is written in line 29
3. In the file we wrote
```
#define SECRET_SSID "sandbox370" // wifi name
#define SECRET_PASS "cantellu" // wifi password (not online)
```
4. we uncomment line 27, and comment line 25
5. We changed the server address in line 35, first to my computers address. I got my computer address from the terminal.
6. Then we changed to Tom's computers address
7. We changed what we're saying in line 68 & 69
8. Upload to Arduino
9. It sends to Tom's computer
if we want to send to our own computer
10. instead of 6 - we opened the terminal and wrote netcat, keep listening (for) wait 2 seconds (the amount of time im listening) on port 8080
```
nc -klw 2 8080
```
11. The ardunio sends 
---

**Some server knowledge:**
http - 80
encrypted http -
ftp - 21
secured ftp - 22
all of these are low numbers less then 1000
if i want to open a server im doing that in the terminal and write just a number over 1000 - normally 8080 which is http (80) twice. The Ardunio knows to connect there because because I told him in line 36

---

**simpleTCPClient**
2 program
1. netcat - server listening and writing to a file log.json 
2. server listening to request - reading the file sending it to the client
we have 2 client 1 Arduinoi. 2 browser
Server is a program on the computer 

server by standard protocol http.server working in the same directory

A [[DOM]] by Tom: what we see in a browser, the html file is made of lots of objects, nested within each other. That page is static (plain old text) additional to that theres CSS that lets you style the objects in the DOM, and there JavaScript file - define the logic and send behavior to the DOM. Those 3 things are composing the DOM.

---
for next week:
[JavaScript Fetch example reading a remote file](https://tigoe.github.io/html-for-conndev/fetch) 
1. set up netcat and Arduino we got the stuff coming in
2. in another window we ran http server
3. both are in the same folder - addressing the same file (log.json file)
4. the browser can read this file and the Arduino can write to it
5. write an html file which will display this in a pretty useful way with JS and CSS
6. fetch JSON will get information from the Arduino and put into div (what is div)
7. using python3 to host local server listening 

**We are running client side javascript** 

for the office hours - can you explain the relationship between the computer and Arduino and server and html file and folder.