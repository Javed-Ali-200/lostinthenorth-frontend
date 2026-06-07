import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function CustomTripBanner() {
    return (
        <section
            className="relative overflow-hidden py-20 md:py-28"
            style={{ background: 'linear-gradient(135deg, #063440 0%, #0F4C5C 50%, #063440 100%)' }}
        >
            {/* Decorative aurora blobs */}
            <div className="absolute top-0 left-0 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none" style={{ background: 'radial-gradient(circle, #1a6b82, transparent)' }} />
            <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full blur-3xl opacity-20 pointer-events-none" style={{ background: 'radial-gradient(circle, #D4A853, transparent)' }} />

            <div className="container-max px-6 relative z-10">
                <div className="max-w-xl">
                    <span
                        className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] mb-4"
                        style={{ color: '#D4A853' }}
                    >
                        <span className="h-px w-8 inline-block" style={{ background: '#D4A853' }} />
                        Plan Your Trip
                    </span>
                    <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-5">
                        Stay Lost in the<br />
                        <span style={{ color: '#D4A853', fontStyle: 'italic' }}>Right Direction</span>
                    </h2>
                    <p className="text-white/60 leading-relaxed mb-8 text-base">
                        Let our expedition architects craft your perfect Northern Pakistan journey.
                        Tell us your dream, and we&apos;ll turn it into an itinerary you&apos;ll
                        never forget.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link
                            href="/custom-trip"
                            className="group flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white text-sm transition-all hover:-translate-y-0.5 hover:shadow-lg"
                            style={{ background: '#D4A853' }}
                        >
                            Start Planning
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link
                            href="/tours"
                            className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white/80 text-sm border transition-all hover:bg-white/10"
                            style={{ borderColor: 'rgba(255,255,255,0.2)' }}
                        >
                            Browse Expeditions
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
