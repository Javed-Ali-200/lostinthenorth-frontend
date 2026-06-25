'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function WhatsAppButton() {
    const pathname = usePathname();

    // Avoid overlay/z-index conflicts with admin pages
    if (pathname?.startsWith('/admin')) return null;

    const phoneNumber = "923443845506";
    const message = encodeURIComponent(
        "Welcome to Lost in The North! Discover the breathtaking beauty, rich culture, and vibrant history of Pakistan with us. Let's embark on an unforgettable journey together!"
    );
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

    return (
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full shadow-xl hover:scale-110 active:scale-95 group transition-transform duration-300"
            style={{ background: '#25D366' }}
            aria-label="Chat with us on WhatsApp"
        >
            {/* WhatsApp icon */}
            <div className="relative w-8 h-8">
                <Image
                    src="/image/whatsapp.png"
                    alt="WhatsApp"
                    fill
                    className="object-contain"
                />
            </div>

            {/* Tooltip */}
            <span className="absolute right-16 bg-white text-gray-800 text-xs font-semibold px-3 py-2 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0 whitespace-nowrap border border-gray-100 pointer-events-none">
                Chat with us 💬
                <span className="absolute top-1/2 -right-1.5 -translate-y-1/2 border-4 border-transparent border-l-white" />
            </span>

            {/* Pulse ring */}
            <span
                className="absolute inset-0 rounded-full opacity-40 animate-pulse-ring"
                style={{ background: '#25D366' }}
            />
        </a>
    );
}
