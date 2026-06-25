import Link from 'next/link';
import ServiceCard from '@/components/shared/ServiceCard';
import type { Tour, Hotel, Car } from '@/types';

interface Props {
    tours: Tour[];
    hotels: Hotel[];
    cars: Car[];
}

function SectionHeader({
    tag, title, subtitle, href, cta,
}: {
    tag: string; title: string; subtitle: string; href?: string; cta?: string;
}) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
                <span className="section-tag">
                    <span className="section-tag-line" />
                    {tag}
                </span>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-[var(--color-dark)]">
                    {title}
                </h2>
                <p className="text-gray-500 mt-2 max-w-lg">{subtitle}</p>
            </div>
            {href && cta && (
                <Link
                    href={href}
                    className="btn btn-outline shrink-0"
                >
                    {cta}
                </Link>
            )}
        </div>
    );
}

export default function ServicesSection({ tours, hotels, cars }: Props) {
    return (
        <>
            {/* Featured Tours */}
            {tours.length > 0 && (
                <section className="section-padding bg-[var(--color-surface)]" id="tours">
                    <div className="container-max">
                        <SectionHeader
                            tag="Adventures Await"
                            title="Featured Expeditions"
                            subtitle="Carefully crafted journeys through the most breathtaking landscapes of Northern Pakistan."
                            href="/tours"
                            cta="View All →"
                        />
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {tours.map((tour) => (
                                <ServiceCard
                                    key={tour.id}
                                    id={tour.id}
                                    type="tour"
                                    image={tour.images?.[0] || ''}
                                    title={tour.title}
                                    location={tour.location}
                                    duration={tour.duration}
                                    price={tour.price}
                                    description={tour.description}
                                />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Popular Hotels */}
            {hotels.length > 0 && (
                <section className="section-padding bg-[var(--color-surface-white)]" id="hotels">
                    <div className="container-max">
                        <SectionHeader
                            tag="Rest in Comfort"
                            title="Handpicked Hotels"
                            subtitle="From mountain lodges to luxury resorts, find your perfect stay in Northern Pakistan."
                            href="/hotels"
                            cta="All Hotels →"
                        />
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {hotels.map((hotel) => (
                                <ServiceCard
                                    key={hotel.id}
                                    id={hotel.id}
                                    type="hotel"
                                    image={hotel.images?.[0] || ''}
                                    title={hotel.name}
                                    location={hotel.location}
                                    pricePerNight={hotel.pricePerNight}
                                    description={hotel.description}
                                    rating={hotel.rating}
                                />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Car Rentals */}
            {cars.length > 0 && (
                <section className="section-padding bg-[var(--color-surface)]" id="cars">
                    <div className="container-max">
                        <SectionHeader
                            tag="Travel Your Way"
                            title="Rental Vehicles"
                            subtitle="Reliable, comfortable vehicles for every terrain in the Northern highlands."
                            href="/cars"
                            cta="All Cars →"
                        />
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {cars.map((car) => (
                                <ServiceCard
                                    key={car.id}
                                    id={car.id}
                                    type="car"
                                    image={car.images?.[0] || car.image || ''}
                                    title={car.name}
                                    location="Gilgit-Baltistan, Pakistan"
                                    pricePerDay={car.pricePerDay}
                                    description={`${car.type} · ${car.transmission} · ${car.fuelType}`}
                                />
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </>
    );
}
