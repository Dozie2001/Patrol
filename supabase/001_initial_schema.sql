create extension if not exists "pgcrypto";

create table if not exists public.sites (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  address text,
  created_at timestamptz not null default now()
);

create table if not exists public.profiles (
  id uuid primary key,
  site_id uuid references public.sites(id),
  role text not null check (role in ('guard', 'supervisor', 'admin')),
  display_name text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.incidents (
  id uuid primary key default gen_random_uuid(),
  site_id uuid references public.sites(id),
  reported_by uuid references public.profiles(id),
  incident_type text not null,
  severity text not null check (severity in ('low', 'medium', 'high', 'critical')),
  location_text text,
  summary text,
  status text not null default 'new' check (status in ('new', 'triage', 'dispatched', 'resolved', 'closed')),
  backup_requested boolean not null default false,
  people_involved jsonb not null default '[]'::jsonb,
  injuries_or_medical text,
  weapons_or_threats text,
  property_damage text,
  evidence_needed jsonb not null default '[]'::jsonb,
  missing_information jsonb not null default '[]'::jsonb,
  suggested_actions jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.transcript_turns (
  id uuid primary key default gen_random_uuid(),
  incident_id uuid references public.incidents(id) on delete cascade,
  speaker_label text,
  transcript text not null,
  is_final boolean not null default false,
  turn_order integer,
  assemblyai_session_id text,
  created_at timestamptz not null default now()
);

create table if not exists public.incident_actions (
  id uuid primary key default gen_random_uuid(),
  incident_id uuid references public.incidents(id) on delete cascade,
  actor_id uuid references public.profiles(id),
  action_type text not null,
  note text,
  created_at timestamptz not null default now()
);

create table if not exists public.incident_reports (
  id uuid primary key default gen_random_uuid(),
  incident_id uuid references public.incidents(id) on delete cascade,
  report_markdown text not null,
  generated_by_model text,
  llm_request_id text,
  created_at timestamptz not null default now()
);

alter table public.sites enable row level security;
alter table public.profiles enable row level security;
alter table public.incidents enable row level security;
alter table public.transcript_turns enable row level security;
alter table public.incident_actions enable row level security;
alter table public.incident_reports enable row level security;

