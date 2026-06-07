import { tourApi, hotelApi, carApi } from '@/services/api';
import type { Tour, Hotel, Car } from '@/types';
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
    const [toursRes, hotelsRes, carsRes] = await Promise.allSettled([
      tourApi.getAll({ featured: 'true' }),
      hotelApi.getAll({ available: 'true' }),
      carApi.getAll({ available: 'true' }),
    ]);
    const tours = toursRes.status === 'fulfilled' ? toursRes.value.data.data : [];
    const hotels = hotelsRes.status === 'fulfilled' ? hotelsRes.value.data.data : [];
    const cars = carsRes.status === 'fulfilled' ? carsRes.value.data.data : [];
    return { tours: tours.slice(0, 6), hotels: hotels.slice(0, 6), cars: cars.slice(0, 6) };
  } catch {
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
