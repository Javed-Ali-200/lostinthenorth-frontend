'use client';

import { useState } from 'react';
import {
    Users, Fuel, Settings, ArrowLeft, Shield, Phone, Wifi,
    Snowflake, CheckCircle, Loader2, ChevronLeft, ChevronRight,
    X, ZoomIn, MapPin, Calendar, Star, Check,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { bookingApi } from '@/services/api';
import { sendBookingConfirmationEmail } from '@/utils/emailjs';
import toast from 'react-hot-toast';
import type { Car, BookingFormData } from '@/types';

// ─── helpers ──────────────────────────────────────────────────────────────────
function formatPrice(n: number) {
    return `PKR ${n?.toLocaleString() ?? 0}`;
}

interface FormValues {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    startDate: string;
    endDate: string;
    numberOfPeople: number;
    specialRequests?: string;
}

// ─── Add-ons config ───────────────────────────────────────────────────────────
const ADD_ONS = [
    { id: 'gps', label: 'Satellite GPS', price: 250, icon: MapPin },
    { id: 'child', label: 'Child Seat', price: 150, icon: Users },
    { id: 'wifi', label: 'Portable Wi-Fi', price: 175, icon: Wifi },
    { id: 'ski', label: 'Ski Rack', price: 300, icon: Snowflake },
];

// ─── Trust pillars ────────────────────────────────────────────────────────────
const TRUST = [
    {
        icon: Shield,
        title: 'Zero-Deductible Cover',
        desc: 'Drive with complete peace of mind. Our premium insurance covers gravel, sand, and salt damage.',
    },
    {
        icon: Phone,
        title: '24/7 Roadside Assist',
        desc: 'No matter how deep into the wilderness you venture, our support recovery teams are always just a call away.',
    },
    {
        icon: Snowflake,
        title: 'Arctic Ready Gear',
        desc: 'All vehicles come pre-fitted with studded winter tires and emergency adult removal kits during winter months.',
    },
];

// ─── Main component ───────────────────────────────────────────────────────────
export default function CarDetailClient({ car }: { car: Car }) {
    const allImages = [car.image, ...(car.images || [])].filter(Boolean) as string[];
    const [mainImg, setMainImg] = useState(0);
    const [lightbox, setLightbox] = useState<number | null>(null);
    const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
    const [step, setStep] = useState<'form' | 'success'>('form');
    const [bookingNumber, setBookingNumber] = useState('');

    const today = new Date().toISOString().split('T')[0];

    const {
        register, handleSubmit, reset, watch,
        formState: { errors, isSubmitting },
    } = useForm<FormValues>({ defaultValues: { numberOfPeople: 1 } });

    const startDate = watch('startDate');
    const endDate = watch('endDate');

    const rentalDays = startDate && endDate
        ? Math.max(1, Math.ceil((new Date(endDate).getTime() - new Date(startDate).getTime()) / 86400000))
        : 3;

    const basePrice = car.pricePerDay * rentalDays;
    const addOnTotal = ADD_ONS
        .filter((a) => selectedAddOns.includes(a.id))
        .reduce((s, a) => s + a.price * rentalDays, 0);
    const taxFees = Math.round((basePrice + addOnTotal) * 0.12);
    const totalPrice = basePrice + addOnTotal + taxFees;

    const toggleAddOn = (id: string) =>
        setSelectedAddOns((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );

    const onSubmit = async (values: FormValues) => {
        try {
            const payload: BookingFormData = {
                ...values,
                serviceId: car.id,
                serviceType: 'CAR',
                numberOfPeople: Number(values.numberOfPeople),
                addOns: selectedAddOns,
            };
            const res = await bookingApi.create(payload);
            const booking = res.data.data;
            setBookingNumber(booking.bookingNumber);
            try {
                await sendBookingConfirmationEmail({
                    customerName: values.customerName,
                    customerEmail: values.customerEmail,
                    customerPhone: values.customerPhone,
                    serviceTitle: car.name,
                    serviceType: 'CAR',
                    startDate: values.startDate,
                    endDate: values.endDate,
                    numberOfPeople: Number(values.numberOfPeople),
                    totalPrice,
                    specialRequests: values.specialRequests,
                    bookingNumber: booking.bookingNumber,
                });
            } catch { /* silent */ }
            setStep('success');
        } catch (err: any) {
            toast.error(err.response?.data?.message || 'Booking failed. Please try again.');
        }
    };

    const prevImg = () => setMainImg((i) => (i - 1 + allImages.length) % allImages.length);
    const nextImg = () => setMainImg((i) => (i + 1) % allImages.length);

    return (
        <div className="min-h-screen" style={{ background: 'var(--color-bg-page)' }}>

            {/* ── HERO BANNER ─────────────────────────────────────────────────── */}
            <div className="relative overflow-hidden" style={{ background: 'var(--gradient-hero)', minHeight: 320 }}>
                {/* background image overlay */}
                {allImages[0] && (
                    <Image
                        src={allImages[0]}
                        alt={car.name}
                        fill
                        className="object-cover opacity-20"
                        unoptimized
                        priority
                    />
                )}
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(17,17,17,0.85) 100%)' }} />

                <div className="relative container-max px-4 sm:px-6 pt-28 pb-14">
                    <Link
                        href="/cars"
                        className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm mb-6 transition-colors group"
                    >
                        <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform" />
                        Back to Fleet
                    </Link>
                    <span className="block text-xs uppercase tracking-widest mb-3" style={{ color: 'var(--color-accent)' }}>
                        Expedition Premium
                    </span>
                    <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-3">
                        {car.name}
                    </h1>
                    <p className="text-white/60 text-sm md:text-base">
                        {car.type} &nbsp;·&nbsp; {car.transmission} &nbsp;·&nbsp; {car.fuelType}
                    </p>
                </div>
            </div>

            {/* ── IMAGE GALLERY ────────────────────────────────────────────────── */}
            <div className="container-max px-4 sm:px-6 -mt-6 mb-10">
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden p-4 border border-[var(--color-border)]">
                    {allImages.length > 0 ? (
                        <div className="flex flex-col gap-3">
                            {/* Main image */}
                            <div
                                className="relative rounded-xl overflow-hidden cursor-zoom-in group"
                                style={{ height: 380 }}
                                onClick={() => setLightbox(mainImg)}
                            >
                                <Image
                                    src={allImages[mainImg]}
                                    alt={car.name}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    unoptimized
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center">
                                    <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity" size={32} />
                                </div>
                                {allImages.length > 1 && (
                                    <>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); prevImg(); }}
                                            className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white rounded-full p-2 transition-all"
                                        >
                                            <ChevronLeft size={20} />
                                        </button>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); nextImg(); }}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white rounded-full p-2 transition-all"
                                        >
                                            <ChevronRight size={20} />
                                        </button>
                                    </>
                                )}
                                {/* Availability badge */}
                                <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${car.available ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'}`}>
                                    {car.available ? 'ECO READY' : 'Unavailable'}
                                </div>
                            </div>
                            {/* Thumbnails */}
                            {allImages.length > 1 && (
                                <div className="flex gap-2 overflow-x-auto pb-1">
                                    {allImages.map((img, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setMainImg(i)}
                                            className={`relative shrink-0 rounded-lg overflow-hidden transition-all ${i === mainImg ? 'ring-2 ring-[var(--color-accent)] ring-offset-1' : 'opacity-60 hover:opacity-90'}`}
                                            style={{ width: 80, height: 56 }}
                                        >
                                            <Image src={img} alt="" fill className="object-cover" unoptimized />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="h-64 flex items-center justify-center text-[var(--color-text-muted)] rounded-xl bg-[var(--color-surface-alt)]">
                            No images available
                        </div>
                    )}
                </div>
            </div>

            {/* ── MAIN CONTENT ─────────────────────────────────────────────────── */}
            <div className="container-max px-4 sm:px-6 pb-16">

                {/* ── THE FLEET HEADER ─────────────────────────────────────────── */}
                <div className="mb-6">
                    <h2 className="font-display text-2xl md:text-3xl font-bold text-[var(--color-text-heading)]">Vehicle Details</h2>
                    <p className="text-[var(--color-text-muted)] text-sm mt-1">Full specifications & expedition gear</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* LEFT COLUMN ─────────────────────────────────────────────── */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Spec cards - matching the fleet card style */}
                        <div className="grid grid-cols-3 gap-4">
                            {[
                                { icon: Users, label: 'Seats', value: `${car.seats} Seats` },
                                { icon: Settings, label: 'Transmission', value: car.transmission },
                                { icon: Fuel, label: 'Fuel Type', value: car.fuelType },
                            ].map(({ icon: Icon, label, value }) => (
                                <div
                                    key={label}
                                    className="bg-white rounded-2xl p-5 text-center shadow-sm border border-[var(--color-border)] hover:shadow-md transition-shadow"
                                >
                                    <div
                                        className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3"
                                        style={{ background: 'var(--color-accent-10)' }}
                                    >
                                        <Icon size={18} style={{ color: 'var(--color-accent)' }} />
                                    </div>
                                    <p className="text-xs text-[var(--color-text-muted)] mb-1 uppercase tracking-wide">{label}</p>
                                    <p className="font-semibold text-[var(--color-text-heading)] text-sm">{value}</p>
                                </div>
                            ))}
                        </div>

                        {/* Features / included */}
                        {car.features?.length > 0 && (
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[var(--color-border)]">
                                <h3 className="font-display font-bold text-lg text-[var(--color-text-heading)] mb-4">What&apos;s Included</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    {car.features.map((f, i) => (
                                        <div key={i} className="flex items-center gap-2 text-sm text-[var(--color-text-body)]">
                                            <Check size={15} style={{ color: 'var(--color-accent)' }} className="shrink-0" />
                                            {f}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Secure Your Expedition – Booking form (left side) */}
                        <div>
                            <div
                                className="rounded-2xl p-8 text-white"
                                style={{ background: 'var(--gradient-dark)' }}
                            >
                                <h2 className="font-display text-2xl font-bold mb-1">Secure Your Expedition</h2>
                                <p className="text-white/60 text-sm mb-6">
                                    {car.name} &nbsp;·&nbsp; {car.type}
                                </p>

                                {step === 'success' ? (
                                    <div className="text-center py-8">
                                        <CheckCircle size={56} className="text-emerald-400 mx-auto mb-4" />
                                        <h3 className="font-display text-2xl font-bold mb-2">Booking Confirmed!</h3>
                                        <p className="text-white/60 mb-3">Your booking number is:</p>
                                        <span
                                            className="inline-block px-5 py-2 rounded-xl font-bold text-lg mb-4"
                                            style={{ background: 'var(--color-accent-15)', color: 'var(--color-accent)' }}
                                        >
                                            {bookingNumber}
                                        </span>
                                        <p className="text-white/50 text-sm mb-6">
                                            A confirmation email has been sent. Our team will contact you within 24 hours.
                                        </p>
                                        <button
                                            onClick={() => { setStep('form'); reset(); }}
                                            className="px-6 py-3 rounded-xl font-semibold transition-all hover:bg-[var(--color-accent-hover)]"
                                            style={{ background: 'var(--color-accent)', color: 'var(--color-text-on-accent)' }}
                                        >
                                            Make Another Booking
                                        </button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                                        {/* Traveler details row */}
                                        <p className="text-xs uppercase tracking-widest text-white/40 font-semibold">Traveler Details</p>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <input
                                                {...register('customerName', { required: 'Name required' })}
                                                placeholder="Full Name"
                                                className="w-full rounded-xl px-4 py-3 text-sm text-[var(--color-text-heading)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/40 transition bg-white/95"
                                            />
                                            <input
                                                type="email"
                                                {...register('customerEmail', { required: 'Email required' })}
                                                placeholder="Email Address"
                                                className="w-full rounded-xl px-4 py-3 text-sm text-[var(--color-text-heading)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/40 transition bg-white/95"
                                            />
                                            <input
                                                {...register('customerPhone', { required: 'Phone required' })}
                                                placeholder="Phone Number"
                                                className="w-full rounded-xl px-4 py-3 text-sm text-[var(--color-text-heading)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/40 transition bg-white/95"
                                            />
                                            <input
                                                type="number"
                                                min={1}
                                                {...register('numberOfPeople', { min: 1 })}
                                                placeholder="Number of People"
                                                className="w-full rounded-xl px-4 py-3 text-sm text-[var(--color-text-heading)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/40 transition bg-white/95"
                                            />
                                        </div>
                                        {/* Dates */}
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-xs text-white/40 mb-1">PICK-UP DATE</p>
                                                <input
                                                    type="date"
                                                    min={today}
                                                    {...register('startDate', { required: 'Start date required' })}
                                                    className="w-full rounded-xl px-4 py-3 text-sm text-[var(--color-text-heading)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/40 transition bg-white/95"
                                                />
                                            </div>
                                            <div>
                                                <p className="text-xs text-white/40 mb-1">RETURN DATE</p>
                                                <input
                                                    type="date"
                                                    min={startDate || today}
                                                    {...register('endDate', { required: 'End date required' })}
                                                    className="w-full rounded-xl px-4 py-3 text-sm text-[var(--color-text-heading)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/40 transition bg-white/95"
                                                />
                                            </div>
                                        </div>

                                        {/* Select Add-Ons */}
                                        <div>
                                            <p className="text-xs uppercase tracking-widest text-white/40 font-semibold mb-3">Select Add-Ons</p>
                                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                                {ADD_ONS.map((addon) => {
                                                    const active = selectedAddOns.includes(addon.id);
                                                    return (
                                                        <button
                                                            key={addon.id}
                                                            type="button"
                                                            onClick={() => toggleAddOn(addon.id)}
                                                            className={`flex flex-col items-start gap-1 rounded-xl px-3 py-3 text-sm border transition-all ${active
                                                                ? 'border-[var(--color-accent)] bg-[var(--color-accent)]/10 text-white'
                                                                : 'border-white/10 bg-white/5 text-white/70 hover:bg-white/10'
                                                                }`}
                                                        >
                                                            <addon.icon size={14} />
                                                            <span className="font-medium leading-tight">{addon.label}</span>
                                                            <span className="text-xs" style={{ color: 'var(--color-accent)' }}>+PKR {addon.price}/day</span>
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </div>

                                        {/* Special Requests */}
                                        <textarea
                                            {...register('specialRequests')}
                                            rows={3}
                                            placeholder="Special requests or notes..."
                                            className="w-full rounded-xl px-4 py-3 text-sm text-[var(--color-text-heading)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/40 transition resize-none bg-white/95"
                                        />

                                        {/* Error summary */}
                                        {Object.keys(errors).length > 0 && (
                                            <p className="text-red-400 text-xs">Please fill in all required fields.</p>
                                        )}
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN – Booking Summary ─────────────────────────── */}
                    <div className="space-y-6">
                        <div className="sticky top-24">

                            {/* Booking Summary card */}
                            <div className="bg-white rounded-2xl shadow-lg border border-[var(--color-border)] overflow-hidden">
                                <div className="px-6 pt-5 pb-4 border-b border-[var(--color-border)]">
                                    <p className="text-xs uppercase tracking-widest text-[var(--color-text-muted)] font-semibold mb-1">Booking Summary</p>
                                    <div className="flex items-center gap-3 mt-3">
                                        <div className="relative w-14 h-10 rounded-lg overflow-hidden shrink-0 bg-gray-100">
                                            {allImages[0] && (
                                                <Image src={allImages[0]} alt={car.name} fill className="object-cover" unoptimized />
                                            )}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-sm text-[var(--color-text-heading)] leading-tight">{car.name}</p>
                                            <p className="text-xs text-[var(--color-text-muted)]">{car.type} · {rentalDays} Day{rentalDays !== 1 ? 's' : ''}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="px-6 py-4 space-y-3 text-sm">
                                    <div className="flex justify-between text-[var(--color-text-body)]">
                                        <span>Base Rental ({rentalDays} day{rentalDays !== 1 ? 's' : ''})</span>
                                        <span className="font-medium text-[var(--color-text-heading)]">{formatPrice(basePrice)}</span>
                                    </div>
                                    {selectedAddOns.length > 0 && (
                                        <div className="flex justify-between text-[var(--color-text-body)]">
                                            <span>Add-on Protection</span>
                                            <span className="font-medium text-[var(--color-text-heading)]">{formatPrice(addOnTotal)}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between text-[var(--color-text-body)]">
                                        <span>Tax & Fees</span>
                                        <span className="font-medium text-[var(--color-text-heading)]">{formatPrice(taxFees)}</span>
                                    </div>
                                    <div className="border-t border-[var(--color-border)] pt-3 flex justify-between font-bold text-base">
                                        <span style={{ color: 'var(--color-text-heading)' }}>Total Price</span>
                                        <span style={{ color: 'var(--color-accent)', fontSize: '1.15rem' }}>{formatPrice(totalPrice)}</span>
                                    </div>
                                </div>

                                <div className="px-6 pb-5">
                                    {step === 'success' ? (
                                        <div className="text-center py-2">
                                            <CheckCircle size={28} className="text-emerald-500 mx-auto mb-1" />
                                            <p className="text-sm font-semibold text-[var(--color-text-heading)]">Booking #{bookingNumber}</p>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={handleSubmit(onSubmit)}
                                            disabled={!car.available || isSubmitting}
                                            className="w-full py-3.5 rounded-xl font-semibold text-white text-sm flex items-center justify-center gap-2 transition-all disabled:opacity-50 hover:bg-[var(--color-accent-hover)]"
                                            style={{ background: 'var(--color-accent)' }}
                                        >
                                            {isSubmitting ? (
                                                <><Loader2 size={16} className="animate-spin" /> Processing…</>
                                            ) : !car.available ? (
                                                'Currently Unavailable'
                                            ) : (
                                                'Confirm & Pay'
                                            )}
                                        </button>
                                    )}
                                    <p className="text-center text-xs text-[var(--color-text-muted)] mt-3">
                                        Free cancellation up to 48 hrs before pickup
                                    </p>
                                </div>
                            </div>

                            {/* Price per day callout */}
                            <div
                                className="rounded-2xl p-5 text-center mt-4"
                                style={{ background: 'var(--gradient-dark)' }}
                            >
                                <p className="text-white/50 text-xs uppercase tracking-widest mb-1">Daily Rate</p>
                                <p className="font-display text-3xl font-bold text-white">{formatPrice(car.pricePerDay)}</p>
                                <p className="text-white/40 text-xs mt-1">per day — all-inclusive</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── TRUST PILLARS ────────────────────────────────────────────────── */}
            <div style={{ background: '#fff' }}>
                <div className="container-max px-4 sm:px-6 py-16 border-t border-[var(--color-border)]">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {TRUST.map(({ icon: Icon, title, desc }) => (
                            <div key={title} className="text-center">
                                <div
                                    className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                                    style={{ background: 'var(--color-accent-10)' }}
                                >
                                    <Icon size={24} style={{ color: 'var(--color-accent)' }} />
                                </div>
                                <h4 className="font-display font-bold text-[var(--color-text-heading)] mb-2">{title}</h4>
                                <p className="text-[var(--color-text-muted)] text-sm leading-relaxed">{desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── LIGHTBOX ─────────────────────────────────────────────────────── */}
            {lightbox !== null && (
                <div
                    className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
                    onClick={() => setLightbox(null)}
                >
                    <button
                        onClick={() => setLightbox(null)}
                        className="absolute top-4 right-4 text-white/80 hover:text-white bg-white/10 rounded-full p-2"
                    >
                        <X size={22} />
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); setLightbox((i) => ((i ?? 0) - 1 + allImages.length) % allImages.length); }}
                        className="absolute left-4 text-white/80 hover:text-white bg-white/10 rounded-full p-3"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <div className="relative w-full max-w-4xl h-[80vh] mx-16" onClick={(e) => e.stopPropagation()}>
                        <Image
                            src={allImages[lightbox]}
                            alt={`${car.name} ${lightbox + 1}`}
                            fill
                            className="object-contain"
                            unoptimized
                        />
                    </div>
                    <button
                        onClick={(e) => { e.stopPropagation(); setLightbox((i) => ((i ?? 0) + 1) % allImages.length); }}
                        className="absolute right-4 text-white/80 hover:text-white bg-white/10 rounded-full p-3"
                    >
                        <ChevronRight size={24} />
                    </button>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                        {allImages.map((_, i) => (
                            <button
                                key={i}
                                onClick={(e) => { e.stopPropagation(); setLightbox(i); }}
                                className={`h-2 rounded-full transition-all ${i === lightbox ? 'w-6' : 'w-2 bg-white/40'}`}
                                style={i === lightbox ? { background: 'var(--color-accent)', width: 24 } : {}}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
