'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Users, Star, ArrowRight } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import type { Trekking } from '@/types';

interface TrekkingCardProps {
    trek: Trekking;
}

export default function TrekkingCard({ trek }: TrekkingCardProps) {
    // Determine badge
    const isSoldOut = !trek.available;
    const isPopular = trek.reviewsCount > 60;
    const isEarlyBird = trek.featured;

    return (
        <div className="group bg-white rounded-2xl border border-[var(--color-border)] shadow-sm overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            {/* Image Section */}
            <div className="relative h-64 overflow-hidden">
                <Image
                    src={trek.image || '/images/placeholder-trek.jpg'}
                    alt={trek.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {isSoldOut ? (
                        <span className="px-3 py-1 bg-[var(--color-error)] text-white text-[10px] font-bold uppercase tracking-wider rounded-md shadow-lg rotate-[-5deg]">Sold Out</span>
                    ) : isEarlyBird ? (
                        <span className="px-3 py-1 bg-[var(--color-accent)] text-white text-[10px] font-bold uppercase tracking-wider rounded-md shadow-lg rotate-[-5deg]">Early Bird</span>
                    ) : isPopular ? (
                        <span className="px-3 py-1 bg-[var(--color-primary)] text-white text-[10px] font-bold uppercase tracking-wider rounded-md shadow-lg rotate-[-5deg]">Popular</span>
                    ) : null}
                </div>

                {/* Price Badge */}
                <div className="absolute top-4 right-4 bg-[var(--color-accent)] text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg flex items-center gap-1">
                    <span className="line-through opacity-70 text-[10px]">{formatPrice(trek.price * 1.2)}</span>
                    <span>{formatPrice(trek.price)}</span>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-6">
                <h3 className="font-display text-xl font-bold text-[var(--color-dark)] mb-4 line-clamp-2 min-h-[3.5rem] group-hover:text-[var(--color-accent)] transition-colors">
                    {trek.title}
                </h3>

                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-2 text-gray-500 text-xs">
                        <Calendar size={14} className="text-[var(--color-accent)]" />
                        <span>{trek.duration} Days</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 text-xs">
                        <Users size={14} className="text-[var(--color-accent)]" />
                        <span>{trek.maxGroupSize - 4}-{trek.maxGroupSize} people</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 text-xs text-capitalize">
                        <span className="w-2 h-2 rounded-full bg-orange-400"></span>
                        <span>{trek.difficulty}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs">
                        <Star size={14} className="text-yellow-400 fill-yellow-400" />
                        <span className="font-bold text-[var(--color-dark)]">{trek.rating}</span>
                        <span className="text-gray-400">({trek.reviewsCount})</span>
                    </div>
                </div>

                <div className="flex flex-col gap-2 pt-2 border-t border-[var(--color-border)]">
                    <Link
                        href={`/trekking/${trek.id}`}
                        className="w-full flex items-center justify-center gap-2 py-3 bg-[var(--color-accent)] text-white rounded-xl font-bold text-sm hover:bg-[var(--color-accent-hover)] transition-colors shadow-sm"
                    >
                        View Details <ArrowRight size={14} />
                    </Link>
                    <button className="w-full py-3 bg-white text-[var(--color-primary)] border border-[var(--color-border)] rounded-xl font-bold text-sm hover:bg-[var(--color-primary)]/5 transition-colors">
                        Quick Book
                    </button>
                </div>
            </div>
        </div>
    );
}
