---
layout: ../../layouts/BlogLayout.astro
title: Rust for Numpy Enthusiasts
preview: Programming numerical simulations is very fun. Waiting for numerical simulations to run is the opposite of fun. The aim of this article is to present an alternative reality where you write more simulations and iterate on solutions faster...
date: 27th of september 2023
time: "21:55"
timestamp: 1695844987
---

Programming numerical simulations is very fun. Waiting for numerical simulations to run is the opposite of fun. The aim of this article is to present an alternative reality where you write more simulations and iterate on solutions faster while spending less time running each simulation.

I'll assume you already know Python. Experience with [numpy](https://numpy.org/) might give you some extra context, but the goal is to advocate against it's use  which means it isn't required. Finally I'll assume you know very little to nothing about [Rust](https://www.rust-lang.org/).

## What's Wrong With Numpy?
Time is money and Python requires a lot of time. Python is interpreted, garbage collected and dynamically typed. The perfect environment if you want the computer to be able to optimise **nothing** for you.

### The Runtime
I will demonstrate with an example though. Try the following code in your local interpreter:
```python
x = 0
for y in range(100_000_000):
	x += 1
```
On my machine this runs in ~4.5 seconds. The equivalent loop written in C (compiled with `-O0`) runs in less than 300 ms.

The runtime performance is of great importance. But for the purposes of numerical simulations with the aim of solving problems it isn't always of primary focus. "I can just leave my computer running over night to calculate". This point of view is incomplete and perhaps even naive. Most of the time isn't typically spent running simulations. The majority of a project lies in writing the code itself; squashing bugs, adjusting parameters, etc. A (much) faster program supercharges the iterative process of solving a problem. The faster your program is, the faster you can realise how you messed up the implementation and in turn improve it.

Python and therefore also numpy come with the heavy cost of dynamic typing. Again, the runtime performance cost of dynamic types is of importance but the bigger problem isn't noticed immediately.

### The Environment
Have you ever come back to a Python problem after a month away? Piecing together what the program does can be incredibly difficult and making changes can feel like an impossibility. This is because Python code says very little about what it's actually doing. Languages with static typing enjoys a sort of guaranteed documentation in their type definitions which reduces the complexity of analysing a code base.

When returning to this old project of your's, you might also notice something while attempting to run the program (often to figure out what the hell it's doing since you can't read the code to find out) you'll be faced with this familiar process:
```sh
> python main.py
Import error: No module named numpy
> pip install numpy
> python main.py
Import error: No module named pandas
> pip install pandas
> python main.py
Import error: No module named tqdm
...
```
and so on. Reproducing the actual environment needed to run the program is a tedious, boring process. A  `requirements.txt` can help, but it often doesn't address the whole issue. Not to mention conflicting libraries like how for the longest time it was super difficult to install `pytorch` and `tensorflow` in the same environment.

Solutions have been attempted by the community to surprisingly large adoption rates. Anaconda/Miniconda attempts to remedy the struggles of acquiring a reproducible runtime but they are nothing more than massive band aids over a fundamentally broken system.

## What's Right With Rust?
Unlike Python, Rust isn't bogged down by it's inherent nature. No garbage collection, no interpreter, no dynamic typing. The designers of Python weren't bad programmers, they just made design choices which would never allow them to create a performant language (which wasn't their goal).

### Speed
Rust on the other hand was created with the explicit intent of being fast. This brings a bunch of advantages for you as a developer. There's no need to vectorise every single heavy calculation since there isn't the same giant performance chasm between a loop and a vector operation which exists for numpy.

You can also iterate on your solutions faster since the program runs in less time. This means less waiting around, smaller interruptions, more flow state and better programs. Rust itself won't make you much of a better programmer, but the fact that you can improve on your program more times will increase the quality of the resulting program.

### Maintainability
Static typing is great for performance, but it's even better at organising your code. Knowing the "shape" for the inputs and outputs of functions **and** having those contracts guaranteed to be upheld at compile time reduces unnecessary mental bookkeeping.

