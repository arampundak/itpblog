Alignment with Neural Networks

**Read/Watch:**

3Blue1Brown - But what is a neural network? https://www.youtube.com/watch?v=aircAruvnKk

[[The Intuition Behind How Large Language Models Work]]

[[An opinionated guide to which AI to use to do stuff]]

---
**Writing:**

> ask: This week we are looking at this new way of encoding our thought and capturing the world using neural networks. Can you explain AI to your parents? What analogies can you make to stuff they already know about. How is so new alien intelligence that it defies leveraging any of existing intuitions?
> Last week we tried to take a look at your internal thinking. and now we want to know how well neural networks, originally inspired by our neural anatomy, actually work (align) as media for capturing and depicting our internal life? What do they offer as a medium for representing the external world.
> Usually the word alignment in the context of AI is about safety, preserving humanity against being destroyed by well meaning people accidently setting AIs in a bad direction (eg prioritizing [paper clips](https://en.wikipedia.org/wiki/Instrumental_convergence)), bad actors using AI as a weapon for disinformation, hacking or worse, AIs. Or will sufficiently intelligent AIs have their own priorities that could diverge from ours? What do you think of the transhumanist perspective that might say that we should not begrudge our silicon based evolutionary descendants a go, we have had our day..

>"Learn to recognize..."

We always seek what is recognizable, what we know. 
Even before understanding Neural Networks - my thought of the subject merges to how my brain works. Seeing the diagram of nodes representing one pixel of an image, drawing lines to more nodes, then drawing lines to more nodes to get to the final solution or answer - correspond with what I imagine my own mind to be workin like. In these diagrams - are there any new ideas being created? or is everything a consequence of what was already there? 

>from Meno's paradox, from Plato's _Meno_ (80d-e). 
>Meno objects to Socrates that inquiry is impossible: you can't search for what you don't know, because you wouldn't recognize it if you found it — and you can't search for what you already know, because there's nothing to search for. Socrates' answer (81a-86b) is the theory of recollection (anamnesis): the slave-boy geometry demonstration, where Socrates draws out a proof from an uneducated slave purely by questioning, is meant to show that "learning" is really recollecting something already latent in the mind, not acquiring something wholly new. That maps onto your NN point with unsettling precision — a network doesn't produce an answer from nothing, it retrieves/recombines what's already encoded in its trained weights, and calls that "understanding."

I understand that NN diagrams represent our wet soggy electrified brain, sliced in spherical shape. Then laid flat like a map that was rolled in a tube. Inside the brain neurons fire in 3d space to create connection - to draw lines between nodes.
The most interesting part is understanding what the lines drawn create in the AI brain. What is it doing because its inspected to do (knowing the next word), and what the AI chooses to do. 
What is choosing? What is a choice?

in NN there are weights and biases

We talk about "encoding our thought" and "capturing the world using neural networks". This made me think of how I save information in my head, how do I live with referencing, am I storing my information-mind in drawers or puddles? 

As a visual person, neural networks and how they are shown made me want to have a neural network for all my references. Combined with the ask to think of a new social media platform and some research I came up with an idea:

A private archive of the posts I save from LinkedIn and X - robotics, AI, markets - stored as plain markdown files in a local vault, so that an AI can read the whole corpus and do analysis across it. Not a bookmark manager. The point isn't finding a post again; it's asking what the collection as a whole says.

**The pipeline**
Capture stays as it is: LinkedIn's Save button and X bookmarks, one tap, no new habit. The existing backlog gets drained once with a Chrome extension that exports saved posts to markdown locally. New items are clipped weekly, either with Obsidian's Web Clipper or by pulling them through a browser session where I can read the logged-in page directly.

Then a weekly pass with Claude Code inside the vault: each post becomes one `.md` file with frontmatter — author, source, URL, date, topics from a fixed vocabulary, summary, and one line from me on why I saved it. Processed items get unsaved on the platform, so the saved list stays a genuine queue. An `index.md` holds one line per post so the corpus stays searchable and cheap to reason over as it grows; monthly rollups compress it further.

Retrieval runs in three tiers: grep for exact words, the index when I remember the idea but not the wording, full file reads only for what those point at.

**The constraint that shapes everything**
LinkedIn blocks automated access, so content can't be fetched from a link - it has to come through a logged-in browser or an export. And any tool without an API, however good, puts the corpus somewhere I can't read. That's why this lives in files.

---
**Making:**

>Please put your github link for this class in your profile for this site which you can reach using the "My Dashboard" link in the upper right.
>Try to get a feel for what ML can do. For this week you might try just learn to use the fetch command with the APIs to [explore various models in a service like Replicate](https://replicate.com/explore). The baby might want to get a little organized and be able to organize its thoughts by painting different parts of the screen with different kinds of thoughts. Does speaking help you capture you train of thought better. Does AI come up with the same associations as you? Please commit your code to a github repository and paste the link in your dashboard on this site.

I read the Alignment with Neural Networks page, and wrote notes while discussing some ideas with various agents.
==Proxy== is "a very simple intermediary program running on a server that simply relays our request on to Replicate". In our case ITP "will relay everything you say to them and return everything they say back to you. This will also save your from having, **AND PAYING FOR**, a replicate account."
We use node.js (javascript outside the browser) "To protect web services from being abused, you will get a CORS exception in a web browser if you try to contact a server that did not also serve the html and js making the request."

>DanO: **Technically**, the core skill being taught is: use `fetch` (POST, with `async`/`await`) to hit the ITP/IMA Replicate proxy (`https://itp-ima-replicate-proxy.web.app/api/create_n_get`) instead of calling Replicate directly — the proxy exists to dodge CORS and keep the API key off the client. You pick a model from Replicate's explore page, check what params it wants, package it as `{ model, input: {...} }`, and unpack whatever comes back in `prediction.output`.

>DanO bot: Technically, the goal of this specific assignment is to move **"off the island"** of your local computer and learn the "plumbing" of the internet—connecting your code to a shared server.

IDEA:
Use ML to track pose of users hand - to manipulate a robotic arm.
The main risk is that Ill miss out on "ax" sharpening for **asynchronous programming** (`async/await`) and handling JSON data from an external source.

>DanO bot: the `fetch` to an API is meant to simulate a conversation between your mind and a "black box" in the cloud. If you stay entirely local, you skip that specific "shared" interaction.

So thats not in our scope...

