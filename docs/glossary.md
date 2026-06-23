# Glossary

Shared vocabulary for the FINXO squad. Use these terms consistently in issues,
comments, docs, and code.

- **Agentic loop** — the squad's standing process: every issue is captured as a
  *brief* before work starts and an *outcome* after it ends, and both land in the
  repo via a reviewed PR. The repo is the durable shared memory. See
  [`README.md`](README.md) and [ADR-0007](adr/0007-adopt-self-documenting-agentic-loop.md).

- **Brief** — the *input* record of an issue: its spec, acceptance criteria,
  constraints, and non-goals, written before work begins. Lives at
  `docs/issues/<ISSUE-KEY>/brief.md`.

- **Outcome** — the *result* record of an issue: what shipped, was decided, or was
  found, the key decisions, and links back to the issue and PR. Lives at
  `docs/issues/<ISSUE-KEY>/outcome.md`.

- **ADR (Architecture Decision Record)** — a short, numbered document recording a
  significant decision: its context, the options considered, the decision, and its
  consequences. Lives in `docs/adr/`. ADRs are immutable once accepted; a later
  decision *supersedes* rather than edits an old one.
