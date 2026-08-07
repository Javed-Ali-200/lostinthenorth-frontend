import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import TrekkingDetailClient from './TrekkingDetailClient';

interface Props { params: Promise<{ id: string }> }

export default async function TrekkingDetailPage({ params }: Props) {
    const { id } = await params;
    try {
        const trek = await prisma.trekking.findUnique({ where: { id } });
        if (!trek) notFound();
        return <TrekkingDetailClient trek={trek} />;
    } catch {
        notFound();
    }
}
