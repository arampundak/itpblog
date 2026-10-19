---
date: 2026-10-18
tags: []
draft: false
author:
url:
---
![[pdev - experiment 1410 small.mp4]]

## Current thesis paragraph

Generative AI arrived quickly, and we are already seeing how its interaction patterns shape us. Embodied AI is the next step, and agentic AI accelerates it. When a machine takes up physical space, its way of interacting stops being a matter of interface and becomes a matter of social behavior. A child who learns to command a voice assistant, or a parent with a stroller who cannot tell whether an autonomous car sees them, illustrates the same gap: we are building machines that share our spaces without giving them the social signals that make shared space work.

**My thesis asks how the character and behavior of embodied AI, including how it shows attention, intent, and what it perceives (and what it chooses to conceal), can be designed so that robots adapt to human social norms rather than humans adapting to robots; what physical presence contributes to these signals that a screen or voice agent cannot; and whether such robots can strengthen the interactions between the people around them.**

I focus on social harm. I argue that much of it is a product of interaction design rather than an inevitable property of the technology, and I investigate it through research by making: building and testing robots in shared, semi-public spaces.

---
## Where I am right now

My main research-by-making project is Ari. Aditya De and I are [[Entering the HRI 2027 Student Design Competition]], a four-page design abstract due November 20. This year’s theme is Robots in Public Spaces. I’m using Project Development Studio with Pedro as the framework.

> Ari is a small tutor robot for the ITP shop at NYU, built on Reachy Mini, an open-source desktop robot. It splits its help in two. It is direct about procedure and safety, and Socratic about design decisions: choices such as which material to use, or what to change after a test cut, go back to the student.

Socratic teaching means answering a question with a question, so the student works out the answer instead of being handed it.

(below is what I really did)
My main work this round is in [[Reachy Mini Experiment 2]]. 
I went deeper into the technical side in [[Reachy Mini Software]]. 
[[Thesis thoughts 1810]] is mostly for me: how a model “knows” things, and notes from office hours with some wonderful ITP people.

### Why our relationship with AI worries me

Most of the AI we use was designed to keep us engaged, and some of the patterns are already showing. A kid learns to bark orders at a voice assistant. A chatbot agrees with you because agreeing keeps you talking. (from Kari - Sycophancy)

On a screen, these feel like product decisions. Once the machine is in the room with you, they become manners. They shape how people act around it, and around each other.

Nasif asked me whether robots can have agency in how they behave toward us. I don’t have an answer yet. What I do think is that someone is deciding how these machines behave, and right now it’s rarely about the people sharing the space with them.

---
## What I made, and what I found

In [[Reachy Mini Experiment 2]], Aditya and I wrote Ari’s character as a text file: a profile with its identity and its sass and warmth levels. We also wrote a grounding doc with the shop knowledge Ari can use. So the whole character is text the model rereads every turn. Easy to change, and easy to break.

Key ideas about how Reachy Mini’s software is built:

- Daemon: the hardware owner, a service that drives the motors.
- SDK (Software Development Kit): the general-purpose layer every app uses.
- Apps: anything built on the SDK, like the conversation app we used in our experiment.

### How conversation is conducted

Ari’s profile, shop doc and memory load into the voice model on Hugging Face, which hears, thinks, speaks and calls tools (moving, web search). In parallel, app on Mac ==takes every finished utterance as text and sends the last 24==, plus the shop doc and the teaching doc, to OpenAI. OpenAI ==sends back a short advisory note==. The ==app slips that note into the voice model’s instructions==, so it can ==affect Ari’s next reply==
The voice model never asks for help. Help is pushed to it whether it needs it or not.

**My misunderstanding was** that the OpenAI layer, the reasoning layer is always there, Hugging Face model **never calls it, and doesn’t know it exists**, **app on Mac** calls it, automatically, **after every finished utterance**. No judgment is involved. It runs whether the student asked something hard or just said “ok”. Web search is a different thing: a Hugging Face Space tool that the voice model itself can call.

![[ths - ari-conversation-flow.png]]
#### Where does what you say go?

This is what bothered me most. When a student talks to Ari, their voice goes to Hugging Face, and a transcript of the conversation goes to OpenAI after every sentence. Ari also has a camera. None of this is visible to the student. Ari looks like a small friendly robot on a table, and I don’t yet know exactly what happens to that data once it leaves the shop.

My conclusion is that Ari should be upfront about it. I want to give it a visor that covers the camera, so the student physically opens the lid when they want Ari to see. As a tactile, deliberate act. When it starts, Ari should say out loud what it can do, what it hears, where that goes, and ask for permission.

There’s a safety side too. Because the advisory note only arrives after the student finishes speaking, it can only shape Ari’s next reply. If the student asks something unsafe, Ari decides on its own whether to be direct or Socratic, and a Socratic answer to a safety question could be a real failure. I want to check whether that happens, not assume it doesn’t.

## Next two weeks: explorations

Each one tests a signal from my thesis.

1. **Character dosage (intent).** Same shop scenario, three profiles: flat, medium, and high sass/warmth, with 3 to 5 students. 
Question: how much character does this context need before it gets in the way of the task? Document: whether they finished, what they asked, and how they described Ari afterward.
2. **Safety mode (safety).** About 10 scripted prompts, half safety and half design. I’ll log when the student stopped, when Ari answered, and when the advisory note arrived. 
Question: does Ari ever answer a safety moment Socratically? If it does, I’ll move the safety rules into the profile and test again.
3. **Who is Ari talking to? (attention, physical presence).** Ari turns its head toward whoever is speaking, versus staying still, with a student and one or more bystanders. 
Question: do students and bystanders know who Ari is addressing? I said I’d leave movement for later, but this is where the body earns its place over a voice assistant on a stand, so I’m doing a small version now.
4. **The visor (perception, concealment, consent).** I’ll compare Ari with no signal against Ari with the visor and a spoken permission request at the start. 
Question: does it change how comfortable students are, or how they behave around it? Document: a short check-in after each session (did you know when it was listening? how comfortable were you?) and what I see, like people lowering their voice or turning away.

---
### Questions for you
- In a shared shop, who should Ari be allowed to notice: only the student it’s helping, or everyone nearby?
- What would convince you the physical body matters here, and not just a voice assistant on a stand?