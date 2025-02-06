import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import type { Hotel } from "@shared/schema";

export function HotelCard({ hotel }: { hotel: Hotel }) {
  const [, setLocation] = useLocation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden">
        <img
          src={hotel.images[0]}
          alt={hotel.name}
          className="w-full h-48 object-cover"
        />
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>{hotel.name}</span>
            <span className="text-lg">${hotel.price}/night</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">{hotel.description}</p>
          <div className="flex gap-2 mb-4">
            {hotel.amenities.map((amenity) => (
              <span
                key={amenity}
                className="bg-accent/10 text-accent text-sm px-2 py-1 rounded"
              >
                {amenity}
              </span>
            ))}
          </div>
          <Button
            onClick={() => setLocation(`/hotel/${hotel.id}`)}
            className="w-full"
          >
            View Details
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}