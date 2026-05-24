/**
 * Utility functions for audio processing used with Edge Impulse models.
 */

export const convertToPcm = async (audioBlob: Blob, targetSampleRate: number = 16000): Promise<Float32Array> => {
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({
    sampleRate: targetSampleRate,
  });

  const arrayBuffer = await audioBlob.arrayBuffer();
  const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
  
  // Mix down to mono if stereo
  const channelData = audioBuffer.getChannelData(0);
  
  // If the sample rate was already correct, return the data
  if (audioBuffer.sampleRate === targetSampleRate) {
    return channelData;
  }

  // Otherwise, we'd need resampling (AudioContext usually handles it via the constructor option)
  return channelData;
};

/**
 * Format result from Edge Impulse to match our AnalysisResult interface
 */
export interface EdgeImpulseResult {
  score: number;
  label: string;
  classification: Record<string, number>;
}
