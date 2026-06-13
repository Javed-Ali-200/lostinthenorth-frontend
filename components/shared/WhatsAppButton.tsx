'use client';

import Image from 'next/image';

export default function WhatsAppButton() {
    const phoneNumber = "923443845506";
    const message = encodeURIComponent("Welcome to Lost in The North! Discover the breathtaking beauty, rich culture, and vibrant history of Pakistan with us. Let’s embark on an unforgettable journey together!");
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

    return (
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-8 right-8 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:bg-[#128C7E] transition-all hover:scale-110 active:scale-95 group"
            aria-label="Let's plan a Tour! WhatsApp contact"
        >
            <div className="relative w-10 h-10">
                <Image 
                    src="/image/whatsapp.png" 
                    alt="WhatsApp" 
                    fill 
                    className="object-contain"
                />
            </div>

            {/* Tooltip */}
            <span className="absolute right-16 bg-white text-gray-800 text-sm font-medium px-4 py-2 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0 whitespace-nowrap border border-gray-100 pointer-events-none">
                Let&apos;s plan a Tour!
                {/* Tooltip Arrow */}
                <span className="absolute top-1/2 -right-2 -translate-y-1/2 border-8 border-transparent border-l-white"></span>
            </span>

            {/* Pulse effect */}
            <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20 group-hover:opacity-0 transition-opacity"></span>
        </a>
    );
}
