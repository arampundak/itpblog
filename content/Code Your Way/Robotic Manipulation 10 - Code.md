20260411

```bash
cd /Users/arampundik/Documents/NYU/Y1/Spring/Code\ Your\ Way/Robotic\ Arm/trs_so_arm100
```

```bash
python3 -m mujoco.viewer --mjcf scene.xml
```

scene.xml defines the world
    ↓
trace_plane.py loads it
    ↓
viewer opens (same UI you've been using)
    ↓
Python loop: calculate IK → set joint angles → step sim → viewer draws frame
    ↓
you watch the arm move in real time

### 1st iteration
Worked for a few hours to make things work, but to understand the plane the robotic arm should move at is not what is being simulated. 

---

a walkthrough of [trace_plane.py](vscode-webview://1ms8ur3hq1q5b4kfh5n9lau11pdurkjf488nbcgim0pj7q5d51u6/trs_so_arm100/trace_plane.py) top to bottom:

**Setup**

The script loads `scene.xml` into MuJoCo, which gives it two objects: the `model` (static description of the arm — joints, masses, geometry) and `data` (live simulation state — current joint angles, positions).

It then sets `data.qpos` to the home pose angles you defined and calls `mj_fwdPosition` to compute where every body in the arm actually sits in 3D space, without running any physics.

---

**Finding the plane centre**

It reads `data.xpos[ee_body_id]` — the world-space XYZ of the `Fixed_Jaw` body (the gripper). That position becomes the plane centre, nudged 5 cm back in Y and 5 cm down in Z to place it comfortably in front of and below the gripper's rest position.

From that centre it builds 4 corner targets by adding/subtracting `HALF` (0.04 m) in Y and Z, forming an 8 cm × 8 cm square.

---

**Waiting for you**

The viewer opens showing the arm in its home pose. A `select()` loop keeps calling `mj_kinematics` + `viewer.sync()` as fast as possible — this redraws the scene every frame without simulating physics, so the arm stays frozen but the viewer stays interactive. When you press **Enter**, the loop breaks and the trace begins.

---

**Jacobian IK loop** (inside `move_to_target`)

This runs once per corner (and once to return to centre). Each iteration:

1. Reads the current gripper XYZ from `data.xpos`
2. Computes the error vector (`target − current`)
3. Calls `mj_jacBody` to get the **translational Jacobian** — a 3×5 matrix where each column says "if I move joint _i_ by 1 rad/s, how fast does the gripper move in X, Y, Z?"
4. Takes the **pseudoinverse** of that matrix (`np.linalg.pinv`) to get a 5×3 matrix that maps Cartesian error back to joint corrections
5. Multiplies by `error` to get `dq` — the joint angle nudge that moves the gripper toward the target
6. Adds `dq * IK_DT` to `data.qpos`, clamps each joint to its limits, then calls `mj_kinematics` to update the arm's geometry and `viewer.sync()` to redraw

This repeats until the error drops below 5 mm (or hits the step cap).

---

**Holding**

After all corners are traced and the arm returns to centre, a final loop keeps calling `mj_kinematics` + `viewer.sync()` indefinitely so the viewer stays open and the arm holds its last position until you close the window.

---

### 2nd iteration
What we built

### Files changed

- **[so_arm100.xml](vscode-webview://1ms8ur3hq1q5b4kfh5n9lau11pdurkjf488nbcgim0pj7q5d51u6/trs_so_arm100/so_arm100.xml)** — the arm model (modified once)
- **[scene.xml](vscode-webview://1ms8ur3hq1q5b4kfh5n9lau11pdurkjf488nbcgim0pj7q5d51u6/trs_so_arm100/scene.xml)** — the MuJoCo scene
- **[trace_plane.py](vscode-webview://1ms8ur3hq1q5b4kfh5n9lau11pdurkjf488nbcgim0pj7q5d51u6/trs_so_arm100/trace_plane.py)** — the simulation script

---

### so_arm100.xml

Added a **LED gizmo** directly inside the `Fixed_Jaw` body — 4 visual-only geoms that move rigidly with the gripper:

- Yellow sphere at the tip (`led_sphere`) — marks the end effector
- Red/green/blue cylinders pointing in X/Y/Z — orientation indicator

These have no physics (`contype="0" conaffinity="0"`) and require no Python to animate.

---

### scene.xml

Added a **semi-transparent light blue box** representing the drawing plane:

- `size="0.003 0.05 0.05"` — 3 mm thin, 10 cm square face
- `euler="0 0 -1.5708"` — rotated 90° so the face points toward the arm (perpendicular to the arm's reach direction, not running alongside it)
- `pos="-0.008 -0.205 0.366"` — computed from the gripper's actual home pose position
- No collision

---

### trace_plane.py — what it does now

**On startup:**

1. Loads `scene.xml`, sets the arm to the home pose, runs forward kinematics
2. Reads the gripper's world position and computes the **drawing plane centre** — 5 cm along the arm's horizontal reach direction (base → gripper projected onto XY), which correctly places it facing the arm
3. Prints a ready-to-paste `<geom>` line for `scene.xml` in case the position needs updating
4. Builds 4 corners of a **6 cm × 6 cm rectangle** on the plane (varying X and Z, constant Y)

**Controls (in the viewer window):**

- **Space** — resets arm to home pose, then traces all 4 corners in sequence and returns to centre. Can be replayed any number of times
- **W** — runs a 2000-sample random joint sweep and prints the arm's full XYZ workspace range to the terminal

**Under the hood:**

- Motion uses **Jacobian pseudoinverse IK** — all 6 joints, 3000-step cap, 5 mm convergence threshold
- Pure kinematics (`mj_kinematics`) — no physics, gravity, or collisions
- `time.sleep(0.001)` throttles the loop to ~1000 steps/sec for visible smooth motion
- `execute_path(points)` is the bridge function for future p5.js drawing data — takes a list of `{"x", "y", "z", "pen_down"}` dicts and drives the arm through them

**Annotated for the physics upgrade:** every place that needs to change when switching from `mj_kinematics` to real physics (`mj_step`) is marked with a comment explaining exactly what to swap.