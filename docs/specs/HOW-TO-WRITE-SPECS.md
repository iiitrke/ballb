# How to Write Specs for Claude (and other AI)

A spec is a written plan that says **what to build, why, and how you will know it is done**.
A good spec lets Claude build the right thing on the first try. A weak spec makes Claude guess, and
guesses are where bugs come from.

This guide is in simple words. Read it once, then start every new feature from the templates in
[`_templates/`](./_templates/).

---

## First, understand how AI reads your spec

1. **It knows only what you write and what is in the code.** It was not in your meeting. It does not know
   your VPS, your domain, or your plans unless they are written down.
2. **It fills every gap with a guess.** If you say "use a database", it will pick one. If you say
   "PostgreSQL 17", it will use exactly that.
3. **It takes words literally.** "Make it fast" means nothing. "Page loads in under 1 second" is a rule it can follow.
4. **It follows the newest, clearest instruction.** If two parts of the spec disagree, it may pick the
   wrong one. Keep one fact in one place.

So the whole job of a spec is: **remove guesses.**

---

## The three-file method: requirements → design → tasks → code

Every feature gets its own folder, `docs/specs/<feature>/`, with three files written **in this order**.
Each file is approved by you before the next one is written. Code comes last.

| Step | File              | Answers                                    | Written in                                                                                      |
| ---- | ----------------- | ------------------------------------------ | ----------------------------------------------------------------------------------------------- |
| 1    | `requirements.md` | **What** must the system do, and for whom? | User stories + EARS criteria. Fixed technology goes in a Constraints section, never in criteria |
| 2    | `design.md`       | **How** will we build it?                  | Architecture diagram, decisions with "why", data model, APIs, error handling                    |
| 3    | `tasks.md`        | **In what steps?**                         | Small checkbox tasks, each with "Done when" and the requirements it covers                      |
| 4    | Code              | —                                          | One task at a time; tick its box when its check passes                                          |

**Why this order works:** a mistake found in requirements costs one sentence to fix. The same mistake found
in code costs a rewrite. Each step is a cheap checkpoint before the expensive one.

### Writing requirements in EARS form

EARS (Easy Approach to Requirements Syntax) gives every requirement one of five fixed shapes, so it is
always clear and testable:

| Shape                                 | Use it for             | Example from this project                                                        |
| ------------------------------------- | ---------------------- | -------------------------------------------------------------------------------- |
| THE SYSTEM SHALL …                    | Always true            | THE SYSTEM SHALL store text that students read as Markdown.                      |
| WHEN <event>, THE SYSTEM SHALL …      | A reaction to an event | WHEN a student opens `/glossary`, THE SYSTEM SHALL list all terms.               |
| WHILE <state>, THE SYSTEM SHALL …     | True during a state    | WHILE developing, THE SYSTEM SHALL run the database in Docker.                   |
| IF <problem>, THEN THE SYSTEM SHALL … | Errors and edge cases  | IF the subject code does not exist, THEN THE SYSTEM SHALL respond with HTTP 404. |
| WHERE <option>, THE SYSTEM SHALL …    | Optional features      | WHERE Hindi text exists, THE SYSTEM SHALL show it in Hindi mode.                 |

Give every criterion an ID (`R2.4`). Tasks then say which IDs they cover, so every line of code traces back
to a reason.

### Asking Claude to run the method

- New feature: type `/spec <feature name>`. Claude writes `requirements.md` and stops for your review.
- Say "approved" (or give changes). Claude then writes `design.md`, stops, then `tasks.md`, stops.
- Build: "Do task 1.1 from `docs/specs/project/tasks.md`." Claude does that one task, runs its
  "Done when" check, ticks the box, and stops.

**Rules for the gates:**

- Each file has an `**Approval:**` line. It says `Waiting for review` until you approve, then `Approved <date>`.
- The next file is written only after the previous one says Approved. No code before all three do.
- Technology you have already decided (for example "the backend is Spring Boot") goes in the
  **Constraints** section of `requirements.md`, so the requirements themselves stay about behaviour.
- Ideas written too early go in the feature's `notes/` folder. They are input for a later step, never
  an approved spec.

[`project/`](./project/) holds the whole project's spec and is the live example: requirements are
approved, the design is waiting for review, and an early task draft waits in `project/notes/`. Later features get their
own folder next to it.

---

## The 12 rules

### 1. Start with the goal and the reason

Write the first lines so that someone who reads only those lines knows what this is about.

- Bad: "This document describes the new system."
- Good: "Move content out of Angular code into a database, so teachers can update a syllabus without
  a redeploy."

The **reason** matters. When Claude meets a case you did not write about, it uses the reason to decide.

### 2. Be specific: names, numbers, versions, paths

| Vague (AI will guess)     | Specific (AI will follow)                                                    |
| ------------------------- | ---------------------------------------------------------------------------- |
| Use a modern backend      | Spring Boot 4.0.9, Java 17, Maven multi-module                               |
| Put it somewhere sensible | `backend/curriculum-service/`                                                |
| Cache the results         | Cache rendered HTML for 5 minutes, keyed by subject code and `updated_at`    |
| Support Hindi             | Every text field has `en` (required) and `hi` (optional, falls back to `en`) |

### 3. Mark what is decided and what is not

Use three labels and use them everywhere:

