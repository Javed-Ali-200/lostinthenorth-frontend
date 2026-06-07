'use client';

import React from 'react';
import { Check, Package, MapPin, Flag, Star } from 'lucide-react';

interface ProgressStepProps {
    status: string;
}

const steps = [
    { id: 'CONFIRMED', label: 'CONFIRMED', icon: Check },
    { id: 'PREPARING', label: 'PREPARING', icon: Package },
    { id: 'EXPEDITION_LIVE', label: 'EXPEDITION LIVE', icon: MapPin },
    { id: 'COMPLETED', label: 'COMPLETED', icon: Flag },
    { id: 'REVIEW', label: 'REVIEW', icon: Star },
];

export default function BookingProgress({ status }: ProgressStepProps) {
    // Map existing statuses to our steps index
    const getStatusIndex = (currentStatus: string) => {
        switch (currentStatus) {
            case 'CONFIRMED': return 0;
            case 'PREPARING': return 1;
            case 'EXPEDITION_LIVE': return 2;
            case 'COMPLETED': return 3;
            case 'REVIEW': return 4;
            default: return 0;
        }
    };

    const currentIndex = getStatusIndex(status);

    return (
        <div className="w-full max-w-5xl mx-auto py-12 px-4">
            <div className="relative flex items-center justify-between">
                {/* Connector Line */}
                <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 -translate-y-1/2 z-0" />
                <div 
                    className="absolute top-1/2 left-0 h-1 bg-[#00748c] -translate-y-1/2 z-0 transition-all duration-700 ease-in-out" 
                    style={{ width: `${(currentIndex / (steps.length - 1)) * 100}%` }}
                />

                {steps.map((step, index) => {
                    const Icon = step.icon;
                    const isActive = index <= currentIndex;
                    const isCurrent = index === currentIndex;

                    return (
                        <div key={step.id} className="relative z-10 flex flex-col items-center">
                            <div 
                                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                                    isActive 
                                        ? 'bg-[#00748c] text-white shadow-lg' 
                                        : 'bg-white text-gray-300 border-2 border-gray-100'
                                } ${isCurrent ? 'ring-4 ring-[#00748c]/20 scale-110' : ''}`}
                            >
                                <Icon size={20} />
                            </div>
                            <span 
                                className={`mt-4 text-[10px] font-bold uppercase tracking-widest ${
                                    isActive ? 'text-[#00748c]' : 'text-gray-400'
                                }`}
                            >
                                {step.label}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
