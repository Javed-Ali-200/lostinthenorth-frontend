'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, MapPin, Calendar, ArrowLeft, ArrowRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CAROUSEL_SLIDES = [
    {
        image: 'https://images.unsplash.com/photo-1527668752968-14dc70a27c95?q=80&w=2070&auto=format&fit=crop',
        title: 'Last minute deals',
        buttonText: 'Explore trips',
        link: '/tours',
    },
    {
        image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop',
        title: 'Discover Hunza Valley',
        buttonText: 'Explore trips',
        link: '/tours',
    },
    {
        image: 'https://images.unsplash.com/photo-1501555088652-021faa106b9b?q=80&w=2070&auto=format&fit=crop',
        title: 'Unforgettable Journeys',
        buttonText: 'Explore trips',
        link: '/tours',
    }
];

export default function HeroSection() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);
    const datePickerRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    // Auto-advance slides
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    // Close date picker when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) {
                setShowDatePicker(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + CAROUSEL_SLIDES.length) % CAROUSEL_SLIDES.length);
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (searchQuery) params.set('search', searchQuery);
        if (startDate) params.set('startDate', startDate);
        if (endDate) params.set('endDate', endDate);

        router.push(`/tours?${params.toString()}`);
    };

    const formatDateDisplay = () => {
        if (startDate && endDate) {
            const start = new Date(startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            const end = new Date(endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            return `${start} — ${end}`;
        }
        return 'Start date — End date';
    };

    return (
        <section className="container-max px-2 md:px-4 py-4 md:py-6 flex flex-col gap-6 md:gap-6 md:h-[calc(100vh-110px)]">
            {/* Top Search Bar */}
            <div className="w-full max-w-4xl mx-auto z-30">
                <form
                    onSubmit={handleSearch}
                    className="relative bg-white rounded-2xl md:rounded-full shadow-[0_10px_35px_rgba(0,0,0,0.08)] border border-[var(--color-border)] p-2 flex flex-col md:flex-row items-center justify-between gap-0 md:gap-0"
                >
                    {/* Destination Input */}
                    <div className="flex-1 w-full flex items-center gap-3 px-4 py-3 md:py-2">
                        <MapPin className="text-[var(--color-text-heading)] shrink-0" size={20} />
                        <input
                            type="text"
                            placeholder="Search Pakistan"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-transparent text-sm font-medium text-[var(--color-text-heading)] placeholder-[var(--color-text-muted)] outline-none"
                        />
                    </div>

                    {/* Horizontal divider on mobile / Vertical on desktop */}
                    <div className="block md:hidden w-full h-px bg-gray-100 mx-0" />
                    <div className="hidden md:block h-6 w-px bg-gray-200 self-center" />

                    {/* Date Picker Trigger */}
                    <div
                        ref={datePickerRef}
                        className="relative flex-1 w-full flex items-center gap-3 px-4 py-3 md:py-2 cursor-pointer"
                        onClick={() => setShowDatePicker(!showDatePicker)}
                    >
                        <Calendar className="text-[var(--color-text-heading)] shrink-0" size={20} />
                        <span className="block text-sm font-medium text-[var(--color-text-heading)] truncate">
                            {formatDateDisplay()}
                        </span>

                        {/* Date Picker Popover */}
                        {showDatePicker && (
                            <div
                                className="absolute top-full left-0 right-0 md:left-auto md:right-0 mt-4 bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] p-5 z-40 border border-[var(--color-border)] flex flex-col gap-4 min-w-[320px] animate-scale-in"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-2.5">
                                    <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Travel Dates</span>
                                    <button
                                        type="button"
                                        onClick={() => setShowDatePicker(false)}
                                        className="text-gray-400 hover:text-gray-600 p-1"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-1">
                                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Start Date</label>
                                        <input
                                            type="date"
                                            value={startDate}
                                            onChange={(e) => setStartDate(e.target.value)}
                                            className="w-full px-3 py-2 text-xs font-semibold text-[var(--color-text-body)] bg-[var(--color-bg-section-alt)] border border-[var(--color-border)] rounded-xl outline-none focus:border-[var(--color-accent)] focus:bg-white transition-colors"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">End Date</label>
                                        <input
                                            type="date"
                                            value={endDate}
                                            onChange={(e) => setEndDate(e.target.value)}
                                            className="w-full px-3 py-2 text-xs font-semibold text-[var(--color-text-body)] bg-[var(--color-bg-section-alt)] border border-[var(--color-border)] rounded-xl outline-none focus:border-[var(--color-accent)] focus:bg-white transition-colors"
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-between items-center mt-2 pt-3 border-t border-[var(--color-border)]">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setStartDate('');
                                            setEndDate('');
                                        }}
                                        className="text-xs font-bold text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors"
                                    >
                                        Clear Dates
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setShowDatePicker(false)}
                                        className="px-4 py-2 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white text-xs font-bold rounded-xl transition-colors shadow-sm"
                                    >
                                        Apply
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Search Button */}
                    <button
                        type="submit"
                        className="w-full md:w-auto bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white font-bold px-8 py-3 rounded-xl md:rounded-full text-sm flex items-center justify-center gap-2 transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 shrink-0 md:mr-1 mt-1 md:mt-0"
                    >
                        <span>Search</span>
                        <Search size={16} />
                    </button>
                </form>
            </div>

            {/* Carousel Slider */}
            <div className="relative w-full h-[380px] sm:h-[450px] md:h-auto md:flex-1 rounded-xl overflow-hidden shadow-2xl bg-stone-100 z-10">
                <AnimatePresence initial={false} mode="wait">
                    <motion.div
                        key={currentSlide}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease: 'easeInOut' }}
                        className="absolute inset-0"
                    >
                        {/* Slide Image with Ken Burns zoom effect */}
                        <motion.div
                            initial={{ scale: 1.05 }}
                            animate={{ scale: 1.0 }}
                            transition={{ duration: 6, ease: 'easeOut' }}
                            className="absolute inset-0 bg-cover bg-center"
                            style={{ backgroundImage: `url('${CAROUSEL_SLIDES[currentSlide].image}')` }}
                        />
                        {/* Gradient Overlay for text contrast */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                        {/* Slide Content */}
                        <div className="absolute bottom-8 left-16 sm:bottom-16 sm:left-24 max-w-2xl text-left z-10 flex flex-col gap-4 sm:gap-6 pr-6">
                            <motion.h2
                                initial={{ y: 24, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2, duration: 0.6, ease: 'easeOut' }}
                                className="text-white text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight font-sans"
                            >
                                {CAROUSEL_SLIDES[currentSlide].title}
                            </motion.h2>
                            <motion.div
                                initial={{ y: 24, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.4, duration: 0.6, ease: 'easeOut' }}
                            >
                                <Link
                                    href={CAROUSEL_SLIDES[currentSlide].link}
                                    className="inline-flex bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white font-semibold px-6 py-2.5 sm:px-8 sm:py-3 rounded-full text-xs sm:text-sm transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
                                >
                                    {CAROUSEL_SLIDES[currentSlide].buttonText}
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Left Navigation Arrow */}
                <button
                    onClick={prevSlide}
                    className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white flex items-center justify-center shadow-lg hover:bg-gray-100 active:scale-90 transition-all cursor-pointer group"
                    aria-label="Previous slide"
                >
                    <ArrowLeft className="text-black group-hover:-translate-x-0.5 transition-transform" size={20} />
                </button>

                {/* Right Navigation Arrow */}
                <button
                    onClick={nextSlide}
                    className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white flex items-center justify-center shadow-lg hover:bg-gray-100 active:scale-90 transition-all cursor-pointer group"
                    aria-label="Next slide"
                >
                    <ArrowRight className="text-black group-hover:translate-x-0.5 transition-transform" size={20} />
                </button>
            </div>
        </section>
    );
}
