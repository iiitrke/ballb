# <Feature name> — Requirements

As of YYYY-MM-DD · Owner: <name> · Next: [design.md](./design.md)

**Approval:** Waiting for review.

**Labels:** _Agreed_ = decided · _Proposed_ = suggestion, not confirmed · _Open_ = not decided, ask first.

## Goal

<!-- One or two sentences: what problem this solves and for whom. No technology here. -->

## Out of scope

<!-- What this feature will NOT do. -->

-

## Constraints

<!--
Technology or rules the owner has ALREADY fixed (e.g. "backend is Spring Boot", "hosted on our VPS").
Keep them here, not inside acceptance criteria. Delete this section if there are none.
-->

| ID  | Constraint | Status |
| --- | ---------- | ------ |
| C1  |            | Agreed |

## Requirements

<!--
One numbered requirement per user need. Each has a user story and acceptance criteria.

Write acceptance criteria in EARS form (Easy Approach to Requirements Syntax):
  - THE SYSTEM SHALL <behaviour>.                      (always true)
  - WHEN <event>, THE SYSTEM SHALL <response>.          (triggered by an event)
  - WHILE <state>, THE SYSTEM SHALL <behaviour>.        (true during a state)
  - IF <unwanted condition>, THEN THE SYSTEM SHALL <response>.  (errors and edge cases)
  - WHERE <feature is enabled>, THE SYSTEM SHALL <behaviour>.   (optional features)

Each criterion must be testable: someone can check it and say yes or no.
Describe WHAT the system does, not HOW it is built. The "how" goes in design.md.
-->

### R1. <Short name>

**User story:** As a <role>, I want <capability>, so that <benefit>.

| ID   | Acceptance criterion                         | Status   |
| ---- | -------------------------------------------- | -------- |
| R1.1 | WHEN <event>, THE SYSTEM SHALL <response>.   | Agreed   |
| R1.2 | IF <condition>, THEN THE SYSTEM SHALL <...>. | Proposed |

## Open questions

- [ ]
