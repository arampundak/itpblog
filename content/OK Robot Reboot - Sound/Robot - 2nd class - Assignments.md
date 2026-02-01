Build a command line interaction that uses text-to-speech and post on your blog.  
_**Constraints:**_

- Takes text inputs and delivers speech outputs.
- Triggered on the terminal with a single command and runs without a GUI.

_**Thought Starters:**_

- Does this interaction serve any purpose?
- Can you make this interaction more playful?
- How does the technology enhance or constrain the experience?

---
I've read and saw
- [[The Automatons of Yesteryear - New York Times]]
- [[The Google App's New Voice]]
---
For this weeks assignment I made an IVR - Interactive Voice Response machine. My initial idea started with:

>Hello this is a voice recording, please confirm: for i am not a robot press 1, for robot press 2
1 - thank you for your confirmation. you can now choose the playback speed, type in 0.75 / 1 / 1.25 / 1.5 / 2 / 5
2 - old school internet sounds

![[ORR - ivr 1.m4a]]
![[ORR - ive 1.webp]]

The process of getting there:

---

I am building a **softbot that receives commands in the command line**, they live in a python file while the terminal _is_ their stage.
To start I ran by my self cmd line to python pipeline.
I ran the terminal and navigated `ls` &`cd` to the folder where the python scripts given by Pedro are saved.
-> python3 + name.file + "i love you" -> the computer reads what i wrote in the terminal - i love you
`arampundik@Mac python % python3 tts_say.py "i love you"`

![[orr - vs code and terminal.webp]]

And used the tech tip to run a local server - saw the repository
![[orr - local server.webp]]
 From here Im thinikng of different ways and interactions between a typing user and a talking softbot. Ill try two options - Telephone conversation softbot, where the user type in numbers to choose how they continue. A singing sofbot that creates A Cappella.

---

Given files are age/flite/labs/say/watson_ssml/watson - all are “talking machines,” but they sit at very different layers of the stack, some let you “direct” the performance while others barely let you choose the actor.

---

I made an account with IBM Cloud and got **Credentials**: API key & URL - These are to get access to Watson Model.
Then I used the command line to summon the model through API with IBM credentials given to me to write text (text-to-speech) so dear Watson will read it.
```
  --header "Content-Type: application/json" \

  --header "Accept: audio/mp3" \

  --data '{"text":"hello from watson"}' \

  --output hello.mp3 \

  "https://api.us-south.text-to-speech.watson.cloud.ibm.com/instances/4694630c-abe4-4f48-bb66-43bef985f590/v1/synthesize"

afplay hello.mp3

  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current

                                 Dload  Upload   Total   Spent    Left  Speed

100 10482    0 10454  100    28  24183     64 --:--:-- --:--:-- --:--:-- 24263

arampundik@Mac ~ % curl -X POST \

  -u "apikey:XILTMSlf5UL303tzP_bWe7WmzrHLVGEbTtEI1NhbZ3lE" \

  --header "Content-Type: application/json" \

  --header "Accept: audio/mp3" \

  --data '{"text":"hello and fuck you"}' \ 

  --output hello.mp3 \

  "https://api.us-south.text-to-speech.watson.cloud.ibm.com/instances/4694630c-abe4-4f48-bb66-43bef985f590/v1/synthesize"

afplay hello.mp3
```

---
Moving towards more complexity 
**Terminal text → Python → Watson API → MP3 → `afplay` → sound.**
Meaning there is a python file waiting to be used from the terminal command line, before reaching the file with `python3 tt_watson_aram_1.py "hello"` I have to let it know IBM's Watson credentials with:
```
export IBM_TTS_APIKEY="..."
export IBM_TTS_URL="..."
```
Combined with a code written by LLM I managed to follow the pipeline of writing text in terminal to python to Watson.

---
To run it like a real command I added 
```#!/usr/bin/env python3``` 
at the very top - that tells the terminal to run this file directly using `python3` to execute it.

---
Then I wrote in the terminal: 
```
chmod +x tt_watson_aram_1.py
```
- `chmod` → change permissions
- `+x` → add “executable” permission

---
Now I can get to the file folder with:
/Users/arampundik/Documents/NYU/Y1/Spring/OK \Robot \Reboot/2 Class/OkRobotReboot_Voice-main/examples/01_TTS/python
```
./tt_watson_aram_1.py "hello"
```
and it will say "Hello" or whatever is written in the cmd line.

This is now a **command-line interaction**, not “a Python demo”.

---

