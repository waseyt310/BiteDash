import { GoogleGenAI } from "@google/genai";

export async function getFoodRecommendations(userHistory: string[], preferences: string) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("GEMINI_API_KEY is not defined");
      return [];
    }

    const ai = new GoogleGenAI({ apiKey });
    
    const prompt = `Based on these past orders: ${userHistory.join(", ")} and preferences: ${preferences}, suggest 3 types of dishes the user might like for their next meal. Provide a brief appetising reason for each. Format as a JSON array of objects with 'dish' and 'reason' keys.`;
    
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    const text = response.text;
    if (!text) return [];

    const jsonMatch = text.match(/\[.*\]/s);
    if (jsonMatch) {
       return JSON.parse(jsonMatch[0]);
    }
    
    return [];
  } catch (error) {
    console.error("AI Recommendation error:", error);
    return [];
  }
}
