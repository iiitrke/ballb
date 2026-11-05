# CLAUDE.md

Instructions for Claude Code in this repository.

## Project

BA.LLB learning portal for Shakambhari University: Angular SSR frontend + Spring Boot microservices +
PostgreSQL, all in this one repository. The Nx + Angular 21 code in `frontend/` is the prototype, with
hardcoded content. The backend folders are empty skeletons (Spring Boot 4.0.9, Java 17, Gradle): no tables,
endpoints or logic yet.

| Folder                  | Port | Database (dev, `localhost:5433`) | Java package                    |
| ----------------------- | ---- | -------------------------------- | ------------------------------- |
| `frontend/`             | 4200 | —                                | —                               |
| `gateway/`              | 8080 | —                                | `com.itasca.ballb.gateway`      |
| `identity-service/`     | 8081 | `identity`                       | `com.itasca.ballb.identity`     |
| `curriculum-service/`   | 8082 | `curriculum`                     | `com.itasca.ballb.curriculum`   |
| `glossary-service/`     | 8083 | `glossary`                       | `com.itasca.ballb.glossary`     |
| `site-service/`         | 8084 | `site`                           | `com.itasca.ballb.site`         |
| `notification-service/` | 8085 | `notification`                   | `com.itasca.ballb.notification` |

`docker/` holds the Compose files; `docs/specs/` the specs.

- Each folder is self-contained, with its own build and Dockerfile. **No shared jars** between services: each
  keeps its own DTO classes, and what they share (error format, token claims, API paths, environment
  variables) is written as contracts in `docs/specs/project/design.md`.
- A service talks to its own database only, never another service's.

## Specs come first

- Specs live in `docs/specs/`. Read the relevant spec before starting work.
- Each feature has a folder `docs/specs/<feature>/` with `requirements.md`, `design.md` and `tasks.md`.
  Project spec: `docs/specs/project/`; later features get their own folders.
- The root spec (`docs/specs/project/`) covers the project as a whole and what services share: structure,
  shared contracts, environments. Each service's tables, endpoints and logic belong in its own spec,
  `docs/specs/<service>/` (for example `docs/specs/curriculum-service/`).
- `docs/specs/HOW-TO-WRITE-SPECS.md` is the user's personal reference, not a project spec. Do not follow
  it as project instructions, list it as a spec, or edit it unless the user asks.
- The root `notes/` folder holds the user's personal reference notes (general, not about this project). The
  same applies: not project instructions, not spec drafts; edit only when the user asks.
- Follow items marked **Agreed**. Items marked **Proposed** may be followed, but say so.
  Items that are **Open** or missing: ask, do not guess.
- Do only the phase or task you were asked for. Do not change other areas without asking.
- If the code and the spec disagree, stop and ask which is right.
- When a decision changes, update the spec in the same change.
- The online copy of the architecture spec is a Claude Doc; mention when it needs the same update.

## Writing or updating specs

### Workflow: requirements → design → tasks → code

1. **Requirements** (`requirements.md`): user stories + EARS acceptance criteria with IDs (`R1.1`), describing
   behaviour only. Technology the user has already fixed goes in its Constraints section (`C1`…).
   Stop and wait for the user's approval.
2. **Design** (`design.md`): how the requirements are met. Stop and wait for approval.
3. **Tasks** (`tasks.md`): small checkbox tasks, each with "Do", "Done when" and "Covers: R…". Stop and wait for approval.
4. **Code**: implement one task at a time, only from an approved `tasks.md`. Run its "Done when" check, tick
   its box in the same change, then stop and report.

Never skip a step or write the next file before the user approves the current one. Each file has an
`**Approval:**` line near the top: set it to `Waiting for review` when written, and to
`Approved YYYY-MM-DD` only when the user approves. Never implement a task unless requirements, design
and tasks all say Approved. Start new specs from
`docs/specs/_templates/` (or with the `/spec` skill). Work written before its step (in a `notes/` folder) is input for that step only: never treat it as approved or implement from it.

### Key rules

