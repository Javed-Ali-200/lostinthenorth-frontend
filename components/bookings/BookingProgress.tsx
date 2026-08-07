'use client';

import React from 'react';
import { Check, Package, MapPin, Flag, Star } from 'lucide-react';

interface ProgressStepProps {
    status: string;
}

const steps = [
    { id: 'CONFIRMED', label: 'Confirmed', icon: Check },
    { id: 'PREPARING', label: 'Preparing', icon: Package },
    { id: 'EXPEDITION_LIVE', label: 'Live', icon: MapPin },
    { id: 'COMPLETED', label: 'Completed', icon: Flag },
    { id: 'REVIEW', label: 'Review', icon: Star },
];

export default function BookingProgress({ status }: ProgressStepProps) {
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
        <div className="w-full max-w-4xl mx-auto py-10 px-4">
            {/* Desktop stepper */}
            <div className="relative flex items-start justify-between">
                {/* Background connector line */}
                <div className="absolute top-5 left-0 w-full h-0.5 bg-gray-100 z-0" />
                {/* Active connector line */}
                <div
                    className="absolute top-5 left-0 h-0.5 z-0 transition-all duration-700 ease-in-out"
                    style={{
                        width: `${(currentIndex / (steps.length - 1)) * 100}%`,
                        background: 'var(--color-primary)',
                    }}
                />

                {steps.map((step, index) => {
                    const Icon = step.icon;
                    const isActive = index <= currentIndex;
                    const isCurrent = index === currentIndex;

                    return (
                        <div key={step.id} className="relative z-10 flex flex-col items-center gap-3">
                            <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                                    isActive
                                        ? 'text-white shadow-lg'
                                        : 'bg-white text-gray-300 border-2 border-gray-100'
                                } ${isCurrent ? 'scale-110' : ''}`}
                                style={isActive ? {
                                    background: 'var(--color-primary)',
                                    boxShadow: isCurrent ? '0 0 0 4px rgba(15,76,92,0.15)' : undefined,
                                } : {}}
                            >
                                <Icon size={18} />
                            </div>
                            <span
                                className={`text-[10px] font-bold uppercase tracking-widest ${
                                    isActive ? 'text-[var(--color-primary)]' : 'text-gray-400'
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
