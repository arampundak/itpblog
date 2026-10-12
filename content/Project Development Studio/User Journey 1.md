---
date: 2026-10-09
tags: []
draft: false
author:
url:
---
In order to understand the the scenario of using Ari the socratic robot, Aditya and I acted a user journey with the robot in the ITP shop

1. Staff are busy with someone else. Ari is on its dock, eye closed, antennas up. A passer-by walks on, and Ari stays quiet.
2. A student says the wake phrase. Ari: “How can I help?” The student wants help with making: a sundial for the time class.
3. Ari asks a couple of questions about the project. File ready? Material? (Keep this to about 30 seconds.)
4. “Pick me up, let’s go to the laser.” “Are we there yet?”
5. “I can guide you better if I can see. Open my visor?” Ari’s view is framed on the machine bed.
6. Procedure as dialogue. Ari notices someone waiting: “Mind if they listen in?” The student agrees and Ari invites the other person.
7. A bystander leans into view, and Ari narrows its view back to the bed.
8. Test cut. The student shows it to Ari, and Ari turns to the student and quietly asks what they’d change.
9. Staff come over for the final check, and Ari defers.
10. “Done? Want a summary?” Ari closes its eye. “I need your help to go back to my spot.”
11. The person who listened starts their own session: “I heard the focus part.” Their session is shorter.

Need more attention:
- **The Socratic moment.** Ari turns away from the machine, toward the student, and asks quietly what they’d change?
- **Staff are bookends**. Staff now appear only at the start (busy) and the end (final check). Those are good bookends, but Ari never defers to anyone in real time.
- A bystander walking through the frame becomes part of what Ari remembers.

Strong:
- **“Staff busy” as the trigger.** This answers “why not just ask staff?” inside the story itself. Ari exists for the moments staff can’t cover. Make it the opening shot.
- **“I can give better direction if I can see. Open my visor?”** Asking for consent and giving a reason is better than the user opening it unprompted.
- **“I see someone in line. Do you want to listen too?”** decide who Ari asks first: the student (“OK if they listen in?”) or the person waiting.
- **A unique wake phrase.** This is more important than it looks. The eyelid covers the camera, but the microphones are the invisible sensor.

Questions:
1. Lift-to-wake?
Design decision: **Ari starts a session when someone picks it up, and ends it when it’s put back on the dock.**

Fixes problems:
- **Sensing without a camera.** Being lifted is the signal, so Ari doesn’t need to watch the room.
- **The microphone problem.** “Why is it always listening” is the worry. Lift-to-wake means Ari doesn’t have to listen to the room at all while it sits on the dock. That’s a stronger bystander-privacy story than a wake word. 
- Keep the wake phrase as a fallback for when Ari is already set down next to a machine?
- **Readability for everyone around.** Anyone in the shop can see who has Ari and who doesn’t. Holding it is the participation role, with no software inference needed.
- **The dock loop.** Lift starts the session, return ends it. Your home-dock sketch already shows this.

2. The “blind box”
Ari’s default eyes closed turns privacy into the starting state.

3. What / How-When / Doing
Scope!!!! 3 modes - we choose 1!
Ideation = what
Planning = how and when
Making = doing. 
**“Ari supports three intents; this paper inquired designs for doing. (making mode)”**
**“the AI system is a complement to existing knowledge.”** Ari works inside the shop’s existing human systems (staff, procedures) instead of replacing them.