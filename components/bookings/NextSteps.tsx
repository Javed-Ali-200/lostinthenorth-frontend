'use client';

import React from 'react';

export default function NextSteps() {
    const steps = [
        {
            id: '01',
            title: 'Final Gear Check',
            description: 'Ensure your thermal layers meet the Arctic Tier-3 requirements. Download our digital checklist.'
        },
        {
            id: '02',
            title: 'Local Contact Transfer',
            description: 'Our driver will meet you at Tromsø Airport (TOS). Arrival Hall B with a "Lost in the North" sign.'
        }
    ];

    return (
        <div className="bg-[#1a1a1a] rounded-3xl p-8 shadow-xl mt-6">
            <h3 className="text-xl font-display font-medium text-white mb-6 underline decoration-[#d4a853] underline-offset-8">
                What's Next for You?
            </h3>
            
            <div className="space-y-6">
                {steps.map((step) => (
                    <div key={step.id} className="flex gap-4 group">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center text-[#d4a853] text-sm font-bold group-hover:bg-[#d4a853] group-hover:text-black transition-all">
                            {step.id}
                        </div>
                        <div>
                            <h4 className="text-white font-bold mb-1">{step.title}</h4>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                {step.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
