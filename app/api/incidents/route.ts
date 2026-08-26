import { NextResponse } from "next/server";
import {
  createIncidentFromExtraction,
  listIncidents,
} from "@/lib/incidents";
import { incidentExtractionSchema } from "@/lib/incident-schema";

export async function GET() {
  const incidents = await listIncidents();
  return NextResponse.json({ incidents });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const extraction = incidentExtractionSchema.parse(body);
    const incident = await createIncidentFromExtraction(extraction);
    return NextResponse.json({ incident }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Incident creation failed" },
      { status: 400 },
    );
  }
}

