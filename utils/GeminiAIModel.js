import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

// Initialize the client
const genAI = new GoogleGenAI({
  apiKey: apiKey,
});

// Configuration for generation
const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

// Create a chat-like helper to keep your existing project structure
export const chatSession = {
  async sendMessage(prompt) {
    const response = await genAI.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig,
    });
    return response;
  },
};
