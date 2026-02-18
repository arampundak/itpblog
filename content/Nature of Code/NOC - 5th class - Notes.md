180226

```
class Fish extands Ball {

	constructor(x, y, w = 20, h = 15, colorHue = 0){
		super(x, y, w, colorHue);
		this.w = w;
		this.h = h
		this.angle = 
	}
}
```

OOP - create a class that inherit another class
`super` ???

---
Next chapter 04:

```
this.particles = this.particles.filter(function(particle) {
	return !particle.isDead();
});
```

On methods that require function
`=>` given something do something
```
this.particles.forEach(particles => particles.run());

this.particles = this.particles.filter(particles => !particle.isDead());
```
