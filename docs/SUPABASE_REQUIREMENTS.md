# Supabase Requirements

I do not currently have a Supabase MCP/tool exposed in this session. The repo is prepared for normal Supabase client usage. If you connect a Supabase MCP later, the same schema below can be applied through migrations.

## What I Need From Supabase

For local development and the hackathon demo:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- Project region
- Whether auth should be enabled for the demo

To apply migrations from this Codex session, I also need one of:

- A Supabase CLI access token in `SUPABASE_ACCESS_TOKEN`
- The project database password in `SUPABASE_DB_PASSWORD`
- A percent-encoded Postgres connection string passed to `supabase db push --db-url`

For production-style setup:

- Allowed site/domain for auth redirects
- RLS policy preference: single demo tenant or multi-tenant organizations
- Storage bucket decision for incident photos/audio exports

## Minimum Tables

### `sites`

Security customer location or property.

- `id uuid primary key`
- `name text not null`
- `address text`
- `created_at timestamptz default now()`

### `profiles`

App users: guards, supervisors, admins.

- `id uuid primary key references auth.users(id)`
- `site_id uuid references sites(id)`
- `role text not null`
- `display_name text not null`
- `created_at timestamptz default now()`

### `incidents`

Structured incident records shown in Supervisor View.

- `id uuid primary key`
- `site_id uuid references sites(id)`
- `reported_by uuid references profiles(id)`
- `incident_type text not null`
- `severity text not null`
- `location_text text`
- `summary text`
- `status text not null default 'new'`
- `backup_requested boolean default false`
- `people_involved jsonb default '[]'::jsonb`
- `injuries_or_medical text`
- `weapons_or_threats text`
- `property_damage text`
- `evidence_needed jsonb default '[]'::jsonb`
- `missing_information jsonb default '[]'::jsonb`
- `suggested_actions jsonb default '[]'::jsonb`
- `created_at timestamptz default now()`
- `updated_at timestamptz default now()`

### `transcript_turns`

Raw transcript turns for auditability and reprocessing.

- `id uuid primary key`
- `incident_id uuid references incidents(id)`
- `speaker_label text`
- `transcript text not null`
- `is_final boolean default false`
- `turn_order integer`
- `assemblyai_session_id text`
- `created_at timestamptz default now()`

### `incident_actions`

Supervisor actions and timeline entries.

- `id uuid primary key`
- `incident_id uuid references incidents(id)`
- `actor_id uuid references profiles(id)`
- `action_type text not null`
- `note text`
- `created_at timestamptz default now()`

### `incident_reports`

Generated reports and human-edited revisions.

- `id uuid primary key`
- `incident_id uuid references incidents(id)`
- `report_markdown text not null`
- `generated_by_model text`
- `llm_request_id text`
- `created_at timestamptz default now()`

## MVP Auth Option

For hackathon speed, use a seeded demo site with two demo roles:

- Guard
- Supervisor

The first version can skip full auth and use demo users in seed data. Add Supabase Auth before public deployment.

## Applying The Schema

The Supabase MCP server is configured, but this active Codex tool session may not expose callable Supabase MCP tools until a session refresh. The CLI fallback is ready.

Option A: with Supabase access token:

```bash
export SUPABASE_ACCESS_TOKEN=...
supabase link --project-ref zanwajfmsligekukusno --yes
supabase db push --include-seed --yes
```

Option B: with database password:

```bash
supabase link --project-ref zanwajfmsligekukusno --password "$SUPABASE_DB_PASSWORD" --yes
supabase db push --include-seed --password "$SUPABASE_DB_PASSWORD" --yes
```

Option C: with direct database URL:

```bash
supabase db push --db-url "$DATABASE_URL" --include-seed --yes
```

