## Summary

<!-- What changed and why? Target branch: `source` (not `dist`). -->

## Test plan

- [ ] `yarn install --immutable --check-cache`
- [ ] `yarn run validate` (and `validate:rendered` / `validate:cursor` / `smoke` if you changed render output or packages)

## Contributor attestation

- [ ] I have the right to submit this contribution, and I agree that it is licensed under the Apache License, Version 2.0.
- [ ] If this PR comes from a fork, every commit includes a `Signed-off-by:` trailer (use `git commit -s`; see [CONTRIBUTING.md](../CONTRIBUTING.md)).

## Security-sensitive changes

If this PR touches `src/`, `scripts/`, install docs, or MCP configs, confirm you followed the [security review checklist in CONTRIBUTING.md](../CONTRIBUTING.md).
