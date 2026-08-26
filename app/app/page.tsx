import {
  AlertTriangle,
  ClipboardCheck,
  Radio,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { GuardRecorder } from "@/components/guard-recorder";
import { IncidentCard } from "@/components/incident-card";
import { StatusBadge } from "@/components/status-badge";
import { listIncidents } from "@/lib/incidents";

export default async function AppPage() {
  const incidents = await listIncidents();
  const criticalCount = incidents.filter(
    (incident) => incident.severity === "critical",
  ).length;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/92 backdrop-blur-xl">
        <div className="mx-auto flex min-h-14 max-w-[96rem] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <ShieldCheck className="h-5 w-5 text-primary" aria-hidden="true" />
            <span className="text-sm font-semibold">Patrol</span>
          </Link>
          <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
            <a className="rounded-md px-3 py-2 text-sm font-medium text-primary" href="#incidents">
              Operations
            </a>
            <a className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground" href="#voice">
              Voice
            </a>
            <a className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground" href="#reports">
              Reports
            </a>
          </nav>
          <StatusBadge tone="green">Live</StatusBadge>
        </div>
      </header>

      <section className="border-b border-border/70 bg-card/60">
        <div className="mx-auto flex max-w-[96rem] flex-col gap-6 px-4 py-6 md:px-6 lg:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-mono text-xs uppercase text-primary">Security operations console</p>
              <h1 className="mt-2 text-3xl font-semibold tracking-normal">
                Live voice reports, structured incidents, clear dispatch.
              </h1>
            </div>
            <div className="flex flex-wrap gap-2">
              <StatusBadge tone="green">AssemblyAI connected</StatusBadge>
              <StatusBadge tone="neutral">Audit trail enabled</StatusBadge>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <Metric label="Open incidents" value={String(incidents.length)} />
            <Metric label="Critical" value={String(criticalCount)} />
            <Metric label="Voice to card" value="Live" />
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[96rem] gap-6 px-4 py-6 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.35fr)] md:px-6 lg:px-8">
        <div className="space-y-6" id="voice">
          <Panel
            title="Guard View"
            icon={<Radio className="h-5 w-5" aria-hidden="true" />}
          >
            <GuardRecorder />
          </Panel>

          <Panel
            title="AI Processing"
            icon={<ClipboardCheck className="h-5 w-5" aria-hidden="true" />}
          >
            <ol className="space-y-3 text-sm text-muted-foreground">
              <li>1. AssemblyAI streams finalized transcript turns.</li>
              <li>2. LLM Gateway extracts structured incident JSON.</li>
              <li>3. Supabase stores incidents and transcript audit records.</li>
              <li>4. Supervisors review, dispatch, and close reports.</li>
            </ol>
          </Panel>
        </div>

        <Panel
          title="Supervisor View"
          icon={<AlertTriangle className="h-5 w-5" aria-hidden="true" />}
        >
          <div id="incidents">
            {incidents.length === 0 ? (
              <div className="rounded-md border border-dashed border-border/70 p-8 text-center">
                <p className="text-sm font-medium">No incidents yet</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  New guard reports will appear here after voice extraction.
                </p>
              </div>
            ) : (
              <div className="grid gap-4">
                {incidents.map((incident) => (
                  <IncidentCard key={incident.id} incident={incident} />
                ))}
              </div>
            )}
          </div>
        </Panel>
      </section>
    </main>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-border/70 bg-card/80 p-4">
      <p className="font-mono text-xs uppercase text-muted-foreground">{label}</p>
      <p className="mt-2 font-mono text-2xl font-semibold tabular-nums">{value}</p>
    </div>
  );
}

function Panel({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-md border border-border/70 bg-card/86 p-4 text-card-foreground backdrop-blur-xl md:p-6">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-secondary text-secondary-foreground">
          {icon}
        </div>
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>
      {children}
    </section>
  );
}
