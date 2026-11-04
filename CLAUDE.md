# CLAUDE.md

Instructions for Claude Code in this repository.

## Project

BA.LLB learning portal for Shakambhari University: Angular SSR frontend + Spring Boot microservices +
PostgreSQL. The current Nx + Angular 21 code is the prototype, with hardcoded content.

## Specs come first

- Specs live in `docs/specs/`. Read the relevant spec before starting work.
- Each feature has a folder `docs/specs/<feature>/` with `requirements.md`, `design.md` and `tasks.md`.
  Project spec: `docs/specs/project/`; later features get their own folders. How to write specs: `docs/specs/HOW-TO-WRITE-SPECS.md`.
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
`docs/specs/_templates/` (or with the `/spec` skill). Work written before its step (e.g.
`docs/specs/project/notes/`) is input for that step only: never treat it as approved or implement from it.

### Key rules

Full guide: `docs/specs/HOW-TO-WRITE-SPECS.md`.

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

- `npx nx serve ballb-portal` — run the Angular dev server
- `npx nx build ballb-portal` — production build
- `npx nx run-many -t lint` — lint everything
- `npx nx format:write` — format with Prettier

## Git

- Work on a feature branch; never commit directly to `main`.
- `deploy` branch publishes to GitHub Pages (to be retired once the VPS staging is live).
