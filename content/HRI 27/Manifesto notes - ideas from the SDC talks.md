---
date: 2026-10-08
tags: []
draft: false
author:
url:
---
Every idea below came up in the three SDC conversations with Aditya. Each one gets a line of grounding: who said it before, what the evidence says, or where our version overreaches.

Items marked **(contested)** are claims we made that the evidence only partly supports. Fix those before they reach the manifesto.

## Manufacturing, skills, and why making matters

- **US manufacturing declined because the skills were never passed down. (contested)** Employment peaked at 19.6 million in June 1979; the main debated causes are Chinese import competition (Autor, Dorn and Hanson estimate 1.5 million net jobs lost 1990–2007; with Acemoglu and Price, up to 2.4 million through 2011) and automation. Lost skill transmission is better framed as a consequence that then compounds.
- **Knowledge that was "figured out back then" is now forgotten.** This is the tacit-knowledge argument: Polanyi's "we know more than we can tell" (1966). Pisano and Shih's "industrial commons" argument (HBR 2009) says offshoring erodes the shared know-how a region needs to make things.
- **"They want it back."** Deloitte and the Manufacturing Institute project up to 3.8 million manufacturing jobs to fill in 2024–2033, with 1.9 million at risk of going unfilled. A Cleveland Fed brief notes that from 1979 to 2025 total US employment grew 68 million while manufacturing fell 6.6 million, so a full return is unlikely.
- **Hand skills are becoming important again; makerspaces are spreading into schools and libraries.** The intellectual root is Papert's constructionism: people learn best by building things they can share. The "maker movement" label dates to Make magazine (2005).
- **Learning by doing, learning with your hands.** Dewey and Kolb's experiential learning cycle are the standard citations.

## Learning: novices, scaffolding, Socratic tutoring

- **Beginners don't know what they don't know; even asking "what should I know?" is hard.** Novices lack the metacognitive map experts have (Kruger and Dunning 1999 is the usual citation). MakeAware (Stark et al.) documents this for makerspace newcomers specifically.
- **Beginners need incremental hand-holding until they can self-learn.** This is scaffolding (Wood, Bruner and Ross 1976) inside Vygotsky's zone of proximal development. The key design implication is fading: the support must shrink as skill grows.
- **A tutor, not an assistant; it asks questions instead of giving answers.** Bloom's "2 sigma problem" (1984) found one-to-one tutoring beat classroom teaching by about two standard deviations; later replications find smaller effects. Khan Academy's Khanmigo (2023) and CodeHelp are Socratic AI tutors built to withhold answers.
- **Risk of the authoritative tutor.** An HRI 2026 study of LLM-powered NAO robots in Tanzania found pupils accepted robot answers they knew were wrong when the robot seemed smart. A Socratic robot has to invite being questioned.
- **People ask an agent again and again because it won't judge them.** Lucas et al. (2014) found people disclosed more to a virtual human they believed was autonomous than to one they believed was human-operated. Academic help-seeking research (Karabenick and others) shows students avoid asking when it feels like exposing incompetence.
- **"Homework for the homework": you have to prepare before you can use an expert's time.** This is the help-seeking cost argument; the robot lowers the cost of the first question so the human expert gets a better second one.
- **Education trained people to follow instructions, not decide. (contested as stated)** Freire's "banking model" (1968) is the classic critique. On India specifically, the National Education Policy 2020 itself calls for moving away from rote learning, so cite that rather than personal impression.
- **ITP needs tutors; residents' help sessions are tutoring, but not individualized.** This is an observation, not a finding. Document it (session counts, waiting times) if it goes into a paper.
- **Physical computing splits you between the coding lab and the shop.** Also an observation worth documenting; it argues for a helper that spans both domains.

## AI, work, and human judgment

- **AI should take the repetitive tasks and leave the decisions to people.** Brynjolfsson's "The Turing Trap" (2022) argues for AI that augments rather than imitates and replaces humans. The task framework of Autor, Levy and Murnane (2003) predicts technology substitutes routine tasks and complements non-routine ones.
- **Jobs won't disappear; their nature will change. (contested)** The task framework supports "change"; Acemoglu and Restrepo show automation can also displace workers outright. State it as a design goal, not a prediction.
- **If AI handles your spreadsheets, why hire a person?** This is the open question the manifesto should answer, not assume.
- **The WALL-E future: a robot that literally tells you which button to press.** Bainbridge's "Ironies of Automation" (1983): automating the routine part deskills the operator, who then must handle the rare failure without practice. This is the strongest argument for a tutor over an instruction-giver.
- **Without humans in the loop, AI produces slop.** Aligns with the human-in-the-loop literature; keep it as a slogan, cite Bainbridge or Brynjolfsson for substance.
- **Find where human interaction is needed and where AI should keep humans moving.** A one-line version of augmentation design. "AI to keep humans moving" is a good phrase to keep.
- **The robot routes you to the right person faster (three weeks to find the person who knows).** Wegner's transactive memory (1985): groups work by knowing who knows what. The robot as a directory of human expertise is a stronger claim than the robot as the expert.
- **"Shrinking society": fewer people available to teach.** Plausible but unsourced in our talk; find a demographic or staffing figure before using it.
- **"We are the pioneers; there was nothing like this before." (wrong)** Smart Makerspace (Autodesk, 2015) and Georgia Tech's AI PI assistant (2025) predate us. The open space is narrower: an embodied, multi-party tutor in a shared space.

## Media-history analogies

