---
date: 2026-09-30
tags: []
draft: false
author:
url:
---
Agents as fake users.
Invite the problem of having a million people using your app.
Commit and understand these steps to be a full-stack developer:

>[Video recap](https://nyu.zoom.us/rec/play/KPMaOWo4Cv9lMtU1uBKkFuFQ0NiyuswW4OtE2pzuJdzESitxsdO4-40G5uGXLtPVjih459QKD4-WQccr.IJ1kWOpugwXvCt_I?autoplay=true&startTime=1790437931000) of full environment in one place.
>- IDE with Vibe Coding (Antigravity)
>- Simple JS, HTML, CSS
>- Vibe very simple Bouncing Ball in Vanilla JS
>- Github Account
>- Publish to Git Hub — put address in blog
>- Commit to Git and Sync with Github
>- Git Hub Pages -- public url for web hostin
>- Shop on Replicate.com for AI Models
>- Use the Proxy to connect to Replicate
>- Create Firebase Project
>- Create Firebase App
>- Get Credentials
>- Create Firestore Database
>- Install Firebase CLI
>- Make Firebase Connection in JS
>- Realtime Database (not shown in class)

Firebase was invisible to me, as an invisible infrastructure holding our world. Its a topic being researched and discussed for years, and now feels very critical and yet boring.
[[Invisible Roommates - Eran Hilleli & Nicole He]] - is a beautiful project about that. But because the animator is great.

Skills for AI - they are not deterministic, they might suggest you going to a tech that surly will work ("how much is 7+4" "go use a calculator").

How to hide your Firebase API key - **by doing authentication!**
Changing the rules for Realtime Database
"if they're authenticated let them read and write"

Jonathan Haidt - American social psychologist and author.  Also an NYU professor. Tha tail that wags the dog - we make intuitive moral judgments but we act like we thought them up, what we think happens to us.
_The Righteous Mind: Why Good People Are Divided by Politics and Religion_ is a 2012 social psychology book by Jonathan Haidt that ==argues moral judgments stem from emotional gut feelings rather than cold, rational logic==.

With Firebase - you get for free real time connectivity to whoever is in that database. 
Connections:
- Client JS
- Server Firebase
What are ways to talk? you communicate by talking to a server to bounce off of. Writing to a database.
- HTTP connection - to API, Proxy. Its a very limited connection - only one way from client to server to client and then shuts down.
- Socket connection - different then HTTP. A socket is by directional - the server can originate a message - its proactive. This what allows real time. 

HTTP was not meant for synchronous tasks. if you want 2 ppl on the screen at the same time - use Websocket

- WebRTC - for sound and video. Its not a tunnel like Websocket, you just send the packs sounds pixels all the data and hope it arrives. HTTP and Websocket are reliable and gets checked if arrived. 

---
Authentication
DanO showed how to connect Firebase to gmail login authentication.
Reputation manager - we behave better when we're sure its not anonymous. To keep track of the realness of people and to hold them accountable for who they are and how they use the system. 

Identify that someone is not a real person. 
Don't cry over something that cant cry over you. 
Have the problem of scale to have a ,multi user saving different version of their web traces, clouds ideas, book connections. They become a data line in fire base instead of having to make a new email every time.

**Remember to add where your site might be hosted in this page:**
![[sn - class 5 auth.webp]]
