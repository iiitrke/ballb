# BA.LLB Learning Portal — Project Requirements

As of 2026-11-04 · Step 1 of 3 · Next: [design.md](./design.md)

These are the requirements for the whole project. Later features get their own folder in `docs/specs/`.

**Approval:** Approved 2026-11-04. Changed 2026-11-04: C5 (staging gets its own server), waiting for review. All items that were Proposed were accepted as written and are now Agreed.
Open questions below are settled during design.

**Labels:** _Agreed_ = decided in discussion on 2026-11-04 · _Proposed_ = Claude's suggestion, not
confirmed · _Open_ = not decided, ask first.

## Goal

Build a learning portal for BA.LLB students of Shakambhari University where they can browse semesters,
read subject outlines and search subjects and a legal glossary, in English or हिंदी. Public content is open
to everyone. Anyone can create an account, which prepares the portal for paid content and offers later.
Admins manage all content, sections and menus from an admin dashboard, and changes reach students
without rebuilding the website.

The existing Angular prototype in this repository supplies the starting content and page design.

## Out of scope

- Writing new content or new Hindi translations.
- Paid content, payments and subscriptions. Planned for the future; accounts (R11) prepare for them.
- Affiliate marketing and offers features. Planned for the future; R11.10 collects consent now.
- Drafts, scheduled publishing and version history. Admin changes go live when saved (R9.10).
- Searching inside the text of subject content. Search covers subject codes and titles (R12) and the glossary (R3).

## Constraints

Technology the project owner has already fixed. The design must use these; it does not re-decide them.

| ID  | Constraint                                                                                                                                                                                                                                               | Status                      |
| --- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| C1  | The frontend is built with Angular and rendered on the server with Angular SSR.                                                                                                                                                                          | Agreed                      |
| C2  | The backend is Spring Boot microservices behind one API gateway.                                                                                                                                                                                         | Agreed                      |
| C3  | Each service owns its own database; no other service reads or writes it.                                                                                                                                                                                 | Agreed                      |
| C4  | Content is stored in a database, written as Markdown.                                                                                                                                                                                                    | Agreed                      |
| C5  | Production runs in Docker on the VPS, behind the existing nginx and Let's Encrypt containers. Staging runs in Docker on a staging host (no Docker in Docker), behind nginx-proxy and Let's Encrypt ([staging server spec](../staging-server/requirements.md)). | Changed, waiting for review |
| C6  | On the VPS, nginx connects only to the gateway, and the gateway connects to the services over the internal Docker network.                                                                                                                               | Agreed                      |
| C7  | Deployments run through GitHub Actions.                                                                                                                                                                                                                  | Agreed                      |
| C8  | The repository root holds one folder per service, frontend and backend alike. Each folder is self-contained: its own code, build files, dependencies and Dockerfile.                                                                                     | Agreed                      |
| C9  | The current Angular project moves from the repository root into its own frontend folder.                                                                                                                                                                 | Agreed                      |
| C10 | All services stay in the one existing GitHub repository, with `.github/` at its root (GitHub Actions reads workflows only from there).                                                                                                                   | Agreed                      |
| C11 | Folder names: `frontend/` for the Angular app, `gateway/` for the API gateway, and `<name>-service/` for each backend service (for example `curriculum-service/`).                                                                                       | Agreed                      |
| C12 | `docs/` and the Docker Compose files stay at the repository root, outside the service folders.                                                                                                                                                           | Agreed                      |

## Requirements

### R1. Content can change without a redeploy

**User story:** As an admin, I want to update content in one place, so that students see the
change without anyone rebuilding or redeploying the website.

| ID   | Acceptance criterion                                                                                                              | Status |
| ---- | --------------------------------------------------------------------------------------------------------------------------------- | ------ |
| R1.1 | WHEN content in the content store changes, THE SYSTEM SHALL show the new content within 5 minutes, without a rebuild or redeploy. | Agreed |
| R1.2 | THE SYSTEM SHALL hold each piece of text in English, and optionally in Hindi.                                                     | Agreed |
| R1.3 | WHEN the portal launches, THE SYSTEM SHALL contain all content from the existing prototype, with nothing lost.                    | Agreed |

### R2. Students browse semesters and read subjects

**User story:** As a BA.LLB student, I want to browse semesters and read each subject's outline, so that I
know what to study.

