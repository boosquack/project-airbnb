import { ArrowUpRight, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

import { getImageUrl } from '@/lib/utils/images';

interface Destination {
  id: number;
  name: string;
  country: string;
  image: string;
  properties: number;
  searchQuery: string;
}

const destinations: Destination[] = [
  {
    id: 1,
    name: 'London',
    country: 'United Kingdom',
    image: 'listing1-1.jpg',
    properties: 1240,
    searchQuery: 'London',
  },
  {
    id: 2,
    name: 'Paris',
    country: 'France',
    image: 'listing2-1.jpg',
    properties: 890,
    searchQuery: 'Paris',
  },
  {
    id: 3,
    name: 'Barcelona',
    country: 'Spain',
    image: 'listing3-1.jpg',
    properties: 650,
    searchQuery: 'Barcelona',
  },
  {
    id: 4,
    name: 'Tokyo',
    country: 'Japan',
    image: 'listing4-1.jpg',
    properties: 1100,
    searchQuery: 'Tokyo',
  },
];

const FeaturedDestinations = () => {
  return (
    <section className="py-20 lg:py-28 bg-muted/30">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-primary font-medium mb-2 tracking-wide uppercase text-sm">
            Explore the world
          </p>
          <h2 className="text-3xl md:text-4xl font-display font-semibold tracking-tight mb-4">
            Popular Destinations
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-0">
            Discover trending locations loved by travelers worldwide
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {destinations.map((destination, index) => (
            <Link
              key={destination.id}
              to={`/listings?search=${encodeURIComponent(destination.searchQuery)}`}
              className={`group relative rounded-2xl overflow-hidden ${
                index === 0 ? 'md:col-span-2 md:row-span-2' : ''
              }`}
            >
              <div className={`relative ${index === 0 ? 'aspect-square md:aspect-auto md:h-full min-h-[280px] md:min-h-[500px]' : 'aspect-[4/3]'}`}>
                <img
                  src={getImageUrl(destination.image)}
                  alt={destination.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Content overlay */}
                <div className="absolute inset-0 p-5 md:p-6 flex flex-col justify-end">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className={`text-white font-display font-semibold mb-1 ${index === 0 ? 'text-2xl md:text-3xl' : 'text-xl'}`}>
                        {destination.name}
                      </h3>
                      <div className="flex items-center gap-1.5 text-white/80">
                        <MapPin className="h-3.5 w-3.5" />
                        <span className="text-sm">{destination.country}</span>
                      </div>
                      <p className="text-white/70 text-sm mt-2">
                        {destination.properties.toLocaleString()} properties
                      </p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all">
                      <ArrowUpRight className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export { FeaturedDestinations };
