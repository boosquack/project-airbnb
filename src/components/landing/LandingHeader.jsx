import { Link } from 'react-router-dom';

import { useAuth } from '@/components/AuthProvider';
import { Button, Separator } from '@/components/ui';

const LandingHeader = () => {
  const { token } = useAuth();

  return (
    <>
      <header className="flex items-center justify-between px-8 py-4">
        <Link to="/" className="text-xl font-bold text-primary">
          Airbnb Clone
        </Link>
        <nav className="flex items-center gap-4">
          {token ? (
            <Button asChild>
              <Link to="/listings">Browse Listings</Link>
            </Button>
          ) : (
            <>
              <Button asChild variant="ghost">
                <Link to="/signin">Sign In</Link>
              </Button>
              <Button asChild>
                <Link to="/signup">Sign Up</Link>
              </Button>
            </>
          )}
        </nav>
      </header>
      <Separator />
    </>
  );
};

export { LandingHeader };
