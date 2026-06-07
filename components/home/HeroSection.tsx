'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const HERO_IMAGES = [
    'https://images.unsplash.com/photo-1518391846015-55a9cc003b25?q=80&w=2070&auto=format&fit=crop', // Karachi/Desert vibe
    'https://images.unsplash.com/photo-1587749090392-05f5bb27f5f8?q=80&w=1974&auto=format&fit=crop', // Northern vibe
];

export default function HeroSection() {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % HERO_IMAGES.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="container-max px-4 py-6">
            <div className="relative h-[650px] rounded-[40px] overflow-hidden shadow-2xl bg-stone-100">
                {/* Background Slideshow */}
                {HERO_IMAGES.map((img, i) => (
                    <div
                        key={img}
                        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
                            i === currentSlide ? 'opacity-100' : 'opacity-0'
                        }`}
                        style={{ backgroundImage: `url('${img}')` }}
                    />
                ))}

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                    {/* Top Tagline */}
                    <span className="text-[#4fd1c5] font-bold text-lg md:text-xl uppercase tracking-[0.3em] mb-4">
                        You have a world to see
                    </span>

                    {/* Main Heading */}
                    <h1 className="text-white text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8">
                        Beautiful One Day,{' '}
                        <span className="font-dancing text-[#d4a853] italic">Perfect</span>{' '}
                        The Next
                    </h1>

                    {/* Description */}
                    <p className="text-white/90 text-sm md:text-base max-w-2xl leading-relaxed mb-10">
                        Discover the raw beauty of Northern Pakistan — pristine peaks,
                        emerald lakes, and glacier valleys that take your breath away.
                    </p>

                    {/* Divider */}
                    <div className="w-64 h-px bg-white/30 mb-10" />

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                        <Link
                            href="/about"
                            className="px-10 py-3 bg-[#d4a853] text-black font-bold text-sm rounded-lg hover:bg-[#c49843] transition-all shadow-lg"
                        >
                            Learn More About Us
                        </Link>
                        <Link
                            href="/tours"
                            className="px-10 py-3 bg-[#00748c] text-white font-bold text-sm rounded-lg hover:bg-[#005f73] transition-all shadow-lg"
                        >
                            Book a Tour Now!
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
