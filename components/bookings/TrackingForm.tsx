'use client';

import React, { useState } from 'react';

interface TrackingFormProps {
    onTrack: (reference: string, email: string) => void;
    isLoading: boolean;
}

export default function TrackingForm({ onTrack, isLoading }: TrackingFormProps) {
    const [reference, setReference] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onTrack(reference, email);
    };

    return (
        <div className="w-full max-w-3xl mx-auto bg-white rounded-3xl p-10 shadow-2xl -mt-32 relative z-20">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-4">Booking Reference</label>
                    <input 
                        type="text"
                        placeholder="e.g. ARCT-99234"
                        value={reference}
                        onChange={(e) => setReference(e.target.value)}
                        className="w-full bg-[#f1f3f5] border-none rounded-xl px-6 py-4 text-sm font-medium focus:ring-2 focus:ring-[#00748c] transition-all"
                        required
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-4">Email Address</label>
                    <input 
                        type="email"
                        placeholder="explorer@north.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-[#f1f3f5] border-none rounded-xl px-6 py-4 text-sm font-medium focus:ring-2 focus:ring-[#00748c] transition-all"
                        required
                    />
                </div>
                <div className="md:col-span-2 flex justify-center mt-4">
                    <button 
                        type="submit"
                        disabled={isLoading}
                        className="bg-[#00748c] text-white px-12 py-4 rounded-xl font-bold text-sm tracking-wider hover:bg-[#005f73] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Searching...' : 'Find Expedition'}
                    </button>
                </div>
            </form>
        </div>
    );
}
