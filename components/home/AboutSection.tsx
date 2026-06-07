import Image from 'next/image';
import { CheckCircle } from 'lucide-react';

const POINTS = [
    'Handcrafted itineraries built by local mountaineers',
    'Luxury & budget options across every destination',
    'Safety-first approach with certified expedition guides',
];

export default function AboutSection() {
    return (
        <section className="py-20 md:py-28" style={{ background: '#fff' }}>
            <div className="container-max px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                    {/* Images collage */}
                    <div className="relative h-80 sm:h-96 lg:h-[460px] flex-shrink-0">
                        {/* Large back image */}
                        <div className="absolute left-0 top-0 w-3/4 h-4/5 rounded-2xl overflow-hidden shadow-xl">
                            <Image
                                src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80"
                                alt="Mountain landscape"
                                fill
                                className="object-cover"
                                unoptimized
                            />
                        </div>
                        {/* Small front image */}
                        <div
                            className="absolute right-0 bottom-0 w-44 sm:w-56 h-36 sm:h-44 rounded-2xl overflow-hidden shadow-2xl border-4 border-white"
                        >
                            <Image
                                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80"
                                alt="Snowy peaks"
                                fill
                                className="object-cover"
                                unoptimized
                            />
                        </div>
                        {/* Years badge */}
                        <div
                            className="absolute right-4 top-4 w-20 h-20 rounded-full flex flex-col items-center justify-center text-white text-center shadow-lg"
                            style={{ background: 'linear-gradient(135deg, #0F4C5C, #1a6b82)' }}
                        >
                            <span className="font-display text-2xl font-bold leading-none">10+</span>
                            <span className="text-xs opacity-80 leading-tight">Years</span>
                        </div>
                    </div>

                    {/* Text */}
                    <div>
                        <span
                            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] mb-4"
                            style={{ color: '#D4A853' }}
                        >
                            <span className="h-px w-8 inline-block" style={{ background: '#D4A853' }} />
                            About Us
                        </span>
                        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-dark leading-tight mb-5">
                            A Journey Crafted<br />by the Elements
                        </h2>
                        <p className="text-gray-500 leading-relaxed mb-5">
                            We are a team of passionate mountaineers and travel architects based in Northern Pakistan.
                            Since 2014, we&apos;ve guided thousands of adventurers through the world&apos;s most
                            dramatic landscapes — from K2 base camp to the ancient Silk Road.
                        </p>
                        <p className="text-gray-500 leading-relaxed mb-7">
                            Every expedition is a story we tell together. Whether you&apos;re chasing aurora borealis,
                            trekking glaciers, or relaxing in a riverside lodge, we make sure every moment is
                            extraordinary.
                        </p>

                        {/* Bullet points */}
                        <div className="space-y-3 mb-8">
                            {POINTS.map((pt) => (
                                <div key={pt} className="flex items-start gap-3 text-sm text-gray-700">
                                    <CheckCircle size={17} className="shrink-0 mt-0.5" style={{ color: '#0F4C5C' }} />
                                    {pt}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
