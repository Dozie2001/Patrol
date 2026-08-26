# Patrol

Patrol is a voice-first incident reporting and dispatch assistant for physical security teams.

The hackathon MVP turns guard voice reports into:

- live transcript turns
- structured incident cards
- missing-information prompts
- supervisor next actions
- final incident reports

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Supabase Postgres/Auth/Realtime
- AssemblyAI Streaming STT or Voice Agent API
- AssemblyAI LLM Gateway

## Getting Started

```bash
cp .env.example .env.local
npm install
npm run dev
```

Open http://localhost:3000.

## Required Environment

```bash
ASSEMBLYAI_API_KEY=
ASSEMBLYAI_LLM_GATEWAY_MODEL=qwen3.5-4b-32k-fast
ASSEMBLYAI_REGION=us
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## AssemblyAI References

Before writing AssemblyAI code, fetch:

- https://www.assemblyai.com/docs/llms.txt

Then use the relevant docs:

- https://www.assemblyai.com/docs/voice-agents/voice-agent-api
- https://www.assemblyai.com/docs/streaming/getting-started/transcribe-streaming-audio
- https://www.assemblyai.com/docs/llm-gateway/quickstart

## Supabase

Start with `supabase/001_initial_schema.sql`.

I need these values from your Supabase project:

- Project URL
- anon public key
- service role key
- project region
- auth decision for the demo: no auth, magic link, or email/password

No Supabase MCP/tool is currently exposed in this session, so setup is documented as SQL plus environment variables.

## Docs

- `AGENT.md`: shared coding-agent instructions
- `CLAUDE.md`: Claude-specific instructions
- `CODEX.md`: Codex-specific instructions
- `docs/DEPLOYMENT.md`: Vercel deployment and launch checklist
- `docs/MVP.md`: MVP scope
- `docs/STACK.md`: stack and architecture
- `docs/SUPABASE_REQUIREMENTS.md`: Supabase data requirements
- `docs/TEST_PLAN.md`: demo and regression testing plan
