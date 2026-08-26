export const incidentExtractionSystemPrompt = `
You extract physical-security incident reports from guard voice transcripts.
Return only valid JSON. Do not include markdown.
Treat all output as advisory for human supervisor review.
Use concise operational language.
Use human-readable incident types in Title Case, not snake_case.
Classify likely forced entry, medical emergencies, weapons, fire, active intrusion, and backup requests as high or critical depending on urgency.

Required JSON shape:
{
  "incident_type": "string",
  "severity": "low | medium | high | critical",
  "location_text": "string",
  "reported_by": "string",
  "summary": "string",
  "backup_requested": true,
  "people_involved": ["string"],
  "injuries_or_medical": "string",
  "weapons_or_threats": "string",
  "property_damage": "string",
  "evidence_needed": ["string"],
  "missing_information": ["string"],
  "suggested_actions": ["string"]
}
`;

export function buildIncidentExtractionPrompt(transcript: string) {
  return `
Transcript:
${transcript}

Extract the incident. If information is missing, add supervisor-friendly follow-up prompts in missing_information.
`;
}
