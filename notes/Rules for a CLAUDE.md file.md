# Rules for a CLAUDE.md file

Personal reference: general guidance, not specific to this project. Written 2026-11-06.

A `CLAUDE.md` file is plain Markdown that Claude Code loads automatically at the start of each session, as
standing instructions. There is no required format. What matters is **where** the file is and **what** goes
in it.

## Where it goes

| File                                                      | Who it is for                          | Committed to git?                                            |
| --------------------------------------------------------- | -------------------------------------- | ------------------------------------------------------------ |
| `~/.claude/CLAUDE.md`                                     | You, in every project                  | No (your home folder)                                        |
| `CLAUDE.md` at the repository root (or `.claude/CLAUDE.md`) | Everyone working on the project      | Yes                                                          |
| `CLAUDE.local.md` at the repository root                  | You, in this project only              | No (keep it out of git)                                      |
| `CLAUDE.md` inside a folder, e.g. `my-service/CLAUDE.md`  | Work in that folder                    | Yes; loads when Claude works on files there                  |
| `.claude/rules/*.md`                                      | Topic rules, optionally limited to certain paths | Yes                                                |

- Starting Claude Code inside a folder loads that folder's `CLAUDE.md` **and** every `CLAUDE.md` above it,
  up to the repository root. Shared rules in the root file still apply; do not copy them into each folder.
- Inside any of these files, `@path/to/file.md` imports another file's content, without copying it.

## What makes a good one

1. **Write what Claude can't easily work out from the code:**
   - commands: build, run, lint, test, and how to run a single test;
   - project rules and workflow, e.g. "specs first, implement only approved tasks";
   - traps, e.g. "Postgres is on port 5433, not 5432";
   - decisions, e.g. "no shared jars between services".
2. **Be specific.** Exact names, paths, ports and versions. "Postgres is on `localhost:5433`", not "use the
   right port".
3. **Keep it short.** The whole file goes into every session, so every line costs context. Do not list files
   Claude can find itself. Skip generic advice such as "write clean code" or "add tests".
4. **Keep it true.** When the code or a decision changes, update the file in the same change. An out-of-date
   `CLAUDE.md` is worse than none.
5. **Put each rule in one place only.** A rule for everyone goes in the root file, not copied into every
   folder, so copies can't drift apart.
6. **Guidance, not enforcement.** `CLAUDE.md` is text Claude follows. For something that must always happen
   (block a push, run a formatter), use a **hook** in `.claude/settings.json`: Claude Code runs it itself.

## Related places

| Need                                              | Use                                                         |
| ------------------------------------------------- | ----------------------------------------------------------- |
| Standing instructions                             | `CLAUDE.md` (this note)                                     |
| Something that must always run or be blocked      | Hooks in `.claude/settings.json` (shared) or `.claude/settings.local.json` (just you) |
| A reusable step-by-step workflow, e.g. `/spec`    | A skill in `.claude/skills/<name>/SKILL.md`                 |

## Shortcuts

- `/init` writes a first draft of `CLAUDE.md` from the code.
- `/memory` opens the memory files for editing.

## README.md is not CLAUDE.md

- Claude Code does **not** load `README.md` automatically. Only `CLAUDE.md` files (and what they import) load.
- Claude reads `README.md` only when a task needs it: `/init` asks it to include the README's important parts,
  a task edits the README, or a search finds something in it.
- `README.md` is for people; `CLAUDE.md` is for Claude. Some overlap (such as commands) is fine.
- To make Claude always see part of the README, import it in `CLAUDE.md` with `@README.md` instead of copying it.
