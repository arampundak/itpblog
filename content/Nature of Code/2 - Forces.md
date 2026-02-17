==`vel` gives instruction for where `pos` should move to in the next unit of time, `acc` changes `vel` causing object to turn, speed up, slow down ==

Acceleration:
> **How velocity should change this frame.**

acc → changes vel
vel → changes pos

```
vel.add(acc);
pos.add(vel);
```

- **Position** = where your car is.
- **Velocity** = how fast and in what direction you're driving.
- **Acceleration** = how hard you're pressing the gas or brake (or turning the wheel).