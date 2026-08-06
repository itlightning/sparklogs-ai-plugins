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
  'recipes.md',
  'mapping-ecs.md',
  'mapping-ocsf.md',
];

// Artifacts that stay in the library. Listing one here is a decision, not an oversight: the
// sync fails on any library artifact that appears in neither list, so a new artifact cannot
// arrive unnoticed in either direction.
export const INTERNAL_ARTIFACTS = ['provenance.md'];

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

// Projection rules. Each is mechanical and named so the manifest can record exactly what ran.
export const PROJECTION = {
  // Table columns removed wherever a header cell matches, case-insensitively.
  dropTableColumns: ['Evidence', 'Spec', 'Observed', 'Witnesses', 'Binding cited'],
  // Sections removed by heading text, through to the next heading of the same or higher level.
  dropSections: ['Evidence tiers'],
  // Blank-line-delimited blocks removed when any line matches.
  dropBlocks: [/evidence axes/i],
  // Lines removed when they link to an artifact that stays internal.
  dropLinksTo: INTERNAL_ARTIFACTS,
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
  /\bwitnesses\b/i,
  /\bunwitnessed\b/i,
  /\bnot counted\b/i,
  /evidence tier/i,
  /evidence axes/i,
];
