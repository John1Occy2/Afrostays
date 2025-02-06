import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { SearchBar } from "@/components/search-bar";
import { HotelCard } from "@/components/hotel-card";
import type { Hotel } from "@shared/schema";

export default function Home() {
  const { data: hotels, isLoading } = useQuery<Hotel[]>({
    queryKey: ["/api/hotels/featured"],
  });

  return (
    <div>
      <section className="bg-primary/5 py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Discover Africa's Finest Hotels
            </h1>
            <p className="text-lg text-muted-foreground">
              Experience luxury and comfort with authentic African hospitality
            </p>
          </motion.div>
          <SearchBar />
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8">Featured Hotels</h2>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hotels?.map((hotel) => (
              <HotelCard key={hotel.id} hotel={hotel} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
