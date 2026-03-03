Fabri and I are making - A microphone podcast.
Read more at [[The Future-BOT Podcast - 2]] & [[The Future-BOT Podcast - 3]]
We’re building two microphones that have fired their human hosts and now run their own autonomous podcast. They’re trained on tech podcasters and AI investors and talk endlessly about the AI revolution, Asimov’s Laws, AGI, and the future of humanity - but everything is engagement-optimized rather than meaningful.

![[robot future bot sketch 3.webp]]
![[robot future bot sketch 2.webp]]
![[robot future bot sketch 1.webp]]

One mic is loud, confident, visionary. The other is a yes-man co-host. They constantly “unpack” questions without resolving anything and interrupt themselves with absurd AI startup ads.
![[robot future bot 5.webp]]

The user has:
- A big red interrupt button (they turn toward you and listen).
- Voice input (they respond and reframe your question).
- A controversy knob (makes them more extreme).

They technically respect Asimov’s Laws but reinterpret them in funny ways.

The piece critiques amplification culture and AI-generated discourse by embodying it in the very object meant to listen.
**A critique of amplification culture - where devices meant to listen have become autonomous generators of noise.**

They talk about:
- The AI revolution
- Asimov’s 3 Laws
- AGI
- Alignment
- Consciousness
- The future of humanity

But everything they say is engagement-optimized rather than meaningful.

They sound confident. They sound intelligent. They unpack questions. They never resolve anything.

**Personalities**
![[robot future bot 4.webp]]
Mic A – “The Visionary”
- Loud
- Confident
- Interrupts
- Speaks in bold statements
- References AI pioneers (Yann LeCun, investors, futurists)
- Says things like:
"This changes everything.” “People don’t understand the scale of what’s happening.” “Let’s zoom out.”
![[robot future bot 6.webp]]
Mic B – “The Yes-Man”
- Agreeable
- Curious
- Repeats phrases
- Seeks validation
- Says: “That’s so true.” “That’s fascinating.” “Can you expand on that?”

**ADS?**
Ads interrupt mid-sentence.  
They are delivered with full enthusiasm.

We got a great resource from Sarah Rothberg [[CHATBOTS, AGENTS, AND GENERATIVE CONVOS]]

---
## Tech

**INPUT 1 - Interrupt Button**
When pressed:
- Both mics rotate toward user
- They stop talking
- Mouth closes
- They wait

**INPUT 2 - Controversy Knob**
A rotary knob on control box.
Low → Thoughtful, calm, intellectual  
High → Conspiratorial, bold, extreme statements

At high levels:
- Mic A interrupts more.
- Talks about “suppressed truths.”
- Speaks faster.
- More dramatic mouth movement.
Mic B agrees harder.

**System Behavior Structure (State Machine)**

STATE 1: Autonomous Podcast Mode
- Mics talk to each other
- Mouth servo moves
- Slight body movement

STATE 2: Listening Mode  
Triggered by button
- Turn toward user
- Wait

STATE 3: Response Mode  
Triggered by voice detected
- Generate reply
- Maybe disagree with each other
- Then slowly drift back to STATE 1