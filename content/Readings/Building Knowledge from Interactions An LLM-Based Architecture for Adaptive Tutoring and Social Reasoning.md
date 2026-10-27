---
date: 2026-10-26
tags:
  - reading
  - hri
draft: false
author:
url: https://arxiv.org/abs/2504.01588
---
**Building Knowledge from Interactions: An LLM-Based Architecture for Adaptive Tutoring and Social Reasoning.** Garello, Belgiovine (equal contribution), Russo, Rea and Sciutti, Italian Institute of Technology (Sciutti’s CONTACT group). arXiv 2504.01588, April 2025. The PDF doesn’t name a venue, so treat it as a preprint unless you confirm otherwise. Code is on IIT’s GitLab.

### What it is

An LLM architecture for an iCub humanoid acting as an autonomous yoga trainer. It does two things:

- Balances social conversation with driving a training session forward.
- Builds a long-term memory of users as a knowledge graph.

### Architecture

- **Interaction Manager.** A LangChain-style agent (GPT-3.5 Turbo in the user study). Each interaction stage is a callable tool: chatting, user profiling, planning a session, showing a pose, asking for feedback, retrieving a name, goodbye. Calling a tool swaps in a stage-specific system prompt.
- **Context the agent sees.** Only the last 10 messages, plus a **working memory** block holding user basics and the training state (poses pending or completed). The training state is what lets it resume after a social digression.
- **Perception.** YOLOv8 face recognition, YOLOv8 pose estimation (17 joints), and Whisper speech-to-text.
- **Action.** Gaze control, LED facial expressions, pose demonstration, and a child-like synthetic voice.
- **Trainer module.** Compares the user’s joint angles to target poses with adjustable tolerance. It corrects by demonstrating the pose again and giving verbal cues.
- **Long-term memory.** After each session the system writes the raw chat, raw joint data, an LLM-generated structured summary, and performance metadata. GPT-4o Mini turns the summary into a Neo4j knowledge graph linked across users through shared nodes such as sports or poses. Face recognition triggers retrieval of that user’s subgraph.

### Evaluation

1. **Live study.** 10 Italian volunteers, semi-structured interviews, no questionnaires.
    - The agent chose the correct stage 100% of the time.
    - Mean response time was 1.1 s.
    - 4 of 10 sessions had module failures: speech synthesis choked on long sentences twice, an API rate limit hit once, and one face failed to save.
    - Despite ~1 s latency, users read pauses as not being heard and repeated themselves, which overloaded the system.
    - Preferences split by personality. Task-oriented users liked a focused robot. Extroverted users found its redirection back to training rude.
2. **Memory evaluation.** 28 synthetic users, each an LLM given a generated bio and personality, held conversations with the tutor agent. Retrieval quality was scored with Ragas Faithfulness.
    
    |Retrieval method|User-specific questions|Population-wide questions|
    |---|---|---|
    |Plain RAG (vector search)|0.82|0.57|
    |Naive graph (pull the whole subgraph)|0.81|0.49|
    |LLM-written Cypher queries|0.80|0.73|
    
    The graph approach only wins on population-wide, multi-hop questions.

### Weaknesses

- **The 100% stage-selection figure is thin.** n=10, no stated criterion for “correct,” no second rater. Response time is reported without saying what it measures, and users still found it slow.
- **The memory evaluation is circular.** Synthetic users came from the same model family and were scored by an LLM-based metric. Faithfulness measures whether an answer is grounded in what was retrieved, not whether it is true. There are no significance tests, and the question count for the population-wide category isn’t given in the paper.
- **“Long-term” is never tested.** Every user had one session. The authors admit scalability and forgetting are open.
- **No privacy or consent discussion at all**, for a system that stores face embeddings, full transcripts, joint data and personal details. It then links them across users in a graph that clinicians and other stakeholders can browse.
- GPT-3.5 in the live study; the architecture is already dated.

### Relevance to Ari

- **It is the closest architectural precedent: an embodied LLM tutor in an HRI context.** Its stages-as-tools design maps directly onto your ideation / planning / making intents. Its working memory of task state, which lets the robot resume after social talk, is what Ari needs for laser-cutter procedure. Cite it as the agent-architecture lineage. Your novelty isn’t the architecture.
- **Latency plus missing listening cues is your expressive-motion thesis in practice.** A ~1 s delay with no nonverbal signal caused repeated input and breakdown. The authors call for gaze shifts and active-listening cues as future work. This links your SDC entry to your research thread: “I’m paying attention to you” expressed on a low-DoF body is a direct fix for a failure this paper documents. Use it.
- **The chatty-vs-functional split warns about your tutor stance.** Ari redirects by design: it refuses to teach Illustrator, has a quiet timer, and is Socratic. Some users will experience that as rude. You need redirection that reads as respectful, and possibly a style that adapts per user. Reviewers will expect you to have thought about it.
- **On memory, it is your foil.** It shows what persistent identity buys: personalization, recognizing returning users, patterns across users. It also shows that you can build all of that without ever addressing consent. Ari’s eyelid and blind-box default, and your open “separate seeing from remembering” item, are a direct counterposition. Framing Ari against this paper makes your privacy stance a contribution rather than a limitation. It also bears on your open multi-year project bank: a cross-user knowledge graph is that idea, with the privacy problem left unsolved.
- **The physical-correction loop is a precedent for the making stage.** Comparing pose to target and correcting by demonstration is a physical-skill analog to Ari watching a cut setup. It is also a reminder that the correction depends on seeing, which is the same tension as with the last three papers.