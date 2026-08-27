# Maintainer Guide

## Branch Model

- **`source`**: authoring branch. All PRs target `source`.
- **`dist`**: generated default branch on GitHub. Repo root on `dist` matches release CI output (`build/dist`). Marketplace installs use the default branch.
- **`dist` does not share history with `source`.** Each release appends **one linear commit** on `dist` whose tree is byte-identical to that release's `build/dist` (parent = previous `dist` tip). Consumers can `git pull` / FF-update. Do not merge `source` into `dist`.
- Seeing `dist` "behind" `source` in commit count is normal; the histories are separate.

Contributor-facing branch guidance is in [CONTRIBUTING.md](../CONTRIBUTING.md).
Consumer load order (elevations, themes, floor vs full) is in [information-architecture.md](information-architecture.md).

## Generated feed lookups (`src/feeds/`)

`src/feeds/<id>/` holds the AI lookup set for each data feed: field schema, closed
vocabularies, and (when present) reasons.
Security also carries the expected-pattern decision procedure, worked query recipes, and external-taxonomy
anchors.
The content is authored nowhere in this repo.
It is produced by the SparkLogs source
library (`tools/gen-ai-schema.py`) and synced here as a checked-in build input.

The library renders two trees and owns the split. `docs/generated/` keeps the verification and
sourcing detail its own authors work against; `docs/generated-public/` is the reader-facing render,
same filenames, no provenance artifact. **This repo consumes the public tree verbatim.** Nothing is
transformed on the way through, which is what lets the drift check compare bytes.

Refresh from a sibling source-library checkout (clean tree required):

```bash
SPARKLOGS_SOURCE_LIBRARY_DIR=../sparklogs-source-library yarn sync-generated
```

That one command copies `docs/generated-public/` into `src/feeds/` **and** regenerates the `app` token table in `guides/app-vocabulary.md` from `registry.yaml` `app_vocabulary` (`public` strings only).

The environment variable is optional when the checkout sits beside this repo. A path that is set
but unusable is a hard failure rather than a fallback: a drift guard that quietly reads a different
checkout reports green about the wrong tree.

Run it after a source-library change that affects public AI feed files or `app_vocabulary`.
Workstation discipline: CI will not catch a stale table by itself (see the drift table below).

`yarn stitch-indexes` is a different command: it rebuilds SKILL / playbook index tables from **this** repo's leaf YAML, not from the library.

Identifier tags (`guides/names.md`): authored `src/` prose backticks that match `[a-z][a-z0-9_.]*` must carry `(arg)`, `(col)`, `(LQL)`, `(tool)`, `(value)`, or `(other)`. Render strips `(tool)`, `(value)`, and `(other)`. Membership is `scripts/identifier-sot.yaml` plus a sibling library harvest. Fenced LQL/JSON is exempt. `src/feeds/` and GENERATED blocks are skipped. `validate-rendered.mjs` scans shipped `.md`: leftover strip-tags fail; each host pack must still contain `(arg)`, `(col)`, and `(LQL)` (empty match is not a pass).

Agents run `make precommit` (or `yarn precommit`) before commit. It is fail-closed without a usable sibling library checkout. CI `yarn validate` still SKIPPED-passes drift when the library is absent.

`scripts/generated-SYNC-MANIFEST.json` records the library branch and commit the current content came from.
It does not ship on `dist`.
Do not hand-edit anything under `src/feeds/` or the generated table in `src/guides/app-vocabulary.md`:
an edit is reverted by the next sync and fails the drift check in the meantime.

`yarn validate:generated` runs the gates and then the drift check. **They are enforced in different
places, and the split is worth knowing:**

| Check | Needs a library checkout? | Runs in CI? |
|---|---|---|
| Gate A, Gate B, stray-file scan | no, they read committed files | yes, on every PR via `yarn validate` |
| Drift against the library | yes | no. CI checks out this repo alone, so the drift half logs SKIPPED and passes |

The drift check is a workstation guard. It is honest about skipping rather than reporting a success
it did not earn, but nothing unattended re-derives "the committed content matches its source". Run
it deliberately before a release, or after any library change.

