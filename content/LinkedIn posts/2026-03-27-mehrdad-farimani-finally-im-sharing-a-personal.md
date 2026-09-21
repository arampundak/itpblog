---
pos: 46
platform: linkedin
author: "Mehrdad Farimani"
headline: "Busy Designing Robots"
date: 2026-03-27
date_precision: exact
url: "https://www.linkedin.com/feed/update/urn:li:activity:7443274283230978048"
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

# Finally, I’m sharing a personal open-source project I’ve been working 

## Why I saved it

<!-- your words - what caught your eye, what it connects to -->

## Gist

<!-- one sentence, filled by the tagging pass -->

## Full text

Finally, I’m sharing a personal open-source project I’ve been working on around #humanoid #robot design.
Over the years, I’ve repeatedly seen the same pattern: early mechanical decisions are often based on human proportions, and only later adjusted once simulation, control, or task constraints come in. At that point, changing geometry becomes expensive and inconsistent across teams, especially in #industrial_design.

GulaMannen is an attempt to address that.

It’s a modular humanoid reference platform intended for simulation-first exploration. Instead of starting from scratch or assembling a generic placeholder, teams can use a set of predefined configurations and swap key parameters such as joint architecture, base type, and proportions to test different directions early.

The current version includes six configurations:
- a full biped with serial joints
- a biped with parallel wrist and ankle
- several hybrid setups (pedestal, vertical actuator, rail-based, single-leg)

They all share a common upper body and a consistent actuator logic, so comparisons between setups are easier.

I also added a small set of reference environments (desk, shelves, pallet/box setups). The idea is to evaluate reach, height, and task compatibility directly, not just kinematics in isolation.

The CAD is hosted on Onshape and is fully accessible. URDF is available for some configurations and can be extended. The system is modular, so parts can be recombined or adjusted depending on the use case.

This is still a work in progress. Mass properties and dynamics are not fully refined across all configurations, and simulation coverage can be improved. The intention is to open it up and let it evolve with input from others working on similar problems.

If you’re working on humanoids and need a starting point for simulation or early design exploration, feel free to take a look and adapt it.

Thanks to Ben Katz (MIT), Scott Walter, Ph.D., Connor Shannon, Stephen Morfey, Rob Knight, and others for early feedback.
Special thanks to Kimate Richards, who is supporting URDF generation on demand.

Links in the cmnt section.