| ID   | Acceptance criterion                                                                                                                 | Status |
| ---- | ------------------------------------------------------------------------------------------------------------------------------------ | ------ |
| R2.1 | WHEN a student opens `/semesters`, THE SYSTEM SHALL list years 1–5 with their semesters.                                             | Agreed |
| R2.2 | WHEN a student opens `/semesters/{number}`, THE SYSTEM SHALL list that semester's subjects, each badged as official or sample.       | Agreed |
| R2.3 | WHEN a student opens `/semesters/{number}/{code}`, THE SYSTEM SHALL show that subject's details and its formatted content.           | Agreed |
| R2.4 | IF the semester or subject code does not exist, THEN THE SYSTEM SHALL show a Not found page and respond with HTTP status 404.        | Agreed |
| R2.5 | THE SYSTEM SHALL serve the built-in pages at `/`, `/semesters`, `/semesters/{number}`, `/semesters/{number}/{code}` and `/glossary`. | Agreed |

### R3. Students search the glossary

**User story:** As a student, I want to search legal terms and maxims, so that I can quickly find what one
means.

| ID   | Acceptance criterion                                                                                                          | Status |
| ---- | ----------------------------------------------------------------------------------------------------------------------------- | ------ |
| R3.1 | WHEN a student opens `/glossary`, THE SYSTEM SHALL list all terms with their meaning and context.                             | Agreed |
| R3.2 | WHEN a student types in the search box, THE SYSTEM SHALL filter terms by term, meaning or context without reloading the page. | Agreed |

### R4. Students read in English or Hindi

**User story:** As a student, I want to switch between English and हिंदी, so that I can study in the
language I understand best.

| ID   | Acceptance criterion                                                                                                                   | Status |
| ---- | -------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| R4.1 | WHEN a student switches language, THE SYSTEM SHALL show Hindi text where it exists and English elsewhere, without reloading the page.  | Agreed |
| R4.2 | WHEN a student who chose Hindi opens any page later, THE SYSTEM SHALL deliver that page already in Hindi, with no English shown first. | Agreed |

### R5. Pages show content immediately

**User story:** As a student on a slow phone connection, I want pages to show content immediately, so that
I don't wait for scripts to load. As the project owner, I want search engines to index the content.

| ID   | Acceptance criterion                                                                                             | Status |
| ---- | ---------------------------------------------------------------------------------------------------------------- | ------ |
| R5.1 | WHEN any page is requested, THE SYSTEM SHALL return HTML that already contains the page's content.               | Agreed |
| R5.2 | WHEN a student moves between pages after the first load, THE SYSTEM SHALL update the page without a full reload. | Agreed |
| R5.3 | THE SYSTEM SHALL NOT load the same data twice for the first page a student opens.                                | Agreed |

### R6. The system is safe on the internet

**User story:** As the project owner, I want one controlled entry point and clean content, so that the
server and students stay safe.

| ID   | Acceptance criterion                                                                        | Status |
| ---- | ------------------------------------------------------------------------------------------- | ------ |
| R6.1 | THE SYSTEM SHALL accept outside traffic through one entry point only.                       | Agreed |
| R6.2 | THE SYSTEM SHALL NOT make internal services or databases reachable from outside the server. | Agreed |
| R6.3 | THE SYSTEM SHALL remove scripts and unsafe HTML from content before it reaches the browser. | Agreed |
| R6.4 | THE SYSTEM SHALL serve every page over HTTPS.                                               | Agreed |

### R7. Development, test, staging and production

**User story:** As the developer, I want a fast local setup, a full local test stack, and separate staging
and production, so that I can work quickly and release safely.

| ID   | Acceptance criterion                                                                                                                                         | Status |
| ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------ |
| R7.1 | WHILE developing, THE SYSTEM SHALL let the frontend and backend services run directly on the laptop, with the database and other dependencies in containers. | Agreed |
| R7.2 | THE SYSTEM SHALL provide a test environment that runs the full stack in containers on the laptop with one command.                                           | Agreed |
| R7.3 | THE SYSTEM SHALL run a staging environment at a staging domain, separate from production.                                                                    | Agreed |
| R7.4 | THE SYSTEM SHALL run production at the real domain.                                                                                                          | Agreed |
| R7.5 | WHEN a change is merged to `main`, THE SYSTEM SHALL deploy it to staging automatically.                                                                      | Agreed |
| R7.6 | WHEN a release is approved, THE SYSTEM SHALL deploy to production the same build that was tested on staging.                                                 | Agreed |

### R8. Admins sign in to a dashboard

**User story:** As an admin, I want a private dashboard where each admin has the right level of access, so
that content is managed safely in one place.

