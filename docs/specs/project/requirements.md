# BA.LLB Learning Portal — Project Requirements

As of 2026-11-04 · Step 1 of 3 · Next: `design.md` (written after this file is approved)

These are the requirements for the whole project. Later features get their own folder in `docs/specs/`.

**Approval:** Waiting for review.

**Labels:** _Agreed_ = decided in discussion on 2026-11-04 · _Proposed_ = Claude's suggestion, not
confirmed · _Open_ = not decided, ask first.

## Goal

Build a learning portal for BA.LLB students of Shakambhari University where they can browse semesters,
read subject outlines and search a legal glossary, in English or हिंदी. Students can create their own accounts.
Admins manage all content, sections and menus from an admin dashboard, and changes reach students
without rebuilding the website.

The existing Angular prototype in this repository supplies the starting content and page design.

## Out of scope

- Writing new content or new Hindi translations.
- Searching inside the text of subject content. Search covers subject codes and titles (R12) and the glossary (R3).

## Constraints

Technology the project owner has already fixed. The design must use these; it does not re-decide them.

| ID  | Constraint                                                                                                                 | Status |
| --- | -------------------------------------------------------------------------------------------------------------------------- | ------ |
| C1  | The frontend is built with Angular and rendered on the server with Angular SSR.                                            | Agreed |
| C2  | The backend is Spring Boot microservices behind one API gateway.                                                           | Agreed |
| C3  | Each service owns its own database; no other service reads or writes it.                                                   | Agreed |
| C4  | Content is stored in a database, written as Markdown.                                                                      | Agreed |
| C5  | Staging and production run in Docker on a VPS, behind the existing nginx and Let's Encrypt containers.                     | Agreed |
| C6  | On the VPS, nginx connects only to the gateway, and the gateway connects to the services over the internal Docker network. | Agreed |
| C7  | Deployments run through GitHub Actions.                                                                                    | Agreed |

## Requirements

### R1. Content can change without a redeploy

**User story:** As an admin, I want to update content in one place, so that students see the
change without anyone rebuilding or redeploying the website.

| ID   | Acceptance criterion                                                                                                              | Status   |
| ---- | --------------------------------------------------------------------------------------------------------------------------------- | -------- |
| R1.1 | WHEN content in the content store changes, THE SYSTEM SHALL show the new content within 5 minutes, without a rebuild or redeploy. | Proposed |
| R1.2 | THE SYSTEM SHALL hold each piece of text in English, and optionally in Hindi.                                                     | Proposed |
| R1.3 | WHEN the portal launches, THE SYSTEM SHALL contain all content from the existing prototype, with nothing lost.                    | Proposed |

### R2. Students browse semesters and read subjects

**User story:** As a BA.LLB student, I want to browse semesters and read each subject's outline, so that I
know what to study.

| ID   | Acceptance criterion                                                                                                                 | Status   |
| ---- | ------------------------------------------------------------------------------------------------------------------------------------ | -------- |
| R2.1 | WHEN a student opens `/semesters`, THE SYSTEM SHALL list years 1–5 with their semesters.                                             | Proposed |
| R2.2 | WHEN a student opens `/semesters/{number}`, THE SYSTEM SHALL list that semester's subjects, each badged as official or sample.       | Proposed |
| R2.3 | WHEN a student opens `/semesters/{number}/{code}`, THE SYSTEM SHALL show that subject's details and its formatted content.           | Proposed |
| R2.4 | IF the semester or subject code does not exist, THEN THE SYSTEM SHALL show a Not found page and respond with HTTP status 404.        | Proposed |
| R2.5 | THE SYSTEM SHALL serve the built-in pages at `/`, `/semesters`, `/semesters/{number}`, `/semesters/{number}/{code}` and `/glossary`. | Proposed |

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

### R8. Admins sign in to a dashboard

**User story:** As an admin, I want a private dashboard that only admins can use, so that content is
managed safely in one place.

