# FIN-11 — Establish the self-documenting agentic loop (outcome)

- **Issue:** FIN-11 — tracked in Multica
- **PR:** https://github.com/finxoapp/finxo/pull/2
- **Status:** docs-only PR opened, awaiting QA Reviewer sign-off before merge.

## What shipped

The `docs/` scaffolding that turns the repo into the squad's durable shared
memory:

- `docs/README.md` — documents the agentic loop (brief → work → outcome → PR →
  review → done) and instructs agents to consult `docs/issues`, `docs/adr`, and
  `docs/glossary` before starting work.
- `docs/glossary.md` — seeded with: agentic loop, brief, outcome, ADR.
- `docs/adr/_template.md` — ADR template matching the repo's existing ADR style.
- `docs/adr/0007-adopt-self-documenting-agentic-loop.md` — ADR recording the
  decision (status: accepted).
- `docs/issues/_template/brief.md` + `outcome.md` — input/outcome templates.
- `docs/issues/FIN-11/brief.md` + `outcome.md` — this issue, dogfooding the loop.

## Key decisions

- **Convention, not automation** — the loop is enforced via the squad's standing
  instructions, with no autopilot/cron in this phase. Recorded in
  [ADR-0007](../../adr/0007-adopt-self-documenting-agentic-loop.md).
- **The loop ADR is `0007`, not `0001`** — the Director's note suggested `0001`,
  but `docs/adr/0001`–`0006` already exist (the foundation ADRs). Reusing a number
  would collide, so the loop decision takes the next free number, `0007`. Flagged
  per the no-silent-divergence rule.
- **ADR style matched** — frontmatter `status:` + `# NNNN — Title`, Context /
  Considered options / Decision / Consequences, consistent with ADRs 0001–0006.

## Acceptance criteria — verification

- [x] `docs/` scaffolding exists (`README.md`, `issues/_template/`, `adr/`
      template, `glossary.md`).
- [x] `docs/README.md` documents the loop and the "consult prior context first"
      rule.
- [x] FIN-11's own `brief.md` + `outcome.md` are committed (this file).
- [x] Squad standing instructions updated with the convention (Director,
      out-of-band — confirmed in the issue thread).
- [ ] Docs-only PR opened and reviewed by QA Reviewer before merge — PR opened by
      this run; QA sign-off pending (routed by the Director).

## Follow-ups

- QA Reviewer approves the docs-only PR, then it merges and FIN-11 moves to Done.
- Automation (autopilot/cron to scaffold briefs/outcomes and open PRs) may be
  layered on later once the convention is proven — would supersede ADR-0007's
  "convention only" stance.
