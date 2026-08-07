'use client';

import { useState } from 'react';
import { MapPin, Clock, Users, CheckCircle, XCircle, ArrowLeft, Share2, Heart } from 'lucide-react';
import Link from 'next/link';
import ImageGallery from '@/components/shared/ImageGallery';
import BookingModal from '@/components/shared/BookingModal';
import { formatPrice } from '@/lib/utils';
import type { Tour, ItineraryDay } from '@/types';

interface Props { tour: Tour }

const TABS = ['Overview', 'Itinerary', "What's Included", 'Booking'] as const;
type Tab = typeof TABS[number];

export default function TourDetailClient({ tour }: Props) {
    const [bookingOpen, setBookingOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<Tab>('Overview');
    const [wishlisted, setWishlisted] = useState(false);

    let itinerary: ItineraryDay[] = [];
    if (tour.itinerary) {
        try { itinerary = JSON.parse(tour.itinerary); } catch { /* ignore */ }
    }

    return (
        <div>
            {/* Gallery Hero */}
            <div className="max-w-6xl mx-auto px-4 py-6">
                <div className="flex items-center justify-between mb-4">
                    <Link href="/tours" className="inline-flex items-center gap-2 text-[var(--color-primary)] text-sm hover:underline font-medium">
                        <ArrowLeft size={16} /> Back to Tours
                    </Link>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setWishlisted(!wishlisted)}
                            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:border-red-200 hover:text-red-500 transition-all"
                        >
                            <Heart size={15} className={wishlisted ? 'fill-red-500 text-red-500' : ''} />
                            {wishlisted ? 'Saved' : 'Save'}
                        </button>
                        <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:border-gray-300 transition-all">
                            <Share2 size={15} />
                            Share
                        </button>
                    </div>
                </div>
                <ImageGallery images={tour.images} title={tour.title} />
            </div>

            {/* Main content */}
            <div className="max-w-6xl mx-auto px-4 pb-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* Left – Details */}
                    <div className="lg:col-span-2">
                        {/* Title block */}
                        <div className="mb-6">
                            <div className="flex flex-wrap items-center gap-2 mb-3">
                                {tour.featured && (
                                    <span className="badge badge-featured">Featured</span>
                                )}
                                {!tour.available && (
                                    <span className="badge badge-error">Unavailable</span>
                                )}
                            </div>
                            <h1 className="font-display text-3xl md:text-4xl font-bold text-[var(--color-dark)] mb-3">
                                {tour.title}
                            </h1>
                            <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                                <span className="flex items-center gap-1.5"><MapPin size={15} className="text-[var(--color-accent)]" />{tour.location}</span>
                                <span className="flex items-center gap-1.5"><Clock size={15} className="text-[var(--color-accent)]" />{tour.duration} Days</span>
                                <span className="flex items-center gap-1.5"><Users size={15} className="text-[var(--color-accent)]" />Max {tour.maxGroupSize} people</span>
                            </div>
                        </div>

                        {/* Tab navigation */}
                        <div className="flex border-b border-gray-100 mb-6 overflow-x-auto">
                            {TABS.map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-5 py-3 text-sm font-semibold whitespace-nowrap transition-all border-b-2 -mb-px ${
                                        activeTab === tab
                                            ? 'border-[var(--color-accent)] text-[var(--color-primary)]'
                                            : 'border-transparent text-gray-400 hover:text-gray-600'
                                    }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        {/* Tab Content */}
                        {activeTab === 'Overview' && (
                            <div className="space-y-6 animate-fade-in">
                                <div>
                                    <h2 className="font-display text-xl font-bold text-[var(--color-dark)] mb-3">About This Tour</h2>
                                    <p className="text-gray-600 leading-relaxed whitespace-pre-line">{tour.description}</p>
                                </div>
                                {/* Trust signals */}
                                <div className="grid grid-cols-3 gap-3">
                                    {[
                                        { label: 'Free cancellation', sub: 'Up to 48 hrs before' },
                                        { label: 'Instant confirmation', sub: 'No waiting' },
                                        { label: 'Expert guides', sub: 'Local certified' },
                                    ].map(({ label, sub }) => (
                                        <div key={label} className="bg-[var(--color-surface)] rounded-xl p-4 text-center">
                                            <CheckCircle size={18} className="text-[var(--color-primary)] mx-auto mb-1.5" />
                                            <p className="font-semibold text-xs text-[var(--color-dark)]">{label}</p>
                                            <p className="text-[10px] text-gray-400 mt-0.5">{sub}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'Itinerary' && (
                            <div className="animate-fade-in">
                                {itinerary.length > 0 ? (
                                    <div className="space-y-4">
                                        {itinerary.map((day) => (
                                            <div key={day.day} className="flex gap-4 p-4 bg-[var(--color-surface)] rounded-xl border border-gray-100">
                                                <div className="shrink-0 w-10 h-10 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center text-sm font-bold">
                                                    {day.day}
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-[var(--color-dark)]">{day.title}</h4>
                                                    <p className="text-sm text-gray-500 mt-1">{day.description}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-400 text-sm">No itinerary available for this tour.</p>
                                )}
                            </div>
                        )}

                        {activeTab === "What's Included" && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 animate-fade-in">
                                {tour.included?.length > 0 && (
                                    <div>
                                        <h3 className="font-semibold text-[var(--color-dark)] mb-3 flex items-center gap-2">
                                            <CheckCircle size={16} className="text-green-500" /> Included
                                        </h3>
                                        <ul className="space-y-2">
                                            {tour.included.map((item, i) => (
                                                <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                                                    <CheckCircle size={15} className="text-green-500 shrink-0 mt-0.5" />
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                                {tour.excluded?.length > 0 && (
                                    <div>
                                        <h3 className="font-semibold text-[var(--color-dark)] mb-3 flex items-center gap-2">
                                            <XCircle size={16} className="text-red-400" /> Not Included
                                        </h3>
                                        <ul className="space-y-2">
                                            {tour.excluded.map((item, i) => (
                                                <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                                                    <XCircle size={15} className="text-red-400 shrink-0 mt-0.5" />
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                                {!tour.included?.length && !tour.excluded?.length && (
                                    <p className="text-gray-400 text-sm">No details available.</p>
                                )}
                            </div>
                        )}

                        {activeTab === 'Booking' && (
                            <div className="animate-fade-in">
                                <p className="text-gray-500 text-sm mb-4">Use the booking panel on the right to reserve your spot, or click below to open the booking form.</p>
                                <button
                                    onClick={() => setBookingOpen(true)}
                                    disabled={!tour.available}
                                    className="btn bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-light)] disabled:opacity-50"
                                >
                                    Book This Tour
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Right – Booking Card */}
                    <div>
                        <div className="sticky top-24 bg-white rounded-2xl border border-gray-100 shadow-lg overflow-hidden">
                            {/* Price header */}
                            <div className="bg-[var(--color-primary)] px-6 py-5">
                                <p className="text-white/60 text-xs uppercase tracking-widest mb-1">Price per person</p>
                                <p className="font-display text-3xl font-bold text-white">{formatPrice(tour.price)}</p>
                                <p className="text-white/50 text-xs mt-1">{tour.duration} days trip</p>
                            </div>

                            <div className="p-6">
                                <div className="space-y-3 mb-6 text-sm">
                                    {[
                                        { label: 'Duration', value: `${tour.duration} Days` },
                                        { label: 'Group Size', value: `Max ${tour.maxGroupSize}` },
                                        { label: 'Location', value: tour.location },
                                        { label: 'Availability', value: tour.available ? 'Available' : 'Unavailable', highlight: tour.available },
                                    ].map(({ label, value, highlight }) => (
                                        <div key={label} className="flex justify-between py-2 border-b border-gray-50">
                                            <span className="text-gray-400">{label}</span>
                                            <span className={`font-medium ${highlight === false ? 'text-red-500' : highlight === true ? 'text-green-600' : 'text-[var(--color-dark)]'}`}>
                                                {value}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <button
                                    onClick={() => setBookingOpen(true)}
                                    disabled={!tour.available}
                                    className="btn btn-full bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-dark)] shadow-md disabled:opacity-50"
                                >
                                    Book This Tour
                                </button>
                                <p className="text-center text-xs text-gray-400 mt-3">
                                    Free cancellation · Instant confirmation
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <BookingModal
                isOpen={bookingOpen}
                onClose={() => setBookingOpen(false)}
                serviceId={tour.id}
                serviceType="TOUR"
                serviceTitle={tour.title}
                pricePerUnit={tour.price}
            />
        </div>
    );
}
