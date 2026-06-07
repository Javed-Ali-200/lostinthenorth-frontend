import { Star } from 'lucide-react';
import Image from 'next/image';

const JOURNALS = [
    {
        name: 'Ahmad Raza',
        location: 'Lahore',
        avatar: 'AR',
        date: 'March 2025',
        rating: 5,
        text: 'Can\'t put into words how magical the Hunza Valley trip was. The team shaped the entire route around the elements — we drove through fresh snowfall, halted for a glacier hike, and slept under the stars in Attabad. Lost in the North quite literally changed how I travel.',
        imgBg: '#0F4C5C',
    },
    {
        name: 'Sana Malik',
        location: 'Karachi',
        avatar: 'SM',
        date: 'January 2025',
        rating: 5,
        text: 'We planned a winter road trip to Skardu through this platform and it exceeded every expectation. The custom itinerary was perfectly paced, the car and guide were exceptional, and waking up to snow-covered peaks every morning felt surreal. 10/10 would return.',
        imgBg: '#D4A853',
    },
];

export default function ExpeditionJournals() {
    return (
        <section className="py-20 md:py-28" style={{ background: '#fff' }}>
            <div className="container-max px-6">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
                    <div>
                        <span
                            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] mb-3"
                            style={{ color: '#D4A853' }}
                        >
                            <span className="h-px w-8 inline-block" style={{ background: '#D4A853' }} />
                            Traveler Stories
                        </span>
                        <h2 className="font-display text-3xl md:text-4xl font-bold text-dark">
                            Expedition Journals
                        </h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {JOURNALS.map((j, i) => (
                        <div
                            key={i}
                            className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                        >
                            {/* Top color band */}
                            <div className="h-2 w-full" style={{ background: `linear-gradient(to right, ${j.imgBg}, ${i === 0 ? '#1a6b82' : '#e8c47a'})` }} />

                            <div className="p-6">
                                {/* Stars */}
                                <div className="flex gap-0.5 mb-4">
                                    {Array.from({ length: j.rating }).map((_, k) => (
                                        <Star key={k} size={14} style={{ color: '#D4A853', fill: '#D4A853' }} />
                                    ))}
                                </div>

                                {/* Quote */}
                                <p className="text-gray-600 leading-relaxed text-sm italic mb-5">
                                    &ldquo;{j.text}&rdquo;
                                </p>

                                {/* Author */}
                                <div className="flex items-center gap-3">
                                    <div
                                        className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
                                        style={{ background: 'linear-gradient(135deg, #0F4C5C, #1a6b82)' }}
                                    >
                                        {j.avatar}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-dark text-sm">{j.name}</p>
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
