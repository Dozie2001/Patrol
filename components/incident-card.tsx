"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import {
  CheckCircle2,
  Clock,
  FileText,
  HelpCircle,
  MapPin,
  Send,
  UserCheck,
} from "lucide-react";
import type { Incident } from "@/lib/incident-schema";
import { StatusBadge } from "@/components/status-badge";

const reviewActions: Array<{
  label: string;
  status: Incident["status"];
}> = [
  { label: "Triage", status: "triage" },
  { label: "Dispatch", status: "dispatched" },
  { label: "Resolve", status: "resolved" },
  { label: "Close", status: "closed" },
];

export function IncidentCard({ incident }: { incident: Incident }) {
  const router = useRouter();
  const [status, setStatus] = useState(incident.status);
  const [pendingStatus, setPendingStatus] = useState<Incident["status"] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [checkedActions, setCheckedActions] = useState<string[]>([]);

  const followUpQuestions = useMemo(
    () => buildFollowUpQuestions(incident.missing_information),
    [incident.missing_information],
  );

  async function updateStatus(nextStatus: Incident["status"]) {
    setPendingStatus(nextStatus);
    setError(null);

    try {
      const response = await fetch(`/api/incidents/${incident.id}/review`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ status: nextStatus }),
      });

      if (!response.ok) {
        const body = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(body?.error ?? "Could not update incident");
      }

      setStatus(nextStatus);
      router.refresh();
    } catch (reviewError) {
      setError(reviewError instanceof Error ? reviewError.message : "Could not update incident");
    } finally {
      setPendingStatus(null);
    }
  }

  function toggleAction(item: string) {
    setCheckedActions((current) =>
      current.includes(item)
        ? current.filter((action) => action !== item)
        : [...current, item],
    );
  }

  return (
    <article className="rounded-md border border-border/70 bg-background/78 p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge tone={incident.severity === "critical" ? "red" : incident.severity === "high" ? "amber" : "blue"}>
              {incident.severity}
            </StatusBadge>
            <StatusBadge tone="neutral">{status}</StatusBadge>
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
        <ActionChecklist
          checkedActions={checkedActions}
          items={incident.suggested_actions}
          onToggle={toggleAction}
        />
        <FollowUpQuestions items={followUpQuestions} />
      </div>

      <div className="mt-4 rounded-md border border-border/70 bg-card/72 p-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold">Supervisor review</p>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              Confirm the AI extraction, then move the incident to the next operational state.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {reviewActions.map((action) => (
              <button
                key={action.status}
                className="inline-flex min-h-9 items-center justify-center gap-2 rounded-md border border-border/70 bg-background px-3 py-2 text-sm font-medium text-foreground transition-colors duration-150 hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-55 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                disabled={pendingStatus !== null || status === action.status}
                onClick={() => updateStatus(action.status)}
                type="button"
              >
                {action.status === "dispatched" ? (
                  <Send className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                )}
                {pendingStatus === action.status ? "Saving" : action.label}
              </button>
            ))}
          </div>
        </div>
        {error ? (
          <p className="mt-3 rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {error}
          </p>
        ) : null}
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

function ActionChecklist({
  checkedActions,
  items,
  onToggle,
}: {
  checkedActions: string[];
  items: string[];
  onToggle: (item: string) => void;
}) {
  return (
    <div>
      <p className="text-sm font-medium">Dispatch checklist</p>
      <ul className="mt-2 space-y-2">
        {items.map((item) => (
          <li key={item}>
            <label className="flex min-h-10 cursor-pointer items-start gap-3 rounded-md border border-border/70 bg-card/70 px-3 py-2 text-sm leading-6 text-muted-foreground transition-colors duration-150 hover:bg-secondary/70">
              <input
                checked={checkedActions.includes(item)}
                className="mt-1 h-4 w-4 accent-primary"
                onChange={() => onToggle(item)}
                type="checkbox"
              />
              <span className={checkedActions.includes(item) ? "text-foreground line-through decoration-primary/70" : undefined}>
                {item}
              </span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FollowUpQuestions({ items }: { items: string[] }) {
  return (
    <div>
      <p className="text-sm font-medium">AI follow-up questions</p>
      <ul className="mt-2 space-y-2">
        {items.length === 0 ? (
          <li className="rounded-md border border-border/70 bg-card/70 px-3 py-2 text-sm leading-6 text-muted-foreground">
            No missing details detected.
          </li>
        ) : (
          items.map((item) => (
            <li key={item} className="flex items-start gap-3 rounded-md border border-border/70 bg-card/70 px-3 py-2 text-sm leading-6 text-muted-foreground">
              <HelpCircle className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

function buildFollowUpQuestions(items: string[]) {
  return items.map((item) => {
    const trimmed = item.trim();
    if (trimmed.endsWith("?")) {
      return trimmed;
    }

    return `Ask guard: ${trimmed.charAt(0).toLowerCase()}${trimmed.slice(1)}?`;
  });
}
