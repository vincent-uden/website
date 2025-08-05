---
layout: ../../layouts/BlogLayout.astro
title: Haskell's Fatal Flaw
preview: There are over 25 million software developers all over the world right now. Every single one of them has their own preferences about what they want in a programming language. Not too surprisingly ...
date: 24th of july 2020
time: "23:00"
timestamp: 1595624400
---

There are over 25 million software developers all over the world right now. Every single one of them has their own preferences about what they want in a programming language. Not too surprisingly, [a lot of them use C, Java, Python and C++](https://www.tiobe.com/tiobe-index/). What these languages have in common is their atrocious tooling. Using libraries in C/C++ requires each package to bundle all of their dependencies, or the user has to pray that their distro's package manager has what they need. Let's not even speak of Java, it's handling of packages can speak for itself. Python's PIP is a step above the rest of these, unfortunately that's just barely above worthless. Managing several projects with different versions of the same packages requires the clunky use of virutal environments or third party tools like Anaconda. None of these are easy to set up, easy to use or easy to understand.

## Tooling, The King Maker?

What one could conclude from this is that tooling actually doesn't matter. Developers will work their way through anything to use their favourite language. I'd argue against that fact since JavaScript prominence is to a large part dependent on the (regrettable) success of NPM. NPM is easy to set up, easy to use and easy to understand. Want to set up a new project? Easy. Want to run someone else's project with widely differing dependencies? Easy. Project specific packages? Easy. I'd be willing to bet a lot of money that JavaScript wouldn't be where it is today if not for the Node Package Manager.

Finally we've arrived at the point of this post. JavaScripts tooling is great, JavaScript has succeeded. Rust's tooling is great in many similar ways, Rust is most certainly on the rise if not already successful. But what about Haskell?

The Glasgow Haskell Compiler's interpreter mode is by far the best interactive programming tool and debugger of any language ever. Tab-completion, instant source code reloading, fantastic type information and lots more. [Hoogle](https://hoogle.haskell.org/) is the best standard library documentation I've ever seen. The only one that can even pretend to stand a chance is the Rust Docs, but the multitude of Hoogle's nifty features still puts it miles ahead of it's oxidicing competition. Not to mention the stellar testing library QuickCheck which has set the standard for all other testing solutions to try to live up to.

## Just Sandbox It, Right?

With all this said, both Rust and JavaScript sit comfortably in the top 20 most used programming languages. Haskell is all the way down at 40 under D, COBOL, Delphi. How can this be? As always it's a multitude of reasons that together decide a language's popularity. But the biggest reason for me personally is the tooling. Even though it's fantastic in all the ways I described, it's slow as hell. Not only is everything so slow, the disk space usage is through the roof. Each project requires a separate installation of the _entire_ compiler. The GHC isn't a small piece of software either. It's about a 300Mb installation for every single project on your system. Of course this data has to be downloaded every single time. Good luck if you happen to catch a wind of inspiration while you're without internet, or on a mobile connection.

This is the constant itch that prevents me from using Haskell more often. Starting a new project in Haskell is a chore, it's frustrating and it's painfully cumbersome. It's a shame. A wonderful language with ingenious tooling, all ruined by a clunky package manager.
