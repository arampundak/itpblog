---
date: 2026-11-10
tags: [hri27, sdc, aditya]
---
Summary of Aram and Aditya's review of [[Paper Draft 5]] (from the recording transcript). Claude's notes in *italics*.

## Agreed
- Say **makerspace**, not shop. Outsiders don't know "shop". The building has several (Game Center, IDM), so the design extends to them.
- **Degrees of Socraticness.** Socratic questioning needs some theory first. A basic "how do I operate the laser" gets directions; a design question ("I want to build a sundial") gets questions. The reasoning model decides which.
- **Visor**: Aram will retrofit it or rebuild the head with his own chassis.
- **Technical subsection** in design process: Python app as conductor; voice model answers first while the reasoning model gets the larger context and feeds notes back. Aditya will write a paragraph. He sees it as "optimized inference", solving compute for robotics. *Keep it to one paragraph + diagram; the rubric wants technical detail only as needed. Fast/slow model pairs aren't new, so claim "practical", not "novel". Include the honest lesson: the safety rules first reached only the slow model.*
- **Companion channel** (email or university chat summary after a session): future work.
- **Aditya's teaching**: TA in basic design for two years; has taught at a design school in Mumbai [VERIFY name] and at Srishti Manipal, Bangalore [VERIFY].

## Open: laser settings
Aditya: Ari should give settings once the student shows they don't know: "Have you considered power settings?" → "I don't know" → suggest with a reason, offer to explain more.
*Draft rule says "settings come only from staff." Check with Ian/Phil whether that's a real shop rule. Middle path: Ari points to the shop's posted, staff-approved settings chart, asks the student to pick, explains why; never invents numbers.*

## Open: memory and data
Aditya: "Ari holds no record of individuals" is unrealistic and makes Ari worse; memory is why AI assistants are good. ITP already keeps records (shop profile, bans, ITP wall). Proposal:
- Ownership of data stays with the department.
- Opening the visor = consent to see. Ari then asks once whether it can save information about you.
- Closed visor = no consent; some features unavailable.
- Anonymization: if someone reports a broken laser, Ari tells staff the laser is broken, never who reported it. Ari never answers "what did X ask you?"
- Ask Ian/Phil: if Ari ran fully on local models, would the department accept recording? Any written policy to cite? (add to EXP 4)
- Aditya will write a page on consent, data privacy and anonymization.
*Claude: memory by consent is more honest than "no records" and fits Aram's wish to lean away from surveillance. Two cautions: the consent line "it will help me serve you and the community better" nudges people toward yes; keep the ask neutral. And asking every session is annoying; ask once per person, which needs an identity (NetID?). For the paper, describe consent-based memory as design; the prototype keeps nothing.*

## Name / term
Aditya wants to coin a term: **Aristotle machine** (his longer dream: a tutor every child in India can use on a phone).
*Claude: coining a term is a good move. Two problems: (1) Socratic questioning is Socrates'; Aristotle is better known as Alexander's personal tutor, so the term means "a personal tutor for everyone", not "a Socratic robot". Decide which you mean. (2) A voice-first AI tutor startup called Aristotle raised a $5M seed round, and PAL Robotics sells a robot called ARI. Both collide with the name.*
