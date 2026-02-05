import { Search } from 'lucide-react';
import type { FormEvent } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Input } from '@/components/ui';

const HeroSection = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`/signin?redirect=/listings&search=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <section className="relative bg-gradient-to-b from-primary/10 to-background py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Find your perfect getaway
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8">
            Discover unique stays and experiences around the world.
            From cozy apartments to luxury villas, we have something for everyone.
          </p>

          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search destinations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
            <Button type="submit" size="lg" className="h-12">
              Search
            </Button>
          </form>

          <p className="text-sm text-muted-foreground mt-4">
            Sign in to access all features and start booking
          </p>
        </div>
      </div>
    </section>
  );
};

export { HeroSection };
