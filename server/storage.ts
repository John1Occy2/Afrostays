import { type Hotel, type InsertHotel, type Booking, type InsertBooking } from "@shared/schema";
import { hotels, bookings } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getHotels(): Promise<Hotel[]>;
  getHotel(id: number): Promise<Hotel | undefined>;
  getFeaturedHotels(): Promise<Hotel[]>;
  searchHotels(location?: string): Promise<Hotel[]>;
  createBooking(booking: InsertBooking): Promise<Booking>;
}

export class DatabaseStorage implements IStorage {
  async getHotels(): Promise<Hotel[]> {
    return await db.select().from(hotels);
  }

  async getHotel(id: number): Promise<Hotel | undefined> {
    const [hotel] = await db.select().from(hotels).where(eq(hotels.id, id));
    return hotel;
  }

  async getFeaturedHotels(): Promise<Hotel[]> {
    return await db.select().from(hotels).where(eq(hotels.featured, true));
  }

  async searchHotels(location?: string): Promise<Hotel[]> {
    if (!location) return this.getHotels();
    const lowercaseLocation = location.toLowerCase();
    const results = await db.select().from(hotels);
    return results.filter(hotel => 
      hotel.location.toLowerCase().includes(lowercaseLocation)
    );
  }

  async createBooking(booking: InsertBooking): Promise<Booking> {
    const [created] = await db.insert(bookings).values(booking).returning();
    return created;
  }
}

export const storage = new DatabaseStorage();