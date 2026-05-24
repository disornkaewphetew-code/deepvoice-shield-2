import React, { useState, useRef } from 'react';
import { Mic, Square, Loader2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { eiManager } from '../lib/edgeImpulseManager';

interface VoiceRecorderProps {
  onAnalysisResult: (result: any) => void;
  lang: 'th' | 'en';
  useLocalAI?: boolean;
}

export const VoiceRecorder: React.FC<VoiceRecorderProps> = ({ onAnalysisResult, lang, useLocalAI }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [timer, setTimer] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerIntervalRef = useRef<number | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' });
        await analyzeAudio(audioBlob);
      };

      mediaRecorder.start();
      setIsRecording(true);
      setError(null);
      setTimer(0);
      timerIntervalRef.current = window.setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    } catch (err) {
      console.error("Error accessing microphone:", err);
      setError(lang === 'th' ? 'ไม่สามารถเข้าถึงไมโครโฟนได้' : 'Could not access microphone');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      
      // Stop all tracks
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
  };

  const analyzeAudio = async (blob: Blob) => {
    setIsAnalyzing(true);
    try {
      if (useLocalAI) {
        // --- EDGE IMPULSE LOCAL INFERENCE ---
        const localResult = await eiManager.classify(blob);
        
        // Map Edge Impulse result (classifications) to our UI format
        // We look for the class with the highest score
        const topResult = localResult.results.reduce((prev: any, current: any) => 
          (prev.value > current.value) ? prev : current
        );

        const isAI = topResult.label.toLowerCase().includes('ai') || topResult.label.toLowerCase().includes('scam');
        
        onAnalysisResult({
          score: Math.round(topResult.value * 100),
          status: isAI ? 'DANGER' : 'SAFE',
          isAI: isAI,
          label: isAI ? (lang === 'th' ? 'มิจฉาชีพ/AI' : 'AI Voice/Scam') : (lang === 'th' ? 'เสียงคนจริง' : 'Real Person'),
          explanation: isAI 
            ? (lang === 'th' ? 'ตรวจพบรูปแบบเสียงสังเคราะห์จากฐานข้อมูลในเครื่อง' : 'Synthetic patterns detected via local model.')
            : (lang === 'th' ? 'เสียงมีลักษณะเป็นธรรมชาติและตรงกับฐานข้อมูลคนจริง' : 'Voice patterns match human characteristics.'),
          confidence: Math.round(topResult.value * 100)
        });
        setIsAnalyzing(false);
      } else {
        // --- CLOUD ANALYSIS (GEMINI) ---
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = async () => {
          const base64data = reader.result?.toString().split(',')[1];
          
          const response = await fetch('/api/analyze-voice', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
              audioData: base64data,
              mimeType: 'audio/webm'
            }),
          });
          
          const result = await response.json();
          if (!response.ok) {
            throw new Error(result.message || 'Analysis failed');
          }
          
          onAnalysisResult(result);
          setIsAnalyzing(false);
        };
      }
    } catch (err: any) {
      console.error("Analysis failed:", err);
      setError(err.message || (lang === 'th' ? 'เกิดข้อผิดพลาดในการวิเคราะห์' : 'Analysis failed'));
      setIsAnalyzing(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center">
      <div className="mb-8 relative">
        <AnimatePresence>
          {isRecording && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute inset-0 bg-brand rounded-full blur-2xl"
            />
          )}
        </AnimatePresence>
        
        <button
          onClick={isRecording ? stopRecording : startRecording}
          disabled={isAnalyzing}
          className={`relative z-10 w-24 h-24 rounded-full flex items-center justify-center transition-all ${
            isRecording 
              ? 'bg-red-500 hover:bg-red-600 scale-110' 
              : 'bg-brand hover:bg-brand/90 brand-glow text-black'
          } disabled:opacity-50`}
        >
          {isAnalyzing ? (
            <Loader2 className="w-10 h-10 animate-spin" />
          ) : isRecording ? (
            <Square className="w-10 h-10 fill-current" />
          ) : (
            <Mic className="w-10 h-10" />
          )}
        </button>
      </div>

      <div className="text-center">
        {isRecording ? (
          <div className="space-y-2">
            <p className="text-2xl font-mono text-brand">{formatTime(timer)}</p>
            <p className="text-white/60 animate-pulse">
              {lang === 'th' ? 'กำลังบันทึกเสียง...' : 'Recording...'}
            </p>
          </div>
        ) : isAnalyzing ? (
          <p className="text-white/60">
            {lang === 'th' ? 'กำลังวิเคราะห์ด้วย AI...' : 'Analyzing with AI...'}
          </p>
        ) : (
          <p className="text-white/80 text-lg font-medium">
            {lang === 'th' ? 'กดเพื่อเริ่มอัดเสียง' : 'Click to start recording'}
          </p>
        )}
      </div>

      {error && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 flex items-center gap-2 text-red-400 bg-red-400/10 px-4 py-2 rounded-lg border border-red-400/20"
        >
          <AlertCircle className="w-4 h-4" />
          <span className="text-sm font-medium">{error}</span>
        </motion.div>
      )}

      {isRecording && (
        <div className="mt-8 flex gap-1 items-end h-8">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ height: [8, Math.random() * 24 + 8, 8] }}
              transition={{ repeat: Infinity, duration: 0.5, delay: i * 0.05 }}
              className="w-1 bg-brand rounded-full"
            />
          ))}
        </div>
      )}
    </div>
  );
};
