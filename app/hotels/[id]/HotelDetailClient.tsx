'use client';

import { useState } from 'react';
import { MapPin, Star, Phone, Mail, ArrowLeft, Wifi, Share2, Heart } from 'lucide-react';
import Link from 'next/link';
import ImageGallery from '@/components/shared/ImageGallery';
import BookingModal from '@/components/shared/BookingModal';
import { formatPrice } from '@/lib/utils';
import type { Hotel } from '@/types';

const TABS = ['Overview', 'Amenities', 'Room Types', 'Contact'] as const;
type Tab = typeof TABS[number];

export default function HotelDetailClient({ hotel }: { hotel: Hotel }) {
    const [bookingOpen, setBookingOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<Tab>('Overview');
    const [wishlisted, setWishlisted] = useState(false);

    return (
        <div>
            <div className="max-w-6xl mx-auto px-4 py-6">
                <div className="flex items-center justify-between mb-4">
                    <Link href="/hotels" className="inline-flex items-center gap-2 text-[var(--color-primary)] text-sm hover:underline font-medium">
                        <ArrowLeft size={16} /> Back to Hotels
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
                <ImageGallery images={hotel.images} title={hotel.name} />
            </div>

            <div className="max-w-6xl mx-auto px-4 pb-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    <div className="lg:col-span-2">
                        {/* Title */}
                        <div className="mb-6">
                            <h1 className="font-display text-3xl md:text-4xl font-bold text-[var(--color-dark)] mb-3">{hotel.name}</h1>
                            <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                                <span className="flex items-center gap-1.5"><MapPin size={15} className="text-[var(--color-accent)]" />{hotel.location}</span>
                                {hotel.rating > 0 && (
                                    <span className="flex items-center gap-1.5">
                                        <Star size={15} className="text-[var(--color-accent)] fill-[var(--color-accent)]" />
                                        {hotel.rating.toFixed(1)} Rating
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Tabs */}
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

                        {activeTab === 'Overview' && (
                            <div className="space-y-4 animate-fade-in">
                                <p className="text-gray-600 leading-relaxed">{hotel.description}</p>
                                <div className="grid grid-cols-3 gap-3 mt-6">
                                    {[
                                        { label: 'Free cancellation', sub: '24 hrs notice' },
                                        { label: 'Secure booking', sub: '100% safe' },
                                        { label: '24/7 support', sub: 'Always here' },
                                    ].map(({ label, sub }) => (
                                        <div key={label} className="bg-[var(--color-surface)] rounded-xl p-4 text-center">
                                            <Star size={16} className="text-[var(--color-primary)] mx-auto mb-1.5" />
                                            <p className="font-semibold text-xs text-[var(--color-dark)]">{label}</p>
                                            <p className="text-[10px] text-gray-400 mt-0.5">{sub}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'Amenities' && (
                            <div className="animate-fade-in">
                                {hotel.amenities?.length > 0 ? (
                                    <div className="flex flex-wrap gap-2">
                                        {hotel.amenities.map((a, i) => (
                                            <span key={i} className="flex items-center gap-1.5 bg-[var(--color-primary-10)] text-[var(--color-primary)] border border-[var(--color-primary-20)] px-3 py-1.5 rounded-full text-sm">
                                                <Wifi size={13} />{a}
                                            </span>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-400 text-sm">No amenities listed.</p>
                                )}
                            </div>
                        )}

                        {activeTab === 'Room Types' && (
                            <div className="animate-fade-in">
                                {hotel.roomTypes?.length > 0 ? (
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                        {hotel.roomTypes.map((r, i) => (
                                            <div key={i} className="border border-gray-200 rounded-xl p-4 text-center text-sm font-medium text-[var(--color-dark)] hover:border-[var(--color-primary)] hover:bg-[var(--color-primary-50)] transition-all">
                                                {r}
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-400 text-sm">No room types listed.</p>
                                )}
                            </div>
                        )}

                        {activeTab === 'Contact' && (
                            <div className="animate-fade-in">
                                {(hotel.address || hotel.phone || hotel.email) ? (
                                    <div className="bg-[var(--color-surface)] rounded-2xl p-5 space-y-3">
                                        {hotel.address && <p className="text-sm text-gray-600 flex items-center gap-2"><MapPin size={14} className="text-[var(--color-accent)]" />{hotel.address}</p>}
                                        {hotel.phone && <p className="text-sm text-gray-600 flex items-center gap-2"><Phone size={14} className="text-[var(--color-accent)]" />{hotel.phone}</p>}
                                        {hotel.email && <p className="text-sm text-gray-600 flex items-center gap-2"><Mail size={14} className="text-[var(--color-accent)]" />{hotel.email}</p>}
                                    </div>
                                ) : (
                                    <p className="text-gray-400 text-sm">Contact information not available.</p>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Booking Card */}
                    <div>
                        <div className="sticky top-24 bg-white rounded-2xl border border-gray-100 shadow-lg overflow-hidden">
                            <div className="bg-[var(--color-primary)] px-6 py-5">
                                <p className="text-white/60 text-xs uppercase tracking-widest mb-1">Starting from</p>
                                <p className="font-display text-3xl font-bold text-white">{formatPrice(hotel.pricePerNight)}</p>
                                <p className="text-white/50 text-xs mt-1">per night</p>
                            </div>
                            <div className="p-6">
                                {hotel.rating > 0 && (
                                    <div className="flex items-center gap-1.5 mb-5 pb-4 border-b border-gray-50">
                                        {Array.from({ length: Math.round(hotel.rating) }).map((_, i) => (
                                            <Star key={i} size={14} className="text-[var(--color-accent)] fill-[var(--color-accent)]" />
                                        ))}
                                        <span className="text-xs text-gray-400 ml-1">{hotel.rating.toFixed(1)} / 5</span>
                                    </div>
                                )}
                                <button
                                    onClick={() => setBookingOpen(true)}
                                    disabled={!hotel.available}
                                    className="btn btn-full bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-dark)] shadow-md disabled:opacity-50"
                                >
                                    Reserve Room
                                </button>
                                <p className="text-center text-xs text-gray-400 mt-3">
                                    Free cancellation · Secure payment
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <BookingModal
                isOpen={bookingOpen}
                onClose={() => setBookingOpen(false)}
                serviceId={hotel.id}
                serviceType="HOTEL"
                serviceTitle={hotel.name}
                pricePerUnit={hotel.pricePerNight}
            />
        </div>
    );
}
