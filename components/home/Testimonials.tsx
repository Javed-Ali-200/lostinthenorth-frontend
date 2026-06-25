'use client';

import { Star, Quote } from 'lucide-react';
import { useState } from 'react';

const JOURNALS = [
    {
        name: 'Ahmad Raza',
        location: 'Lahore',
        avatar: 'AR',
        date: 'March 2025',
        rating: 5,
        text: 'Can\'t put into words how magical the Hunza Valley trip was. The team shaped the entire route around the elements — we drove through fresh snowfall, halted for a glacier hike, and slept under the stars in Attabad. Lost in the North quite literally changed how I travel.',
        gradient: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-light))',
    },
    {
        name: 'Sana Malik',
        location: 'Karachi',
        avatar: 'SM',
        date: 'January 2025',
        rating: 5,
        text: 'We planned a winter road trip to Skardu through this platform and it exceeded every expectation. The custom itinerary was perfectly paced, the car and guide were exceptional, and waking up to snow-covered peaks every morning felt surreal. 10/10 would return.',
        gradient: 'linear-gradient(135deg, var(--color-accent-dark), var(--color-accent))',
    },
    {
        name: 'Hassan Ali',
        location: 'Islamabad',
        avatar: 'HA',
        date: 'September 2024',
        rating: 5,
        text: 'Fairy Meadows exceeded all expectations. The trek was perfectly guided, the campsite was immaculate, and the view of Nanga Parbat at sunrise is something I\'ll carry forever. The team handled every detail seamlessly — couldn\'t have asked for a better experience.',
        gradient: 'linear-gradient(135deg, var(--color-primary-dark), var(--color-primary))',
    },
];

export default function ExpeditionJournals() {
    return (
        <section className="section-padding" style={{ background: 'var(--color-surface-white)' }}>
            <div className="container-max">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
                    <div>
                        <span className="section-tag">
                            <span className="section-tag-line" />
                            Traveler Stories
                        </span>
                        <h2 className="font-display text-3xl md:text-4xl font-bold text-[var(--color-dark)]">
                            Expedition Journals
                        </h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {JOURNALS.map((j, i) => (
                        <div
                            key={i}
                            className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 overflow-hidden flex flex-col"
                        >
                            {/* Top color band */}
                            <div className="h-1.5 w-full" style={{ background: j.gradient }} />

                            <div className="p-6 flex flex-col flex-grow">
                                {/* Quote icon */}
                                <div className="mb-4">
                                    <Quote size={28} className="text-[var(--color-accent)]/30" style={{ opacity: 0.2 }} />
                                </div>

                                {/* Stars */}
                                <div className="flex gap-0.5 mb-4">
                                    {Array.from({ length: j.rating }).map((_, k) => (
                                        <Star key={k} size={14} className="text-[var(--color-accent)] fill-[var(--color-accent)]" />
                                    ))}
                                </div>

                                {/* Quote */}
                                <p className="text-gray-600 leading-relaxed text-sm mb-5 flex-grow">
                                    &ldquo;{j.text}&rdquo;
                                </p>

                                {/* Author */}
                                <div className="flex items-center gap-3 pt-4 border-t border-gray-50">
                                    <div
                                        className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
                                        style={{ background: j.gradient }}
                                    >
                                        {j.avatar}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-[var(--color-dark)] text-sm">{j.name}</p>
                                        <p className="text-xs text-gray-400">{j.location} · {j.date}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
