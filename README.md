# BA.LLB Learning Portal — Shakambhari University

An web app for BA.LLB students of Shakambhari University. It offers semester-wise
subjects, unit outlines, statutes to read, and a searchable legal glossary.

Built as an [Nx](https://nx.dev) monorepo with Angular 21 (standalone components, signals,
zoneless change detection).

> **Content notice:** Each subject has a `source` of `official` or `sample`, and the UI badges it
> accordingly.
>
> - **Official:** `frontend/libs/curriculum/data-access/src/lib/official-papers.data.ts` holds papers
>   transcribed from the Shakambhari University syllabus (codes 1078204, 1078205, 1078206,
>   1078280). They are placed in Semester 10 until their semester is confirmed.
> - **Sample:** everything else in `curriculum.data.ts` is placeholder content to be replaced.

## Prerequisites

- Node.js 20.19+, 22.12+ or 24+
- npm 10+

## Getting started

The Angular app lives in `frontend/`. Run these from the repository root:

```sh
cd frontend && npm ci
cd frontend && npx nx serve ballb-portal     # http://localhost:4200
```

## Common commands

All commands run from the repository root.

| Command                                    | What it does                                          |
| ------------------------------------------ | ----------------------------------------------------- |
| `cd frontend && npx nx serve ballb-portal` | Run the dev server                                    |
| `cd frontend && npx nx build ballb-portal` | Production build to `frontend/dist/apps/ballb-portal` |
| `cd frontend && npx nx run-many -t lint`   | Lint every project                                    |
| `cd frontend && npx nx graph`              | Visualise the project dependency graph                |
| `cd frontend && npx nx format:write`       | Format files with Prettier                            |

## Deployment

The portal is not deployed to GitHub Pages. It will run in containers on the VPS (see
`docs/specs/project/design.md`, "Environments and deployment").

### VPS / custom domain (later)

The app is not tied to a domain. The base path is set when you build:

```sh
cd frontend && npx nx build ballb-portal --base-href=/      # site served at the domain root
```

Serve `frontend/dist/apps/ballb-portal/browser/` with any static web server (e.g. nginx). Configure the
server to fall back to `index.html` for unknown paths so Angular routes work on refresh.

## Workspace layout

Inside `frontend/`:

```
apps/
  ballb-portal/                 Angular app shell: layout, home page, top-level routes
libs/
  curriculum/
    data-access/                Models, sample curriculum data, CurriculumService (signals)
    feature/                    Semester list, semester detail, subject detail pages (lazy: /semesters)
  glossary/
    feature/                    Searchable Latin maxims / legal terms (lazy: /glossary)
  shared/
    ui/                         Reusable presentational components (PageHeader)
```

### Routes

| URL                          | Page                        |
| ---------------------------- | --------------------------- |
| `/`                          | Home: years and quick links |
| `/semesters`                 | All 10 semesters by year    |
| `/semesters/:semester`       | Subjects in a semester      |
| `/semesters/:semester/:code` | Subject units and statutes  |
| `/glossary`                  | Legal glossary search       |

### Module boundaries

Projects are tagged and `@nx/enforce-module-boundaries` enforces these rules:

- `type:app` → may use `feature`, `data-access`, `ui`
- `type:feature` → may use `data-access`, `ui`
- `type:data-access` → may use only `data-access`
- `type:ui` → may use only `ui`

## Adding or editing content

- **Subjects and units:** edit `frontend/libs/curriculum/data-access/src/lib/curriculum.data.ts`.
  Each subject has a `code` (used in the URL), `title`, `category`, `credits`, `summary`,
  optional `statutes`, and a `units` list.
- **Glossary terms:** edit `frontend/libs/glossary/feature/src/lib/glossary.data.ts`.

## Adding a new feature library

```sh
cd frontend && npx nx g @nx/angular:library libs/<area>/feature --tags=type:feature,scope:<area>
```

Then lazy-load its routes from `frontend/apps/ballb-portal/src/app/app.routes.ts`.
