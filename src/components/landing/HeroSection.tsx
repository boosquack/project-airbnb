import { ArrowRight, Search } from 'lucide-react';
import type { FormEvent } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Input } from '@/components/ui';
import { getImageUrl } from '@/lib/utils/images';

const HeroSection = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Navigate directly to listings page - it's now public
    navigate(`/listings${searchQuery ? `?search=${encodeURIComponent(searchQuery)}` : ''}`);
  };

  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={getImageUrl('listing5-1.jpg')}
          alt="Beautiful destination"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-6 lg:px-8 py-20">
        <div className="max-w-2xl">
          <p className="text-primary font-medium mb-4 tracking-wide uppercase text-sm">
            Your journey begins here
          </p>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-semibold leading-[1.1] mb-6 tracking-tight">
            Discover
            <br />
            <span className="text-primary italic">extraordinary</span>
            <br />
            places to stay
          </h1>

          <p className="text-lg text-muted-foreground mb-10 max-w-lg leading-relaxed">
            From serene countryside retreats to vibrant city apartments, find your perfect escape with hosts who care.
          </p>

          <form onSubmit={handleSearch} className="mb-8">
            <div className="flex flex-col sm:flex-row gap-3 max-w-xl">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Where do you want to go?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-14 text-base rounded-full border-2 bg-background/80 backdrop-blur-sm focus:bg-background transition-colors"
                />
              </div>
              <Button
                type="submit"
                size="lg"
                className="h-14 px-8 rounded-full text-base gap-2 group"
              >
                Search
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </form>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 pt-4 border-t border-border/50">
            <div>
              <p className="text-3xl font-display font-semibold">10K+</p>
              <p className="text-sm text-muted-foreground">Unique stays</p>
            </div>
            <div>
              <p className="text-3xl font-display font-semibold">50+</p>
              <p className="text-sm text-muted-foreground">Countries</p>
            </div>
            <div>
              <p className="text-3xl font-display font-semibold">4.9</p>
              <p className="text-sm text-muted-foreground">Average rating</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { HeroSection };
