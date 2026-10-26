---
date: 2026-10-20
tags: []
draft: false
author:
url:
---
This week was troubling. I was really trying to find a concept before starting the assignment, I couldn’t, and I had to push myself. I read about [Reverse Engineer Anything](https://github.com/morluto/rea) and saw people build amazing games that bring different types of games together into one. It was glamorous, and I wanted a taste. I remembered an old point-and-click game I used to play, _The Curse of Monkey Island_, and thought that creating your own path through image generation could suit this week’s brief:

> “Try develop a interface for ‘navigation by creation’ where as a person changes their picture or text they move in the vast space of the neural net to see other people are making.”

I’m not happy with what I made, but I learned, or rather implemented, something very important along the way. Unlike my attempt at last week’s brief [link], this week I set out to understand the game’s architecture and how it connects to Firebase, and to build it one stage at a time. While writing the initial doc for Claude in VS Code, I knew my end goal and told it, but I asked it to go slowly, one stage at a time. That way I could test what works and what needs repair, instead of building a delicate card tower that might fall because of one stupid or misaligned foundation.

I had fun understanding firsthand the power of the things we can build, and I understand now how hard it is to make something that really stands out.

## Doors of Perception

**The idea.** A point-and-click world where every room is someone’s thought. 
You write “a flooded library where the candles still burn” and it becomes a painted room you can walk into. In Curse of Monkey Island style!
But the rooms don’t sit on a map. They sit in embedding space, and the doors move you by meaning:

- **Near door:** the room most like this one.
- **Bridge door:** a far-away room many people have visited.
- **Compass door:** type a word, and it takes you to this room _plus_ that word.

DanO wrote that when everyone is a producer, search becomes king. So the game is search. Each player hunts for an object (“rusty key”) that was placed in whichever room’s meaning fits it best. You only get the name, so the only way to find it is to steer through meaning. Six bot personas write thoughts through the same pipeline, labelled as bots, so the world isn’t empty. [link to the game](https://arampundak.github.io/NYU_Shared_Minds/06-embeddings/)]

#### Mid dev test:
![[sn - w6 initial test.mp4]]

### An interface to an interface?

Hoffman says space and time are a desktop: icons that hide a reality we couldn’t use directly. Halfway through building, I realized I’d done exactly what Dano warned about. I took a 768-dimensional space and gave it walls, floors and doors. Is that an interface to an interface?

I ended up arguing the other way. The painting is the icon, and the vector is the “reality” behind it. Hoffman’s point isn’t that icons are bad; it’s that they’re useful. A door is a handle you already know how to use. What I changed is what the handle connects to: doors lead to the next thought, not to the next room down the hall.

### The water

The compass didn’t work at first. I typed “steam copper pipes workshop” and never reached the steam workshop. When I measured it, any two rooms already scored 0.44 similarity. Everything was similar to everything, so a small nudge changed nothing.

The fix was to subtract the average of all rooms before steering. After that, it reached the right room from every starting point I tried.

### Words are things to a model

Naming “Curse of Monkey Island” in the prompt made the model paint the game’s title logo. Writing “architecture” gave me the same pirate house in every room. The model doesn’t separate how from what: every word is a thing to draw.

Words didn’t fix it. Pictures did. Nano-banana with reference images got much closer. It’s the implicit/explicit idea from class: style is implicit knowledge, and you can show it but not really write it. 

Creating a painting test to see different model behavior:
![[sn - w6 painting test.mp4]]

The doors were the same problem. Describing where they should go was ignored. What worked was a second pass: paint the room, mark three spots in solid magenta, then ask the model to turn each mark into a door that belongs in the scene.

#### How its started:
![[sn - w6 how it started.webp]]

#### How its going:
![[sn - w6 how it going.webp.webp]]

### What didn’t work

- **The proxy rejected most models.** It knows official Replicate models by name; community models need a pinned version hash.
- **Nano-banana adds black bars,** so I crop them automatically.
- **Two passes take about 30 seconds each.** I show the room first and fade the doors in after.
- **The spec guessed 0.2 as the object-match threshold.** Real scores ran 0.27–0.71, so I used 0.55. Measure before trusting numbers.
- **With few rooms, the compass sends many words to the same hub room.** Even in meaning space, an “influencer” emerges. [Is that Haidt’s problem showing up even without likes?]
- **Indoor thoughts often come out as closed rooms,** and the art is uneven.

### Next

The UMAP map is the big missing piece: seeing where your thought lands among everyone else’s. After that, a selfie-to-cartoon avatar and seeing other players walk in the same room. 

### Credits and AI use

- Built with Claude (spec and planning in chat) and Claude Code in VS Code (code).
- Class Replicate proxy; Firebase from my week 4 project.
- Inspiration: _The Curse of Monkey Island_ (LucasArts, 1997), [VibeOS](https://github.com/kaansenol5/vibeos), and [REA](https://github.com/morluto/rea).
- Readings: Hoffman’s _The Case Against Reality_, _This Is Water_, and _Total Pixel Space_.