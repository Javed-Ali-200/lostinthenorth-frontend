const STEPS = [
    {
        number: '01',
        title: 'Choose Destination',
        desc: 'Browse our curated list of Northern Pakistan destinations and pick your dream location.',
    },
    {
        number: '02',
        title: 'Plan Itinerary',
        desc: 'Work with our experts to build a custom day-by-day itinerary that suits your pace.',
    },
    {
        number: '03',
        title: 'Easy Booking',
        desc: 'Confirm your trip online in minutes with secure payment and instant confirmation.',
    },
    {
        number: '04',
        title: 'Adventure Awaits',
        desc: 'Show up — we handle transport, stays, and guides so you can just enjoy every moment.',
    },
];

export default function RoadToNorth() {
    return (
        <section className="py-20 md:py-28" style={{ background: '#fff' }}>
            <div className="container-max px-6">
                <div className="text-center mb-14">
                    <span
                        className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] mb-4"
                        style={{ color: '#D4A853' }}
                    >
                        <span className="h-px w-8 inline-block" style={{ background: '#D4A853' }} />
                        How It Works
                        <span className="h-px w-8 inline-block" style={{ background: '#D4A853' }} />
                    </span>
                    <h2 className="font-display text-3xl md:text-4xl font-bold text-dark">
                        The Road to the North
                    </h2>
                </div>

                {/* Steps row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
                    {/* Connecting line (desktop only) */}
                    <div
                        className="hidden lg:block absolute top-10 left-[calc(12.5%+24px)] right-[calc(12.5%+24px)] h-px"
                        style={{ background: 'linear-gradient(to right, #D4A853, #0F4C5C, #D4A853)', opacity: 0.25 }}
                    />

                    {STEPS.map((step, i) => (
                        <div key={i} className="flex flex-col items-center text-center relative">
                            {/* Circle */}
                            <div
                                className="w-20 h-20 rounded-full flex items-center justify-center mb-5 shadow-lg relative z-10"
                                style={{ background: 'linear-gradient(135deg, #0F4C5C, #1a6b82)' }}
                            >
                                <span className="font-display text-xl font-bold text-white">{step.number}</span>
                            </div>
                            <h3 className="font-display text-lg font-bold text-dark mb-2">{step.title}</h3>
                            <p className="text-gray-500 text-sm leading-relaxed max-w-[200px]">{step.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
