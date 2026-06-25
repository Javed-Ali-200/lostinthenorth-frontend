'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Loader2, CheckCircle, Mountain, Calendar, Users, MapPin } from 'lucide-react';
import { customTripApi } from '@/services/api';
import toast from 'react-hot-toast';
import Link from 'next/link';

interface FormValues {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    destination: string;
    days: number;
    numberOfPeople: number;
    startDate?: string;
    activities: string;
    posterImage?: FileList;
}

const INFO_CARDS = [
    { icon: MapPin, title: 'Any Destination', desc: 'Hunza, Skardu, Fairy Meadows, Naran – we cover every corner of the North.' },
    { icon: Calendar, title: 'Flexible Dates', desc: "Pick any dates that work for you. We'll plan around your schedule." },
    { icon: Users, title: 'Any Group Size', desc: 'Solo travelers, couples, families, or corporate groups – all welcome.' },
    { icon: Mountain, title: 'Custom Itinerary', desc: 'Fully personalised day-by-day plan curated by our local experts.' },
];

export default function CustomTripPage() {
    const [submitted, setSubmitted] = useState(false);
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({
        defaultValues: { numberOfPeople: 1, days: 3 },
    });

    const onSubmit = async (values: FormValues) => {
        try {
            const fd = new FormData();
            Object.entries(values).forEach(([k, v]) => {
                if (k === 'posterImage') return;
                if (v) fd.append(k, String(v));
            });
            if (values.posterImage && values.posterImage[0]) {
                fd.append('image', values.posterImage[0]);
            }
            await customTripApi.create(fd);
            setSubmitted(true);
        } catch (err: any) {
            toast.error(err.response?.data?.message || 'Submission failed. Please try again.');
        }
    };

    if (submitted) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'var(--color-surface)' }}>
                <div className="bg-white rounded-2xl p-10 text-center shadow-lg max-w-md w-full animate-scale-in border border-gray-100">
                    <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
                        <CheckCircle size={40} className="text-green-500" />
                    </div>
                    <h2 className="font-display text-2xl font-bold text-[var(--color-dark)] mb-2">Request Received!</h2>
                    <p className="text-gray-500 mb-6 text-sm leading-relaxed">
                        Our team will review your custom trip request and get back to you within 24 hours with a personalised itinerary and pricing.
                    </p>
                    <Link href="/" className="btn bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-light)]">
                        Back to Home
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div>
            {/* Header */}
            <div className="page-header section-padding">
                <div className="container-max">
                    <span className="section-tag">
                        <span className="section-tag-line" />
                        Tailored for You
                    </span>
                    <h1 className="font-display text-4xl md:text-5xl font-bold mt-2 mb-4">
                        Plan Your Custom Trip
                    </h1>
                    <p className="text-gray-400 max-w-lg">
                        Tell us about your dream journey and we&apos;ll build the perfect itinerary — hotels, transport, and activities included.
                    </p>
                </div>
            </div>

            <div className="section-padding" style={{ background: 'var(--color-surface)' }}>
                <div className="container-max">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                        {/* Info cards */}
                        <div className="lg:col-span-1 space-y-4">
                            {INFO_CARDS.map(({ icon: Icon, title, desc }) => (
                                <div key={title} className="flex gap-4 p-5 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'var(--color-accent-10)' }}>
                                        <Icon size={18} style={{ color: 'var(--color-accent)' }} />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-[var(--color-dark)] text-sm">{title}</h3>
                                        <p className="text-gray-500 text-xs mt-0.5 leading-relaxed">{desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Form */}
                        <div className="lg:col-span-2">
                            <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-5">
                                <h2 className="font-display text-2xl font-bold text-[var(--color-dark)]">Trip Details</h2>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {[
                                        { label: 'Full Name *', name: 'customerName', type: 'text', ph: 'Muhammad Ali', required: true },
                                        { label: 'Email *', name: 'customerEmail', type: 'email', ph: 'you@example.com', required: true },
                                        { label: 'Phone *', name: 'customerPhone', type: 'text', ph: '+92 300 0000000', required: true },
                                        { label: 'Destination *', name: 'destination', type: 'text', ph: 'e.g. Hunza, Skardu', required: true },
                                        { label: 'Number of Days *', name: 'days', type: 'number', ph: '3', required: true },
                                        { label: 'Number of People', name: 'numberOfPeople', type: 'number', ph: '2', required: false },
                                    ].map(({ label, name, type, ph, required }) => (
                                        <div key={name}>
                                            <label className="input-label">{label}</label>
                                            <input
                                                type={type}
                                                placeholder={ph}
                                                min={type === 'number' ? 1 : undefined}
                                                {...register(name as keyof FormValues, required ? { required: 'Required' } : {})}
                                                className="input"
                                            />
                                            {errors[name as keyof FormValues] && (
                                                <p className="input-error">{(errors[name as keyof FormValues] as any)?.message}</p>
                                            )}
                                        </div>
                                    ))}

                                    <div className="sm:col-span-2">
                                        <label className="input-label">Preferred Start Date</label>
                                        <input type="date" {...register('startDate')} className="input" />
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label className="input-label">Inspiration Image / Poster (Optional)</label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            {...register('posterImage')}
                                            className="w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[var(--color-primary-10)] file:text-[var(--color-primary)] hover:file:bg-[var(--color-primary-20)] transition-all cursor-pointer"
                                        />
                                        <p className="text-gray-400 text-[10px] mt-1">Upload a photo of a place you saw online or a moodboard for your trip.</p>
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label className="input-label">Activities & Preferences *</label>
                                        <textarea
                                            {...register('activities', { required: 'Please describe your activity preferences' })}
                                            rows={4}
                                            className="input resize-none"
                                            placeholder="Describe the type of activities, accommodation preferences, any special requirements..."
                                        />
                                        {errors.activities && <p className="input-error">{errors.activities.message}</p>}
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="btn btn-full bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-light)] disabled:opacity-60"
                                >
                                    {isSubmitting
                                        ? <><Loader2 size={18} className="animate-spin" /> Submitting…</>
                                        : 'Submit Trip Request →'
                                    }
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
