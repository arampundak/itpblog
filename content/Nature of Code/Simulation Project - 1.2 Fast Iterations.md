Link to code:
https://editor.p5js.org/arampundak/full/Idv0djUST

I started exploring the universe of [[Forward + Inverse Kinematics]] in p5. In order to try and manipulating [[SO101]] IRL.
## Concept
The interaction is intentionally simple.
1. The user draws a line freely on the screen using the mouse.
2. A robotic arm reveals itself from the bottom of the canvas.
3. The arm performs a small greeting gesture.
4. The scene darkens.
5. The robot then **replays the user’s drawing as a glowing light trail**.

This creates a small narrative:
Human → Gesture → Robot → Reconstruction

## Early Experiments
Before implementing the interaction, I experimented with examples of **inverse kinematics chains**, inspired by tutorials from the Coding Train and Coding Math.
The core structure of the arm is a chain of segments, each with:
- a start point
- a length
- an angle
Each segment follows a target point using a simple algorithm:
1. Rotate toward the target.
2. Move its base so its end reaches the target.
3. Propagate the constraint through the chain.

I looked up some references and started developing a sketch, for this the simulation presentation I had some fast iterations with LLMs. I wrote my initial idea and composed a prompt with chatGPT to give to Copilot living in VS Code.

My initial prompt:
>i found this inverse kinematic code, i want your help making it to a small project, im adding a picture describing the idea. overall it is: 1. the user draws on a blank canvas with the mouse. 2. a 2d robotic arm reveals itself one joint at a time (frames 3, 4, 5) and at frame 6 waves, like saying hello. frame 7. the background change and the gripper is holding a shining led and repeats the user's path

## Recording Human Motion
The first interactive component was capturing the user’s drawing.
When the mouse is dragged, the program records points into an array representing the path:
`userPath.push(createVector(mouseX, mouseY));`
To avoid excessive noise in the data, points are only added if the mouse moved a minimum distance from the previous point. This keeps the path clean and easier for the robotic arm to follow.

## Robotic Arm Construction
The robotic arm is composed of multiple `Segment` objects connected in a chain.
Each segment stores:
- its starting position
- its length
- its angle
- its end position

The base of the arm is fixed near the bottom center of the screen, similar to a mounted industrial robotic arm.

The total reach of the arm is the sum of all segment lengths, and the user is encouraged to draw within this reachable space.

## State Machine

The project is structured using a **state machine** to control the interaction.

The states are:
draw → reveal → wave → dark → trace → done

Each state handles a different phase of the interaction:
**Draw** The user draws a path with the mouse.
**Reveal** The robotic arm appears one segment at a time, introducing the mechanism.
**Wave** Before performing the task, the arm makes a small greeting gesture, giving the robot a sense of presence.
**Dark** The background fades darker and the original drawing disappears.
**Trace** The robotic arm replays the drawing using inverse kinematics.
**Done** The robot finishes the gesture and waits for a reset.

---

Some references:
<iframe width="560" height="315" src="https://www.youtube.com/embed/Ihp6tOCYHug?si=hCqwBnUbfFH4RuPP" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

---

3js
webGL
do isometric view ands draw path, or draw in each face, point by point. have a 3d layout - learn how 3d software do it, do not invent a bad wheel but see how interactipons are happening