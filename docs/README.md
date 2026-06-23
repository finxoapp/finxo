# FINXO docs

This directory is the squad's **durable shared memory**. Before starting any
issue, an agent should be able to look here and learn what was asked, what was
decided, and what was delivered — instead of re-deriving it from scratch.

## The self-documenting agentic loop

Every issue — code **and** non-code (research, architecture, design) — flows
through the same loop, and the loop ends in a merged pull request:

1. **Brief in** — the issue's spec, acceptance criteria, constraints, and
   non-goals are captured in `docs/issues/<ISSUE-KEY>/brief.md`.
2. **Work** — the assigned specialist does the work (code, research, design, or
   architecture).
3. **Outcome out** — what shipped / was decided / was found, the key decisions,
   and links back to the issue and PR are captured in
   `docs/issues/<ISSUE-KEY>/outcome.md`.
4. **PR** — all of the above lands as a pull request:
   - Code issues → a **code PR** that also includes the `brief.md` / `outcome.md`
     docs.
   - Non-code issues → a **docs-only PR**.
5. **Review** — the QA Reviewer approves every PR (including docs-only) before
   merge.
6. **Done** — an issue is only `Done` once its PR is merged and both `brief.md`
   and `outcome.md` are committed.

## Before you start work — consult prior context

Reading the durable memory first is part of the loop, not optional:

- **`docs/issues/`** — read the `brief.md` and `outcome.md` of related or
  predecessor issues so you build on what was delivered instead of repeating it.
- **`docs/adr/`** — the Architecture Decision Records. Check whether a decision
  you are about to make has already been made (or deliberately deferred). If you
  need to change one, **supersede** the ADR rather than silently diverging.
- **`docs/glossary.md`** — the shared vocabulary. Use these terms so the squad
  stays consistent.

## Layout

```
docs/
  README.md                         # this file — the loop + how to navigate docs
  glossary.md                       # shared terms
  adr/
    _template.md                    # ADR template
    NNNN-title.md                   # one architecture decision per file
  issues/
    _template/
      brief.md                      # the input template
      outcome.md                    # the outcome template
    <ISSUE-KEY>/
      brief.md                      # this issue's input
      outcome.md                    # this issue's outcome
```

## Conventions

- **Issue keys** use the tracker identifier (e.g. `FIN-11`), one directory per
  issue under `docs/issues/`.
- **ADRs** are numbered sequentially (`0001`, `0002`, …). Copy `_template.md`,
  take the next free number, and never reuse a number. A decision that replaces
  an older one keeps its own new number and marks the old ADR `superseded`.
- Link back to the issue and the PR from `outcome.md` so the trail is two-way.
