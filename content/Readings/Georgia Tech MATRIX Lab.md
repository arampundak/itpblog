---
date: 2026-10-26
tags:
  - reading
  - hri
draft: false
author:
url: https://matrixlab.gatech.edu/publications/
---
The MATRIX Lab is Amit Jariwala’s group at Georgia Tech, which runs research on the Invention Studio makerspace. The page lists 11 publications. I’ve only read the abstracts on that page, not the full papers, so treat the details below at that level.

Context first: almost all of these appeared at ISAM/IJAMM (the academic makerspaces symposium and journal) or ASEE. Those are practitioner and engineering-education venues, not HCI or HRI. They are useful as evidence from the field, but their evidence bar is lower than an HRI reviewer will expect, so don’t cite them as if they carry that weight.

### Directly relevant

**1. Feasibility and Utility of an AI Assistant for the Georgia Tech Invention Studio** (Upadhyay & Jariwala, ISAM 2025)

- **What they built:** “AI PI,” a web-based conversational AI assistant leveraging Retrieval-Augmented Generation (RAG) to answer user queries based on curated Invention Studio documents. Its stated purpose is to supplement the human Prototyping Instructors. [gatech](https://matrixlab.gatech.edu/publications/)
- **Stack:** Google’s Gemma 3 model via OpenRouter for generation and Pinecone for vector storage. [gatech](https://matrixlab.gatech.edu/publications/)
- **Features:** citation of information sources, a user feedback mechanism, and custom-designed responses to communicate uncertainty and defer to human PIs when appropriate. [gatech](https://matrixlab.gatech.edu/publications/)
- **Evaluation:** IRB-approved. It looks at anonymized interactions, user feedback, how queries break down by category, and expert review, with particular attention to safety accuracy. The abstract reports only “promising” early findings and gives no numbers.

This is your closest living precedent, closer than Smart Makerspace. It is a grounded LLM for a university shop, with deferral to staff. Several of your choices are not novel against it: grounding in curated shop documents, handing off to humans, and the safety focus. A reviewer who knows it will ask what Ari adds. The defensible differences are:

- **Embodiment and placement:** Ari sits at the machine; AI PI is a web page.
- **Role:** Ari is a Socratic tutor on design decisions; AI PI answers questions about information and procedure.
- **Privacy:** your eyelid and blind-box design.

Those are real differences, but you have to state them explicitly. Get the full paper. You need its results and its query categories, because “what do people actually ask a shop AI” is evidence you currently don’t have.

**2. Design and Prototyping Consultancy Course to Support Entrepreneurship and Innovation in Makerspaces** (Gupta, Sims, Jariwala & Karim, IJAMM 2024)

- Its premise is that shop staff are trained in operating equipment and ensuring safety, they often lack the necessary expertise to guide users through the design and prototyping processes effectively. [gatech](https://matrixlab.gatech.edu/publications/)
- Their fix was a 4-week course for student staff covering design thinking, prototyping, and consultation skills.

This is good support for your framing. It is independent evidence that the gap is design judgment, not procedure, which is exactly the role you gave Ari. It is a work-in-progress education paper, so it supports the problem statement, not a solution.

### Moderately relevant

- **Artificial Intelligence in Makerspaces – Repurposing Industry Applications to Serve Makerspace Needs** (DiCarlo, Greenfield & Jariwala, IJAMM 2022). A position paper on AI, IoT and ML for makerspace safety and access. It emphasizes that makerspaces have more diverse, more novice users than industry. Useful only as a framing citation.
- **IoT in Makerspaces – Review of Usage and Future Potential** (Banerjee et al., IJAMM 2020). Surveys systems such as SUMS, FabMan and 3DPrinterOS, and lists the Autodesk Smart Workbench among the commercial offerings, so it ties back to the Knibbe paper. It names user trust and cybersecurity as challenges, which is relevant to your consent design. [gatech](https://matrixlab.gatech.edu/publications/)
- **Development and Impact of a Data Collection System for Academic Makerspaces** (Imam et al., IJAMM 2020), plus the companion smartphone app paper (Rupert & Jariwala, IJAMM 2020). SUMS handles tool queues and enforces safety policy. This is relevant to your open multi-party question: there is existing infrastructure for queues, so if Ari handles the queue, compare it against SUMS.