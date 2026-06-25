import prisma from '@/lib/prisma';
import ServiceCard from '@/components/shared/ServiceCard';
import type { Tour } from '@/types';

export const metadata = {
    title: 'Tours – The Lost in the North',
    description: 'Discover handcrafted adventures through the most stunning landscapes of Northern Pakistan.',
};

async function getTours() {
    try {
        return await prisma.tour.findMany({ orderBy: { createdAt: 'desc' } });
    } catch {
        return [];
    }
}

export default async function ToursPage() {
    const tours = await getTours();

    return (
        <div>
            {/* Page header */}
            <div 
                className="page-header section-padding"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1587749090392-05f5bb27f5f8?q=80&w=2070&auto=format&fit=crop')" }}
            >
                <div className="container-max px-4">
                    <span className="section-tag text-white">
                        <span className="section-tag-line bg-white" style={{ backgroundColor: '#ffffff' }} />
                        Explore
                    </span>
                    <h1 className="font-display text-4xl md:text-5xl font-bold mt-2 mb-4 text-white text-shadow-md">
                        Our Tours
                    </h1>
                    <p className="text-gray-200 max-w-lg text-shadow-sm font-medium">
                        Discover handcrafted adventures through the most stunning landscapes of Northern Pakistan.
                    </p>
                </div>
            </div>

            {/* Tours grid */}
            <section className="section-padding bg-[var(--color-surface)]">
                <div className="container-max">
                    {/* Results count */}
                    {tours.length > 0 && (
                        <div className="flex items-center justify-between mb-8">
                            <p className="text-sm text-gray-500">
                                Showing <span className="font-semibold text-[var(--color-dark)]">{tours.length}</span> tours
                            </p>
                        </div>
                    )}

                    {tours.length === 0 ? (
                        <div className="text-center py-20">
                            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                                <span className="text-3xl">🏔️</span>
                            </div>
                            <p className="text-lg font-semibold text-[var(--color-dark)] mb-2">No tours available</p>
                            <p className="text-gray-400">Check back soon for new adventures!</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {tours.map((tour: Tour) => (
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
                    )}
                </div>
            </section>
        </div>
    );
}
