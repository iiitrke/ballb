# Staging Server — Requirements

As of 2026-11-04 · Step 1 of 3 · Next: `design.md` (written after this file is approved)

**Approval:** Approved 2026-11-04. All items that were Proposed were accepted as written and are now Agreed. Open items stay Open.

**Labels:** _Agreed_ = decided by the owner on 2026-11-04 · _Proposed_ = Claude's suggestion, not
confirmed · _Open_ = not decided, ask first.

## Goal

Run the portal's staging environment in Docker on a staging host, behind an nginx that finds containers
automatically and gets Let's Encrypt SSL, so staging is set up like production but kept apart from it.

## Out of scope

- Production. Production runs on the real VPS (project constraint C5).
- Docker in Docker: no Linux server container with its own Docker engine (decided 2026-11-04).
- Monitoring and logging dashboards for staging.
- Building the portal itself. Staging only hosts it (see [project tasks](../project/tasks.md)).

## Constraints

| ID  | Constraint                                                                                                                             | Status |
| --- | -------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| C1  | Staging runs as containers directly on the staging host's Docker engine, started with Docker Compose. No Docker in Docker.             | Agreed |
| C2  | nginx is the reverse proxy and discovers containers automatically (nginx-proxy, formerly jwilder/nginx-proxy).                         | Agreed |
| C3  | Certificates come from Let's Encrypt through a companion container next to nginx (acme-companion).                                     | Agreed |
| C4  | SSL terminates at nginx; nginx forwards plain HTTP to the containers behind it.                                                        | Agreed |
| C5  | The staging setup hosts the portal's staging environment only, never production.                                                       | Agreed |

## Requirements

### R1. Staging starts and stops as one unit

**User story:** As the developer, I want the staging proxy and the portal's staging containers started
and stopped with one command each, so that staging is quick to bring up, rebuild and tear down.

| ID   | Acceptance criterion                                                                                                    | Status   |
| ---- | ----------------------------------------------------------------------------------------------------------------------- | -------- |
| R1.1 | THE SYSTEM SHALL start the staging proxy (nginx-proxy and acme-companion) with one command and stop it with one command. | Agreed   |
| R1.2 | WHEN the staging host restarts, THE SYSTEM SHALL start the proxy and the staging containers again on its own.           | Agreed   |
| R1.3 | WHEN the containers are recreated, THE SYSTEM SHALL keep staging data (database volumes) and certificates.              | Agreed   |
| R1.4 | WHEN the developer asks to rebuild it, THE SYSTEM SHALL recreate staging from scratch with one command.                 | Agreed   |

### R2. nginx finds containers on its own

**User story:** As the developer, I want nginx to route a domain to a container as soon as that container
starts, so that I never edit nginx config by hand.

| ID   | Acceptance criterion                                                                                                                     | Status   |
| ---- | ---------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| R2.1 | THE SYSTEM SHALL make nginx the only entry point for staging, on ports 80 and 443.                                                       | Agreed   |
| R2.2 | WHEN a container starts with a host name set (for example `VIRTUAL_HOST=staging.<domain>`), THE SYSTEM SHALL route that host name to it. | Agreed   |
| R2.3 | WHEN that container stops, THE SYSTEM SHALL stop routing its host name.                                                                  | Agreed   |
| R2.4 | THE SYSTEM SHALL route only to containers that set a host name; all other containers stay unreachable from outside.                      | Agreed   |
| R2.5 | WHEN a request arrives over HTTP, THE SYSTEM SHALL redirect it to HTTPS.                                                                 | Agreed   |

### R3. SSL certificates are automatic

**User story:** As the developer, I want certificates created and renewed automatically, so that staging
always runs on valid HTTPS like production.

| ID   | Acceptance criterion                                                                                                                                                                                              | Status |
| ---- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| R3.1 | WHEN a container starts with a host name and a certificate email set, THE SYSTEM SHALL obtain a Let's Encrypt certificate for that host name and renew it before it expires.                                      | Agreed |
| R3.2 | THE SYSTEM SHALL end SSL at nginx and forward plain HTTP to the container.                                                                                                                                        | Agreed |
| R3.3 | IF the staging host cannot be reached from the internet on ports 80 or 443, THEN THE SYSTEM SHALL use a local test certificate authority instead, because Let's Encrypt must reach the host to issue a certificate. | Open   |

### R4. The portal's staging environment runs behind it

**User story:** As the developer, I want every merge to `main` deployed to staging, so that I check
changes in a production-like setup before releasing them.

| ID   | Acceptance criterion                                                                                                       | Status   |
| ---- | -------------------------------------------------------------------------------------------------------------------------- | -------- |
| R4.1 | THE SYSTEM SHALL run the portal's VPS Compose file for staging, with only staging settings (domain, secrets) changed.      | Agreed   |
| R4.2 | THE SYSTEM SHALL serve staging at `https://staging.<domain>`.                                                              | Agreed   |
| R4.3 | THE SYSTEM SHALL let nginx route only to the portal's gateway, as on production (project constraint C6).                   | Agreed   |
| R4.4 | WHEN a change is merged to `main`, THE SYSTEM SHALL deploy it to staging through GitHub Actions (project R7.5).            | Agreed   |
| R4.5 | THE SYSTEM SHALL keep staging data, secrets and Docker networks separate from production.                                  | Agreed   |

## Open questions

- [ ] **Where does staging run:** your laptop, the production VPS (next to production), or another machine? This decides R3.3 and R4.4.
- [ ] If on the production VPS: production already has nginx and Let's Encrypt on ports 80/443, and only one proxy can hold those ports. Should staging sit behind production's existing proxy (as one more host name) instead of running its own nginx-proxy?
- [ ] Can GitHub reach the staging host from the internet (needed for automatic deploys, R4.4, and for real Let's Encrypt certificates, R3.1)?
- [ ] Does production also use nginx-proxy and acme-companion? If not, staging differs from production in its proxy.
- [ ] Where should the staging files live: this repository (proposed: `docker/staging/`) or a separate one?
- [ ] Security for an internet-facing staging host: firewall, SSH key only, automatic security updates?
