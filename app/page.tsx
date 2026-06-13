import prisma from '@/lib/prisma';
import HeroSection from '@/components/home/HeroSection';
import AboutSection from '@/components/home/AboutSection';
import ServicesSection from '@/components/home/ServicesSection';
import LensSection from '@/components/home/LensSection';
import RoadToNorth from '@/components/home/RoadToNorth';
import ExpeditionJournals from '@/components/home/Testimonials';
import PrimaryHubs from '@/components/home/PrimaryHubs';
import CustomTripBanner from '@/components/home/CustomTripBanner';

export const metadata = {
  title: 'Lost in the North',
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
      {/* 1. Hero + Stats bar */}
      <HeroSection />

      {/* 2. About — A Journey Crafted by the Elements */}
      <AboutSection />

      {/* 3. Featured Expeditions (tours, hotels, cars from API) */}
      <ServicesSection tours={tours} hotels={hotels} cars={cars} />

      {/* 4. Through the Lens – photo gallery */}
      <LensSection />

      {/* 5. The Road to the North – how it works */}
      <RoadToNorth />

      {/* 6. Expedition Journals – traveler testimonials */}
      <ExpeditionJournals />

      {/* 7. Primary Hubs – destination cards */}
      <PrimaryHubs />

      {/* 8. Stay Lost CTA banner */}
      <CustomTripBanner />
    </>
  );
}
