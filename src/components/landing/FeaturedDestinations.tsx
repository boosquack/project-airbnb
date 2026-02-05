import { MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Card, CardContent } from '@/components/ui';

interface Destination {
  id: number;
  name: string;
  country: string;
  image: string;
  description: string;
}

const destinations: Destination[] = [
  {
    id: 1,
    name: 'London',
    country: 'United Kingdom',
    image: '/images/listing1-1.jpg',
    description: 'Historic landmarks and vibrant culture',
  },
  {
    id: 2,
    name: 'Paris',
    country: 'France',
    image: '/images/listing2-1.jpg',
    description: 'The city of love and lights',
  },
  {
    id: 3,
    name: 'Explore More',
    country: 'Worldwide',
    image: '/images/listing3-1.jpg',
    description: 'Discover hidden gems everywhere',
  },
];

const FeaturedDestinations = () => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Popular Destinations</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our most popular destinations and find the perfect place for your next adventure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((destination) => (
            <Link key={destination.id} to="/signin">
              <Card className="overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-semibold">{destination.name}</h3>
                    <div className="flex items-center gap-1 text-sm opacity-90">
                      <MapPin className="h-3 w-3" />
                      <span>{destination.country}</span>
                    </div>
                  </div>
                </div>
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground">
                    {destination.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export { FeaturedDestinations };
