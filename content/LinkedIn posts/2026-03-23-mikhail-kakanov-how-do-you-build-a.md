---
pos: 48
platform: linkedin
author: "Mikhail Kakanov"
headline: "Robotics Research Engineer | Humanoid Control & Co-Design @ Robotics Center"
date: 2026-03-23
date_precision: exact
url: "https://www.linkedin.com/feed/update/urn:li:activity:7441887879934464000"
media_type: "image"
card_title: null
card_domain: null
repost_of: null
tags: []
entities: []
career_relevant: false
capture_source: export
capture_status: ok
draft: true
---

# 🤖 How do you build a humanoid that is both strong and agile?

## Why I saved it

<!-- your words - what caught your eye, what it connects to -->

## Gist

<!-- one sentence, filled by the tagging pass -->

## Full text

🤖 How do you build a humanoid that is both strong and agile?

This question comes straight from practice.

We want robots that can:
• carry payloads
• interact safely
• and still perform dynamic motions — dancing, jumping, even acrobatics

But actuator design quickly becomes the bottleneck.

⸻

The core problem is a fundamental trade-off:

👉 high torque for load-bearing vs low impedance for agility
👉 energy efficiency vs responsiveness
👉 stiffness vs backdrivability

You can’t “solve” this — you can only move along it depending on your goals.

⸻

In our new paper, the we take a step toward making this trade-off explicit and controllable:

📄 https://lnkd.in/ecpWzVYc
🔗 https://lnkd.in/eZZCcRHx

We propose a task-aware co-design framework that jointly optimizes:
• actuator parameters
• and full-body motion under realistic constraints

⸻

💡 What’s interesting is not just the method — but what it reveals.

When we run ablations on the objective:

• Focusing on electrical losses → higher gear ratios, lower energy, less backdrivability
• Focusing on gearbox friction → lower gear ratios, better backdrivability, higher energy

👉 Exactly the trade-offs we expect in real systems — now emerging automatically from optimization.

⸻

⚙️ Why this matters in practice:

The results are directly usable:

• as target specs when designing your own actuators
• or to select components from catalogs (e.g., via nearest neighbors in the dataset)

In other words — this is not just analysis, but a tool for engineering decisions.

⸻

Happy to discuss, especially with people working on actuators, humanoids, or co-design.

#Robotics #Humanoids #Actuators #Engineering #Codesign #Optimization #RobotDesign
