'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Clock, Calendar, MapPin } from 'lucide-react';

interface ServiceCardProps {
    id: string;
    type: 'tour' | 'hotel' | 'car';
    image: string;
    title: string;
    location?: string;
    duration?: number | string;
    description: string;
    price?: number;
    pricePerNight?: number;
    pricePerDay?: number;
}

export default function ServiceCard({
    id, type, image, title, location, duration, description
}: ServiceCardProps) {
    const detailHref = `/${type}s/${id}`;
    const buttonText = type === 'tour' ? 'Tour Details' : type === 'hotel' ? 'Hotel Details' : 'Car Details';

    return (
        <div className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 flex flex-col h-full">
            {/* Image Section */}
            <div className="relative h-60 overflow-hidden shrink-0">
                <Image
                    src={image || '/placeholder-travel.jpg'}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110 group-hover:translate-y-4"
                    unoptimized={image?.startsWith('http')}
                />
                
                {/* Floating Info Bar */}
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-[90%] bg-white rounded-md shadow-md py-2.5 px-4 flex items-center justify-between z-10 border border-gray-50">
                    <div className="flex items-center gap-2">
                        <Clock size={16} className="text-[#D4A853]" />
                        <span className="text-[11px] font-medium text-gray-500 uppercase tracking-wider">
                            {duration || 'Varies'} {typeof duration === 'number' ? 'Days' : ''}
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-[#D4A853]" />
                        <span className="text-[11px] font-medium text-gray-500 uppercase tracking-wider">
                            Whole Year
                        </span>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-6 pt-8 flex flex-col flex-grow">
                <div className="mb-4">
                    <h3 className="font-display font-bold text-xl text-dark mb-2 hover:text-[#0096C7] transition-colors cursor-pointer leading-tight">
                        {title}
                    </h3>
                    <div className="flex items-start gap-1.5 text-gray-400">
                        <MapPin size={14} className="text-[#D4A853] mt-0.5 shrink-0" />
                        <span className="text-xs font-medium tracking-wide">{location || 'Northern Pakistan'}</span>
                    </div>
                </div>
                
                <div className="h-px w-full bg-gray-100 mb-5" />

                <p className="text-gray-500 text-[13px] leading-relaxed line-clamp-3 mb-6 flex-grow">
                    {description}
                </p>

                <div className="h-px w-full bg-gray-100 mb-6" />

                {/* Single Primary Button */}
                <div className="mt-auto">
                    <Link
                        href={detailHref}
                        className="inline-block py-2.5 px-6 bg-[#0096C7] text-white text-[12px] font-bold rounded-md hover:bg-[#0077b6] transition-all shadow-sm hover:shadow-md"
                    >
                        {buttonText}
                    </Link>
                </div>
            </div>
        </div>
    );
}
