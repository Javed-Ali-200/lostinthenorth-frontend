'use client';

import React from 'react';
import { MessageSquare, Mail, PhoneCall } from 'lucide-react';

export default function HelpSection() {
    return (
        <div className="bg-[#e9ecef] py-16 mt-16 rounded-[40px] px-8">
            <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
                <div className="text-center lg:text-left">
                    <h2 className="text-4xl font-display font-medium text-[#333] mb-2">Need help?</h2>
                    <p className="text-gray-500 font-bold">Our expedition desk is available 24/7 for active travelers.</p>
                </div>

                <div className="flex flex-wrap justify-center gap-6">
                    <div className="bg-white rounded-2xl p-6 flex items-center gap-4 w-64 shadow-sm">
                        <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center text-[#00748c]">
                            <MessageSquare size={20} />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-[#333]">Live Chat</p>
                            <p className="text-[10px] text-gray-400">2 min wait</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-6 flex items-center gap-4 w-64 shadow-sm">
                        <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center text-[#00748c]">
                            <Mail size={20} />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-[#333]">Email Support</p>
                            <p className="text-[10px] text-gray-400">Same day reply</p>
                        </div>
                    </div>

                    <div className="bg-[#1a1a2e] rounded-2xl p-6 flex items-center gap-4 w-64 shadow-lg text-white">
                        <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-[#4fd1c5]">
                            <PhoneCall size={20} />
                        </div>
                        <div>
                            <p className="text-xs font-bold">Emergency Line</p>
                            <p className="text-[10px] text-gray-400">Direct Satellite Link</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
