class AssemblyAIPcmProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
    this.targetSampleRate = 16000;
    this.chunkSize = 1600;
    this.pending = [];
    this.sourceOffset = 0;
  }

  process(inputs) {
    const input = inputs[0]?.[0];
    if (!input) {
      return true;
    }

    const ratio = sampleRate / this.targetSampleRate;
    while (this.sourceOffset < input.length) {
      const sample = input[Math.floor(this.sourceOffset)] ?? 0;
      const clamped = Math.max(-1, Math.min(1, sample));
      this.pending.push(clamped < 0 ? clamped * 0x8000 : clamped * 0x7fff);
      this.sourceOffset += ratio;
    }

    this.sourceOffset -= input.length;

    while (this.pending.length >= this.chunkSize) {
      const chunk = new Int16Array(this.pending.splice(0, this.chunkSize));
      this.port.postMessage(chunk.buffer, [chunk.buffer]);
    }

    return true;
  }
}

registerProcessor("assemblyai-pcm-processor", AssemblyAIPcmProcessor);

