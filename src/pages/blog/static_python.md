---
layout: ../../layouts/BlogLayout.astro
title: Statically Typed Python
preview:
date: 4th of december 2022
time: 8:00 am
timestamp: 1670137200
draft: true
---

Python is pretty damn good, it's a great language even. Development is, dare I even say it, *blazingly fast* and the ecosystem is gigantic, perhaps unrivaled. What's not to like? Dynamic typing.

## Boring Paperwork?
The process of writing code without any type annotations is a breath of fresh air. No incompatible datatypes between different libraries. Not having to figure out exactly what data type is wrapped in another which is wrapped in a third one. I haven't even mentioned having to learn a languages type system for generic data types. It's different for every language on the market, often a pain (see C++ templates) and sometimes not even a feature of the language at all like with GO.

As it turns out, all of this effort is usually worth its while. Information about data types is an invaluable shorthand when reading documentation. In most cases, seeing the type signature of a function is more than enough to figure out exactly what it's doing and how to use it.

This is not only useful for the confused developer, but it also greatly empowers any static code analysis tool, allowing for greater insight before even running the program. This results in better code completion, code formatters, suggestions and hints.

## What Is Happening?
I ran in to the opposite of this situation while working on a [network simulation](https://github.com/TobiasWallstrom/FFR120-group-project) for university. It's written in Python, as most of our numerical simulations are, using some neat libraries for visualisation and calculations. At first, the developer experience was no different from all the previous numerical simulations I'd written. But as the project grew in size, especially along the number of files but also just pure lines of code, the experience only worsened.

The first weapon against the disorganisation we reached for was a relatively niche feature called *Type Hints*. It allows a developer to add information about expected data types in a function defenition as follows.
```Python
def add(x, y):
    return x + y

// The function can be given type hints as follows

def add(x: int, y: int) -> int:
    return x + y
```

It's actually older than I first thought, introduced with the release of Python 3.5 back in 2015. At the beginning syntax for unions and optional types was more cumbersome than it is now. Since [PEP 604](https://peps.python.org/pep-0604/) which entered Python at version 3.10 in 2019, a more common (and modern) syntax has been adopted. For more information on the history of type hints, see [this blog post](https://adamj.eu/tech/2022/10/17/python-type-hints-old-and-new-syntaxes/) by [Adam Johnson](https://adamj.eu/).

The problem is, type hints don't do anything. Python is of course interpreted, it doesn't compile or parse any of your code before running it. As such, the developer doesn't get any feedback from Python while writing any code. The more interesting part is that type hints won't do anything for your code during the runtime either. Passing a string to a function annotated to expect an integer produces no error. No exception. No warning. No nothing. Type hints implemented by not being implemented at all is nothing more than glorified comments.

## A Guiding Light
While researching tools to validate my Python codebase for a simulation I did at uni I came across exactly what I'd been looking for. Revealing itself unto me was a static type checker for Python, [mypy](http://mypy-lang.org/).


