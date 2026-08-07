'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import TrackingForm from '@/components/bookings/TrackingForm';
import BookingProgress from '@/components/bookings/BookingProgress';
import BookingSummary from '@/components/bookings/BookingSummary';
import NextSteps from '@/components/bookings/NextSteps';
import AdventureAddOns from '@/components/bookings/AdventureAddOns';
import ShareTheVision from '@/components/bookings/ShareTheVision';
import HelpSection from '@/components/bookings/HelpSection';

export default function TrackBookingClient() {
    const [booking, setBooking] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleTrack = async (bookingNumber: string, email: string) => {
        setIsLoading(true);
        try {
            const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
            const response = await axios.get(`${apiBaseUrl}/bookings/track`, {
                params: { bookingNumber, email },
            });
            if (response.data.success) {
                setBooking(response.data.data);
                toast.success('Expedition details retrieved!');
            }
        } catch (error: any) {
            const message = error.response?.data?.message || 'Could not find booking. Please check your details.';
            toast.error(message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen pb-20" style={{ background: 'var(--color-surface)' }}>
            {/* Hero */}
            <div 
                className="page-header section-padding"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop')" }}
            >
                <div className="container-max text-center">
                    <span className="section-tag justify-center">
                        <span className="section-tag-line" />
                        Live Tracking
                        <span className="section-tag-line" />
                    </span>
                    <h1 className="font-display text-4xl md:text-6xl font-bold text-white mt-2 mb-3">
                        Track Your Booking
                    </h1>
                    <p className="text-gray-400 text-sm uppercase tracking-widest font-bold">
                        Retrieve your expedition details
                    </p>
                </div>
            </div>

            {/* Tracking Form */}
            {!booking && (
                <div className="container-max px-6">
                    <TrackingForm onTrack={handleTrack} isLoading={isLoading} />
                </div>
            )}

            {/* Tracking Results */}
            {booking && (
                <div className="container-max px-6 mt-12 animate-fade-in-up">
                    {/* Reference header */}
                    <div className="text-center mb-10">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2">
                            Booking Connected
                        </span>
                        <h2 className="font-display text-2xl font-bold text-[var(--color-dark)]">
                            {booking.bookingNumber}
                        </h2>
                    </div>

                    {/* Progress stepper */}
                    <div className="mb-10">
                        <BookingProgress status={booking.status} />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-6">
                            <BookingSummary booking={booking} />
                            <NextSteps />
                        </div>
                        <div className="space-y-6">
                            <AdventureAddOns />
                            <ShareTheVision />
                        </div>
                    </div>

                    <div className="flex justify-center mt-10">
                        <button
                            onClick={() => setBooking(null)}
                            className="text-[11px] font-bold uppercase tracking-widest text-[var(--color-primary)] border-b-2 border-[var(--color-primary)] pb-0.5 hover:text-[var(--color-primary-light)] hover:border-[var(--color-primary-light)] transition-all"
                        >
                            ← Track another booking
                        </button>
                    </div>
                </div>
            )}

            <div className="container-max px-6 mt-8">
                <HelpSection />
            </div>
        </div>
    );
}
