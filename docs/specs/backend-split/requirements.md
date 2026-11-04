# Backend split — Requirements

As of 2026-11-04 · Step 1 of 3 · Next: `design.md` (written after this file is approved)

**Approval:** Waiting for review.

**Labels:** _Agreed_ = decided in discussion on 2026-11-04 · _Proposed_ = Claude's suggestion, not
confirmed · _Open_ = not decided, ask first.

## Goal

Move all portal content out of the website's code into a central content store, so content can change
without rebuilding the website, while students keep the same pages, URLs and English/हिंदी toggle they
have today.

## Out of scope

- An admin screen or any way to edit content from the website. Content is loaded by scripts for now.
- Student accounts, login or personal data.
- Writing new content or new Hindi translations.
- Search across subject content (only the glossary is searchable, as today).

## Constraints

Technology the project owner has already fixed. The design must use these; it does not re-decide them.

| ID  | Constraint                                                                                                                 | Status |
| --- | -------------------------------------------------------------------------------------------------------------------------- | ------ |
| C1  | The frontend is the existing Angular app, rendered on the server with Angular SSR.                                         | Agreed |
| C2  | The backend is Spring Boot microservices behind one API gateway.                                                           | Agreed |
| C3  | Each service owns its own database; no other service reads or writes it.                                                   | Agreed |
| C4  | Content is stored in a database, written as Markdown.                                                                      | Agreed |
| C5  | Staging and production run in Docker on a VPS, behind the existing nginx and Let's Encrypt containers.                     | Agreed |
| C6  | On the VPS, nginx connects only to the gateway, and the gateway connects to the services over the internal Docker network. | Agreed |
| C7  | Deployments run through GitHub Actions.                                                                                    | Agreed |

## Requirements

### R1. Content can change without a redeploy

**User story:** As the content maintainer, I want to update content in one place, so that students see the
change without anyone rebuilding or redeploying the website.

| ID   | Acceptance criterion                                                                                                              | Status   |
| ---- | --------------------------------------------------------------------------------------------------------------------------------- | -------- |
| R1.1 | WHEN content in the content store changes, THE SYSTEM SHALL show the new content within 5 minutes, without a rebuild or redeploy. | Proposed |
| R1.2 | THE SYSTEM SHALL hold each piece of text in English, and optionally in Hindi.                                                     | Proposed |
| R1.3 | WHEN migration is finished, THE SYSTEM SHALL contain all content that the current site shows, with nothing lost.                  | Proposed |

### R2. Students browse semesters and read subjects

**User story:** As a BA.LLB student, I want to browse semesters and read each subject's outline, so that I
know what to study.

| ID   | Acceptance criterion                                                                                                           | Status   |
| ---- | ------------------------------------------------------------------------------------------------------------------------------ | -------- |
| R2.1 | WHEN a student opens `/semesters`, THE SYSTEM SHALL list years 1–5 with their semesters.                                       | Proposed |
| R2.2 | WHEN a student opens `/semesters/{number}`, THE SYSTEM SHALL list that semester's subjects, each badged as official or sample. | Proposed |
| R2.3 | WHEN a student opens `/semesters/{number}/{code}`, THE SYSTEM SHALL show that subject's details and its formatted content.     | Proposed |
| R2.4 | IF the semester or subject code does not exist, THEN THE SYSTEM SHALL show a Not found page and respond with HTTP status 404.  | Proposed |
| R2.5 | THE SYSTEM SHALL keep every URL the current site uses working, unchanged.                                                      | Proposed |

### R3. Students search the glossary

**User story:** As a student, I want to search legal terms and maxims, so that I can quickly find what one
means.

| ID   | Acceptance criterion                                                                                                          | Status   |
| ---- | ----------------------------------------------------------------------------------------------------------------------------- | -------- |
| R3.1 | WHEN a student opens `/glossary`, THE SYSTEM SHALL list all terms with their meaning and context.                             | Proposed |
| R3.2 | WHEN a student types in the search box, THE SYSTEM SHALL filter terms by term, meaning or context without reloading the page. | Proposed |

### R4. Students read in English or Hindi

**User story:** As a student, I want to switch between English and हिंदी, so that I can study in the
language I understand best.

| ID   | Acceptance criterion                                                                                                                   | Status   |
| ---- | -------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| R4.1 | WHEN a student switches language, THE SYSTEM SHALL show Hindi text where it exists and English elsewhere, without reloading the page.  | Proposed |
| R4.2 | WHEN a student who chose Hindi opens any page later, THE SYSTEM SHALL deliver that page already in Hindi, with no English shown first. | Proposed |

### R5. Pages show content immediately

**User story:** As a student on a slow phone connection, I want pages to show content immediately, so that
I don't wait for scripts to load. As the project owner, I want search engines to index the content.

| ID   | Acceptance criterion                                                                                             | Status   |
| ---- | ---------------------------------------------------------------------------------------------------------------- | -------- |
| R5.1 | WHEN any page is requested, THE SYSTEM SHALL return HTML that already contains the page's content.               | Agreed   |
| R5.2 | WHEN a student moves between pages after the first load, THE SYSTEM SHALL update the page without a full reload. | Proposed |
| R5.3 | THE SYSTEM SHALL NOT load the same data twice for the first page a student opens.                                | Proposed |

### R6. The system is safe on the internet

**User story:** As the project owner, I want one controlled entry point and clean content, so that the
server and students stay safe.

| ID   | Acceptance criterion                                                                        | Status   |
| ---- | ------------------------------------------------------------------------------------------- | -------- |
| R6.1 | THE SYSTEM SHALL accept outside traffic through one entry point only.                       | Agreed   |
| R6.2 | THE SYSTEM SHALL NOT make internal services or databases reachable from outside the server. | Agreed   |
| R6.3 | THE SYSTEM SHALL remove scripts and unsafe HTML from content before it reaches the browser. | Proposed |
| R6.4 | THE SYSTEM SHALL serve every page over HTTPS.                                               | Agreed   |

### R7. Development, test, staging and production

**User story:** As the developer, I want a fast local setup, a full local test stack, and separate staging
and production, so that I can work quickly and release safely.

| ID   | Acceptance criterion                                                                                                                                         | Status   |
| ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------- |
| R7.1 | WHILE developing, THE SYSTEM SHALL let the frontend and backend services run directly on the laptop, with the database and other dependencies in containers. | Agreed   |
| R7.2 | THE SYSTEM SHALL provide a test environment that runs the full stack in containers on the laptop with one command.                                           | Agreed   |
| R7.3 | THE SYSTEM SHALL run a staging environment at a staging domain, separate from production.                                                                    | Agreed   |
| R7.4 | THE SYSTEM SHALL run production at the real domain.                                                                                                          | Agreed   |
| R7.5 | WHEN a change is merged to `main`, THE SYSTEM SHALL deploy it to staging automatically.                                                                      | Proposed |
| R7.6 | WHEN a release is approved, THE SYSTEM SHALL deploy to production the same build that was tested on staging.                                                 | Proposed |

## Open questions

- [ ] Production domain name, and whether staging uses `staging.<domain>`.
- [ ] Is 5 minutes (R1.1) an acceptable delay for content changes to appear?
- [ ] A target page load time for students (e.g. first page under 2 seconds on 4G)?
- [ ] Who translates content to Hindi, and in what order.
