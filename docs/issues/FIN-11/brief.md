# FIN-11 — Establish the self-documenting agentic loop (brief)

- **Issue:** FIN-11 — https://github.com/finxoapp/finxo (tracked in Multica)
- **Assignee:** Architect
- **Type:** architecture (docs-only)

## Spec

Make the GitHub repo (`finxoapp/finxo`) the squad's durable shared memory so any
agent can refer back to what was asked and what was delivered instead of
re-deriving it. Every issue — code and non-code — flows through a loop that ends
with a merged PR documenting both the input (`brief.md`) and the outcome
(`outcome.md`).

Scaffold `docs/` with:

- `docs/README.md` — explains the loop and tells agents to consult
  `docs/issues`, `docs/adr`, and `docs/glossary` before starting work.
- `docs/issues/_template/brief.md` and `outcome.md` — input/outcome templates.
- `docs/adr/_template.md` — ADR template, and an ADR recording this decision.
- `docs/glossary.md` — seeded with: agentic loop, brief, outcome, ADR.
- Dogfood: `docs/issues/FIN-11/brief.md` + `outcome.md`.

## Acceptance criteria

- [ ] `docs/` scaffolding exists with `README.md`, `issues/` (template `brief.md`
      + `outcome.md`), `adr/` (with ADR template), and `glossary.md`.
- [ ] `docs/README.md` documents the loop and how agents consult prior
      briefs/outcomes/ADRs before starting work.
- [ ] This issue's own `brief.md` + `outcome.md` are committed under
      `docs/issues/FIN-11/` (dogfooding).
- [ ] The convention is baked into the FINXO squad standing instructions
      (Director — done out-of-band before this issue).
- [ ] A docs-only PR is opened against `finxoapp/finxo` and reviewed by QA
      Reviewer before merge.

## Constraints

- Match the existing repo conventions (ADR frontmatter `status:` + `# NNNN —
  Title`, Context / Considered options / Decision / Consequences).
- Surgical, additive change — only add the `docs/` scaffolding; do not touch
  unrelated code or existing ADRs.

## Non-goals

- No automation/autopilot/cron in this phase. This is a documented **convention**,
  enforced via squad standing instructions. Automation may be layered on later
  once the convention is proven.
