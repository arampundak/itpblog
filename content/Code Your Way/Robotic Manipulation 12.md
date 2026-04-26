References to similar projects:
https://eduardochamorro.github.io/beansreels/portfolio/lightpainting.html
https://eduardochamorro.github.io/beansreels/portfolio.html
https://www.kevynmc.com/#/ilp/
A video of a robotic arm drawing faces: https://www.youtube.com/watch?v=G8jidJsiJH8, downloaded the Article
https://www.autophoto.org/ - photo booth museum
https://www.photomatica.com/analog-photo-booth-guide - analog photo booth
20260419

Reflecting on where I am - I understand my project is simulated to almost exactly what I imagined, I've tinkered with it by myself and solved two more problems I had in mind.

![[cyw - robot big smiley face 2.mp4]]
![[cyw - robotic smiley face 3.png]]
![[cyw - robotic smiley face 4.webp]]
![[cyw - robotic smiley face 5.webp]]

I decided now to investigate the code:

# trace_plane.py — Section by Section

## 1. Config (lines 30–67)

Tunable constants: the XML scene path, a hand-picked `HOME_QPOS` (6 joint angles) that pre-poses the arm near the plane so IK doesn't have to travel far, IK parameters (step size, damping, error tolerance), plane size, and cosmetic stuff for the trail/plane outline.

## 2. Drawing loading (lines 74–127)

- `load_drawing` reads the p5 sketch JSON (list of strokes, each a list of `{x, y}`).
- `test_drawing` is a fallback triangle + dot.
- `strokes_to_path` converts normalized 2D points (x,y in 0–1) into 3D world targets on the plane. The plane is in the XZ world plane at fixed Y (depth). `pen_down=True` for every point except the first of a stroke (which is a pen-up travel move).

## 3. Visualization (lines 142–179)

`add_capsule_segment` shoves a capsule geom into `viewer.user_scn` (an extra scene the passive viewer renders on top of physics). `mjv_connector` is the handy MuJoCo helper that sizes/rotates a capsule to span two points. `draw_plane_outline` adds 4 cyan capsules framing the plane.

## 4. `main` setup (lines 186–222)

Loads the model, seeds `qpos` with home angles, runs `mj_kinematics` (pure forward kinematics — no dynamics — enough to get the LED site position), then computes the plane center 5 cm in front of and below the LED tip, and builds the 3D path.

## 5. The IK loop — `move_to_target` (lines 242–306)

This is the heart of the file. Details below.

## 6. Sweep + viewer loop (lines 319–387)

`sweep_workspace` randomizes joint angles 2000× and prints LED reachability bounds. The main loop listens for SPACE (run the drawing) or `0` (sweep) via `key_callback`.

---

# The Jacobian IK — what it actually does

**The problem:** you know where you want the LED tip (target point in 3D), and you need to find 6 joint angles that put it there. The forward map `q → tip_position` is a nasty nonlinear function (sines and cosines stacked through a kinematic tree). You can't invert it in closed form for a 6-DOF arm in general.

**The idea: linearize locally.** Near the current pose, forward kinematics behaves like a linear function. The **Jacobian** `J` is its local linear approximation:

Δx≈J⋅ΔqΔx≈J⋅Δq

where `Δx` is the change in tip position (3 numbers: x, y, z) and `Δq` is the change in joint angles (6 numbers). So `J` is a 3×6 matrix — each column tells you "if I nudge joint `i` by a tiny amount, how does the tip move in world coordinates?" MuJoCo computes this for you with `mj_jacSite` (line 270).

**What we want to solve:** `J · dq = error`, where `error = target - current_tip_position`.

But `J` is 3×6 — underdetermined. There are infinitely many joint motions that produce the same tip motion (the arm has redundant DOFs, and some combinations like locking the wrist still move the tip the same way). You need to pick one.

**Naive pseudoinverse:** `dq = Jᵀ(JJᵀ)⁻¹ · error`. Picks the smallest-norm `dq`. Problem: near singular configs (e.g. arm fully extended), `JJᵀ` becomes nearly singular → its inverse blows up → huge, erratic `dq`.

**Damped least squares (what this code does):**

```
dq = Jᵀ (JJᵀ + λ²I)⁻¹ · error     # line 274–276
```

Adding `λ²I` keeps the matrix invertible even near singularities. The physical meaning: instead of "find the `dq` that exactly produces `error`", you solve the compromise:

min⁡dq  ∥J⋅dq−error∥2+λ2∥dq∥2mindq​∥J⋅dq−error∥2+λ2∥dq∥2

The first term says "try to match the desired tip motion." The second term says "don't move the joints too much." `λ` (here `IK_DAMPING = 0.01`) balances the two. Higher `λ` → safer near singularities but tip lags target slightly.

**Why it converges:** each iteration takes one small Newton-ish step toward the target. `dq * IK_DT` (line 279) scales the step down for stability — like gradient descent with a learning rate. Then `mj_kinematics` recomputes where the tip actually ended up, and the loop repeats until `|error| < 5 mm`. The joint-limit clipping on line 282 keeps solutions physically reachable.

**Why it works in practice on this arm:**

- The error decreases roughly geometrically each step as long as `J` is a good local model.
- The damping kills the instability that plain pseudoinverse IK has when the arm straightens or a wrist axis aligns with another.
- Position-only (3 rows) means you're not constraining orientation — the wrist can wobble freely, which gives the solver more redundancy to work with and faster convergence. For a pen that just needs the tip in the right place, that's fine.

**The trail logic (lines 289–300)** is independent of IK — it just reads `site_xpos` each iteration and drops a capsule between the last anchor and the current tip once they're > 2 mm apart, so the drawing materializes as the arm actually moves.