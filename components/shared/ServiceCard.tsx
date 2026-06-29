'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Clock, Calendar, MapPin, Heart, Star } from 'lucide-react';
import { useState } from 'react';

interface ServiceCardProps {
    id: string;
    type: 'tour' | 'hotel' | 'car';
    image: string;
    title: string;
    location?: string;
    duration?: number | string;
    description: string;
    price?: number;
    pricePerNight?: number;
    pricePerDay?: number;
    rating?: number;
}

export default function ServiceCard({
    id, type, image, title, location, duration, description,
    price, pricePerNight, pricePerDay, rating,
}: ServiceCardProps) {
    const [liked, setLiked] = useState(false);
    const detailHref = `/${type}s/${id}`;

    const displayPrice = price || pricePerNight || pricePerDay || 0;
    const priceLabel = pricePerNight ? '/night' : pricePerDay ? '/day' : '/person';
    const buttonText = type === 'tour' ? 'View Tour' : type === 'hotel' ? 'View Hotel' : 'View Car';

    return (
        <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-[var(--color-border)] flex flex-col h-full hover:-translate-y-1">
            {/* Image Section */}
            <div className="relative h-56 overflow-hidden shrink-0">
                <Image
                    src={image || '/placeholder-travel.jpg'}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    unoptimized={image?.startsWith('http')}
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                {/* Wishlist button */}
                <button
                    onClick={(e) => { e.preventDefault(); setLiked(!liked); }}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md hover:bg-white transition-all z-10"
                    aria-label="Add to wishlist"
                >
                    <Heart
                        size={15}
                        className={`transition-colors ${liked ? 'text-red-500 fill-red-500' : 'text-gray-500'}`}
                    />
                </button>

                {/* Rating badge */}
                {rating && rating > 0 && (
                    <div className="absolute top-3 left-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full shadow-sm">
                        <Star size={12} className="text-[var(--color-accent)] fill-[var(--color-accent)]" />
                        <span className="text-xs font-bold text-gray-800">{rating.toFixed(1)}</span>
                    </div>
                )}

                {/* Bottom info bar */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2 z-10">
                    {duration && (
                        <span className="flex items-center gap-1.5 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full shadow-sm">
                            <Clock size={12} className="text-[var(--color-accent)]" />
                            <span className="text-[10px] font-semibold text-gray-700 uppercase tracking-wider">
                                {duration} {typeof duration === 'number' ? 'Days' : ''}
                            </span>
                        </span>
                    )}
                    <span className="flex items-center gap-1.5 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full shadow-sm">
                        <Calendar size={12} className="text-[var(--color-accent)]" />
                        <span className="text-[10px] font-semibold text-gray-700 uppercase tracking-wider">All Year</span>
                    </span>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-5 flex flex-col flex-grow">
                {/* Title & Location */}
                <div className="mb-3">
                    <h3 className="font-display font-bold text-lg text-[var(--color-dark)] mb-1.5 leading-tight line-clamp-2 group-hover:text-[var(--color-accent)] transition-colors">
                        {title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-[var(--color-text-muted)]">
                        <MapPin size={13} className="text-[var(--color-accent)] shrink-0" />
                        <span className="text-xs font-medium tracking-wide">{location || 'Northern Pakistan'}</span>
                    </div>
                </div>

                <p className="text-[var(--color-text-body)] text-[13px] leading-relaxed line-clamp-2 mb-4 flex-grow">
                    {description}
                </p>

                {/* Price + CTA */}
                <div className="border-t border-[var(--color-border)] pt-4 flex items-center justify-between">
                    {displayPrice > 0 ? (
                        <div>
                            <span className="font-display text-xl font-bold text-[var(--color-accent)]">
                                PKR {displayPrice.toLocaleString()}
                            </span>
                            <span className="text-xs text-[var(--color-text-muted)] ml-1">{priceLabel}</span>
                        </div>
                    ) : (
                        <span className="text-sm text-[var(--color-text-muted)]">Contact for price</span>
                    )}

                    <Link
                        href={detailHref}
                        className="btn btn-sm bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)] transition-all text-[11px]"
                    >
                        {buttonText}
                    </Link>
                </div>
            </div>
        </div>
    );
}
