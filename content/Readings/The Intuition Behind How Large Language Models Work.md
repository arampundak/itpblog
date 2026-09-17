#reading 

by Mark Riedl
Aug 6, 2025
from [[SM - 2nd class - Notes]]
https://mark-riedl.medium.com/the-intuition-behind-how-large-language-models-work-166cf2fb278a

---
Loved it!
A very simplified explanation of LLMs

>I’m not saying that a Large Language Model does sentence diagramming. But that intuition will sort of work. The LLM is looking at all pairs of words and assessing if they are relevant to each other or not. And if they are relevant to the missing next word, then they contribute more heavily to the next word guess.

>When it comes to prompts, the more the better. The more clues you give the LLM, the better it performs.

As much as this is scary its also compelling. Theres something in me wanting to have an ever empathic entity near me.
>You might want to hear about yourself, and it will guess words that make you feel good about yourself, even if you are self-deceptive or having a mental breakdown or getting swept up in conspiracy theories in the news.

>There are basically two transformations that occur over and over again:
>1. _Embedding_
>2. _Attention_

>You can think of this as a completely made up word that just means “a cat that left”. So now with my new completely made up word, I can distinguish between a cat and a cat in the process of leaving something.

>Close your eyes, and imagine a cat just sitting there. Close your eyes again and imagine a cat in the process of leaving. You have concepts for these two things in your mind, you just tend to use the same words, or combine words to express them as language. 
>That is what the **Transformer** is doing: it is _transforming_ collections of words into more abstract concepts.

>A prompt is transformed into abstract words that uniquely provide clues about the best word to come next. The clues get converted into scores. The best scoring word gets selected.


