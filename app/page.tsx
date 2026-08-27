import {
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  Cpu,
  LockKeyhole,
  Radio,
  ShieldCheck,
  Siren,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { PatrolLogo } from "@/components/patrol-logo";
import { StatusBadge } from "@/components/status-badge";
import { listIncidents } from "@/lib/incidents";

const capabilities = [
  "Live guard voice capture",
  "Structured incident extraction",
  "Supervisor dispatch board",
  "Transcript audit trail",
];

const timeline = [
  {
    time: "00:00",
    label: "Guard report",
    value: "Possible forced entry at Loading Bay B",
    state: "capturing",
  },
  {
    time: "00:08",
    label: "AI extraction",
    value: "Severity: Critical · Backup requested",
    state: "processing",
  },
  {
    time: "00:12",
    label: "Supervisor card",
    value: "CCTV, evidence, and dispatch actions queued",
    state: "ready",
  },
];

const tickerItems = [
  "Live STT",
  "Supervisor review",
  "Incident cards",
  "Transcript audit",
  "CCTV prompts",
  "Backup requests",
  "Dispatch actions",
  "Final reports",
];

const signalRows = [
  {
    step: "01",
    label: "AssemblyAI streaming",
    value: "Voice report converted into live transcript turns",
    status: "active",
  },
  {
    step: "02",
    label: "Incident extraction",
    value: "Location, threat, severity, people, and requested action pulled out",
    status: "running",
  },
  {
    step: "03",
    label: "Supervisor handoff",
    value: "Dispatch card, missing questions, and audit log prepared",
    status: "queued",
  },
];

export default async function Home() {
  const incidents = await listIncidents();
  const criticalCount = incidents.filter(
    (incident) => incident.severity === "critical",
  ).length;

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/88 backdrop-blur-xl">
        <div className="mx-auto flex min-h-14 max-w-[96rem] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <PatrolLogo size={28} />
            <span className="text-sm font-semibold">Patrol</span>
          </Link>
          <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
            <a className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground" href="#workflow">
              Workflow
            </a>
            <a className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground" href="#signals">
              Signals
            </a>
            <a className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground" href="#security">
              Security
            </a>
            <a className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground" href="#built-with">
              Built with
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <Link
              href="/login"
              className="hidden min-h-10 items-center rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:inline-flex"
            >
              Sign in
            </Link>
            <Link
              href="/app"
              className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors duration-150 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Launch app
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </header>

      <section className="relative flex min-h-[92dvh] items-center overflow-hidden border-b border-border/60">
        <div className="absolute inset-0 ops-grid" aria-hidden="true" />
        <div className="landing-stars" aria-hidden="true" />
        <div className="landing-stars landing-stars-b" aria-hidden="true" />
        <div className="landing-stars landing-stars-c" aria-hidden="true" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[44rem] w-[44rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.045] blur-[150px]" aria-hidden="true" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 w-[42rem] max-w-[92vw] -translate-x-1/2 -translate-y-1/2 opacity-70" aria-hidden="true">
          <div className="landing-orbit aspect-square">
            <svg className="h-full w-full text-foreground/18" fill="none" viewBox="0 0 480 480">
              <circle cx="240" cy="240" r="154" stroke="currentColor" strokeDasharray="0.5 7" strokeLinecap="round" strokeWidth="1.6" />
              <ellipse cx="240" cy="240" rx="154" ry="92" stroke="currentColor" strokeDasharray="0.5 7" strokeLinecap="round" strokeWidth="1.6" />
              <ellipse cx="240" cy="240" rx="92" ry="154" stroke="currentColor" strokeDasharray="0.5 7" strokeLinecap="round" strokeWidth="1.6" />
            </svg>
          </div>
        </div>

        <div className="relative mx-auto grid w-full max-w-[96rem] items-center gap-10 px-4 pb-24 pt-14 sm:px-6 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:px-8">
          <div className="max-w-3xl motion-safe:animate-[hero-rise_400ms_ease-out_both]">
            <p className="font-mono text-xs uppercase text-primary">
              Voice AI for physical security teams
            </p>
            <h1 className="mt-4 max-w-4xl text-5xl font-semibold leading-none tracking-normal sm:text-6xl lg:text-7xl">
              Turn guard radio traffic into incident intelligence.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
              Patrol listens to live field reports, extracts what matters, and gives supervisors a real-time dispatch board with audit-ready reports.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/app"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors duration-150 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Launch operations
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/login"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-border bg-card/80 px-5 py-3 text-sm font-semibold text-foreground transition-colors duration-150 hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Create account
              </Link>
            </div>
            <div className="mt-8">
              <LogoRail />
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {capabilities.map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-primary" aria-hidden="true" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="relative rounded-md border border-primary/20 bg-card/88 p-4 shadow-[0_24px_80px_rgba(0,0,0,0.34)] backdrop-blur-xl motion-safe:animate-[hero-rise_400ms_120ms_ease-out_both]">
            <div className="flex items-center justify-between gap-3 border-b border-border/70 pb-4">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/50 motion-reduce:animate-none" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
                </span>
                <p className="text-sm font-medium">Live operations feed</p>
              </div>
              <StatusBadge tone="green">Online</StatusBadge>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <LandingMetric label="Incidents" value={String(incidents.length)} />
              <LandingMetric label="Critical" value={String(criticalCount)} />
              <LandingMetric label="Latency" value="8s" />
            </div>
            <div className="mt-4 grid gap-4 lg:grid-cols-[0.76fr_1fr]">
              <div className="relative aspect-square overflow-hidden rounded-md border border-border/70 bg-background/70">
                <div className="absolute inset-7 rounded-full border border-primary/20" />
                <div className="absolute inset-14 rounded-full border border-primary/15" />
                <div className="absolute inset-20 rounded-full border border-primary/10" />
                <div className="radar-sweep absolute inset-8 rounded-full origin-center" />
                <span className="absolute left-[58%] top-[28%] h-2 w-2 rounded-full bg-destructive shadow-[0_0_18px_hsl(var(--destructive)/0.7)]" />
                <span className="absolute left-[38%] top-[64%] h-2 w-2 rounded-full bg-primary shadow-[0_0_18px_hsl(var(--primary)/0.7)]" />
                <span className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary" />
              </div>
              <OpsTerminal />
            </div>
          </div>
        </div>
        <HeroTicker />
      </section>

      <section id="workflow" className="mx-auto max-w-[96rem] px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-3">
          <Feature icon={<Radio />} title="Capture" copy="Guards speak naturally from patrol, gate, lobby, or loading dock workflows." />
          <Feature icon={<Zap />} title="Extract" copy="AssemblyAI turns speech into transcript turns and incident fields for review." />
          <Feature icon={<ClipboardList />} title="Dispatch" copy="Supervisors get severity, missing info, actions, and report-ready records." />
        </div>
      </section>

      <section id="signals" className="border-y border-border/60 bg-card/45">
        <div className="mx-auto grid max-w-[96rem] gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:px-8">
          <div>
            <p className="font-mono text-xs uppercase text-primary">Terminal-grade progress</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-normal">
              Every radio call becomes a traceable workflow.
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-6 text-muted-foreground">
              The MVP should make the AI work visible: transcript state, extracted fields, supervisor review, and final report history.
            </p>
          </div>
          <div className="rounded-md border border-primary/20 bg-background/78 p-4 shadow-[0_24px_80px_rgba(0,0,0,0.28)]">
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <div className="flex items-center gap-2">
                <Cpu className="h-4 w-4 text-primary" aria-hidden="true" />
                <p className="font-mono text-xs uppercase text-muted-foreground">incident_pipeline.run</p>
              </div>
              <StatusBadge tone="green">Streaming</StatusBadge>
            </div>
            <div className="mt-4 space-y-3">
              {signalRows.map((row) => (
                <div key={row.step} className="grid gap-3 rounded-md border border-border/70 bg-card/70 p-4 sm:grid-cols-[3rem_1fr_auto] sm:items-center">
                  <p className="font-mono text-sm text-primary">{row.step}</p>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{row.label}</p>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">{row.value}</p>
                  </div>
                  <span className="w-fit rounded-md border border-border/70 bg-secondary px-2 py-1 font-mono text-xs uppercase text-muted-foreground">
                    {row.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="security" className="border-y border-border/60 bg-card/45">
        <div className="mx-auto grid max-w-[96rem] gap-6 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="font-mono text-xs uppercase text-primary">Built for serious environments</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-normal">
              Field reports stay fast without losing the audit trail.
            </h2>
          </div>
          <div className="grid gap-3">
            <SecurityRow icon={<LockKeyhole />} text="API keys stay server-side; browsers use short-lived AssemblyAI tokens." />
            <SecurityRow icon={<Siren />} text="AI recommendations stay advisory for human supervisor review." />
            <SecurityRow icon={<ShieldCheck />} text="Supabase stores incidents, transcript turns, reports, and action history." />
          </div>
        </div>
      </section>

      <footer id="built-with" className="mx-auto flex max-w-[96rem] flex-col gap-4 px-4 py-10 text-sm text-muted-foreground sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <LogoRail compact />
        <Link href="/app" className="font-medium text-primary hover:text-foreground">
          Open app
        </Link>
      </footer>
    </main>
  );
}

function LogoRail({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <BrandPill brand="assemblyai" label="AssemblyAI" caption={compact ? "Built with" : "Voice AI"} variant="primary" />
      <BrandPill brand="vercel" label="Vercel" caption={compact ? "Hosted on" : "Deployment"} />
      <BrandPill brand="supabase" label="Supabase" caption={compact ? "Secured by" : "Database + auth"} />
    </div>
  );
}

function BrandPill({
  brand,
  label,
  caption,
  variant = "default",
}: {
  brand: "assemblyai" | "vercel" | "supabase";
  label: string;
  caption: string;
  variant?: "default" | "primary";
}) {
  return (
    <div className={`inline-flex min-h-12 items-center gap-3 rounded-md border px-3 py-2 ${
      variant === "primary"
        ? "border-primary/30 bg-primary/10 text-foreground"
        : "border-border/70 bg-card/75 text-foreground"
    }`}>
      <BrandMark brand={brand} />
      <span>
        <span className="block text-[0.68rem] uppercase leading-none text-muted-foreground">{caption}</span>
        <span className="mt-1 block text-sm font-semibold leading-none">{label}</span>
      </span>
    </div>
  );
}

function BrandMark({ brand }: { brand: "assemblyai" | "vercel" | "supabase" }) {
  if (brand === "vercel") {
    return (
      <span className="flex h-8 w-8 items-center justify-center rounded-md border border-current/20 bg-background/70" aria-hidden="true">
        <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
          <path d="M12 4 22 20H2L12 4Z" />
        </svg>
      </span>
    );
  }

  if (brand === "supabase") {
    return (
      <span className="flex h-8 w-8 items-center justify-center rounded-md border border-current/20 bg-background/70" aria-hidden="true">
        <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
          <path d="M13.4 2.8 5.6 13.1c-.5.7 0 1.7.9 1.7h5.1l-1 6.1c-.2 1 .9 1.6 1.6.8l7.7-10.4c.5-.7 0-1.7-.9-1.7h-5.1l1-6.1c.2-1-.9-1.6-1.5-.7Z" />
        </svg>
      </span>
    );
  }

  return (
    <span className="flex h-8 w-8 items-center justify-center rounded-md border border-current/20 bg-background/70" aria-hidden="true">
      <span className="flex items-end justify-center gap-0.5">
        <span className="h-2 w-1 rounded-full bg-current/45" />
        <span className="h-4 w-1 rounded-full bg-current/65" />
        <span className="h-6 w-1 rounded-full bg-current" />
        <span className="h-3 w-1 rounded-full bg-current/55" />
      </span>
    </span>
  );
}

function OpsTerminal() {
  return (
    <div className="overflow-hidden rounded-md border border-border/70 bg-background/80">
      <div className="flex items-center justify-between border-b border-border/60 bg-muted/30 px-4 py-3">
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-destructive" />
          <span className="h-2.5 w-2.5 rounded-full bg-primary/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-accent" />
        </div>
        <p className="font-mono text-xs text-muted-foreground">patrol/live-session</p>
      </div>
      <div className="space-y-3 p-4">
        {timeline.map((item) => (
          <div key={item.time} className="rounded-md border border-border/60 bg-card/72 p-3">
            <div className="flex items-center justify-between gap-3">
              <p className="font-mono text-xs text-primary">{item.time}</p>
              <span className="rounded-md bg-secondary px-2 py-1 font-mono text-[0.68rem] uppercase text-muted-foreground">
                {item.state}
              </span>
            </div>
            <p className="mt-2 text-xs font-medium uppercase text-muted-foreground">{item.label}</p>
            <p className="mt-1 text-sm leading-6 text-foreground">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function HeroTicker() {
  const items = [...tickerItems, ...tickerItems];

  return (
    <div className="landing-marquee absolute inset-x-0 bottom-0 z-10 overflow-hidden border-t border-border/40 py-4">
      <div className="landing-ticker flex w-max items-center gap-10 pr-10 whitespace-nowrap">
        {items.map((item, index) => (
          <div
            key={`${item}-${index}`}
            className="flex items-center gap-10 font-mono text-xs text-muted-foreground"
          >
            <span>{item}</span>
            <span aria-hidden="true" className="text-primary/45">
              /
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function LandingMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-border/70 bg-muted/40 p-3">
      <p className="font-mono text-xs uppercase text-muted-foreground">{label}</p>
      <p className="mt-2 font-mono text-2xl font-semibold tabular-nums">{value}</p>
    </div>
  );
}

function Feature({
  icon,
  title,
  copy,
}: {
  icon: React.ReactNode;
  title: string;
  copy: string;
}) {
  return (
    <div className="rounded-md border border-border/70 bg-card/82 p-5">
      <div className="flex h-10 w-10 items-center justify-center rounded-md bg-secondary text-primary">
        {icon}
      </div>
      <h3 className="mt-4 text-base font-semibold">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{copy}</p>
    </div>
  );
}

function SecurityRow({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-start gap-3 rounded-md border border-border/70 bg-background/70 p-4">
      <div className="mt-0.5 text-primary">{icon}</div>
      <p className="text-sm leading-6 text-muted-foreground">{text}</p>
    </div>
  );
}
