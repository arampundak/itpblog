---
date: 2026-09-29
tags: []
draft: false
author:
url:
---
## **Writing**  

The ask:
> We talked about how you don't really decide your next thought, it just happens to you. But can other people determine your next thought? Is that what any storyteller does? Why do we love it so much in story where someone is providing the subsequent thought for for us? Is that what the algorithms of social media and tiktok are doing? One sequence through a space of possible thought is always a thin slice of that reality, does that make story a little bit evil because it seduces people into one sequence hiding the bigger more complicated picture? Giving your media persistence allows you to enshrine thought, what are the pros and cons of that, would impermanence be better for studpid and annoying thoughts? Is a sequence different from a flow time?
> 
> Time is the feeling of change and one of the few things that his hard to doubt. Try to carefully examine your thoughts to see how they interact with time? Does one thought coming after another in your thinking mean that there is a connection between them? We have talked about how the contents of subsequent thought is rarely about subsequent chronological event. Does your taste in a good next thought change define your personality, and does it change over time? Is memory important to thought, can media help reinforce a thought and make it more famous and thus frequent within your train of thought? If you go back to the first thought after the second thought is their a recursive effect where the first thought is now different?

"can other people determine your next thought?" no, but Polymarket can. Storyteller might but stock market predictions can do better job, or make me lose my pants.

We love subsequent thought because we can leave our ape minds in 'monkey clapping cymbals' mode.

Algorithms of social media can predict what we'll like, and they can guide/direct us towards content they think we will like, or towards content someone (the man) whats us to see - more division less society union.
As a left winged person, and after months of seeing the horrors of the occupation, my partner said she had enough. We managed together to change her algorithm to have only cat content.

"would impermanence be better for stupid and annoying thoughts" - it is radical to think that "up next" would be randomized and not suggested by a know it all algorithm.



---

## **Making**

The ask:
>- Organize data in json to save your thoughts and save it to local storage.
>- Replace any localhost storage with a Firebase database. 
>- Perhaps allow a user to create a digital dollhouse, comic book or a google doc.
>- Set up firebase to record and recall a description of the scene.
>- Maybe use the "prompt" function to allow different people to enter their name and store their creation under that name (later we will use firebase authentication.)
>- Can you record a sequence of things?

Base64 will glitch if you change some of its characters.

The mapping stretches wherever the image has more detail.

```
Visitor's browser
   ├── loads the page (HTML/JS) ──── from GitHub Pages
   ├── reads/writes paintings ────── to Firestore (via firebaseConfig in your JS)
   └── asks AI to "Remember" ─────── to Replicate (via Dano's proxy)
```

### Every Time You Look

**[Live link](https://arampundak.github.io/NYU_Shared_Minds/04-every-time-you-look/)** - **[Code on GitHub](https://github.com/arampundak/NYU_Shared_Minds/tree/main/04-every-time-you-look)**

This week we moved from the client to the server. My first reaction to Firebase was spreadsheets, grey offices, and numbers in cells. Then I remembered a piece I love: someone mapped [Manhattan's 2024 rents](link) inside a Google Sheet, with the cells arranged in the shape of the island. The boring tool became the canvas. I wanted to do the same with a database.

![[ref - Manhattan Rent repponen.webp|300]]

My first idea came from Ursus Wehrli's [The Art of Clean Up](https://www.google.com/search?num=10&sca_esv=01bcc2c390ea0b4a&rlz=1C5OZZY_enUS1147US1148&sxsrf=APpeQnvabuaTx1sEbbyUXIp4oQ7_70GUow:1790737746205&udm=2&fbs=ABfTbFVyMZGZf1hfvX9uKjN_-G8c4u0nXx4bEIpwm1lnNH832SMIiTl3t-JZ4hGJOxPbHYRQDtz5om-6srRFNP4UK_6eHeIexnQRPZcc5cuRwMa_RL4y9xZ0-ndKP_0IqP74noyfbmBc6QuoAE3ZKsUbRJIpjtcpcaaRfH2eef1eJn9yfOzmU6cg26Xvr3mjXy712RiJh6gkS31Au7qQOYRtbHcbDfQZHg&q=Ursus+Wehrli+The+Art+of+Clean+Up&sa=X&ved=2ahUKEwiZzP35qZWXAxUpKFkFHTo6I24QtKgLegQIKxAB&biw=1728&bih=958&dpr=2): upload a messy room and have an AI tidy it step by step. 

![[ref - ursus_wehrli_the_art_of_clean_up.jpg|500]]

It turned out Wehrli had already tidied famous paintings in Tidying Up Art (2002). And in my version, Firebase would only have been a place to store things, so I dropped it.

![[ref - Tidying Up Art (2002).jpeg|300]]

What stuck was a technical detail. Firestore stores text, so to save an image you convert it to **base64**, which turns the picture into a long string of letters. A 400px photo is about 35,000 characters. The first ~850 are the header ("I am a JPEG, this big"), and the rest is the image itself, roughly top to bottom.

So what happens if you change a few letters?

![[sn - base64_glitch_test.webp]]

It doesn't disappear. It glitches. Change the first character and the file breaks completely. Change one in the middle and a block goes wrong, and so does everything after it, because JPEG data is one continuous chain. With **restart markers** (checkpoints where the decoder resets), the damage stays local and builds up gradually. That became the project.

![[sn - time screenshot.webp]]

**How it works.** Nine images live in Firestore as base64 text. Every time someone opens one, 5 random characters are rewritten and saved back, and everyone watching sees it glitch live. Looking at an image damages it. Next to each image, the base64 text scrolls by with the changed letters in red. When an image is too far gone, anyone can press **Remember**, and Nano Banana (through Replicate) reconstructs it. The result is plausible but not the original, and it's more fragile: with no restart markers, it decays faster.

**Why.** This is **memory reconsolidation**. Every time we recall a memory, it becomes unstable and gets stored again, slightly changed. We don't retrieve memories, we rebuild them, and we fill the gaps with confident fiction. The AI does the same thing. It's also my answer to this week's question: "if you go back to the first thought after the second, is the first thought different?" Here, yes, every time.

**The images** aren't paintings. They're **standard test images**, the photos engineers have used since the 90s to test how compression degrades pictures: a NASA astronaut portrait and Kodak's early-90s test suite. They look like a family album. They were made to be degraded, and now they're degraded by being looked at. 

**Stack:** HTML/JS on GitHub Pages → Firestore (real-time `onSnapshot`, transactions so two viewers don't overwrite each other) → Replicate via Dano's proxy. Names come from `prompt()`, on the honor system.

**What broke:**  an image turned fully gray when a change hit a restart marker. I kept it as the "fully forgotten" state. / CORS issue with the Replicate image

**Help:** I developed the concept and tested the base64 corruption with Claude, and built the project with Claude Code. 
