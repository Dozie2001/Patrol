const STREAMING_HOSTS = {
  edge: "streaming.assemblyai.com",
  us: "streaming.us.assemblyai.com",
  eu: "streaming.eu.assemblyai.com",
};

const LLM_GATEWAY_HOSTS = {
  us: "https://llm-gateway.assemblyai.com",
  eu: "https://llm-gateway.eu.assemblyai.com",
};

export function getAssemblyAIRegion() {
  const region = process.env.ASSEMBLYAI_REGION;
  return region === "eu" ? "eu" : "us";
}

export async function mintStreamingToken() {
  const apiKey = process.env.ASSEMBLYAI_API_KEY;
  if (!apiKey) {
    throw new Error("ASSEMBLYAI_API_KEY is not configured");
  }

  const region = getAssemblyAIRegion();
  const host = STREAMING_HOSTS[region];
  const response = await fetch(
    `https://${host}/v3/token?expires_in_seconds=60&max_session_duration_seconds=1800`,
    {
      headers: {
        authorization: apiKey,
      },
    },
  );

  if (!response.ok) {
    throw new Error(`AssemblyAI token request failed: ${response.status}`);
  }

  const data = (await response.json()) as { token: string };
  const params = new URLSearchParams({
    sample_rate: "16000",
    speech_model: "universal-3-5-pro",
    mode: "balanced",
    token: data.token,
  });

  return {
    token: data.token,
    websocket_url: `wss://${host}/v3/ws?${params.toString()}`,
  };
}

export async function callLLMGateway(messages: Array<{ role: "system" | "user"; content: string }>) {
  const apiKey = process.env.ASSEMBLYAI_API_KEY;
  if (!apiKey) {
    throw new Error("ASSEMBLYAI_API_KEY is not configured");
  }

  const region = getAssemblyAIRegion();
  const model = process.env.ASSEMBLYAI_LLM_GATEWAY_MODEL ?? "qwen3.5-4b-32k-fast";
  const response = await fetch(`${LLM_GATEWAY_HOSTS[region]}/v1/chat/completions`, {
    method: "POST",
    headers: {
      authorization: apiKey,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model,
      messages,
      max_tokens: 1200,
    }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(`LLM Gateway request failed: ${JSON.stringify(data)}`);
  }

  return data;
}
