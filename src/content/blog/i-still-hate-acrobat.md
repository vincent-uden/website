---
title: I still hate acrobat
preview: Today marks one year since I posted "I hate acrobat"...
date: 15th of October 2026
time: "16:00"
timestamp: 1790704075
---

Today marks one year since I posted [I hate acrobat](https://www.uden.dev/blog/pdf-reader) (on Hacker News changed to *Acrobat is intrusive, slow and non-customizable* by the moderators), the de facto release announcement of my PDF reader. I thought it might be interesting to write an article about how maintenance of [[miro-pdf]] has progressed since then.

## The talk of the town

My feeds have been filled with a lot of discourse surrounding open source maintenance over the last year painting the whole experience in a negative light. Sloppy contributions, ungrateful users demanding changes for free and burnout. All three of these of course accelerated by [*bullshit generators*](https://www.stallman.org/chatgpt.html) as per the great Richard Stallman (or AI/LLMs/agents to the rest of us).

Since I am depending on [[mupdf]] which is licensed under the [[AGPL-3.0]] I haven't had any choice but to toss my hat into the ring of Free software publishing and maintenance, not that I would have wanted it any other way.

I can happily report that my experience doesn't match the negative tone of online discourse at all. In fact it's been fun, rewarding and a great learning experience both in regards to programming and product management. The development has been helped along by 14 contributors, which is 13 more than I had ever expected (excluding the obvious *me* from the list). 

## Beyond me, myself and I

In addition to contributing code, configuration files or documentation, others have also helped me drive the development by submitting issues on [Github](https://github.com/vincent-uden/miro/issues). We'll dive a bit deeper into this and see what problems other people have seen in my software.

The first issue from someone other than me, [#48](https://github.com/vincent-uden/miro/issues/48), was opened on *2025-10-06*. A simple confusion over the project’s name which was cleared up on *2025-10-08*. This is about a week before the release announcement. Perhaps not the most flashy of first issues but I cherish it still as a first sign of someone else noticing my project.

In total the repository has 52 issues from people who are not me: 45 closed and 7 still open (as of *2026-09-26*). That’s about one per week over the year, though reports were concentrated around the blog-post release. I assigned each issue to one primary category based on its main request or problem, so the categories are mutually exclusive. The examples below are issue numbers, not an exhaustive list.

| Primary category                   | Closed |  Open |  Total |
| ---------------------------------- | -----: | ----: | -----: |
| Build, installation & release      |      8 |     1 |      9 |
| Crashes, freezes & resource use    |      7 |     0 |      7 |
| Rendering, layout & text           |      7 |     1 |      8 |
| Input, navigation & view controls  |     13 |     2 |     15 |
| PDF features & workflows           |      2 |     3 |      5 |
| App UI, launch modes & preferences |      4 |     0 |      4 |
| Platform support & integration     |      3 |     0 |      3 |
| Security                           |      1 |     0 |      1 |
| **Total**                          | **45** | **7** | **52** |

Many of the input issues stemmed from me going all in on Vim bindings, forgetting the rest of the computing world. 

Among these issues we've managed 3 merged and release contributions upstream to [[mupdf-rs]] with another on the way (which has been merged but not released). This dependency has stuck out like a sore thumb, mostly in the "build error" way as the only non-Rust dependency, but of course the whole project would be impossible without its valuable contribution.

One highlight along the way was getting keybinding suggestions in `#53` from [Wez Furlong](https://github.com/wez) of [[Wezterm]] fame which left me a little starstruck.

Feature requests in regards to UI have ranged from adding buttons to the menu all the way to PDF annotation editing, which is still left unimplemented. I personally don't work much with actual PDFs. Instead they're primarily an output document I compile [[Typst]] or [[LaTeX]] to. Again, the rest of the world, especially [[Assad-AC]] has reminded me that the PDF is actually a format that can benefit from some editing, not just reading.

As one might expect (due to the Rusty source code) we have not had a lot of issues regarding memory safety. That isn't to say we haven't had any. We have had one memory leak due to incorrect key construction for a `HashMap`, which led to render buffers never being dropped. I should stress that this was a shortcoming on my part despite the borrow checker's best efforts. 

## Another year of Miro

So, what's on the road map? Is the software "done"? Of course not. While I don't want miro to ever be a fully fledged PDF editor as I don't want to contribute to the zoo of malformed PDFs in the world, I do think annotating the files is a valuable use case.

The next release, 0.13, whenever it happens, will be *the editing release* where I finally give in to demands and implement some capabilities beyond just reading. Most important is the ability to create new annotations. That means underlines, strike-through, highlighting, pen drawings, comments and replies among other kinds of annotations.

In addition to annotations I'll also add support for cropping, scaling and removing pages as I feel like all of these fit under the theme of reviewing PDFs, a small, well scoped addition to just viewing the documents.

As for non-technical goals, it would be fun to find a first sponsor for the project. Not for the actual income but as a small proof of doing useful work in the world. 

Last but not least, I also foresee a name change in the coming year as there are several other products named "miro", even PDF-related products. I initially wanted a verb for "viewing" PDFs so calling it from the command line would read as`view my-document-pdf` combined with the fact that it was a short name. Having to expand the name to miro-pdf for `crates.io` lessened the short name leaving me with a non-unique, semi-long, non-verb. I'm not sure what I'll pick, all the words for reading or viewing in my native tongue Swedish sound stupid or can't be typed on a non-Swedish layout (such as *läs* which could've been a fun name).

This article has been mostly social in nature, not focusing on reviewing the tech choices. If there's any interest in an evaluation of the stack, from PDF rasterisation to the UI layer, I'd be happy to write another article.

Thank you for your time. I hope to see you in the issues on Github soon or even better, in the pull requests. 

