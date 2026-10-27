---
date: 2026-10-26
tags:
  - reading
  - hri
  - robots
draft: false
author:
url: https://link.springer.com/article/10.1007/s12369-026-01361-7
---
**Shape Symbolism in the Design of Socially Interactive Robots: Rounded vs. Angular Contours.** Chen, Chung, Chien, Yang and Yeh (MacKay Medical University / National Taiwan University). _International Journal of Social Robotics_ 18:18, published Feb 2026. DOI 10.1007/s12369-026-01361-7. Data and stimuli are on OSF.

### What it is

A perception study asking whether rounded vs. angular contours change what people expect a robot to be and do, and how that interacts with humanoid vs. non-humanoid appearance. The hypothesis: rounded reads as friendly and companion-like, angular as potent and service-like.

### Method

- **Participants:** 40 NTU students, mean age 20.6. A pilot of 10 was used for power simulation.
- **Stimuli:** 8 commercial robots in a 2×2 of service vs. companion and humanoid vs. non-humanoid.
    - Service: Zenbo, Atlas, Spot, Colossus.
    - Companion: Codi, Alpha 1, a piglet robot for children, Paro.
    - Each was photo-edited into a rounder and a more angular version, giving 16 grayscale images on a black background.
- **Procedure:**
    1. Attitude questionnaires: technology acceptance (TAM), state and trait curiosity, and negative attitudes toward robots (NARS).
    2. An Implicit Association Test pairing robot shape with friendly or potent words.
    3. A custom 18-item rating questionnaire for each robot covering functions, attributes, a bouba/kiki shape check, arousal, and familiarity.
- **Analysis:** linear mixed-effects models with Shape, Humanoid and Familiarity as fixed effects.

### Results

- **Implicit:** the association held. Rounded pairs with friendly, angular with potent (D = 0.33, d = 1.20).
- **Implicit vs. attitudes:** people with stronger associations had lower technology acceptance (r = −.51) and more negative attitudes toward robots (r = .36), especially on the actual-interaction subscale (r = .42).
- **Explicit, shape:** shape mattered only for two items. Rounded robots were preferred for “staying close by” (p = .044) and rated more likeable (p = .045). Shape did not predict service function, potency, reliability or trust.
- **Explicit, humanoid:** humanoid appearance predicted service functions (daily routines, mobility, privacy) and potency, reliability and trustworthiness. These were the stronger effects, with privacy at p < .001 and trust at p = .005.
- **Checks:** the shape manipulation and bouba/kiki correspondence worked. Shape-arousal did not. The authors argue that a real object’s meaning overrides the arousal effect of simple contours.
- **Their conclusion:** roundness buys approachability. Humanoid form, not angularity, buys perceived competence. Some deviation from shape stereotypes may help a robot read as novel.

### Weaknesses

- **Static grayscale pictures only.** No motion, sound, behavior or physical presence. This is about first impressions of a silhouette.
- **The explicit shape effects are fragile.** Fifteen items × two factors were tested with no multiple-comparison correction, and both shape effects sit just under .05 with confidence intervals touching zero. The humanoid effects are more convincing.
- **Humanoid is confounded with robot identity.** Two robots per cell, and the “humanoid” category lumps together a screen-face home robot (Zenbo) and Atlas. Humanoid effects may reflect specific robots rather than humanoidness.
- **The attitude correlations are exploratory.** The interpretation (strong stereotypes make people less accepting) is plausible but post hoc. The IAT D-score also can’t separate rounded-friendly from angular-potent, which the authors admit.
- **Narrow sample:** 40 young adults in Taiwan, and the ethics approval code suggests the protocol dates to 2017.
- **Item wording not in this file.** The full wording of items such as “ensure privacy” is in their Appendix B, so I can’t tell exactly what participants were judging.

### Relevance to you

- **For Ari, the useful result is the one they didn’t predict.** Making a robot rounded and friendly did not cost it perceived competence or trust; those tracked humanoid features. That matters because Ari needs both approachability (newcomers, Socratic tone) and authority (direct on safety). By their loose definition, a robot with a head and a voice counts as humanoid, so a desktop robot with a head that speaks is likely on the “trusted” side. Treat that as an inference; they never tested a robot like that.
- **Their privacy result touches your eyelid.** Humanoid robots were rated better at “ensuring privacy.” Without the item wording I wouldn’t build on it. But it suggests privacy perception is driven by overall form, which supports making privacy a visible physical feature rather than a policy statement.
- **For your expressive-motion thesis, it’s a boundary-marker citation.** The missing arousal effect, with real objects’ meaning overriding contour, plus the static-only design, is an argument that shape alone under-determines perception. Movement and behavior are the open variable. Use it to frame motion as what static-form studies can’t reach, alongside Koike et al.’s morphology elements paper.
- **For the SDC, it gives empirical backing to the winning pattern.** Rounded, object-like, approachable entries such as Bickering Benches and Social Queue fit “rounded = stay close by.” The authors’ novelty argument (deviate from stereotypes to signal technological sophistication) is speculation, not a finding.