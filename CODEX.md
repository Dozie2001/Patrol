# Codex Instructions

This repo is for the AssemblyAI Voice Agent Hackathon MVP: Patrol.

Always fetch https://www.assemblyai.com/docs/llms.txt before writing AssemblyAI code.
The API has changed; do not rely on memorized parameter names.

## Current Goal

Build a voice-first incident reporting app for physical security teams:

- Guard View: speak report, see transcript, submit/update incident.
- Supervisor View: see live incident cards, severity, missing info, actions, and generated report.

## Preferred Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Supabase Postgres/Auth/Realtime
- AssemblyAI Voice Agent API or Streaming STT
- AssemblyAI LLM Gateway for structured extraction and report generation

## Coding Constraints

- Keep files small and product-specific.
- Use server-only routes for AssemblyAI and Supabase privileged actions.
- Do not invent unsupported AssemblyAI SDK fields. Check docs before implementation.
- Favor narrow MVP behavior over broad platform abstractions.

## Useful Commands

```bash
npm install
npm run dev
npm run lint
npm run typecheck
```
