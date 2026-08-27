# Test Plan

## Judge Demo Test

1. Open the deployed app at `https://patrol-ai-sage.vercel.app/`.
2. Confirm the landing page explains the physical security use case in the first viewport.
3. Click `Launch app`.
4. In Guard View, click `Run demo script`.
5. Confirm an incident card appears in Supervisor View.
6. Confirm the card includes severity, status, location, summary, backup request, dispatch checklist, and AI follow-up questions.
7. Tick at least one dispatch checklist item.
8. Click `Dispatch`, then confirm the status badge changes to `dispatched`.
9. Click `Resolve`, then confirm the status badge changes to `resolved`.
10. Repeat once with live microphone input if browser permissions and room audio are reliable.

## Auth Smoke Test

1. Open `/login`.
2. Confirm the email and password fields are labeled and keyboard focus is visible.
3. Try magic link with an empty email and confirm the button is disabled.
4. Sign in or sign up with a test account if Supabase Auth is configured for the deployment.

## API Smoke Test

```bash
curl -s https://patrol-ai-sage.vercel.app/api/incidents
curl -s https://patrol-ai-sage.vercel.app/api/assemblyai/streaming-token
```

The incidents endpoint should return incident data. The AssemblyAI token endpoint should return a token only when the production environment has `ASSEMBLYAI_API_KEY`.

## Scenario Regression Set

Use these as fixed scripts and compare extraction results:

1. Possible forced entry at loading bay.
2. Suspicious person near restricted area.
3. Medical emergency in lobby.
4. Aggressive visitor at reception.
5. Smoke in stairwell.
6. Vehicle accident at parking gate.
7. Contractor without valid pass.
8. Alarm verification call.

## Metrics

- Time from voice report to incident card.
- Incident type accuracy.
- Severity accuracy.
- Location extraction accuracy.
- Usefulness of missing-information prompts.
- Usefulness of suggested dispatch actions.
- Supervisor review completion time.
