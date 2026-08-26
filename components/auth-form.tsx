"use client";

import { useState } from "react";
import { AlertCircle, Loader2, LogIn, Mail, UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase";

type Mode = "signin" | "signup";

export function AuthForm() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function submitPassword(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const supabase = createSupabaseBrowserClient();
      const result =
        mode === "signin"
          ? await supabase.auth.signInWithPassword({ email, password })
          : await supabase.auth.signUp({
              email,
              password,
              options: {
                emailRedirectTo: `${window.location.origin}/app`,
              },
            });

      if (result.error) {
        throw result.error;
      }

      if (mode === "signup" && !result.data.session) {
        setMessage("Check your email to confirm the account.");
        return;
      }

      router.push("/app");
      router.refresh();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Authentication failed");
    } finally {
      setLoading(false);
    }
  }

  async function sendMagicLink() {
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const supabase = createSupabaseBrowserClient();
      const result = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/app`,
        },
      });

      if (result.error) {
        throw result.error;
      }

      setMessage("Magic link sent. Check your email.");
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Could not send magic link");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-md border border-border/70 bg-card/88 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl">
      <div className="grid grid-cols-2 rounded-md border border-border/70 bg-background/70 p-1">
        <button
          type="button"
          onClick={() => setMode("signin")}
          className={`min-h-10 rounded-md px-3 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
            mode === "signin" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Sign in
        </button>
        <button
          type="button"
          onClick={() => setMode("signup")}
          className={`min-h-10 rounded-md px-3 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
            mode === "signup" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Sign up
        </button>
      </div>

      <form className="mt-5 space-y-4" onSubmit={submitPassword}>
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            className="min-h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            placeholder="you@company.com"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium">
            Password
          </label>
          <input
            id="password"
            type="password"
            autoComplete={mode === "signin" ? "current-password" : "new-password"}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            minLength={8}
            className="min-h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            placeholder="At least 8 characters"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          aria-busy={loading}
          className="inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors duration-150 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-60"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          ) : mode === "signin" ? (
            <LogIn className="h-4 w-4" aria-hidden="true" />
          ) : (
            <UserPlus className="h-4 w-4" aria-hidden="true" />
          )}
          {mode === "signin" ? "Sign in" : "Create account"}
        </button>
      </form>

      <button
        type="button"
        onClick={sendMagicLink}
        disabled={loading || !email}
        className="mt-3 inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-md border border-border bg-background px-4 py-2 text-sm font-medium transition-colors duration-150 hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-60"
      >
        <Mail className="h-4 w-4" aria-hidden="true" />
        Send magic link
      </button>

      {error ? (
        <div className="mt-4 rounded-md border border-destructive/30 bg-destructive/10 p-3">
          <div className="flex items-center gap-2 text-destructive">
            <AlertCircle className="h-4 w-4" aria-hidden="true" />
            <p className="text-sm font-medium">Auth failed</p>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">{error}</p>
        </div>
      ) : null}

      {message ? (
        <div className="mt-4 rounded-md border border-primary/30 bg-primary/10 p-3">
          <p className="text-sm text-foreground">{message}</p>
        </div>
      ) : null}
    </div>
  );
}

