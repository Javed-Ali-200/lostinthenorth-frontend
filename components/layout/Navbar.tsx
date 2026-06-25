'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Sun, Mountain, Search } from 'lucide-react';

const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Tours', href: '/tours' },
    { label: 'Trekking', href: '/trekking' },
    { label: 'Car Rental', href: '/cars' },
    { label: 'Hotels', href: '/hotels' },
    { label: 'Track Booking', href: '/track-booking' },
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

    // Close mobile menu on route change
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    return (
        <nav
            className={`sticky top-0 z-50 bg-white/95 backdrop-blur-md transition-all duration-300 ${
                scrolled ? 'shadow-lg py-2.5' : 'border-b border-gray-100 py-3.5'
            }`}
        >
            <div className="container-max px-6 flex items-center justify-between">
                {/* Logo Section */}
                <Link href="/" className="flex items-center gap-2.5 group shrink-0">
                    <div className="relative">
                        <Sun className="text-[var(--color-accent)] absolute -top-4 -left-1 opacity-80 group-hover:rotate-45 transition-transform duration-500" size={30} />
                        <Mountain className="text-[var(--color-primary)]" size={40} />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-display font-black text-xl md:text-2xl tracking-tighter leading-none text-[var(--color-primary-dark)]">
                            Lost in the <span className="text-[var(--color-accent)] italic">North</span>
                        </span>
                    </div>
                </Link>

                {/* Desktop Links */}
                <div className="hidden lg:flex items-center gap-7 ml-auto">
                    {navLinks.map((link) => {
                        const isActive = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`hover-underline py-2 text-[11px] font-bold uppercase tracking-wider transition-colors duration-300 ${
                                    isActive
                                        ? 'text-[var(--color-primary)] active'
                                        : 'text-gray-500 hover:text-[var(--color-primary)]'
                                }`}
                            >
                                {link.label}
                            </Link>
                        );
                    })}
                </div>

                {/* Desktop CTA */}
                <div className="hidden lg:flex items-center gap-3 ml-6">
                    <Link
                        href="/custom-trip"
                        className="btn btn-sm bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-dark)] shadow-sm hover:shadow-md transition-all"
                    >
                        Plan My Trip
                    </Link>
                </div>

                {/* Toggle Button (Mobile) */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="lg:hidden p-2.5 bg-[var(--color-accent)] text-white rounded-lg shadow-md hover:bg-[var(--color-accent-dark)] transition-all"
                    aria-label="Toggle menu"
                >
                    {isOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <div
                className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                }`}
            >
                <div className="bg-white border-t border-gray-100 px-6 py-4 space-y-1 shadow-xl">
                    {navLinks.map((link) => {
                        const isActive = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`block px-4 py-3 text-sm font-bold uppercase tracking-widest rounded-xl transition-all ${
                                    isActive
                                        ? 'bg-[var(--color-primary)] text-white shadow-md'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-[var(--color-primary)]'
                                }`}
                            >
                                {link.label}
                            </Link>
                        );
                    })}
                    <div className="pt-2">
                        <Link
                            href="/custom-trip"
                            className="block w-full text-center px-4 py-3 text-sm font-bold uppercase tracking-widest rounded-xl bg-[var(--color-accent)] text-white shadow-md"
                        >
                            Plan My Trip
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
