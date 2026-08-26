# Next Steps

## Current State

- The Patrol app scaffold is complete.
- Environment values are present in `.env`.
- Supabase MCP is configured in Codex CLI.
- The remote Supabase project does not yet have the Patrol tables.
- The app now reads incidents from Supabase when available and falls back to demo data.

## Blocker

Applying the schema requires one of:

- `SUPABASE_ACCESS_TOKEN`
- `SUPABASE_DB_PASSWORD`
- `DATABASE_URL`

Do not paste these into chat. Add one to `.env`, then ask Codex to continue.

## Preferred Path

Use a Supabase access token for CLI operations:

```bash
SUPABASE_ACCESS_TOKEN=...
```

Then Codex can run:

```bash
supabase link --project-ref zanwajfmsligekukusno --yes
supabase db push --include-seed --yes
```

## After Schema Apply

1. Verify `sites`, `profiles`, and `incidents` exist.
2. Confirm seed data appears.
3. Start the app and confirm Supervisor View loads from Supabase.
4. Build browser microphone capture for AssemblyAI Streaming STT.
5. Save finalized transcript turns and extracted incidents.

