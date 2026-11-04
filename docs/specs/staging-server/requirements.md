# Staging Server — Requirements

As of 2026-11-04 · Step 1 of 3 · Next: `design.md` (written after this file is approved)

**Approval:** Approved 2026-11-04. Changed 2026-11-04: staging shares the production VPS and its
existing nginx and Let's Encrypt, at a subdomain (C1, C2, R1, R2.1, R2.2, R4.5); approved 2026-11-04.

**Labels:** _Agreed_ = decided by the owner on 2026-11-04 · _Proposed_ = Claude's suggestion, not
confirmed · _Open_ = not decided, ask first.

## Goal

Run the portal's staging environment on the same VPS as production, at a subdomain
(`staging.<domain>`), behind the VPS's existing nginx and Let's Encrypt, so staging is set up exactly
like production and differs only in its domain name, data and secrets.

## Out of scope

- Production itself. Production stays as it is on the VPS (project constraint C5).
- Docker in Docker: no Linux server container with its own Docker engine (decided 2026-11-04).
- A second nginx or a second Let's Encrypt container for staging.
- Monitoring and logging dashboards for staging.
- Building the portal itself. Staging only hosts it (see [project tasks](../project/tasks.md)).

## Constraints

| ID  | Constraint                                                                                                                                       | Status                      |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------- |
| C1  | Staging runs on the production VPS as its own Docker Compose project, directly on the VPS's Docker engine. No Docker in Docker.                   | Agreed                      |
| C2  | Staging uses the VPS's existing nginx and Let's Encrypt containers. Staging differs from production only by its subdomain, `staging.<domain>`.   | Agreed                      |
| C3  | Certificates come from Let's Encrypt.                                                                                                            | Agreed                      |
| C4  | SSL terminates at nginx; nginx forwards plain HTTP to the containers behind it.                                                                  | Agreed                      |
| C5  | The staging Compose project hosts the portal's staging environment only, never production.                                                       | Agreed                      |

## Requirements

### R1. Staging starts and stops on its own, without touching production

**User story:** As the developer, I want to start, stop and rebuild staging with one command each, so
that I can work on staging without any risk to production running on the same VPS.

| ID   | Acceptance criterion                                                                                                       | Status                      |
| ---- | -------------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| R1.1 | THE SYSTEM SHALL start staging's containers with one command and stop them with one command.                               | Agreed                      |
| R1.2 | WHEN the VPS restarts, THE SYSTEM SHALL start the staging containers again on its own.                                     | Agreed                      |
| R1.3 | WHEN the containers are recreated, THE SYSTEM SHALL keep staging data (database volumes).                                  | Agreed                      |
| R1.4 | WHEN the developer asks to rebuild it, THE SYSTEM SHALL recreate staging from scratch with one command.                    | Agreed                      |
| R1.5 | WHEN staging is started, stopped or rebuilt, THE SYSTEM SHALL leave every production container, volume and network as it was. | Agreed                      |

### R2. nginx routes staging by its subdomain

**User story:** As the developer, I want the existing nginx to send `staging.<domain>` to staging and
`<domain>` to production, so that one VPS serves both without editing production.

| ID   | Acceptance criterion                                                                                                                     | Status                      |
| ---- | ---------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| R2.1 | THE SYSTEM SHALL keep the VPS's existing nginx as the only entry point for staging and production, on ports 80 and 443.                  | Agreed                      |
| R2.2 | THE SYSTEM SHALL route `staging.<domain>` to the staging gateway and `<domain>` to the production gateway.                               | Agreed                      |
| R2.3 | WHEN the staging containers stop, THE SYSTEM SHALL stop routing `staging.<domain>` and keep serving `<domain>`.                          | Agreed                      |
| R2.4 | THE SYSTEM SHALL route only to the staging gateway; all other staging containers stay unreachable from outside.                          | Agreed                      |
| R2.5 | WHEN a request arrives over HTTP, THE SYSTEM SHALL redirect it to HTTPS.                                                                 | Agreed                      |

### R3. SSL certificates are automatic

**User story:** As the developer, I want the staging certificate created and renewed automatically, so
that staging always runs on valid HTTPS like production.

| ID   | Acceptance criterion                                                                                                                 | Status |
| ---- | ------------------------------------------------------------------------------------------------------------------------------------ | ------ |
| R3.1 | THE SYSTEM SHALL obtain a Let's Encrypt certificate for `staging.<domain>` and renew it before it expires.                           | Agreed |
| R3.2 | THE SYSTEM SHALL end SSL at nginx and forward plain HTTP to the staging gateway.                                                     | Agreed |

### R4. The portal's staging environment runs behind it

**User story:** As the developer, I want every merge to `main` deployed to staging, so that I check
changes in a production-like setup before releasing them.

| ID   | Acceptance criterion                                                                                                       | Status                      |
| ---- | -------------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| R4.1 | THE SYSTEM SHALL run the portal's VPS Compose file for staging, with only staging settings (domain, secrets) changed.      | Agreed                      |
| R4.2 | THE SYSTEM SHALL serve staging at `https://staging.<domain>`.                                                              | Agreed                      |
| R4.3 | THE SYSTEM SHALL let nginx route only to the portal's gateway, as on production (project constraint C6).                   | Agreed                      |
| R4.4 | WHEN a change is merged to `main`, THE SYSTEM SHALL deploy it to staging through GitHub Actions (project R7.5).            | Agreed                      |
| R4.5 | THE SYSTEM SHALL keep staging's databases, secrets and internal Docker network separate from production's; only the staging gateway joins nginx's network. | Agreed                      |

## Answered questions

- **Where does staging run?** On the production VPS, next to production, at a subdomain (answered 2026-11-04). The VPS is reachable from the internet, so real Let's Encrypt (R3.1) and GitHub deploys (R4.4) work.
- **Does staging run its own nginx?** No. It sits behind the VPS's existing nginx and Let's Encrypt as one more host name (answered 2026-11-04).
- **What are the existing proxy containers?** nginx-proxy (jwilder) with acme-companion (answered 2026-11-04). Staging is added with `VIRTUAL_HOST` and `LETSENCRYPT_HOST` on the staging gateway.
- **Does DNS for `staging.<domain>` point at the VPS?** Yes (answered 2026-11-04).
- **Where do the staging files live?** In this repository, under `docker/staging/` (answered 2026-11-04).
- **Does the VPS have room for a second copy of the portal?** Yes (answered 2026-11-04).

## Open questions

- [ ] None left for requirements. Details such as the domain and the proxy network's name are handled in the design.