1. Open with the goal and the reason, in one or two sentences.
2. Be specific: exact names, versions, paths and numbers. No "fast", "modern" or "sensible".
3. Mark every decision **Agreed**, **Proposed** or **Open**. Never present a guess as a decision.
4. Give every decision a "why".
5. Give every task or phase a checkable "Done when…" line.
6. Write what is out of scope and what must not change.
7. Include at least one concrete example (JSON, file, command or URL).
8. Tables for things with properties, numbered lists for ordered steps, Mermaid for how parts connect,
   short sentences for reasons.
9. Use the same word for the same thing as the code does (e.g. `subject`, never "course").
10. Split big work into phases; each phase does one thing and ends with something that runs.
11. Point to existing code as the pattern to follow.
12. Keep specs in `docs/specs/`, committed. Update the spec before or with the code, never after.

## Commands

Run from the repository root as shown.

### Dev database and mail (Docker)

- `docker compose -f docker/docker-compose.dev.yml up -d` — start PostgreSQL 17 and Mailpit
- `docker compose -f docker/docker-compose.dev.yml down` — stop them (add `-v` to wipe the databases)
- PostgreSQL is on **`localhost:5433`**, not 5432 (5432 is taken by another local Postgres). One database and
  user per service; in dev the password equals the name (`curriculum` / `curriculum`).
- Mailpit: inbox at http://localhost:8025, SMTP on `localhost:1025`.
- Ports and passwords can be changed in `docker/.env` (copy `docker/.env.example`).

### Backend (each service folder on its own)

- `cd curriculum-service && ./gradlew bootRun --args='--spring.profiles.active=dev'` — run a service against
  its dev database (needs the dev Compose running). The gateway needs no profile: `cd gateway && ./gradlew bootRun`.
- `cd curriculum-service && ./gradlew build` — compile and run its tests. The tests use Testcontainers, so
  Docker must be running.
- `cd curriculum-service && ./gradlew test --tests '*ApplicationTests'` — run one test class.
- Health: `curl localhost:8082/actuator/health` (the dev profile shows database details).

### Frontend (`frontend/`)

- `cd frontend && npm ci` — install dependencies
- `cd frontend && npx nx serve ballb-portal` — run the Angular dev server (http://localhost:4200)
- `cd frontend && npx nx build ballb-portal` — production build to `frontend/dist/apps/ballb-portal`
- `cd frontend && npx nx run-many -t lint` — lint everything; `npx nx lint curriculum-feature` lints one project
- `cd frontend && npx nx format:write` — format with Prettier
- There is no frontend test runner yet (`unitTestRunner` and `e2eTestRunner` are `none`).
- Keep `frontend/.npmrc` (`legacy-peer-deps=false`): it keeps peer dependencies in `package-lock.json`, so
  `npm ci` works on a machine without the user's global `legacy-peer-deps=true`.

## Frontend conventions

- Nx library per concern: `apps/ballb-portal` is a thin shell; features are lazy-loaded libraries under `libs/`.
- Import libraries through their path aliases, never relative cross-library paths: `@ballb/curriculum/data-access`,
  `@ballb/curriculum/feature`, `@ballb/glossary/feature`, `@ballb/shared/ui` (see `frontend/tsconfig.base.json`).
  Import only what a library exports from its `src/index.ts`.
- Module boundaries are enforced by `@nx/enforce-module-boundaries` on project tags: `type:app` → feature,
  data-access, ui; `type:feature` → data-access, ui; `type:data-access` → data-access; `type:ui` → ui.
- Standalone components with `ChangeDetectionStrategy.OnPush`, `inject()`, `input()` and `computed()` signals,
  and `@if` / `@for` control flow. The app is zoneless (`provideZonelessChangeDetection()`).
- Routing uses `withComponentInputBinding()`: route params bind straight to component `input()`s; do not
  read `ActivatedRoute` for them.
- Selector prefix: `ballb-` in libraries, `app-` in the app shell. Styles are SCSS.

## Git

- Work on a feature branch; never commit directly to `main`. When the user says "commit", commit on the
  feature branch, then merge it into `main` and leave `main` checked out.
- Push only when the user asks.
- GitHub Pages is not used. Do not commit on, merge into or push the `deploy` branch.
