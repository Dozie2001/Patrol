import { z } from "zod";

export const severitySchema = z.enum(["low", "medium", "high", "critical"]);
export const statusSchema = z.enum(["new", "triage", "dispatched", "resolved", "closed"]);

export const incidentSchema = z.object({
  id: z.string(),
  site_id: z.string().optional(),
  incident_type: z.string(),
  severity: severitySchema,
  location_text: z.string(),
  reported_by: z.string().optional(),
  summary: z.string(),
  status: statusSchema,
  backup_requested: z.boolean(),
  people_involved: z.array(z.string()),
  injuries_or_medical: z.string().optional(),
  weapons_or_threats: z.string().optional(),
  property_damage: z.string().optional(),
  evidence_needed: z.array(z.string()),
  missing_information: z.array(z.string()),
  suggested_actions: z.array(z.string()),
  created_at: z.string(),
});

export type Incident = z.infer<typeof incidentSchema>;

export const incidentExtractionSchema = incidentSchema.omit({
  id: true,
  site_id: true,
  status: true,
  created_at: true,
});

export type IncidentExtraction = z.infer<typeof incidentExtractionSchema>;
