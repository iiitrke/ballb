# CLAUDE.md

Instructions for Claude Code in this repository.

## Project

BA.LLB learning portal for Shakambhari University. Today: Nx + Angular 21 app with hardcoded content.
In progress: split into Angular SSR frontend + Spring Boot microservices + PostgreSQL.

## Specs come first

- Specs live in `docs/specs/`. Read the relevant spec before starting work.
- The main spec is `docs/specs/architecture.md`. How to write specs: `docs/specs/README.md`.
- Follow items marked **Agreed**. Items marked **Proposed** may be followed, but say so.
  Items that are **Open** or missing: ask, do not guess.
- Do only the phase or task you were asked for. Do not change other areas without asking.
- If the code and the spec disagree, stop and ask which is right.
- When a decision changes, update the spec in the same change.
- The online copy of the architecture spec is a Claude Doc; mention when it needs the same update.

## Commands

- `npx nx serve ballb-portal` — run the Angular dev server
- `npx nx build ballb-portal` — production build
- `npx nx run-many -t lint` — lint everything
- `npx nx format:write` — format with Prettier

## Git

- Work on a feature branch; never commit directly to `main`.
- `deploy` branch publishes to GitHub Pages (to be retired once the VPS staging is live).
