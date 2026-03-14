#reading #hri #robot 

by [[Gadi Amit]]
March 2026
https://www.linkedin.com/pulse/very-edge-hardware-moat-ai-revolution-theyre-talking-gadi-amit-fosuc/

---

Gadi writes about AI hardware.
>Latency is the Achilles heel of any Cloud-based compute architecture.

How machine cant have delay time, we are unable to accept that and it will require new kind of system architecture - one that is not cloud based - unlike our LLM.

On "Edge Computing" (sensor → local compute → decision → action)
>And yet, there is a need for a new term - Compute on the Very-Edge - to describe computation right next to the eyes of your companion robot.

Typical round-trip time to the cloud:
- 50–300 ms (best case)
- worse if network drops
In robotics or real-world interaction:
- **grasp control loops**: ~1–5 ms
- **visual reaction**: ~10–30 ms
- **speech conversation**: <200 ms
A cloud system simply can't reliably operate at these speeds.

>These devices often use Vision-Language-Action (VLA) software models and are essential for Robotics and Autonomy. They needs localized, dedicated AI system, with carefully considered and developed Hardware... optimized for unique set of sensors to understand the real world in fraction of a second... dedicated for super-quick response, use compact compute, and are powerful enough to run SLMs locally, and reliably.

Different technical problem: reasoning vs sensing
LLM companies are optimizing for:
- training bigger models
- improving reasoning
- scaling cloud infrastructure
- collecting massive internet-scale data
Hardware AI companies are solving something else entirely:
- **sensor fusion**
- **real-time control**
- **physical interaction**
- **power consumption**
- **latency**

Data
**robotics data** looks like this:
- force readings while grasping a banana
- motor torques while opening a drawer
- camera frames while navigating clutter
- failure cases
Each hardware company generates its own dataset through its machines. Tesla's self-driving AI is powered by fleet driving data.


