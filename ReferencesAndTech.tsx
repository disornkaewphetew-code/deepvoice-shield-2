import React from 'react';
import { motion } from 'motion/react';
import { Cpu, Globe, Award, ShieldCheck, HeartHandshake, Beaker } from 'lucide-react';

interface ReferencesAndTechProps {
  lang: 'th' | 'en';
}

export const ReferencesAndTech: React.FC<ReferencesAndTechProps> = ({ lang }) => {
  const content = {
    th: {
      sectionTitle: "โครงการอ้างอิง & พันธมิตรเทคโนโลยี",
      sectionSubtitle: "พัฒนาขึ้นภายใต้การสนับสนุนและองค์ความรู้จากสถาบันชั้นนำ",
      competitionTitle: "การประกวดแข่งขัน: OBEC SPARK AI",
      competitionOrg: "สำนักงานคณะกรรมการการศึกษาขั้นพื้นฐาน (สพฐ.) กระทรวงศึกษาธิการ",
      competitionDesc: "ผลงานนี้นำเสนอและส่งเข้าประกวดในโครงการ OBEC SPARK AI เพื่อพัฒนานวัตกรรมปัญญาประดิษฐ์เพื่อช่วยยกระดับความปลอดภัยและแก้ปัญหาสังคม (การเตือนภัยแก๊งคอลเซ็นเตอร์ในประเทศไทย)",
      techPartnersTitle: "เทคโนโลยีและพันธมิตรผู้ร่วมสนับสนุนด้านองค์ความรู้",
      pioneers: [
        {
          id: "obec",
          name: "สพฐ. (OBEC)",
          type: "ความร่วมมือ & ผู้จัดโครงการหลัก",
          desc: "สำนักงานคณะกรรมการการศึกษาขั้นพื้นฐาน สนับสนุนจินตนาการและการรังสรรค์ของนักเรียนไทย สู่การนำ AI มาต่อยอดเป็นประโยชน์ต่อประชาชน",
          badgeColor: "bg-amber-500/10 border-amber-500/35 text-amber-300",
          customLogo: (
            <svg viewBox="0 0 100 100" className="w-16 h-16 filter drop-shadow-[0_0_8px_rgba(245,158,11,0.3)]">
              {/* Symmetrical golden-red traditional Thai flame-inspired emblem */}
              <circle cx="50" cy="50" r="45" fill="rgba(245, 158, 11, 0.05)" stroke="currentColor" strokeWidth="1.5" className="text-amber-500/30" />
              <path d="M50 15 C55 25, 62 25, 62 35 C62 48, 50 42, 50 55 C50 42, 38 48, 38 35 C38 25, 45 25, 50 15 Z" fill="url(#obec-grad)" />
              <path d="M50 30 C53 38, 58 38, 58 45 C58 52, 50 48, 50 63 C50 48, 42 52, 42 45 C42 38, 47 38, 50 30 Z" fill="url(#obec-inner-grad)" />
              <circle cx="50" cy="70" r="8" fill="#F59E0B" className="animate-pulse" />
              <defs>
                <linearGradient id="obec-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#EF4444" />
                  <stop offset="50%" stopColor="#F59E0B" />
                  <stop offset="100%" stopColor="#EF4444" />
                </linearGradient>
                <linearGradient id="obec-inner-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FBBF24" />
                  <stop offset="100%" stopColor="#EF4444" />
                </linearGradient>
              </defs>
            </svg>
          )
        },
        {
          id: "uvoice",
          name: "UVoice AI Platform",
          type: "สถาปัตยกรรมระบบ & ชื่อเสียงความร่วมมือ",
          desc: "สัญญะของโครงการเสียงที่เป็นมิตรและเชื่อมต่อกับผู้ใช้ ด้วยระบบความปลอดภัยแบบผสมผสานในการจำแนกความเสี่ยงทางโทรศัพท์เพื่อปกป้องประชาชน",
          badgeColor: "bg-[#00D1E1]/10 border-[#00D1E1]/35 text-[#00D1E1]",
          customLogo: (
            <svg viewBox="0 0 100 100" className="w-16 h-16 filter drop-shadow-[0_0_8px_rgba(0,209,225,0.4)]">
              {/* UVoice AI soundwaves, mic and stars */}
              <circle cx="50" cy="50" r="45" fill="#0A1E24" stroke="#00D1E1" strokeWidth="2" />
              {/* Starry dots */}
              <circle cx="28" cy="28" r="2" fill="#fff" />
              <circle cx="34" cy="20" r="1.5" fill="#fff" />
              <circle cx="68" cy="28" r="2" fill="#fff" />
              <circle cx="60" cy="18" r="1.5" fill="#fff" style={{ opacity: 0.7 }} />
              {/* Microphone graphic */}
              <rect x="42" y="30" width="16" height="25" rx="8" fill="#fff" />
              <path d="M35 42 A15 15 0 0 0 65 42" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" />
              <line x1="50" y1="57" x2="50" y2="65" stroke="#fff" strokeWidth="3" />
              {/* Cyan sound waves at the bottom */}
              <path d="M22 68 C35 60, 35 76, 50 68 C65 60, 65 76, 78 68" stroke="#00D1E1" strokeWidth="2.5" fill="none" strokeLinecap="round" className="animate-pulse" />
              <path d="M25 76 C35 70, 35 82, 50 76 C65 70, 65 82, 75 76" stroke="#00A2B1" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            </svg>
          )
        },
        {
          id: "edge-impulse",
          name: "Edge Impulse Runtime",
          type: "ปัญญาประดิษฐ์ในเครื่อง (Edge TinyML)",
          desc: "แพลตฟอร์มพรีเมียร์ระดับโลกเพื่อเทรนโมเดล เรียนรู้สกัดเชิงคุณลักษณะแบบ Real-time บนเบราว์เซอร์ผ่าน WASM ตรวจจับรูปแบบคลื่นเสียงโดยไม่ต้องต่อเน็ต",
          badgeColor: "bg-lime-500/10 border-lime-500/35 text-lime-300",
          customLogo: (
            <svg viewBox="0 0 100 100" className="w-16 h-16 filter drop-shadow-[0_0_8px_rgba(163,230,53,0.3)]">
              {/* Edge Impulse Logo Precise Match */}
              <rect x="0" y="0" width="100" height="100" rx="16" fill="#fff" />
              <g transform="translate(10, 10) scale(0.8)">
                {/* Blue Top Line with Node */}
                <path d="M15 25 L85 25" stroke="#00B1E1" strokeWidth="11" strokeLinecap="round" />
                <circle cx="15" cy="25" r="10" fill="#00B1E1" />
                
                {/* Green Mid-Left and Yellow Mid-Right */}
                <path d="M15 50 L53 50" stroke="#7ACC29" strokeWidth="11" strokeLinecap="round" />
                <circle cx="15" cy="50" r="10" fill="#7ACC29" />
                
                <path d="M68 50 L85 50" stroke="#FAB105" strokeWidth="11" strokeLinecap="round" />
                
                {/* Red orange Bottom Line with Node */}
                <path d="M15 75 L85 75" stroke="#FF4D4D" strokeWidth="11" strokeLinecap="round" />
                <circle cx="15" cy="75" r="10" fill="#FF4D4D" />
              </g>
            </svg>
          )
        },
        {
          id: "gemini",
          name: "Gemini / Google AI Studio",
          type: "ความก้าวหน้าโครงข่ายวิเคราะห์เชิงลึกกึ่งโครงสร้าง (Cloud LLM/VLM)",
          desc: "สมองวิเคราะห์เบื้องลึกผ่านโมเดล Gemini ในการวิเคราะห์เจตนา คำพูดสำนวน สแกมเมอร์ น้ำเสียง และนิติกรรมภาษาไทยได้อย่างมีความยืดหยุ่นสูง",
          badgeColor: "bg-blue-500/10 border-blue-500/35 text-blue-300",
          customLogo: (
            <svg viewBox="0 0 100 100" className="w-16 h-16 filter drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]">
              {/* Google Gemini Radiant blue/purple gradient sparkle */}
              <circle cx="50" cy="50" r="45" fill="rgba(30, 41, 59, 0.4)" stroke="currentColor" strokeWidth="1.5" className="text-blue-500/20" />
              <path d="M50 15 C50 34.33, 34.33 50, 15 50 C34.33 50, 50 65.67, 50 85 C50 65.67, 65.67 50, 85 50 C65.67 50, 50 34.33, 50 15 Z" fill="url(#gemini-spark)" />
              <circle cx="70" cy="30" r="4" fill="#60A5FA" className="animate-pulse" />
              <circle cx="30" cy="70" r="3" fill="#A78BFA" />
              <defs>
                <linearGradient id="gemini-spark" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#93C5FD" />
                  <stop offset="30%" stopColor="#3B82F6" />
                  <stop offset="70%" stopColor="#8B5CF6" />
                  <stop offset="100%" stopColor="#EC4899" />
                </linearGradient>
              </defs>
            </svg>
          )
        },
        {
          id: "iapp",
          name: "iApp Technology",
          type: "ผู้นำองค์ความรู้เสียงและภาษา AI ไทย (Pioneer Inspiration)",
          desc: "องค์ความรู้ คลังต้นฉบับงานวิจัย API ด้านภาษาไทย (Thai Speech/NLP) ที่บุกเบิกและเป็นแนวทางจุดประกายในการสร้างชุดข้อมูลและการสกัดเสียงมิจฉาชีพ",
          badgeColor: "bg-indigo-500/10 border-indigo-500/35 text-indigo-300",
          customLogo: (
            <svg viewBox="0 0 190 70" className="w-24 h-12 filter drop-shadow-[0_0_6px_rgba(79,70,229,0.3)]">
              {/* iApp Technology exact visual layout reconstruction */}
              <rect width="190" height="70" rx="10" fill="#fff" />
              <g transform="translate(10, 15)">
                {/* Letter i */}
                <circle cx="10" cy="15" r="4" fill="#FF0000" />
                <rect x="7" y="23" width="6" height="20" rx="2" fill="#0080FF" />
                
                {/* Letter A with cute robot face */}
                <rect x="23" y="15" width="22" height="30" rx="10" fill="#0080FF" />
                {/* White face inside letter A */}
                <rect x="28" y="20" width="12" height="15" rx="5" fill="#fff" />
                {/* Eye dots */}
                <circle cx="32" cy="27" r="1.5" fill="#0080FF" />
                <circle cx="36" cy="27" r="1.5" fill="#0080FF" />
                
                {/* Letter p 1 */}
                <rect x="52" y="15" width="16" height="30" rx="8" fill="#0080FF" />
                <circle cx="60" cy="25" r="5" fill="#fff" />
                
                {/* Letter p 2 */}
                <rect x="74" y="15" width="16" height="30" rx="8" fill="#0080FF" />
                <circle cx="82" cy="25" r="5" fill="#fff" />
                
                {/* Technology Text */}
                <text x="96" y="32" fill="#312E81" fontSize="12" fontWeight="900" fontFamily="sans-serif">iApp</text>
                <text x="96" y="44" fill="#6B7280" fontSize="8" fontWeight="bold" fontFamily="sans-serif">Technology</text>
              </g>
            </svg>
          )
        },
        {
          id: "moe",
          name: "กระทรวงศึกษาธิการ (ศธ.)",
          type: "ความก้าวหน้าวิสัยทัศน์ส่งเสริมการเรียนรู้ AI",
          desc: "ร่วมขับเคลื่อนและส่งเสริมเยาวชนไทยศึกษาลึกและวางรากฐานนวัตกรรมความมั่นคงทางไซเบอร์ เพื่อคนในครอบครัวและโรงเรียนปลอดภัย",
          badgeColor: "bg-rose-500/10 border-rose-500/35 text-rose-300",
          customLogo: (
            <svg viewBox="0 0 100 100" className="w-16 h-16 filter drop-shadow-[0_0_8px_rgba(244,63,94,0.3)]">
              {/* Ministery seal design */}
              <circle cx="50" cy="50" r="45" fill="rgba(244, 63, 94, 0.05)" stroke="currentColor" strokeWidth="1.5" className="text-rose-500/30" />
              {/* Crown representation */}
              <path d="M50 15 L62 42 L38 42 Z" fill="#F43F5E" />
              {/* Traditional wheel structure */}
              <circle cx="50" cy="55" r="18" stroke="#F43F5E" strokeWidth="4" fill="none" />
              <circle cx="50" cy="55" r="10" stroke="#FDA4AF" strokeWidth="2" fill="none" />
              {/* Spokes */}
              {Array.from({ length: 8 }).map((_, i) => (
                <line 
                  key={i}
                  x1="50" 
                  y1="55" 
                  x2={50 + 18 * Math.cos((i * Math.PI) / 4)} 
                  y2={55 + 18 * Math.sin((i * Math.PI) / 4)} 
                  stroke="#F43F5E" 
                  strokeWidth="3.5" 
                />
              ))}
            </svg>
          )
        }
      ]
    },
    en: {
      sectionTitle: "Project References & Tech Partners",
      sectionSubtitle: "Built with backing, insights, and frameworks from leading platforms",
      competitionTitle: "Competition Track: OBEC SPARK AI",
      competitionOrg: "Office of the Basic Education Commission (OBEC), Ministry of Education, Thailand",
      competitionDesc: "This project is constructed as a submission to the OBEC SPARK AI innovation contest, geared towards harnessing state-of-the-art AI mechanisms to tackle societal concerns (such as Thai telecom scams).",
      techPartnersTitle: "Supporting Technologies & Pioneering Reference Mentions",
      pioneers: [
        {
          id: "obec",
          name: "OBEC (สพฐ.)",
          type: "Host and Regulatory Supporter",
          desc: "The Office of the Basic Education Commission underpins Thai youth creativity, translating AI structures into direct public-safety products.",
          badgeColor: "bg-amber-500/10 border-amber-500/35 text-amber-300",
          customLogo: (
            <svg viewBox="0 0 100 100" className="w-16 h-16 filter drop-shadow-[0_0_8px_rgba(245,158,11,0.3)]">
              <circle cx="50" cy="50" r="45" fill="rgba(245, 158, 11, 0.05)" stroke="currentColor" strokeWidth="1.5" className="text-amber-500/30" />
              <path d="M50 15 C55 25, 62 25, 62 35 C62 48, 50 42, 50 55 C50 42, 38 48, 38 35 C38 25, 45 25, 50 15 Z" fill="url(#obec-grad-en)" />
              <path d="M50 30 C53 38, 58 38, 58 45 C58 52, 50 48, 50 63 C50 48, 42 52, 42 45 C42 38, 47 38, 50 30 Z" fill="url(#obec-inner-grad-en)" />
              <circle cx="50" cy="70" r="8" fill="#F59E0B" />
              <defs>
                <linearGradient id="obec-grad-en" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#EF4444" />
                  <stop offset="50%" stopColor="#F59E0B" />
                  <stop offset="100%" stopColor="#EF4444" />
                </linearGradient>
                <linearGradient id="obec-inner-grad-en" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FBBF24" />
                  <stop offset="100%" stopColor="#EF4444" />
                </linearGradient>
              </defs>
            </svg>
          )
        },
        {
          id: "uvoice",
          name: "UVoice AI Platform",
          type: "System Architecture Name Inspiration",
          desc: "Signifies student and friendly public audio security frameworks. Amalgamates Local and Cloud ML models to prevent vulnerability.",
          badgeColor: "bg-[#00D1E1]/10 border-[#00D1E1]/35 text-[#00D1E1]",
          customLogo: (
            <svg viewBox="0 0 100 100" className="w-16 h-16 filter drop-shadow-[0_0_8px_rgba(0,209,225,0.4)]">
              <circle cx="50" cy="50" r="45" fill="#0A1E24" stroke="#00D1E1" strokeWidth="2" />
              <circle cx="28" cy="28" r="2" fill="#fff" />
              <circle cx="34" cy="20" r="1.5" fill="#fff" />
              <circle cx="68" cy="28" r="2" fill="#fff" />
              <circle cx="60" cy="18" r="1.5" fill="#fff" style={{ opacity: 0.7 }} />
              <rect x="42" y="30" width="16" height="25" rx="8" fill="#fff" />
              <path d="M35 42 A15 15 0 0 0 65 42" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" />
              <line x1="50" y1="57" x2="50" y2="65" stroke="#fff" strokeWidth="3" />
              <path d="M22 68 C35 60, 35 76, 50 68 C65 60, 65 76, 78 68" stroke="#00D1E1" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              <path d="M25 76 C35 70, 35 82, 50 76 C65 70, 65 82, 75 76" stroke="#00A2B1" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            </svg>
          )
        },
        {
          id: "edge-impulse",
          name: "Edge Impulse Runtime",
          type: "Local TinyML Processing",
          desc: "A premier platform which powers offline WebAssembly classifiers (.wasm) right in the client, enabling features extraction, noise immunity, and fast triggers.",
          badgeColor: "bg-lime-500/10 border-lime-500/35 text-lime-300",
          customLogo: (
            <svg viewBox="0 0 100 100" className="w-16 h-16 filter drop-shadow-[0_0_8px_rgba(163,230,53,0.3)]">
              <rect x="0" y="0" width="100" height="100" rx="16" fill="#fff" />
              <g transform="translate(10, 10) scale(0.8)">
                <path d="M15 25 L85 25" stroke="#00B1E1" strokeWidth="11" strokeLinecap="round" />
                <circle cx="15" cy="25" r="10" fill="#00B1E1" />
                <path d="M15 50 L53 50" stroke="#7ACC29" strokeWidth="11" strokeLinecap="round" />
                <circle cx="15" cy="50" r="10" fill="#7ACC29" />
                <path d="M68 50 L85 50" stroke="#FAB105" strokeWidth="11" strokeLinecap="round" />
                <path d="M15 75 L85 75" stroke="#FF4D4D" strokeWidth="11" strokeLinecap="round" />
                <circle cx="15" cy="75" r="10" fill="#FF4D4D" />
              </g>
            </svg>
          )
        },
        {
          id: "gemini",
          name: "Gemini / Google AI Studio",
          type: "Advanced Cloud-Based Analysis",
          desc: "Drives context-heavy call center scam detection with high-accuracy phonetic, dialectal, lexical, and intentional parsing of Thai audio.",
          badgeColor: "bg-blue-500/10 border-blue-500/35 text-blue-300",
          customLogo: (
            <svg viewBox="0 0 100 100" className="w-16 h-16 filter drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]">
              <circle cx="50" cy="50" r="45" fill="rgba(30, 41, 59, 0.4)" stroke="currentColor" strokeWidth="1.5" className="text-blue-500/20" />
              <path d="M50 15 C50 34.33, 34.33 50, 15 50 C34.33 50, 50 65.67, 50 85 C50 65.67, 65.67 50, 85 50 C65.67 50, 50 34.33, 50 15 Z" fill="url(#gemini-spark-en)" />
              <circle cx="70" cy="30" r="4" fill="#60A5FA" />
              <circle cx="30" cy="70" r="3" fill="#A78BFA" />
              <defs>
                <linearGradient id="gemini-spark-en" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#93C5FD" />
                  <stop offset="30%" stopColor="#3B82F6" />
                  <stop offset="70%" stopColor="#8B5CF6" />
                  <stop offset="100%" stopColor="#EC4899" />
                </linearGradient>
              </defs>
            </svg>
          )
        },
        {
          id: "iapp",
          name: "iApp Technology",
          type: "Pioneer of Thai AI Speech & NLP",
          desc: "Acts as a powerful academic inspiration with pioneering models in transcription, TTS, translation, and dataset representations for Thai audio analysis.",
          badgeColor: "bg-indigo-500/10 border-indigo-500/35 text-indigo-300",
          customLogo: (
            <svg viewBox="0 0 190 70" className="w-24 h-12 filter drop-shadow-[0_0_6px_rgba(79,70,229,0.3)]">
              <rect width="190" height="70" rx="10" fill="#fff" />
              <g transform="translate(10, 15)">
                <circle cx="10" cy="15" r="4" fill="#FF0000" />
                <rect x="7" y="23" width="6" height="20" rx="2" fill="#0080FF" />
                <rect x="23" y="15" width="22" height="30" rx="10" fill="#0080FF" />
                <rect x="28" y="20" width="12" height="15" rx="5" fill="#fff" />
                <circle cx="32" cy="27" r="1.5" fill="#0080FF" />
                <circle cx="36" cy="27" r="1.5" fill="#0080FF" />
                <rect x="52" y="15" width="16" height="30" rx="8" fill="#0080FF" />
                <circle cx="60" cy="25" r="5" fill="#fff" />
                <rect x="74" y="15" width="16" height="30" rx="8" fill="#0080FF" />
                <circle cx="82" cy="25" r="5" fill="#fff" />
                <text x="96" y="32" fill="#312E81" fontSize="12" fontWeight="900" fontFamily="sans-serif">iApp</text>
                <text x="96" y="44" fill="#6B7280" fontSize="8" fontWeight="bold" fontFamily="sans-serif">Technology</text>
              </g>
            </svg>
          )
        },
        {
          id: "moe",
          name: "Ministry of Education (ศธ.)",
          type: "National AI Educational Sponsor",
          desc: "Driving high school initiatives to establish deep cyber and machine learning technologies to assure family and institutional safety.",
          badgeColor: "bg-rose-500/10 border-rose-500/35 text-rose-300",
          customLogo: (
            <svg viewBox="0 0 100 100" className="w-16 h-16 filter drop-shadow-[0_0_8px_rgba(244,63,94,0.3)]">
              <circle cx="50" cy="50" r="45" fill="rgba(244, 63, 94, 0.05)" stroke="currentColor" strokeWidth="1.5" className="text-rose-500/30" />
              <path d="M50 15 L62 42 L38 42 Z" fill="#F43F5E" />
              <circle cx="50" cy="55" r="18" stroke="#F43F5E" strokeWidth="4" fill="none" />
              <circle cx="50" cy="55" r="10" stroke="#FDA4AF" strokeWidth="2" fill="none" />
              {Array.from({ length: 8 }).map((_, i) => (
                <line 
                  key={i}
                  x1="50" 
                  y1="55" 
                  x2={50 + 18 * Math.cos((i * Math.PI) / 4)} 
                  y2={55 + 18 * Math.sin((i * Math.PI) / 4)} 
                  stroke="#F43F5E" 
                  strokeWidth="3.5" 
                />
              ))}
            </svg>
          )
        }
      ]
    }
  };

  const t = content[lang];

  return (
    <section id="references" className="py-24 px-6 border-t border-white/5 bg-black/35 relative overflow-hidden">
      <div className="absolute -left-40 top-40 w-80 h-80 bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -right-40 bottom-40 w-80 h-80 bg-brand/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-brand/10 border border-brand/20 px-4 py-1.5 rounded-full text-brand text-xs font-black tracking-wider uppercase mb-4"
          >
            <Award className="w-4 h-4 text-brand animate-bounce" />
            OBEC SPARK AI 2026 EXHIBITION
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-black tracking-tighter mb-4 text-white"
          >
            {t.sectionTitle}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-white/50 max-w-2xl mx-auto"
          >
            {t.sectionSubtitle}
          </motion.p>
        </div>

        {/* Competition Banner Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative bg-gradient-to-r from-amber-600/10 via-amber-700/5 to-transparent border border-amber-500/20 rounded-3xl p-8 md:p-12 mb-16 overflow-hidden flex flex-col md:flex-row gap-8 items-center"
        >
          {/* Decorative Background */}
          <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="w-20 h-20 md:w-28 md:h-28 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center flex-shrink-0 text-amber-400">
            <svg viewBox="0 0 100 100" className="w-16 h-16 filter drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]">
              <path d="M50 15 C55 25, 62 25, 62 35 C62 48, 50 42, 50 55 C50 42, 38 48, 38 35 C38 25, 45 25, 50 15 Z" fill="#F59E0B" />
              <path d="M50 30 C53 38, 58 38, 58 45 C58 52, 50 48, 50 63 C50 48, 42 52, 42 45 C42 38, 47 38, 50 30 Z" fill="#EF4444" />
              <circle cx="50" cy="70" r="6" fill="#FFF" />
            </svg>
          </div>

          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 bg-amber-500/20 text-amber-300 font-extrabold text-xs px-3 py-1 rounded-full mb-3 uppercase tracking-widest">
              OFFICIAL ENTRY
            </div>
            <h3 className="text-2xl md:text-3xl font-black text-white mb-2 tracking-tight">
              {t.competitionTitle}
            </h3>
            <p className="text-amber-200/60 font-bold mb-4 text-sm md:text-base">
              {t.competitionOrg}
            </p>
            <p className="text-white/70 leading-relaxed font-light text-base md:text-lg max-w-4xl">
              {t.competitionDesc}
            </p>
          </div>
        </motion.div>

        {/* Partners & Influencers Grid */}
        <h3 className="text-lg font-bold uppercase tracking-widest text-[#00D1E1] mb-8 flex items-center gap-2">
          <Beaker className="w-5 h-5 text-[#00D1E1]" />
          {t.techPartnersTitle}
        </h3>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.pioneers.map((p, index) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 flex flex-col justify-between hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300 group"
            >
              <div>
                <div className="flex justify-between items-start gap-4 mb-6">
                  <div className="p-1 rounded-xl bg-black/40 overflow-hidden flex items-center justify-center">
                    {p.customLogo}
                  </div>
                  <span className={`text-[10px] uppercase tracking-wider font-extrabold px-2.5 py-1 rounded-md border ${p.badgeColor}`}>
                    {p.type}
                  </span>
                </div>

                <h4 className="text-xl font-extrabold text-white mb-2 tracking-tight group-hover:text-brand transition-colors">
                  {p.name}
                </h4>
                
                <p className="text-white/45 text-sm font-light leading-relaxed mb-6">
                  {p.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center gap-1.5 text-xs text-white/30 font-semibold group-hover:text-white/50 transition-colors">
                <Globe className="w-3.5 h-3.5" />
                <span>Verified Reference Node</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer citation card */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 p-8 rounded-3xl border border-white/5 bg-white/[0.01] flex flex-col sm:flex-row items-center gap-6 justify-between"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-brand/10 text-brand">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <p className="text-white font-bold">ระบบความปลอดภัยทางนวัตกรรมปัญญาประดิษฐ์</p>
              <p className="text-white/45 text-xs">พัฒนาร่วมกันตามมาตรฐานสากล สอดคล้องในหลักจริยธรรม AI จากผู้สร้างระบบ DeepVoice Shield</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl text-white/50 text-xs font-mono border border-white/5">
            <HeartHandshake className="w-4 h-4 text-[#00D1E1]" />
            <span>OBEC x AI STUDIO x ETHICS</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
