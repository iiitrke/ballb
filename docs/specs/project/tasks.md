# BA.LLB Learning Portal — Tasks

As of 2026-11-04 · Step 3 of 3 · Requirements: [requirements.md](./requirements.md) · Design:
[design.md](./design.md)

**Approval:** Approved 2026-11-04. Changed 2026-11-04: task 7.2 (staging host), approved 2026-11-04; changed again 2026-11-04 (same VPS), approved 2026-11-04.

**How to use this file:** do one task at a time, in order. A task is finished only when its "Done when"
check passes. Then tick its box (`- [x]`) in the same change as the code. Each phase is merged to `main`
on its own branch before the next phase starts.

## Phase 0: Repository layout

- [x] **0.1 Move the Angular project into `frontend/`**
  - Do: `git mv` `apps/`, `libs/`, `nx.json`, `package.json`, `package-lock.json`, `tsconfig.base.json`,
    `eslint.config.mjs`, `.prettierrc` and `.prettierignore` into `frontend/`; delete root `node_modules/`,
    `dist/`, `.nx/`, `.angular/`. `.editorconfig`, `.gitignore`, `README.md`, `CLAUDE.md`, `docs/` stay at the root.
  - Done when: `cd frontend && npm ci && npx nx build ballb-portal && npx nx run-many -t lint` all pass, and
    the root holds no Angular or Node files outside `frontend/`.
  - Covers: C8, C9, C11, C12
- [ ] **0.2 Point the GitHub Pages workflow at `frontend/`**
  - Do: in `.github/workflows/deploy-pages.yml`, run install and build in `frontend/` and upload
    `frontend/dist/apps/ballb-portal/browser`.
  - Done when: the workflow's commands, run locally from the same folder, produce the artifact; after a
    push to `deploy`, the Pages site still loads.
  - Covers: C10
- [x] **0.3 Update commands in `README.md` and `CLAUDE.md`**
  - Do: every command names the folder it runs in (for example `cd frontend && npx nx serve ballb-portal`).
  - Done when: each listed command runs from where it says.
  - Covers: C8

## Phase 1: Local infrastructure and service skeletons

Each service folder gets: Maven wrapper, Spring Boot 4.0.9, Java 17, Actuator, Flyway, a `dev` profile
reading `DB_URL`, `DB_USER`, `DB_PASSWORD` with local defaults, and a Testcontainers context test.

- [ ] **1.1 Docker Compose for development**
  - Do: `docker/docker-compose.dev.yml` with PostgreSQL 17 (port 5432 on localhost) and Mailpit (fake email
    inbox, web UI on 8025); `docker/postgres/init/01-create-databases.sh` creating databases and users
    `identity`, `curriculum`, `glossary`, `site`, `notification`; `docker/.env.example`.
  - Done when: `docker compose -f docker/docker-compose.dev.yml up -d` starts both; `psql` lists the five
    databases, each owned by its own user; `http://localhost:8025` opens Mailpit.
  - Covers: C3, C12, R7.1
- [ ] **1.2 `curriculum-service` skeleton** (port 8082)
  - Do: Flyway `V1__schema.sql` with `semester`, `subject`, `audit_log` as in the design.
  - Done when: `./mvnw spring-boot:run -Dspring-boot.run.profiles=dev` starts, `/actuator/health` is `UP`,
    the tables exist, and `./mvnw verify` passes.
  - Covers: C2, C3, C4, C8, C11
- [ ] **1.3 `glossary-service` skeleton** (port 8083)
  - Do: `V1__schema.sql` with `glossary_term`, `audit_log`.
  - Done when: same checks as 1.2.
  - Covers: C2, C3, C4, C8, C11
- [ ] **1.4 `site-service` skeleton** (port 8084)
  - Do: `V1__schema.sql` with `section`, `page`, `menu_item`, `reserved_slug` (seeded), `audit_log`.
  - Done when: same checks as 1.2, and `reserved_slug` holds the six reserved words.
  - Covers: C2, C3, C8, C11, R10.6
- [ ] **1.5 `identity-service` skeleton** (port 8081)
  - Do: `V1__schema.sql` with `app_user`, `sso_identity`, `one_time_code`, `refresh_token`.
  - Done when: same checks as 1.2.
  - Covers: C2, C3, C8, C11