After using [cargo](https://doc.rust-lang.org/book/ch01-03-hello-cargo.html) once you'll never want to go back to Python. Build environments are consistent, non-conflicting across projects and always work even if you're coming back to a project several weeks, months or years later.

## How to Rust
Rust has a reputation for being difficult. Thankfully that reputation comes from asynchronous, highly optimised programs with large amounts of inter-thread communication. For our purposes Rust is much, much easier.

### Programming Environment
Rust is easy to set up, download [rustup](https://rustup.rs/) and follow their suggested installation process for your operating system. Now you've got a compiler, a formatter, a package manager, a language server, a linter and much more.

These are the standard tools that every single Rust developer uses. The ecosystem is homogenous, often converging on singular or few "best" solutions instead of widely using several incompatible libraries and tools.

I'd also suggest installing a Rust extension for your preferred text editor of choice to take advantage of `rust-analyzer` the very competent language server included in rustup.

While programming you will make a lot of mistakes. Having a companion to keep track of those mistakes and presenting them in a consistent format is an invaluable tool. That's where [bacon](https://github.com/Canop/bacon) comes in. Install it after rustup using
```sh
cargo install bacon
```
and run the binary in a Rust project (usually in a separate terminal on the side) to get a list of warnings and errors for your project like below:

![Bacon in use](/img/bacon.png)

Lastly, make sure to use git to properly sync and version your software project to avoid losing your work and to be able to check on previous versions of your problem solutions. If you're not familiar with git I'd suggest checking out my [blog post](/blog/git-gud) on just that.

### Syntax Comparison
Lets take a look at a small example of the same function implemented on the same data in Python and Rust.

*One way to sum over rows in Python.*
```python
matrix = [[1, 2, 3], [4, 5, 6]]
def sum_of_rows(matrix):
	averages = [0 for i range(len(matrix))]
	for i, row in enumerate(matrix):
		for x in row:
			averages[i] += x
	return averages
```

*The same function implemented in Rust.*
```rust
let matrix = vec![vec![1, 2, 3], vec![4, 5, 6]];
fn sum_of_rows(matrix: Vec<Vec<i32>>) -> Vec<i32> {
	let mut averages = Vec::new();
	averages.resize(3, 0);
	for (i, row) in matrix.iter().enumerate() {
		for x in row {
			averages[i] += x;
		}
	}
	return averages;
}
```

There is probably a lot you can focus on when comparing the two, but what I want to emphasise is *explicitness*. The Rust code says so much more about what the function expects, what it returns and how it works.

First off, we have to statically type the rust function. The compiler must know the data type of `matrix`. This might seem cumbersome but it gives us certainty every single time we use `sum_of_rows` in the future. Our program will not compile unless we supply the function with an argument of the correct type. In Python we might not notice this error until an hour into a simulation, before we've even saved any results to disk. This is the most extreme (and therefore best) case of my favourite concept when solving problems: [Failing Fast](https://en.wikipedia.org/wiki/Fail-fast).

Another aspect where explicit code shines is for declaring *scope*. Python implicitly defines the program scope using indentation which is also used for whitespace. Rust, on the other hand, defines scope exclusively using curly braces, which are solely employed for that singular purpose. *This comes with the added benefit of not having to fiddle with indentation since the Rust formatter can deterministically generate indentation for you. No more shifting individual lines until it looks good. Simply run `cargo format` and stop caring.*

### Compiling Release Builds
Usually you'd just run `cargo build` to compile your program or `cargo run` to compile it and run it. If we're going to replace our use of numpy we do want to squeeze out ever last bit of performance we can from the code we write.

Make sure to compile (or run) with `cargo build --release` to produce an optimised binary without unnecessary debug information. The performance difference in Rust can actually be surprisingly vast between debug and release builds, remember to compile to release for your long running simulations.

### Rayon
Finally I want to illustrate just how easy it is to get better performance for free while using Rust. I can add the library [Rayon](https://github.com/rayon-rs/rayon) to a cargo project using `cargo add rayon` and including it into my file using
```Rust
use rayon::prelude::*;
```

Looking back at the `sum_over_rows` function from before, we need to change one tiny detail to make use of Rayon. On the line declaring the outer `for`-loop we change `iter()` to `par_iter()` producing:

```rust
let matrix = vec![vec![1, 2, 3], vec![4, 5, 6]];
fn sum_of_rows(matrix: Vec<Vec<i32>>) -> Vec<i32> {
	let mut averages = Vec::new();
	averages.resize(3, 0);
	for (i, row) in matrix.par_iter().enumerate() {
		for x in row {
			averages[i] += x;
		}
	}
	return averages;
}
```

Now the loop is run on **all** of your CPUs threads at once, speeding up by a factor of how many threads you have. It's that easy, practically free, to take advantage of multi-threading where you need it.

## Learning Rust
To learn Rust there are two resources I strongly recommend taking a look at. Up first is [The Rust Programming Language](https://doc.rust-lang.org/book/), the official (digital) book about learning Rust. It is very well written and explains everything you need to know and more.

After making your way through the basics of Rust in our first book I then strongly suggest you take a look at [Rust by Example](https://doc.rust-lang.org/rust-by-example/), a collection of common patterns used during development, all presented as executable examples.

## Closing Thoughts
Do yourself a favour and expand your horizons. Writing numerical simulations, statistical calculations and scientific computations doesn't have to feel like it does when you use numpy. Learn a powerful language with no need to hand over the serious calculations to a library every single time.

Rust changes the way you think about constructing solutions using software. Even if you end up sticking with numpy and Python in the long run, the lessons learned in Rust will make those programs faster, more maintainable and nicer to work with. If you're on the fence or just interested in knowing more before starting out I'll leave you with the excellent Youtube channel [No Boilerplate](https://www.youtube.com/@NoBoilerplate/videos) for profound insights on software development and all things Rust.