- **Agreed** — decided. Claude must follow it.
- **Proposed** — a suggestion. Claude may follow it, but you have not confirmed it.
- **Open** — not decided. Claude must ask, not guess.

If you don't mark these, an old idea looks the same as a final decision.

### 4. Write the "why" for every decision

A decision table with a **Why** column is the most useful thing in a spec.

| Decision         | Choice         | Why                                                                                     |
| ---------------- | -------------- | --------------------------------------------------------------------------------------- |
| Markdown to HTML | In the backend | Keeps the Markdown parser out of the browser bundle; one cleaned output for all clients |

With the "why", Claude can make good small decisions on its own. Without it, it can only copy.

### 5. Say how you will know it is done

Every task needs a finish line that can be checked.

- Bad: "Set up the backend."
- Good: "Done when `docker compose -f docker/docker-compose.dev.yml up` starts Postgres and all three
  services report `UP` at `/actuator/health`."

Claude will work until it reaches this line, and it can test itself against it.

### 6. Say what NOT to do

AI likes to be helpful and may "improve" things you did not ask about. Stop that in writing.

- "Do not change the Angular app in this phase."
- "Do not add new libraries without asking."
- "Keep today's URLs exactly the same."

### 7. Show examples

One example beats a paragraph of description. Show a sample JSON response, a sample Markdown file,
a sample URL, a sample command. See the subject response example in
[`project/design.md`](./project/design.md#interfaces).

### 8. Use tables and lists for facts, sentences for reasons

- Things with several properties (services, endpoints, environments) → **table**.
- Steps in order → **numbered list**.
- How parts connect → **diagram** (Mermaid works in GitHub and in Markdown).
- Reasons and context → **short sentences**.

Short sentences. One idea per sentence. No filler like "It is important to note that…".

### 9. Use the same word for the same thing

Pick one name and never change it. If the code says `subject`, the spec says `subject` — not "course",
"paper" and "module" in different places. Claude may think three words mean three different things.

### 10. Split big work into phases

Never ask for everything at once. Break the work into phases. Each phase:

- does one thing,
- ends with something that runs,
- has its own "done when" line.

Then ask Claude for **one phase at a time**. Review it, merge it, then ask for the next.

### 11. Point to existing code

Claude copies patterns well. Tell it where the good examples are.

- "Follow the pattern of `libs/curriculum/data-access/src/lib/curriculum.service.ts`."
- "Use the same badge style as `subject-badges.ts`."

### 12. Keep the spec in the repo and keep it true

- Specs live in `docs/specs/`, next to the code, and change through pull requests.
- When a decision changes, **update the spec first**, then the code.
- An outdated spec is worse than no spec: Claude will trust it.

---

## How to ask Claude to work from a spec

A good request names the spec, the part to do, the limits, and the finish line:

```text
Read docs/specs/project/ (requirements.md, design.md and tasks.md, all Approved).
Do task 1.1 from tasks.md only.
Do not change anything under apps/ or libs/.
Run its "Done when" check, tick the box, then stop.
Before you start, list any assumptions or open questions. Ask me if something is unclear.
```

Why each line matters:

| Line                        | What it prevents                          |
| --------------------------- | ----------------------------------------- |
| "Read the spec"             | Claude working from memory or guesses     |
| "Task 1.1 only"             | Doing too much at once                    |
| "Do not change…"            | Surprise edits in other parts of the code |
| "Run its check, tick, stop" | Stopping too early, or never stopping     |
| "List assumptions, ask"     | Silent guesses becoming code              |

---

## Common mistakes

| Mistake                        | What happens                            | Fix                                              |
| ------------------------------ | --------------------------------------- | ------------------------------------------------ |
| Spec only in your head or chat | Next session, Claude has forgotten it   | Write it in `docs/specs/`                        |
| "Make it good / fast / secure" | Claude picks its own meaning            | Give a number or a rule                          |
| No "done when"                 | Work is half finished, or grows forever | One checkable line per task                      |
| Old and new decisions mixed    | Claude follows the old one              | Mark Agreed / Proposed / Open; delete dead ideas |
| Whole project in one request   | Huge, hard-to-review changes            | One phase per request                            |
| Spec and code disagree         | Claude doesn't know which is right      | Update the spec when you change your mind        |

---

## Checklist before you give a spec to Claude

- [ ] The first lines say what this is and why.
- [ ] Every decision is marked Agreed, Proposed or Open.
- [ ] Every decision has a "why".
- [ ] Versions, names, paths and numbers are written out.
- [ ] There is at least one example (JSON, file, command or URL).
- [ ] "Out of scope" / "do not change" is written.
- [ ] Work is split into phases, each with a "done when" line.
- [ ] Open questions are listed, not hidden.
- [ ] The spec is saved in `docs/specs/` and committed.

---

## Files in this folder

| File                                                         | What it is                                                  |
| ------------------------------------------------------------ | ----------------------------------------------------------- |
| [`HOW-TO-WRITE-SPECS.md`](./HOW-TO-WRITE-SPECS.md)           | This guide                                                  |
| [`_templates/requirements.md`](./_templates/requirements.md) | Template for step 1                                         |
| [`_templates/design.md`](./_templates/design.md)             | Template for step 2                                         |
| [`_templates/tasks.md`](./_templates/tasks.md)               | Template for step 3                                         |
| [`project/`](./project/)                                     | The whole project's spec: the live example (step 2, design) |
