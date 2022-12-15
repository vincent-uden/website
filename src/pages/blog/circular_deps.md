---
layout: ../../layouts/BlogLayout.astro
title: GCC and Circular Dependencies
preview: The Gnu Compiler Collection is somewhat famous for it's atrocious and uninformative error messages, especially when using C++ template functions/containers. One missing semicolon ...
date: 12th of july 2020
time: "22:00"
timestamp: 1594584000
---

The Gnu Compiler Collection is somewhat famous for it's atrocious and uninformative error messages, especially when using C++ template functions/containers. One missing semicolon in a small source file can lead to tens of thousands of lines of error messaging. Most people coping with the fact that their compiler of choice might not be 100% perfect in all regards usually counter this by saying that one's IDE should mark the missing semicolon anyways so really it's your fault for letting it through. Blaming an IDE or a user when a compiler can't even live up to one of it's most basic features is frankly quite pathetic.

## Circular Thoughts

In my latest clash with the questionable choice of error reporting from the GCC I was admittely up against a slightly more complicated problem than a missing semicolon. I'd managed to introduce a circular dependency in my C++ project which neither I or the compiler managed to work around through forward declarations. My quest to debug this issue would've been significantly faster if the GCC didn't output error messages which had nothing to do with the problem in question. Cryptic writings of missing symbols before class definitions was of no assistance to my debugging process.


Fortunately for me, I'd run in to similar problems in a previous project. With some pen and paper I managed to understand that the compilation error had nothing to do with missing symbols or statements at all. As previously mentioned I'd managed to introduce a circular dependency. Was that dumb of me to do? Of course. Could I have noticed this earlier by using a bloated IDE with startup time of half an hour? Probably, highly likely even.

## Why? Why? WHY?

Even though the mistake of course was on my side I can't even begin to understand why the GCC doesn't have a warning built in for circular dependencies. Optional warnings for two way inclusions would be a nifty feature too since that can be a problem for C/C++ programs. The GCC is one of the crown jewels of the GNU Project. It's a crown jewel of the whole free software movement as a whole. Without it there would be no linux kernel after all. Any explanation as of why the compiler can't or won't warn about this would be greatly appreciated. So far I have found none that are even close to satisfactory.


There is (as always) a great chance that I'm completely wrong about this. Maybe detection of circular dependencies is a really complex, expensive and nuanced problem. Perhaps there is some obscure, god forsaken compiler flag that'd allow the pre-processor to warn a developer about this problem. If this would be the case, I of course retract the previous words in this blog post. But until I'm made aware of such information, my point stands.

