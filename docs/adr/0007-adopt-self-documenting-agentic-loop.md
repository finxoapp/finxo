---
status: accepted
---

# 0007 — Adopt a self-documenting agentic loop: every issue → PR + brief/outcome docs

## Context

The FINXO squad is several agents (Architect, Backend/Frontend Developers, Data
Integrator, Designer, QA Reviewer, Director) working across many issues. Without a
durable record, each agent re-derives what an issue asked for and what a prior
issue delivered from scattered comments — the "comment archaeology" problem. We
want the GitHub repo (`finxoapp/finxo`) to be the squad's shared memory so any
agent can look back at the input and the outcome of past work.

The decision of *how* to enforce this was scoped with HG. The options were a
**documented convention** (agents follow it, enforced socially via standing
instructions) versus **automation** (autopilot/cron that creates the docs and PRs).

## Considered options

1. **Convention only** — define the loop in `docs/` and bake it into the squad's
   standing instructions. Cheap, no new moving parts, proves the workflow before
   we invest in tooling.
2. **Automate now** — build autopilot/cron to scaffold briefs/outcomes and open
   PRs. Higher up-front cost and complexity for a workflow we have not yet proven
   in practice.

## Decision

Adopt the **self-documenting agentic loop as a documented convention** (option 1),
enforced through the squad's standing instructions. No automation in this phase.

Every issue — code **and** non-code — runs the loop:

1. **Brief in** → `docs/issues/<ISSUE-KEY>/brief.md` (spec, acceptance criteria,
   constraints, non-goals).
2. **Work** → the assigned specialist does the work.
3. **Outcome out** → `docs/issues/<ISSUE-KEY>/outcome.md` (what shipped/was
   decided/was found, decisions, links to issue + PR).
4. **PR** → code issues ship a code PR that also carries the docs; non-code issues
   ship a docs-only PR.
5. **Review** → QA Reviewer approves every PR, including docs-only, before merge.
6. **Done** → only once the PR is merged and `brief.md` + `outcome.md` are
   committed.

The repo doc layout (`docs/README.md`, `docs/issues/`, `docs/adr/`,
`docs/glossary.md`) is defined in [`docs/README.md`](../README.md).

## Consequences

- The repo becomes the squad's durable shared memory; agents consult
  `docs/issues`, `docs/adr`, and `docs/glossary` before starting work.
- Every issue now incurs a small documentation cost (two short markdown files) and
  a review step — accepted as the price of not re-deriving context.
- Non-code work (research, architecture, design) now produces docs-only PRs; QA
  reviews these too.
- The convention is the enforcement mechanism for now. **Revisit / supersede
  trigger:** once the convention is proven in practice, automation
  (autopilot/cron to scaffold the docs and open PRs) may be layered on; that would
  be a new ADR superseding this one's "convention only" stance.
- This ADR is itself the first instance of the loop being dogfooded (see
  `docs/issues/FIN-11/`).
