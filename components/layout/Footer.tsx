import Link from 'next/link';
import { Mountain, Instagram, Facebook, Twitter, Send } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-[#0a1f2a] text-white py-16">
            <div className="container-max px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand Section */}
                    <div className="space-y-6">
                        <Link href="/" className="inline-block">
                            <h2 className="font-display text-xl font-bold italic">Lost in the North</h2>
                            <p className="text-[10px] uppercase tracking-widest text-[#D4A853] mt-1">Cunning silence and scale since 2014</p>
                        </Link>
                        <div className="flex gap-4">
                            <Link href="#" className="hover:text-[#D4A853] transition-colors"><Instagram size={18} /></Link>
                            <Link href="#" className="hover:text-[#D4A853] transition-colors"><Facebook size={18} /></Link>
                            <Link href="#" className="hover:text-[#D4A853] transition-colors"><Twitter size={18} /></Link>
                        </div>
                    </div>

                    {/* Explore Section */}
                    <div>
                        <h3 className="text-[10px] uppercase tracking-widest text-[#D4A853] font-bold mb-6">Explore</h3>
                        <ul className="space-y-4 text-xs">
                            <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">About</Link></li>
                            <li><Link href="/tours" className="text-gray-400 hover:text-white transition-colors">Tours</Link></li>
                            <li><Link href="/cars" className="text-gray-400 hover:text-white transition-colors font-bold text-white border-b border-white pb-0.5">Car Rental</Link></li>
                        </ul>
                    </div>

                    {/* Support Section */}
                    <div>
                        <h3 className="text-[10px] uppercase tracking-widest text-[#D4A853] font-bold mb-6">Support</h3>
                        <ul className="space-y-4 text-xs">
                            <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact Info</Link></li>
                            <li><Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/track-booking" className="text-gray-400 hover:text-white transition-colors">Track My Booking</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter Section */}
                    <div>
                        <h3 className="text-[10px] uppercase tracking-widest text-[#D4A853] font-bold mb-6">The Arctic Dispatch</h3>
                        <p className="text-xs text-gray-400 mb-6 leading-relaxed">Join our team of 14,372 expedition updates and exclusive digital rewards.</p>
                        <div className="relative">
                            <input 
                                type="email" 
                                placeholder="Email Address" 
                                className="w-full bg-[#162a36] border-none rounded-sm px-4 py-3 text-xs focus:ring-1 focus:ring-[#D4A853] outline-none pr-12"
                            />
                            <button className="absolute right-0 top-0 h-full px-4 text-[#4fd1c5] hover:text-white transition-colors">
                                <Send size={16} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Copyright */}
                <div className="mt-20 pt-8 border-t border-white/5 flex flex-col items-center justify-center space-y-4">
                    <p className="text-[10px] uppercase tracking-widest text-gray-500">© 2024 Lost in the North Expedition Co.</p>
                </div>
            </div>
        </footer>
    );
}
