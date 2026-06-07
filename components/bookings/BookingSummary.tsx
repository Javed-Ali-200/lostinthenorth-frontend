'use client';

import React from 'react';

interface BookingSummaryProps {
    booking: any;
}

export default function BookingSummary({ booking }: BookingSummaryProps) {
    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    return (
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 h-full">
            <div className="flex items-center gap-4 mb-8">
                <div className="w-1 h-8 bg-[#00748c] rounded-full" />
                <h2 className="text-2xl font-display font-bold text-[#333]">Booking Summary</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
                <div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Primary Guest</span>
                    <p className="text-lg font-bold text-[#333]">{booking.customerName}</p>
                </div>

                <div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Dates</span>
                    <p className="text-lg font-bold text-[#333]">
                        {formatDate(booking.startDate)} — {formatDate(booking.endDate)}
                    </p>
                </div>

                <div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Total Investment</span>
                    <p className="text-2xl font-bold text-[#00748c]">
                        {new Intl.NumberFormat('en-DE', { style: 'currency', currency: 'EUR' }).format(booking.totalPrice)}
                    </p>
                </div>

                <div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Lead Expedition Guide</span>
                    <div className="flex items-center gap-3 mt-1">
                        <div className="w-8 h-8 rounded-full bg-[#333] flex items-center justify-center text-white text-[10px] font-bold">
                            MK
                        </div>
                        <p className="text-sm font-bold text-[#333]">Mikael K.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
