# Dr. Ghulam Siddiq — Frontend

Vite + React + TypeScript + Tailwind. Design system is defined in
[`../DESIGN_SPEC.md`](../DESIGN_SPEC.md) and mirrored in
[`src/design-system/`](./src/design-system/) and
[`tailwind.config.ts`](./tailwind.config.ts).

```bash
npm install
npm run dev          # local dev server
npm run build        # production build to ./dist
npm run preview      # preview production build locally
npm run typecheck    # tsc noEmit
npm run lint
npm run test         # vitest
npm run e2e          # playwright (runs build + preview)
```

The style-guide tokens reference page is available at `/styleguide` in dev
only.
