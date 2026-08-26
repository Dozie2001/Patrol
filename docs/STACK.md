# Stack and Technologies

## Application

- Next.js App Router for the web app and API routes.
- TypeScript for safer shared incident schemas.
- Tailwind CSS for fast UI iteration.
- Supabase for auth, Postgres storage, Realtime incident updates, and optional file storage.

## Voice and AI

- AssemblyAI Voice Agent API for full real-time voice-agent sessions in browser or phone deployments.
- AssemblyAI Streaming Speech-to-Text for lower-level real-time transcript turns.
- AssemblyAI LLM Gateway for structured incident extraction, missing-information prompts, suggested actions, and final report generation.

## Suggested Architecture

```text
Guard browser
  -> Next.js API route creates short-lived AssemblyAI token
  -> AssemblyAI Voice Agent API or Streaming STT session
  -> transcript turns returned to app
  -> Next.js API route sends finalized turns to LLM Gateway
  -> structured incident JSON saved in Supabase
  -> Supabase Realtime updates Supervisor View
```

## Environment Variables

```bash
ASSEMBLYAI_API_KEY=
ASSEMBLYAI_LLM_GATEWAY_MODEL=qwen3.5-4b-32k-fast
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## AssemblyAI Notes

- Before writing AssemblyAI code, fetch `https://www.assemblyai.com/docs/llms.txt` and then the relevant pages or `llms-full.txt`.
- Voice Agent API can configure reusable agents and deploy them in browser or by phone through Twilio SIP.
- Streaming STT should use server-side authentication or short-lived browser tokens. Do not expose the AssemblyAI API key in client code.
- Streaming STT returns turn messages; finalized turns are best for incident extraction.
- LLM Gateway uses `https://llm-gateway.assemblyai.com/v1/chat/completions` and supports an OpenAI-compatible interface.
- Persist LLM Gateway `request_id`, model, region, and timestamp for troubleshooting.

## Supabase Notes

- Use Postgres tables for sites, users, incidents, transcript turns, actions, and reports.
- Use Supabase Realtime to push new or updated incidents into the supervisor dashboard.
- Use Storage later for photos, audio snippets, or exported reports.
- Use RLS before deploying a hosted demo.
