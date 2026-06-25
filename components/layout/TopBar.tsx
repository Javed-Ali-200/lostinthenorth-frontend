'use client';

import { Mail, Phone, Facebook, Instagram, Youtube, Twitter } from 'lucide-react';
import Link from 'next/link';

export default function TopBar() {
    return (
        <div className="bg-[var(--color-primary-dark)] text-white py-2 px-6 hidden lg:block">
            <div className="container-max flex items-center justify-between">
                {/* Left Side: Tagline */}
                <p className="text-[13px] font-medium tracking-wide">
                    Experience the <span className="font-bold uppercase">Great North</span> with the <span className="font-bold border-b border-white/50">Premier Expedition Team</span> in Pakistan
                </p>

                {/* Right Side: Contact & Socials */}
                <div className="flex items-center gap-6">
                    {/* Contact Info */}
                    <div className="flex items-center gap-5 text-[13px]">
                        <a href="mailto:lostinthenorth22@gmail.com" className="flex items-center gap-2 hover:text-[var(--color-accent-light)] transition-colors">
                            <Mail size={13} />
                            <span>lostinthenorth22@gmail.com</span>
                        </a>
                        <a href="tel:+923443845506" className="flex items-center gap-2 hover:text-[var(--color-accent-light)] transition-colors">
                            <div className="bg-[var(--color-accent)] p-1 rounded-sm rotate-[25deg]">
                                <Phone size={11} className="-rotate-[25deg] fill-white text-[var(--color-accent)]" />
                            </div>
                            <span className="font-bold">+92 344 3845506</span>
                        </a>
                    </div>

                    {/* Divider */}
                    <div className="h-4 w-px bg-white/20" />

                    {/* Track Booking Link */}
                    <Link
                        href="/track-booking"
                        className="text-[11px] font-bold uppercase tracking-widest text-[var(--color-accent)] hover:text-[var(--color-accent-light)] transition-colors"
                    >
                        Track Booking
                    </Link>

                    {/* Divider */}
                    <div className="h-4 w-px bg-white/20" />

                    {/* Social Icons */}
                    <div className="flex items-center gap-3">
                        <a href="#" aria-label="Facebook" className="hover:text-[var(--color-accent-light)] transition-colors"><Facebook size={14} /></a>
                        <a href="#" aria-label="Instagram" className="hover:text-[var(--color-accent-light)] transition-colors"><Instagram size={14} /></a>
                        <a href="#" aria-label="Youtube" className="hover:text-[var(--color-accent-light)] transition-colors"><Youtube size={14} /></a>
                        <a href="#" aria-label="Twitter" className="hover:text-[var(--color-accent-light)] transition-colors"><Twitter size={14} /></a>
                    </div>
                </div>
            </div>
        </div>
    );
}
