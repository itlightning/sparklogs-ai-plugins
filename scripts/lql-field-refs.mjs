// Copyright (C) 2026 IT Lightning, LLC. All rights reserved.
// See LICENSE.

// Field references in LQL text, and the vet that every one is real.
//
// A field is a path token followed by an operator (= != : !: >= <= > < in, not in, between)
// or by the presence mark `!`. A bare word with no operator is free text, not a field.
// Quoted strings, /regex/ literals and value lists are skipped; `any:` is the meta field.
// `path[](a=1 AND b>2)` yields the root `path[]` plus `path[].a` and `path[].b`.
// In fenced ```lql blocks, `<-` starts an annotation that runs to the end of the line.
//
// Vetted means: in the committed list_fields snapshot, declared by the pack harvest, or on
// the lql_pedagogical list. An object-array root, or a name on lql_families, also passes when
// it prefixes a vetted path.

const KEYWORDS = new Set(['and', 'or', 'not', 'in', 'between']);
const SEGMENT = String.raw`(?:\.(?:[A-Za-z_][\w-]*|"(?:[^"\\]|\\.)*")|\[\d+\]|\[\](?!\())`;
const PATH_RE = new RegExp(String.raw`^[A-Za-z_][\w-]*${SEGMENT}*(?:#[a-z]+(?:\[\])?)?`);
const WHOLE_PATH_RE = new RegExp(PATH_RE.source + '$');
const COMPARE_RE = /^\s*(!=|!:|<>|>=|<=|=|:|>|<)/;
const PRESENCE_RE = /^!(?=$|[\s)])/;
const LIST_RE = /^\s+(?:not\s+)?in\s*(?=\()/i;
const BETWEEN_RE = /^\s+between\s/i;

// Compare form: array marks, indexes and type suffixes do not change which field is named.
export function canonicalField(field) {
  return field.replace(/#[a-z]+(?:\[\])?/g, '').replace(/\[\d*\]/g, '');
}

// Returns [{ field, arrayRoot }] for one LQL expression.
export function extractLqlFields(text) {
  const out = [];
  const scopes = [];
  const s = text;
  let i = 0;
  const skipSpace = () => { while (i < s.length && /\s/.test(s[i])) i += 1; };
  const skipString = () => {
    i += 1;
    while (i < s.length && s[i] !== '"') i += s[i] === '\\' ? 2 : 1;
    i += 1;
  };
  const skipRegex = () => {
    const end = s.indexOf('/', i + 1);
    i = end < 0 ? s.length : end + 1;
  };
  const skipValue = () => {
    skipSpace();
    if (s[i] === '(') {
      let depth = 0;
      do {
        if (s[i] === '"') { skipString(); continue; }
        if (s[i] === '(') depth += 1;
        if (s[i] === ')') depth -= 1;
        i += 1;
      } while (i < s.length && depth > 0);
      return;
    }
    if (s[i] === '"') { skipString(); return; }
    if (s[i] === '/') { skipRegex(); return; }
    while (i < s.length && !/[\s()]/.test(s[i])) {
      if (s[i] === '"') skipString();
      else i += 1;
    }
  };
  const prefix = () => {
    for (let k = scopes.length - 1; k >= 0; k -= 1) if (scopes[k]) return scopes[k];
    return '';
  };
  while (i < s.length) {
    skipSpace();
    if (i >= s.length) break;
    const c = s[i];
    if (c === '"') { skipString(); continue; }
    if (c === '/') { skipRegex(); continue; }
    if (c === '(') { scopes.push(''); i += 1; continue; }
    if (c === ')') { scopes.pop(); i += 1; continue; }
    if (c === '-' || c === '&' || c === '|') { i += 1; continue; }
    const m = PATH_RE.exec(s.slice(i));
    if (!m) {
      while (i < s.length && !/[\s()]/.test(s[i])) i += 1;
      continue;
    }
    const word = m[0];
    i += word.length;
    if (KEYWORDS.has(word.toLowerCase())) continue;
    const field = prefix() + word;
    if (s.startsWith('[](', i)) {
      i += 3;
      out.push({ field: `${field}[]`, arrayRoot: true });
      scopes.push(`${field}[].`);
      continue;
    }
    const rest = s.slice(i);
    let op = COMPARE_RE.exec(rest);
    if (op) {
      i += op[0].length;
      if (word.toLowerCase() !== 'any') out.push({ field, arrayRoot: false });
      skipValue();
      continue;
    }
    op = PRESENCE_RE.exec(rest);
    if (op) {
      i += 1;
      out.push({ field, arrayRoot: field.endsWith('[]') });
      continue;
    }
    op = LIST_RE.exec(rest);
    if (op) {
      i += op[0].length;
      out.push({ field, arrayRoot: false });
      skipValue();
      continue;
    }
    op = BETWEEN_RE.exec(rest);
    if (op) {
      i += op[0].length;
      out.push({ field, arrayRoot: false });
      skipValue();
      skipSpace();
      if (/^and\s/i.test(s.slice(i))) {
        i += 3;
        skipValue();
      }
    }
  }
  return out;
}

// A tagged `span` (LQL): a lone path names that field; anything else is an expression.
export function extractTaggedSpan(span) {
  if (WHOLE_PATH_RE.test(span) && !KEYWORDS.has(span.toLowerCase())) {
    return [{ field: span, arrayRoot: span.endsWith('[]') }];
  }
  return extractLqlFields(span);
}

export function stripAnnotation(line) {
  const at = line.indexOf('<-');
  return at < 0 ? line : line.slice(0, at);
}

export function parseLiveFields(text) {
  const out = new Set();
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith('#')) continue;
    out.add(canonicalField(line));
  }
  return out;
}

