import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import HotelDetailClient from './HotelDetailClient';

interface Props { params: Promise<{ id: string }> }

export default async function HotelDetailPage({ params }: Props) {
    const { id } = await params;
    try {
        const hotel = await prisma.hotel.findUnique({ where: { id } });
        if (!hotel) notFound();
        return <HotelDetailClient hotel={hotel} />;
    } catch {
        notFound();
    }
}
