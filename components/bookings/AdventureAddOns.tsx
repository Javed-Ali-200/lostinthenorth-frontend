'use client';

import React from 'react';
import { Camera, Utensils } from 'lucide-react';

export default function AdventureAddOns() {
    const addOns = [
        {
            title: 'Professional Photo Pack',
            description: 'High-res aurora captures included.',
            icon: Camera,
            status: 'ACTIVE'
        },
        {
            title: 'Private Camp Chef',
            description: 'Gourmet Nordic dining by the fire.',
            icon: Utensils,
            status: 'ADD NOW'
        }
    ];

    return (
        <div className="space-y-4">
            <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Adventure Add-ons</h3>
            {addOns.map((item, i) => {
                const Icon = item.icon;
                return (
                    <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-[#00748c]">
                            <Icon size={20} />
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-center mb-1">
                                <h4 className="text-sm font-bold text-[#333]">{item.title}</h4>
                                <span className={`text-[8px] font-bold px-2 py-0.5 rounded-full ${
                                    item.status === 'ACTIVE' ? 'bg-[#4fd1c5]/10 text-[#4fd1c5]' : 'bg-[#00748c]/10 text-[#00748c]'
                                }`}>
                                    {item.status}
                                </span>
                            </div>
                            <p className="text-[10px] text-gray-400">{item.description}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
