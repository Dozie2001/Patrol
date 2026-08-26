# Agent Instructions

Always fetch https://www.assemblyai.com/docs/llms.txt before writing AssemblyAI code.
The API has changed; do not rely on memorized parameter names.

## Product

Patrol is a voice-first incident reporting and dispatch assistant for physical security teams. The MVP turns guard voice reports and radio-style updates into structured incident cards, supervisor actions, and final incident reports.

## Primary User Flows

1. Guard speaks a live incident report from the Guard View.
2. App transcribes the report with AssemblyAI real-time speech-to-text or Voice Agent API.
3. App extracts incident fields with AssemblyAI LLM Gateway structured output.
4. Supervisor View receives a live incident card with severity, location, missing info, and suggested next actions.
5. Supervisor updates status and generates a final incident report.

## Engineering Rules

- Keep the MVP focused on security incident reporting. Avoid generic meeting-summary features.
- Treat AI output as advisory. Do not claim the system replaces guards, dispatchers, supervisors, or emergency services.
- Keep API keys server-side. Browser clients must use temporary AssemblyAI tokens or backend routes.
- For Streaming STT and LLM Gateway auth, use the raw API key in the `Authorization` header.
- For Voice Agent API auth, use `Authorization: Bearer <key>` or a Voice Agent temp token.
- Always terminate realtime sessions explicitly.
- Do not use deprecated transcript params such as `auto_chapters`, `summarization`, `summary_model`, or `summary_type`; use LLM Gateway.
- Verify model names and parameters against live AssemblyAI docs before code changes.
- Persist raw transcript turns, extracted fields, model metadata, and final report revisions for auditability.
- Prefer structured JSON schemas for incident extraction and report generation.
- Any safety-critical recommendation must be phrased as a suggested next action for human review.

## Core Incident Fields

- `incident_type`
- `severity`
- `location_text`
- `reported_by`
- `summary`
- `people_involved`
- `injuries_or_medical`
- `weapons_or_threats`
- `property_damage`
- `backup_requested`
- `evidence_needed`
- `missing_information`
- `suggested_actions`
- `status`

## Demo Scenarios

- Suspicious person near restricted area.
- Broken lock / possible forced entry.
- Medical emergency in lobby.
- Aggressive visitor at reception.
- Fire or smoke report.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
