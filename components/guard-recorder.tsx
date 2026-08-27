"use client";

import { useCallback, useRef, useState } from "react";
import { AlertCircle, CheckCircle2, Loader2, Mic, Play, Square } from "lucide-react";
import { useRouter } from "next/navigation";

type TurnMessage = {
  type: "Turn";
  turn_order: number;
  transcript: string;
  end_of_turn: boolean;
};

type TranscriptTurn = {
  id: string;
  text: string;
  final: boolean;
};

type RecorderState = "idle" | "connecting" | "listening" | "extracting" | "error";

const demoScript =
  "Control, this is Patrol 2. I am at loading bay B. The rear door lock is broken. No person visible. Possible forced entry. Requesting backup and CCTV review.";

export function GuardRecorder() {
  const router = useRouter();
  const [state, setState] = useState<RecorderState>("idle");
  const [turns, setTurns] = useState<TranscriptTurn[]>([]);
  const [partial, setPartial] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [lastSaved, setLastSaved] = useState<string | null>(null);

  const audioContextRef = useRef<AudioContext | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const workletRef = useRef<AudioWorkletNode | null>(null);
  const socketRef = useRef<WebSocket | null>(null);
  const finalTranscriptRef = useRef<string[]>([]);

  const stopRecording = useCallback(async () => {
    const socket = socketRef.current;
    if (socket?.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ type: "Terminate" }));
    }
    socketRef.current = null;

    workletRef.current?.disconnect();
    workletRef.current = null;

    mediaStreamRef.current?.getTracks().forEach((track) => track.stop());
    mediaStreamRef.current = null;

    await audioContextRef.current?.close();
    audioContextRef.current = null;

    const transcript = finalTranscriptRef.current.join(" ").trim();
    if (!transcript) {
      setState("idle");
      return;
    }

    setState("extracting");
    try {
      const response = await fetch("/api/incidents/extract", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ transcript }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error ?? "Could not extract incident");
      }
      setLastSaved(data.incident?.incident_type ?? "Incident saved");
      setState("idle");
      router.push("/app");
      router.refresh();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Incident extraction failed");
      setState("error");
    }
  }, [router]);

  const startRecording = useCallback(async () => {
    setError(null);
    setLastSaved(null);
    setPartial("");
    setTurns([]);
    finalTranscriptRef.current = [];
    setState("connecting");

    try {
      const tokenResponse = await fetch("/api/assemblyai/streaming-token");
      const tokenData = await tokenResponse.json();
      if (!tokenResponse.ok) {
        throw new Error(tokenData.error ?? "Could not create AssemblyAI token");
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          channelCount: 1,
        },
      });
      mediaStreamRef.current = stream;

      const audioContext = new AudioContext();
      audioContextRef.current = audioContext;
      await audioContext.audioWorklet.addModule("/assemblyai-pcm-worklet.js");

      const source = audioContext.createMediaStreamSource(stream);
      const worklet = new AudioWorkletNode(audioContext, "assemblyai-pcm-processor");
      const silence = audioContext.createGain();
      silence.gain.value = 0;
      source.connect(worklet);
      worklet.connect(silence);
      silence.connect(audioContext.destination);
      workletRef.current = worklet;

      const websocketUrl =
        tokenData.websocket_url ??
        `wss://streaming.us.assemblyai.com/v3/ws?sample_rate=16000&speech_model=universal-3-5-pro&mode=balanced&token=${tokenData.token}`;
      const socket = new WebSocket(websocketUrl);
      socket.binaryType = "arraybuffer";
      socketRef.current = socket;

      socket.addEventListener("open", () => {
        setState("listening");
      });

      socket.addEventListener("message", (event) => {
        const message = JSON.parse(event.data as string) as unknown;
        if (!isTurnMessage(message)) {
          return;
        }

        if (message.end_of_turn) {
          const text = message.transcript.trim();
          if (!text) {
            return;
          }
          finalTranscriptRef.current.push(text);
          setPartial("");
          setTurns((current) => [
            ...current,
            {
              id: String(message.turn_order),
              text,
              final: true,
            },
          ]);
        } else {
          setPartial(message.transcript);
        }
      });

      socket.addEventListener("error", () => {
        setError("AssemblyAI streaming connection failed");
        setState("error");
      });

      worklet.port.onmessage = (event: MessageEvent<ArrayBuffer>) => {
        if (socket.readyState === WebSocket.OPEN) {
          socket.send(event.data);
        }
      };
    } catch (caught) {
      socketRef.current?.close();
      socketRef.current = null;
      workletRef.current?.disconnect();
      workletRef.current = null;
      mediaStreamRef.current?.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
      await audioContextRef.current?.close().catch(() => undefined);
      audioContextRef.current = null;
      setError(caught instanceof Error ? caught.message : "Microphone setup failed");
      setState("error");
    }
  }, []);

  const submitDemoScript = useCallback(async () => {
    setState("extracting");
    setError(null);
    setLastSaved(null);
    setTurns([{ id: "demo", text: demoScript, final: true }]);
    finalTranscriptRef.current = [demoScript];

    try {
      const response = await fetch("/api/incidents/extract", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ transcript: demoScript }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error ?? "Could not extract demo incident");
      }
      setLastSaved(data.incident?.incident_type ?? "Demo incident saved");
      setState("idle");
      router.push("/app");
      router.refresh();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Demo extraction failed");
      setState("error");
    }
  }, [router]);

  const isBusy = state === "connecting" || state === "extracting";
  const isListening = state === "listening";

  return (
    <div className="space-y-4">
      <div className="rounded-md border border-primary/20 bg-primary/8 p-4">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-background/70 text-primary">
            <Play className="h-4 w-4" aria-hidden="true" />
          </span>
          <div>
            <p className="text-sm font-semibold text-foreground">Fast demo path</p>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              Click Run demo script to create a realistic incident without relying on room audio, browser mic permission, or network timing.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        <button
          type="button"
          onClick={isListening ? stopRecording : startRecording}
          disabled={isBusy}
          aria-busy={isBusy}
          className="inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors duration-150 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60"
        >
          {state === "connecting" || state === "extracting" ? (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          ) : isListening ? (
            <Square className="h-4 w-4" aria-hidden="true" />
          ) : (
            <Mic className="h-4 w-4" aria-hidden="true" />
          )}
          {isListening ? "Stop and create incident" : state === "extracting" ? "Creating incident" : "Start patrol report"}
        </button>
        <button
          type="button"
          onClick={submitDemoScript}
          disabled={isBusy || isListening}
          className="inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-md border bg-card px-4 py-2 text-sm font-medium transition-colors duration-150 hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60"
        >
          <Play className="h-4 w-4" aria-hidden="true" />
          Run demo script
        </button>
      </div>

      <div className="rounded-md border border-border/70 bg-card/70 p-4">
        <p className="font-mono text-xs uppercase text-muted-foreground">Scenario loaded</p>
        <p className="mt-2 text-sm leading-6 text-foreground">{demoScript}</p>
      </div>

      <div className="rounded-md border border-border/70 bg-background p-4">
        <div className="mb-3 flex items-center justify-between gap-3">
          <p className="text-sm font-medium">Live transcript</p>
          <span className={`rounded-full px-2 py-1 text-xs font-medium ${isListening ? "soft-pulse bg-accent text-accent-foreground" : "bg-secondary text-secondary-foreground"}`}>
            {isListening ? "Listening" : state === "connecting" ? "Connecting" : state === "extracting" ? "Extracting" : "Ready"}
          </span>
        </div>

        {turns.length === 0 && !partial ? (
          <div className="rounded-md border border-dashed p-4">
            <p className="text-sm font-medium">No transcript yet</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Start a patrol report or run the demo script.
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {turns.map((turn) => (
              <p key={turn.id} className="text-sm leading-6 text-muted-foreground">
                {turn.text}
              </p>
            ))}
            {partial ? (
              <p className="text-sm leading-6 text-muted-foreground">{partial}</p>
            ) : null}
          </div>
        )}
      </div>

      {error ? (
        <div className="rounded-md border border-destructive/30 bg-destructive/10 p-4">
          <div className="flex items-center gap-2 text-destructive">
            <AlertCircle className="h-4 w-4" aria-hidden="true" />
            <p className="text-sm font-medium">Could not finish report</p>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">{error}</p>
        </div>
      ) : null}

      {lastSaved ? (
        <div className="rounded-md border border-primary/30 bg-primary/10 p-4">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-accent" aria-hidden="true" />
            <p className="text-sm font-medium">Saved: {lastSaved}</p>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function isTurnMessage(message: unknown): message is TurnMessage {
  if (!message || typeof message !== "object") {
    return false;
  }

  const candidate = message as Partial<TurnMessage>;
  return (
    candidate.type === "Turn" &&
    typeof candidate.turn_order === "number" &&
    typeof candidate.transcript === "string" &&
    typeof candidate.end_of_turn === "boolean"
  );
}
