---
name: spec
description: Start or continue a spec-driven feature in this repo using requirements → design → tasks → code, stored in docs/specs/<feature>/. Use when the user runs /spec, asks to write a spec, requirements, design or task list for a feature, or asks to implement a task from a tasks.md.
---

# Spec-driven workflow

Follow `docs/specs/HOW-TO-WRITE-SPECS.md`. Each feature lives in `docs/specs/<feature-slug>/` with three
files, written in order, each approved by the user before the next.

## 1. Find where the feature stands

- Argument given (`/spec <feature name>`): use it; the folder name is its kebab-case slug.
- No argument: list the folders in `docs/specs/` (skip `_templates`) and ask which feature, or a new name.
- Check which of `requirements.md`, `design.md`, `tasks.md` exist, and resume at the first missing one.
  If all exist, report the next unticked task in `tasks.md` and ask whether to do it.

## 2. Requirements (`requirements.md`)

- Start from `docs/specs/_templates/requirements.md`.
- Base it on what the user said in this conversation and on the existing code. Read the code it touches.
- One `R<n>` per user need: a user story, then acceptance criteria in EARS form with IDs (`R1.1`).
- Describe what the system does, never how it is built.
- Mark each criterion Agreed (the user said it), Proposed (your suggestion) or Open (unknown).
- List out of scope and open questions.
- **Stop.** Summarise in a few lines and ask the user to approve or change it.

## 3. Design (`design.md`)

- Only after requirements are approved. Start from `docs/specs/_templates/design.md`.
- Every decision gets a "why" and a status. Every component lists the requirement IDs it covers.
- Include a Mermaid diagram and at least one concrete example (JSON, URL, command).
- **Stop** and ask for approval.

## 4. Tasks (`tasks.md`)

- Only after design is approved. Start from `docs/specs/_templates/tasks.md`.
- Small tasks grouped in phases. Each task: "Do" (what and which files), "Done when" (a checkable
  command, URL or test), "Covers" (requirement IDs). Every requirement is covered by at least one task.
- **Stop** and ask for approval.

## 5. Implementation

- Only from an approved `tasks.md`, one task at a time, in order, unless the user names another task.
- Do only what the task says. If the task is unclear or conflicts with the design, stop and ask.
- Run the task's "Done when" check. Report the real result; if it fails, say so.
- When it passes, tick the box (`- [x]`) in the same change as the code, then stop and report.
- If a decision changes while building, update `requirements.md` or `design.md` in the same change.
