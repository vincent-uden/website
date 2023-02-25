---
layout: ../../layouts/BlogLayout.astro
title: Git Gud
preview: Git has a rumor of being complicated and difficult to understand. Some parts of the program can be enigmantic but the vast majority of day-to-day usage is very simple...
date: 25th of february 2023
time: "18:55"
timestamp: 1677348241
---

Git has a rumor of being complicated and difficult to understand. Some parts of the program can be enigmantic but the vast majority of day-to-day usage is very simple. What follows is a guide to how I use git while developing. It is not a complete guide to all features of the version control system and that is not what it's meant to be. There are developers who're magicians in the deep depths of git, I'm not one of those. For the purposes of this guide I am to be pragmatic and cover 99% of what I've ever done using git, mostly since I can't ever seem to remember the more obscure parts myself.

## What is Git?

Git is a version control system. This allows a developer to keep track of the entire history of their code base and how it changes over time. Have you ever accidentaly removed vital information from a file and saved it without thinking? Git allows you to recover a previously saved version of that file.

Git is **not** [GitHub](https://github.com/). GitHub is **not** Git. GitHub is simply a website where you can store projects (repositories) which uses git to keep track of changes. It is perfectly possible to only store a git repository locally on your machine or on another platform like GitLab.

## Why is versioning useful?

What's so special about file history? Even Google Drive offers versioning of files in the cloud.

I think most readers have had to experience the horror of multiple people writing in the same cloud document at once. As you type, someone else above you is typing too. Whenever they add a row, your own text shifts one line down towards the edge of your screen. Suddenly they get the brilliant idea to add an image and the entire document jerks to accomodate the massive change.

Git allows several users to edit the same project without interfering with each other in the process.

## Managing a repo

A repo, short for repoistory is a directory with some extra metadata aiding git to manage the files within. To start a repo, the easiest way is to create a new one at your git hosting service (such as [GitHub](https://github.com/)). Pick a name, fiddle around with the options if you feel like it.

### Cloning the repo

Now there's a repo with your name on it existing somewhere out on the world wide web. In order to access it you need a local copy of the repo on your own machine. Downloading a copy of your repo is called cloning. As an example, I'll clone the source of this website using

```
git clone https://github.com/vincent-uden/website
```

After a cloning there exists one remote repository at your host and one local repository on your machine.

### Commit

Do some work in your local repo, add some files and/or edit them. At some point a significant amount of change has happened. How much is up to you. Maybe it's creating one feature in a code base, writing a chapter in a book or even writing this very blog post.

The important part is that you've done something worth saving. It's time to _commit_ your work to the repo history, saving a snapshot of the repos current state which can be recovered at a later date.

Since you might not want to commit everything you've changed, git requires you to _stage_ each file worth committing. When I wrote this blog post for example, I staged it with

```
git add src/pages/blog/git.md
```

before committing the complete blog post using

```
git commit -m "Write a guide for using git"
```

The `-m` flag allows me to assign a message to the commit, describing what's changed since the last snapshot of the repo.

If I want to stage all changes at once I can use

```
git add -A
```

or even better, if I want to stage all changes at and commit them at the same time, there's also

```
git commit -a -m "Write a guide for using git"
```

### Syncing with remote

We've done some work and saved a snapshot to the version history on our own local repo. A great start. Still the remote host has no idea that you've been working on your local copy of the repo. It's time to send a notice.

We can upload our commits to the remote repo with

```
git push
```

If it's your first time pushing to a remote, it'll probably prompt you for authentication of some sort. Thankfully it's usually very clear what needs to be done to authenticate yourself at whatever git hosting service you use.

There's a second part to syncing as well. _Pulling_ changes from the remote. Updates from other users of your repo aren't instantly propagated to your local machine, since that would screw up whatever you're working on at the moment. Git instead lets you _pull_ changes from the remote whenever you feel like it using

```
git pull
```

Note that you can't push new changes to remote without having all remote changes pulled to your local machine.

### Merging changes

It's possible to end up in a catch 22, where you've got changes you want to upload, but there are other conflicting changes on the remote that you need to pull before you're allow to push.

Lets say you want to update the title of this blog post from "Git Gud" to "Git Good" but I've already changed it to "Learn Git". When you call `git pull`, the program can't figure out how to automatically merge my changes with yours. Instead it leaves both options in your local repo, allowing you to pick and choose how you want to solve it. It could look roughly like this

```
 <<<<<<< HEAD
 # Git Good
 =======
 # Learn Git
 >>>>>>> a2b4ec
```

The section called HEAD contains your local changes, and the other section labeled with my commit id (hash) contains my changes. You'll have to go through the repo, resolving all of these conflicts by simply deleting the conflict markers while you mix and match the incoming versus local changes.

You might decide that your new title is in fact better than mine, writing:

```
# Git Good
```

Or you might want to mix the two solutions, leaving the file looking like:

```
# Learn Git, Git Good
```

The important part is that you remove the conflict markers and leave your file however you want it to look in the future. After resolving the conflicts, _stage_ all changed files, _commit_ the changes and _push_ to remote.

## Cooperating with others

The actions mentioned so far should cover everything you _need_ to get by, working by yourself or perhaps with one collaborator on a project.

There are some problems though. Constantly pulling and pushing to the same shared repository state will cause _a lot_ of merge conflicts. In addition it's difficult to try longer running, experimental features. You can't commit and push anything that isn't functional since you'd screw up the repository for everyone else.

### Branches

It is possible to split a repository into mulitple branches, allowing multiple, parallell version histories to exist at once. When commiting to a branch, your changes are encapsulated in that parallell state until you decide to merge your branch back to the master branch as pictured below.

![Merging branch to master](/img/branches.svg)

In practice the merge is usually done in a slightly different way. It is very likely that the master branch contains lots of conflicting changes. Merging to the master branch would pollute it with a broken state. Therefore it's common to merge the changes _from_ `master` _to_ the branch, resolving all conflicts and then merging _from_ the branch _to_ `master` as below.

![Merging master to branch](/img/branches2.svg)

In practice, I create all my branches on the remote (e.g. on GitHubs website). Creating local branches which you then upload to remote is nothing I've played around with.

### Branch in practice

Let's complete the discussion on branching with an example. We're on the branch `titleChange` and have just committed the "Change title" commit. First, we'll hop over to the master branch and pull the latest changes.

```
git checkout master
git pull
```

Now we'll head back to `titleChange` and merge `master` into the branch.

```
git checkout titleChange
git merge master
```

We'll resolve the merge conflicts in the repo before staging and comitting the changes. Then we can push our changes to the remote version of `titleChange` which is by convention named `origin/titleChange` since the remote is considered the canonical copy.

```
git commit -a -m "Merge master into titleChange"
git push
```

Finally to merge `titleChange` into `master` we'll head to our remote host (GitHub in my case) and open a _pull request_ (sometimes called _merge request_) which will allow us to merge into master. After you or a collaborator approve the pull request, it is safe to delete `origin/titleChange` since all it's history has been recorded in `master`.

### Forks

Usually you can't just go around opening branches on other peoples repositories. But what if you want to implement a change? In that case, there's a sort of "super branch" called a fork.

A fork creates an entire copy of the repo, with all it's branches on your profile which you have complete ownership of. There you can work in peace before submitting a pull request asking for your fork to be merged into the original project. This is a tad more advanced since there's multiple layers of "branch-like" actions. Thankfully there are usually development guides on larger projects, explaining how they want you to work with forking for their specific project.

It's also worth mentioning that some forks are made without the intention of ever merging back into the original project. This creates an entire parallell repo which could evolve in an entirely different direction than the main project. Usually this happens when a community disapproves of the maintainers from the original project, or want to radically change some features to suit their own needs. Perhaps the most famous fork of all time is the Android fork from Linux.

## Closing thoughts

I hope this can serve as a point of reference when working with git in your development. Git certainly has a reputation for being overly complicated and having a rough learning curve. While there definetly are extremely complicated parts hidden away in the version control system, I think this reputation is mostly undfounded. Stick to these basics and slowly expand your horizons to other features when you need them in the future.

This ensures the vast majorities of the benefits from using git, while flattening the learning curve immensly. If you do get curious about more features, just type `git --help`, pick a feature which looks interesting and begin researching. It's really nothing more difficult than that.

Please reach out to me if there's anything in this guide you find confusing or if you see any blatant missing holes in the information presented here. Good luck on your journey to finally git gud.
