// Copyright (C) 2026 IT Lightning, LLC. All rights reserved.
// See LICENSE.

// Shared configuration for the generated AI reference set: which modules are carried, which
// artifacts are public, and which annotations never leave the source library.
//
// The source library owns the artifact CONTENT. This repo owns the decision about what is
// public. Evidence tiers (spec versus observed claims and witness counts) are the library's own
// measuring instrument, not a contract a consumer may rely on, so they are projected out here
// and asserted absent on every re-sync.

export const SOURCE_LIBRARY_DIR_ENV = 'SPARKLOGS_SOURCE_LIBRARY_DIR';
export const DEFAULT_SOURCE_LIBRARY_DIR = '../sparklogs-source-library';
export const LIBRARY_GENERATED_SUBPATH = 'docs/generated';
export const GENERATED_DIR = 'generated';
export const MANIFEST_FILE = 'generated/SYNC-MANIFEST.json';
export const ROUTER_FILE = 'shared-references/generated-reference-router.md';
export const ROUTER_BEGIN = '<!-- BEGIN GENERATED INVENTORY -->';
export const ROUTER_END = '<!-- END GENERATED INVENTORY -->';

// Every module carried into this repo. A module directory in the library that is not listed
// here is not synced; a module listed here that the library does not produce is a sync failure.
export const MODULES = ['win.eventlog.security'];

// Artifacts carried outward, in the order a first-time reader should meet them.
export const PUBLIC_ARTIFACTS = [
  'README.md',
  'fields.md',
  'enums.md',
  'patterns.md',
  'mapping-ecs.md',
  'mapping-ocsf.md',
];

// Artifacts that stay in the library. Listing one here is a decision, not an oversight: the
// sync fails on any library artifact that appears in neither list, so a new artifact cannot
// arrive unnoticed in either direction.
//
// `recipes.md` is held back rather than internal by nature. Three of its worked pivots do not
// parse as query language: a comparison against a null literal, an unpromoted provider field, and
// a field-to-field comparison. The generator's recipe check only resolves paths under the
// module's own prefixes, so platform field names and query syntax reach a reader unchecked. The
// artifact cannot be patched here, and shipping it inside a package that advertises it as worked
// and correct is worse than not shipping it. One line moves it back once the library fix lands.
export const INTERNAL_ARTIFACTS = ['provenance.md', 'recipes.md'];

// One-line reader summary per artifact, used to build the router inventory block.
export const ARTIFACT_SUMMARY = {
  'README.md': 'module index: what each artifact answers and the order to read them in',
  'fields.md': 'what exists at rest, which surface writes it, and the raw fallback when nothing does',
  'enums.md': 'the closed token vocabularies that are safe to group by',
  'patterns.md': 'the decision procedure for whether a rendered pattern is expected, unexpected, or uncurated',
  'mapping-ecs.md': 'ECS anchors for a query written against another taxonomy',
  'mapping-ocsf.md': 'OCSF anchors for a query written against another taxonomy',
};