- **Gate A**: no file under a synced module directory may carry the library's spec-versus-observed
  evidence columns, its witness counts, or the prose that makes observation claims from them. Those
  are the library's own confidence instrument; a consumer reading them as a contract would treat an
  unwitnessed decode as a broken one. **Upstream already withholds all of this, so gate A is a
  tripwire rather than the mechanism:** it exists so that a regression in the public render fails
  here instead of shipping. Prose coverage is a fixed token list, not the concept, so it catches the
  shapes the library has actually emitted rather than every possible phrasing.
- **Gate B**: two rules over `patterns.md`. The decision procedure must file a pattern whose head
  matched nothing as UNCURATED, never UNEXPECTED. And a surface whose reason name carries a mixed
  letter-and-digit token must not claim it renders a stable named pattern, because AutoExtract
  variabilizes that head away before the pattern is derived.
- **Stray files**: the gates enumerate each synced module DIRECTORY rather than the configured
  artifact list, so anything committed alongside the synced artifacts fails loudly. The drift check
  enumerates the destination for the same reason.

Every rule re-proves itself on each run against the planted-positive fixtures in
`scripts/fixtures/generated-reference-gates/`. Correcting a fixture disarms the rule it proves.

**Known defects** in library content that this repo cannot fix are pinned in `KNOWN_DEFECTS`, each
naming one exact file, surface and claim, and citing the escalation it is filed under. The check
runs in both directions: an entry that no longer matches anything FAILS, so a pin dies with its
defect instead of outliving it and quietly excusing the next occurrence. The list is empty today,
which is the healthy state.

Adding a module or an artifact is a decision, recorded in `scripts/generated-references.config.mjs`.
The sync fails on any library MODULE not listed in `MODULES` and on any library ARTIFACT that
appears in neither the public nor the internal list, so nothing new arrives unnoticed at either
level.

`INTERNAL_ARTIFACTS` is empty: upstream already withholds what stays internal. The list is kept
because the sync fails on any artifact appearing in neither it nor `PUBLIC_ARTIFACTS`, so nothing
new arrives unnoticed in either direction.

A subdirectory under `src/feeds/` that is not in `MODULES` fails `--check` and is deleted on sync
via `safeRmFeedModule` (that helper only accepts `src/feeds/<feed-id>`).

Published content lives under `src/`. The renderer copies only that tree plus host wrappers and one
README. That dist root README is authored at `scripts/templates/dist-README.md`; the renderer fills
`{{version}}` (the release version, or `development build` without `--version`) and `{{docs_url}}`,
and fails on any placeholder it does not know. Index tables in SKILL.md and `playbooks.md` are
stitched from leaf `index:` YAML (`yarn stitch-indexes`; `--check` is in `yarn validate`). Dist strips authoring frontmatter and
GENERATED markers. An unknown path under `src/`, or a maintainer file (`yarn.lock`, `package.json`,
`SYNC-MANIFEST.json`, `scripts/`) in dist output, fails validation. Size caps live in
`scripts/dist-layout.mjs`. Planted negatives for those guards run in `scripts/lint-src-layout.mjs`.

`assertBalancedMarkers` (`scripts/skill-indexes.mjs`) rejects any `.md` under `src/` with an
unmatched, mismatched, or nested `BEGIN GENERATED`/`END GENERATED` pair; it runs in
`lint-src-layout.mjs` over every source file and again in `shipMarkdown` at render time. Rendered
frontmatter is also parsed with `js-yaml` in `validate-rendered.mjs`: a value that is not a safe
plain YAML scalar (e.g. a description containing `: `) must be quoted by `formatFrontmatter`, or the
gate fails naming the host and file.

## Packaging gates (`scripts/validate-packaging.mjs`)

Runs in `yarn validate` and again after the versioned render in the release job. It asks whether an
installed package would work, not whether it rendered: every MCP entry with a `url` declares a
`type`; no unexpanded mustache argument placeholder survives; every corpus citation resolves from the directory of the file that
makes it; host-specific prose (`/sparklogs:` syntax, slash-command claims, `commands/` paths, Cursor
invocation names) appears only in packages whose host has that component per `HOST_LAYOUT`; no
command file repeats the plugin name; Cursor rules carry frontmatter; package READMEs and every
landing-page link resolve inside the published tree.

