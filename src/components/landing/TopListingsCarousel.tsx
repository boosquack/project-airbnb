import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import api from '@/api';
import { StarRatingDisplay } from '@/components/reviews';
import {
  Card,
  CardContent,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  Spinner,
} from '@/components/ui';
import type { ListingWithLocation } from '@/types';

const TopListingsCarousel = () => {
  const [listings, setListings] = useState<ListingWithLocation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedListings = async () => {
      try {
        const response = await api.get<ListingWithLocation[]>('/api/listings/featured');
        setListings(response.data);
      } catch (error) {
        console.error('Failed to fetch featured listings:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedListings();
  }, []);

  if (isLoading) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center py-12">
            <Spinner />
          </div>
        </div>
      </section>
    );
  }

  if (!listings || listings.length === 0) {
    return null;
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Top-Rated Stays</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our highest-rated properties, loved by guests from around the world.
          </p>
        </div>

        <div className="max-w-5xl mx-auto px-12">
          <Carousel
            opts={{
              align: 'start',
              loop: true,
            }}
          >
            <CarouselContent className="-ml-4">
              {listings.map((listing) => (
                <CarouselItem
                  key={listing.id}
                  className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
                >
                  <Link to="/signin">
                    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative h-48">
                        <img
                          src={`/images/${listing.images[0]}`}
                          alt={listing.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold text-sm line-clamp-1">
                            {listing.name}
                          </h3>
                          <StarRatingDisplay rating={listing.rating} size="sm" />
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {listing.location?.name}
                        </p>
                        <p className="text-sm mt-2">
                          <span className="font-semibold">${listing.price}</span>
                          <span className="text-muted-foreground"> / night</span>
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export { TopListingsCarousel };
