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
            year: 'numeric',
        });
    };

    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-7 rounded-full" style={{ background: 'var(--color-primary)' }} />
                <h2 className="text-xl font-display font-bold text-[var(--color-dark)]">Booking Summary</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-10">
                <div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Primary Guest</span>
                    <p className="text-base font-bold text-[var(--color-dark)]">{booking.customerName}</p>
                    <p className="text-sm text-gray-400 mt-0.5">{booking.customerEmail}</p>
                </div>

                <div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Travel Dates</span>
                    <p className="text-base font-bold text-[var(--color-dark)]">
                        {formatDate(booking.startDate)} — {formatDate(booking.endDate)}
                    </p>
                </div>

                <div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Total Amount</span>
                    <p className="text-2xl font-bold" style={{ color: 'var(--color-primary)' }}>
                        PKR {booking.totalPrice?.toLocaleString()}
                    </p>
                </div>

                <div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Service Type</span>
                    <span className="badge badge-primary">{booking.serviceType}</span>
                </div>
            </div>
        </div>
    );
}
