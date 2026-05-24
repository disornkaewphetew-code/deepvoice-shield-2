import React, { useState } from 'react';
import { Upload, FileAudio, Loader2, AlertCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { eiManager } from '../lib/edgeImpulseManager';

interface FileUploaderProps {
  onAnalysisResult: (result: any) => void;
  lang: 'th' | 'en';
  useLocalAI?: boolean;
}

export const FileUploader: React.FC<FileUploaderProps> = ({ onAnalysisResult, lang, useLocalAI }) => {
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type.startsWith('audio/')) {
        setFile(selectedFile);
        setError(null);
      } else {
        setError(lang === 'th' ? 'กรุณาอัปโหลดไฟล์เสียงเท่านั้น' : 'Please upload an audio file only');
      }
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      if (droppedFile.type.startsWith('audio/')) {
        setFile(droppedFile);
        setError(null);
      } else {
        setError(lang === 'th' ? 'กรุณาอัปโหลดไฟล์เสียงเท่านั้น' : 'Please upload an audio file only');
      }
    }
  };

  const analyzeFile = async () => {
    if (!file) return;
    setIsAnalyzing(true);
    setError(null);

    try {
      if (useLocalAI) {
        const localResult = await eiManager.classify(file);
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
            ? (lang === 'th' ? 'ผลลัพธ์จากไฟล์ที่อัปโหลดตรงกับลักษณะ AI Voice' : 'Uploaded file matches AI Voice characteristics.')
            : (lang === 'th' ? 'ผลลัพธ์จากไฟล์ที่อัปโหลดดูเป็นธรรมชาติ' : 'Uploaded file matches natural voice characteristics.'),
          confidence: Math.round(topResult.value * 100)
        });
        setIsAnalyzing(false);
      } else {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = async () => {
          const base64data = reader.result?.toString().split(',')[1];
          
          const response = await fetch('/api/analyze-voice', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
              audioData: base64data,
              mimeType: file.type
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

  const removeFile = () => {
    setFile(null);
    setError(null);
  };

  return (
    <div className="w-full">
      {!file ? (
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          className="max-w-md mx-auto aspect-video rounded-2xl border-2 border-dashed border-white/20 flex flex-col items-center justify-center p-8 transition-all hover:border-brand/40 hover:bg-brand/5 group cursor-pointer relative overflow-hidden"
        >
          <input
            type="file"
            accept="audio/*"
            onChange={handleFileChange}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
          <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Upload className="w-8 h-8 text-white/50" />
          </div>
          <p className="text-white/80 font-medium mb-1">
            {lang === 'th' ? 'คลิกเพื่ออัปโหลดไฟล์เสียง' : 'Click to upload audio file'}
          </p>
          <p className="text-white/40 text-sm">
            {lang === 'th' ? 'หรือลากไฟล์มาวางที่นี่' : 'or drag and drop here'}
          </p>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md mx-auto rounded-2xl bg-white/5 border border-white/10 p-6 flex flex-col items-center"
        >
          <div className="w-full flex items-start gap-4 mb-8">
            <div className="w-12 h-12 rounded-xl bg-brand/20 flex items-center justify-center flex-shrink-0">
              <FileAudio className="w-6 h-6 text-brand" />
            </div>
            <div className="flex-1 min-w-0 pr-8 relative">
              <p className="text-white font-medium truncate">{file.name}</p>
              <p className="text-white/40 text-xs">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              <button 
                onClick={removeFile}
                className="absolute top-0 right-0 p-1 hover:bg-white/10 rounded-full transition-colors text-white/40 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <button
            onClick={analyzeFile}
            disabled={isAnalyzing}
            className="w-full h-12 rounded-xl bg-brand brand-glow text-black font-bold flex items-center justify-center gap-2 hover:bg-brand/90 transition-all disabled:opacity-50"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                {lang === 'th' ? 'กำลังวิเคราะห์...' : 'Analyzing...'}
              </>
            ) : (
              lang === 'th' ? 'เริ่มตรวจสอบทันที' : 'Start Detection'
            )}
          </button>
        </motion.div>
      )}

      {error && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 flex items-center gap-2 text-red-400 bg-red-400/10 px-4 py-2 rounded-lg border border-red-400/20 max-w-md mx-auto"
        >
          <AlertCircle className="w-4 h-4" />
          <span className="text-sm font-medium">{error}</span>
        </motion.div>
      )}
    </div>
  );
};
