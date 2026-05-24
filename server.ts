import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

// Increase limit for audio data
app.use(express.json({ limit: '10mb' }));

// Initialize Gemini
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// API endpoint for Voice Analysis
app.post("/api/analyze-voice", async (req, res) => {
  const { audioData, mimeType = "audio/webm" } = req.body;

  if (!audioData) {
    return res.status(400).json({ error: "Missing audio data" });
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        {
          parts: [
            {
              inlineData: {
                data: audioData,
                mimeType: mimeType
              }
            },
            {
              text: `You are an AI Voice & Scam detection expert for Thai language. 
              Analyze this audio clip from a potential phone scam.
              Determine if it's an AI-generated voice or uses common scam tactics (Call Center Scams).
              
              Respond MUST be in JSON format:
              {
                "score": number (0-100, high = likely AI/Scam),
                "status": "SAFE" | "WARNING" | "DANGER",
                "isAI": boolean,
                "label": string (short Thai label like "คนจริง" or "มิจฉาชีพ/AI"),
                "explanation": string (Short, simple Thai explanation for elderly people),
                "confidence": number (0-100)
              }`
            }
          ]
        }
      ],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.NUMBER },
            status: { type: Type.STRING },
            isAI: { type: Type.BOOLEAN },
            label: { type: Type.STRING },
            explanation: { type: Type.STRING },
            confidence: { type: Type.NUMBER }
          },
          required: ["score", "status", "isAI", "label", "explanation", "confidence"]
        }
      }
    });

    const result = JSON.parse(response.text || "{}");
    res.json(result);
  } catch (error: any) {
    console.error("Analysis Error:", error);
    
    // Check if it's a 503/high demand error from Gemini
    if (error.message?.includes("503") || error.message?.includes("high demand")) {
      return res.status(503).json({ 
        error: "service_busy",
        message: "ระบบกำลังทำงานหนัก กรุณาลองใหม่อีกครั้งในอีกสักครู่ (AI is busy, please try again shortly)" 
      });
    }

    res.status(500).json({ error: "analysis_failed", message: error.message || "Internal Server Error" });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
