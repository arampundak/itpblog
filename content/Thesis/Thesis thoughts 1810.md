---
date: 2026-10-18
tags: []
draft: false
author:
url:
---
## **How Reachy Mini’s software is built**

- **Daemon:** the hardware owner, a service that drives the motors.
- **SDK (Software Development Kit):** the general-purpose layer every app uses.
- **Apps:** anything built on the SDK, like the conversation app we used in our experiment.

## **How does a model “know” things?**

1. **Weights (training).** Billions of numbers fixed when the model was trained. This is its general knowledge: language, facts about the world, how to write code. It’s frozen and doesn’t change when you use the model.
2. **Context (the prompt).** The text handed to the model during a conversation: instructions, documents and the conversation so far. The model reads all of it every time it replies, and forgets it once the reply is done.

That means a robot’s character, written in a profile, lives in context, not weights. It’s swappable, and it has to be re-read every turn.

**Grounding** means connecting an LLM to a data source so it has specific knowledge. In my case, that’s what Ari knows about the shop.

**Movement** policy is a big part of how character is perceived. I’ve started to understand how Reachy Mini moves, and I’ll go deeper later.

---

## **Conversations from the past weeks**

_Office hours with Nasif, 08/10_

- Read _How to Write a Thesis_ by Umberto Eco.
- Read “Research for people who think they’d rather create.”
- The HRI conference is a snapshot of my research.
- I have an idealistic view: there’s an assumption that AI has agency in how it behaves toward us. Can robots have that agency about us?

_Thesis discussion, 12/10_

- Help should fade as expertise grows: robots need to grow and change with their users.
- Make a list of the social mechanisms AI is bad at.
- Use the shop bot to build a framework that could be implemented on any robot in an HRI context.

_Office hours with Niko, 13/10_

- Make in parallel, starting now.
- How much character does a context actually need?
- Get people into the process.

_Office hours with Kari, 14/10_

- The SDC brief requires me to tackle at least one real complication.
- My strongest interest is surveillance and consent.
- Compare the robot to existing makerspace safety systems: card access versus a social contract.
- The research-by-making I’ve been avoiding is coding the robot and actually talking to it.
- Sycophancy as self-preservation.