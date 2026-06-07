'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Sun, Mountain } from 'lucide-react';

const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Tours', href: '/tours' },
    { label: 'Trekking', href: '/trekking' },
    { label: 'Car Rental', href: '/cars' },
    { label: 'Hotels', href: '/hotels' },
    { label: 'Track My Booking', href: '/track-booking' },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 30);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const isHome = pathname === '/';
    const isTransparent = isHome && !scrolled && !isOpen;

    return (
        <nav
            className={`sticky top-0 z-50 transition-all duration-300 ${
                scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
            }`}
        >
            <div className="container-max px-6 flex items-center justify-between">
                {/* Logo Section */}
                <Link href="/" className="flex items-center gap-2 group shrink-0">
                    <div className="relative">
                        <Sun className="text-[#d4a853] absolute -top-4 -left-1 opacity-80" size={32} />
                        <Mountain className="text-[#00748c]" size={42} />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-display font-black text-2xl text-[#333] tracking-tighter leading-none">
                            Lost in the <span className="text-[#00748c] italic">North</span>
                        </span>
                        {/* <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#d4a853] -mt-1 pl-1">
                            Premium Pakistan Travel
                        </span> */}
                    </div>
                </Link>

                {/* Desktop Links Container */}
                <div className="hidden lg:flex items-center gap-1 bg-[#333] px-1 py-1 rounded-md shadow-lg ml-auto mr-4">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`px-4 py-2 text-[11px] font-bold uppercase tracking-wider transition-all duration-300 rounded-sm hover:bg-white/10 ${
                                pathname === link.href ? 'text-white bg-white/5 shadow-inner' : 'text-white'
                            }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* Toggle Button (Hamburger) */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-3 bg-[#d4a853] text-white rounded-md shadow-md hover:bg-[#c49843] transition-all"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="lg:hidden bg-white border-t border-gray-100 p-6 space-y-2 shadow-2xl animate-in fade-in slide-in-from-top-4">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className={`block px-4 py-3 text-sm font-bold uppercase tracking-widest rounded-lg transition-all ${
                                pathname === link.href
                                    ? 'bg-[#00748c] text-white'
                                    : 'text-gray-700 hover:bg-gray-50'
                            }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
            )}
        </nav>
    );
}
