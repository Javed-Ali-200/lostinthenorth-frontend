'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, MapPin, ChevronDown } from 'lucide-react';

const HERO_IMAGES = [
    'https://images.unsplash.com/photo-1627856013091-fed6e4e30025?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1587749090392-05f5bb27f5f8?q=80&w=1974&auto=format&fit=crop',
];

const SEARCH_TABS = ['Tours', 'Hotels', 'Cars'] as const;

export default function HeroSection() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [activeTab, setActiveTab] = useState<typeof SEARCH_TABS[number]>('Tours');
    const router = useRouter();

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % HERO_IMAGES.length);
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const route = activeTab === 'Tours' ? '/tours' : activeTab === 'Hotels' ? '/hotels' : '/cars';
        router.push(route);
    };

    return (
        <section className="container-max px-4 py-4 md:py-6">
            <div className="relative h-[580px] md:h-[650px] rounded-3xl md:rounded-[40px] overflow-hidden shadow-2xl bg-stone-100">
                {/* Background Slideshow */}
                {HERO_IMAGES.map((img, i) => (
                    <div
                        key={img}
                        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-[1500ms] ${
                            i === currentSlide ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
                        }`}
                        style={{
                            backgroundImage: `url('${img}')`,
                            transition: 'opacity 1.5s ease, transform 8s ease',
                        }}
                    />
                ))}

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                    {/* Top Tagline */}
                    <span
                        className="text-xs md:text-sm font-bold uppercase tracking-[0.3em] mb-4 animate-fade-in"
                        style={{ color: 'var(--color-accent)' }}
                    >
                        You have a world to see
                    </span>

                    {/* Main Heading */}
                    <h1 className="text-white text-3xl md:text-5xl lg:text-7xl font-bold leading-tight mb-6 animate-fade-in-up">
                        Beautiful One Day,{' '}
                        <span className="font-dancing italic" style={{ color: 'var(--color-accent)' }}>Perfect</span>{' '}
                        The Next
                    </h1>

                    {/* Description */}
                    <p className="text-white/80 text-sm md:text-base max-w-2xl leading-relaxed mb-10">
                        Discover the raw beauty of Northern Pakistan — pristine peaks,
                        emerald lakes, and glacier valleys that take your breath away.
                    </p>

                    {/* Search Widget */}
                    <div className="w-full max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: '300ms' }}>
                        <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden">
                            {/* Search Tabs */}
                            <div className="flex border-b border-gray-100">
                                {SEARCH_TABS.map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`flex-1 py-3 text-xs font-bold uppercase tracking-widest transition-all ${
                                            activeTab === tab
                                                ? 'text-[var(--color-primary)] border-b-2 border-[var(--color-accent)] bg-white'
                                                : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
                                        }`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>

                            {/* Search Form */}
                            <form onSubmit={handleSearch} className="p-4 flex flex-col sm:flex-row gap-3">
                                <div className="flex-1 flex items-center gap-2.5 bg-gray-50 rounded-xl px-4 py-3 border border-gray-100">
                                    <MapPin size={16} className="text-[var(--color-accent)] shrink-0" />
                                    <input
                                        type="text"
                                        placeholder={
                                            activeTab === 'Tours' ? 'Where do you want to go?'
                                            : activeTab === 'Hotels' ? 'Search hotels...'
                                            : 'Pick-up location...'
                                        }
                                        className="w-full bg-transparent text-sm text-gray-800 placeholder-gray-400 outline-none"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="flex items-center justify-center gap-2 px-8 py-3 rounded-xl font-bold text-white text-sm transition-all hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
                                    style={{ background: 'var(--gradient-primary-light)' }}
                                >
                                    <Search size={16} />
                                    <span>Search</span>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Slide Indicators */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                    {HERO_IMAGES.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentSlide(i)}
                            className={`h-1.5 rounded-full transition-all duration-500 ${
                                i === currentSlide
                                    ? 'w-8 bg-[var(--color-accent)]'
                                    : 'w-2 bg-white/40 hover:bg-white/60'
                            }`}
                            aria-label={`Go to slide ${i + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
