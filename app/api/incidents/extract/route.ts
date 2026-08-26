import { NextResponse } from "next/server";
import { callLLMGateway } from "@/lib/assemblyai";
import {
  buildIncidentExtractionPrompt,
  incidentExtractionSystemPrompt,
} from "@/lib/prompts";
import { createIncidentFromExtraction, saveTranscriptTurn } from "@/lib/incidents";
import { incidentExtractionSchema } from "@/lib/incident-schema";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { transcript?: string };

    if (!body.transcript) {
      return NextResponse.json({ error: "Missing transcript" }, { status: 400 });
    }

    const result = await callLLMGateway([
      { role: "system", content: incidentExtractionSystemPrompt },
      { role: "user", content: buildIncidentExtractionPrompt(body.transcript) },
    ]);

    const content = result.choices?.[0]?.message?.content;
    if (!content) {
      return NextResponse.json({ error: "No extraction returned" }, { status: 502 });
    }

    const extraction = incidentExtractionSchema.parse(JSON.parse(content));
    const incident = await createIncidentFromExtraction(extraction);
    await saveTranscriptTurn({
      incidentId: incident.id,
      transcript: body.transcript,
    });

    return NextResponse.json({
      extraction,
      incident,
      request_id: result.request_id,
      model: result.model,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Extraction failed" },
      { status: 500 },
    );
  }
}
