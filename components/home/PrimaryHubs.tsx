'use client';

import Image from 'next/image';
import { MapPin } from 'lucide-react';
import Link from 'next/link';

const HUBS = [
    {
        name: 'Hunza Valley',
        country: 'Gilgit-Baltistan',
        tours: 24,
        img: 'https://images.unsplash.com/photo-1587749090392-05f5bb27f5f8?w=600&q=80',
    },
    {
        name: 'Skardu',
        country: 'Gilgit-Baltistan',
        tours: 18,
        img: 'https://images.unsplash.com/photo-1609139003563-84cdfdf12a49?w=600&q=80',
    },
    {
        name: 'Naran Kaghan',
        country: 'Khyber Pakhtunkhwa',
        tours: 11,
        img: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=600&q=80',
    },
    {
        name: 'Fairy Meadows',
        country: 'Diamer District',
        tours: 9,
        img: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&q=80',
    },
];

const STAT_ROW = [
    { value: 'All Inclusive', label: 'Packages' },
    { value: 'All-Seasons', label: 'Availability' },
    { value: '24-Hr Member', label: 'Support' },
    { value: 'Travel Tips', label: 'Free Guide' },
];

export default function PrimaryHubs() {
    return (
        <section className="section-padding" style={{ background: 'var(--color-surface-alt)' }}>
            <div className="container-max">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
                    <div>
                        <span className="section-tag">
                            <span className="section-tag-line" />
                            Top Locations
                        </span>
                        <h2 className="font-display text-3xl md:text-4xl font-bold text-[var(--color-dark)]">Primary Hubs</h2>
                    </div>
                    <Link
                        href="/tours"
                        className="btn btn-outline shrink-0"
                    >
                        View All →
                    </Link>
                </div>

                {/* Hub cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                    {HUBS.map((hub) => (
                        <Link
                            key={hub.name}
                            href="/tours"
                            className="relative rounded-2xl overflow-hidden group cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500"
                            style={{ height: 260 }}
                        >
                            <Image
                                src={hub.img}
                                alt={hub.name}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-700"
                                unoptimized
                            />
                            {/* Gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                            {/* Content */}
                            <div className="absolute bottom-0 inset-x-0 p-4">
                                <p className="font-display text-lg font-bold text-white leading-tight">{hub.name}</p>
                                <div className="flex items-center gap-1 mt-1">
                                    <MapPin size={11} className="text-[var(--color-accent)]" />
                                    <span className="text-xs text-white/70">{hub.country}</span>
                                </div>
                                <span
                                    className="inline-block mt-2 text-xs font-semibold px-2.5 py-1 rounded-full"
                                    style={{ background: 'var(--color-accent-15)', color: 'var(--color-accent)' }}
                                >
                                    {hub.tours} tours
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Bottom stat strip */}
                <div
                    className="rounded-2xl grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10"
                    style={{ background: 'var(--gradient-dark)' }}
                >
                    {STAT_ROW.map(({ value, label }) => (
                        <div key={label} className="py-5 px-6 text-center">
                            <p className="font-display font-bold text-white text-base md:text-lg">{value}</p>
                            <p className="text-xs mt-0.5 text-[var(--color-accent)]">{label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
