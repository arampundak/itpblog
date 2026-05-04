_A 3-Minute Story About Code, Robots, and the Space Between_

---
(2. Maya drawing)

Maya didn't know she was about to become part of a story. She just saw her face in a mirror on a laptop screen, pinched her fingers together in the air, and drew a smiley face. Two eyes. A curve. Simple.

She didn't know her gesture would travel through five worlds before returning as light.

This is the story of that journey.

---
(3. JSON)
## The Drawing Arrives

The Drawing woke up as JSON:

The Drawing looked at itself. All numbers between zero and one. No units. No context. Just pure, normalized intention.

"Am I a letter?" it thought. "If so who am I for?"

(4. function load drawing)

The answer came immediately: a function called `load_drawing()` opened the file and began to read.

"Ah," said the Drawing. "You must know what I am"

"I'm nobody," the function interrupted. "I'm just the messenger. You're going to MuJoCo."

---
(5. MuJoCo)
## The Stage

The Drawing had heard stories about MuJoCo. A place where physics happened. Where objects had mass and joints had limits.

MuJoCo was infinite and dark. Then: light. A grid appeared. X, Y, Z axes stretched into distance.

"Welcome," said MuJoCo. Its voice was everywhere and nowhere. "I see you've brought a story."

(6. Stroke to path)

"I'm just numbers," the Drawing protested. 
"Exactly," said MuJoCo. "And I'm the place where numbers become motion. But you're not ready yet. You're still 2D. This is a 3D world."

A function called `strokes_to_path()` rushed forward—not a character, more like a translator.

"Javascript can output only 0 to 1," the translator explained. "Up here, we use meters. And you're flat—you only have X and Y. We need to give you depth."

The Drawing felt itself stretched on a vertical plane, only to notice twenty centimeters in front of its invisible form - a robotic figure.

"Now you're real," said the translator.
"Am I?" shrugged the Invisible Drawing.
"You're real _enough_," said MuJoCo. "Now let's see if the Arm can reach you."

---
(7. The Arm)
## The Arm Needs Help

The Arm had always been there—first as a URDF file, living now as XML with 6 degrees of freedom.

"Can you show me who I am?" the Drawing asked.

"I think so," the Arm admitted. "but I've never tried. I need help."

(8. The Jacobian)

A Jacobian appeared— 3×6 matrix, precise and mathematical. With elite navigation and mapping capabilities.

"As the derivative of your forward kinematics I can tell you which direction to lean, But you'll need someone else to actually do the leaning" it said. "If you move joint 1 by a tiny amount, your drawing tip moves _this much_ in X, Y, Z."

The Jacobian gestured toward a figure in the corner.

(9. The IK Loop)

The IK Loop had been watching silently.

---

## The Loop That Never Stops

The IK Loop was obsessive. It looked at the target. It looked at the Arm's current position.

"Error: 0.017 meters. Unacceptable."

It did math that would make humans cry:

"Damped least squares," it muttered. "Keeps me stable near singularities."

Iteration 143: error 0.00047 meters. - "Close enough."

(10. Smiley Drawn)

At the tip of the arm something beautiful was happening. A function called `add_capsule_segment()` was moving over a path. From point a to point B. Red cylinders—tiny, perfect—appeared from thin air, connecting each waypoint.
The Drawing watched itself become geometry. Motion. Proof.

"A smiley face," it observed. "Two eyes. A smile. Classic, Finally I'm real" it yelled.

---
(11. The gap)
## The Gap

Beyond the simulation, six servo motors sat in a chain, listening.

"Perfect path," said Motor 2. "When do we move?"

"Soon," said the XIAO microcontroller. "They just need to send the commands."

But the commands never came.

(12. The Bridge)

The bridge—the code converting MuJoCo's angles into serial commands—wasn't connected yet.

The servos fell silent.

"We were so close," said Motor 1.

"We still are," said the XIAO. "The code exists. The simulation works. Someone just needs to finish the bridge."

(13. How Long)

"How long?"

"However long it takes. That's how hardware works."

---

This story is technically accurate. Every character corresponds to a real component:

- **The Drawing** = JSON file output from p5.js hand tracking
- **MuJoCo** = Physics simulator where motion is tested
- **The Translator** = `strokes_to_path()` function (2D → 3D mapping)
- **The Arm** = SO-ARM100 MJCF model with 6 DOF
- **The Jacobian** = 3×6 matrix from `mj_jacBody()` (derivative of forward kinematics)
- **The IK Loop** = Damped least squares inverse kinematics solver
- **The Servos** = Six Feetech STS3215 motors on the physical arm
- **The XIAO** = ESP32-C3 microcontroller (bridge between Python and servo bus)
- **The Gap** = The incomplete `arm_executor.py` that should convert MuJoCo angles to serial commands