// Paths the snapshot spells with an array mark (`a[].b` gives `a`): an LQL reference below one of
// them must use the item grammar (`a[](b=1)` or `a[].b`); `a.b` matches nothing on the server.
export function parseLiveArrayRoots(text) {
  const out = new Set();
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith('#')) continue;
    for (let at = line.indexOf('[]'); at >= 0; at = line.indexOf('[]', at + 2)) {
      out.add(canonicalField(line.slice(0, at)));
    }
  }
  return out;
}

function missingItemMark(field, arrayRoots) {
  const raw = field.replace(/#[a-z]+(?:\[\])?/g, '');
  const f = canonicalField(field);
  for (const root of arrayRoots) {
    if (f.startsWith(`${root}.`) && !raw.startsWith(`${root}[`)) return root;
  }
  return null;
}

function prefixesOf(fields) {
  const out = new Set();
  for (const f of fields) {
    const parts = f.split('.');
    for (let k = 1; k < parts.length; k += 1) out.add(parts.slice(0, k).join('.'));
  }
  return out;
}

export function pedagogicalMatch(pedagogical, field) {
  for (const entry of pedagogical) {
    if (entry.endsWith('.*')) {
      const root = entry.slice(0, -2);
      if (field === root || field.startsWith(`${root}.`)) return true;
    } else if (field === entry) {
      return true;
    }
  }
  return false;
}

// Returns vet(ref) -> 'live' | 'pack' | 'pedagogical' | 'needs_item' | null.
export function makeFieldVet({ live, pack, pedagogical, families = new Set(), arrayRoots = new Set() }) {
  const packCanon = new Set([...pack].map(canonicalField));
  const livePrefixes = prefixesOf(live);
  const packPrefixes = prefixesOf(packCanon);
  return ({ field, arrayRoot }) => {
    const f = canonicalField(field);
    if (pedagogicalMatch(pedagogical, f)) return 'pedagogical';
    if (missingItemMark(field, arrayRoots)) return 'needs_item';
    const prefixOk = arrayRoot || families.has(f);
    if (live.has(f) || (prefixOk && livePrefixes.has(f))) return 'live';
    if (packCanon.has(f) || (prefixOk && packPrefixes.has(f))) return 'pack';
    return null;
  };
}

// The hand lists in identifier-sot.yaml must themselves be real.
export function vetSotLists({ resident, families, live, pack }) {
  const errors = [];
  const packCanon = new Set([...pack].map(canonicalField));
  const known = new Set([...live, ...packCanon]);
  const knownPrefixes = prefixesOf(known);
  for (const name of resident) {
    if (!known.has(canonicalField(name))) {
      errors.push(`identifier-sot.yaml lql_resident \`${name}\` is in neither the list_fields snapshot nor the pack harvest`);
    }
  }
  for (const family of families) {
    if (!knownPrefixes.has(family)) {
      errors.push(`identifier-sot.yaml lql_families \`${family}\` prefixes no field in the list_fields snapshot or the pack harvest`);
    }
  }
  return errors;
}

function fieldsOf(refs) {
  return refs.map((r) => r.field);
}

function expectFields(label, got, want) {
  const g = JSON.stringify(fieldsOf(got));
  const w = JSON.stringify(want);
  if (g !== w) throw new Error(`lql extractor ${label}: got ${g}, want ${w}`);
}

// Planted inputs: each line is a grammar case the vet depends on.
export function proveLqlFieldRefs() {
  expectFields('compare', extractLqlFields('winlog.event_id = 4672 AND sparklogs.actor.kind = "account"'),
    ['winlog.event_id', 'sparklogs.actor.kind']);
  expectFields('free text', extractLqlFields('failed "timed out" win.servicing.dism'), []);
  expectFields('string and regex values', extractLqlFields('message: /a=b/ OR message = "x: y = z"'),
    ['message', 'message']);
  expectFields('keywords and lists', extractLqlFields('NOT (severity in (error, critical)) OR source not in (a, b)'),
    ['severity', 'source']);
  expectFields('presence', extractLqlFields('NOT trace_id! AND sparklogs.data.processes[]!'),
    ['trace_id', 'sparklogs.data.processes[]']);
  expectFields('element grammar', extractLqlFields('sparklogs.data.services[](current_state=stopped AND start_type>3) AND t>1'),
    ['sparklogs.data.services[]', 'sparklogs.data.services[].current_state', 'sparklogs.data.services[].start_type', 't']);
  expectFields('item leaf', extractLqlFields('sparklogs.data.processes[].pid = 4'), ['sparklogs.data.processes[].pid']);
  expectFields('between', extractLqlFields('t between 2026-04-23T03:00:00Z and 2026-04-23T04:00:00Z AND event_id=1'),
    ['t', 'event_id']);
  expectFields('any meta', extractLqlFields('any: "credit card"'), []);
  expectFields('type suffix', extractLqlFields('x.status#s not in (2??, 3??)'), ['x.status#s']);
  expectFields('annotation', extractLqlFields(stripAnnotation('subsource LIKE "a%"  <- WRONG (no LIKE: x = 1)')), []);
  expectFields('tagged path', extractTaggedSpan('sparklogs.data.processes[].handle_count'),
    ['sparklogs.data.processes[].handle_count']);
  expectFields('tagged expression', extractTaggedSpan('path[]! AND NOT path[](pid=1)'),
    ['path[]', 'path[]', 'path[].pid']);

  const vet = makeFieldVet({
    live: parseLiveFields('# header\nevent_id\nsparklogs.data.services[].current_state\nx.b[]\n'),
    pack: new Set(['win.eventlog.system.tpm_command']),
    pedagogical: ['x.*', 'path.*', 'field'],
    families: new Set(['sparklogs.data']),
    arrayRoots: parseLiveArrayRoots('# header\nevent_id\nsparklogs.data.services[].current_state\nx.b[]\n'),
  });
  const verdicts = [
    ['event_id', false, 'live'],
    ['winlog.event_id', false, null],
    ['sparklogs.data.services[].current_state', false, 'live'],
    ['sparklogs.data.services.current_state', false, 'needs_item'],
    ['sparklogs.data.services[]', true, 'live'],
    ['sparklogs.data', false, 'live'],
    ['sparklogs.data.services', false, null],
    ['win.eventlog.system.tpm_command', false, 'pack'],
    ['x.anything.goes', false, 'pedagogical'],
    ['path[].pid', false, 'pedagogical'],
    ['fieldx', false, null],
  ];
  for (const [field, arrayRoot, want] of verdicts) {
    const got = vet({ field, arrayRoot });
    if (got !== want) throw new Error(`lql vet ${field}: got ${got}, want ${want}`);
  }
  const sotErrors = vetSotLists({
    resident: ['event_id', 'correlation_id'],
    families: ['sparklogs.data', 'sparklogs.error'],
    live: parseLiveFields('event_id\nsparklogs.data.services[].name\n'),
    pack: new Set(),
  });
  if (sotErrors.length !== 2 || !sotErrors[0].includes('correlation_id') || !sotErrors[1].includes('sparklogs.error')) {
    throw new Error(`sot list vet missed planted entries: ${sotErrors.join('; ')}`);
  }
}
