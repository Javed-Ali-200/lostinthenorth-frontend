import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import TourDetailClient from './TourDetailClient';

interface Props { params: Promise<{ id: string }> }

async function getTour(id: string) {
    try {
        return await prisma.tour.findUnique({ where: { id } });
    } catch {
        return null;
    }
}

export default async function TourDetailPage({ params }: Props) {
    const { id } = await params;
    const tour = await getTour(id);
    if (!tour) notFound();

    return <TourDetailClient tour={tour} />;
}
