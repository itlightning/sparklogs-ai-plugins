# Fast workstation lint. Fail-closed if the sibling source-library checkout is missing
# or dirty (sync-generated --check). CI yarn validate still SKIPPED-passes drift.
.PHONY: precommit
precommit:
	node scripts/lint-src-layout.mjs
	node scripts/lint-identifier-tags.mjs
	node scripts/stitch-indexes.mjs --check
	node scripts/sync-generated-references.mjs --check