| ID   | Acceptance criterion                                                                                                           | Status   |
| ---- | ------------------------------------------------------------------------------------------------------------------------------ | -------- |
| R8.1 | THE SYSTEM SHALL provide an admin dashboard at `/admin`.                                                                       | Proposed |
| R8.2 | WHEN someone who is not signed in opens the dashboard, THE SYSTEM SHALL ask them to sign in.                                   | Agreed   |
| R8.3 | THE SYSTEM SHALL allow only admin accounts to open the dashboard and change content; student accounts cannot.                  | Agreed   |
| R8.4 | IF sign-in fails 5 times within 15 minutes for one account, THEN THE SYSTEM SHALL block that account's sign-in for 15 minutes. | Proposed |
| R8.5 | WHEN an admin is inactive for 30 minutes, THE SYSTEM SHALL sign them out.                                                      | Proposed |

### R9. Admins create, modify and disable content

**User story:** As an admin, I want to create, edit and disable semesters, subjects, glossary terms and
pages, so that the portal always shows correct, current content.

| ID   | Acceptance criterion                                                                                                      | Status   |
| ---- | ------------------------------------------------------------------------------------------------------------------------- | -------- |
| R9.1 | WHEN an admin creates a semester, subject, glossary term or page, THE SYSTEM SHALL save it and show it to students.       | Agreed   |
| R9.2 | WHEN an admin edits any content item, THE SYSTEM SHALL save the change and show it to students within the time in R1.1.   | Agreed   |
| R9.3 | WHEN an admin disables a content item, THE SYSTEM SHALL hide it from students without deleting it.                        | Agreed   |
| R9.4 | WHEN an admin re-enables a disabled item, THE SYSTEM SHALL show it to students again.                                     | Proposed |
| R9.5 | THE SYSTEM SHALL let admins write content in Markdown, with a preview of how students will see it.                        | Proposed |
| R9.6 | THE SYSTEM SHALL let admins enter English and Hindi text side by side, with Hindi optional.                               | Proposed |
| R9.7 | IF a required field is empty when an admin saves, THEN THE SYSTEM SHALL not save and SHALL show which fields are missing. | Proposed |
| R9.8 | THE SYSTEM SHALL record which admin made each change and when.                                                            | Proposed |
| R9.9 | WHILE a content item is disabled, THE SYSTEM SHALL still show it in the dashboard, marked as disabled.                    | Proposed |

### R10. Admins manage sections and menus

**User story:** As an admin, I want to add new sections and arrange the site's menus, so that the portal
can grow beyond semesters and the glossary without a developer.

| ID    | Acceptance criterion                                                                                                             | Status   |
| ----- | -------------------------------------------------------------------------------------------------------------------------------- | -------- |
| R10.1 | WHEN an admin creates a section, THE SYSTEM SHALL publish it at its own address chosen by the admin (for example `/moot-court`). | Agreed   |
| R10.2 | THE SYSTEM SHALL let a section hold pages written in Markdown, in the order the admin sets.                                      | Proposed |
| R10.3 | WHEN an admin adds, removes, renames or reorders a menu item, THE SYSTEM SHALL show the updated menu to students.                | Agreed   |
| R10.4 | THE SYSTEM SHALL let a menu item link to a built-in page, a section, a page or an outside website.                               | Proposed |
| R10.5 | WHEN an admin disables a section or menu item, THE SYSTEM SHALL hide it from students without deleting it.                       | Agreed   |
| R10.6 | IF an admin chooses an address that is already used, THEN THE SYSTEM SHALL refuse it and say which item uses it.                 | Proposed |
| R10.7 | IF an admin disables a section, THEN THE SYSTEM SHALL also hide menu items that link to it.                                      | Proposed |

### R11. Students have accounts

**User story:** As a student, I want my own account, so that the portal can offer me features tied to me.

