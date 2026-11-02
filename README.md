# BA.LLB Learning Portal — Shakambhari University

An Angular web app for BA.LLB students of Shakambhari University. It offers semester-wise
subjects, unit outlines, statutes to read, and a searchable legal glossary.

Built as an [Nx](https://nx.dev) monorepo with Angular 21 (standalone components, signals,
zoneless change detection).

> **Content notice:** Each subject has a `source` of `official` or `sample`, and the UI badges it
> accordingly.
>
> - **Official:** `libs/curriculum/data-access/src/lib/official-papers.data.ts` holds papers
>   transcribed from the Shakambhari University syllabus (codes 1078204, 1078205, 1078206,
>   1078280). They are placed in Semester 10 until their semester is confirmed.
> - **Sample:** everything else in `curriculum.data.ts` is placeholder content to be replaced.

## Prerequisites

- Node.js 20.19+, 22.12+ or 24+
- npm 10+

## Getting started

```sh
npm install
npx nx serve ballb-portal     # http://localhost:4200
```

## Common commands

| Command                     | What it does                                 |
| --------------------------- | -------------------------------------------- |
| `npx nx serve ballb-portal` | Run the dev server                           |
| `npx nx build ballb-portal` | Production build to `dist/apps/ballb-portal` |
| `npx nx run-many -t lint`   | Lint every project                           |
| `npx nx graph`              | Visualise the project dependency graph       |
| `npx nx format:write`       | Format files with Prettier                   |

## Deployment

### GitHub Pages (preview)

The workflow `.github/workflows/deploy-pages.yml` builds and publishes the site to
`https://iiitrke.github.io/ballb/`. It runs **only on pushes to the `deploy` branch**, or
manually from the Actions tab.

```sh
git checkout deploy
git merge <branch-with-changes>
git push origin deploy
```

To make this work, the repository needs:

1. **Settings → Pages → Build and deployment → Source:** `GitHub Actions`.
2. **Settings → Environments → `github-pages` → Deployment branches:** allow `deploy`.

### VPS / custom domain (later)

The app is not tied to a domain. The base path is set when you build:

```sh
npx nx build ballb-portal --base-href=/      # site served at the domain root
```

Serve `dist/apps/ballb-portal/browser/` with any static web server (e.g. nginx). Configure the
server to fall back to `index.html` for unknown paths so Angular routes work on refresh.

## Workspace layout

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

- **Subjects and units:** edit `libs/curriculum/data-access/src/lib/curriculum.data.ts`.
  Each subject has a `code` (used in the URL), `title`, `category`, `credits`, `summary`,
  optional `statutes`, and a `units` list.
- **Glossary terms:** edit `libs/glossary/feature/src/lib/glossary.data.ts`.

## Adding a new feature library

```sh
npx nx g @nx/angular:library libs/<area>/feature --tags=type:feature,scope:<area>
```

Then lazy-load its routes from `apps/ballb-portal/src/app/app.routes.ts`.
