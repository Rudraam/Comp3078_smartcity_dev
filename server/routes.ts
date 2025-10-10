import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { getCityAssistantResponse } from "./openai";

export async function registerRoutes(app: Express): Promise<Server> {
  // AI Chat Assistant Route
  // Reference: blueprint:javascript_openai integration
  app.post("/api/ai/chat", async (req, res) => {
    try {
      const { cityName, message, history } = req.body;

      if (!cityName || !message) {
        console.error("[API] Missing required fields:", { cityName, message });
        return res.status(400).json({ error: "Missing required fields" });
      }

      console.log(`[API] Processing AI chat request for ${cityName}`);

      const response = await getCityAssistantResponse(
        cityName,
        message,
        history || []
      );

      console.log("[API] Successfully got AI response, sending to client");
      res.json({ response });
    } catch (error: any) {
      console.error("[API] AI chat error:", error.message || error);
      res.status(500).json({ 
        error: "Failed to get AI response",
        details: error.message 
      });
    }
  });

  // User registration route (for future use with database)
  app.post("/api/auth/register", async (req, res) => {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ error: "Username and password required" });
      }

      const existingUser = await storage.getUserByUsername(username);
      if (existingUser) {
        return res.status(400).json({ error: "Username already exists" });
      }

      const user = await storage.createUser({ username, password });
      res.json({ id: user.id, username: user.username });
    } catch (error) {
      console.error("Registration error:", error);
      res.status(500).json({ error: "Registration failed" });
    }
  });

  // User login route (for future use)
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      
      const user = await storage.getUserByUsername(username);
      if (!user || user.password !== password) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      res.json({ id: user.id, username: user.username });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ error: "Login failed" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
