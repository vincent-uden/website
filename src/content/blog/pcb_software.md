---
layout: ../../layouts/BlogLayout.astro
title: (DRAFT) PCB client development
preview: ...
date: August 2025
time: "20:20"
timestamp: 1755640433
---

This is a deeper dive into the software I wrote about in a previous [blogpost](/blog/pcb_management.md). To avoid retreading old ground here, I'll skip the information mentioned there.

The goal of this post is to reflect on the development process and explain some of the inner workings of the gui framework.

## Planning

At the start of the project, many variables were unknown. I knew that i wanted to use a physical grid, with a digital counterpart. Other than that, I had nothing but vague ideas and wants. To keep the project from exploding in scope I defined some rules ahead of time:

- The software is intended to have me as the primary *(only?)* user.
- A bin can only **contain one type of parts** *(but a part can be stored in multiple bins if needed)*.
- A bin can only **occupy one spot in the grid**.
- Don't integrate with any external APIs. The software should be as powerful as possible while staying as independent as possible.

Following the scope reduction I defined some wishes that would be nice to have, but not mandatory:

- Accessing the same stock from multiple places such as my laptop, a microcontroller near the physical stock or a dashboard.
- Sharing the stock with a separate user *(but not necessarily the BOMs)*.
- Interchangable servers for Dev/Prod split but also for Local/Remote database patterns.

## Client/Server split

Splitting the application into a server and a client doesn't do much to meet the scope reduction, in fact it probably increases the scope slightly. However I deemed it to be worth the cost since it solves all three of my *nice-to-haves* at once.

The server is completely uninteresting, consisting of a simple Typescript CRUD app with only API routes and no other web interface. It maps HTTP requests to SQL operations and ensures proper authentication, nothing beyond that. As such, I'll refrain from mentioning it again to avoid boring you and myself to death.

## Iteration 1

Since none of the requirements mentioned anything about a graphical interface (while probably implying that it would be needed) I decided to try starting out with a command line interface.

Iterating on a CLI is orders of magnitudes faster than iterating on a full GUI and it had been quite a while since I wrote a proper one.

Writing a good CLI immediately brings Rust to mind for me as the tool of choice, due to the near-magical [clap](https://crates.io/crates/clap) crate. Keeping in mind that I'd probably be implementing a TUI or a GUI later I split the workspace into a `common`and a `cli` crate.

### CLI

Clap and it's accompanying derive macros makes defining a command line interface as simple as defining a struct. In my case it begins with:

```rust
#[derive(Debug, Parser)]
#[command(name = "Pcb Parts Cli")]
#[command(author = "Vincent Udén")]
#[command(about = "Manage your parts inventory")]
struct Cli {
    #[command(subcommand)]
    command: Commands,
}
```

And `Commands` is just an enum with some macros slapped on top:

```rust
#[derive(Debug, Subcommand)]
enum Commands {
    CreateUser {
        email: String,
        password: String,
    },
    Login {
        email: String,
        password: String,
    },
    ListParts {
        #[arg(short, long)]
        name: Option<String>,
        #[arg(short, long)]
        description: Option<String>,
    },
    AddPart {
        name: String,
        description: String,
    },
    // Remaining variants are excluded for the sake of brevity
}
```

This in turn produces a rich CLI with some example commands listed below:

```sh
cli create-user "test@test.com" mypassword
cli login "test@test.com" mypassword
cli list-parts
╭────┬─────────────┬────────────────────────────────────╮
│ id │    name     │            description             │
├────┼─────────────┼────────────────────────────────────┤
│ 1  │ ERF1002     │ BLE Module                         │
├────┼─────────────┼────────────────────────────────────┤
│ 3  │ STPS1H100A  │ DIODE SCHOTTKY 100V 1A SMA         │
├────┼─────────────┼────────────────────────────────────┤
│ 5  │ STLQ020C33R │ Low-Dropout Linear Regulator 3.3 V │
╰────┴─────────────┴────────────────────────────────────╯
```

## GUI

### Iced

## Embedded GUI?


