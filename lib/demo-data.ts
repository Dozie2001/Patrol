import type { Incident } from "@/lib/incident-schema";

export const demoIncidents: Incident[] = [
  {
    id: "demo-1",
    incident_type: "Possible forced entry",
    severity: "high",
    location_text: "Loading bay B",
    summary:
      "Rear door lock is broken with no person visible. Guard requested backup and CCTV review.",
    status: "triage",
    backup_requested: true,
    people_involved: [],
    property_damage: "Broken rear door lock",
    evidence_needed: ["Photo of lock", "CCTV review"],
    missing_information: ["Whether area is secured", "Exact discovery time"],
    suggested_actions: [
      "Dispatch backup to loading bay B",
      "Preserve the area until supervisor arrives",
      "Request CCTV review for the last 30 minutes",
    ],
    created_at: "2 min ago",
  },
  {
    id: "demo-2",
    incident_type: "Medical emergency",
    severity: "critical",
    location_text: "Main lobby near reception",
    summary:
      "Guest collapsed in the lobby, conscious but breathing heavily. Crowd control and medical response needed.",
    status: "dispatched",
    backup_requested: true,
    people_involved: ["Unidentified guest"],
    injuries_or_medical: "Collapsed, conscious, breathing heavily",
    evidence_needed: ["Medical responder notes"],
    missing_information: ["Guest identity", "Known medical condition"],
    suggested_actions: [
      "Send medical responder",
      "Clear crowd around reception",
      "Notify site supervisor",
    ],
    created_at: "6 min ago",
  },
  {
    id: "demo-3",
    incident_type: "Suspicious person",
    severity: "medium",
    location_text: "Restricted loading area",
    summary:
      "Person in black hoodie observed looking into parked vehicles with no badge visible.",
    status: "new",
    backup_requested: false,
    people_involved: ["Male in black hoodie"],
    evidence_needed: ["Camera still", "Guard observation note"],
    missing_information: ["Direction of travel", "Whether person was challenged"],
    suggested_actions: [
      "Observe from safe distance",
      "Confirm authorization badge",
      "Notify control if person enters restricted doorway",
    ],
    created_at: "9 min ago",
  },
];

