import { notFound } from 'next/navigation';
import { trekkingApi } from '@/services/api';
import TrekkingDetailClient from './TrekkingDetailClient';

interface Props { params: Promise<{ id: string }> }

export default async function TrekkingDetailPage({ params }: Props) {
    const { id } = await params;
    try {
        const res = await trekkingApi.getById(id);
        if (!res.data.data) notFound();
        return <TrekkingDetailClient trek={res.data.data} />;
    } catch {
        notFound();
    }
}
