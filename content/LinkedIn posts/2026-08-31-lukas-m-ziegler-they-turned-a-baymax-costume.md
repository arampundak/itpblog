---
pos: 5
platform: linkedin
author: "Lukas M. Ziegler"
headline: "Robotics evangelist @ planet Earth | Telling your robot stories | Investing in physical AI startups"
date: 2026-08-31
date_precision: exact
url: "https://www.linkedin.com/feed/update/urn:li:activity:7500092465845256192"
media_type: "video"
card_title: null
card_domain: null
repost_of: null
tags: []
entities: []
career_relevant: false
capture_source: chat-batch-1
capture_status: ok
draft: true
---

# They turned a Baymax costume into robot skin!

## Why I saved it

<!-- your words - what caught your eye, what it connects to -->

## Gist

<!-- one sentence, filled by the tagging pass -->

## Full text

They turned a Baymax costume into robot skin!

Whole-body contact with a humanoid is usually handled one of two ways, and both give something up.

Collision avoidance keeps a comfortable geometric margin, but once contact actually happens it has nothing to offer.

Robotic skin measures contact directly, except thin skin leaves almost no margin, so a slow reaction or a force past the material's elastic limit becomes a real problem.

A team from KAIST, DGIST (Daegu Gyeongbuk Institute of Science and Technology) and UIUC inflated the skin instead!

The envelope is a single-piece commercial Baymax costume. Inflating it puts a large standoff distance between the contact surface and the rigid frame underneath, which recovers the geometric margin of collision avoidance. Then they put the sensors inside it.

Alright, let's have a look at what's inside. Time-of-flight sensors pointed into a sealed, controlled volume avoid most of the errors that come with perception in open environments.

And because the whole surface is compliant, even a small object deforms a large area, so it registers clearly.

-> 116 ToF sensors across 16 modules, tilted 45 degrees for 360 degree coverage per body segment, at 20 Hz with no blind spots
-> An MLP predicts what the skin surface should look like from joint angles alone
-> Contact is detected as the deviation between the predicted and observed point clouds
-> Validated on single-point contact, multi-touch, and full-body hugging

Hugging is one of the experimental conditions, and it's the hardest case here as it is a distributed contact across many segments at once.

Which is exactly what you'd want from a Baymax, I guess :D

Project page: https://lnkd.in/dyM6jBUg

~~

Join the weekly robotics newsletter, and never miss any news -> ziegler.substack.com
