// Copyright (C) 2026 IT Lightning, LLC. All rights reserved.
// See LICENSE.

// Source markdown is written once, in one canonical dialect, and rewritten per host at render time.
// Two things differ between hosts and neither can be expressed portably in the source text:
//
//  1. Corpus paths. Source prose cites `guides/x.md`, `playbooks/x.md`, `themes/x.md`, `feeds/<id>/`
//     as if the reader stood at the package root. Skill markdown is rewritten to paths under that
//     skill's references/ subtree (all hosts, including Claude). Commands, agents, and other
//     package-root markdown on Claude use ${CLAUDE_PLUGIN_ROOT}.
//  2. Command invocation. Claude namespaces a plugin command as /sparklogs:<filename-stem>.
//     Remaining commands are named sparklogs-explain / sparklogs-summary so Desktop's
//     unscoped picker matches skill naming; Claude Code therefore shows
//     /sparklogs:sparklogs-explain. Cursor uses the frontmatter name. Codex ships no
//     repo commands, so the citation names the skill.
//
// Source stays single-source: no host dialect is hand-written into src/.

import path from 'node:path';

export const CORPUS_TOPS = ['guides', 'playbooks', 'themes', 'feeds'];

// A corpus citation ends at a `.md` file or a directory slash. Bounding the tail that way keeps a
// trailing sentence period out of the match, which an open character class would swallow.
// `<id>`-style segments are citations too: the reader substitutes the id and follows the path, so
// the host prefix has to be on them as well.
const CORPUS_REF_RE = new RegExp(
  `(?<![\\w./$-])(?:${CORPUS_TOPS.join('|')})/[A-Za-z0-9<][A-Za-z0-9._/<>-]*?(?:\\.md|/)(?![\\w-])`,
  'g',
);

/** A citation with a `<placeholder>` segment names a shape, not a file, so it cannot be resolved. */
export function isPlaceholderRef(ref) {
  return ref.includes('<');
}

// One canonical citation shape in source: package-root relative, no leading ./ or ../ and no src/.
// Any other shape slips past the citation matcher's left boundary, so it is never rewritten for a
// host and never resolved by the packaging gate: it ships dead and green. Refuse it at the source.
export const NONCANONICAL_REF_RE = new RegExp(
  `(?<![\\w$-])(?:\\.{1,2}/|src/)+(?:${CORPUS_TOPS.join('|')})/[A-Za-z0-9<][A-Za-z0-9._/<>-]*?(?:\\.md|/)(?![\\w-])`,
  'g',
);

export function listNoncanonicalRefs(text) {
  return [...text.matchAll(NONCANONICAL_REF_RE)].map((match) => match[0]);
}

// Some source prose is only true on hosts that ship commands. Both truths live in src, side by side,
// and the renderer keeps the arm that matches the host. Anything else drifts: a single body cannot
// describe an invocation that exists on two hosts and not on the other two.
const HOST_VARIANT_KEYS = new Set(['commands']);
const HOST_VARIANT_RE = /<!-- BEGIN HOSTVARIANT:([a-z]+) -->\n([\s\S]*?)<!-- ELSE HOSTVARIANT:\1 -->\n([\s\S]*?)<!-- END HOSTVARIANT:\1 -->\n?/g;
const HOST_VARIANT_TAG_RE = /<!-- (?:BEGIN|ELSE|END) HOSTVARIANT:([a-z]+) -->/g;

export function applyHostVariants(text, capabilities, file = 'markdown') {
  for (const [, key] of text.matchAll(HOST_VARIANT_TAG_RE)) {
    if (!HOST_VARIANT_KEYS.has(key)) throw new Error(`${file} has unknown host variant key: ${key}`);
  }
  const tagCount = [...text.matchAll(HOST_VARIANT_TAG_RE)].length;
  const blocks = [...text.matchAll(HOST_VARIANT_RE)];
  if (tagCount !== blocks.length * 3) {
    throw new Error(`${file} has an unbalanced HOSTVARIANT block`);
  }
  return text.replace(HOST_VARIANT_RE, (_, key, whenTrue, whenFalse) => {
    const arm = capabilities[key] ? whenTrue : whenFalse;
    return `${arm.replace(/\n+$/, '')}\n`;
  });
}

