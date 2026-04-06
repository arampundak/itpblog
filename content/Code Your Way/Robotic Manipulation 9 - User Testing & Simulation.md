20260405

This week the project started taking its shape to the real world.
I've made steps in two directions: 

![[ref - hand pos sketch.mp4]]
1. The interaction: someone sits in front of a laptop, sees their face in a mirror on screen, pinches their fingers to doodle words, a shape, anything, then watches a robotic arm in a dark room perform their drawing with an LED, producing a long-exposure photograph. 
Link to code in p5: https://editor.p5js.org/arampundak/full/VO18ZfbpP

2. Simulation of the [[SO101]] in [[MuJoCo]] 

![[ref - rob arm mujoco.webp]]

What I'm testing with this sketch is the drawing interface. The user sits down, draws something with their pinch gesture, hits reveal, and sees their drawing glow on a dark screen - a preview of what the long-exposure photo will look like. No robot yet. Just the input side.

![[ref - robarm p5 sketch good.mp4]]

**Questions for user testing:**
- Do you need the sketch to say "pinch fingers"?
- What did you think was happening when you pinched your fingers?
- Was there a moment that felt intuitive, and a moment that felt confusing?
- When the screen went dark and the drawing appeared - what did that feel like?
- If taking a picture takes aprox 1 min - what should happen while?
- If this drawing was going to be performed by a robot with a light in a dark room, what would you want it to draw?

---

### Process

This week was mostly concept and infrastructure, getting the right tools in place before building the real thing.

**The concept crystallized.** I came in thinking about a pose-based wave and left with a complete interaction arc: pinch drawing → robot light painting → long-exposure photograph. The key artistic decision was keeping the robot's intention precise even if the output is imperfect. The shakiness is a byproduct of the hardware, not a design choice. The robot tries its best.
![[ref - robarm p5 sketch shit.mp4]]
(When you can't reach what you want but you try anyway)

**The drawing interface.** I started with Dan Shiffman's hand tracking sketch from The Coding Train as a base, used his pinch-to-draw logic, added persistent canvas layered over the mirror video, a reveal mode that fades the face and leaves the glowing strokes, and a reset button. Strokes are stored as normalized coordinates for eventual export to Python.

**Thinking through the simulation.** A big part of the day was figuring out how to visualize the arm's 2D drawing plane before building the real [[Forward + Inverse Kinematics]]. I considered p5 WebGL, Three.js, and MuJoCo. 
[[MuJoCo]] won - not because it's easiest but because it's real. I found that the SO-ARM100 has already been converted to a MuJoCo MJCF model (originally URDF file) and is part of the official Google DeepMind MuJoCo Menagerie collection!!!!!. 
Got it running in the MuJoCo native viewer in minutes. The joint sliders let me explore the arm's workspace by hand - which is exactly the right way to start thinking about where to place the imaginary drawing plane.
![[ref - rob arm mujoco.webp]]
``` bash
**➜**  **Robotic Arm** cd trs_so_arm100
**➜**  **trs_so_arm100** python3 -m mujoco.viewer --mjcf scene.xml
```
**Next step that matters most:** defining a reachable 2D plane in the robot's 3D workspace and understanding the IK approach. I have office hours with a robotics professor this week specifically about control theory, that conversation will shape the next phase.

**New resources found:**
- [MuJoCo Menagerie — trs_so_arm100](https://github.com/google-deepmind/mujoco_menagerie/tree/main/trs_so_arm100) — official MuJoCo model of the SO-ARM100
- [so100-mujoco-sim](https://github.com/lachlanhurst/so100-mujoco-sim) — a full simulation + real arm control app built on this model
- [Gysin-Vanetti — Link](https://link.gysin-vanetti.com/) — primary artistic reference: long-exposure light trail geometries made with a precision LED plotter
