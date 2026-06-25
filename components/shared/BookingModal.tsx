'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { X, Loader2, CheckCircle, User, Calendar, CreditCard } from 'lucide-react';
import { bookingApi } from '@/services/api';
import { sendBookingConfirmationEmail } from '@/utils/emailjs';
import toast from 'react-hot-toast';
import type { BookingFormData, ServiceType } from '@/types';

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    serviceId: string;
    serviceType: ServiceType;
    serviceTitle: string;
    pricePerUnit: number;
}

interface FormValues {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    startDate: string;
    endDate: string;
    numberOfPeople: number;
    specialRequests?: string;
}

const STEPS = [
    { id: 1, label: 'Details', icon: User },
    { id: 2, label: 'Dates', icon: Calendar },
    { id: 3, label: 'Confirm', icon: CreditCard },
];

export default function BookingModal({
    isOpen, onClose, serviceId, serviceType, serviceTitle, pricePerUnit,
}: BookingModalProps) {
    const [formStep, setFormStep] = useState(1);
    const [step, setStep] = useState<'form' | 'success'>('form');
    const [bookingNumber, setBookingNumber] = useState('');

    const {
        register,
        handleSubmit,
        reset,
        watch,
        trigger,
        formState: { errors, isSubmitting },
    } = useForm<FormValues>({ defaultValues: { numberOfPeople: 1 } });

    if (!isOpen) return null;

    const startDate = watch('startDate');
    const endDate = watch('endDate');
    const people = watch('numberOfPeople') || 1;

    const calculateTotal = () => {
        if (!startDate || !endDate) return pricePerUnit;
        const days = Math.max(
            1,
            Math.ceil((new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24))
        );
        return serviceType === 'TOUR'
            ? pricePerUnit * people
            : pricePerUnit * days * (serviceType === 'HOTEL' ? people : 1);
    };

    const onSubmit = async (values: FormValues) => {
        try {
            const payload: BookingFormData = {
                ...values,
                serviceId,
                serviceType,
                numberOfPeople: Number(values.numberOfPeople),
            };
            const res = await bookingApi.create(payload);
            const booking = res.data.data;
            setBookingNumber(booking.bookingNumber);
            try {
                await sendBookingConfirmationEmail({
                    customerName: values.customerName,
                    customerEmail: values.customerEmail,
                    customerPhone: values.customerPhone,
                    serviceTitle,
                    serviceType,
                    startDate: values.startDate,
                    endDate: values.endDate,
                    numberOfPeople: Number(values.numberOfPeople),
                    totalPrice: calculateTotal(),
                    specialRequests: values.specialRequests,
                    bookingNumber: booking.bookingNumber,
                });
            } catch (emailErr) {
                console.warn('Email notification failed:', emailErr);
            }
            setStep('success');
        } catch (err: any) {
            toast.error(err.response?.data?.message || 'Booking failed. Please try again.');
        }
    };

    const handleClose = () => {
        onClose();
        setTimeout(() => { setStep('form'); setFormStep(1); reset(); }, 300);
    };

    const handleNext = async () => {
        let valid = false;
        if (formStep === 1) {
            valid = await trigger(['customerName', 'customerEmail', 'customerPhone']);
        } else if (formStep === 2) {
            valid = await trigger(['startDate', 'endDate']);
        }
        if (valid) setFormStep((s) => Math.min(s + 1, 3));
    };

    const today = new Date().toISOString().split('T')[0];

    return (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleClose} />
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-scale-in">

                {/* Header */}
                <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
                    <div>
                        <h2 className="font-display text-xl font-bold text-[var(--color-dark)]">Book Now</h2>
                        <p className="text-gray-400 text-xs line-clamp-1 mt-0.5">{serviceTitle}</p>
                    </div>
                    <button onClick={handleClose} className="p-2 hover:bg-gray-100 rounded-full transition">
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6">
                    {step === 'success' ? (
                        /* Success State */
                        <div className="text-center py-8 animate-scale-in">
                            <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
                                <CheckCircle size={40} className="text-green-500" />
                            </div>
                            <h3 className="font-display text-2xl font-bold text-[var(--color-dark)] mb-2">Booking Confirmed!</h3>
                            <p className="text-gray-500 mb-2">Your booking reference:</p>
                            <span className="inline-block bg-[var(--color-primary-10)] text-[var(--color-primary)] font-bold text-lg px-5 py-2.5 rounded-xl mb-4 tracking-wider">
                                {bookingNumber}
                            </span>
                            <p className="text-gray-400 text-sm mb-6 max-w-xs mx-auto">
                                A confirmation email has been sent. Our team will contact you within 24 hours.
                            </p>
                            <button
                                onClick={handleClose}
                                className="btn bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-light)]"
                            >
                                Done
                            </button>
                        </div>
                    ) : (
                        <>
                            {/* Progress Steps */}
                            <div className="flex items-center justify-between mb-7">
                                {STEPS.map((s, i) => {
                                    const Icon = s.icon;
                                    const isActive = formStep === s.id;
                                    const isDone = formStep > s.id;
                                    return (
                                        <div key={s.id} className="flex items-center flex-1">
                                            <div className="flex flex-col items-center">
                                                <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                                                    isDone ? 'bg-green-500' : isActive ? 'bg-[var(--color-primary)]' : 'bg-gray-100'
                                                }`}>
                                                    {isDone
                                                        ? <CheckCircle size={16} className="text-white" />
                                                        : <Icon size={16} className={isActive ? 'text-white' : 'text-gray-400'} />
                                                    }
                                                </div>
                                                <span className={`text-[10px] font-bold uppercase tracking-wider mt-1.5 ${
                                                    isActive ? 'text-[var(--color-primary)]' : isDone ? 'text-green-600' : 'text-gray-400'
                                                }`}>{s.label}</span>
                                            </div>
                                            {i < STEPS.length - 1 && (
                                                <div className={`flex-1 h-0.5 mx-2 mb-4 rounded-full transition-all ${isDone ? 'bg-green-400' : 'bg-gray-100'}`} />
                                            )}
                                        </div>
                                    );
                                })}
                            </div>

                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                {/* Step 1: Personal Details */}
                                {formStep === 1 && (
                                    <div className="space-y-4 animate-slide-up">
                                        <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Personal Information</p>
                                        <div>
                                            <label className="input-label">Full Name *</label>
                                            <input
                                                {...register('customerName', { required: 'Name is required' })}
                                                className="input"
                                                placeholder="Muhammad Ali"
                                            />
                                            {errors.customerName && <p className="input-error">{errors.customerName.message}</p>}
                                        </div>
                                        <div>
                                            <label className="input-label">Email *</label>
                                            <input
                                                type="email"
                                                {...register('customerEmail', { required: 'Email is required' })}
                                                className="input"
                                                placeholder="you@example.com"
                                            />
                                            {errors.customerEmail && <p className="input-error">{errors.customerEmail.message}</p>}
                                        </div>
                                        <div>
                                            <label className="input-label">Phone *</label>
                                            <input
                                                {...register('customerPhone', { required: 'Phone is required' })}
                                                className="input"
                                                placeholder="+92 300 0000000"
                                            />
                                            {errors.customerPhone && <p className="input-error">{errors.customerPhone.message}</p>}
                                        </div>
                                    </div>
                                )}

                                {/* Step 2: Dates & People */}
                                {formStep === 2 && (
                                    <div className="space-y-4 animate-slide-up">
                                        <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Travel Dates</p>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="input-label">Start Date *</label>
                                                <input
                                                    type="date"
                                                    min={today}
                                                    {...register('startDate', { required: 'Start date required' })}
                                                    className="input"
                                                />
                                                {errors.startDate && <p className="input-error">{errors.startDate.message}</p>}
                                            </div>
                                            <div>
                                                <label className="input-label">End Date *</label>
                                                <input
                                                    type="date"
                                                    min={startDate || today}
                                                    {...register('endDate', { required: 'End date required' })}
                                                    className="input"
                                                />
                                                {errors.endDate && <p className="input-error">{errors.endDate.message}</p>}
                                            </div>
                                        </div>
                                        <div>
                                            <label className="input-label">Number of People</label>
                                            <input
                                                type="number"
                                                min={1}
                                                max={50}
                                                {...register('numberOfPeople', { min: 1 })}
                                                className="input"
                                            />
                                        </div>
                                        <div>
                                            <label className="input-label">Special Requests</label>
                                            <textarea
                                                {...register('specialRequests')}
                                                rows={3}
                                                className="input resize-none"
                                                placeholder="Any special requirements..."
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* Step 3: Confirm */}
                                {formStep === 3 && (
                                    <div className="space-y-4 animate-slide-up">
                                        <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Booking Summary</p>
                                        <div className="bg-[var(--color-surface)] rounded-xl p-4 space-y-3 text-sm">
                                            <div className="flex justify-between">
                                                <span className="text-gray-500">Service</span>
                                                <span className="font-medium text-right max-w-[60%] line-clamp-1">{serviceTitle}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-500">Type</span>
                                                <span className="font-medium">{serviceType}</span>
                                            </div>
                                            {startDate && endDate && (
                                                <div className="flex justify-between">
                                                    <span className="text-gray-500">Dates</span>
                                                    <span className="font-medium">{startDate} → {endDate}</span>
                                                </div>
                                            )}
                                            <div className="flex justify-between">
                                                <span className="text-gray-500">People</span>
                                                <span className="font-medium">{people}</span>
                                            </div>
                                            {startDate && endDate && (
                                                <div className="flex justify-between border-t border-gray-200 pt-3 mt-1">
                                                    <span className="font-bold text-[var(--color-dark)]">Estimated Total</span>
                                                    <span className="font-bold text-[var(--color-primary)] text-base">
                                                        PKR {calculateTotal().toLocaleString()}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                        <p className="text-xs text-gray-400">
                                            By confirming, you agree to our cancellation policy. A team member will contact you to finalise details.
                                        </p>
                                    </div>
                                )}

                                {/* Navigation buttons */}
                                <div className="flex gap-3 pt-2">
                                    {formStep > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => setFormStep((s) => s - 1)}
                                            className="btn btn-outline flex-1"
                                        >
                                            Back
                                        </button>
                                    )}
                                    {formStep < 3 ? (
                                        <button
                                            type="button"
                                            onClick={handleNext}
                                            className="btn bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-light)] flex-1"
                                        >
                                            Continue →
                                        </button>
                                    ) : (
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="btn bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-dark)] flex-1 disabled:opacity-60"
                                        >
                                            {isSubmitting ? (
                                                <><Loader2 size={18} className="animate-spin" /> Processing...</>
                                            ) : (
                                                'Confirm Booking'
                                            )}
                                        </button>
                                    )}
                                </div>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
