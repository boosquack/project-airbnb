import {
  FeaturedDestinations,
  Footer,
  HeroSection,
  LandingHeader,
  TopListingsCarousel,
  ValuePropositions,
} from '@/components/landing';

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <LandingHeader />
      <HeroSection />
      <TopListingsCarousel />
      <FeaturedDestinations />
      <ValuePropositions />
      <Footer />
    </div>
  );
};

export default LandingPage;
