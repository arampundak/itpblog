#robot #software 

https://mujoco.readthedocs.io/en/stable/overview.html

**MuJoCo** stands for **Mu**lti-**Jo**int dynamics with **Co**ntact. It is a general purpose physics engine that aims to facilitate research and development in robotics, biomechanics, graphics and animation, machine learning, and other areas that demand fast and accurate simulation of articulated structures interacting with their environment. Initially developed by Roboti LLC, it was acquired and made [freely available](https://github.com/google-deepmind/mujoco/blob/main/LICENSE) by DeepMind in October 2021, and open sourced in May 2022. The MuJoCo codebase is available at the [google-deepmind/mujoco](https://github.com/google-deepmind/mujoco) repository on GitHub.

![[ref - mujoco ui.webp]]
MuJoCo's built-in interactive viewer. It's part of the MuJoCo Python package — when you `pip install mujoco` you get both the physics engine and this viewer. Running `python -m mujoco.viewer --mjcf scene.xml` is just a shortcut to launch it directly from the terminal with a file.

```python
import mujoco
import mujoco.viewer

model = mujoco.MjModel.from_xml_path("scene.xml")
data = mujoco.MjData(model)

with mujoco.viewer.launch_passive(model, data) as viewer:
    # your code runs here
    # you move joints, step the sim, viewer updates live
    while viewer.is_running():
        mujoco.mj_step(model, data)
        viewer.sync()
```
The same UI appears, but now your Python code is driving it. You can still drag the camera around manually while the script runs.

scene.xml ← describes the world: arm, plane, everything physical trace_plane.py ← loads the xml, opens the viewer, runs the IK loop