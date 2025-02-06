import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { searchSchema, insertBookingSchema } from "@shared/schema";

export function registerRoutes(app: Express): Server {
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

  app.post("/api/bookings", async (req, res) => {
    const booking = insertBookingSchema.parse(req.body);
    const created = await storage.createBooking(booking);
    res.status(201).json(created);
  });

  const httpServer = createServer(app);
  return httpServer;
}
