import Link from 'next/link';
import { Mountain, Sun, Mail, Phone, MapPin, Facebook, Instagram, Youtube, Twitter, Shield, CreditCard, Headphones } from 'lucide-react';

const COMPANY_LINKS = [
    { label: 'About Us', href: '/#about' },
    { label: 'Our Tours', href: '/tours' },
    { label: 'Trekking', href: '/trekking' },
    { label: 'Custom Trip', href: '/custom-trip' },
    { label: 'Track Booking', href: '/track-booking' },
];

const DESTINATION_LINKS = [
    { label: 'Hunza Valley', href: '/tours' },
    { label: 'Skardu', href: '/tours' },
    { label: 'Fairy Meadows', href: '/tours' },
    { label: 'Naran Kaghan', href: '/tours' },
    { label: 'Deosai Plains', href: '/tours' },
];

const SUPPORT_LINKS = [
    { label: 'Contact Us', href: 'mailto:lostinthenorth22@gmail.com' },
    { label: 'FAQs', href: '/#' },
    { label: 'Cancellation Policy', href: '/#' },
    { label: 'Privacy Policy', href: '/#' },
    { label: 'Terms of Service', href: '/#' },
];

const TRUST_BADGES = [
    { icon: Shield, label: 'Verified & Trusted' },
    { icon: CreditCard, label: 'Secure Payments' },
    { icon: Headphones, label: '24/7 Support' },
];

export default function Footer() {
    return (
        <footer className="border-t" style={{ backgroundColor: 'var(--color-bg-footer)', borderColor: 'var(--color-border)' }}>
            {/* Trust Badge Strip */}
            <div className="border-b" style={{ borderColor: 'var(--color-border)' }}>
                <div className="container-max px-6 py-5">
                    <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
                        {TRUST_BADGES.map(({ icon: Icon, label }) => (
                            <div key={label} className="flex items-center gap-2.5">
                                <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--color-accent-10)' }}>
                                    <Icon size={16} className="text-[var(--color-accent)]" />
                                </div>
                                <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">{label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Footer */}
            <div className="container-max px-6 pt-12 pb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="relative">
                                <Sun className="text-[var(--color-accent)] absolute -top-3 -left-1 opacity-80" size={24} />
                                <Mountain className="text-[var(--color-text-heading)]" size={32} />
                            </div>
                            <span className="font-display font-black text-lg tracking-tighter leading-none text-[var(--color-text-heading)]">
                                Lost in the <span className="text-[var(--color-accent)] italic">North</span>
                            </span>
                        </Link>
                        <p className="text-sm leading-relaxed max-w-xs" style={{ color: 'var(--color-text-muted)' }}>
                            Premium travel experiences through the most breathtaking landscapes of Northern Pakistan. Since 2014.
                        </p>
                        {/* Contact */}
                        <div className="space-y-2 pt-2">
                            <a href="mailto:lostinthenorth22@gmail.com" className="flex items-center gap-2 text-sm hover:text-[var(--color-accent)] transition-colors" style={{ color: 'var(--color-text-muted)' }}>
                                <Mail size={14} className="shrink-0" />
                                lostinthenorth22@gmail.com
                            </a>
                            <a href="tel:+923443845506" className="flex items-center gap-2 text-sm hover:text-[var(--color-accent)] transition-colors" style={{ color: 'var(--color-text-muted)' }}>
                                <Phone size={14} className="shrink-0" />
                                +92 344 3845506
                            </a>
                            <span className="flex items-center gap-2 text-sm" style={{ color: 'var(--color-text-muted)' }}>
                                <MapPin size={14} className="shrink-0" />
                                Gilgit-Baltistan, Pakistan
                            </span>
                        </div>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: 'var(--color-text-heading)' }}>Company</h4>
                        <ul className="space-y-2.5">
                            {COMPANY_LINKS.map(({ label, href }) => (
                                <li key={label}>
                                    <Link href={href} className="text-sm hover:text-[var(--color-accent)] hover:translate-x-1 transition-all inline-block" style={{ color: 'var(--color-text-body)' }}>
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Destinations */}
                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: 'var(--color-text-heading)' }}>Destinations</h4>
                        <ul className="space-y-2.5">
                            {DESTINATION_LINKS.map(({ label, href }) => (
                                <li key={label}>
                                    <Link href={href} className="text-sm hover:text-[var(--color-accent)] hover:translate-x-1 transition-all inline-block" style={{ color: 'var(--color-text-body)' }}>
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support & Social */}
                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: 'var(--color-text-heading)' }}>Support</h4>
                        <ul className="space-y-2.5 mb-6">
                            {SUPPORT_LINKS.map(({ label, href }) => (
                                <li key={label}>
                                    <Link href={href} className="text-sm hover:text-[var(--color-accent)] hover:translate-x-1 transition-all inline-block" style={{ color: 'var(--color-text-body)' }}>
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        {/* Social Icons */}
                        <h4 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--color-text-heading)' }}>Follow Us</h4>
                        <div className="flex items-center gap-2.5">
                            {[
                                { icon: Facebook, label: 'Facebook' },
                                { icon: Instagram, label: 'Instagram' },
                                { icon: Youtube, label: 'Youtube' },
                                { icon: Twitter, label: 'Twitter' },
                            ].map(({ icon: Icon, label }) => (
                                <a
                                    key={label}
                                    href="#"
                                    aria-label={label}
                                    className="w-9 h-9 rounded-lg flex items-center justify-center text-[var(--color-text-body)] hover:bg-[var(--color-accent)] hover:text-white hover:border-[var(--color-accent)] transition-all duration-300"
                                    style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}
                                >
                                    <Icon size={15} />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Payment Methods */}
                <div className="mt-10 pt-6 border-t" style={{ borderColor: 'var(--color-border)' }}>
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <span className="text-[10px] uppercase tracking-widest" style={{ color: 'var(--color-text-muted)' }}>Payment Methods:</span>
                            <div className="flex items-center gap-2">
                                {['Visa', 'Mastercard', 'JazzCash', 'EasyPaisa'].map((method) => (
                                    <span
                                        key={method}
                                        className="px-2.5 py-1 rounded text-[10px] font-semibold"
                                        style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)', color: 'var(--color-text-muted)' }}
                                    >
                                        {method}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <p className="text-[10px] uppercase tracking-widest" style={{ color: 'var(--color-text-muted)' }}>
                            © {new Date().getFullYear()} Lost in the North Expedition Co. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