- [ ] **1.6 `notification-service` skeleton** (port 8085)
  - Do: `V1__schema.sql` with `delivery_log`.
  - Done when: same checks as 1.2.
  - Covers: C2, C3, C8, C11
- [ ] **1.7 `gateway` skeleton** (port 8080)
  - Do: Spring Cloud Gateway routing `/api/identity/**`, `/api/curriculum/**`, `/api/glossary/**`,
    `/api/site/**` to their services and `/**` to the frontend; no route for `/internal/**`.
  - Done when: `/actuator/health` is `UP`; `curl -i localhost:8080/api/curriculum/x` returns a 404 from
    curriculum-service (not a 503); `curl -i localhost:8080/internal/x` never reaches a service.
  - Covers: C2, C6, R6.2
- [ ] **1.8 "Run locally" guide**
  - Do: a section in the root `README.md`: start Compose, run each service, run the frontend, ports.
  - Done when: following only that section, every service reports `UP`.
  - Covers: R7.1

## Phase 2: Public content APIs

- [ ] **2.1 Markdown rendering and cleaning** (curriculum-service; copied into glossary and site)
  - Do: flexmark-java renderer plus OWASP Java HTML Sanitizer allow-list.
  - Done when: unit tests show headings, lists and tables render, and `<script>`, `onclick=` and
    `javascript:` links are removed.
  - Covers: R6.3, C4
- [ ] **2.2 Export the prototype's content**
  - Do: `tools/content-export/` script reads `curriculum.data.ts`, `official-papers.data.ts`,
    `glossary.data.ts` and writes `V2__seed.sql` for curriculum and glossary.
  - Done when: after migration, row counts of semesters, subjects and terms equal the counts in the
    prototype files, and a spot-check of three subjects matches word for word.
  - Covers: R1.2, R1.3
- [ ] **2.3 Curriculum read endpoints**
  - Do: `GET /api/curriculum/years`, `/semesters/{number}`, `/subjects/{code}`; enabled rows only; English
    and Hindi side by side; 404 problem details; `Cache-Control: max-age=60`.
  - Done when: integration tests cover each endpoint, a disabled subject returns 404, and an unknown code
    returns 404 problem details.
  - Covers: R1.1, R2.1, R2.2, R2.3, R2.4, R9.3
- [ ] **2.4 Subject search endpoint**
  - Do: `GET /api/curriculum/search?q=` matching code or English/Hindi title, case-insensitive, up to 10,
    enabled only.
  - Done when: tests pass for `1078`, `bl-10`, a Hindi title word, no match, and a disabled subject.
  - Covers: R12.2, R12.3, R12.6
- [ ] **2.5 Glossary read endpoint**
  - Do: `GET /api/glossary/terms` with rendered meanings, enabled only.
  - Done when: integration test returns every seeded term and hides a disabled one.
  - Covers: R3.1, R6.3
- [ ] **2.6 Site read endpoints**
  - Do: `GET /api/site/menu`, `/sections/{slug}`, `/sections/{slug}/pages/{page}`; hide disabled items and
    menu items pointing at disabled sections.
  - Done when: integration tests cover enabled, disabled and linked-to-disabled cases.
  - Covers: R10.1, R10.2, R10.3, R10.4, R10.5, R10.7

## Phase 3: Frontend on the APIs, with SSR

- [ ] **3.1 Add Angular SSR**
  - Do: `@angular/ssr`; `RenderMode.Server` for public routes, `RenderMode.Client` for `/admin/**` and
    `/account/**`; dev proxy `/api` → `localhost:8080`.
  - Done when: `curl localhost:4200/semesters` returns HTML that already contains semester names.
  - Covers: R5.1, C1
- [ ] **3.2 API address and transfer cache**
  - Do: interceptor adding `API_INTERNAL_URL` on the server; `HTTP_TRANSFER_CACHE_ORIGIN_MAP`; hydration
    with event replay.
  - Done when: on a fresh load of a subject page, the browser makes no API call for that page's data, and
    moving to another page needs no full reload.
  - Covers: R5.2, R5.3
- [ ] **3.3 Curriculum pages from the API**
  - Do: data-access calls the API; pages render `html`; the prototype `.data.ts` files leave `frontend/`.
  - Done when: `/`, `/semesters`, `/semesters/{number}` and `/semesters/{number}/{code}` show API data at
    the same URLs as the prototype.
  - Covers: R2.1, R2.2, R2.3, R2.5
