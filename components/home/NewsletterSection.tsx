'use client';

import { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';

export default function NewsletterSection() {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email.trim()) {
            setSubmitted(true);
            setEmail('');
        }
    };

    return (
        <section className="relative overflow-hidden py-16 md:py-20" style={{ background: 'var(--color-surface-alt)' }}>
            {/* Subtle mountain silhouette */}
            <div className="absolute bottom-0 left-0 right-0 h-32 opacity-[0.03]"
                style={{
                    background: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3E%3Cpath fill='%230F4C5C' d='M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,224C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'%3E%3C/path%3E%3C/svg%3E") no-repeat bottom center`,
                    backgroundSize: 'cover',
                }}
            />

            <div className="container-max px-6 relative z-10">
                <div className="max-w-2xl mx-auto text-center">
                    <span className="section-tag justify-center">
                        <span className="section-tag-line" />
                        Stay Connected
                        <span className="section-tag-line" />
                    </span>
                    <h2 className="font-display text-3xl md:text-4xl font-bold text-[var(--color-dark)] mb-3">
                        Get Travel Tips & Exclusive Deals
                    </h2>
                    <p className="text-gray-500 mb-8 max-w-md mx-auto">
                        Join 2,000+ adventurers who receive our weekly newsletter with insider tips, new destinations, and special offers.
                    </p>

                    {submitted ? (
                        <div className="animate-scale-in flex flex-col items-center gap-3 py-4">
                            <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center">
                                <CheckCircle size={28} className="text-green-500" />
                            </div>
                            <p className="font-semibold text-[var(--color-dark)]">You&apos;re subscribed!</p>
                            <p className="text-sm text-gray-500">Check your inbox for a welcome surprise 🎉</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                            <div className="flex-1 relative">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email address"
                                    required
                                    className="w-full px-5 py-3.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-all bg-white shadow-sm"
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-light)] shadow-md hover:shadow-lg transition-all px-6 py-3.5 rounded-xl font-semibold flex items-center gap-2"
                            >
                                <Send size={16} />
                                Subscribe
                            </button>
                        </form>
                    )}

                    <p className="text-[11px] text-gray-400 mt-4">
                        No spam, unsubscribe anytime. We respect your privacy.
                    </p>
                </div>
            </div>
        </section>
    );
}
