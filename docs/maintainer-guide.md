# Maintainer Guide

## Branch Model

- **`source`**: authoring branch. All PRs target `source`.
- **`dist`**: generated default branch on GitHub. Repo root on `dist` matches release CI output (`build/dist`). Marketplace installs use the default branch.
- **`dist` does not share git history with `source`** (one force-pushed commit per release). Seeing `dist` N commits behind `source` is normal. Do not merge `source` into `dist`.

Contributor-facing branch guidance is in [CONTRIBUTING.md](../CONTRIBUTING.md).

## Versioning

All hosts share one product version. Source files do not contain a release version. The release workflow derives `VERSION` from a human-created tag such as `v1.2.3`.

## Release Process

1. Merge reviewed changes into `source`.
2. Run the [local release dry run](#local-release-dry-run-before-tagging) on `source`.
3. Create and push a SemVer tag from `source`:

```bash
git checkout source
git pull --ff-only
git tag v1.2.3
git push origin v1.2.3
```

4. The release workflow verifies the tag is reachable from `origin/source`, renders packages, updates `dist`, creates zip assets, publishes `SHA256SUMS`, and creates a GitHub Release.

5. After the workflow succeeds:
   - Run the [CI-equivalent `compare-dist`](#validate-a-published-release-compare-dist) steps (render from the tag, not from `dist`).
   - On the GitHub Release, confirm four host zips (`sparklogs-claude`, `sparklogs-cursor`, `sparklogs-codex`, `sparklogs-generic`) and `SHA256SUMS` (four lines matching the zips).
   - Optionally smoke-test marketplace install on Claude Code, Cursor, or Codex.

`workflow_dispatch` can re-render an existing tag. Manual dispatch uses the workflow file from the default branch (`dist`); until the next tag publish copies workflow changes from `source`, dispatch may run an older workflow file.

## Local Release Dry Run (before tagging)

On **`source`**, before you push a release tag:

```bash
git checkout source
yarn install --immutable --check-cache
yarn run clean
yarn run validate
yarn run build
yarn run validate:rendered
yarn run validate:cursor
yarn run smoke
```

For convenience, `yarn run fullrebuild` runs those same steps in that order. Local builds use a dev version (`0.0.0-dev+…`) unless you pass `--version` to the renderer.

Release CI runs the same validators, then renders with an explicit `--version` and publishes `build/dist` to the `dist` branch. CI does **not** run `compare-dist`.

## Validate a Published Release (`compare-dist`)

Use **`yarn run compare-dist`** after a tagged release to confirm `origin/dist` matches a **CI-equivalent** local render. The script is maintainer-local only; it is not part of [`.github/workflows/release.yml`](.github/workflows/release.yml).

**Do not** pair `fullrebuild` or a render on a checked-out `dist` branch with `compare-dist` when validating an official release:

- `fullrebuild` stamps dev versions into `plugin.json` (real content diff).
- Rendering on `dist` records provenance for the publish commit (`dist` @ `<publish-sha>`), while CI renders from the **tag checkout** on `source` (`HEAD` @ `<tagged-source-sha>`). Plugin content may match, but `DIST.md` and `dist-manifest.json` will differ.

To mirror release CI for tag `v1.2.3`:

```bash
git fetch origin dist tag v1.2.3
git checkout v1.2.3    # detached HEAD at the tagged source commit
yarn install --immutable --check-cache
yarn run clean
SOURCE_DATE_EPOCH=v1.2.3 node scripts/render-packages.mjs --out build/dist --version 1.2.3
yarn run compare-dist
git checkout source    # or git checkout dist
```

Prefer a worktree if you do not want to switch branches:

```bash
git fetch origin dist tag v1.2.3
git worktree add /tmp/sparklogs-release-check v1.2.3
cd /tmp/sparklogs-release-check
yarn install --immutable --check-cache
SOURCE_DATE_EPOCH=v1.2.3 node scripts/render-packages.mjs --out build/dist --version 1.2.3
yarn run compare-dist
cd -
git worktree remove /tmp/sparklogs-release-check --force
```

Expect **No differences.** when the publish succeeded. Pass another ref if needed, for example `yarn run compare-dist dist` to diff against your local `dist` branch instead of `origin/dist`. The script extracts the ref to a temp directory and runs `diff -qr`; nothing under the repo is overwritten.

You can also run `validate:rendered`, `validate:cursor`, and `smoke` against a checked-out `dist` branch (repo root) for a quick sanity check without a byte-for-byte compare.

## Rollback

Do not delete releases or rewrite `dist` history. To roll back, tag a new patch/minor version from a known-good source commit, publish it, and communicate the replacement version to MSPs.

---

## One-time Setup

Completed at v1.0.0 launch. Keep this section for new repos, disaster recovery, or auditing the intended configuration.

### Repository checklist

- Set **`dist`** as the **default branch** (marketplace install docs assume the default branch).
- Copy final brand assets from marketing into `assets/`: `logo.svg`, `logo.png`, `icon.svg`, `icon-256.png`, `icon-512.png`.
- Disable squash merges; allow merge commits and/or rebase merges only.
- Configure **GitHub rulesets** (not legacy branch protection). See [GitHub rulesets](#github-rulesets) below.
- Create the **release GitHub App**, **`release` environment** (secrets + deployment branch policy), and **`dist`** ruleset App bypass. See [Release GitHub App and `release` environment](#release-github-app-and-release-environment).
- Require 2FA for org members and outside collaborators.
- Enable secret scanning and push protection.
- Enable Dependabot security updates for `package.json` and `yarn.lock`; do not auto-merge dependency PRs.
- DCO on `source`: enforced by the **DCO check** step in [`.github/workflows/validate.yml`](.github/workflows/validate.yml) (no separate GitHub App or repo setting). Ruleset on `source` must require status check **`Validate / validate`**. Optional: install the [DCO](https://github.com/apps/dco) App for a redundant check (not needed if CI + ruleset are in place).
- Set `security@itlightning.com` as the vulnerability reporting channel.
- Repo **Settings → Actions → General → Fork pull request workflows**: keep the default (no secrets on fork workflows).

### GitHub rulesets

Use **Settings → Rules → Rulesets** (branch rulesets + tag rulesets). Do **not** rely on legacy branch protection.

**Important:** The default `GITHUB_TOKEN` runs as **`github-actions[bot]`**. That identity **cannot** be added to a ruleset bypass list. Bypass actors are repository roles, teams, **installed GitHub Apps**, and Dependabot only. To let release automation update **`dist`** under rulesets, use a **dedicated GitHub App** on the bypass list and mint an installation token in [`.github/workflows/release.yml`](.github/workflows/release.yml) (see [Release GitHub App and `release` environment](#release-github-app-and-release-environment) below).

#### Ruleset 1: `source` (authoring)

**New branch ruleset** → target branch **`source`**.

| Rule | Setting |
|------|---------|
| Require a pull request before merging | On, **1** approval |
| Require review from Code Owners | On ([`CODEOWNERS`](CODEOWNERS)) |
| Require status checks to pass | **`Validate / validate`** |
| Require conversation resolution | On |
| Block force pushes | On |
| Restrict deletions | On |
| **Bypass list** | **Empty** (no bypass actors) |

#### Ruleset 2: `dist` (generated default branch)

**New branch ruleset** → target branch **`dist`**.

| Rule | Setting |
|------|---------|
| **Restrict updates** | On (only bypass actors may push; blocks human writes) |
| Block force pushes | On for everyone except bypass actors (release uses `--force-with-lease`; bypass actor must use **Always allow**, not pull-request-only bypass) |
| Restrict deletions | On |
| **Bypass list** | **Release GitHub App only** (see below). **Not** `github-actions[bot]`. |

**Do not** enable "Require a pull request before merging" on **`dist`**: nothing merges via PR; release automation force-pushes the generated tree.

#### Ruleset 3: `v*` (release tags)

**New tag ruleset** → target tags **`v*`**.

| Rule | Setting |
|------|---------|
| Restrict tag creation / updates | Maintainers only (human-created tags on **`source`**) |
| **Bypass list** | **Empty** (no Actions bypass on tags) |

Tags are pushed from **`source`** by maintainers; [`.github/workflows/release.yml`](.github/workflows/release.yml) runs on tag push and regenerates **`dist`**.

### Release GitHub App and `release` environment

Release automation pushes the generated **`dist`** branch with a **dedicated GitHub App** installation token. The default `GITHUB_TOKEN` (`github-actions[bot]`) **cannot** bypass branch rulesets, so the App is also on the **`dist`** ruleset bypass list.

Credentials live in the **`release`** GitHub Environment (not repo-level secrets), so fork PRs and same-repo PR workflows cannot read the App private key. Only [`.github/workflows/release.yml`](.github/workflows/release.yml) references them, and only when the job runs under an allowed ref (see **Deployment branch policy** below).

#### 1. Create the GitHub App (web UI)

Org-owned app (typical):

`https://github.com/organizations/itlightning/settings/apps` → **New GitHub App**

| Field | Value |
|-------|--------|
| **GitHub App name** | e.g. `sparklogs-ai-plugins-releaser` (globally unique) |
| **Webhook** | **Inactive** (no events needed) |
| **Repository permissions → Contents** | **Read and write** |
| **Repository permissions → Metadata** | **Read-only** (default) |
| **Where can this GitHub App be installed?** | **Only on this account** (recommended) |

**Create GitHub App**, then on the app settings page:

1. Copy the **Client ID** (Settings → **General**; used by Actions; not the numeric App ID).
2. **Private keys → Generate a private key** (download the `.pem`; shown once).

#### 2. Install the App on this repository

App settings → **Install App** → **itlightning** → **Only select repositories** → **`sparklogs-ai-plugins`** → **Install**.

The App must be installed before it appears in the **`dist`** ruleset bypass search.

#### 3. Create the `release` environment

Repo **Settings → Environments → New environment** → name: **`release`**.

**Environment secrets** (not repo secrets):

| Name | Value |
|------|--------|
| `RELEASE_APP_PRIVATE_KEY` | Full `.pem` contents (`-----BEGIN …-----` through `-----END …-----`) |

**Environment variables:**

| Name | Value |
|------|--------|
| `RELEASE_APP_CLIENT_ID` | Client ID from step 1 |

**Deployment branch policy** (required for secret access control):

| Setting | Value |
|---------|--------|
| **Deployment branches and tags** | **Selected branches and tags** |
| Allowed tags | Pattern `v*` (tag-push releases) |
| Allowed branches | **`dist`** (`workflow_dispatch` runs from the default branch; without this, manual reruns cannot read environment secrets) |

Optional: **Required reviewers** on `release` for `workflow_dispatch` reruns (tag pushes can use the same gate).

Do **not** add `source` or arbitrary feature branches to this environment.

#### 4. Add the App to the `dist` ruleset bypass list

**Settings → Rules → Rulesets** → **`dist`** ruleset → **Bypass list** → **Add bypass** → search the App **name** (e.g. `sparklogs-ai-plugins-releaser`; not `github-actions[bot]`).

Bypass mode: **Always allow** (release uses `git push --force-with-lease` outside pull requests).

Enable **Restrict updates** on **`dist`** only after steps 1–3 and the workflow wiring below are merged to **`source`** and verified on a tag release.

#### 5. Workflow wiring (already in `release.yml`)

The release job sets `environment: release`, mints a token with [`actions/create-github-app-token`](https://github.com/actions/create-github-app-token), and uses it only for **Publish dist branch**. **Publish GitHub Release** still uses `github.token` (`GITHUB_TOKEN`).

#### Security hardening (open source)

| Risk | Mitigation |
|------|------------|
| Fork PR exfiltration | Fork `pull_request` workflows never receive environment or repo secrets. Do not use `pull_request_target` to run untrusted code with secrets. |
| Same-repo PR exfiltration | Never reference `RELEASE_APP_*` in [`.github/workflows/validate.yml`](.github/workflows/validate.yml) or other PR jobs. Environment deployment policy limits secret injection to `v*` tags and branch `dist`. |
| Least privilege | App install scoped to **`sparklogs-ai-plugins`** only; permissions **Contents** + **Metadata** only. |
| Ruleset on `source` | CODEOWNERS + required review blocks unreviewed workflow changes. |
| `dist` writes | **Restrict updates** + App-only bypass; humans cannot push generated output. |

#### Initial verification

Verified at **v1.0.0**:

- Release workflow passed **Mint release app token** and **Publish dist branch**.
- **`dist`** updated; Release GitHub App is the only bypass actor that can push there.
- GitHub Release includes four host zips and `SHA256SUMS` with matching checksums.
- CI-equivalent `compare-dist` from tag `v1.0.0` reports no differences.
