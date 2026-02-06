import { ArrowRight, Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import api from '@/api';
import {
  Button,
  Card,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  Spinner,
} from '@/components/ui';
import { getImageUrl } from '@/lib/utils/images';
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
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-center py-16">
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
    <section className="py-20 lg:py-28">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <p className="text-primary font-medium mb-2 tracking-wide uppercase text-sm">
              Handpicked for you
            </p>
            <h2 className="text-3xl md:text-4xl font-display font-semibold tracking-tight mb-0">
              Top-Rated Stays
            </h2>
          </div>
          <Link to="/listings">
            <Button variant="ghost" className="gap-2 group -mb-2">
              View all listings
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        <div className="relative">
          <Carousel
            opts={{
              align: 'start',
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4 md:-ml-6">
              {listings.map((listing) => (
                <CarouselItem
                  key={listing.id}
                  className="pl-4 md:pl-6 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                >
                  <Link to={`/listings/${listing.id}`} className="block group">
                    <Card className="overflow-hidden border-0 shadow-none bg-transparent">
                      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4">
                        <img
                          src={getImageUrl(listing.images[0])}
                          alt={listing.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-1.5">
                          <Star className="w-4 h-4 fill-star text-star" />
                          <span className="text-sm font-medium">{listing.rating.toFixed(1)}</span>
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-semibold text-base line-clamp-1 group-hover:text-primary transition-colors">
                            {listing.name}
                          </h3>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {listing.location?.name}
                        </p>
                        <p className="text-base">
                          <span className="font-semibold">${listing.price}</span>
                          <span className="text-muted-foreground"> / night</span>
                        </p>
                      </div>
                    </Card>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-4 lg:-left-6 w-12 h-12 border-2" />
            <CarouselNext className="hidden md:flex -right-4 lg:-right-6 w-12 h-12 border-2" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export { TopListingsCarousel };
