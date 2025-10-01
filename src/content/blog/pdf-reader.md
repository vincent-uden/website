---
layout: ../../layouts/BlogLayout.astro
title: I hate acrobat
preview: ...
date: October 2025
time: "00:00"
timestamp: 1759305508
---

## Why?

Adobe Acrobat is intrusive, slow and non-customizable.

FoxIt is slow and non-customizable.

Zathura is amazing with the Mupdf backend. However it only works on X11/Xorg and thus Linux. I use Wayland and Windows.

## Zathura-2?

If I could just reach parity with the features from Zathura it would be the perfect program for me. And perhaps i could even create a more approachable program for others as well. 

Zathura is keyboard focused, featuring a modal navigation system and command line, just like in Vim. I love that, but it's not for everyone, and it's not even always for me depending on what I'm doing. Mouse controls are great, when they are optional.

Hot reloading PDFs when they change on disk is a killer feature as well. But it can be pushed even further. What if you switch to another file in your editor? Wouldn't it be nice if the pdf reader could switch with the editor, automatically?

A config for customizing key bindings is a no brainer. It also comes with a dark-mode, not just for the interface but also for the pdf itself.

Last but not least, it would be nice if the pdf reader could show PDFs.

If I could manage to implement this rather small set of features, where the last feature is the most difficult by far. Then I could go on reading PDFs as a happier man than before.

## Pdf rasterisation

I read somewhere once that problems should always be tackled in the order from most- to least- difficult if you're serious about solving them. Makes enough sense to me. Climb the mountain first and coast downhill afterwards, ticking off features with increasing speed and decreasing effort as you grow tired of the project.

Parsing the gigantic pdf specification and transforming decades worth of revisions into a bunch of pixels is certainly that most difficult task.

Fortunately, this herculean task has already been tackled by others. Once again I took inspiration from Zathura. It has a backend for rendering which uses [Mupdf](https://mupdf.com/) for rasterisation and other pdf-parsing uses. Since I already enjoyed the performance and look of pdfs in Zathura, I might as well base my solution on the same set of giant shoulders.

The [official documentation](https://mupdf.readthedocs.io/en/latest/reference/c/index.html) is pretty good, if you already understand how Mupdf works and just needs to refresh your memory on the API. But when you are just starting to dip your toes into this massive library, some additional structure is greatly appreciated. For this purpose, I read parts of [Mupdf Explored](https://casper.mupdf.com/docs/mupdf_explored.pdf), an online-book by [Robin Watts](https://pdfa.org/people/robin-watts/).

If rasterising pdfs is a passion of yours, I highly recommend the book. It contains everything from the simples of PDF-to-PNG examples, to cached workflows that achieve hundreds of renders per second.

## User interface

Writing a cross-platform native GUI has always seemed way harder than it has any right to be. On one hand you have the giants, Qt and GTK which expose enormous API surfaces and might require several books of their own to understand properly. Not mention *interesting* licensing in the case of Qt.

One the other hand you have the Raylib/OpenGL/etc. style of creating user interfaces. Nothing is included, if it is, it isn't customizable at all.
