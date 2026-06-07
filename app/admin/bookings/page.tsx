'use client';

import React, { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { bookingApi } from '@/services/api';
import { formatPrice, formatDate, getStatusColor } from '@/lib/utils';
import type { Booking } from '@/types';
import toast from 'react-hot-toast';

const STATUSES = ['PENDING', 'CONFIRMED', 'PREPARING', 'EXPEDITION_LIVE', 'COMPLETED', 'CANCELLED'];

export default function AdminBookingsPage() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const [expandedId, setExpandedId] = useState<string | null>(null);

    const load = async () => {
        try { setBookings((await bookingApi.getAll()).data.data || []); }
        catch { toast.error('Failed to load bookings'); }
        finally { setLoading(false); }
    };

    useEffect(() => { load(); }, []);

    const updateStatus = async (id: string, status: string) => {
        try { await bookingApi.updateStatus(id, status); toast.success('Status updated'); load(); }
        catch { toast.error('Update failed'); }
    };

    const getServiceName = (b: Booking) => {
        if (b.tour) return b.tour.title;
        if (b.car) return b.car.name;
        if (b.hotel) return b.hotel.name;
        if (b.trekking) return b.trekking.title;
        return 'Unknown Service';
    };

    return (
        <div>
            <div className="mb-6">
                <h1 className="font-display text-2xl font-bold text-dark">Bookings</h1>
                <p className="text-gray-500 text-sm">{bookings.length} total bookings</p>
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-20"><Loader2 size={32} className="animate-spin text-teal" /></div>
            ) : (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-stone-50 border-b border-gray-100">
                                <tr>
                                    {['Booking #', 'Customer', 'Service', 'Dates', 'People', 'Total', 'Status', 'Update'].map(h => (
                                        <th key={h} className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {bookings.length === 0 ? (
                                    <tr><td colSpan={8} className="text-center py-12 text-gray-400">No bookings yet.</td></tr>
                                ) : bookings.map((b) => (
                                    <React.Fragment key={b.id}>
                                        <tr 
                                            className={`hover:bg-stone-50 cursor-pointer ${expandedId === b.id ? 'bg-stone-50' : ''}`}
                                            onClick={() => setExpandedId(expandedId === b.id ? null : b.id)}
                                        >
                                            <td className="px-5 py-4 font-mono text-xs text-gray-600">{b.bookingNumber}</td>
                                            <td className="px-5 py-4">
                                                <p className="font-medium text-dark">{b.customerName}</p>
                                                <p className="text-gray-400 text-xs">{b.customerEmail}</p>
                                            </td>
                                            <td className="px-5 py-4">
                                                <p className="font-medium text-dark text-xs">{getServiceName(b)}</p>
                                                <span className="px-2 py-0.5 bg-teal/10 text-teal rounded-full text-[10px] font-medium uppercase">{b.serviceType}</span>
                                            </td>
                                            <td className="px-5 py-4 text-gray-500 text-xs">
                                                <p>{formatDate(b.startDate)}</p>
                                                <p>→ {formatDate(b.endDate)}</p>
                                            </td>
                                            <td className="px-5 py-4 text-gray-500">{b.numberOfPeople}</td>
                                            <td className="px-5 py-4 font-medium text-teal">{formatPrice(b.totalPrice)}</td>
                                            <td className="px-5 py-4">
                                                <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${getStatusColor(b.status)}`}>
                                                    {b.status.replace('_', ' ')}
                                                </span>
                                            </td>
                                            <td className="px-5 py-4" onClick={e => e.stopPropagation()}>
                                                <select
                                                    value={b.status}
                                                    onChange={e => updateStatus(b.id, e.target.value)}
                                                    className="border border-gray-200 rounded-lg px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-teal bg-white"
                                                >
                                                    {STATUSES.map(s => <option key={s} value={s}>{s.replace('_', ' ')}</option>)}
                                                </select>
                                            </td>
                                        </tr>
                                        {expandedId === b.id && (
                                            <tr className="bg-stone-50">
                                                <td colSpan={8} className="px-8 py-6 border-b border-gray-100">
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-top-2">
                                                        <div>
                                                            <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Add-ons & Extras</h4>
                                                            {b.addOns && b.addOns.length > 0 ? (
                                                                <div className="flex flex-wrap gap-2">
                                                                    {b.addOns.map(addon => (
                                                                        <span key={addon} className="px-3 py-1 bg-white border border-gray-200 rounded-lg text-xs font-medium text-dark shadow-sm capitalize">
                                                                            {addon}
                                                                        </span>
                                                                    ))}
                                                                </div>
                                                            ) : (
                                                                <p className="text-sm text-gray-400 italic">No add-ons selected</p>
                                                            )}
                                                        </div>
                                                        <div>
                                                            <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Special Requests</h4>
                                                            {b.specialRequests ? (
                                                                <p className="text-sm text-gray-600 bg-white p-4 rounded-xl border border-gray-200 shadow-sm italic leading-relaxed">
                                                                    &ldquo;{b.specialRequests}&rdquo;
                                                                </p>
                                                            ) : (
                                                                <p className="text-sm text-gray-400 italic">No special requests provided</p>
                                                            )}
                                                        </div>
                                                        <div className="md:col-span-2">
                                                            <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Customer Phone</h4>
                                                            <p className="text-sm font-medium text-dark">{b.customerPhone}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </React.Fragment>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
