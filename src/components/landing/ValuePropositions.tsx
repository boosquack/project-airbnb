import { CreditCard, Home, Shield, Star } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: Home,
    title: 'Unique Stays',
    description: 'Hand-picked properties from cozy apartments to luxury villas, each with its own character.',
  },
  {
    icon: Shield,
    title: 'Verified Hosts',
    description: 'Every host is verified and reviewed to ensure your safety and peace of mind.',
  },
  {
    icon: Star,
    title: 'Trusted Reviews',
    description: 'Read authentic reviews from real guests to find the perfect place for your trip.',
  },
  {
    icon: CreditCard,
    title: 'Secure Booking',
    description: 'Your payment and personal information is always protected with bank-level security.',
  },
];

const ValuePropositions = () => {
  return (
    <section className="py-20 lg:py-28">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-primary font-medium mb-2 tracking-wide uppercase text-sm">
            Why choose us
          </p>
          <h2 className="text-3xl md:text-4xl font-display font-semibold tracking-tight mb-4">
            Travel with Confidence
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-0">
            We make finding and booking your perfect stay simple, safe, and enjoyable
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group text-center p-6 rounded-2xl hover:bg-muted/50 transition-colors"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-primary/20 group-hover:scale-110 transition-all">
                  <Icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2 font-display">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-0">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export { ValuePropositions };