| ID    | Acceptance criterion                                                                                                                                                             | Status |
| ----- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| R8.1  | THE SYSTEM SHALL provide an admin dashboard at `/admin`.                                                                                                                         | Agreed |
| R8.2  | WHEN someone who is not signed in opens the dashboard, THE SYSTEM SHALL ask them to sign in.                                                                                     | Agreed |
| R8.3  | THE SYSTEM SHALL allow only admin accounts to open the dashboard and change content; student accounts cannot.                                                                    | Agreed |
| R8.4  | THE SYSTEM SHALL support several admin accounts, each with a role.                                                                                                               | Agreed |
| R8.5  | THE SYSTEM SHALL have two roles: **Super admin** (everything, including managing admin accounts and roles) and **Editor** (content, sections and menus, but not admin accounts). | Agreed |
| R8.6  | WHEN a super admin adds an admin, changes an admin's role or disables an admin, THE SYSTEM SHALL apply it from that admin's next action.                                         | Agreed |
| R8.7  | THE SYSTEM SHALL let admins sign in with the same methods as students (R11.2).                                                                                                   | Agreed |
| R8.8  | THE SYSTEM SHALL create the first super admin during installation, never through public sign-up.                                                                                 | Agreed |
| R8.9  | IF sign-in fails 5 times within 15 minutes for one account, THEN THE SYSTEM SHALL block that account's sign-in for 15 minutes.                                                   | Agreed |
| R8.10 | WHEN an admin is inactive for 30 minutes, THE SYSTEM SHALL sign them out.                                                                                                        | Agreed |

### R9. Admins create, modify and disable content

**User story:** As an admin, I want to create, edit and disable semesters, subjects, glossary terms and
pages, so that the portal always shows correct, current content.

| ID    | Acceptance criterion                                                                                                      | Status |
| ----- | ------------------------------------------------------------------------------------------------------------------------- | ------ |
| R9.1  | WHEN an admin creates a semester, subject, glossary term or page, THE SYSTEM SHALL save it and show it to students.       | Agreed |
| R9.2  | WHEN an admin edits any content item, THE SYSTEM SHALL save the change and show it to students within the time in R1.1.   | Agreed |
| R9.3  | WHEN an admin disables a content item, THE SYSTEM SHALL hide it from students without deleting it.                        | Agreed |
| R9.4  | WHEN an admin re-enables a disabled item, THE SYSTEM SHALL show it to students again.                                     | Agreed |
| R9.5  | THE SYSTEM SHALL let admins write content in Markdown, with a preview of how students will see it.                        | Agreed |
| R9.6  | THE SYSTEM SHALL let admins enter English and Hindi text side by side, with Hindi optional.                               | Agreed |
| R9.7  | IF a required field is empty when an admin saves, THEN THE SYSTEM SHALL not save and SHALL show which fields are missing. | Agreed |
| R9.8  | THE SYSTEM SHALL record which admin made each change and when.                                                            | Agreed |
| R9.9  | WHILE a content item is disabled, THE SYSTEM SHALL still show it in the dashboard, marked as disabled.                    | Agreed |
| R9.10 | WHEN an admin saves a change, THE SYSTEM SHALL make it live straight away, with no draft or approval step.                | Agreed |

### R10. Admins manage sections and menus

**User story:** As an admin, I want to add new sections and arrange the site's menus, so that the portal
can grow beyond semesters and the glossary without a developer.

| ID    | Acceptance criterion                                                                                                             | Status |
| ----- | -------------------------------------------------------------------------------------------------------------------------------- | ------ |
| R10.1 | WHEN an admin creates a section, THE SYSTEM SHALL publish it at its own address chosen by the admin (for example `/moot-court`). | Agreed |
| R10.2 | THE SYSTEM SHALL let a section hold pages written in Markdown, in the order the admin sets.                                      | Agreed |
| R10.3 | WHEN an admin adds, removes, renames or reorders a menu item, THE SYSTEM SHALL show the updated menu to students.                | Agreed |
| R10.4 | THE SYSTEM SHALL let a menu item link to a built-in page, a section, a page or an outside website.                               | Agreed |
| R10.5 | WHEN an admin disables a section or menu item, THE SYSTEM SHALL hide it from students without deleting it.                       | Agreed |
| R10.6 | IF an admin chooses an address that is already used, THEN THE SYSTEM SHALL refuse it and say which item uses it.                 | Agreed |
| R10.7 | IF an admin disables a section, THEN THE SYSTEM SHALL also hide menu items that link to it.                                      | Agreed |

