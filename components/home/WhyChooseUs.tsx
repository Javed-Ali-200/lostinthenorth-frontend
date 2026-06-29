import { Shield, Award, Headphones, Map, Star, Clock } from 'lucide-react';

const features = [
    {
        icon: Shield,
        title: 'Safe & Secure',
        description: 'All our tours are planned with safety protocols and experienced local guides.',
    },
    {
        icon: Award,
        title: 'Expert Guides',
        description: 'Certified mountain guides and local experts with 10+ years of experience.',
    },
    {
        icon: Headphones,
        title: '24/7 Support',
        description: 'Our team is available round the clock to assist you during your journey.',
    },
    {
        icon: Map,
        title: 'Curated Routes',
        description: 'Carefully planned itineraries that cover the best hidden gems of the north.',
    },
    {
        icon: Star,
        title: 'Premium Quality',
        description: 'From accommodation to meals, we ensure premium quality at every step.',
    },
    {
        icon: Clock,
        title: 'Flexible Bookings',
        description: 'Easy modification and cancellation policies for worry-free travel planning.',
    },
];

export default function WhyChooseUs() {
    return (
        <section className="section-padding bg-[var(--color-dark)]" id="why-us">
            <div className="container-max">
                {/* Header */}
                <div className="text-center mb-14">
                    <span className="section-tag justify-center">
                        <span className="section-tag-line" />
                        Why Choose Us
                        <span className="section-tag-line" />
                    </span>
                    <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
                        Your Journey, Our Passion
                    </h2>
                    <p className="text-gray-300 max-w-xl mx-auto">
                        We&apos;ve been crafting unforgettable experiences in Northern Pakistan for over a
                        decade. Here&apos;s what makes us different.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {features.map(({ icon: Icon, title, description }) => (
                        <div
                            key={title}
                            className="card-glass group p-6 rounded-2xl cursor-default hover:border-[var(--color-accent)]/30"
                        >
                            <div
                                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300"
                                style={{ background: 'var(--color-accent-10)' }}
                            >
                                <Icon size={22} className="text-[var(--color-accent)]" />
                            </div>
                            <h3 className="font-display text-lg font-semibold text-white mb-2">{title}</h3>
                            <p className="text-gray-300 text-sm leading-relaxed">{description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
