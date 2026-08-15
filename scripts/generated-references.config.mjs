// Copyright (C) 2026 IT Lightning, LLC. All rights reserved.
// See LICENSE.

// Shared configuration for the generated AI reference set: which modules are carried and which
// artifacts come with them.
//
// The source library renders TWO trees and owns the split between them. `docs/generated/` keeps
// the verification and sourcing detail its own authors work against; `docs/generated-public/`
// is the reader-facing render, same filenames, no provenance artifact. This repo consumes the
// public tree VERBATIM and holds no opinion about its content.
//
// The gates below are a tripwire, not the mechanism. Upstream decides what is public; the gates
// exist so that a regression there fails here instead of shipping.

export const SOURCE_LIBRARY_DIR_ENV = 'SPARKLOGS_SOURCE_LIBRARY_DIR';
export const DEFAULT_SOURCE_LIBRARY_DIR = '../sparklogs-source-library';
export const LIBRARY_GENERATED_SUBPATH = 'docs/generated-public';
export const GENERATED_DIR = 'src/feeds';
export const MANIFEST_FILE = 'scripts/generated-SYNC-MANIFEST.json';
export const ROUTER_FILE = 'src/guides/generated-reference-router.md';
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
  'recipes.md',
  'mapping-ecs.md',
  'mapping-ocsf.md',
];

// Artifacts the public tree carries that this repo deliberately does not. Empty today: upstream
// already withholds what stays internal. The list is kept because the sync fails on any artifact
// appearing in neither this nor the public list, so a new artifact cannot arrive unnoticed.
export const INTERNAL_ARTIFACTS = [];

// One-line reader summary per artifact, used to build the router inventory block.
export const ARTIFACT_SUMMARY = {
  'README.md': 'module index: what each artifact answers and the order to read them in',
  'fields.md': 'what exists at rest, which surface writes it, and the raw fallback when nothing does',
  'enums.md': 'the closed token vocabularies that are safe to group by',
  'patterns.md': 'the decision procedure for whether a rendered pattern is expected, unexpected, or uncurated',
  'recipes.md': 'worked pivots, each resolving against the field schema',
  'mapping-ecs.md': 'ECS anchors for a query written against another taxonomy',
  'mapping-ocsf.md': 'OCSF anchors for a query written against another taxonomy',
};

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
// Upstream states this as a `Pattern stability: none` block. The older phrasings stay admitted so
// the rule reads a caveat however it is worded, rather than only in the shape it first met.
export const HEAD_CAVEAT = /pattern stability:\s*\*{0,2}none|never appears verbatim|anonymous in pattern space|variabiliz|uncurated head|no stable named pattern/i;

// Known defects in library content that this repo cannot fix. Each entry names ONE exact file,
// surface and claim, cites the escalation it is filed under, and is checked in BOTH directions:
// an entry whose finding has stopped occurring FAILS the lint, so the entry dies with the defect
// rather than outliving it.
export const KNOWN_DEFECTS = [];
