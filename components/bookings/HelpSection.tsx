'use client';

import React from 'react';
import { MessageSquare, Mail, PhoneCall } from 'lucide-react';

export default function HelpSection() {
    const items = [
        {
            icon: MessageSquare,
            title: 'Live Chat',
            sub: '~2 min wait',
            dark: false,
            href: '#',
        },
        {
            icon: Mail,
            title: 'Email Support',
            sub: 'Same day reply',
            dark: false,
            href: 'mailto:lostinthenorth22@gmail.com',
        },
        {
            icon: PhoneCall,
            title: 'Emergency Line',
            sub: 'Direct satellite link',
            dark: true,
            href: 'tel:+923443845506',
        },
    ];

    return (
        <div className="mt-12 rounded-2xl overflow-hidden" style={{ background: 'var(--color-surface-alt)' }}>
            <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col lg:flex-row items-center justify-between gap-8">
                <div className="text-center lg:text-left">
                    <h2 className="font-display text-2xl font-bold text-[var(--color-dark)] mb-1">Need Help?</h2>
                    <p className="text-gray-500 text-sm">Our expedition desk is available 24/7 for active travelers.</p>
                </div>

                <div className="flex flex-wrap justify-center gap-4">
                    {items.map(({ icon: Icon, title, sub, dark, href }) => (
                        <a
                            key={title}
                            href={href}
                            className={`flex items-center gap-3 rounded-xl px-5 py-4 w-56 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md ${
                                dark ? 'text-white' : 'bg-white text-[var(--color-dark)] border border-gray-100'
                            }`}
                            style={dark ? { background: 'var(--gradient-primary-light)' } : {}}
                        >
                            <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                                dark ? 'bg-white/10' : 'bg-[var(--color-primary-50)]'
                            }`}>
                                <Icon size={18} style={{ color: dark ? 'var(--color-accent)' : 'var(--color-primary)' }} />
                            </div>
                            <div>
                                <p className="text-sm font-bold">{title}</p>
                                <p className={`text-[10px] ${dark ? 'text-white/50' : 'text-gray-400'}`}>{sub}</p>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}
