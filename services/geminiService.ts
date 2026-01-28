
import { GoogleGenAI, Type } from "@google/genai";
import { LearningLevel } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateLearningContent = async (subject: string, topic: string, level: LearningLevel) => {
  const model = 'gemini-3-flash-preview';
  
  const levelDescriptions = {
    [LearningLevel.BASIC]: "Simple explanation using analogies for absolute beginners (slow learners).",
    [LearningLevel.STANDARD]: "Technical but clear explanation for average learners.",
    [LearningLevel.ADVANCED]: "In-depth, advanced scientific detail and complex reasoning for fast learners."
  };

  const prompt = `
    Subject: ${subject}
    Topic: ${topic}
    Level: ${level} (${levelDescriptions[level]})

    Provide a structured educational response including:
    1. A detailed explanation.
    2. A practical example.
    3. A relevant practice question.
  `;

  const response = await ai.models.generateContent({
    model,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          explanation: { type: Type.STRING },
          example: { type: Type.STRING },
          practiceQuestion: { type: Type.STRING }
        },
        required: ["explanation", "example", "practiceQuestion"]
      }
    }
  });

  return JSON.parse(response.text);
};

export const generateSmartNotes = async (rawNotes: string) => {
  const model = 'gemini-3-flash-preview';
  
  const prompt = `
    Summarize the following educational notes into a concise summary and a list of key points.
    
    Notes:
    ${rawNotes}
  `;

  const response = await ai.models.generateContent({
    model,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          summary: { type: Type.STRING },
          keyPoints: { 
            type: Type.ARRAY,
            items: { type: Type.STRING }
          }
        },
        required: ["summary", "keyPoints"]
      }
    }
  });

  return JSON.parse(response.text);
};
