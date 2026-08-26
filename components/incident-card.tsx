import { Clock, FileText, MapPin, UserCheck } from "lucide-react";
import type { Incident } from "@/lib/incident-schema";
import { StatusBadge } from "@/components/status-badge";

export function IncidentCard({ incident }: { incident: Incident }) {
  return (
    <article className="rounded-md border border-border/70 bg-background/78 p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge tone={incident.severity === "critical" ? "red" : incident.severity === "high" ? "amber" : "blue"}>
              {incident.severity}
            </StatusBadge>
            <StatusBadge tone="neutral">{incident.status}</StatusBadge>
          </div>
          <h3 className="mt-3 text-base font-semibold">{incident.incident_type}</h3>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            {incident.summary}
          </p>
        </div>
        <button className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md border bg-card px-3 py-2 text-sm font-medium transition-colors duration-150 hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
          <FileText className="h-4 w-4" aria-hidden="true" />
          Report
        </button>
      </div>

      <div className="mt-4 grid gap-3 text-sm text-muted-foreground sm:grid-cols-3">
        <Fact icon={<MapPin className="h-4 w-4" aria-hidden="true" />} label={incident.location_text} />
        <Fact icon={<UserCheck className="h-4 w-4" aria-hidden="true" />} label={incident.backup_requested ? "Backup requested" : "No backup request"} />
        <Fact icon={<Clock className="h-4 w-4" aria-hidden="true" />} label={incident.created_at} />
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <Checklist title="Suggested actions" items={incident.suggested_actions} />
        <Checklist title="Missing info" items={incident.missing_information} />
      </div>
    </article>
  );
}

function Fact({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2 rounded-md bg-muted px-3 py-2">
      {icon}
      <span>{label}</span>
    </div>
  );
}

function Checklist({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="text-sm font-medium">{title}</p>
      <ul className="mt-2 space-y-2">
        {items.map((item) => (
          <li key={item} className="text-sm leading-6 text-muted-foreground">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
