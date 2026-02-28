More options of the array class.

```js
particle.sort();
particle.forEach(p=> {
p.update();
p.show();
})
```

Creates a new array with only the true 

```js
let colors = particles.map( p => {
	return p.color;
})
```

Will return a new array with only the colors of the pixels from the last array.

---

Movers - have Position, have Velocity, Apply Force on them (acceleration and such).
Particles - had to be removed because they accumulate the screen - have life span and Emitter.
Now we get into:
**Vehicles** - they have `Seek(x, y)` with where they want to reach, without losing their velocity. They can also `arrive()` and slow down.
**Boid** - from bird. They have behavior of Separation / Alignment / Cohesion

```javascript
seek(target) {
```

```javascript
    let desired = p5.Vector.sub(target,this.position);
```

Calculate the desired velocity to target at max speed.

```javascript
    desired.setMag(this.maxspeed);
```

```javascript
    let steer = p5.Vector.sub(desired, this.velocity);
```

Reynolds’s formula for steering force

```javascript
    this.applyForce(steer);
    }
```

Use the physics model and apply the force to the object’s acceleration.

==Vehicles movement feels more deliberate because they seek their target with full speed, unlike particles that act as forces are being blown at them and their movement degradate over time.== 

We talked about how to calculate a vehicles path.

**Boids** - Flock - They have a range they can sense
Separation - 
Alignment - align your direction with other Boids, get all their velocities - find the sum and apply to all of them so they influence each other.
Cohesion - if you are too far - get closer to where most of the other Boids are. Add all of position divide by number of Boids - get the center of mass.
**These are the 3 forces working on your Boids**

---

References
[[Alex Miller]]
