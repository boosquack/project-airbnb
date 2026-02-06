import { Facebook, Instagram, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    support: [
      { label: 'Help Center', href: '/signin' },
      { label: 'Safety Information', href: '/signin' },
      { label: 'Cancellation Options', href: '/signin' },
      { label: 'Contact Us', href: '/signin' },
    ],
    community: [
      { label: 'Blog', href: '/signin' },
      { label: 'Forum', href: '/signin' },
      { label: 'Invite Friends', href: '/signin' },
      { label: 'Gift Cards', href: '/signin' },
    ],
    hosting: [
      { label: 'List Your Property', href: '/signin' },
      { label: 'Host Resources', href: '/signin' },
      { label: 'Host Community', href: '/signin' },
      { label: 'Responsible Hosting', href: '/signin' },
    ],
  };

  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-display font-bold text-lg">A</span>
              </div>
              <span className="font-display text-xl font-semibold tracking-tight">
                Air<span className="text-primary">N</span>Book
              </span>
            </Link>
            <p className="text-background/70 text-sm leading-relaxed mb-6 max-w-xs">
              Discover unique places to stay with local hosts in 191+ countries. Your home away from home, wherever you go.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-background/10 hover:bg-primary flex items-center justify-center transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-background/10 hover:bg-primary flex items-center justify-center transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-background/10 hover:bg-primary flex items-center justify-center transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-background/50">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-background/70 hover:text-primary text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-background/50">Community</h4>
            <ul className="space-y-3">
              {footerLinks.community.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-background/70 hover:text-primary text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-background/50">Hosting</h4>
            <ul className="space-y-3">
              {footerLinks.hosting.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-background/70 hover:text-primary text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-background/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-background/50">
            <p className="mb-0">&copy; {currentYear} AirNBook. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <Link to="/signin" className="hover:text-primary transition-colors">
                Privacy
              </Link>
              <Link to="/signin" className="hover:text-primary transition-colors">
                Terms
              </Link>
              <Link to="/signin" className="hover:text-primary transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export { Footer };
