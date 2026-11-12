# Parked content

This folder never ships.
The renderer packages only `src/`, the dist-root files and `docs/`, and validation fails on any other path in a package.

It holds guide text that could help once SparkLogs carries the data or tool it needs, and that would mislead an AI today: a tool that does not exist, a log source the agent does not collect, a host with no package.
Each file mirrors the `src/` path it came from and opens with the source file and commit it was moved from.

Lints do not scan this folder, so nothing here is vetted against the current tools or fields.
Before moving text back into `src/`, check every field, argument, tool and reason against the live tools and the generated references, and run `yarn run validate`.
Nothing in `src/` may link here.