### R11. Anyone can have an account

**User story:** As a visitor, I want my own account, so that I can use member features as the portal adds
them, such as paid content and offers.

| ID     | Acceptance criterion                                                                                                                                                                | Status |
| ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| R11.1  | THE SYSTEM SHALL let anyone sign up, with no restriction by gender, age, religion or any other personal characteristic.                                                             | Agreed |
| R11.2  | THE SYSTEM SHALL let users sign up and sign in with any of: email and password; mobile number with a one-time code; single sign-on (SSO) with an outside account.                   | Agreed |
| R11.3  | WHEN a user signs up with an email address or mobile number, THE SYSTEM SHALL confirm it before the account can be used.                                                            | Agreed |
| R11.4  | WHEN a user signs in correctly, THE SYSTEM SHALL sign them in; WHEN they sign out, it SHALL end the session.                                                                        | Agreed |
| R11.5  | WHEN a user with a password asks to reset it, THE SYSTEM SHALL send a reset link that works once and expires after 1 hour.                                                          | Agreed |
| R11.6  | IF sign-in fails 5 times within 15 minutes for one account, THEN THE SYSTEM SHALL block that account's sign-in for 15 minutes.                                                      | Agreed |
| R11.7  | THE SYSTEM SHALL let users view and edit their own name and contact details, and change their password.                                                                             | Agreed |
| R11.8  | WHEN a user deletes their account, THE SYSTEM SHALL remove their personal data.                                                                                                     | Agreed |
| R11.9  | THE SYSTEM SHALL collect only the personal data the portal needs, SHALL NOT ask for gender, age or religion, and SHALL tell users what it stores and why.                           | Agreed |
| R11.10 | WHEN a user signs up, THE SYSTEM SHALL ask separately whether they agree to receive offers and marketing messages, unticked by default, and SHALL let them change this at any time. | Agreed |
| R11.11 | WHEN an admin disables a user account, THE SYSTEM SHALL stop that user from signing in.                                                                                             | Agreed |
| R11.12 | THE SYSTEM SHALL let anyone read public content and use search without signing in.                                                                                                  | Agreed |

### R12. Users search subjects by code

**User story:** As a student, I want to type a paper code and go straight to that subject, so that I don't
have to browse through semesters to find it.

| ID    | Acceptance criterion                                                                                                                                                            | Status |
| ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| R12.1 | THE SYSTEM SHALL provide a search box on every page that finds subjects by their code.                                                                                          | Agreed |
| R12.2 | WHEN a user types a full or partial code (for example `1078` or `bl-10`), THE SYSTEM SHALL list matching subjects with code, title and semester, ignoring upper and lower case. | Agreed |
| R12.3 | THE SYSTEM SHALL also match subject titles, in English and in Hindi.                                                                                                            | Agreed |
| R12.4 | WHEN a user enters a code that matches exactly one subject, THE SYSTEM SHALL open that subject's page.                                                                          | Agreed |
| R12.5 | IF no subject matches, THEN THE SYSTEM SHALL say so and suggest browsing semesters.                                                                                             | Agreed |
| R12.6 | THE SYSTEM SHALL NOT show disabled subjects in search results.                                                                                                                  | Agreed |

## Open questions

- [ ] Production domain name, and whether staging uses `staging.<domain>`.
- [ ] Is 5 minutes (R1.1) an acceptable delay for content changes to appear?
- [ ] A target page load time for students (e.g. first page under 2 seconds on 4G)?
- [ ] Who translates content to Hindi, and in what order.
- [ ] SSO (R11.2): which providers? For example Google, Microsoft, Apple, Facebook.
- [ ] Mobile sign-in (R11.2) sends one-time codes by SMS, which costs money per message. Which SMS provider, and is that cost accepted?
- [ ] Users under 18: India's Digital Personal Data Protection Act, 2023 requires verifiable parental consent to process a child's personal data. Block under-18 sign-ups, or add parental consent? Confirm with a legal advisor.
- [ ] Are two admin roles (Super admin, Editor) enough (R8.5)?
- [ ] Can admins permanently delete content, or only disable it? (Proposed: disable only.)
- [ ] Besides Markdown pages, what else can a new section hold (for example lists, links, uploaded PDFs or images)?
- [ ] Can admins add menus in more than one place (top menu, footer), or only the main menu?
- [ ] Should glossary terms later be searchable from the same search box (R12)?
