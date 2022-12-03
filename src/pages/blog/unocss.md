---
layout: ../../layouts/BlogLayout.astro
title: UnoCss
preview: UnoCSS is an atomic css engine which enables a different workflow for writing css, avoiding the hassles of semantic styling. For those familiar with TailwindCSS...
date: 4th of december 2022
time: 8:00 am
timestamp: 1670137200
---

[UnoCSS](https://github.com/unocss/unocss) is an atomic css engine which enables a different workflow for writing css, avoiding the hassles of semantic styling. For those familiar with [TailwindCSS](https://tailwindcss.com/), it's just like that but turned up to 11.

## Basic Usage

When having just installed UnoCSS, it does absolutely nothing. Nothing you'll notice on your website at least. The real magic starts when you install one of it's many presets. A preset is a set of rules for identifying classes on html elements (or components) and applying CSS to those classes.

If that sounds just like Tailwind, that is because it is just like Tailwind. Or rather, it's a superset of Tailwind. There is in fact a preset for just that, all rules defined by Tailwind with the added benefit of avoiding the [ ] syntax for "custom" sizes. This is because UnoCSS allows you to define rules based on regular expressions and then using capture groups when applying the CSS. As such, `class="m-3"` works just as well as `class="m-4` to apply margin. This, of course wouldn't work in Tailwind since it doesn't define any rules for spacing which is 3 units big.

## Beyond Tailwind

Switching out one atomic CSS system for another identical one doesn't seem very useful. Good thing we've only covered one of the many presets availible so far. There are too many to mention here, but I'll go over the ones I use.

### [@unocss/preset-wind](https://github.com/unocss/unocss/tree/main/packages/preset-wind)

This is the one we've mentioned already which gives us the Tailwind rules with some extra spice added.
### [@unocss/preset-reset](https://www.npmjs.com/package/@unocss/reset)

This preset contains different stylesheets for normalising the CSS before doing your own styling. Setting all margins to 0, padding to 0, removing colouring from anchor elements and lots more. Exactly how the styling is normalised depends on which specific sheet you decide to use, but the idea is the same for all of them.

### [@unocss/transformer-directives](https://github.com/unocss/unocss/tree/main/packages/transformer-directives)

Tired of repeating classes for many elements using the same styling? This preset helps out with that exact problem by providing a shorthand for applying rules in a CSS stylesheet while still using the classes one would use in the HTML tags. For example:
```
h2 {
  @apply font-gothic text-pale-grey text-4xl -translate-x-1 mb-4 mt-8;
}
```
Would apply all those rules onto all h2 elements. This is a feature I rarely use, but sometimes it comes in handy, such as when styling Markdown files like the one you're reading right now. In fact, this exact code snippet is what's used to render the headers on this page.

### [@unocss/preset-icons](https://github.com/unocss/unocss/tree/main/packages/preset-icons)

Now we're talking. This preset is the heavy hitter for me. It uses icons from iconify as CSS icons, allowing for easy access to almost any icon from any icon set imaginable. As a side note, CSS icons have some pretty neat features such as allowing for animating the icons using transitions in more ways than just colouring.

## Integration Problems

So far, everything seems quite lovely, what's not to like about extending a tool I already enjoy like Tailwind?

First off, UnoCSS doesn't like [Webpack](https://webpack.js.org/). From what I can understand there's a bug when interacting with the Webpack cache which means that the styles aren't properly generated for the web page. This website is created using [Astro](https://astro.build/), which in turn uses [Vite](https://vitejs.dev/) as it's bundler. The integration between Vite and UnoCSS using is incredibly simple which isn't surprising considering the creator of UnoCSS works on Vite as well.

The other biggest problem I've encountered so far is that it's difficult to know exactly what rules are included in a preset. Not in the sense that I don't know where to find it. All you have to do is to check out the repo for each preset and read the regex rules. It's more about not having a convenient cheat sheet which is easily searchable while developing. For the Tailwind preset, one can of course use the Tailwind docs, but it's inconvenient to have fragmented documentation spread across the web. In an ideal world there'd exist some utility which allowed you to search through the rules contained in your current presets. As far as I know that doesn't exist yet.

## Should You Use UnoCSS?

If you feel like Tailwind is already your thing and you're not using Webpack: Give it a shot! I can't say that it has revolutionised my workflow, but it's a noticable step up from Tailwind in terms of notation. For more information about why one would use UnoCSS I recommend checking out this article from one of the authror's: [Reimagine Atomic CSS](https://antfu.me/posts/reimagine-atomic-css).

And if you don't know whether you like Tailwind or not, I'd suggest just giving it a shot! It's super easy to try, doesn't lock you in at all which means it is very easy to move off of, if you so desire.
