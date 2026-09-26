@AGENTS.md

# Project notes
- Planning docs live in `plan/` (committed). Start with `plan/README.md`; log work in `plan/10-progress-log.md`.
- Nothing time-dependent is hardcoded: server "now" only via `lib/snapshot.ts`, client time via `hooks/use-now.ts`, all date logic in `lib/anniversary` (WAT, UTC+1).
- Every historical fact in `content/` needs a source and a row in `plan/08-fact-register.md`.
- Gates: `npm run lint && npm run typecheck && npm test && npm run build`.
