insert into public.sites (id, name, address)
values
  ('00000000-0000-4000-8000-000000000001', 'Demo Logistics Site', 'Loading Bay B')
on conflict (id) do update set
  name = excluded.name,
  address = excluded.address;

insert into public.profiles (id, site_id, role, display_name)
values
  ('00000000-0000-4000-8000-000000000101', '00000000-0000-4000-8000-000000000001', 'guard', 'Patrol 2'),
  ('00000000-0000-4000-8000-000000000102', '00000000-0000-4000-8000-000000000001', 'supervisor', 'Control Desk')
on conflict (id) do update set
  site_id = excluded.site_id,
  role = excluded.role,
  display_name = excluded.display_name;

insert into public.incidents (
  id,
  site_id,
  reported_by,
  incident_type,
  severity,
  location_text,
  summary,
  status,
  backup_requested,
  people_involved,
  property_damage,
  evidence_needed,
  missing_information,
  suggested_actions
)
values
  (
    '00000000-0000-4000-8000-000000000201',
    '00000000-0000-4000-8000-000000000001',
    '00000000-0000-4000-8000-000000000101',
    'Possible forced entry',
    'high',
    'Loading bay B',
    'Rear door lock is broken with no person visible. Guard requested backup and CCTV review.',
    'triage',
    true,
    '[]'::jsonb,
    'Broken rear door lock',
    '["Photo of lock", "CCTV review"]'::jsonb,
    '["Whether area is secured", "Exact discovery time"]'::jsonb,
    '["Dispatch backup to loading bay B", "Preserve the area until supervisor arrives", "Request CCTV review for the last 30 minutes"]'::jsonb
  )
on conflict (id) do update set
  incident_type = excluded.incident_type,
  severity = excluded.severity,
  location_text = excluded.location_text,
  summary = excluded.summary,
  status = excluded.status,
  backup_requested = excluded.backup_requested,
  people_involved = excluded.people_involved,
  property_damage = excluded.property_damage,
  evidence_needed = excluded.evidence_needed,
  missing_information = excluded.missing_information,
  suggested_actions = excluded.suggested_actions;

