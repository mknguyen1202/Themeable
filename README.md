# Themeable

A fully themeable, token-driven React component library with a built-in visual Design System Editor.

## What it is

Themeable is an experimental design system toolkit that lets you swap themes, design families, and density scales at runtime — no CSS recompile, no class toggling. Every visual decision (color, radius, shadow, spacing, motion) flows from a small set of semantic tokens resolved into CSS custom properties by the `ThemeProvider`.

## Features

- **Multi-theme support** — Solar (light), Lunar (dark), Aurora, High Contrast — all hot-swappable
- **Design Families** — Glass, Material, Flat, Brutalist, Neumorphism, Wireframe, AuroraNeon — control geometry, elevation, borders, and motion independently of color
- **Density scaling** — Comfortable, Compact, Spacious — scales spacing, font sizes, and control heights proportionally
- **WCAG-aware color resolution** — button foregrounds are computed from WCAG relative luminance so text is always readable, regardless of theme or tone
- **30+ components** — Button, Input, Select, Checkbox, Radio, Switch, Slider, Dialog, Drawer, Tooltip, Popover, Menu, Toast, Table, Tabs, Accordion, Carousel, DatePicker, TimePicker, Lightbox, and more
- **Built-in Design System Editor** — live color editor, variant previewer, family editor, and theme editor accessible via the editor drawer

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project structure

```
src/
  components/        # UI components (Button, Input, Menu, …)
  foundations/       # Color ramps, spacing, typography, elevation primitives
  semantics/         # Role tokens (surface, text, intent, density)
  families/          # Design family implementations (glass, flat, material, …)
  themes/            # Concrete themes (solar, lunar, aurora, highContrast)
  resolver/          # Pure token resolution functions (surface, role, state, …)
  system/            # ThemeProvider + ThemeContext
  demo/              # Live component showcase and theme switcher
  editor/            # Design System Editor (color, variant, family, theme panels)
```

## Theming model

```
Theme (palette + roles)
  └─ resolved by ─► ThemeProvider
       └─ injects ─► CSS custom properties (--surface-raised, --intent-primary, …)
            └─ consumed by ─► component SCSS modules via var()
```

Each component resolves its own tokens inside a `*.resolve.ts` or `*.tokens.ts` file, keeping theming logic co-located with the component.

## Available scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | TypeScript check + Vite production build |
| `npm run lint` | ESLint |
| `npm run storybook` | Start Storybook on port 6006 |
| `npm run build-storybook` | Build static Storybook |

## Stack

- React 19 + TypeScript
- Vite 7
- SCSS Modules
- Storybook 10
- Vitest + Playwright