- [ ] **3.4 Not found page**
  - Do: Not found component; SSR sets status 404 via `RESPONSE_INIT`.
  - Done when: `curl -i` of an unknown subject, semester or section returns 404 with the Not found page.
  - Covers: R2.4
- [ ] **3.5 Glossary page from the API**
  - Done when: `/glossary` lists every term and typing filters without a reload.
  - Covers: R3.1, R3.2
- [ ] **3.6 Language from a cookie**
  - Do: `LanguageService` also writes `ballb.lang`; SSR reads it; browser-only code behind
    `isPlatformBrowser`.
  - Done when: with the cookie set to `hi`, `curl` of a page returns Hindi text; toggling switches without
    a reload.
  - Covers: R4.1, R4.2
- [ ] **3.7 Menu, sections and pages**
  - Do: header menu from `/api/site/menu`; routes `/:section` and `/:section/:page` after built-in routes.
  - Done when: a section and menu item added in the database appear on the site within 60 seconds.
  - Covers: R10.1, R10.2, R10.3, R10.4, R1.1
- [ ] **3.8 Header search box**
  - Done when: typing `1078` lists matches; an exact single code opens the subject; no match shows the
    message with a link to semesters; it works without signing in.
  - Covers: R12.1, R12.4, R12.5, R11.12

## Phase 4: Accounts and sign-in

- [ ] **4.1 Email sending**
  - Do: notification-service `POST /internal/notifications` sends email over SMTP (Mailpit in dev); writes
    masked `delivery_log`; deletes rows older than 30 days daily.
  - Done when: a test email appears in Mailpit, and the log row shows only the masked address.
  - Covers: R11.3, R11.8
- [ ] **4.2 Sign up with email and password**
  - Do: identity sign-up (name, email, password, separate unticked marketing consent); bcrypt; verification
    code by email; no gender, age or religion fields.
  - Done when: a new user receives the code in Mailpit, can't sign in before verifying, and can after.
  - Covers: R11.1, R11.2, R11.3, R11.9, R11.10
- [ ] **4.3 Sign in, sign out, sessions, lockout**
  - Do: access and refresh cookies as in the design; refresh endpoint; 5 failures in 15 minutes lock for 15.
  - Done when: tests cover correct sign-in, sign-out, refresh, and the sixth try within 15 minutes gets 429.
  - Covers: R11.4, R11.6, R8.9
- [ ] **4.4 Gateway token checks**
  - Do: verify the JWT with identity-service's public key; pass `X-User-Id` and `X-User-Role`; public
    routes need no token; rate-limit sign-in.
  - Done when: an admin endpoint returns 401 without a token and 403 with a student token; public pages work
    with no token.
  - Covers: R6.1, R8.3, R11.12
- [ ] **4.5 Password reset**
  - Done when: the reset link from Mailpit works once, fails a second time, and fails after 1 hour.
  - Covers: R11.5
- [ ] **4.6 Sign in with a mobile number**
  - Do: 6-digit code, 5 minutes, 3 tries; SMS sending behind an interface (dev prints the code to the log).
  - Done when: tests cover a correct code, a wrong code three times, and an expired code.
  - Covers: R11.2, R11.3
- [ ] **4.7 SSO sign-in**
  - Do: OpenID Connect via Spring Security OAuth2 Client; providers from config; links to `sso_identity`.
  - Done when: signing in with the first configured provider creates or reuses the right user.
  - Covers: R11.2
- [ ] **4.8 Profile, consent and account deletion**
  - Done when: a user edits name and contact details, changes password, changes marketing consent, and
    after deletion no row with their personal data remains in identity.
  - Covers: R11.7, R11.8, R11.10
- [ ] **4.9 Roles and the first super admin**
  - Do: roles `student`, `editor`, `super_admin`; first super admin from environment variables on first
    start; admin refresh tokens expire after 30 idle minutes.
  - Done when: a fresh start creates exactly one super admin; an admin idle for 30 minutes must sign in again.
  - Covers: R8.4, R8.7, R8.8, R8.10
- [ ] **4.10 Account pages in the frontend**
  - Do: `/account/sign-up`, `/sign-in`, `/verify`, `/reset`, `/profile`, with all three sign-in methods.
  - Done when: each flow in 4.2–4.8 works from the browser.
  - Covers: R11.2, R11.3, R11.4, R11.5, R11.7, R11.8, R11.10

## Phase 5: Admin dashboard