| ID     | Acceptance criterion                                                                                                                    | Status   |
| ------ | --------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| R11.1  | WHEN a student signs up with their name, email and a password, THE SYSTEM SHALL create a student account.                               | Agreed   |
| R11.2  | WHEN a student signs up, THE SYSTEM SHALL confirm the email address before the account can be used.                                     | Proposed |
| R11.3  | WHEN a student signs in with a correct email and password, THE SYSTEM SHALL sign them in; WHEN they sign out, it SHALL end the session. | Agreed   |
| R11.4  | WHEN a student asks to reset a forgotten password, THE SYSTEM SHALL email a reset link that works once and expires after 1 hour.        | Proposed |
| R11.5  | IF sign-in fails 5 times within 15 minutes for one account, THEN THE SYSTEM SHALL block that account's sign-in for 15 minutes.          | Proposed |
| R11.6  | THE SYSTEM SHALL let a student view and edit their own name and change their password.                                                  | Proposed |
| R11.7  | WHEN a student deletes their account, THE SYSTEM SHALL remove their personal data.                                                      | Proposed |
| R11.8  | THE SYSTEM SHALL collect only the personal data the portal needs, and SHALL tell students what it stores and why.                       | Proposed |
| R11.9  | WHEN an admin disables a student account, THE SYSTEM SHALL stop that student from signing in.                                           | Proposed |
| R11.10 | THE SYSTEM SHALL let anyone read the portal's content without signing in.                                                               | Open     |

### R12. Users search subjects by code

**User story:** As a student, I want to type a paper code and go straight to that subject, so that I don't
have to browse through semesters to find it.

| ID    | Acceptance criterion                                                                                                                                                            | Status   |
| ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| R12.1 | THE SYSTEM SHALL provide a search box on every page that finds subjects by their code.                                                                                          | Agreed   |
| R12.2 | WHEN a user types a full or partial code (for example `1078` or `bl-10`), THE SYSTEM SHALL list matching subjects with code, title and semester, ignoring upper and lower case. | Proposed |
| R12.3 | THE SYSTEM SHALL also match subject titles, in English and in Hindi.                                                                                                            | Proposed |
| R12.4 | WHEN a user enters a code that matches exactly one subject, THE SYSTEM SHALL open that subject's page.                                                                          | Proposed |
| R12.5 | IF no subject matches, THEN THE SYSTEM SHALL say so and suggest browsing semesters.                                                                                             | Proposed |
| R12.6 | THE SYSTEM SHALL NOT show disabled subjects in search results.                                                                                                                  | Proposed |
| R12.7 | THE SYSTEM SHALL allow search without signing in.                                                                                                                               | Open     |

## Open questions

- [ ] Production domain name, and whether staging uses `staging.<domain>`.
- [ ] Is 5 minutes (R1.1) an acceptable delay for content changes to appear?
- [ ] A target page load time for students (e.g. first page under 2 seconds on 4G)?
- [ ] Who translates content to Hindi, and in what order.
- [ ] Admins: one person or several? Do they need different roles (for example editor vs. super admin)?
- [ ] Sign-in method for admins: email and password, or a Google account?
- [ ] Who creates admin accounts, and how is the first admin created?
- [ ] Should changes go live as soon as an admin saves, or be saved as a draft and published later?
- [ ] Do admins need version history (see and undo earlier versions)?
- [ ] Can admins permanently delete content, or only disable it? (Proposed: disable only.)
- [ ] Besides Markdown pages, what else can a new section hold (for example lists, links, uploaded PDFs or images)?
- [ ] Can admins add menus in more than one place (top menu, footer), or only the main menu?
- [ ] What can students do only when signed in (for example bookmarks, reading progress, notes, quizzes)? Without this, accounts have no purpose yet.
- [ ] Must students sign in to read content, or is reading open to everyone (R11.10)?
- [ ] Can anyone sign up, or only Shakambhari University students (for example by university email or enrolment number)?
- [ ] Sign-in method for students: email and password, Google account, or both?
- [ ] Search (R12): codes only, or codes and titles? Should it later search glossary terms from the same box?
