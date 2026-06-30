# AI Capability Finder

A searchable directory of AI automation capabilities, mapped to the AI tools
enabled for each. Built with Vite + React and a small token-driven component
library. **The data in this demo is sample/illustrative data.**

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build -> dist/
npm run preview  # serve the production build
```

## Features

- Search across capabilities, descriptions, departments, and categories
- Filter by **Department** and **Category** (category cascades from department)
- Click any capability to open a modal listing the **AI tools enabled** for it,
  each with a link to its documentation
- Results grouped by department as a responsive card grid

## Project structure

```
src/
  styles/
    tokens.css            Design tokens — the single source of truth
    global.css            Resets + base typography
  components/ui/          Component library: Button, Card, Badge,
                          Input, Select, Modal (+ ui.css, barrel index)
  features/
    CapabilityFinder.jsx  The finder (search + filters + grid + modal)
  data/
    automationCapabilities.js  Generated data (capabilities, tools, lookups)
  App.jsx                 App shell
  main.jsx                Entry point
scripts/                  Data generators (xlsx -> data module)
```

## Data

The app reads `src/data/automationCapabilities.js`, which is generated from a
spreadsheet via `npm run gen:data`. Edit the source workbook, regenerate, and
rebuild to update the content.

## Deployment

Pushed to GitHub, the included workflow (`.github/workflows/deploy.yml`) builds
the app and publishes it to GitHub Pages on every push to `main`.
