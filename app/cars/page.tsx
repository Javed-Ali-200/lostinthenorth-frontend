import prisma from '@/lib/prisma';
import ServiceCard from '@/components/shared/ServiceCard';
import type { Car } from '@/types';

export const metadata = {
    title: 'Car Rentals – The Lost in the North',
    description: 'Reliable vehicles for mountain terrain — from 4x4 SUVs to comfortable sedans.',
};

async function getCars() {
    try {
        return await prisma.car.findMany({ orderBy: { createdAt: 'desc' } });
    } catch {
        return [];
    }
}

export default async function CarsPage() {
    const cars = await getCars();

    return (
        <div>
            <div 
                className="page-header section-padding"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=2070&auto=format&fit=crop')" }}
            >
                <div className="container-max px-4">
                    <span className="section-tag text-white">
                        <span className="section-tag-line bg-white" style={{ backgroundColor: '#ffffff' }} />
                        Transportation
                    </span>
                    <h1 className="font-display text-4xl md:text-5xl font-bold mt-2 mb-4 text-white text-shadow-md">
                        Car Rentals
                    </h1>
                    <p className="text-gray-200 max-w-lg text-shadow-sm font-medium">
                        Reliable vehicles for mountain terrain — from 4x4 SUVs to comfortable sedans.
                    </p>
                </div>
            </div>

            <section className="section-padding bg-[var(--color-surface)]">
                <div className="container-max">
                    {cars.length > 0 && (
                        <div className="flex items-center justify-between mb-8">
                            <p className="text-sm text-[var(--color-text-muted)]">
                                Showing <span className="font-semibold text-[var(--color-dark)]">{cars.length}</span> vehicles
                            </p>
                        </div>
                    )}

                    {cars.length === 0 ? (
                        <div className="text-center py-20">
                            <div className="w-20 h-20 rounded-full bg-[var(--color-surface-alt)] flex items-center justify-center mx-auto mb-4">
                                <span className="text-3xl">🚙</span>
                            </div>
                            <p className="text-lg font-semibold text-[var(--color-dark)] mb-2">No vehicles available</p>
                            <p className="text-[var(--color-text-muted)]">Check back soon for rental options!</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {cars.map((car: Car) => (
                                <ServiceCard
                                    key={car.id}
                                    id={car.id}
                                    type="car"
                                    image={car.images?.[0] || car.image || ''}
                                    title={car.name}
                                    pricePerDay={car.pricePerDay}
                                    description={`${car.type} · ${car.transmission} · ${car.fuelType}`}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
