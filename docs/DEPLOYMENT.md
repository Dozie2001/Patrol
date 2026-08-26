# Deployment

## Recommended Auth Model

For the hackathon demo, keep `/app` open and make `/login` optional.

Why:

- Judges can test the product immediately without account friction.
- The product still shows a credible auth path for real security teams.
- The voice demo depends on microphone permissions and live APIs; adding a hard login gate increases failure risk during judging.

After the hackathon, protect `/app` with Supabase Auth and organization/site membership checks.

## Vercel Setup

Connect the GitHub repo:

```text
https://github.com/Dozie2001/Patrol
```

Framework preset:

```text
Next.js
```

Build command:

```bash
npm run build
```

Install command:

```bash
npm install
```

## Environment Variables

Add these in Vercel Project Settings:

```bash
ASSEMBLYAI_API_KEY
ASSEMBLYAI_LLM_GATEWAY_MODEL
ASSEMBLYAI_REGION
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
NEXT_PUBLIC_APP_URL
```

Production value:

```bash
NEXT_PUBLIC_APP_URL=https://your-vercel-domain.vercel.app
```

Keep these secret:

- `ASSEMBLYAI_API_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

Browser-safe:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Supabase Auth Settings

In Supabase Dashboard:

1. Go to Authentication -> URL Configuration.
2. Set Site URL to the production URL.
3. Add Redirect URL:

```text
https://your-vercel-domain.vercel.app/app
```

4. Enable Email/Password and/or Magic Link.

## Predeploy Checks

```bash
npm run typecheck
npm run lint
npm run build
```

## Launch Smoke Test

After deployment:

1. Open `/`.
2. Click `Launch app`.
3. Confirm seeded incidents load.
4. Click `Run demo script`.
5. Confirm a new incident appears.
6. Open `/login`.
7. Test magic link or email/password.

