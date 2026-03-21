# ☕ Chai Tailwind

A lightweight, utility-first CSS engine powered by JavaScript. No build tools, no config — just include the script and start using `chai-*` classes.

## How It Works

Write utility classes like `chai-p-4`, `chai-bg-red`, `chai-text-center` in your HTML. The engine scans the DOM, converts them into inline styles, and removes the class names — all at runtime.

```html
<div
  class="chai-flex chai-gap-4 chai-p-6 chai-bg-blue chai-text-white chai-rounded-xl"
>
  Hello, Chai Tailwind!
</div>
```

## Features

- **Zero Build Step** — Just include `chai-tailwind.js` and go
- **Utility-First** — Spacing, colors, typography, flexbox, grid, borders, shadows, and more
- **Bracket Notation** — Use arbitrary values: `chai-text-[#ff5733]`, `chai-w-[500px]`, `chai-bg-[rgb(0,0,0)]`
- **Reactive** — MutationObserver watches for DOM changes, so dynamically added elements get styled too
- **Named Color Palette** — 20+ built-in colors: `red`, `blue`, `indigo`, `emerald`, etc.

## Quick Start

```html
<script src="chai-tailwind.js"></script>
```

That's it. Start using `chai-*` classes anywhere in your HTML.

## Supported Utilities

| Category   | Examples                                                      |
| ---------- | ------------------------------------------------------------- |
| Spacing    | `chai-p-4`, `chai-mx-auto`, `chai-mt-8`, `chai-gap-3`         |
| Colors     | `chai-bg-red`, `chai-text-white`, `chai-bg-[#1e293b]`         |
| Typography | `chai-text-xl`, `chai-font-bold`, `chai-uppercase`            |
| Layout     | `chai-flex`, `chai-grid`, `chai-grid-cols-3`, `chai-hidden`   |
| Sizing     | `chai-w-20`, `chai-h-full`, `chai-max-w-[600px]`              |
| Borders    | `chai-border`, `chai-rounded-xl`, `chai-border-dashed`        |
| Shadows    | `chai-shadow-md`, `chai-shadow-xl`                            |
| Effects    | `chai-opacity-50`, `chai-transition-all`, `chai-duration-300` |

## Bracket Notation

For custom values that aren't in the built-in palette, wrap them in `[]`:

```html
<!-- Custom colors -->
<div class="chai-text-[#818cf8] chai-bg-[rgb(15,23,42)]">Custom colors</div>

<!-- Custom sizes -->
<div class="chai-w-[500px] chai-text-[2.5rem]">Custom sizes</div>
```

## Project Structure

```
├── chai-tailwind.js   # The engine
├── index.html         # Demo page
├── output.js          # Playground script
└── logo.png           # Logo
```
