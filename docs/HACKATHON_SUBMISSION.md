# Hackathon Submission

## Project

Patrol

## Tagline

Voice-first incident command for physical security teams.

## Demo

- Live app: https://patrol-ai-sage.vercel.app/
- Source: https://github.com/Dozie2001/Patrol

## Description

Physical security teams rely on guards, radio traffic, and supervisors during incidents, but the reporting workflow is still slow and manual. A guard may report a forced entry, suspicious person, medical event, or access-control problem over voice, then someone has to translate that messy report into a structured incident record while the situation is still moving.

Patrol turns those live voice reports into incident intelligence. A guard can speak naturally from the browser, or use the built-in demo script for a reliable walkthrough. AssemblyAI streams the report, Patrol extracts the incident type, severity, location, backup request, missing information, evidence needs, and suggested dispatch actions, then presents everything as a supervisor review card.

The MVP focuses on the operational loop that matters most: capture, extract, review, and dispatch. Supervisors can tick suggested actions, ask the AI-generated follow-up questions, and move an incident through triage, dispatched, resolved, and closed states. This keeps the human in control while reducing the time from field report to usable command-center information.

Technically, Patrol is a Next.js application deployed on Vercel with Supabase for auth and incident persistence. AssemblyAI Streaming Speech-to-Text powers live transcription, and AssemblyAI LLM Gateway converts unstructured transcript text into structured incident JSON. API keys stay server-side, and browser clients use short-lived AssemblyAI tokens.

Next, Patrol can expand into role-based dashboards, audio replay, CCTV handoff, SMS or push dispatch, and analytics across sites. The product is designed to scale from a single building security team to multi-site physical security operations.

## What Works Now

- Landing page with product story and AssemblyAI badge.
- Guard View with browser microphone capture.
- One-click demo script for reliable judging.
- AssemblyAI incident extraction.
- Supabase-backed incident storage.
- Supervisor View with status review.
- Dispatch checklist.
- AI follow-up questions from missing information.
- Vercel deployment.

## Suggested Demo Path

1. Open the live app.
2. Click `Launch app`.
3. Click `Run demo script`.
4. Show the created incident card.
5. Tick dispatch checklist items.
6. Move the incident to `Dispatch`, then `Resolve`.
7. Explain how live microphone reporting follows the same path.

## Screenshots To Capture

1. Landing hero with the operations terminal.
2. Guard View with demo script loaded.
3. Supervisor View with an incident card.
4. Review flow after status changes.
5. Mobile landing page at 375 px width.

## Roadmap

- Audio replay and transcript turn timeline.
- Role-based guard, supervisor, and admin views.
- SMS/push dispatch integrations.
- CCTV and access-control system handoff.
- Multi-site incident analytics.
