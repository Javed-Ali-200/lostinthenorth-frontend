import Link from 'next/link';

export default function CustomTripBanner() {
    return (
        <section
            className="relative overflow-hidden py-8 md:py-12"
            style={{ background: 'var(--gradient-primary)' }}
        >
            {/* Decorative aurora blobs */}
            <div className="absolute top-0 left-1/3 w-96 h-96 rounded-full blur-3xl opacity-10 pointer-events-none" style={{ background: 'radial-gradient(circle, var(--color-primary-light), transparent)' }} />
            <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full blur-3xl opacity-20 pointer-events-none" style={{ background: 'radial-gradient(circle, var(--color-accent), transparent)' }} />

            <div className="container-max px-6 relative z-10">
                <div className="max-w-xl">
                    <span className="section-tag">
                        <span className="section-tag-line" />
                        Tailored Journeys
                    </span>
                    <h2 className="font-display text-2xl md:text-3xl font-bold text-white leading-snug mb-3">
                        Your Dream Trip, <span className="text-[var(--color-accent)] italic">Designed by Experts</span>
                    </h2>
                    <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-md">
                        Tell us your vision and we&apos;ll craft a fully personalised itinerary — transport, stays, and guides included.
                    </p>
                    <Link
                        href="/custom-trip"
                        className="btn bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-dark)] shadow-lg hover:shadow-xl"
                    >
                        Plan My Custom Trip →
                    </Link>
                </div>
            </div>
        </section>
    );
}
