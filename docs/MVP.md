# MVP Definition

## One-Line Pitch

Patrol turns guard voice reports and radio traffic into real-time incident cards, supervisor actions, and professional incident reports.

## Hackathon Objective

Build a working demo for physical security teams that shows a complete voice-to-operations loop:

1. A guard speaks an incident report.
2. AssemblyAI transcribes the speech in real time.
3. The system extracts security incident details.
4. A supervisor sees a live incident card.
5. The app generates a polished final report.

## Target Buyers

- Private security companies
- Malls and retail centers
- Warehouses and logistics facilities
- Hospitals
- Campuses
- Hotels
- Gated communities
- Event security teams

## MVP Features

### Guard View

- Microphone / push-to-talk capture.
- Live transcript display.
- Incident type and severity preview.
- Missing-information prompts.
- Submit incident button.

### Supervisor View

- Live incident cards.
- Severity, status, location, and backup request indicators.
- Suggested next actions.
- Missing information checklist.
- Status updates: `new`, `triage`, `dispatched`, `resolved`, `closed`.
- Final report generation.

### AI Processing

- Real-time speech-to-text using AssemblyAI Streaming STT or Voice Agent API.
- Structured incident extraction using AssemblyAI LLM Gateway.
- Final incident report generation using AssemblyAI LLM Gateway.
- Prompting/keyterms tuned for physical security vocabulary.

## Non-Goals

- Replacing emergency dispatchers or security supervisors.
- Real production emergency response.
- Real radio hardware integration.
- Complex scheduling, billing, payroll, or guard tour management.
- Mobile native app in the hackathon MVP.

## Demo Scenarios

### Possible Forced Entry

Input:

> Control, this is Patrol 2. I am at loading bay B. The rear door lock is broken. No person visible. Possible forced entry. Requesting backup and CCTV review.

Expected extraction:

- Type: possible forced entry
- Severity: high
- Location: loading bay B
- Backup requested: yes
- Evidence needed: CCTV review, photo of lock
- Missing info: time discovered, whether area is secured

### Medical Emergency

Input:

> Control, there is a guest collapsed in the main lobby near reception. They are conscious but breathing heavily. I need medical assistance and crowd control.

Expected extraction:

- Type: medical emergency
- Severity: critical
- Location: main lobby near reception
- Medical: guest collapsed, conscious, breathing heavily
- Backup requested: yes
- Suggested actions: dispatch medical responder, clear area, notify supervisor

### Suspicious Person

Input:

> Patrol 4 to control. A male in a black hoodie is walking around the restricted loading area and looking into parked vehicles. No badge visible.

Expected extraction:

- Type: suspicious person
- Severity: medium
- Location: restricted loading area
- People involved: male in black hoodie
- Missing info: exact current position, whether person was challenged, direction of travel

## Success Criteria

- A judge can understand the product in under 30 seconds.
- One spoken report becomes a live transcript and structured incident card.
- The incident card contains correct incident type, severity, location, and next actions.
- The final report is readable enough for a client or supervisor.
- The app demonstrates why voice matters for guards in the field.

## AssemblyAI Usage

- Voice Agent API can provide a full talk/listen agent deployable in browser or over phone.
- Streaming STT can transcribe live audio and emit `Turn` events, including finalized turns.
- LLM Gateway can classify transcripts, generate structured JSON, and generate reports through a unified OpenAI-compatible API.

References:

- https://www.assemblyai.com/docs/voice-agents/voice-agent-api
- https://www.assemblyai.com/docs/streaming/getting-started/transcribe-streaming-audio
- https://www.assemblyai.com/docs/llm-gateway/quickstart
