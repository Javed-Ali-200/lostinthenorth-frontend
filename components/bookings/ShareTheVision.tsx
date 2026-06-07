'use client';

import React from 'react';
import { Star } from 'lucide-react';

export default function ShareTheVision() {
    return (
        <div className="bg-[#ffebcc] rounded-3xl p-8 shadow-sm mt-6">
            <h3 className="text-xl font-display font-medium text-[#333] mb-3">Share the Vision</h3>
            <p className="text-[11px] text-gray-600 leading-relaxed mb-6">
                Help fellow explorers find their way. Review your booking experience so far.
            </p>
            
            <div className="flex gap-1 mb-8">
                {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="text-[#333] fill-[#333]" />
                ))}
            </div>

            <button className="w-full bg-[#1a1a1a] text-white font-bold py-3 rounded-lg text-sm hover:bg-black transition-all">
                WRITE REVIEW
            </button>
        </div>
    );
}
