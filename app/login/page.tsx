import Link from "next/link";
import { AuthForm } from "@/components/auth-form";
import { PatrolLogo } from "@/components/patrol-logo";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="absolute inset-0 ops-grid" aria-hidden="true" />
      <div className="relative mx-auto grid min-h-screen max-w-6xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:px-8">
        <section>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <PatrolLogo size={28} />
            <span className="text-sm font-semibold">Patrol</span>
          </Link>
          <p className="mt-8 font-mono text-xs uppercase text-primary">
            Secure operations access
          </p>
          <h1 className="mt-3 text-4xl font-semibold leading-tight tracking-normal sm:text-5xl">
            Sign in to the incident command console.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground">
            Use Supabase Auth for team access. The hackathon demo can still launch directly while the account model is refined.
          </p>
        </section>

        <section aria-label="Authentication form">
          <AuthForm />
        </section>
      </div>
    </main>
  );
}
