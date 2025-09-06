import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertProductSchema, insertOrderSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // User routes
  app.post("/api/users", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      const user = await storage.createUser(userData);
      res.json({ ...user, password: undefined });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.get("/api/users/:id", async (req, res) => {
    try {
      const user = await storage.getUser(req.params.id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json({ ...user, password: undefined });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.put("/api/users/:id/profile", async (req, res) => {
    try {
      const user = await storage.updateUserProfile(req.params.id, req.body);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json({ ...user, password: undefined });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Product routes
  app.get("/api/products", async (req, res) => {
    try {
      const { category } = req.query;
      let products;
      
      if (category) {
        products = await storage.getProductsByCategory(category as string);
      } else {
        products = await storage.getAllProducts();
      }
      
      res.json(products);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/products/:id", async (req, res) => {
    try {
      const product = await storage.getProduct(req.params.id);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.json(product);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/users/:userId/recommendations", async (req, res) => {
    try {
      const products = await storage.getRecommendedProducts(req.params.userId);
      res.json(products);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Bundle routes
  app.get("/api/bundles", async (req, res) => {
    try {
      const bundles = await storage.getAllBundles();
      res.json(bundles);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/users/:userId/bundles", async (req, res) => {
    try {
      const bundles = await storage.getPersonalizedBundles(req.params.userId);
      res.json(bundles);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Order routes
  app.post("/api/orders", async (req, res) => {
    try {
      const orderData = insertOrderSchema.parse(req.body);
      const order = await storage.createOrder(orderData);
      
      // Add neural points reward for purchase
      if (order.userId) {
        const pointsEarned = Math.floor(parseFloat(order.totalAmount) * 10); // 10 points per dollar
        await storage.addUserReward({
          userId: order.userId,
          activityType: "purchase",
          pointsEarned,
          description: `Purchase order ${order.id}`,
        });
      }
      
      res.json(order);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.get("/api/users/:userId/orders", async (req, res) => {
    try {
      const orders = await storage.getUserOrders(req.params.userId);
      res.json(orders);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Offer routes
  app.get("/api/offers", async (req, res) => {
    try {
      const offers = await storage.getActiveOffers();
      res.json(offers);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/offers/flash-deals", async (req, res) => {
    try {
      const flashDeals = await storage.getFlashDeals();
      res.json(flashDeals);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Rewards routes
  app.get("/api/users/:userId/rewards", async (req, res) => {
    try {
      const rewards = await storage.getUserRewards(req.params.userId);
      res.json(rewards);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/users/:userId/points", async (req, res) => {
    try {
      const points = await storage.getUserPoints(req.params.userId);
      res.json({ points });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/users/:userId/cognitive-assessment", async (req, res) => {
    try {
      const { responses } = req.body;
      
      // Simple cognitive assessment calculation
      const cognitiveProfile = {
        memory: Math.floor(Math.random() * 30 + 70), // 70-100
        focus: Math.floor(Math.random() * 30 + 70),
        sleep: Math.floor(Math.random() * 30 + 70),
        energy: Math.floor(Math.random() * 30 + 70),
        mood: Math.floor(Math.random() * 30 + 70),
      };
      
      const user = await storage.updateUserProfile(req.params.userId, { cognitiveProfile });
      
      // Award points for completing assessment
      await storage.addUserReward({
        userId: req.params.userId,
        activityType: "challenge",
        pointsEarned: 100,
        description: "Completed cognitive assessment",
      });
      
      res.json({ cognitiveProfile, user });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
