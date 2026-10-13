---
date: 2026-10-09
tags: []
draft: false
author:
url:
---
(From different talks about the project with Aditya and an LLM)

Creativity is your motivation, The creativity isn’t in the machine; it is in the decisions you make at it
The brief doesn’t ask for creativity, it asks for engagement with public space.

In a shared makerspace, a small robot handles the how of using a machine, so newcomers spend their attention on what to make, and hands them to a person when it matters.

the robot explains, and a human does the final check. Keep it, make the handoff visible, and keep safety lines as fixed, staff-approved text.

multi-party problem!!!

---
from claude 0910
Robot behavior can carry the multi-party requirement, but “it says what it can do and asks if you need help” doesn’t meet the bar. That’s the kiosk pattern, still one person at a time. And a robot that calls out to everyone walking past creates exactly the problem the call warns about: robots in public spaces meet people who never asked to interact with one, and the call lists uninvited interaction as one of the real-world complications to engage with.

**What judges will look for.** The Public Spaces Award goes to the submission that engages the theme most deeply. Depth here means handling **conflicts between parties**, not just noticing that other people exist. Every key design choice in your paper should pass one test: _would this exist if Ari sat in someone’s home?_ Offering help fails that test. The choices below pass it.

**Six conflicts, and Ari’s answer to each**

|Conflict|Ari’s design response|
|---|---|
|**Newcomer vs. people who don’t want a robot talking to them**|Ari never calls out. It shows it’s available (antennas up) and only offers help when someone approaches and stops. That _is_ your “offer help,” made multi-party.|
|**Current user vs. next in line**|A short glance to acknowledge the person waiting, then back to the user. Ari remembers the order and hands over: “You’re next.” The call’s own example scenarios include a voice system managing a multi-party queue, so queue handling is explicitly valued.|
|**Novice’s dignity vs. learning in public**|Procedural talk (settings, focus, steps) is said at normal volume so anyone waiting can learn by overhearing. Corrections and design decisions are quiet, with Ari leaning in close.|
|**User wants camera help vs. bystanders who never consented**|The camera points only at the machine bed. The eyelid opens by the user’s own hand and closes when the session ends.|
|**Ari’s help vs. shop staff authority**|Staff decide what Ari is allowed to teach and can silence it. Ari never approves anyone to run the machine; final checks go to a person.|
|**Shop noise vs. being heard**|Volume adapts to the room, with a captions fallback.|

The third row is your strongest idea, because it joins the two halves of your concept. In robot-conversation research, an _overhearer_ is a recognized role alongside addressee and bystander, and the 2009 Mutlu study showed robots can shape these roles through gaze. In your design Ari deliberately serves overhearers: procedure is public knowledge, decisions and mistakes are personal. That matches how people learn in workshops by watching others, which Lave and Wenger called legitimate peripheral participation (1991). That reference is from my general knowledge; check it before citing. It’s also the cutting-floor split again, now as a public/private split.

**Beyond behavior: the space and the service around Ari**

The call explicitly accepts spatial and service design concepts, meaning how robots, people, and the space are arranged around each other. Use that:

- **Placement:** Ari sits where it can see the bed, the user, and the spot where the queue forms, and where bystanders can see its eye.
- **A sign next to it:** what Ari sees, what it doesn’t record, and how to close its eye.
- **An unattended rule:** when no staff member is on the floor, Ari won’t walk anyone through starting the machine. It closes its eye and says who to find.
- **Staff onboarding:** staff can mute, stop, or redirect Ari with one gesture or button.

**Evidence that makes it credible.** The call asks whether you know how the space actually works day to day. Two observation sessions in the shop (where the queue forms, what people ask staff, when people look embarrassed) and one conversation with shop staff would ground every row of the table. Add both to the IRB email, since publishing them may count as human-subjects research.

**The video in one take** (about 90 seconds):

1. A passer-by ignores Ari, and Ari stays quiet.
2. A newcomer stops; Ari offers help and the user opens its eye.
   