- [ ] **5.1 Curriculum admin API**
  - Do: create, update, enable, disable, reorder semesters and subjects; required-field checks; preview;
    `audit_log`; clear cache on save.
  - Done when: tests cover each action, a missing field returns 400 listing it, and every change writes an
    audit row with admin and time.
  - Covers: R9.1, R9.2, R9.3, R9.4, R9.5, R9.7, R9.8, R9.10
- [ ] **5.2 Glossary admin API**
  - Done when: same checks as 5.1 for glossary terms.
  - Covers: R9.1, R9.2, R9.3, R9.4, R9.5, R9.7, R9.8, R9.10
- [ ] **5.3 Site admin API**
  - Do: sections, pages and menu items: create, update, enable, disable, reorder; reject reserved or used
    addresses with 409.
  - Done when: tests cover each action and both address conflicts.
  - Covers: R9.8, R10.1, R10.2, R10.3, R10.4, R10.5, R10.6
- [ ] **5.4 Users admin API**
  - Do: super admin adds admins, changes roles, disables any account.
  - Done when: an editor gets 403; a disabled user can't sign in; a role change applies on the next request.
  - Covers: R8.4, R8.5, R8.6, R11.11
- [ ] **5.5 Dashboard shell**
  - Do: `/admin` area, sign-in redirect, role guard, layout and navigation.
  - Done when: a visitor is sent to sign in, a student is refused, an editor sees content screens, a super
    admin also sees Users.
  - Covers: R8.1, R8.2, R8.3, R8.5, R8.7
- [ ] **5.6 Content editors**
  - Do: lists with disabled items marked; forms with English and Hindi side by side; Markdown editor with
    server preview; field errors.
  - Done when: an editor creates, edits, disables and re-enables a subject and a term, and a student sees
    each change within 60 seconds.
  - Covers: R9.1, R9.2, R9.3, R9.4, R9.5, R9.6, R9.7, R9.9, R9.10, R1.1
- [ ] **5.7 Sections, menus and users screens**
  - Done when: an editor creates a section with pages, adds it to the menu, reorders and disables it; a super
    admin manages admins.
  - Covers: R10.1, R10.2, R10.3, R10.4, R10.5, R10.6, R10.7, R8.5, R8.6

## Phase 6: Test environment

- [ ] **6.1 Dockerfiles** for all seven folders.
  - Done when: `docker build` succeeds in each folder.
  - Covers: C8
- [ ] **6.2 `docker/docker-compose.test.yml`**
  - Done when: one command starts the full stack and `http://localhost:8080` serves the site.
  - Covers: R7.2
- [ ] **6.3 End-to-end checks**
  - Do: a script of the design's end-to-end scenarios against the test environment.
  - Done when: it passes from a clean start.
  - Covers: R1.1, R4.1, R5.1, R9.10, R11.4

## Phase 7: Staging and production

- [ ] **7.1 `ci.yml`**: on pull requests, build and test only the folders that changed.
  - Done when: a pull request touching one service runs only that service's job.
  - Covers: C7, C10
- [ ] **7.2 Staging deploy**: `deploy-staging.yml` pushes changed images to GHCR and redeploys `ballb-staging` on
      the production VPS as Compose project `ballb-staging` at `staging.<domain>` (built from the [staging server spec](../staging-server/tasks.md))
  - Done when: a merge to `main` updates `https://staging.<domain>`.
  - Covers: R7.3, R7.5
- [ ] **7.3 VPS setup**: `docker/docker-compose.vps.yml`; gateway joins the nginx network; nginx server
      blocks for staging and production.
  - Done when: only the gateway is reachable from nginx, nothing else from outside, and both domains
    serve HTTPS.
  - Covers: R6.1, R6.2, R6.4, C5, C6
- [ ] **7.4 Production deploy**: `deploy-prod.yml` on an approved `v*` tag re-tags staging-tested images.
  - Done when: an approved tag updates `https://<domain>` with the exact images tested on staging.
  - Covers: R7.4, R7.6
- [ ] **7.5 Retire GitHub Pages**: remove `deploy-pages.yml` and the `deploy` branch.
  - Done when: production is live and the workflow is gone.
  - Covers: C7

## Before starting a phase

The design's open questions must be answered before the tasks that need them: SSO providers (4.7), SMS
provider (4.6), email provider (7.2), under-18 users (4.2), Java version (1.2), domain (7.2).
