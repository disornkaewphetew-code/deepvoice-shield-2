import React, { useState } from 'react';
import { 
  Shield, 
  HelpCircle, 
  ChevronRight, 
  Mic as Microphone, 
  Upload as UploadIcon,
  CheckCircle2,
  AlertTriangle,
  Info,
  ShieldAlert,
  ShieldCheck,
  ChevronLeft,
  RefreshCw,
  Phone,
  Search,
  Lock,
  Clock,
  Heart,
  Cpu,
  Cloud,
  FileCode,
  Award
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { VoiceRecorder } from './components/VoiceRecorder';
import { FileUploader } from './components/FileUploader';
import { ReferencesAndTech } from './components/ReferencesAndTech';
import { eiManager } from './lib/edgeImpulseManager';

interface AnalysisResult {
  score: number;
  status: 'SAFE' | 'WARNING' | 'DANGER';
  isAI: boolean;
  label: string;
  explanation: string;
  confidence: number;
}

type TabType = 'record' | 'upload';
type Language = 'th' | 'en';
type AIMode = 'cloud' | 'local';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('th');
  const [activeTab, setActiveTab] = useState<TabType>('record');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [isEiReady, setIsEiReady] = useState(false);

  // Load Edge Impulse model automatically on mount
  React.useEffect(() => {
    const initEi = async () => {
      try {
        const success = await eiManager.loadModel();
        setIsEiReady(success);
      } catch (err) {
        console.warn("Edge Impulse model not found yet. Upload files to public/ to enable.");
      }
    };
    initEi();
  }, []);

  const t = {
    th: {
      title: "ตรวจสอบเสียงโทรศัพท์",
      subtitle: "ว่าเป็น มิจฉาชีพ หรือ คนจริง",
      tagline: "ระบบตรวจจับเสียง AI สำหรับคนไทย",
      desc: "ใช้งานง่าย ไม่ต้องติดตั้งอะไร ฟรี 100% เหมาะสำหรับทุกวัย ระบบจะแจ้งเตือนทันทีเมื่อตรวจพบเสียง AI",
      checkNow: "ตรวจสอบตอนนี้",
      howTo: "วิธีการใช้งาน",
      privacy: "ไม่เก็บเสียงของคุณ",
      speed: "วิเคราะห์ภายใน 2 วินาที",
      free: "ใช้ได้ฟรีทุกคน",
      selectMethod: "เลือกวิธีตรวจสอบเสียง",
      recordTab: "อัดเสียง",
      recordDesc: "จากภายนอก",
      uploadTab: "อัปโหลดไฟล์",
      uploadDesc: "จากเครื่อง",
      howToTitle: "ใช้งานได้ใน 4 ขั้นตอน",
      steps: [
        { icon: <Phone />, title: "เลือกวิธีป้อนเสียง", desc: "มี 2 แบบให้เลือก: อัปโหลดไฟล์เสียง หรือ อัดเสียงจากภายนอกโทรศัพท์โดยตรง" },
        { icon: <Search />, title: "ระบบวิเคราะห์อัตโนมัติ", desc: "AI สกัด Feature จากคลื่นเสียง แล้วส่งเข้า AI Model ที่เทรนมาโดยเฉพาะ" },
        { icon: <CheckCircle2 />, title: "ดูผลลัพธ์", desc: "ระบบแสดงผล \"เสียงคนจริง\" หรือ \"เสียง AI\" พร้อมระดับความมั่นใจ" },
        { icon: <ShieldAlert />, title: "รับการแจ้งเตือน", desc: "หากพบเสียงสังเคราะห์ ระบบจะแจ้งเตือนทันที และแนะนำขั้นตอนป้องกัน" }
      ],
      resultTitle: "ผลการตรวจสอบ",
      newCheck: "ตรวจสอบใหม่",
      scoreLabel: "ระดับความเสี่ยง",
      confidenceLabel: "ความแม่นยำ AI",
      back: "กลับกระบวนการเดิม"
    },
    en: {
      title: "Voice Analysis Shield",
      subtitle: "Detect Scams vs. Real People",
      tagline: "AI Voice Detection System",
      desc: "Easy to use, no installation required. 100% Free. Suitable for all ages. Instant alerts when AI voices are detected.",
      checkNow: "Check Now",
      howTo: "How to use",
      privacy: "Privacy protected",
      speed: "Fast analysis (<2s)",
      free: "Free for everyone",
      selectMethod: "Select input method",
      recordTab: "Record Audio",
      recordDesc: "From external",
      uploadTab: "Upload File",
      uploadDesc: "From device",
      howToTitle: "How it works in 4 steps",
      steps: [
        { icon: <Phone />, title: "Choose Input", desc: "Select between uploading a file or recording external audio directly." },
        { icon: <Search />, title: "Auto Analysis", desc: "AI extracts features and processes them through our trained model." },
        { icon: <CheckCircle2 />, title: "See Results", desc: "Display \"Real Voice\" or \"AI Voice\" with a confidence score." },
        { icon: <ShieldAlert />, title: "Alerts", desc: "Immediate warnings if synthesis is detected with protection advice." }
      ],
      resultTitle: "Analysis Result",
      newCheck: "New Check",
      scoreLabel: "Risk Level",
      confidenceLabel: "AI Confidence",
      back: "Go Back"
    }
  };

  const handleResult = (res: AnalysisResult) => {
    setResult(res);
    setShowAnalysis(true);
    // Scroll to result top
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const resetAnalysis = () => {
    setResult(null);
    setShowAnalysis(false);
  };

  const scrollToHowTo = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('how-to');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const scrollToReferences = (e: React.MouseEvent) => {
    e.preventDefault();
    if (showAnalysis) {
      setShowAnalysis(false);
    }
    setTimeout(() => {
      const element = document.getElementById('references');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen selection:bg-brand selection:text-black">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 px-6 py-4 flex items-center justify-between glass border-b-0 border-white/5 mt-4 max-w-7xl left-1/2 -translate-x-1/2 rounded-2xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-brand flex items-center justify-center brand-glow">
            <Shield className="text-black w-6 h-6" />
          </div>
          <span className="text-xl font-extrabold tracking-tight">DeepVoice <span className="text-brand">Shield</span></span>
        </div>

        <div className="hidden md:flex items-center gap-6 text-sm font-bold text-white/60">
          <a href="#how-to" onClick={scrollToHowTo} className="hover:text-brand transition-colors">
            {lang === 'th' ? 'วิธีการใช้งาน' : 'How It Works'}
          </a>
          <a href="#references" onClick={scrollToReferences} className="hover:text-amber-300 transition-colors flex items-center gap-1.5 text-amber-400">
            <Award className="w-4 h-4 text-amber-500 animate-pulse" />
            {lang === 'th' ? 'โครงการอ้างอิงและพันธมิตร' : 'References & Track'}
          </a>
        </div>
        
        <div className="flex items-center gap-2 bg-white/5 p-1 rounded-xl border border-white/5">
          <button 
            onClick={() => setLang('th')}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${lang === 'th' ? 'bg-brand text-black shadow-lg' : 'text-white/60 hover:text-white'}`}
          >
            ไทย
          </button>
          <button 
            onClick={() => setLang('en')}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${lang === 'en' ? 'bg-brand text-black shadow-lg' : 'text-white/60 hover:text-white'}`}
          >
            EN
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      {!showAnalysis ? (
        <main className="pt-40 pb-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Text side */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-2 bg-brand/10 border border-brand/20 px-3 py-1 rounded-full mb-8">
                  <div className="w-2 h-2 rounded-full bg-brand animate-pulse" />
                  <span className="text-brand text-xs font-bold tracking-wider uppercase">{t[lang].tagline}</span>
                </div>
                
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] mb-8 tracking-tighter">
                  {t[lang].title} <br />
                  <span className="text-white/80">{t[lang].subtitle}</span>
                </h1>
                
                <p className="text-xl text-white/50 mb-12 max-w-xl leading-relaxed lg:text-2xl font-normal">
                  {t[lang].desc}
                </p>
                
                <div className="flex flex-wrap gap-4 mb-16">
                  <a href="#checker" className="px-8 py-4 bg-brand text-black rounded-2xl font-black text-lg flex items-center gap-3 hover:scale-105 transition-all brand-glow group">
                    <ShieldCheck className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                    {t[lang].checkNow}
                  </a>
                  <a href="#how-to" onClick={scrollToHowTo} className="px-8 py-4 bg-white/5 border border-white/10 rounded-2xl font-bold text-lg flex items-center gap-3 hover:bg-white/10 transition-all">
                    {t[lang].howTo}
                    <ChevronRight className="w-5 h-5 opacity-40" />
                  </a>
                </div>
                
                <div className="flex flex-wrap gap-8">
                  <div className="flex items-center gap-2 text-white/50 text-sm">
                    <Lock className="w-4 h-4 text-brand/60" />
                    {t[lang].privacy}
                  </div>
                  <div className="flex items-center gap-2 text-white/50 text-sm">
                    <Clock className="w-4 h-4 text-brand/60" />
                    {t[lang].speed}
                  </div>
                  <div className="flex items-center gap-2 text-white/50 text-sm">
                    <Heart className="w-4 h-4 text-brand/60" />
                    {t[lang].free}
                  </div>
                </div>
              </motion.div>

              {/* Visual side / Small preview card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative hidden lg:block"
              >
                <div className="absolute -inset-20 bg-brand/10 blur-[100px] rounded-full" />
                <div className="relative rounded-3xl overflow-hidden neo-blur p-8 max-w-md mx-auto transform rotate-2 hover:rotate-0 transition-all duration-500">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-brand" />
                      <span className="text-[10px] text-white/40 uppercase font-mono tracking-widest leading-none">ANALYZING VOICE</span>
                    </div>
                    <span className="text-[10px] text-white/40 font-mono">00:03.2s</span>
                  </div>
                  
                  <div className="h-24 w-full flex items-center justify-center gap-1 mb-8 opacity-40">
                    {[...Array(20)].map((_, i) => (
                      <div key={i} className="w-1 bg-brand rounded-full h-1/2" style={{ height: `${20 + Math.random() * 80}%` }} />
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-danger/10 border border-danger/20 flex flex-col items-center justify-center opacity-50">
                      <AlertTriangle className="text-danger w-6 h-6 mb-2" />
                      <span className="text-xs font-bold text-danger">มิจฉาชีพ</span>
                      <span className="text-[10px] text-danger/60">92%</span>
                    </div>
                    <div className="p-4 rounded-2xl bg-brand/10 border border-brand/20 flex flex-col items-center justify-center">
                      <CheckCircle2 className="text-brand w-6 h-6 mb-2" />
                      <span className="text-xs font-bold text-brand">คนจริง</span>
                      <span className="text-[10px] text-brand/60">8%</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </main>
      ) : null}

      {/* Main Checker / Results */}
      <section id="checker" className={`${showAnalysis ? 'pt-40' : 'py-32'} px-6 bg-white/[0.02]`}>
        <div className="max-w-4xl mx-auto">
          {!showAnalysis ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="neo-blur rounded-3xl p-8 md:p-12"
            >
              <div className="flex flex-col items-center text-center mb-12">
                <div className="inline-flex items-center gap-2 bg-brand/10 px-4 py-1 rounded-full text-brand text-xs font-bold mb-4">
                  เครื่องมือตรวจสอบ
                </div>
                <h2 className="text-3xl md:text-5xl font-black mb-4">{t[lang].selectMethod}</h2>
              </div>

              {/* Tabs */}
              <div className="flex bg-black/40 p-2 rounded-2xl mb-12 border border-white/5">
                <button 
                  onClick={() => setActiveTab('record')}
                  className={`flex-1 flex flex-col items-center py-4 rounded-xl transition-all ${activeTab === 'record' ? 'bg-white/10 text-brand shadow-xl' : 'text-white/40 hover:text-white/60'}`}
                >
                  <Microphone className="w-6 h-6 mb-1" />
                  <span className="text-sm font-bold">{t[lang].recordTab}</span>
                  <span className="text-[10px] opacity-60 uppercase tracking-wider">{t[lang].recordDesc}</span>
                </button>
                <button 
                  onClick={() => setActiveTab('upload')}
                  className={`flex-1 flex flex-col items-center py-4 rounded-xl transition-all ${activeTab === 'upload' ? 'bg-white/10 text-brand shadow-xl' : 'text-white/40 hover:text-white/60'}`}
                >
                  <UploadIcon className="w-6 h-6 mb-1" />
                  <span className="text-sm font-bold">{t[lang].uploadTab}</span>
                  <span className="text-[10px] opacity-60 uppercase tracking-wider">{t[lang].uploadDesc}</span>
                </button>
              </div>

              {/* Input Component */}
              <div className="min-h-[300px] flex items-center justify-center">
                <AnimatePresence mode="wait">
                  {activeTab === 'record' ? (
                    <motion.div 
                      key="record"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="w-full"
                    >
                      <VoiceRecorder 
                        onAnalysisResult={handleResult} 
                        lang={lang} 
                        useLocalAI={isEiReady}
                      />
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="upload"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="w-full"
                    >
                      <FileUploader 
                        onAnalysisResult={handleResult} 
                        lang={lang}
                        useLocalAI={isEiReady}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ) : (
            /* Analysis Result View */
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8 pb-32"
            >
              <div className="flex items-center gap-4 mb-4">
                <button 
                  onClick={resetAnalysis}
                  className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <h2 className="text-3xl font-black">{t[lang].resultTitle}</h2>
              </div>

              {/* High Contrast Result Banner */}
              <div className={`rounded-3xl p-8 md:p-12 border flex flex-col items-center text-center transition-all ${
                result?.status === 'SAFE' 
                  ? 'bg-brand/10 border-brand/40 brand-glow' 
                  : 'bg-danger/10 border-danger/40 danger-glow'
              }`}>
                <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-8 ${
                  result?.status === 'SAFE' ? 'bg-brand text-black' : 'bg-danger text-white'
                }`}>
                  {result?.status === 'SAFE' ? <ShieldCheck className="w-12 h-12" /> : <ShieldAlert className="w-12 h-12" />}
                </div>
                
                <h3 className={`text-5xl md:text-7xl font-black mb-6 tracking-tighter ${
                  result?.status === 'SAFE' ? 'text-brand' : 'text-danger'
                }`}>
                  {result?.label}
                </h3>
                
                <p className="text-2xl md:text-3xl font-medium text-white max-w-3xl leading-snug tracking-tight">
                  {result?.explanation}
                </p>
                
                <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
                  <div className="bg-white/[0.03] border border-white/5 rounded-3xl p-8 backdrop-blur-sm">
                    <p className="text-white/40 text-sm font-bold uppercase tracking-widest mb-4">{t[lang].scoreLabel}</p>
                    <p className={`text-5xl md:text-6xl font-black tracking-tighter ${
                      result?.score > 60 ? 'text-danger' : 'text-brand'
                    }`}>{result?.score}%</p>
                  </div>
                  <div className="bg-white/[0.03] border border-white/5 rounded-3xl p-8 backdrop-blur-sm">
                    <p className="text-white/40 text-sm font-bold uppercase tracking-widest mb-4">{t[lang].confidenceLabel}</p>
                    <p className="text-5xl md:text-6xl font-black tracking-tighter text-white">
                      {Math.round((result?.confidence || 0) * 100)}%
                    </p>
                  </div>
                </div>

                <button 
                  onClick={resetAnalysis}
                  className="mt-12 flex items-center gap-3 text-white/60 hover:text-white transition-all font-bold group"
                >
                  <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                  {t[lang].newCheck}
                </button>
              </div>

              {/* Security Advisory */}
              <div className="neo-blur rounded-3xl p-8 border border-white/5">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400">
                    <Info className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-bold">ข้อแนะนำเพื่อความปลอดภัย</h4>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <p className="text-sm font-bold text-white/80">1. ตั้งสติ</p>
                    <p className="text-sm text-white/40">มิจฉาชีพมักสร้างความกดดันหรือทำให้ตกใจ</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-bold text-white/80">2. อย่าโอนเงิน</p>
                    <p className="text-sm text-white/40">หน่วยงานรัฐไม่มีนโยบายให้โอนเงินผ่านโทรศัพท์</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-bold text-white/80">3. วางสายและตรวจสอบ</p>
                    <p className="text-sm text-white/40">ติดต่อหน่วยงานต้นสังกัดด้วยเบอร์ทางการ</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Steps Section */}
      {!showAnalysis && (
        <section id="how-to" className="py-32 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-24">
              <div className="inline-flex bg-brand/10 border border-brand/20 px-4 py-1 rounded-full text-brand text-xs font-bold mb-6 tracking-widest uppercase">
                {t[lang].howTo}
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter mb-4">
                {t[lang].howToTitle}
              </h2>
            </div>
            
            <div className="space-y-12 relative">
              <div className="absolute left-8 top-12 bottom-12 w-px bg-white/5 hidden md:block" />
              {t[lang].steps.map((step, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className="flex flex-col md:flex-row gap-8 items-start md:items-center relative group"
                >
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-3xl bg-white/[0.03] border border-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-brand group-hover:text-black transition-all duration-500 relative z-10 shadow-2xl">
                    {React.cloneElement(step.icon as React.ReactElement, { className: 'w-8 h-8 md:w-10 md:h-10' })}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-2xl md:text-3xl font-bold mb-3 tracking-tight group-hover:text-brand transition-colors duration-300">
                      {step.title}
                    </h4>
                    <p className="text-white/40 text-lg md:text-xl leading-relaxed max-w-2xl font-light">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* References Section */}
      <ReferencesAndTech lang={lang} />

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-white/5 mt-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-brand flex items-center justify-center">
                <Shield className="text-black w-5 h-5" />
              </div>
              <span className="text-lg font-bold">DeepVoice <span className="text-brand">Shield</span></span>
            </div>
            <p className="text-white/40 text-sm max-w-xs text-center md:text-left">
              ปกป้องคนไทยจากมิจฉาชีพเสียง AI เสียงของคุณไม่ถูกเก็บหรือส่งไปที่ใด
            </p>
          </div>
          
          <div className="flex items-center gap-8">
            <a href="#" className="text-white/40 hover:text-white transition-colors"><Shield className="w-6 h-6" /></a>
            <a href="#how-to" onClick={scrollToHowTo} className="text-white/40 hover:text-white transition-colors"><HelpCircle className="w-6 h-6" /></a>
            <a href="#references" onClick={scrollToReferences} className="text-white/40 hover:text-white transition-colors"><Award className="w-6 h-6" /></a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