3. Ari gives procedure out loud while the next person waits and listens.
4. Someone walks up; Ari glances to acknowledge them and returns to the user.
5. The test cut: Ari turns to the user and asks quietly about the result.
6. Ari hands off to staff for the final check, then tells the waiting person “You’re next” and closes its eye.

That one take shows six parties and five conflicts.

**What to build in six weeks.** Build three conflicts for real (queue, public/private voice, eyelid). Design the other three on paper and show them in the storyboard. Reviewers judge whether the scope is achievable, and three built thoroughly beats six done badly.

---
The Space:
i design for open-access makerspaces (school, library, community), and you prototype in a university shop you know well. That is defensible. The call names shared institutional spaces and asks whether you know how the space actually works day to day. Your real knowledge of the ITP shop is an asset, and claiming a public library makerspace you’ve never observed would weaken it. If you can spend one afternoon observing a library or community makerspace, you get evidence that the design transfers.

The User:
IMA undergrads are the better user group. They are the closest thing in the shop to “strangers rather than trained users.”
design accounts for more than one party, meaning intended users plus bystanders, passers-by, staff, or other people present. One primary user at a time is fine. The problem is that right now your one-to-one session takes place in a crowded shop, and the design behaves as if nobody else is there. That is a gap in the design, not in the concept.

| Party                                                | What goes wrong if you ignore them                    | Design response                                                 |
| ---------------------------------------------------- | ----------------------------------------------------- | --------------------------------------------------------------- |
| The user                                             | Embarrassed to ask basic questions in front of others | Low voice, close posture, doesn’t announce mistakes to the room |
| Their project partner (students often come in pairs) | Robot talks to one, the other is left out             | Addresses both when decisions come up                           |
| The next person in line                              | Walks up mid-session, gets ignored or interrupts      | A brief glance: “I see you, you’re next,” then back to the user |
| People working nearby                                | Didn’t agree to a camera or a talking machine         | Eyelid closed toward them, camera only on the machine bed       |
| Shop staff                                           | Robot overrides their authority                       | Handoff to staff, and staff can silence or stop it              |


“why not just ask the staff”?
The robot covers the moments when staff are busy or not there, and every interaction ends with a possible handoff to a person. List “it might reduce staff contact” as a failure mode, because the call asks for failure modes anyway.

The claim:
when making gets cheap, the human contribution is deciding what to keep. So the robot carries the “how” so the person’s attention goes to the “what.”
- **Procedural (the robot is direct):** file prep, settings, focus, start, safety. It says plainly, “Press there.”
- **Decisions (the robot is Socratic):** material, cut versus engrave, joint fit, and above all the test cut. The laser makes iteration cheap, so the robot’s job at that moment is to make the person judge the result: “Look at the test piece. Will it hold? What would you change?” That test cut is your cutting floor, happening at the machine.

Some materials are dangerous to cut; PVC, for example, releases chlorine gas.

**Posture shift**
Make it concrete with three or four named postures: listening to you, thinking, pointing at the machine, handing you to a person. Then show short clips to a few people and ask what the robot is doing. That is the cheap interpretation check the Erel lab includes even in its late-breaking reports.

Gaze:
Erving Goffman called this “footing”: people use gaze to show who is participating in a conversation and in what role. The Best Paper at HRI 2009 (Mutlu et al.) gave a robot gaze behaviors that marked people as addressee, bystander, or overhearer, and people’s participation followed the roles the robot signaled. So your robot gives full attention to one person, and its body makes that legible to everyone else in the room: who it’s with, who’s next, and who it is _not_ watching.

Character design as a contribution
**Write a persona spec as a design artifact.** Include its values, its voice, what it refuses to do (decide for you), its fixed safety lines, and when it hands you to a person.
**Show the alternatives you considered,** such as a strict instructor, a peer, or a Socratic tutor, and why you chose this one. The call requires alternatives anyway.
