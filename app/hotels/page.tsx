import prisma from '@/lib/prisma';
import ServiceCard from '@/components/shared/ServiceCard';
import type { Hotel } from '@/types';

export const metadata = {
    title: 'Hotels – The Lost in the North',
    description: 'Carefully selected hotels and guesthouses in the most beautiful locations of Northern Pakistan.',
};

async function getHotels() {
    try {
        return await prisma.hotel.findMany({ orderBy: { createdAt: 'desc' } });
    } catch {
        return [];
    }
}

export default async function HotelsPage() {
    const hotels = await getHotels();

    return (
        <div>
            <div 
                className="page-header section-padding"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop')" }}
            >
                <div className="container-max px-4">
                    <span className="section-tag text-white">
                        <span className="section-tag-line bg-white" style={{ backgroundColor: '#ffffff' }} />
                        Accommodation
                    </span>
                    <h1 className="font-display text-4xl md:text-5xl font-bold mt-2 mb-4 text-white text-shadow-md">
                        Our Hotels
                    </h1>
                    <p className="text-gray-200 max-w-lg text-shadow-sm font-medium">
                        Carefully selected hotels and guesthouses in the most beautiful locations of the North.
                    </p>
                </div>
            </div>

            <section className="section-padding bg-[var(--color-surface)]">
                <div className="container-max">
                    {hotels.length > 0 && (
                        <div className="flex items-center justify-between mb-8">
                            <p className="text-sm text-[var(--color-text-muted)]">
                                Showing <span className="font-semibold text-[var(--color-dark)]">{hotels.length}</span> hotels
                            </p>
                        </div>
                    )}

                    {hotels.length === 0 ? (
                        <div className="text-center py-20">
                            <div className="w-20 h-20 rounded-full bg-[var(--color-surface-alt)] flex items-center justify-center mx-auto mb-4">
                                <span className="text-3xl">🏨</span>
                            </div>
                            <p className="text-lg font-semibold text-[var(--color-dark)] mb-2">No hotels listed yet</p>
                            <p className="text-[var(--color-text-muted)]">Check back soon for amazing stays!</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {hotels.map((hotel: Hotel) => (
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
                    )}
                </div>
            </section>
        </div>
    );
}
