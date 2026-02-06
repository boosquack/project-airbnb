import { Menu } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '@/components/AuthProvider';
import { Button } from '@/components/ui';

const LandingHeader = () => {
  const { token } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-display font-bold text-lg">A</span>
            </div>
            <span className="font-display text-xl font-semibold tracking-tight">
              Air<span className="text-primary">N</span>Book
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            {token ? (
              <Button asChild size="lg" className="rounded-full px-6">
                <Link to="/listings">Browse Listings</Link>
              </Button>
            ) : (
              <>
                <Button asChild variant="ghost" size="lg" className="rounded-full px-5">
                  <Link to="/signin">Sign In</Link>
                </Button>
                <Button asChild size="lg" className="rounded-full px-6">
                  <Link to="/signup">Get Started</Link>
                </Button>
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 -mr-2 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/50">
            <nav className="flex flex-col gap-2">
              {token ? (
                <Button asChild size="lg" className="w-full rounded-full">
                  <Link to="/listings">Browse Listings</Link>
                </Button>
              ) : (
                <>
                  <Button asChild variant="outline" size="lg" className="w-full rounded-full">
                    <Link to="/signin">Sign In</Link>
                  </Button>
                  <Button asChild size="lg" className="w-full rounded-full">
                    <Link to="/signup">Get Started</Link>
                  </Button>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export { LandingHeader };
