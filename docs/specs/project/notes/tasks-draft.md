# BA.LLB Learning Portal — Tasks draft (not approved)

> **Not an approved spec file.** This draft was written before the requirements, so it is out of order.
> It is kept only as input for step 3 (tasks), which starts after [requirements.md](../requirements.md) is approved.
> Do not implement anything from it.

As of 2026-11-04 · Requirements: [requirements.md](../requirements.md) · Design: [design.md](./design-draft.md)

**How to use this file:** do one task at a time, in order. A task is finished only when its
"Done when" check passes. Then tick its box (`- [x]`) in the same change as the code.

Phase 1 is broken into small tasks. Later phases are outlined and will be broken down before they start.

## Phase 1: Backend skeleton

Branch: `feat/backend-skeleton`. Phase done when all three services start locally against Docker Postgres
and report healthy.

- [ ] **1.1 Maven parent project**
  - Do: create `backend/pom.xml` (parent `spring-boot-starter-parent` 4.0.9, Spring Cloud BOM 2025.1.4,
    Java 17) listing modules `gateway`, `curriculum-service`, `glossary-service`; add the Maven wrapper;
    ignore `backend/**/target` in `.gitignore`.
  - Done when: `cd backend && ./mvnw -q validate` succeeds.
  - Covers: R7.1
- [ ] **1.2 Local Postgres in Docker**
  - Do: create `docker/docker-compose.dev.yml` (PostgreSQL 17, port 5432 on localhost, named volume) and
    `docker/postgres/init/01-create-databases.sh` creating databases `curriculum` and `glossary`, each with
    its own user; add `docker/.env.example` with placeholder passwords.
  - Done when: `docker compose -f docker/docker-compose.dev.yml up -d` starts, and `psql` lists both
    databases, each owned by its own user.
  - Covers: R1.1, R7.2, R8.1
- [ ] **1.3 curriculum-service skeleton**
  - Do: create `backend/curriculum-service` (Spring Boot web + JDBC + Flyway + Actuator) on port 8081,
    profile `dev` connecting to local Postgres via `DB_URL`, `DB_USER`, `DB_PASSWORD` with dev defaults;
    add `V1__schema.sql` with tables `semester`, `subject`, `subject_content` as in the design.
  - Done when: `./mvnw -pl curriculum-service spring-boot:run -Dspring-boot.run.profiles=dev` starts,
    `curl localhost:8081/actuator/health` returns `UP`, and the three tables exist.
  - Covers: R1.1, R1.2, R1.3, R7.2
- [ ] **1.4 glossary-service skeleton**
  - Do: create `backend/glossary-service` the same way, on port 8082, with `V1__schema.sql` for table
    `glossary_term`.
  - Done when: it starts with profile `dev`, `curl localhost:8082/actuator/health` returns `UP`, and the
    table exists.
  - Covers: R1.1, R1.2, R1.3, R7.2
- [ ] **1.5 Gateway skeleton**
  - Do: create `backend/gateway` (Spring Cloud Gateway, WebFlux, Actuator) on port 8080 with routes
    `/api/curriculum/**` → `CURRICULUM_URL`, `/api/glossary/**` → `GLOSSARY_URL`, `/**` → `FRONTEND_URL`;
    dev defaults point at `localhost:8081`, `localhost:8082`, `localhost:4200`.
  - Done when: `curl localhost:8080/actuator/health` returns `UP`, and `curl -i localhost:8080/api/curriculum/x`
    returns a 404 from curriculum-service (not a 503 from the gateway).
  - Covers: R6.1, R7.1
- [ ] **1.6 Context tests**
  - Do: one Spring context test per service; database services use Testcontainers PostgreSQL.
  - Done when: `cd backend && ./mvnw verify` passes with Docker running.
  - Covers: R7.1, R7.2
- [ ] **1.7 Developer docs**
  - Do: add a "Backend (local)" section to the root `README.md`: start Postgres, run each service, ports.
  - Done when: following only that section, all three services start and report `UP`.
  - Covers: R8.1

## Phase 2: Content migration (to be broken down)

- [ ] Export script in `tools/content-export/` turns `curriculum.data.ts`, `official-papers.data.ts` and
      `glossary.data.ts` into Flyway seed migrations. Done when every semester, subject and glossary term
      from the current site is in the databases. Covers: R1.1, R1.2, R1.5

## Phase 3: APIs (to be broken down)

- [ ] The four endpoints in the design, Markdown rendering and cleaning, caching, problem-details errors,
      tests. Done when the gateway serves every endpoint in dev. Covers: R1.4, R2.1–R2.4, R3.1, R6.3

## Phase 4: Angular SSR (to be broken down)

- [ ] Add `@angular/ssr`, switch data-access libraries to HTTP, hydration and transfer cache, language
      cookie, Not found page, dev proxy. Done when every page renders on the server with backend data.
      Covers: R2.1–R2.5, R3.1, R3.2, R4.1, R4.2, R5.1–R5.3

## Phase 5: Test environment (to be broken down)

- [ ] Dockerfiles for all four apps and `docker/docker-compose.test.yml`. Done when the full stack runs
      locally in containers from one command. Covers: R8.2

## Phase 6: Staging and production (to be broken down)

- [ ] GHCR images, `ci.yml`, `deploy-staging.yml`, `deploy-prod.yml`, `docker/docker-compose.vps.yml`,
      nginx server blocks. Done when a merge to `main` updates staging and an approved `v*` tag updates
      production. Covers: R6.1, R6.2, R6.4, R8.3–R8.7
