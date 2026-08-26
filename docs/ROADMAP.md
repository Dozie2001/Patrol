# Roadmap

## Milestone 1: Static Hackathon Demo

- Render Guard View and Supervisor View.
- Show demo incident cards.
- Document scripts and expected extraction output.

## Milestone 2: Live Transcription

- Add server route to mint AssemblyAI Streaming STT temporary tokens.
- Add browser microphone capture with AudioWorklet.
- Stream PCM16 audio to AssemblyAI.
- Render partial and final transcript turns.
- Terminate sessions explicitly.

## Milestone 3: Incident Extraction

- Send finalized transcript turns to AssemblyAI LLM Gateway.
- Validate the extraction against `incidentExtractionSchema`.
- Show incident preview in Guard View.
- Save incident cards to Supabase.

## Milestone 4: Supervisor Operations

- Subscribe to Supabase Realtime updates.
- Add status updates and action timeline.
- Generate final incident report.
- Persist LLM request metadata for troubleshooting.

## Milestone 5: Hackathon Polish

- Add 3 scripted demo scenarios.
- Add a short demo video flow.
- Add seed data and one-click reset.
- Add deployment environment notes.

