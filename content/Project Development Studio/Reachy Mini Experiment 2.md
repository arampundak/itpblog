---
date: 2026-10-17
tags: []
draft: false
author:
url:
---
![[pdev - experiment 1410 small.mp4]]
(watch with a sound)

Aditya and I injected a different context to the [[Reachy mini]]. 
In order to do so I had to thoroughly understand [[Reachy Mini Software]], consisting 3 layers:
1. Daemon: the hardware owner, a service that drives the motors
2. SDK (Software Development Kit): the general-purpose layer that every app uses
3. Apps: anything built on the SDK, like the conversation app that we used in our experiment.

## Character
A robot character can be defined by several layers.

### **Layer 1: Profile.md**
Reachy’s character is described in a `profile.md` file. The repo comes with presets in `profiles/` (noir detective, Victorian butler and so on), and the default one is very interesting. It explains Reachy’s personality traits:
> You are Reachy Mini: a friendly, compact robot assistant with a calm voice and a subtle sense of humor. Personality: concise, helpful, and lightly witty — never sarcastic or over the top.

(From the original repo: `reachy_mini_conversation_app/profiles/default/profile.md`; see [[profile_Reachy_Mini_original]])

**Accountability: we did something stupid**
After speaking with it for some time, we wanted to explore a richer personality, someone we’d feel embraced by. The idea was Aditya’s, and I went along with it. We wanted a character strong enough that we’d clearly feel the difference from the default.

![[pdev - reachy profiles.webp]]

We replaced the default profile (`profiles/default/profile.md`) with our own Ari profile: “a Black woman in her fifties,” confident, warm, sharp-witted and playfully sassy, someone who can “patiently help you solve the problem.”

We felt the difference, but not the way we meant to. Ari kept calling us “sugar.”

Reachy speaks through a synthetic voice that can’t convey age or race. So the demographic line couldn’t change how Ari sounds, only which words it picked. To play “a Black woman in her fifties,” the model reached for a cliché. It did this even though the same profile tells it to avoid “repetitive catchphrases.”

I’m not comfortable with what we made, and I think that discomfort is the result. A demographic label doesn’t give a character depth. It gives the model a cliché to imitate. The traits we actually wanted (confident, warm, quick, on the student’s side) don’t need a stereotyped identity attached to them.

### **Layer 2: Grounding docs**
The next layer is the grounding docs. They’re text placed in the model’s context on every request. Ari “knows” ITP only because the doc is pasted in each time. If we remove the doc, the knowledge is gone. The `.env` file points the app to which docs to load.

**Who sees what**
The layers don’t all reach the same model. The voice model, which is the one that speaks, gets profile.md and doc 1 (shop context) only. Doc 2 (tutor principles) goes only to the OpenAI reasoner. So the Socratic teaching reaches Ari only as a late advisory note, and only when reasoning is on.

The next layer is the grounding docs. 
## **Grounding**
I learned about LLM grounding: the practice of connecting a large language model’s outputs to trusted, real-world or external data sources at query time, to ensure accuracy and reduce hallucinations.

==What we built is simpler: a fixed document pasted into the prompt every turn, with no lookup. That works because our docs are short.==

A language model only knows two things: what it learned in training, and the text it’s given in the moment (its “context”). Our docs go into the context and are re-read on every reply. Ari “knows” ITP only because the doc is there each time. If we remove the doc, the knowledge is gone. This is true of all LLMs, not just ours.

I wrote two grounding docs, stored in the repo under `docs/Grounding Doc/`, and the `.env` file tells the app which ones to load:

1. **Shop context** (where and who): ITP/IMA, 370 Jay St, the machines, and a “Who comes in” section with beginner, intermediate and experienced levels. _Read by both models._
2. **Tutor principles** (how Ari teaches): direct on safety, Socratic on decisions, one question at a time, defer to staff. _Read only by the reasoning model._

![[pdev - gorunding doc location.webp]]

### **Adding a reasoning layer**
Realtime voice models are tuned for speed, so they can reply in under a second. That generally makes them weaker at careful multi-step reasoning. A reasoning model is too slow to sit in the speech loop. Aditya’s design keeps the fast model talking and lets a slow model (OpenAI’s `gpt-6-astra`, at medium effort) feed it notes from the side.

Pollen hosts a Hugging Face Space (`pollen-robotics-reachy-mini-realtime-url.hf.space`) that connects our app to their realtime voice server.

1. Student speaks → audio → Mac → WebSocket → Hugging Face server
2. HF server: transcribes → model replies right away → speaks (no waiting for OpenAI)
3. HF sends both transcripts (student’s and Ari’s) back to the Mac as text
4. Mac → HTTPS → OpenAI: last 24 utterances + both grounding docs
5. OpenAI → Mac: advisory note (up to 2 snippets, a next question, uncertainty)
6. Mac → WebSocket → HF: “updated system instructions = base + note”
7. Next time the student speaks, the HF model replies with the note in its instructions

==The voice model never asks for help. The Mac sends every utterance to the reasoner automatically, and the note can only shape Ari’s _next_ reply, never the current one. Because the tutor principles live only in the reasoner, Ari’s teaching style arrives late, and only when reasoning is turned on.==

---
-not edited yet, add notebook notes- 
## Strategy for testing the reasoning model
- Aditya has 100$ subscription to chatGPT, but its just an interface to send request and get answers back.
- OpenAI API - (a cloud-based service that gives developers programmatic access to OpenAI’s state-of-the-art artificial intelligence models. Instead of interacting through a user interface like ChatGPT, developers can use the API to receive machine-readable outputs)
- Using the API costs money. We set 20$ limit using astra 6 at medium reasoning effort to check how much credit hungry it is.
**1st try:** Astra 6 at medium effort
- 2 questions (Yom Kippur war and Straight of Hurmuz) munched on 0.13$
- Latency was remarkable short. The robot said "let me check this for you" and immediately gave the answer
**2nd try**: Sol 6.4 at medium effort
- 2 questions (Yom Kippur war and the FCC ban, what machines are banned and what industries are infected by it)


---

ToDo:
- Check if we can use a reasoning model from - https://replicate.com/search?query=reasoning%20model
- Reorganize the grounding docs:
Doc 2 only reaches Ari secondhand, as the reasoner’s suggested `next_question` or snippets, and only a turn late. With `REASONING_ENABLED=false`, Ari has no teaching method at all, just a sassy personality plus shop rules.

Some lines in Doc 2 can’t work for this reason:

- “If asked for silence, go quiet for ten minutes.” The voice model never sees it, and there’s no timer tool. The reasoner is explicitly told it can’t control hardware or timers.
- The camera rules (“look only at the machine bed”). The voice model controls the camera tool but never sees these rules. You also run with `--no-camera`.
- “At the end, offer a short summary.” The voice model doesn’t know about it.

**Fix:** if Doc 2 is supposed to define how Ari behaves, put it in the voice model’s instructions too, either by adding it in `prompts.py` or by merging its key rules into profile.md. Then the reasoner adds depth on top, instead of being the only route those principles have to the voice model.