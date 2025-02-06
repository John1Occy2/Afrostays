import { type Hotel, type InsertHotel, type Booking, type InsertBooking, type User, type InsertUser } from "@shared/schema";
import { hotels, bookings, users } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";
import session from "express-session";
import connectPg from "connect-pg-simple";
import { pool } from "./db";

const PostgresSessionStore = connectPg(session);

export interface IStorage {
  getHotels(): Promise<Hotel[]>;
  getHotel(id: number): Promise<Hotel | undefined>;
  getFeaturedHotels(): Promise<Hotel[]>;
  searchHotels(location?: string): Promise<Hotel[]>;
  createBooking(booking: InsertBooking): Promise<Booking>;
  createHotel(hotel: InsertHotel): Promise<Hotel>;
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  sessionStore: session.SessionStore;
}

export class DatabaseStorage implements IStorage {
  sessionStore: session.SessionStore;

  constructor() {
    this.sessionStore = new PostgresSessionStore({
      pool,
      createTableIfMissing: true,
    });
  }

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

  async createHotel(hotel: InsertHotel): Promise<Hotel> {
    const [created] = await db.insert(hotels).values(hotel).returning();
    return created;
  }

  async createBooking(booking: InsertBooking): Promise<Booking> {
    const [created] = await db.insert(bookings).values(booking).returning();
    return created;
  }

  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(user: InsertUser): Promise<User> {
    const [created] = await db.insert(users).values(user).returning();
    return created;
  }
}

export const storage = new DatabaseStorage();