- **Mastery of the medium used to come before expression; now expression comes first.** The software example (not finding a button) is the everyday version. It is the thesis the other analogies support.
- **Photography freed painting from realism, opening the way to abstraction.** The daguerreotype was announced in 1839 and Impressionism emerged in the 1870s; art historians debate how direct the link was. Walter Benjamin's "The Work of Art in the Age of Mechanical Reproduction" (1935) is the standard text on technology changing what art is for.
- **Film used a 5:1 shooting ratio; now it is 500:1, so the work moved to the cutting floor. (numbers illustrative)** Golden-age Hollywood ran about 10:1, Hitchcock kept near 3:1, and Apocalypse Now reached 95:1. Digital pushed ratios up, with documentaries often above 100:1. Use real figures, not 5 and 500.
- **When making is cheap, the human skill is cutting: deciding what to keep.** Walter Murch's "In the Blink of an Eye" treats editing as decision-making; he edited Apocalypse Now, so the example and the theory share a source. This is the idea most worth building the manifesto around.

## Embodiment and robot design

- **We are wired to sense motion and connect with embodied forms.** Heider and Simmel (1944) showed people read intentions into moving geometric shapes. Yizhar et al. (HRI 2026) studied animacy perception in robots with neuroimaging.
- **A physical tutor teaches better than a screen. (contested)** Leyzberg et al. (2012) found an embodied robot tutor beat on-screen and voice-only tutors; Belpaeme et al. (2018) attribute robot-tutor gains largely to physical presence. Kanero et al. (2021) found no learning difference between a robot and a voice-only tutor.
- **Two brains: a fast conversational one and a slow reasoning one, with the body showing which is active.** The analogy is Kahneman's System 1 and System 2 (2011). Treat it as a metaphor for the design, not a cognitive claim.
- **Two faces, Cerberus, good cop and bad cop.** Memorable, but a split character risks being unreadable. A posture shift on one body is simpler to build and to test.
- **Playful interaction.** Bickering Benches (HRI 2026 SDC winner) is the reference for playfulness as a design argument.
- **Scientists prove, designers demonstrate.** Social Queue framed itself as a measured study; Bickering Benches as a provocation. The method name for the second is research through design (Zimmerman, Forlizzi and Evenson, CHI 2007).

## Privacy and consent

- **Three modes: no personal context, audio only, or camera and audio.** This is privacy by design in tiers. Nissenbaum's contextual integrity is the framework: what's acceptable depends on whether information flows match the norms of the setting.
- **An eyelid you open so it can see you.** PrivacEye (Steil et al.) used a physical eyelid shutter on a camera for exactly this reason. Studies of bystander indicators report people trust physical shutters more than LEDs. Windl et al. (2024) catalogued privacy-communication patterns for domestic robots and found tangible cues like shutters raise trust.
- **Some people don't want to be filmed at all.** In a shared space this is a bystander problem, not only a user setting; the people who never chose to interact need a signal they can read at a glance.

## Sources

Pages opened while writing this. Classic texts named above without links (Polanyi, Papert, Dewey, Bloom, Freire, Benjamin, Murch, Bainbridge, Heider and Simmel, Kahneman, Wegner, Nissenbaum) are cited from general knowledge; check editions before quoting.

- [Cleveland Fed: where could reshoring manufacturers find workers (2025)](https://www.clevelandfed.org/-/media/project/clevelandfedtenant/clevelandfedsite/publications/cleveland-fed-district-data-briefs/cfddb-20251009-where-could-reshoring-manufacturers-find-workers/cfddb-20251009-where-could-reshoring-manufacturers-find-workers.pdf)
- [Strain, "The myth of the China shock" (summarizes Autor/Dorn/Hanson and Acemoglu et al. figures)](https://www.business-standard.com/opinion/columns/the-myth-of-the-china-shock-126081901498_1.html)
- [Deloitte and Manufacturing Institute: 3.8 million jobs by 2033](https://themanufacturinginstitute.org/manufacturers-need-as-many-as-3-8-million-new-employees-by-2033/)
- [Shooting ratio overview](https://en.wikipedia.org/wiki/Shooting_ratio) and [Vashi Nedomansky on feature-film ratios](https://vashivisuals.com/shooting-ratios-of-feature-films/)
- [Belpaeme et al., Social robots for education: a review (2018)](https://researchportal.plymouth.ac.uk/en/publications/social-robots-for-education-a-review/)
- [Leyzberg, Creating Personalized Robot Tutors (dissertation)](https://scazlab.yale.edu/sites/default/files/files/Leyzberg_Dissertation_PersonalizedRobotTutors.pdf)
- [Kanero et al., When Even a Robot Tutor Zooms (2021)](https://www.frontiersin.org/journals/robotics-and-ai/articles/10.3389/frobt.2021.679893/pdf)
- [Robot Tutors or Peers? LLM-powered robots in Tanzanian schools (HRI 2026)](https://imec-publications.be/entities/publication/6f9635a9-7a3a-4fa6-b032-8d4a58e81cad/full)
- [Smart Makerspace (Autodesk, 2015)](https://research.autodesk.com/app/uploads/2023/03/smart-makerspace-an-immersive.pdf_recDhaQGR3ZvJcwMF.pdf)
- [MakeAware (Stark et al.)](https://fcd.ugr.es/sites/centros/fcd/public/ficheros/PROYECTO2023/makerAware.pdf)
- [AI PI, Georgia Tech Invention Studio](https://matrixlab.gatech.edu/?p=25)
- [PrivacEye](https://arxiv.org/pdf/1801.04457)
- [Privacy indicators for bystanders in XR (2025)](https://arxiv.org/abs/2508.07057v1)
- [Windl et al., privacy communication patterns for domestic robots (2024)](https://www.ashb.com/?p=28996)