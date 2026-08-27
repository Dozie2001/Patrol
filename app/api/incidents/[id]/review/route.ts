import { NextResponse } from "next/server";
import { updateIncidentStatus } from "@/lib/incidents";
import { statusSchema } from "@/lib/incident-schema";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function PATCH(request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const body = await request.json();
    const status = statusSchema.parse(body.status);
    const incident = await updateIncidentStatus({ id, status });

    return NextResponse.json({ incident });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Incident review failed" },
      { status: 400 },
    );
  }
}
