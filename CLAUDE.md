# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository state — read first

`main` and the working tree are **empty** (only `.git` + this file). All application code
lives on branches:

- `origin/feat/nx-angular-scaffold` — the full Nx + Angular 21 source (59 files).
- `origin/deploy` — same content; **only this branch triggers the GitHub Pages deploy**.

Before doing anything substantive, check out or merge the scaffold branch
(`git checkout feat/nx-angular-scaffold`). Paths and commands below assume that tree.

## Project

BA.LLB learning portal for Shakambhari University students: semester-wise subjects, unit
outlines, statutes, and a legal glossary. Nx monorepo, Angular 21 (standalone components,
signals, **zoneless** change detection). No tests or e2e are configured (`unitTestRunner`/
`e2eTestRunner` are `none`).

## Commands

```sh
npm install
npx nx serve ballb-portal        # dev server at http://localhost:4200
npx nx build ballb-portal        # prod build -> dist/apps/ballb-portal/browser
npx nx run-many -t lint          # lint all projects
npx nx lint curriculum-feature   # lint a single project (use the project.json "name")
npx nx graph                     # project dependency graph
npx nx format:write              # Prettier
```

There is no test runner. Requires Node 20.19+ / 22.12+ / 24+.

## Architecture

Nx library-per-concern layout. The app shell is thin; features are lazy-loaded libraries.

```
apps/ballb-portal/        shell: layout, home page, root routes, app.config (providers)
libs/curriculum/
  data-access/            models, data, CurriculumService          tag: type:data-access
  feature/                semester-list / semester-detail / subject-detail pages   type:feature
libs/glossary/feature/    searchable Latin maxims / legal terms      tag: type:feature
libs/shared/ui/           reusable presentational components (PageHeader)   tag: type:ui
```

Import libraries via TS path aliases, never relative cross-lib paths:
`@ballb/curriculum/data-access`, `@ballb/curriculum/feature`, `@ballb/glossary/feature`,
`@ballb/shared/ui` (see `tsconfig.base.json`). Each lib exports its public surface from
`src/index.ts` — only import what's exported there.

**Module boundaries** are enforced by `@nx/enforce-module-boundaries` on project `tags`:
`type:app` → feature/data-access/ui · `type:feature` → data-access/ui · `type:ui` → ui ·
`type:data-access` → data-access. Set tags in each `project.json` when generating a lib.

### Routing & data flow

- Root routes (`apps/.../app.routes.ts`) lazy-load feature route arrays:
  `/semesters` → `curriculumRoutes`, `/glossary` → `glossaryRoutes`.
- Routing uses `withComponentInputBinding()` — route params (`:semester`, `:code`) are bound
  directly to component `input()` signals; components do not read `ActivatedRoute` for params.
- `CurriculumService` (`providedIn: 'root'`) holds all curriculum data in a `signal` and exposes
  read-only `signal`/`computed` views (`semesters`, `years`, `allSubjects`) plus `semester(n)`
  and `subject(n, code)` lookups. Data is bundled statically today; the signal API is designed so
  it can swap to an HTTP source later without changing callers.

### Conventions

- Standalone components only. Use `ChangeDetectionStrategy.OnPush`, `inject()`, `input()` /
  `computed()` signals, and the new control-flow syntax (`@if`, `@for` with `track`).
- Component selector prefix is `ballb` (e.g. `ballb-subject-detail-page`); SCSS styles.

## Content model

Content is typed data, not a CMS. Each `Subject` carries `source: 'official' | 'sample'` and the
UI badges accordingly.

- **Sample** placeholder content: `libs/curriculum/data-access/src/lib/curriculum.data.ts`.
- **Official** syllabus papers (codes 1078204/205/206, 1078280), parked in Semester 10 until
  their real semester is confirmed: `.../official-papers.data.ts`.
- Glossary terms: `libs/glossary/feature/src/lib/glossary.data.ts`.
- A subject's `code` is URL-safe and used in `/semesters/:semester/:code`; for official papers it
  is the university paper code.

## Deployment

GitHub Pages builds on **push to `deploy`** only (`.github/workflows/deploy-pages.yml`), serving
`https://<owner>.github.io/<repo>/`. The workflow sets `--base-href=/<repo>/` and copies
`index.html` to `404.html` for SPA deep-link fallback. No `package-lock.json` is committed, so CI
uses `npm install` (not `npm ci`). To publish: merge your changes into `deploy` and push.
