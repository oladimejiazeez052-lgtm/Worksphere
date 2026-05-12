import { GoogleGenAI, Type } from "@google/genai";

// Initialization is lazy to ensure process.env.GEMINI_API_KEY is available when called
let ai: GoogleGenAI | null = null;

function getAI() {
  if (!ai) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not defined");
    }
    ai = new GoogleGenAI({ apiKey });
  }
  return ai;
}

export interface GeneratedProfile {
  name: string;
  role: string;
  bio: string;
  skills: string[];
  tone: 'casual' | 'professional' | 'strategic';
}

export async function generateProfileDraft(prompt: string, tone: string = 'professional'): Promise<GeneratedProfile> {
  const genAI = getAI();
  
  const response = await genAI.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Generate a professional profile for a freelancer based on this information: "${prompt}". The tone should be ${tone}.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          role: { type: Type.STRING },
          bio: { type: Type.STRING },
          skills: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING } 
          },
          tone: { type: Type.STRING, enum: ["casual", "professional", "strategic"] }
        },
        required: ["name", "role", "bio", "skills", "tone"]
      }
    }
  });

  const text = response.text;
  if (!text) throw new Error("No response from AI");
  
  return JSON.parse(text) as GeneratedProfile;
}
