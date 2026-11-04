# Backend split — Requirements

As of 2026-11-04 · Next: [design.md](./design.md) · Then: [tasks.md](./tasks.md)

**Labels:** _Agreed_ = decided in discussion on 2026-11-04 · _Proposed_ = Claude's suggestion, not
confirmed · _Open_ = not decided, ask first.

## Goal

Move all portal content out of the Angular code into a database, so content can change without
rebuilding the website, while students keep the same pages, URLs and English/हिंदी toggle they have today.

## Out of scope

- An admin screen or any way to edit content from the website. Content is loaded by scripts for now.
- Student accounts, login or personal data.
- Writing new content or new Hindi translations.
- Search across subject content (only the glossary is searchable, as today).

## Requirements

### R1. Content lives in a database

**User story:** As the content maintainer, I want all content stored in a database as Markdown, so that I
can update it without changing or redeploying the frontend.

| ID   | Acceptance criterion                                                                                                                  | Status   |
| ---- | ------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| R1.1 | THE SYSTEM SHALL store every semester, subject and glossary term in a database.                                                       | Agreed   |
| R1.2 | THE SYSTEM SHALL store text that students read as Markdown.                                                                           | Agreed   |
| R1.3 | THE SYSTEM SHALL store each piece of text in English, and optionally in Hindi.                                                        | Proposed |
| R1.4 | WHEN content changes in the database, THE SYSTEM SHALL show the new content within 5 minutes, without a frontend rebuild or redeploy. | Proposed |
| R1.5 | THE SYSTEM SHALL contain all content that the current site shows, with nothing lost, after migration.                                 | Proposed |

### R2. Students browse semesters and read subjects

**User story:** As a BA.LLB student, I want to browse semesters and read each subject's outline, so that I
know what to study.

| ID   | Acceptance criterion                                                                                                                    | Status   |
| ---- | --------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| R2.1 | WHEN a student opens `/semesters`, THE SYSTEM SHALL list years 1–5 with their semesters.                                                | Proposed |
| R2.2 | WHEN a student opens `/semesters/{number}`, THE SYSTEM SHALL list that semester's subjects, each badged as official or sample.          | Proposed |
| R2.3 | WHEN a student opens `/semesters/{number}/{code}`, THE SYSTEM SHALL show that subject's details and its content rendered from Markdown. | Proposed |
| R2.4 | IF the semester or subject code does not exist, THEN THE SYSTEM SHALL show a Not found page and respond with HTTP status 404.           | Proposed |
| R2.5 | THE SYSTEM SHALL keep every URL the current site uses working, unchanged.                                                               | Proposed |

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

| ID   | Acceptance criterion                                                                                                                  | Status   |
| ---- | ------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| R4.1 | WHEN a student switches language, THE SYSTEM SHALL show Hindi text where it exists and English elsewhere, without reloading the page. | Proposed |
| R4.2 | WHEN a student who chose Hindi opens any page later, THE SYSTEM SHALL send that page already in Hindi from the server.                | Proposed |

### R5. Pages are rendered on the server

**User story:** As a student on a slow phone connection, I want pages to show content immediately, so that
I don't wait for scripts to load. As the project owner, I want search engines to index the content.

| ID   | Acceptance criterion                                                                                                         | Status   |
| ---- | ---------------------------------------------------------------------------------------------------------------------------- | -------- |
| R5.1 | WHEN any page is requested, THE SYSTEM SHALL return HTML that already contains the page's content (rendered by Angular SSR). | Agreed   |
| R5.2 | WHEN a student moves between pages after the first load, THE SYSTEM SHALL update the page without a full reload.             | Proposed |
| R5.3 | THE SYSTEM SHALL NOT fetch the same data twice for the first page (once on the server and again in the browser).             | Proposed |

### R6. The system is safe to run on the internet

**User story:** As the project owner, I want only the intended entry point exposed and content cleaned,
so that the server and students stay safe.

| ID   | Acceptance criterion                                                                                               | Status   |
| ---- | ------------------------------------------------------------------------------------------------------------------ | -------- |
| R6.1 | THE SYSTEM SHALL accept outside traffic only through the existing nginx, and nginx SHALL reach only the gateway.   | Agreed   |
| R6.2 | THE SYSTEM SHALL NOT expose the services or the database outside the Docker network on the VPS.                    | Agreed   |
| R6.3 | THE SYSTEM SHALL remove scripts and unsafe HTML from content rendered from Markdown before it reaches the browser. | Proposed |
| R6.4 | THE SYSTEM SHALL serve every page over HTTPS, using the existing Let's Encrypt setup.                              | Agreed   |

### R7. The backend is made of independent services

**User story:** As the developer, I want the backend split into Spring Boot microservices that each own
their data, so that each part can change and deploy on its own.

| ID   | Acceptance criterion                                                                         | Status |
| ---- | -------------------------------------------------------------------------------------------- | ------ |
| R7.1 | THE SYSTEM SHALL implement the backend as Spring Boot microservices behind one gateway.      | Agreed |
| R7.2 | THE SYSTEM SHALL give each service its own database, which no other service reads or writes. | Agreed |

### R8. Development, test, staging and production environments

**User story:** As the developer, I want a fast local setup, a full local test stack, and separate staging
and production on the VPS, so that I can work quickly and release safely.

| ID   | Acceptance criterion                                                                                                                                    | Status   |
| ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| R8.1 | WHILE developing, THE SYSTEM SHALL run Angular and the Spring Boot services directly on the laptop, with the database and other dependencies in Docker. | Agreed   |
| R8.2 | THE SYSTEM SHALL provide a test environment that runs the full stack in containers on the laptop with one command.                                      | Agreed   |
| R8.3 | THE SYSTEM SHALL run staging on the VPS in Docker at a staging domain, separate from production.                                                        | Agreed   |
| R8.4 | THE SYSTEM SHALL run production on the VPS in Docker at the real domain.                                                                                | Agreed   |
| R8.5 | THE SYSTEM SHALL deploy to staging and production through GitHub Actions.                                                                               | Agreed   |
| R8.6 | WHEN a change is merged to `main`, THE SYSTEM SHALL deploy it to staging.                                                                               | Proposed |
| R8.7 | WHEN a version tag `v*` is pushed and approved, THE SYSTEM SHALL deploy those staging-tested images to production.                                      | Proposed |

## Open questions

- [ ] Production domain name, and whether staging uses `staging.<domain>`.
- [ ] Is 5 minutes (R1.4) an acceptable delay for content changes to appear?
- [ ] A target page load time for students (e.g. first page under 2 seconds on 4G)?
- [ ] Who translates content to Hindi, and in what order.
