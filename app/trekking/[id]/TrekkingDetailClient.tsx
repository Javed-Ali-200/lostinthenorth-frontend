'use client';

import { useState } from 'react';
import Image from 'next/image';
import { 
    Calendar, Users, MapPin, Star, Check, X, Shield, 
    ChevronRight, ArrowLeft, Loader2, Info, Mountain 
} from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { bookingApi } from '@/services/api';
import type { Trekking, BookingFormData } from '@/types';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Props { trek: Trekking; }

export default function TrekkingDetailClient({ trek }: Props) {
    const router = useRouter();
    const [selectedImage, setSelectedImage] = useState(trek.image || trek.images?.[0] || '');
    const [bookingData, setBookingData] = useState<BookingFormData>({
        customerName: '',
        customerEmail: '',
        customerPhone: '',
        serviceType: 'TREKKING',
        serviceId: trek.id,
        startDate: '',
        endDate: '',
        numberOfPeople: 1,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!bookingData.startDate || !bookingData.endDate) {
            return toast.error('Please select both start and end dates');
        }

        setIsSubmitting(true);
        try {
            const res = await bookingApi.create(bookingData);
            toast.success('Booking requested successfully!');
            router.push(`/track-booking?ref=${res.data.data.bookingNumber}&email=${res.data.data.customerEmail}`);
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Failed to submit booking');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-white min-h-screen">
            {/* Navigation & Header */}
            <div className="pt-24 pb-12 bg-dark text-white relative">
                <div className="absolute inset-0 overflow-hidden opacity-30">
                     <Image src={trek.image || ''} fill alt="" className="object-cover blur-2xl" />
                </div>
                <div className="container-max relative z-10 px-4">
                    <Link href="/trekking" className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8 group">
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        <span>Back to all trekkings</span>
                    </Link>

                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <span className="px-3 py-1 bg-[var(--color-primary)] rounded-lg text-[10px] font-bold tracking-widest uppercase">{trek.difficulty}</span>
                                <div className="flex items-center gap-1.5 text-xs text-white/60">
                                    <MapPin size={14} className="text-[var(--color-primary)]" />
                                    <span>{trek.location}</span>
                                </div>
                            </div>
                            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4">{trek.title}</h1>
                            <div className="flex flex-wrap items-center gap-6 text-sm">
                                <span className="flex items-center gap-2">
                                    <Calendar className="text-[var(--color-primary)]" size={18} />
                                    <span className="font-bold">{trek.duration} Days Expedition</span>
                                </span>
                                <span className="flex items-center gap-2">
                                    <Users className="text-[var(--color-primary)]" size={18} />
                                    <span className="font-bold">Max {trek.maxGroupSize} People</span>
                                </span>
                                <span className="flex items-center gap-2">
                                    <Star className="text-yellow-400 fill-yellow-400" size={18} />
                                    <span className="font-bold">{trek.rating}</span>
                                    <span className="text-white/40">({trek.reviewsCount} reviews)</span>
                                </span>
                            </div>
                        </div>
                        <div className="hidden lg:block text-right">
                            <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-1">Starting from</p>
                            <p className="text-4xl font-bold text-[var(--color-primary)]">{formatPrice(trek.price)}</p>
                            <p className="text-white/40 text-[10px] mt-1">all taxes included</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Gallery Section */}
            <section className="py-12 bg-[var(--color-surface)]">
                <div className="container-max px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        <div className="lg:col-span-8 space-y-4">
                            <div className="relative aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl">
                                <Image src={selectedImage} alt={trek.title} fill className="object-cover" priority />
                            </div>
                            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                                {[trek.image, ...trek.images].filter(Boolean).map((img, i) => (
                                    <button 
                                        key={i} 
                                        onClick={() => setSelectedImage(img!)}
                                        className={`relative w-24 aspect-square rounded-xl overflow-hidden shrink-0 border-2 transition-all ${selectedImage === img ? 'border-[var(--color-primary)] scale-105' : 'border-transparent opacity-60 hover:opacity-100'}`}
                                    >
                                        <Image src={img!} alt="" fill className="object-cover" />
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="lg:col-span-4 space-y-6">
                            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm sticky top-28">
                                <div className="mb-8">
                                    <h3 className="font-display text-xl font-bold text-dark mb-4 flex items-center gap-2">
                                        <Calendar className="text-[var(--color-primary)]" size={20} /> Reserve your spot
                                    </h3>
                                    <p className="text-sm text-gray-500 font-light leading-relaxed">Select your preferred dates and group size. Our team will contact you for a briefing.</p>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-4 text-dark font-medium">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-[10px] uppercase font-bold text-gray-400 mb-2">Arrival Date</label>
                                            <input 
                                                type="date" 
                                                required 
                                                value={bookingData.startDate}
                                                onChange={e => setBookingData(p => ({ ...p, startDate: e.target.value }))}
                                                className="w-full bg-stone-50 border-none rounded-xl px-4 py-3 text-xs focus:ring-2 focus:ring-[var(--color-primary)]/20"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] uppercase font-bold text-gray-400 mb-2">Departure Date</label>
                                            <input 
                                                type="date" 
                                                required 
                                                value={bookingData.endDate}
                                                onChange={e => setBookingData(p => ({ ...p, endDate: e.target.value }))}
                                                className="w-full bg-stone-50 border-none rounded-xl px-4 py-3 text-xs focus:ring-2 focus:ring-[var(--color-primary)]/20"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-[10px] uppercase font-bold text-gray-400 mb-2">Group Size (People)</label>
                                        <input 
                                            type="number" 
                                            min={1} 
                                            max={trek.maxGroupSize} 
                                            required 
                                            value={bookingData.numberOfPeople}
                                            onChange={e => setBookingData(p => ({ ...p, numberOfPeople: parseInt(e.target.value) }))}
                                            className="w-full bg-stone-50 border-none rounded-xl px-4 py-3 text-xs focus:ring-2 focus:ring-[var(--color-primary)]/20"
                                        />
                                    </div>

                                    <div className="pt-4 space-y-3">
                                        <input 
                                            type="text" 
                                            placeholder="Your Full Name" 
                                            required
                                            value={bookingData.customerName}
                                            onChange={e => setBookingData(p => ({ ...p, customerName: e.target.value }))}
                                            className="w-full bg-stone-50 border-none rounded-xl px-4 py-3 text-xs focus:ring-2 focus:ring-[var(--color-primary)]/20" 
                                        />
                                        <input 
                                            type="email" 
                                            placeholder="Your Email Address" 
                                            required
                                            value={bookingData.customerEmail}
                                            onChange={e => setBookingData(p => ({ ...p, customerEmail: e.target.value }))}
                                            className="w-full bg-stone-50 border-none rounded-xl px-4 py-3 text-xs focus:ring-2 focus:ring-[var(--color-primary)]/20" 
                                        />
                                        <input 
                                            type="tel" 
                                            placeholder="Your Phone Number" 
                                            required
                                            value={bookingData.customerPhone}
                                            onChange={e => setBookingData(p => ({ ...p, customerPhone: e.target.value }))}
                                            className="w-full bg-stone-50 border-none rounded-xl px-4 py-3 text-xs focus:ring-2 focus:ring-[var(--color-primary)]/20" 
                                        />
                                    </div>

                                    <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
                                        <div className="text-dark">
                                            <p className="text-xs font-bold">Total Estimate</p>
                                            <p className="text-2xl font-bold text-[var(--color-primary)]">{formatPrice(trek.price * bookingData.numberOfPeople)}</p>
                                        </div>
                                        <button 
                                            disabled={isSubmitting}
                                            className="bg-dark hover:bg-[var(--color-primary)] text-white w-32 py-4 rounded-2xl font-bold text-sm transition-all shadow-lg active:scale-95 disabled:opacity-50"
                                        >
                                            {isSubmitting ? <Loader2 size={18} className="animate-spin mx-auto" /> : 'Request'}
                                        </button>
                                    </div>

                                    <p className="text-[10px] text-gray-400 text-center flex items-center justify-center gap-1">
                                        <Shield size={10} className="text-[var(--color-success)]" /> Secure payment handled post-briefing
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Description & Details */}
            <section className="py-24 overflow-hidden">
                <div className="container-max px-4">
                    <div className="flex flex-col lg:flex-row gap-20">
                        <div className="lg:w-2/3 space-y-16">
                            {/* Overview */}
                            <div className="space-y-6">
                                <h2 className="font-display text-3xl font-bold text-dark flex items-center gap-3">
                                    <Info className="text-[var(--color-primary)]" /> Expedition Overview
                                </h2>
                                <div className="text-gray-600 leading-relaxed font-light text-lg whitespace-pre-wrap">
                                    {trek.description}
                                </div>

                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
                                    <div className="p-6 bg-[var(--color-surface-alt)] rounded-2xl border border-gray-100">
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Duration</p>
                                        <p className="text-xl font-bold text-dark">{trek.duration} Days</p>
                                    </div>
                                    <div className="p-6 bg-[var(--color-surface-alt)] rounded-2xl border border-gray-100">
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Difficulty</p>
                                        <p className="text-xl font-bold text-dark">{trek.difficulty}</p>
                                    </div>
                                    <div className="p-6 bg-[var(--color-surface-alt)] rounded-2xl border border-gray-100">
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Max Group</p>
                                        <p className="text-xl font-bold text-dark">{trek.maxGroupSize} People</p>
                                    </div>
                                    <div className="p-6 bg-[var(--color-surface-alt)] rounded-2xl border border-gray-100">
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Elevation</p>
                                        <p className="text-xl font-bold text-dark">Up to 6000m+</p>
                                    </div>
                                </div>
                            </div>

                            {/* What's Included */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                <div className="space-y-6">
                                    <h3 className="font-display text-2xl font-bold text-dark flex items-center gap-3">
                                        <Check className="text-[var(--color-success)]" /> What's Included
                                    </h3>
                                    <ul className="space-y-4">
                                        {trek.included.map((item, i) => (
                                            <li key={i} className="flex gap-3 text-sm text-gray-600 font-light">
                                                <div className="w-5 h-5 rounded-full bg-[var(--color-success)]/10 flex items-center justify-center shrink-0 mt-0.5">
                                                    <Check size={12} className="text-[var(--color-success)]" />
                                                </div>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="space-y-6">
                                    <h3 className="font-display text-2xl font-bold text-dark flex items-center gap-3">
                                        <X className="text-[var(--color-error)]" /> What's Excluded
                                    </h3>
                                    <ul className="space-y-4">
                                        {trek.excluded.map((item, i) => (
                                            <li key={i} className="flex gap-3 text-sm text-gray-600 font-light">
                                                <div className="w-5 h-5 rounded-full bg-[var(--color-error)]/10 flex items-center justify-center shrink-0 mt-0.5">
                                                    <X size={12} className="text-[var(--color-error)]" />
                                                </div>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar Stats & Info */}
                        <div className="lg:w-1/3 space-y-10">
                            {/* Itinerary Preview */}
                            <div className="bg-dark text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-primary-light)]/20 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 group-hover:scale-150 transition-transform duration-1000" />
                                <h3 className="font-display text-3xl font-bold mb-8 flex items-center gap-3">
                                    <Mountain className="text-[var(--color-primary)]" size={32} /> Highlights
                                </h3>
                                <div className="space-y-8 relative z-10">
                                    {trek.highlights.map((highlight, i) => (
                                        <div key={i} className="flex gap-5">
                                            <div className="flex flex-col items-center">
                                                <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]" />
                                                {i !== trek.highlights.length - 1 && <div className="w-px h-full bg-white/10 my-1" />}
                                            </div>
                                            <p className="text-sm font-light text-white/80 leading-relaxed italic">&ldquo;{highlight}&rdquo;</p>
                                        </div>
                                    ))}
                                </div>
                                <button className="w-full mt-10 py-5 bg-white/5 border border-white/10 rounded-2xl font-bold text-sm text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white transition-all">
                                    Download Full Brochure
                                </button>
                            </div>

                            {/* Tags */}
                            <div className="p-8 decoration-gray-50 border border-gray-100 rounded-3xl">
                                <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-6">Related Locations</h4>
                                <div className="flex flex-wrap gap-2">
                                    {trek.locationTags.map(tag => (
                                        <span key={tag} className="px-3 py-1 bg-stone-100 text-gray-600 rounded-lg text-xs font-medium hover:bg-[var(--color-primary)] hover:text-white transition-colors cursor-default">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
