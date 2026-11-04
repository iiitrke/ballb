# VPS Simulator — Requirements

As of 2026-11-04 · Step 1 of 3 · Next: `design.md` (written after this file is approved)

**Approval:** Waiting for review.

**Labels:** _Agreed_ = decided by the owner on 2026-11-04 · _Proposed_ = Claude's suggestion, not
confirmed · _Open_ = not decided, ask first.

## Goal

Give the developer a Linux server that runs in Docker on the laptop and behaves like the real VPS, with
its own Docker engine, nginx, automatic container discovery and SSL. Staging and production setups can
then be tested end to end before they touch the real VPS.

## Out of scope

- Any use outside local testing. The simulator never runs in production or on the real VPS.
- Hardening the simulated server (firewall, intrusion protection, automatic security updates).
- Monitoring, logging dashboards and backups for the simulated server.
- Building the portal itself. The simulator only hosts it (see [project tasks](../project/tasks.md)).

## Constraints

| ID  | Constraint                                                                                                                                  | Status |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| C1  | The simulated server is a Linux container started with Docker Compose on the developer laptop.                                              | Agreed |
| C2  | The simulated server runs its own Docker engine inside it ("Docker in Docker"); the portal's containers run on that inner engine.           | Agreed |
| C3  | Inside the simulated server, nginx is the reverse proxy and discovers containers automatically (nginx-proxy, formerly jwilder/nginx-proxy). | Agreed |
| C4  | Certificates are handled by a Let's Encrypt companion container next to nginx (acme-companion).                                             | Agreed |
| C5  | SSL terminates at nginx; nginx forwards plain HTTP to the containers behind it.                                                             | Agreed |
| C6  | The simulator is for testing only.                                                                                                          | Agreed |

## Requirements

### R1. A Linux server in a container

**User story:** As the developer, I want a throwaway Linux server on my laptop, so that I can practise and
test server setup without risking the real VPS.

| ID   | Acceptance criterion                                                                                                    | Status   |
| ---- | ----------------------------------------------------------------------------------------------------------------------- | -------- |
| R1.1 | THE SYSTEM SHALL start the simulated server with one command and stop it with one command.                              | Agreed   |
| R1.2 | THE SYSTEM SHALL run a Docker engine inside the simulated server that is separate from the laptop's Docker.             | Agreed   |
| R1.3 | THE SYSTEM SHALL use the same Linux distribution and version as the real VPS.                                           | Open     |
| R1.4 | WHEN the simulated server restarts, THE SYSTEM SHALL keep its inner containers, images, volumes and certificates.       | Proposed |
| R1.5 | THE SYSTEM SHALL let the developer log in to the simulated server over SSH with a key, as on the real VPS.              | Proposed |
| R1.6 | WHEN the developer asks to reset it, THE SYSTEM SHALL wipe the simulated server back to a clean state with one command. | Proposed |

### R2. nginx finds containers on its own

**User story:** As the developer, I want nginx to route a domain to a container as soon as that container
starts, so that I never edit nginx config by hand.

| ID   | Acceptance criterion                                                                                                                            | Status   |
| ---- | ----------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| R2.1 | THE SYSTEM SHALL make nginx the only entry point of the simulated server, on ports 80 and 443.                                                  | Agreed   |
| R2.2 | WHEN a container starts with a host name set (for example `VIRTUAL_HOST=staging.ballb.localhost`), THE SYSTEM SHALL route that host name to it. | Agreed   |
| R2.3 | WHEN that container stops, THE SYSTEM SHALL stop routing its host name.                                                                         | Proposed |
| R2.4 | THE SYSTEM SHALL route only to containers that set a host name; all other containers stay unreachable from outside.                             | Proposed |
| R2.5 | WHEN a request arrives over HTTP, THE SYSTEM SHALL redirect it to HTTPS.                                                                        | Proposed |

### R3. SSL certificates are automatic

**User story:** As the developer, I want certificates created and renewed for each host name
automatically, so that HTTPS works the same way as on the real VPS.

| ID   | Acceptance criterion                                                                                                                                                    | Status   |
| ---- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| R3.1 | WHEN a container starts with a host name and a certificate email set, THE SYSTEM SHALL obtain a certificate for that host name and renew it before it expires.          | Agreed   |
| R3.2 | THE SYSTEM SHALL end SSL at nginx and forward plain HTTP to the container.                                                                                              | Agreed   |
| R3.3 | WHILE running on the laptop, THE SYSTEM SHALL get certificates from a local test certificate authority, because Let's Encrypt cannot reach a laptop to verify a domain. | Proposed |
| R3.4 | THE SYSTEM SHALL let the developer trust the local test authority once in their browser, so that local HTTPS pages show no warning.                                     | Proposed |

### R4. Test the portal as it will run on the real VPS

**User story:** As the developer, I want to run the portal's staging and production setups inside the
simulator, so that problems show up on my laptop instead of on the real server.

| ID   | Acceptance criterion                                                                                                                                                         | Status   |
| ---- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| R4.1 | THE SYSTEM SHALL run the portal's VPS Compose file inside the simulator, changing only the domain names and the certificate authority.                                       | Proposed |
| R4.2 | THE SYSTEM SHALL serve local staging and production at `https://staging.ballb.localhost` and `https://ballb.localhost`, which reach the simulator from the laptop's browser. | Proposed |
| R4.3 | THE SYSTEM SHALL let only the portal's gateway be routed by nginx, as on the real VPS (project constraint C6).                                                               | Agreed   |
| R4.4 | THE SYSTEM SHALL provide a deploy script that runs the same steps the GitHub Actions deploy will run on the real VPS.                                                        | Proposed |

## Open questions

- [ ] Which Linux distribution and version does the real VPS run (R1.3)? For example Ubuntu 24.04 LTS.
- [ ] Does the real VPS already use nginx-proxy and acme-companion, or plain nginx with hand-written config? If it differs, the simulator copies the real VPS.
- [ ] Where should the simulator live: in this repository (proposed: `docker/vps-simulator/`) or in a separate repository?
- [ ] Local host names: are `ballb.localhost` and `staging.ballb.localhost` fine (R4.2)?
- [ ] How much memory and CPU can the simulator use on your laptop?
- [ ] Note: Docker in Docker needs the simulated server to run in privileged mode, which gives it full control of the laptop's Docker. Acceptable for testing only (C6)?
