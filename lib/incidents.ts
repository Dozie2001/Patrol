import { demoIncidents } from "@/lib/demo-data";
import type { Incident, IncidentExtraction } from "@/lib/incident-schema";
import { incidentSchema } from "@/lib/incident-schema";
import { createSupabaseServiceClient } from "@/lib/supabase";

export const DEMO_SITE_ID = "00000000-0000-4000-8000-000000000001";
export const DEMO_GUARD_ID = "00000000-0000-4000-8000-000000000101";

type IncidentRow = {
  id: string;
  site_id: string | null;
  incident_type: string;
  severity: Incident["severity"];
  location_text: string | null;
  reported_by: string | null;
  summary: string | null;
  status: Incident["status"];
  backup_requested: boolean;
  people_involved: unknown;
  injuries_or_medical: string | null;
  weapons_or_threats: string | null;
  property_damage: string | null;
  evidence_needed: unknown;
  missing_information: unknown;
  suggested_actions: unknown;
  created_at: string;
};

export async function listIncidents() {
  try {
    const supabase = createSupabaseServiceClient();
    const { data, error } = await supabase
      .from("incidents")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(20);

    if (error) {
      console.warn("Falling back to demo incidents:", error.message);
      return demoIncidents;
    }

    return (data ?? []).map(mapIncidentRow);
  } catch (error) {
    console.warn(
      "Falling back to demo incidents:",
      error instanceof Error ? error.message : error,
    );
    return demoIncidents;
  }
}

export async function createIncidentFromExtraction(extraction: IncidentExtraction) {
  const supabase = createSupabaseServiceClient();
  const { data, error } = await supabase
    .from("incidents")
    .insert({
      site_id: DEMO_SITE_ID,
      reported_by: DEMO_GUARD_ID,
      incident_type: extraction.incident_type,
      severity: extraction.severity,
      location_text: extraction.location_text,
      summary: extraction.summary,
      backup_requested: extraction.backup_requested,
      people_involved: extraction.people_involved,
      injuries_or_medical: extraction.injuries_or_medical,
      weapons_or_threats: extraction.weapons_or_threats,
      property_damage: extraction.property_damage,
      evidence_needed: extraction.evidence_needed,
      missing_information: extraction.missing_information,
      suggested_actions: extraction.suggested_actions,
    })
    .select("*")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return mapIncidentRow(data);
}

export async function saveTranscriptTurn({
  incidentId,
  transcript,
  turnOrder = 1,
  sessionId,
}: {
  incidentId: string;
  transcript: string;
  turnOrder?: number;
  sessionId?: string;
}) {
  const supabase = createSupabaseServiceClient();
  const { error } = await supabase.from("transcript_turns").insert({
    incident_id: incidentId,
    transcript,
    is_final: true,
    turn_order: turnOrder,
    assemblyai_session_id: sessionId,
  });

  if (error) {
    throw new Error(error.message);
  }
}

function mapIncidentRow(row: IncidentRow) {
  return incidentSchema.parse({
    id: row.id,
    site_id: row.site_id ?? undefined,
    incident_type: row.incident_type,
    severity: row.severity,
    location_text: row.location_text ?? "Unknown location",
    reported_by: row.reported_by ?? undefined,
    summary: row.summary ?? "",
    status: row.status,
    backup_requested: row.backup_requested,
    people_involved: normalizeStringArray(row.people_involved),
    injuries_or_medical: row.injuries_or_medical ?? undefined,
    weapons_or_threats: row.weapons_or_threats ?? undefined,
    property_damage: row.property_damage ?? undefined,
    evidence_needed: normalizeStringArray(row.evidence_needed),
    missing_information: normalizeStringArray(row.missing_information),
    suggested_actions: normalizeStringArray(row.suggested_actions),
    created_at: formatRelativeTime(row.created_at),
  });
}

function normalizeStringArray(value: unknown) {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
}

function formatRelativeTime(value: string) {
  const timestamp = new Date(value).getTime();
  if (Number.isNaN(timestamp)) {
    return value;
  }

  const seconds = Math.max(0, Math.round((Date.now() - timestamp) / 1000));
  if (seconds < 60) {
    return `${seconds}s ago`;
  }

  const minutes = Math.round(seconds / 60);
  if (minutes < 60) {
    return `${minutes} min ago`;
  }

  const hours = Math.round(minutes / 60);
  if (hours < 24) {
    return `${hours}h ago`;
  }

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}
