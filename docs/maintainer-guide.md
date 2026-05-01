# Maintainer Guide

## Branch Model

- `source` is the authoring branch. All PRs target `source`.
- `dist` is the generated default branch. Release automation copies the source tree and layers generated marketplace/plugin outputs on top.

## Local Release Dry Run

```bash
yarn install --immutable --check-cache
yarn run clean
yarn run validate
yarn run build
yarn run validate:rendered
yarn run validate:cursor
yarn run smoke
```

For convenience, `yarn run fullrebuild` runs those same steps in that order.

To compare your local `build/dist` to the published **`dist` branch tree** (same layout CI pushes—repo root on `dist` matches `build/dist`), fetch and diff:

```bash
git fetch origin dist
yarn run fullrebuild   # or yarn build if you only need build/dist
yarn run compare-dist
```

Pass another ref if needed, for example `yarn run compare-dist dist` to use your local `dist` branch instead of `origin/dist`. The script extracts the ref to a temp directory and runs `diff -qr`; nothing under the repo is overwritten.

## Manual GitHub Setup Checklist

Complete this before the first release:

- Set `dist` as the default branch.
- Copy final brand assets from marketing into `assets/`: `logo.svg`, `logo.png`, `icon.svg`, `icon-256.png`, `icon-512.png`.
- Disable squash merges; allow merge commits and/or rebase merges only.
- Use GitHub rulesets, not legacy branch protection.
- Protect `source`: require PR, one approving review, required checks, conversation resolution, no force pushes, no deletions, no bypass actors.
- Protect `dist`: block all pushes except `github-actions[bot]` can bypass so release automation can regenerate the branch.
- Protect `v*` tags: only maintainers create or move release tags; no GitHub Actions bypass.
- Require 2FA for org members and outside collaborators.
- Enable secret scanning and push protection.
- Enable Dependabot security updates for `package.json` and `yarn.lock`; do not auto-merge dependency PRs.
- Enable DCO enforcement for all commits landing on `source`.
- Add a pull request template with a required contributor checkbox: "I have the right to submit this contribution, and I agree that it is licensed under the Apache License, Version 2.0."
- Set `security@itlightning.com` as the vulnerability reporting channel.

## Versioning

All hosts share one product version. Source files do not contain a release version. The release workflow derives `VERSION` from a human-created tag such as `v1.2.3`.

## Release Process

1. Merge reviewed changes into `source`.
2. Run local validation.
3. Create and push a SemVer tag from `source`:

```bash
git checkout source
git pull --ff-only
git tag v1.2.3
git push origin v1.2.3
```

4. The release workflow verifies the tag is reachable from `origin/source`, renders packages, updates `dist`, creates zip assets, publishes `SHA256SUMS`, and creates a GitHub Release.

`workflow_dispatch` can re-render an existing tag. Because manual dispatch uses the workflow file from the default branch (`dist`), dispatch may use the previous workflow until a successful release has copied new workflow changes into `dist`.

## Rollback

Do not delete releases or rewrite `dist` history. To roll back, tag a new patch/minor version from a known-good source commit, publish it, and communicate the replacement version to MSPs.
