
import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", message: "BiteDash API is running" });
  });

  // AI Recommendations
  app.post("/api/recommendations", async (req, res) => {
    const { history, preferences } = req.body;
    
    // Prioritize GEMINI_API_KEY2 as requested, fallback to GEMINI_API_KEY
    const apiKey = (process.env.GEMINI_API_KEY2 || process.env.GEMINI_API_KEY)?.trim();
    
    if (!apiKey) {
      return res.status(500).json({ error: "Gemini API key not configured on server" });
    }

    try {
      const { GoogleGenerativeAI } = await import("@google/generative-ai");
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `Based on these past orders: ${history.join(", ")} and preferences: ${preferences}, suggest 3 types of dishes the user might like for their next meal. Provide a brief appetising reason for each. Format as a JSON array of objects with 'dish' and 'reason' keys.`;
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      const jsonMatch = text.match(/\[.*\]/s);
      if (jsonMatch) {
         return res.json(JSON.parse(jsonMatch[0]));
      }
      res.json([]);
    } catch (error: any) {
      console.error("Gemini API error:", error);
      res.status(500).json({ error: "Failed to fetch AI recommendations", details: error.message });
    }
  });

  // Vite middleware for development
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
