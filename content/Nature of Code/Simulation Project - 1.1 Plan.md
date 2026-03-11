Watch the videos:
<iframe width="560" height="315" src="https://www.youtube.com/embed/xXjRlEr7AGk?si=m7k_Iy7fJuaJG60L" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

<iframe width="560" height="315" src="https://www.youtube.com/embed/hbgDqyy8bIw?si=taXgTswgGCWnHi94" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

<iframe width="560" height="315" src="https://www.youtube.com/embed/RTc6i-7N3ms?si=r4njcEIjyHrX8vup" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

<iframe width="560" height="315" src="https://www.youtube.com/embed/10st01Z0jxc?si=mlgJQHEmSBGJC-7d" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

In robotics and animation there are two ways to think about motion:
### Forward Kinematics (FK)
You control **joint angles**, and the arm moves accordingly.
Example:
shoulder = 30°  
elbow = 45°

From these angles you **calculate where the hand ends up**.
So:
angles → position
This is easy mathematically.

---
### Inverse Kinematics (IK)
You do the opposite.
You say:
> “I want the hand to be HERE.”
> 
And the system calculates **what joint angles are needed**.
So:
target position → angles
Example:
hand target = mouseX, mouseY
The algorithm finds the joint angles that reach that point.

---

### Idea 1 - Robotic Light Painter 

Concept
A simulated robotic arm draws **light trails in space**.
Instead of a pen, it leaves a **particle trail**.
The arm uses **IK to follow targets**.

Targets could be:
- mouse
- Perlin noise path
- moving attractor
- image pixels

The result:
A robotic arm **painting light in space**.

---
### Idea 2 - Tentacle Creature
Inspired by **Daniel Shiffman examples**.

Concept
A creature made of **multiple IK chains**.
Each tentacle follows a different rule:
- food attractor
- fear repulsion
- curiosity noise
Motion rules = Nature of Code physics.

---

### Idea 3 - Pixel Drawing Robot
Inspired by **p1xelfool**.

Concept
An IK arm tries to **reconstruct an image pixel-by-pixel**.
Steps:
1. Load image / User draws image
2. Convert to points
3. IK arm moves through them
4. Draws particles
Becomes a **slow robotic plotter**.

---

### Structure of the code

Main parts:
```js
Segment class  
Arm class  
IK solver  
Particle trail
```

Example structure:

```js
arm.follow(target)  
arm.update()  
arm.show()  
  
particles.add(arm.end)
```


### Extra Twist

Add **expressive motion**.
Robot has "emotions".

Curious:
smooth movement  
slow acceleration

Anxious:
shaky  
overshoot  
noise

SHOW

emotion → movement style