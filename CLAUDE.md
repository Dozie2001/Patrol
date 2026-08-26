# Claude Instructions

Use the project direction in `AGENTS.md` and `docs/MVP.md` as the source of truth.

## AssemblyAI Docs

Always fetch https://www.assemblyai.com/docs/llms.txt before writing AssemblyAI code.
The API has changed; do not rely on memorized parameter names.

When implementing AssemblyAI code, verify against current docs:

- Voice Agent API: https://www.assemblyai.com/docs/voice-agents/voice-agent-api
- Streaming STT quickstart: https://www.assemblyai.com/docs/streaming/getting-started/transcribe-streaming-audio
- LLM Gateway quickstart: https://www.assemblyai.com/docs/llm-gateway/quickstart
- Full machine-readable docs: https://www.assemblyai.com/docs/llms-full.txt

AssemblyAI docs currently recommend using their live docs MCP and skill for coding agents:

```bash
claude mcp add --transport http --scope user assemblyai-docs https://assemblyai.com/docs/mcp
npx skills add AssemblyAI/assemblyai-skill --global
```

## Implementation Notes

- Use Next.js server routes for token minting and LLM Gateway calls.
- Do not expose `ASSEMBLYAI_API_KEY`, Supabase service-role keys, or LLM Gateway credentials in client components.
- Keep extraction prompts deterministic and schema-first.
- Store every finalized transcript turn before generating incident state.
- Use Supabase Row Level Security before any hosted demo with real users.
