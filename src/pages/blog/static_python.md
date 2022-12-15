---
layout: ../../layouts/BlogLayout.astro
title: Statically Typed Python
preview: "Python is pretty damn good, it’s a great language even. Development is, dare I even say it, blazingly fast and the ecosystem is gigantic, perhaps unrivaled. What’s not to like?"
date: 15th of december 2022
time: "12:30"
timestamp: 1670137200
---

Python is pretty damn good, it's a great language even. Development is, dare I even say it, _blazingly fast_ and the ecosystem is gigantic, perhaps unrivaled. What's not to like? Dynamic typing.

## Boring Paperwork?

The process of writing code without any type annotations is a breath of fresh air. No incompatible datatypes between different libraries. Not having to figure out exactly what data type is wrapped in another which is wrapped in a third one. I haven't even mentioned having to learn a languages type system for generic data types. It's different for every language on the market, often a pain (see C++ templates) and sometimes not even a feature of the language at all like with GO.

As it turns out, all of this effort is usually worth its while. Information about data types is an invaluable shorthand when reading documentation. In most cases, seeing the type signature of a function is more than enough to figure out exactly what it's doing and how to use it.

This is not only useful for the confused developer, but it also greatly empowers any static code analysis tool, allowing for greater insight before even running the program. This results in better code completion, code formatters, suggestions and hints.

## What Is Happening?

I ran in to the opposite of this situation while working on a [network simulation](https://github.com/TobiasWallstrom/FFR120-group-project) for university. It's written in Python, as most of our numerical simulations are, using some neat libraries for visualisation and calculations. At first, the developer experience was no different from all the previous numerical simulations I'd written. But as the project grew in size, especially along the number of files but also just pure lines of code, the experience only worsened.

The first weapon against the disorganisation we reached for was a relatively niche feature called _Type Hints_. It allows a developer to add information about expected data types in a function defenition as follows.

```python
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

Executing mypy on a Python file inspects all given type hints, following function calls, module imports and such to assure type safety throughout a project. If a function has no type hints mypy skips it, unless it's been configured to run in strict-mode. This allows for partial adoption across a code base, progressively building up the type safety over time. Whenever you decide to add type hints to a function definition, mypy will from that point onwards type the functions body ensuring both the type safety of the interface but also the internals of the code.

For smaller codebases, the easiest approach is to run the program included in the pip package.

```shell
python -m mypy main.py
```

This would parse all functions contained main.py and it's dependencies, producing a list of errors and warnings. Thankfully, mypy uses caching which greatly reduces the runtime for successive analyses. Most of the cache is invalidated whenever changes affecting larger parts of the code base are made which of course impact performance. This might seem like a small problem, code changes are often local after all. In reality changes to type signatures can easily impact vast amounts of a program. Changing the signature of something as simple as a utility function implies revalidation of all functions using it which in turn propagates to all their dependencies.

For highly interconnected code bases or other performance demanding purposes, mypy can also run as a daemon. Running as a type checking server in the background allows for keeping the entire cache, or vital parts of it in memory as opposed to storing the cache on the drive between each run. According to the [docs](https://mypy.readthedocs.io/en/stable/mypy_daemon.html#mypy-daemon) the daemon can be more than 10 times faster when compared to the regular cli.

### Problems During Adoption

When I adopted mypy for the previously mentioned simulation, progress was surprisingly fast and smooth. No doubt this was in large part due to the fact that I'd been using type hints in most of the code before knowing about any ways to validate them. Even with that advantage some inconveniences did occur.

#### - Optionals

The first trouble I had was related to null checks on optional parameters. The `Optional` type is equivalent to a union between a given data type and `None`, in Python `Union[x,None]` (compare to `x?` or `x | null` from TypeScript).

Say I wanted to capitalize a name for a greeting, I might write something like the following:

```python
from typing import Optional

def null_checked_capitalize(name: Optional[str]):
    if name == None:
        return ""
    else:
        return name.capitalize()

print("Hello " + null_checked_capitalize("vincent"))
```

This should be fine, in fact it is fine. No error is ever thrown during the runtime of this snippet since we make sure to only call `.capitalize()` whenever name is actally a string. Let's consult mypy for advice:

```shell
$ mypy main.py --pretty
main.py:5: error: Item "None" of "Optional[str]" has no attribute "capitalize"  [union-attr]
            return name.capitalize()
                   ^~~~~~~~~~~~~~~
Found 1 error in 1 file (checked 1 source file)
```

Apparently, we were wrong. This isn't okay. At least according to mypy. Of course mypy can't understand a given piece of source code will run, what results it'll produce. If it somehow managed to do that, it'd be no different from actually running the program. Unless the team at mypy managed to solve te halting problem that is.

Mypy can't understand the behaviour of any general snippet of code. In this particular instance, mypy can't understand the behaviour of the equality operator since it can be overloaded in any way a developer would like. For null checks we can instead use:

```python
from typing import Optional

def null_checked_capitalize(name: Optional[str]):
    if name is None:
        return ""
    else:
        return name.capitalize()

print("Hello " + null_checked_capitalize("vincent"))
```

You propose that I was dumb for assuming the first method would work, null cheks should perhaps be executed through the `is` operator rather than `==`. You'd probably be correct, I even agree which is why I have introduced this as sweeping change throughout the code base.

#### - Unions

The troubles of optionals extend to unions. Type checks on unions of the form

```python
if type(x) == T:
    # ....
```

will not work, as the equality operator _could_ be overloaded for the type `T` leading to incorrect results. Type checks which can't be overloaded take the form

```python
if isinstance(x, T):
    # ....
```

since `isinstance` is a built in function in Python which can't be modified from the outside (although you could probably redefine it if you really wanted to trick mypy).

#### - Improper Use of Data Types

When writing Python code, I find that very little of my attention is focused on data types. This is in stark constrast to my experience using static languages where the ridigity of thought brings (justified) confidence in the code I write.

I suspect this is the exact reason for many small moments of friction experienced while adopting mypy. Most likely, these moments would not be present if I'd used static type checks from the start, as I would've written the code in that frame of mind. If I could've travelled back in time, using mypy from the start would've no doubt resulted in less work.

#### - Libraries

Unfortunately typed Python isn't a prevalent phenomenon yet and it might not ever be. The dynamic typing is a big selling point for many developers after all. Libraries can of course be ignored with a comment and for slighty increased rigour it also possible to create a standalone packages with stubs, providing an external type interface. Both options leave the internals of the library completely up to "chance".

## A Square Peg Through A Round Hole

Attempting to force Python into respecting data types and providing proper interfaces is probably the wrong approach. After all, why not just start off with a language who's fundamental rules I actually like?

First of all, I already do use mostly language which are statically typed. But for projects at univsersity requiring data analysis, numerical calculations or simulations of other kinds, there is no option. There is no TypeScript equivalent of numpy. There is no well established Rust version of matplotlib. The Python ecosystem of packages is superior in it's sheer amount of content plus it's familiarity to engineers and scientists which is highly relevant to my education.

I guess this might just be a desperate attempt at forcing some of my own ideals onto my surroundings, refusing to just accept the choice of tooling which has been made for me. Would I recommend statically typed Python? Absolutely, I think it brings value to any project because of it's incremental adoption. Would I rather use something else? Absolutely.
