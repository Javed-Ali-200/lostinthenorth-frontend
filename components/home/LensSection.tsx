import Image from 'next/image';

const PHOTOS = [
    { src: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=600&q=80', alt: 'Aurora Borealis', label: 'Aurora Night' },
    { src: 'https://images.unsplash.com/photo-1587381420270-3e1a5b9e6904?w=600&q=80', alt: 'Sled Dogs', label: 'Adventure' },
    { src: 'https://images.unsplash.com/photo-1614267861476-0d129972a0f4?w=600&q=80', alt: 'Winding Road', label: 'The Journey' },
    { src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80', alt: 'Mountain Summit', label: 'Summit' },
    { src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80', alt: 'Mountain Lake', label: 'Serenity' },
    { src: 'https://images.unsplash.com/photo-1537667078955-5f96ecff82ab?w=600&q=80', alt: 'Campfire', label: 'Campfire Tales' },
    { src: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&q=80', alt: 'Snowy Mountain Night', label: 'Starlit Peaks' },
    { src: 'https://images.unsplash.com/photo-1476673160081-cf065607f449?w=600&q=80', alt: 'Arctic Wilderness', label: 'Wilderness' },
    { src: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=600&q=80', alt: 'Green Forest', label: 'Into the Wild' },
];

export default function LensSection() {
    return (
        <section className="section-padding" style={{ background: 'var(--color-surface-alt)' }}>
            <div className="container-max">
                <div className="text-center mb-12">
                    <span className="section-tag justify-center">
                        <span className="section-tag-line" />
                        Gallery
                        <span className="section-tag-line" />
                    </span>
                    <h2 className="font-display text-3xl md:text-4xl font-bold text-[var(--color-dark)]">
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
                            {/* Hover overlay with label */}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                                <span className="text-white font-display font-semibold text-sm md:text-base opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                                    {photo.label}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
