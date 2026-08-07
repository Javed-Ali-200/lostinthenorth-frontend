'use client';

import { useEffect, useRef, useState } from 'react';
import { Users, MapPin, Mountain, Award } from 'lucide-react';

const STATS = [
    { icon: Users, value: 2500, suffix: '+', label: 'Happy Travelers', color: 'var(--color-accent)' },
    { icon: MapPin, value: 50, suffix: '+', label: 'Destinations', color: 'var(--color-accent)' },
    { icon: Mountain, value: 500, suffix: '+', label: 'Tours Completed', color: 'var(--color-accent)' },
    { icon: Award, value: 10, suffix: '+', label: 'Years Experience', color: 'var(--color-accent)' },
];

function useCountUp(target: number, duration: number = 2000, start: boolean = false) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!start) return;
        let startTime: number | null = null;
        let frame: number;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            // Ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) {
                frame = requestAnimationFrame(animate);
            }
        };

        frame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(frame);
    }, [target, duration, start]);

    return count;
}

export default function StatsCounter() {
    const sectionRef = useRef<HTMLElement>(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.3 }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative overflow-hidden py-16 md:py-20"
            style={{ background: 'var(--gradient-primary)' }}
        >
            {/* Decorative elements */}
            <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full blur-3xl opacity-10 pointer-events-none" style={{ background: 'var(--color-accent)' }} />
            <div className="absolute bottom-0 right-1/4 w-48 h-48 rounded-full blur-3xl opacity-10 pointer-events-none" style={{ background: 'var(--color-primary-light)' }} />

            <div className="container-max px-6 relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
                    {STATS.map(({ icon: Icon, value, suffix, label }, i) => (
                        <StatItem
                            key={label}
                            icon={Icon}
                            value={value}
                            suffix={suffix}
                            label={label}
                            inView={inView}
                            delay={i * 150}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

function StatItem({
    icon: Icon, value, suffix, label, inView, delay,
}: {
    icon: typeof Users;
    value: number;
    suffix: string;
    label: string;
    inView: boolean;
    delay: number;
}) {
    const count = useCountUp(value, 2200, inView);

    return (
        <div
            className="text-center transition-all duration-700"
            style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(20px)',
                transitionDelay: `${delay}ms`,
            }}
        >
            <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-4 border border-white/10">
                <Icon size={24} style={{ color: 'var(--color-accent)' }} />
            </div>
            <p className="font-display text-3xl md:text-4xl font-bold text-white mb-1">
                {count.toLocaleString()}{suffix}
            </p>
            <p className="text-xs font-semibold uppercase tracking-widest text-white/50">{label}</p>
        </div>
    );
}
