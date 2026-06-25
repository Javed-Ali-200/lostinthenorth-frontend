'use client';

import React, { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';

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
        <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl p-8 shadow-xl -mt-20 relative z-20 border border-gray-100">
            <div className="text-center mb-6">
                <p className="text-sm text-gray-400">Enter your booking reference and email to track your expedition</p>
            </div>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="input-label">Booking Reference</label>
                    <input
                        type="text"
                        placeholder="e.g. LN-99234"
                        value={reference}
                        onChange={(e) => setReference(e.target.value)}
                        className="input"
                        required
                    />
                </div>
                <div>
                    <label className="input-label">Email Address</label>
                    <input
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="input"
                        required
                    />
                </div>
                <div className="md:col-span-2">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="btn btn-full bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-light)] disabled:opacity-50 gap-2"
                    >
                        {isLoading
                            ? <><Loader2 size={16} className="animate-spin" /> Searching…</>
                            : <><Search size={16} /> Track My Booking</>
                        }
                    </button>
                </div>
            </form>
        </div>
    );
}
