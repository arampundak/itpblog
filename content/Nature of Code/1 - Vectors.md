>Taking this first step toward using vectors won’t let you do anything new or magically turn a p5.js sketch into a full-on physics simulation. However, using vectors will help organize your code and provide a set of methods for common mathematical operations you’ll need over and over and over again while programming motion.

>Think of a vector as the difference between two points, or as instructions for walking from one point to another.

![[noc function arrow.mov]]

`position` Where is the object right now?
`velocity` How much should the position change each frame? **change per frame**.
==`vel` gives instruction for where `pos` should move to in the next unit of time==

Means:
- Move 3 pixels right
- Move 2 pixels down
- Every frame

```
let position;

let velocity;

  

function setup() {

createCanvas(400, 400);

position = createVector(100, 100);

velocity = createVector(3, 2); // (x, y) components of velocity, in pixels per frame.

// Move 3 pixels right and 2 pixels down every frame.

}

  

function draw() {

background(220);

position.add(velocity); // new position = old position + velocity

  

if (position.x > width || position.x < 0) {

// Reverse the x component of velocity to bounce back

velocity.x = velocity.x * -1;

}

if (position.y > height || position.y < 0) {

// Reverse the y component of velocity to bounce back

velocity.y = velocity.y * -1;

}

  

arrow();

}

  

// arrow function to draw the velocity vector as an arrow

function arrow() {

line(position.x, position.y, position.x + velocity.x * 10, position.y + velocity.y * 10);

let angle = atan2(velocity.y, velocity.x);

push();

translate(position.x + velocity.x * 10, position.y + velocity.y * 10);

rotate(angle);

line(0, 0, -5, -5);

line(0, 0, -5, 5);

pop();

}
}
```