Host dialects are produced by `scripts/host-transforms.mjs`, not hand-written into `src/`. Source
cites the corpus in one canonical package-root shape, and `lint-src-layout.mjs` refuses a `./`, `../`
or `src/` prefixed citation, because those shapes are invisible to both the rewriter and the
resolution gate: they would ship dead while the build stayed green. Prose that is only true on hosts
with commands lives in a `HOSTVARIANT:commands` block with both arms written out; the renderer keeps
the matching one, and `validate-rendered.mjs` fails if a marker reaches a package.

### Guards that only run on a workstation

Two checks are best-effort and skip silently in a clean CI container. Neither is a substitute for
running them locally before tagging:

- **`claude plugin validate`** on the rendered Claude package. Skips with a printed notice when the
  `claude` CLI is not on `PATH`, which is the normal case in CI. Run it locally, and load the package
  once with `claude --plugin-dir <rendered claude package> plugin details sparklogs` to confirm the
  component inventory and that the MCP server is counted.
- **The generated-feed drift check** (`sync-generated-references.mjs --check`) compares `src/feeds/`
  against a sibling `sparklogs-source-library` checkout, found via `SPARKLOGS_SOURCE_LIBRARY_DIR` or
  `../sparklogs-source-library`. Without that checkout there is nothing to compare against. The
  recorded commit in `scripts/generated-SYNC-MANIFEST.json` is only as current as the last maintainer
  who had the sibling repo checked out.

## Versioning

All hosts share one product version. Source files do not contain a release version. The release workflow derives `VERSION` from a human-created tag such as `v1.2.3`.

## Release Process

1. Merge reviewed changes into `source`.
2. Write the user-facing release notes in the GitHub release when tagging; the repository keeps no changelog file.
3. Run the [local release dry run](#local-release-dry-run-before-tagging) on `source`.
4. Create and push a SemVer tag from `source`:

```bash
git checkout source
git pull --ff-only
git tag v1.2.3
git push origin v1.2.3
```

5. The release workflow (workflow file from the **tagged `source` commit** on tag-push) verifies the tag is reachable from `origin/source`, renders packages, FF-commits the tree onto `dist`, creates zip assets, publishes `SHA256SUMS`, and creates a GitHub Release.
6. CI then verifies:
   - **Same job:** `compare-dist` of the job's `build/dist` vs freshly fetched `origin/dist` (push matches render).
   - **Follow-on job:** re-render from the tag and `compare-dist` again (reproducibility).
7. After both jobs succeed:
   - On the GitHub Release, confirm four host zips (`sparklogs-claude`, `sparklogs-cursor`, `sparklogs-codex`, `sparklogs-generic`) and `SHA256SUMS` (four lines matching the zips).
   - Optionally smoke-test marketplace install on Claude Code, Cursor, or Codex.

`workflow_dispatch` can re-render an existing tag. Manual dispatch uses the workflow file from the default branch (`dist`); until the next successful publish copies an updated `release.yml` onto `dist`, dispatch may run an older workflow. Prefer tag-push from an updated `source` commit when changing the release workflow.

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

Release CI runs the same validators, then renders with an explicit `--version`, FF-publishes `build/dist` onto `dist`, and runs `compare-dist` (same job + reproducibility job).

## Validate a Published Release (`compare-dist`)

Release CI runs **`yarn run compare-dist`** automatically. Maintainers can still run it locally.

**Do not** pair `fullrebuild` or a render on a checked-out `dist` branch with `compare-dist` when validating an official release:

- `fullrebuild` stamps dev versions into `plugin.json` (real content diff).
- Rendering on `dist` records provenance for the publish commit (`dist` @ `<publish-sha>`), while CI renders from the **tag checkout** on `source` (`HEAD` @ `<tagged-source-sha>`). Plugin content may match, but host `plugin.json` version stamps can still differ if you rendered with a dev version.

To mirror the reproducibility job for tag `v1.2.3`:

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

Do not delete GitHub Releases or rewrite `dist` history by hand. To roll back, tag a new patch/minor version from a known-good source commit, publish it (new linear `dist` commit), and communicate the replacement version to MSPs. Force-push to `dist` is emergency-only (Release App bypass).

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
| Block force pushes | On for everyone except bypass actors (normal release is FF-only; App bypass remains for emergency recovery). Bypass mode: **Always allow**, not pull-request-only |
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

Bypass mode: **Always allow** (emergency force-push recovery; normal release publishes with a fast-forward commit).

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
