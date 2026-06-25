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
            <div className="page-header section-padding">
                <div className="container-max">
                    <span className="section-tag">
                        <span className="section-tag-line" />
                        Transportation
                    </span>
                    <h1 className="font-display text-4xl md:text-5xl font-bold mt-2 mb-4">
                        Car Rentals
                    </h1>
                    <p className="text-gray-400 max-w-lg">
                        Reliable vehicles for mountain terrain — from 4x4 SUVs to comfortable sedans.
                    </p>
                </div>
            </div>

            <section className="section-padding bg-[var(--color-surface)]">
                <div className="container-max">
                    {cars.length > 0 && (
                        <div className="flex items-center justify-between mb-8">
                            <p className="text-sm text-gray-500">
                                Showing <span className="font-semibold text-[var(--color-dark)]">{cars.length}</span> vehicles
                            </p>
                        </div>
                    )}

                    {cars.length === 0 ? (
                        <div className="text-center py-20">
                            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                                <span className="text-3xl">🚙</span>
                            </div>
                            <p className="text-lg font-semibold text-[var(--color-dark)] mb-2">No vehicles available</p>
                            <p className="text-gray-400">Check back soon for rental options!</p>
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
