'use client';

import { Mail, Phone, Facebook, Instagram, Youtube, Twitter } from 'lucide-react';

export default function TopBar() {
    return (
        <div className="bg-[#00748c] text-white py-2 px-6 hidden lg:block">
            <div className="container-max flex items-center justify-between">
                {/* Left Side: Tagline */}
                <p className="text-[13px] font-medium tracking-wide">
                    Experience the <span className="font-bold uppercase">Great North</span> with the <span className="font-bold border-b border-white">Premier Expedition Team</span> in Pakistan
                </p>

                {/* Right Side: Contact & Socials */}
                <div className="flex items-center gap-8">
                    {/* Contact Info */}
                    <div className="flex items-center gap-6 text-[13px]">
                        <a href="mailto:lostinthenorth22@gmail.com" className="flex items-center gap-2 hover:text-white/80 transition-colors">
                            <Mail size={14} />
                            <span>lostinthenorth22@gmail.com</span>
                        </a>
                        <a href="tel:+923443845506" className="flex items-center gap-2 hover:text-white/80 transition-colors">
                            <div className="bg-[#d4a853] p-1 rounded-sm rotate-[25deg]">
                                <Phone size={12} className="-rotate-[25deg] fill-white text-[#d4a853]" />
                            </div>
                            <span className="font-bold">+92 344 3845506</span>
                        </a>
                    </div>

                    {/* Social Icons */}
                    <div className="flex items-center gap-3">
                        <Facebook size={16} className="cursor-pointer hover:text-white/80 transition-colors" />
                        <Instagram size={16} className="cursor-pointer hover:text-white/80 transition-colors" />
                        <Youtube size={16} className="cursor-pointer hover:text-white/80 transition-colors" />
                        <Twitter size={16} className="cursor-pointer hover:text-white/80 transition-colors" />
                    </div>
                </div>
            </div>
        </div>
    );
}
