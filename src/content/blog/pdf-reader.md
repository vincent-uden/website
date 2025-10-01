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

Usually, I am quite partial to the second approach. This time however, I wanted to find something in between the extremes. After rummaging through everything from *Slint* to *Dear Imgui* I finally settled on giving [iced](https://iced.rs/) a shot. As mentioned in [Open source bom management](/blog/pcb_management), I have actually used iced before for smaller programs. Now it was time for something more complex.

Design-wise, there isn't a whole lot to mention. I settled on a pretty standard layout of a main window with a sidebar containing bookmarks and a document outline.

![A screenshot of the pdf reader](../../assets/miro.png)

The interface can of course turn dark. But so can the pdf!

**TODO: Image of dark mode pdf**

## Performance

In the grand scheme of things, I'm very happy with the performance of the reader. Specifically I like that it is fast enough to be *simple*. As mentioned by the likes of [Ryan Fleury](https://www.youtube.com/watch?v=_9_bK_WjuYY) and [Vjekoslav Krajačić](https://www.youtube.com/watch?v=bUOOaXf9qIM) among many other: *speed is a feature in itself*.

Zathura with the mupdf backend is unable to zoom smoothly while maintaining a clear rasterization of the pdf. It zooms optimistically by upscaling the current bitmap which results in a pop-in a fraction of a second later when a crisp rendition replaces the blurred one.

[Miro](https://github.com/vincent-uden/miro) on the other hand leverages a feature called `DisplayList` to cache some data internally in mupdf to achieve several hundred, crisp renders per second if needed.

Before discovering `DisplayList`s, I had a complex and multi threaded system that rendered the PDF in tiles. This was awful to work with. Bugs arose from the asynchronous nature of rendering on a background thread and pixel-perfect rendering was near impossible to get right at tile borders.

Optimizing and probing mupdf for more advanced features led me to a simple solution, over a thousand lines of code shorter than the multi-threaded solution.

The only point where my PDF reader struggles is on pages using embedded svgs (or other pdfs) with several thousand entities contained, such as un-opimized graphs in scientific papers. I would love to resolve this some day.
