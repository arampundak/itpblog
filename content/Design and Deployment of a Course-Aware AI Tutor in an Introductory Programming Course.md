---
date: 2026-10-26
tags: []
draft: false
author:
url:
---
**Design and Deployment of a Course-Aware AI Tutor in an Introductory Programming Course.** Groher, Heissenberger (JKU Linz) and Vierhauser (Innsbruck). Preprint accepted at CSEDU 2026, arXiv 2604.11836. Code is public on GitHub.

### What it is

A web-based Python tutor with three parts side by side: a code editor, the task description, and an LLM chat. The tutor is grounded only in the course materials and is built not to give full solutions. It offers hints, Socratic questions and explanations instead.

**Stack:**

- GPT-4o through the OpenAI Assistants API, with a vector store for RAG
- React frontend
- FastAPI backend

**Five requirements:**

1. **Context awareness:** it can see the student’s current code and the task.
2. **Conversation memory:** it adapts its level of detail over the conversation.
3. **Course-only answers:** off-topic requests are rejected.
4. **Hints instead of solutions.**
5. **User-configurable context:** a toggle controls whether code and task are sent to the model.

### Study

- 39 business administration students in a first-year Python course, 26 of them with no prior programming experience.
- Four weeks of voluntary use, plus two assigned tasks (collections, functions).
- Data: interaction logs and a 33-item survey.

**Logs.** 354 interactions were merged into 304 and open-coded into 12 categories by three coders. The largest:

|Category|Count|
|---|---|
|Explain Concept|61|
|Implement (explicit solution request)|47|
|How To|38|
|Code Correctness|34|
|Code Only (pasted code, no question)|31|
|Unrelated (e.g. weather)|23|

**Survey** (5-point scale, total mean 3.84):

|Category|Mean|
|---|---|
|Usability|4.06|
|Context awareness|4.01|
|Didactics|3.81|
|Comparison to ChatGPT|3.48|

- Highest items: being treated respectfully (4.62) and wanting task-plus-code context in future (4.54).
- Lowest didactic item: being able to turn hints into a solution (3.36).

**Lessons the authors draw:**

- Context awareness drives usefulness.
- Hint-based guidance is accepted even though students ask for answers.
- Latency broke students’ flow.
- Students send short, underspecified prompts and expect the tutor to infer intent.

### Weaknesses

- **No learning outcomes.** There is no control group, and all perception data is self-report. The response rate out of total enrollment is not given.
- **The central claim is overstated.** They say the tutor was used as learning support “rather than as a simple solution generator.” But Implement (47) plus Code Only (31) is about a quarter of interactions. More importantly, they never report whether the guardrail held, that is, how often GPT-4o leaked a solution anyway. That is the key missing result.
- **Comparison to ChatGPT is weak.** The learning-support item scored 3.38, barely above neutral, so “slightly favored” is generous.
- **Method inconsistency.** The RQ1 method says only questions submitted _without_ code or task context were coded. That fits poorly with reporting 304 of 354 interactions coded. Either the exclusion was small or the reporting is unclear.

### Relevance to Ari

- **Your stance has a lineage, not novelty.** Socratic, no-answers, RAG-grounded tutoring is mature in programming education: CodeHelp, CodeAid (Kazemitabaar, _Grossman_, CHI ‘24), Iris, CS50 Duck. This paper cites all of them. You should cite that lineage. Your contribution can’t be “a tutor that asks questions instead of answering.” It has to be what changes when the tutor is physical, situated at a machine, and the work is irreversible.
- **That irreversibility is your best argument.** In code, a hint the student can’t act on costs time. At a laser cutter it costs material or safety. Their weakest item (turning hints into action, 3.36) supports your split: direct on procedure and safety, Socratic only on design decisions. Say this explicitly.
- **Expect users to push for answers.** About 15% of their interactions were explicit solution requests. Ari needs a defined behavior for “just tell me the settings.” They list detecting repeated requests as future work; you could design it.
- **Their configurable context is a precedent for your eyelid.** The student decides whether the tutor sees their work. They evaluated usefulness, not privacy, so you can still claim the privacy angle. But their strongest finding is that seeing the work was what users valued most. That is the same tension as with Smart Makerspace: your blind-box default gives up exactly what users rated highest. Their underspecified-prompt finding makes it worse. At a machine, people will say “this one” and point. That is an argument for opening the eye during making, which fits your intent split if you state it.
- **Latency matters more for a robot.** Slow responses broke flow in a text chat. For an embodied agent in conversation it breaks turn-taking. This supports your fast-model plus heavy-model architecture as a design requirement rather than an implementation detail.
- **Their taxonomy is reusable.** Their 12 categories are a ready starting codebook if you log Wizard-of-Oz sessions, and they let you compare a shop to programming directly. Combined with AI PI’s query categories, if that paper reports them, you’d have two baselines.