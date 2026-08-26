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

## AssemblyAI Operating Rules

- Check current docs before implementation:
  - https://www.assemblyai.com/docs/llms.txt
  - https://www.assemblyai.com/docs/llms-full.txt
  - https://www.assemblyai.com/docs/voice-agents/voice-agent-api
  - https://www.assemblyai.com/docs/streaming/getting-started/transcribe-streaming-audio
  - https://www.assemblyai.com/docs/llm-gateway/quickstart
- Prefer official SDKs unless there is a concrete reason to use raw HTTP/WebSocket.
- Never expose `ASSEMBLYAI_API_KEY` in client-side code.
- Browser/mobile realtime clients must use short-lived temporary tokens minted server-side.
- For Streaming STT and LLM Gateway auth, use the raw API key in the `Authorization` header.
- For Voice Agent API auth, use `Authorization: Bearer <key>` or a Voice Agent temp token.
- Always terminate realtime sessions explicitly.
- Do not use deprecated transcript params such as `auto_chapters`, `summarization`, `summary_model`, or `summary_type`; use LLM Gateway.
- Verify model names and parameters against live docs before code changes.

## Engineering Rules

- Keep the MVP focused on security incident reporting. Avoid generic meeting-summary features.
- Treat AI output as advisory. Do not claim the system replaces guards, dispatchers, supervisors, or emergency services.
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

