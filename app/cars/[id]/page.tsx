import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import CarDetailClient from './CarDetailClient';

interface Props { params: Promise<{ id: string }> }

export default async function CarDetailPage({ params }: Props) {
    const { id } = await params;
    try {
        const car = await prisma.car.findUnique({ where: { id } });
        if (!car) notFound();
        return <CarDetailClient car={car} />;
    } catch {
        notFound();
    }
}
