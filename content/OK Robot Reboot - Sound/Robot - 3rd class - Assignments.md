**Imperfect Robotic Interaction:**  
In groups of 2, research and Implement some kind of existing technology, tool, library, or API, to develop an _Imperfect Robotic Interaction._

_**Constraints:**_

- Appropriates an existing technology.
- Utilizes Voice as a main form of Input.
- Have at least 3 exchanges.

_**Thought Starters:**_

- What is the user expectation for this experience?
- How does the personality of the BOT influence the interaction? ([Marvin](https://en.wikipedia.org/wiki/Marvin_the_Paranoid_Android) the paranoid android vs [Bender](https://en.wikipedia.org/wiki/Bender_\(Futurama\)) the antihero from Futurama)
- How does the implemented technology enhance or constrain the experience?

---
I've read and saw
- [[Personality in Design]]
- [[Semantics - Gricean Maxims]]
- [[Why you should make useless things]]
---

IBM cloud - https://cloud.ibm.com/services/speech-to-text/crn%3Av1%3Abluemix%3Apublic%3Aspeech-to-text%3Aau-syd%3Aa%2Fcc4f6eec43454bd4b17480059fa5428f%3A79db155b-34c2-42de-8a7b-0472ab647a33%3A%3A?paneId=manage&new=true

For this weeks assignment I coupled up with Fabri to create an imperfect interaction softbot. Since both of us made an answering machine for last week we thought to delve more and continue developing a **voice-based softbot**: a small conversational system that listens, speaks back, and intentionally misunderstands the user before letting them proceed.

Technically, it’s a **turn-based speech interaction loop** built on top of **IBM Watson Speech-to-Text**, macOS text-to-speech, and a custom state machine that controls behavior and timing.

Each interaction happens in **discrete turns**:

1. The system speaks.
2. It records audio for a fixed time window.
3. It sends the audio to Watson.
4. It waits for a final transcript.
5. It interprets the result.
6. It responds.
7. It loops.

This structure is deliberate - the bot is not “always listening.” It listens only when _it decides to_. 

We found that the softbot is already misundersanting what the user is saying, we added a code that makes the robot randomize between the words he's hearing to make the interaction more imperfect. Little did we know how much it is unnecessary.

![[robot class 3 hw 2.mp4]]


---
While I ran IBM's Watson on my computer I had some troubles accessing the file, and I had to change in the code `http:` to be `wss:` because 'wss' is continues.

from LLM:
What you just fixed (conceptually):
You were trying to open a **WebSocket** connection, but you gave it an **HTTP URL**.
Those are related, but **not the same protocol**.

HTTP / HTTPS ≠ WebSocket

- **HTTP / HTTPS**
    - Request → response
    - Short-lived
    - Stateless
    - Think: “ask a question, get an answer, connection closes”

- **WebSocket (ws / wss)**
    - Long-lived, always-open connection
    - Two-way, real-time
    - You can _continuously send data_ (audio chunks) and receive data (transcripts)
    - Think: “open a phone call and keep talking”


Speech-to-Text streaming **cannot work over HTTP**, because:
- You’re sending **live microphone data** chunk by chunk
- The server is sending **partial + final results** back asynchronously
That requires a persistent pipe → **WebSocket**.

---

### Why `wss://` specifically?

- `ws://` = WebSocket (unencrypted)
- `wss://` = **WebSocket over TLS** (encrypted)

It’s the WebSocket equivalent of:

- `http://` → `https://`

IBM Watson **requires encryption**, so:

- `https://` ❌ (wrong protocol)
- `ws://` ❌ (not secure)
- `wss://` ✅ (secure WebSocket)

That’s why the error was:

> `ValueError: scheme https is invalid`

The `websocket-client` library literally checks:

> “Is this `ws` or `wss`?”  
> If not → hard fail.

---

### Mental model (keep this forever)

|You want to do|Use|
|---|---|
|Fetch data once|`https://`|
|Stream audio / video|`wss://`|
|Live sensors|`wss://`|
|Chat / multiplayer / robots|`wss://`|

So whenever you see:

- **streaming**
- **real-time**
- **continuous**
- **mic / camera / sensors**

Your brain should go:  
👉 “Ah. This is a WebSocket thing.”

---

### Why this matters for _your_ trajectory

This is **exactly** the plumbing behind:

- Voice assistants
- Social robots
- Live robot perception
- HRI systems
- Telepresence
- Networked devices walking through cities (👀 Wi-Fi project…)

You didn’t just fix a bug — you crossed a threshold into _real-time systems_.

---

References:
[[Mystery Animal]]
