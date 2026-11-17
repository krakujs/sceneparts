# Governance

## Maintainers
- @krakujs (Griiken) – lead maintainer

Maintainers review and merge pull requests, publish releases and handle takedowns.

## How changes are merged
- **Every pull request needs approval from a human maintainer.** There is no auto-merge, at any trust level.
- CI must pass. CI labels (`needs-ip-check`, `possible-duplicate`) are hints for the reviewer, not decisions.
- The reviewer checklist is in the pull request template.

## Style maintainers
When a style has steady contributions, its regular contributors can be invited as style maintainers for `parts/<style>/` (added to CODEOWNERS). Their approval counts as the human review for that style. Lead maintainers can remove anyone's maintainer rights.

## Versions and stability
- Parts follow semver in `part.json`: new params = minor, changed meaning or removed params = major.
- A breaking change to a popular part should usually be a new part instead.
- Projects that ran `sceneparts add` keep their pinned copy (`parts/sceneparts.lock.json`) until they update.

## Takedowns
Open a **Takedown request** issue, or for private matters use "Report a vulnerability" on the Security tab. A maintainer responds within 72 hours; if the claim is credible the part is removed and the index rebuilt. Copies that projects already added stay in those projects; their owners are responsible for what they publish.

## Code of conduct
See [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).
