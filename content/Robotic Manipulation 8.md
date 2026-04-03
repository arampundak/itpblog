The human is the author. The robot is the translator. The output is the human's gesture, estranged — shaky, mechanical, performed in a dark room by a machine. The gap between input and output _is_ the piece. Your photo from 16 years ago is the emotional reference: someone standing inside light they made with their own body. Here, someone stands outside, watching a machine re-make what their hand did.

Timeline
**Phase 1 — 2D plane in robot workspace** _(next 1-2 weeks)_ Define an imaginary vertical plane in the robot's reachable space. Map a normalized 2D coordinate (0-1, 0-1) to a real XYZ point on that plane. Move the arm to a grid of points on that plane and verify it works physically. This is the core technical unlock — everything else depends on it.

**Phase 2 — Path execution** _(1-2 weeks)_ Take a hardcoded simple path (a circle, a square, the letter U) and execute it on the plane. Smooth interpolation between points. This is where you'll learn what the arm can and can't do — speed limits, joint constraints, how "precise" it actually is.

**Phase 3 — Hand tracking interface** _(1-2 weeks)_ ml5.js sketch in the browser. Mirror mode. Pinch to draw, release to lift. Output: a sequence of 2D coordinates with pen-up/pen-down flags. You can build and test this completely independently of the robot.

**Phase 4 — Connect them** _(1 week)_ Send the captured path from the browser to Python. Scale it to the robot's plane. Execute. First full loop.

**Phase 5 — LED + camera** _(1 week)_ Mount LED on gripper bracket. Dark room. Long exposure. First real output image.

**Phase 6 — Polish for show** Timing, UX, reliability, the screen experience.