---
layout: ../../layouts/BlogLayout.astro
title: PCB Management (DRAFT)
preview: ...
date: July 2025
time: "00:00"
timestamp: 1750854203

// TODO: Take a picture of the physical grid and insert below
---

Since graduating from university I've gotten more and more into embedded software development. This has even spilled over into designing PCBs *(printed circuit boards)* for my embedded devices to sit on.

Initially I had assumed that the leap from software to hardware design would be insurmountable without any formal education but it turned out to be quite enjoyable. It turned out that the problem I'd be facing wasn't a technical one, but of an organisational nature.

## Designing circuits

Designing circuits turned out to be a lot like software development. Or at least I managed to force it to become similar to how I develop software.

Modular parts or blocks, which I could share between circuits needing similar functionality sounds a lot like *DRY*. Avoiding complexity by only including the absolute bare minimum that I could get away with sure sounds like *KISS*. And so I charged forwards into the world of power electronics, sensors and Bluetooth communication, armed to the teeth with sort-of applicable design principles.

I ordered PCBs, parts and went to town with soldering paste, stencils and a soldering iron to realise my new creations. And that is where the problems began.

## Parts and components
Each circuit could be composed of up to ~40 different parts that needed to be mounted on the board. And since I had been so clever as to share designs between boards I could even use parts from the stocks of one circuit board to build another design if it was missing any parts.

One day, when I was looking to build `Battery manager V1.2` and was scrambling through box after box of components I realised that I couldn't find the appropriate step-down converters needed. In fact, I didn't even know if I had any left. And for that matter, did I have any 10 kΩ resistors left?

The overlapping component usage had left me with no actual idea of my inventory. There was no way of knowing how many of each circuit design that I could actually build and ordering new parts was just as big of a nightmare since couldn't get a grip on what parts I'd actually need.

The organisational task of keeping a stock for my designs was a new problem I hadn't considered. If I want to build a version of my latest pdf-reader on a new computer, I just compile it. There's no need to check for complex, interwoven dependencies between it and other software I'd written before constructing the design, in software you can just do it.

## The solution
Having the hammer of software development at my disposal, organising electrical components was looking a lot like a nail. The resulting program consists of parts, a panel and a grid.

![A screenshot of the program](/img/pcb_client.png)

As the mouse hovers over each electrical part, it's position in the grid is highlighted on the right. *Why a grid? What does it represent?* A physical, 3D-printed grid storage system of course.

![A picture of the physical grid](/img/pcb_client.png) 

