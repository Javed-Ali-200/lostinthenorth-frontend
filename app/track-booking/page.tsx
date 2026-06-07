'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import TrackingForm from '@/components/bookings/TrackingForm';
import BookingProgress from '@/components/bookings/BookingProgress';
import BookingSummary from '@/components/bookings/BookingSummary';
import NextSteps from '@/components/bookings/NextSteps';
import AdventureAddOns from '@/components/bookings/AdventureAddOns';
import ShareTheVision from '@/components/bookings/ShareTheVision';
import HelpSection from '@/components/bookings/HelpSection';

export default function TrackBookingPage() {
    const [booking, setBooking] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleTrack = async (bookingNumber: string, email: string) => {
        setIsLoading(true);
        try {
            const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
            const response = await axios.get(`${apiBaseUrl}/bookings/track`, {
                params: { bookingNumber, email }
            });
            
            if (response.data.success) {
                setBooking(response.data.data);
                toast.success('Expedition details retrieved!');
            }
        } catch (error: any) {
            console.error('Tracking error:', error);
            const message = error.response?.data?.message || 'Could not find booking details';
            toast.error(message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-stone-50 pb-20">
            {/* Hero Section */}
            <section className="relative h-[550px] w-full">
                <Image 
                    src="/images/track-hero.png"
                    alt="Arctic Mountain"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/30" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                    <h1 className="text-white text-5xl md:text-7xl font-display font-medium tracking-tight mb-4">
                        Track Your Booking
                    </h1>
                    <p className="text-white/80 font-bold uppercase tracking-[0.3em] text-sm">
                        Retrieve your expedition details
                    </p>
                </div>
            </section>

            {/* Tracking Form */}
            {!booking && (
                <div className="container-max px-6">
                    <TrackingForm onTrack={handleTrack} isLoading={isLoading} />
                </div>
            )}

            {/* Tracking Results */}
            {booking && (
                <div className="container-max px-6 mt-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
                    {/* Booking Reference Display */}
                    <div className="text-center mb-12">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2">Booking Connected</span>
                        <h2 className="text-2xl font-bold text-[#333]">{booking.bookingNumber}</h2>
                    </div>

                    {/* Progress Stepper */}
                    <div className="mb-16">
                        <BookingProgress status={booking.status} />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-6">
                            <BookingSummary booking={booking} />
                            <NextSteps />
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-8">
                            <AdventureAddOns />
                            <ShareTheVision />
                        </div>
                    </div>

                    {/* Quick Reset for searching another */}
                    <div className="flex justify-center mt-12">
                        <button 
                            onClick={() => setBooking(null)}
                            className="text-[10px] font-bold text-[#00748c] uppercase tracking-widest border-b border-[#00748c] pb-1 hover:text-[#005f73] hover:border-[#005f73] transition-all"
                        >
                            Track another booking
                        </button>
                    </div>
                </div>
            )}

            {/* Common Help Section */}
            <div className="container-max px-6">
                <HelpSection />
            </div>
        </div>
    );
}