// Projection rules. Each is mechanical and named so the manifest can record exactly what ran.
export const PROJECTION = {
  // Table columns removed wherever a header cell matches, case-insensitively. These names are
  // matched on the header cell alone, so a future artifact with a legitimate column literally
  // named Spec or Evidence would lose it silently. Revisit if the library ever ships one.
  dropTableColumns: ['Evidence', 'Spec', 'Observed', 'Witnesses', 'Binding cited'],
  // Sections removed by heading text, through to the next heading of the same or higher level.
  dropSections: ['Evidence tiers'],
  // Blank-line-delimited blocks removed when any line matches.
  dropBlocks: [/evidence axes/i],
  // Lines removed when they link to an artifact that stays internal.
  dropLinksTo: INTERNAL_ARTIFACTS,
  // Exact-text repairs for observation claims the mechanical rules above cannot reach, because
  // they sit mid-sentence inside prose worth keeping. Each entry must match exactly once in its
  // artifact or the sync fails: a rewrite that silently matches nothing is a rule that has
  // stopped being applied while still reading as applied. Every one of these dies when the
  // library grows a public render mode.
  rewrites: [
    {
      artifact: 'enums.md',
      find: 'Every token an agent can group by, with what it means and how far it can be trusted.',
      replace: 'Every token an agent can group by, with what it means.',
      why: 'trust promise the removed evidence columns were carrying',
    },
    {
      artifact: 'enums.md',
      find: ' It is the one rung with no portable kind beside it on the actor family, because nothing has yet witnessed a group as the actor.',
      replace: ' It is the one rung with no portable kind beside it on the actor family.',
      why: 'observation claim about the capture corpus',
    },
    {
      artifact: 'enums.md',
      find: 'auth_negoextender is the Entra negotiate-extension package (NegoExtender), witnessed on cloud-joined endpoints.',
      replace: 'auth_negoextender is the Entra negotiate-extension package (NegoExtender) used by cloud-joined endpoints.',
      why: 'observation claim about the capture corpus',
    },
    {
      artifact: 'enums.md',
      find: 'The deny tier and the message-catalog reference payload form have no witness anywhere; a value',
      replace: 'A value',
      why: 'observation claim about the capture corpus',
    },
    {
      artifact: 'README.md',
      find: '- [`fields.md`](fields.md): what exists at rest, what writes it, and how far to trust it',
      replace: '- [`fields.md`](fields.md): what exists at rest, what writes it, and the raw fallback when nothing does',
      why: 'trust promise the removed evidence columns were carrying',
    },
  ],
};

export const PROJECTION_NOTE =
  '<!-- Public projection synced by scripts/sync-generated-references.mjs. Internal evidence-tier annotations are omitted. -->';

// Gate A: no synced artifact may carry the evidence instrument.
export const FORBIDDEN_TABLE_HEADERS = ['evidence', 'spec', 'observed', 'witnesses', 'witness count', 'binding cited'];
// Deliberately narrow: a bare "witness" or "evidence" reads naturally in curation prose, so only
// the counting instrument's own vocabulary is forbidden.
export const FORBIDDEN_TOKENS = [
  /witness count/i,
  /witness corpus/i,
  /witness (event|events|set|data)/i,
  /observation corpus/i,
  /\bwitnesses\b/i,
  /\bwitnessed\b/i,
  /\bunwitnessed\b/i,
  /\bno witness\b/i,
  /\bnot counted\b/i,
  /\bspec-derived\b/i,
  /no observed (event|events|row|rows|value|values)/i,
  /evidence tier/i,
  /evidence axes/i,
];

// Gate B, per-surface half. A reason name carrying a token with BOTH letters and digits is
// variabilized away before the pattern is derived, so the surface renders no stable named
// pattern. A block that claims otherwise teaches a consumer to expect a string that never
// appears and files a harmless shape as drift.
export const ALNUM_TOKEN = /(?=[a-z_]*[0-9])(?=[0-9_]*[a-z])[a-z0-9]+/i;
export const HEAD_CAVEAT = /variabiliz|uncurated head|no stable named pattern/i;

// Known defects in library content that this repo cannot fix. Each entry names ONE exact file,
// surface and claim, cites the escalation it is filed under, and is checked in BOTH directions:
// an entry whose finding has stopped occurring FAILS the lint, so the entry dies with the defect
// rather than outliving it.
export const KNOWN_DEFECTS = [
  {
    artifact: 'patterns.md',
    surface: '`kerberos_rc4_ticket` / `default`',
    claim: '**Renders:** `kerberos_rc4_ticket: NOTABLE: Kerberos service ticket used weak encryption`',
    escalation: 'E2',
    why: 'AutoExtract variabilizes the rc4 head, so the rendered pattern carries no reason name. Fix belongs in the library generator.',
  },
];
