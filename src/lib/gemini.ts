import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.warn("GEMINI_API_KEY is not defined in the environment. AI recommendations will not work.");
}
const ai = new GoogleGenAI({ apiKey: apiKey || "" });

export async function getFoodRecommendations(userHistory: string[], preferences: string) {
  if (!apiKey) return [];
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Based on these past orders: ${userHistory.join(", ")} and preferences: ${preferences}, suggest 3 types of dishes the user might like for their next meal. Provide a brief appetising reason for each. Format as a JSON array of objects with 'dish' and 'reason' keys.`,
      config: {
        responseMimeType: "application/json"
      }
    });

    const text = response.text;
    if (text) {
      return JSON.parse(text);
    }
    return [];
  } catch (error) {
    console.error("AI Recommendation error:", error);
    return [];
  }
}
