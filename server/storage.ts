import { type Hotel, type InsertHotel, type Booking, type InsertBooking } from "@shared/schema";

export interface IStorage {
  getHotels(): Promise<Hotel[]>;
  getHotel(id: number): Promise<Hotel | undefined>;
  getFeaturedHotels(): Promise<Hotel[]>;
  searchHotels(location?: string): Promise<Hotel[]>;
  createBooking(booking: InsertBooking): Promise<Booking>;
}

export class MemStorage implements IStorage {
  private hotels: Map<number, Hotel>;
  private bookings: Map<number, Booking>;
  private currentHotelId: number;
  private currentBookingId: number;

  constructor() {
    this.hotels = new Map();
    this.bookings = new Map();
    this.currentHotelId = 1;
    this.currentBookingId = 1;
    this.seedHotels();
  }

  private seedHotels() {
    const mockHotels: InsertHotel[] = [
      {
        name: "Serengeti Safari Lodge",
        description: "Luxury safari lodge overlooking the vast Serengeti plains",
        location: "Tanzania",
        price: 450,
        rating: 5,
        images: [
          "https://images.unsplash.com/photo-1706755347826-29868be54b37",
          "https://images.unsplash.com/photo-1549439602-43ebca2327af"
        ],
        amenities: ["Pool", "Spa", "Restaurant", "Safari Tours"],
        featured: true
      },
      {
        name: "Zanzibar Beach Resort",
        description: "Beachfront paradise with traditional Swahili architecture",
        location: "Zanzibar",
        price: 350,
        rating: 4,
        images: [
          "https://images.unsplash.com/photo-1529290130-4ca3753253ae",
          "https://images.unsplash.com/photo-1432462770865-65b70570d673"
        ],
        amenities: ["Private Beach", "Water Sports", "Restaurant", "Bar"],
        featured: true
      }
    ];

    mockHotels.forEach(hotel => {
      const id = this.currentHotelId++;
      this.hotels.set(id, { ...hotel, id });
    });
  }

  async getHotels(): Promise<Hotel[]> {
    return Array.from(this.hotels.values());
  }

  async getHotel(id: number): Promise<Hotel | undefined> {
    return this.hotels.get(id);
  }

  async getFeaturedHotels(): Promise<Hotel[]> {
    return Array.from(this.hotels.values()).filter(hotel => hotel.featured);
  }

  async searchHotels(location?: string): Promise<Hotel[]> {
    if (!location) return this.getHotels();
    return Array.from(this.hotels.values()).filter(hotel => 
      hotel.location.toLowerCase().includes(location.toLowerCase())
    );
  }

  async createBooking(booking: InsertBooking): Promise<Booking> {
    const id = this.currentBookingId++;
    const newBooking = { ...booking, id };
    this.bookings.set(id, newBooking);
    return newBooking;
  }
}

export const storage = new MemStorage();
