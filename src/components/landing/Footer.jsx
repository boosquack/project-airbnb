import { Link } from 'react-router-dom';

import { Separator } from '@/components/ui';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/50 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Airbnb Clone</h3>
            <p className="text-sm text-muted-foreground">
              Find unique places to stay with local hosts in 191+ countries.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/signin" className="text-muted-foreground hover:text-foreground">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/signin" className="text-muted-foreground hover:text-foreground">
                  Safety Information
                </Link>
              </li>
              <li>
                <Link to="/signin" className="text-muted-foreground hover:text-foreground">
                  Cancellation Options
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Community</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/signin" className="text-muted-foreground hover:text-foreground">
                  Diversity & Belonging
                </Link>
              </li>
              <li>
                <Link to="/signin" className="text-muted-foreground hover:text-foreground">
                  Accessibility
                </Link>
              </li>
              <li>
                <Link to="/signin" className="text-muted-foreground hover:text-foreground">
                  Invite Friends
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Hosting</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/signin" className="text-muted-foreground hover:text-foreground">
                  Host Your Home
                </Link>
              </li>
              <li>
                <Link to="/signin" className="text-muted-foreground hover:text-foreground">
                  Host an Experience
                </Link>
              </li>
              <li>
                <Link to="/signin" className="text-muted-foreground hover:text-foreground">
                  Responsible Hosting
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>&copy; {currentYear} Airbnb Clone. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/signin" className="hover:text-foreground">
              Privacy
            </Link>
            <Link to="/signin" className="hover:text-foreground">
              Terms
            </Link>
            <Link to="/signin" className="hover:text-foreground">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export { Footer };
