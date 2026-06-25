import prisma from '@/lib/prisma';
import HeroSection from '@/components/home/HeroSection';
import AboutSection from '@/components/home/AboutSection';
import ServicesSection from '@/components/home/ServicesSection';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import StatsCounter from '@/components/home/StatsCounter';
import LensSection from '@/components/home/LensSection';
import RoadToNorth from '@/components/home/RoadToNorth';
import ExpeditionJournals from '@/components/home/Testimonials';
import PrimaryHubs from '@/components/home/PrimaryHubs';
import NewsletterSection from '@/components/home/NewsletterSection';
import CustomTripBanner from '@/components/home/CustomTripBanner';

export const metadata = {
  title: 'Lost in the North – Premium Travel in Northern Pakistan',
  description:
    'Discover breathtaking expeditions across Northern Pakistan. Book tours, hotels and car rentals with expert local guides.',
};

async function getData() {
  try {
    const [tours, hotels, cars] = await Promise.all([
      prisma.tour.findMany({
        where: { featured: true },
        orderBy: { createdAt: 'desc' },
        take: 6,
      }),
      prisma.hotel.findMany({
        where: { available: true },
        orderBy: { createdAt: 'desc' },
        take: 6,
      }),
      prisma.car.findMany({
        where: { available: true },
        orderBy: { createdAt: 'desc' },
        take: 6,
      }),
    ]);
    return { tours, hotels, cars };
  } catch (error) {
    console.error('Failed to fetch homepage data:', error);
    return { tours: [], hotels: [], cars: [] };
  }
}

export default async function HomePage() {
  const { tours, hotels, cars } = await getData();

  return (
    <>
      {/* 1. Hero with search widget */}
      <HeroSection />

      {/* 2. About — A Journey Crafted by the Elements */}
      <AboutSection />

      {/* 3. Featured Expeditions (tours, hotels, cars from API) */}
      <ServicesSection tours={tours} hotels={hotels} cars={cars} />

      {/* 4. Why Choose Us */}
      <WhyChooseUs />

      {/* 5. Stats Counter */}
      <StatsCounter />

      {/* 6. Through the Lens – photo gallery */}
      <LensSection />

      {/* 7. The Road to the North – how it works */}
      <RoadToNorth />

      {/* 8. Expedition Journals – traveler testimonials */}
      <ExpeditionJournals />

      {/* 9. Primary Hubs – destination cards */}
      <PrimaryHubs />

      {/* 10. Newsletter Signup */}
      <NewsletterSection />

      {/* 11. Custom Trip CTA banner */}
      <CustomTripBanner />
    </>
  );
}
