import { useQuery } from "@tanstack/react-query";
import { useParams, useLocation } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import type { Hotel } from "@shared/schema";

export default function HotelPage() {
  const { id } = useParams();
  const [, setLocation] = useLocation();

  const { data: hotel, isLoading } = useQuery<Hotel>({
    queryKey: [`/api/hotels/${id}`],
  });

  if (isLoading) return <div>Loading...</div>;
  if (!hotel) return <div>Hotel not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid md:grid-cols-2 gap-8"
      >
        <div>
          <Carousel className="w-full">
            <CarouselContent>
              {hotel.images.map((image, index) => (
                <CarouselItem key={index}>
                  <img
                    src={image}
                    alt={`${hotel.name} - Image ${index + 1}`}
                    className="w-full h-[400px] object-cover rounded-lg"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

        <div>
          <h1 className="text-4xl font-bold mb-4">{hotel.name}</h1>
          <p className="text-xl mb-4">${hotel.price} per night</p>
          <p className="text-muted-foreground mb-6">{hotel.description}</p>

          <div className="mb-6">
            <h3 className="font-semibold mb-2">Amenities</h3>
            <div className="flex flex-wrap gap-2">
              {hotel.amenities.map((amenity) => (
                <span
                  key={amenity}
                  className="bg-accent/10 text-accent px-3 py-1 rounded-full"
                >
                  {amenity}
                </span>
              ))}
            </div>
          </div>

          <Button
            size="lg"
            onClick={() => setLocation(`/booking/${hotel.id}`)}
            className="w-full"
          >
            Book Now
          </Button>
        </div>
      </motion.div>
    </div>
  );
}