const COMMAND_RE = /\/sparklogs:([a-z][a-z-]*)/g;

export const CLAUDE_ROOT_TOKEN = '${CLAUDE_PLUGIN_ROOT}';

// Cursor command argument substitution is not documented, so the rendered body must read correctly
// whether or not the host injects the invocation's free text. This phrase does.
export const CURSOR_ARGUMENT_TEXT = 'the request text provided with this command.';

export function listCorpusRefs(text) {
  return [...text.matchAll(CORPUS_REF_RE)].map((match) => match[0]);
}

/** Claude: cite the corpus from the plugin root, which the host expands in plugin markdown. */
export function rewriteCorpusForClaude(text) {
  return text.replace(CORPUS_REF_RE, (ref) => `${CLAUDE_ROOT_TOKEN}/${ref}`);
}

/**
 * Every other host: the corpus is materialized under the citing skill's references/ subtree, so the
 * citation becomes a path relative to the directory the citing file sits in.
 */
export function rewriteCorpusRelative(text, fileDirPkgRel, referencesDirPkgRel) {
  return text.replace(CORPUS_REF_RE, (ref) => {
    const target = path.posix.join(referencesDirPkgRel, ref);
    return path.posix.relative(fileDirPkgRel, target) + (ref.endsWith('/') ? '/' : '');
  });
}

export function rewriteCommandsForCursor(text) {
  return text.replace(COMMAND_RE, (_, name) => {
    const stem = name.startsWith('sparklogs-') ? name.slice('sparklogs-'.length) : name;
    return `/sparklogs-${stem}`;
  });
}

/** Codex and generic ship no commands; the workflow is named, not invoked. */
export function rewriteCommandsAsSkillNames(text) {
  return text.replace(COMMAND_RE, (_, name) => (
    name.startsWith('sparklogs-') ? name : `sparklogs-${name}`
  ));
}

export function rewriteArgumentsForCursor(text) {
  return text.replaceAll('$ARGUMENTS', CURSOR_ARGUMENT_TEXT);
}

function expectEqual(actual, expected, label) {
  if (actual !== expected) {
    throw new Error(`${label}: got ${JSON.stringify(actual)}, want ${JSON.stringify(expected)}`);
  }
}

