import Image from 'next/image';

const PHOTOS = [
    { src: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=600&q=80', alt: 'Aurora Borealis' },
    { src: 'https://images.unsplash.com/photo-1587381420270-3e1a5b9e6904?w=600&q=80', alt: 'Sled Dogs' },
    { src: 'https://images.unsplash.com/photo-1614267861476-0d129972a0f4?w=600&q=80', alt: 'Winding Road' },
    { src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80', alt: 'Mountain Summit' },
    { src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80', alt: 'Mountain Lake' },
    { src: 'https://images.unsplash.com/photo-1537667078955-5f96ecff82ab?w=600&q=80', alt: 'Campfire' },
    { src: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&q=80', alt: 'Snowy Mountain Night' },
    { src: 'https://images.unsplash.com/photo-1476673160081-cf065607f449?w=600&q=80', alt: 'Arctic Wilderness' },
    { src: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=600&q=80', alt: 'Green Forest' },
];

export default function LensSection() {
    return (
        <section className="py-20 md:py-28" style={{ background: '#f8f9fa' }}>
            <div className="container-max px-6">
                <div className="text-center mb-12">
                    <span
                        className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] mb-4"
                        style={{ color: '#D4A853' }}
                    >
                        <span className="h-px w-8 inline-block" style={{ background: '#D4A853' }} />
                        Gallery
                        <span className="h-px w-8 inline-block" style={{ background: '#D4A853' }} />
                    </span>
                    <h2 className="font-display text-3xl md:text-4xl font-bold text-dark">
                        Through the Lens
                    </h2>
                </div>

                {/* 3×3 mosaic grid */}
                <div className="grid grid-cols-3 gap-2 md:gap-3">
                    {PHOTOS.map((photo, i) => (
                        <div
                            key={i}
                            className="relative overflow-hidden rounded-xl group cursor-pointer"
                            style={{ paddingBottom: '66.7%' }}
                        >
                            <Image
                                src={photo.src}
                                alt={photo.alt}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-700"
                                unoptimized
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
