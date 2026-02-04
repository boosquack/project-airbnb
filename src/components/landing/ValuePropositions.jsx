import { CreditCard, Home, Shield, Star } from 'lucide-react';

const features = [
  {
    icon: Home,
    title: 'Unique Stays',
    description: 'From city apartments to countryside retreats, find the perfect accommodation for any trip.',
  },
  {
    icon: Shield,
    title: 'Verified Hosts',
    description: 'All our hosts are verified to ensure your safety and a great experience every time.',
  },
  {
    icon: Star,
    title: 'Top-Rated Experiences',
    description: 'Read honest reviews from real guests to find the best places to stay.',
  },
  {
    icon: CreditCard,
    title: 'Secure Payments',
    description: 'Book with confidence knowing your payment information is always protected.',
  },
];

const ValuePropositions = () => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Choose Us</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We make it easy to find and book unique stays around the world.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="flex flex-col items-center text-center p-6"
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">
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