export function proveHostTransforms() {
  expectEqual(
    rewriteCorpusForClaude('See `guides/lql-reference.md` first.'),
    'See `${CLAUDE_PLUGIN_ROOT}/guides/lql-reference.md` first.',
    'claude rewrite of a guide citation',
  );
  expectEqual(
    rewriteCorpusForClaude('Feed docs live in `feeds/win.eventlog.security/`.'),
    'Feed docs live in `${CLAUDE_PLUGIN_ROOT}/feeds/win.eventlog.security/`.',
    'claude rewrite of a feed directory citation',
  );
  // The tail bound must stop at .md so the sentence period survives.
  expectEqual(
    rewriteCorpusForClaude('Read themes/endpoint-protection.md. Then stop.'),
    'Read ${CLAUDE_PLUGIN_ROOT}/themes/endpoint-protection.md. Then stop.',
    'claude rewrite leaves the sentence period alone',
  );
  // Already-anchored text must not be anchored twice.
  expectEqual(
    rewriteCorpusForClaude('${CLAUDE_PLUGIN_ROOT}/guides/lql-reference.md'),
    '${CLAUDE_PLUGIN_ROOT}/guides/lql-reference.md',
    'claude rewrite is idempotent',
  );
  // A directory name that merely ends in a corpus word is not a citation.
  expectEqual(
    rewriteCorpusForClaude('skills/sparklogs-ask/SKILL.md and myguides/x.md'),
    'skills/sparklogs-ask/SKILL.md and myguides/x.md',
    'claude rewrite ignores non-citations',
  );
  expectEqual(
    rewriteCorpusRelative('See `guides/lql-reference.md`.', 'skills/sparklogs-ask', 'skills/sparklogs-ask/references'),
    'See `references/guides/lql-reference.md`.',
    'relative rewrite from a SKILL.md',
  );
  expectEqual(
    rewriteCorpusRelative(
      'See `feeds/win.eventlog.system/fields.md`.',
      'skills/sparklogs-ask/references/themes',
      'skills/sparklogs-ask/references',
    ),
    'See `../feeds/win.eventlog.system/fields.md`.',
    'relative rewrite from a materialized theme',
  );
  expectEqual(
    rewriteCorpusRelative(
      'See `playbooks/backup-failure.md`.',
      'skills/sparklogs-ask/references/feeds/win.eventlog.system',
      'skills/sparklogs-ask/references',
    ),
    'See `../../playbooks/backup-failure.md`.',
    'relative rewrite from a materialized feed artifact',
  );
  expectEqual(
    rewriteCommandsForCursor('Offer `/sparklogs:sparklogs-explain` next.'),
    'Offer `/sparklogs-explain` next.',
    'cursor rewrite strips a filename that already carries sparklogs-',
  );
  expectEqual(
    rewriteCommandsAsSkillNames('Offer `/sparklogs:sparklogs-explain` next.'),
    'Offer `sparklogs-explain` next.',
    'skill-name rewrite keeps a filename that already carries sparklogs-',
  );
  expectEqual(
    rewriteArgumentsForCursor('Investigate: $ARGUMENTS'),
    `Investigate: ${CURSOR_ARGUMENT_TEXT}`,
    'cursor argument rewrite',
  );
  expectEqual(
    rewriteCorpusForClaude('Open `feeds/<id>/reasons.md`.'),
    'Open `${CLAUDE_PLUGIN_ROOT}/feeds/<id>/reasons.md`.',
    'claude rewrite of a placeholder citation',
  );
  const refs = listCorpusRefs('`guides/a.md` `feeds/win.x/` `themes/b.md` `feeds/<id>/`');
  expectEqual(
    refs.join(','),
    'guides/a.md,feeds/win.x/,themes/b.md,feeds/<id>/',
    'corpus reference listing',
  );
  if (isPlaceholderRef('guides/a.md') || !isPlaceholderRef('feeds/<id>/')) {
    throw new Error('placeholder detection misfired');
  }
  // A prefixed citation is invisible to the rewriter, which is exactly why it must be refused.
  expectEqual(
    rewriteCorpusForClaude('See `./guides/lql-reference.md` and `src/feeds/win.x/`.'),
    'See `./guides/lql-reference.md` and `src/feeds/win.x/`.',
    'prefixed citations are outside the rewriter',
  );
  expectEqual(
    listNoncanonicalRefs('a `./guides/a.md` b `../themes/b.md` c `src/feeds/win.x/` d `guides/ok.md`').join(','),
    './guides/a.md,../themes/b.md,src/feeds/win.x/',
    'noncanonical citation detection',
  );
  const variant = '<!-- BEGIN HOSTVARIANT:commands -->\nslash form\n<!-- ELSE HOSTVARIANT:commands -->\nskill form\n<!-- END HOSTVARIANT:commands -->\n';
  expectEqual(applyHostVariants(variant, { commands: true }, 'v.md'), 'slash form\n', 'variant true arm');
  expectEqual(applyHostVariants(variant, { commands: false }, 'v.md'), 'skill form\n', 'variant false arm');
  for (const [broken, label] of [
    ['<!-- BEGIN HOSTVARIANT:commands -->\nx\n', 'missing ELSE and END'],
    ['<!-- BEGIN HOSTVARIANT:commands -->\nx\n<!-- END HOSTVARIANT:commands -->\n', 'missing ELSE'],
    ['<!-- BEGIN HOSTVARIANT:nope -->\nx\n<!-- ELSE HOSTVARIANT:nope -->\ny\n<!-- END HOSTVARIANT:nope -->\n', 'unknown key'],
  ]) {
    let threw = false;
    try {
      applyHostVariants(broken, { commands: true }, 'v.md');
    } catch {
      threw = true;
    }
    if (!threw) throw new Error(`applyHostVariants did not reject: ${label}`);
  }
}
