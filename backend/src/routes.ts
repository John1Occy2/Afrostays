import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { searchSchema, insertBookingSchema, insertHotelSchema } from "@shared/schema";
import { setupAuth } from "./auth";

export function registerRoutes(app: Express): Server {
  setupAuth(app);

  app.get("/api/hotels", async (_req, res) => {
    const hotels = await storage.getHotels();
    res.json(hotels);
  });

  app.get("/api/hotels/featured", async (_req, res) => {
    const hotels = await storage.getFeaturedHotels();
    res.json(hotels);
  });

  app.get("/api/hotels/:id", async (req, res) => {
    const hotel = await storage.getHotel(Number(req.params.id));
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }
    res.json(hotel);
  });

  app.get("/api/search", async (req, res) => {
    const query = searchSchema.parse(req.query);
    const hotels = await storage.searchHotels(query.location);
    res.json(hotels);
  });

  app.post("/api/hotels", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Please login to list a property" });
    }
    if (!req.user!.isHotelOwner) {
      return res.status(403).json({ message: "Only hotel owners can list properties" });
    }
    const hotel = insertHotelSchema.parse({
      ...req.body,
      ownerId: req.user!.id,
    });
    const created = await storage.createHotel(hotel);
    res.status(201).json(created);
  });

  app.post("/api/bookings", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Please login to make a booking" });
    }
    const booking = insertBookingSchema.parse({
      ...req.body,
      userId: req.user!.id,
    });
    const created = await storage.createBooking(booking);
    res.status(201).json(created);
  });

  const httpServer = createServer(app);
  return httpServer;
}