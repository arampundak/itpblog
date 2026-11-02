---
date: 2026-10-30
tags:
  - resource
  - ai
  - robots
draft: false
author:
url:
---
**1 APU with 3 engines**
- CPU - 'the orchestrator' - MediaPipe hand tracking
- iGPU - integrated - all on the same package - event driven raw compute, wakes up when there is something to think about - Llama 3.2 3B
- NPU - always on low power ai - 2 YOLO models (person + face) object ditication and pose estimation

**ROS2**
Middleware software, layer between code and machine that lets components talk together, publisher subscriber framework, works with nodes (each skill is a node). ROS node SDK (topic) to install and deploy immediately. plug in to application.

**VLA**
Vision Language Action. imitation/mimic learning, teach a robot to pick a ball - you need to show it how to do it. capturing a usage with one robot with streo camera (2 POVs) to show the VLA what it is to pick up a ball. every grasp is an episode, you need to show many episode, the robot traces the users episode. this is training. if i want to change environment - i cant, because the pictures/.video show one specific environment. 
What is seen in this workshop is an AMD specific VLA - vision component with a pretrained YOLO model, heavy model with big neural netwrok.
