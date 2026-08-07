'use client';

import { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, Loader2, X, Check, MapPin, Star, Mountain } from 'lucide-react';
import { trekkingApi } from '@/services/api';
import { formatPrice } from '@/lib/utils';
import type { Trekking } from '@/types';
import toast from 'react-hot-toast';

export default function AdminTrekkingPage() {
    const [trekkings, setTrekkings] = useState<Trekking[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editing, setEditing] = useState<Trekking | null>(null);
    const [deleting, setDeleting] = useState<string | null>(null);

    const load = async () => {
        try {
            const res = await trekkingApi.getAll();
            setTrekkings(res.data.data);
        } catch {
            toast.error('Failed to load trekking expeditions');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { load(); }, []);

    const handleDelete = async (id: string) => {
        if (!confirm('Delete this trekking expedition?')) return;
        setDeleting(id);
        try {
            await trekkingApi.delete(id);
            toast.success('Trekking deleted');
            load();
        } catch {
            toast.error('Delete failed');
        } finally {
            setDeleting(null);
        }
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="font-display text-2xl font-bold text-dark flex items-center gap-3">
                        <Mountain className="text-teal" /> Trekking Expeditions
                    </h1>
                    <p className="text-gray-500 text-sm">{trekkings.length} expeditions total</p>
                </div>
                <button
                    onClick={() => { setEditing(null); setShowForm(true); }}
                    className="flex items-center gap-2 px-4 py-2.5 bg-teal text-white rounded-xl text-sm font-semibold hover:bg-teal/90 transition shadow-lg shadow-teal/10"
                >
                    <Plus size={16} /> Add Expedition
                </button>
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-20"><Loader2 size={32} className="animate-spin text-teal" /></div>
            ) : (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-stone-50 border-b border-gray-100">
                                <tr>
                                    {['Title', 'Location', 'Difficulty', 'Duration', 'Price', 'Rating', 'Status', 'Actions'].map(h => (
                                        <th key={h} className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {trekkings.length === 0 ? (
                                    <tr><td colSpan={8} className="text-center py-12 text-gray-400">No expeditions yet. Add one above.</td></tr>
                                ) : trekkings.map((trek) => (
                                    <tr key={trek.id} className="hover:bg-stone-50 transition">
                                        <td className="px-5 py-4 font-medium text-dark">{trek.title}</td>
                                        <td className="px-5 py-4 text-gray-500 flex items-center gap-1.5"><MapPin size={12} className="text-teal" /> {trek.location}</td>
                                        <td className="px-5 py-4">
                                            <span className="px-2 py-0.5 bg-orange-100 text-orange-700 rounded-lg text-[10px] font-bold uppercase">{trek.difficulty}</span>
                                        </td>
                                        <td className="px-5 py-4 text-gray-500">{trek.duration}d</td>
                                        <td className="px-5 py-4 text-teal font-medium">{formatPrice(trek.price)}</td>
                                        <td className="px-5 py-4 flex items-center gap-1">
                                            <Star size={12} className="text-yellow-400 fill-yellow-400" />
                                            <span className="font-bold">{trek.rating}</span>
                                            <span className="text-[10px] text-gray-400">({trek.reviewsCount})</span>
                                        </td>
                                        <td className="px-5 py-4">
                                            <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${trek.available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                                                {trek.available ? 'Active' : 'Closed'}
                                            </span>
                                        </td>
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => { setEditing(trek); setShowForm(true); }}
                                                    className="p-1.5 rounded-lg hover:bg-teal/10 text-teal transition"
                                                >
                                                    <Edit2 size={14} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(trek.id)}
                                                    disabled={deleting === trek.id}
                                                    className="p-1.5 rounded-lg hover:bg-red-50 text-red-400 transition disabled:opacity-40"
                                                >
                                                    {deleting === trek.id ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {showForm && <TrekkingFormModal trek={editing} onClose={() => setShowForm(false)} onSave={load} />}
        </div>
    );
}

function TrekkingFormModal({ trek, onClose, onSave }: { trek: Trekking | null; onClose: () => void; onSave: () => void }) {
    const [saving, setSaving] = useState(false);
    const [form, setForm] = useState({
        title: trek?.title || '',
        description: trek?.description || '',
        price: trek?.price || '',
        duration: trek?.duration || '',
        location: trek?.location || '',
        difficulty: trek?.difficulty || 'Moderate',
        rating: trek?.rating || '4.8',
        reviewsCount: trek?.reviewsCount || '50',
        maxGroupSize: trek?.maxGroupSize || 12,
        featured: trek?.featured || false,
        available: trek?.available ?? true,
        included: trek?.included?.join('\n') || '',
        excluded: trek?.excluded?.join('\n') || '',
        highlights: trek?.highlights?.join('\n') || '',
        locationTags: trek?.locationTags?.join('\n') || '',
        itinerary: trek?.itinerary || '',
    });
    const [image, setImage] = useState<File | null>(null);
    const [images, setImages] = useState<File[]>([]);

    const handleSave = async () => {
        setSaving(true);
        try {
            const fd = new FormData();
            Object.entries(form).forEach(([k, v]) => {
                if (['included', 'excluded', 'highlights', 'locationTags'].includes(k)) {
                    // Convert line-separated string to comma-separated for service pick up
                    fd.append(k, (v as string).split('\n').filter(l => l.trim()).join(','));
                } else {
                    fd.append(k, String(v));
                }
            });

            if (image) fd.append('image', image);
            if (images.length > 0) {
                images.forEach(img => fd.append('images', img));
            }

            if (trek) await trekkingApi.update(trek.id, fd);
            else await trekkingApi.create(fd);
            
            toast.success(trek ? 'Expedition updated' : 'Expedition created');
            onSave(); 
            onClose();
        } catch { 
            toast.error('Save failed'); 
        } finally { 
            setSaving(false); 
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col">
                <div className="bg-white border-b border-gray-100 px-8 py-5 flex items-center justify-between">
                    <div>
                        <h2 className="font-display text-xl font-bold text-dark">{trek ? 'Edit Expedition' : 'New Trekking Expedition'}</h2>
                        <p className="text-gray-400 text-xs">Fill in the details for the trekking expedition</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition"><X size={20} /></button>
                </div>

                <div className="flex-1 overflow-y-auto p-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Expedition Title</label>
                            <input value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
                                placeholder="e.g. K2 Base Camp Trek"
                                className="w-full border border-gray-200 rounded-2xl px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal/20 focus:border-teal transition-all" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Base Location</label>
                            <input value={form.location} onChange={e => setForm(p => ({ ...p, location: e.target.value }))}
                                placeholder="e.g. Karakoram Range, Pakistan"
                                className="w-full border border-gray-200 rounded-2xl px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal/20 focus:border-teal transition-all" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Price (PKR)</label>
                            <input type="number" value={form.price} onChange={e => setForm(p => ({ ...p, price: e.target.value }))}
                                className="w-full border border-gray-200 rounded-2xl px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal/20 focus:border-teal transition-all" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Duration (Days)</label>
                            <input type="number" value={form.duration} onChange={e => setForm(p => ({ ...p, duration: e.target.value }))}
                                className="w-full border border-gray-200 rounded-2xl px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal/20 focus:border-teal transition-all" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Difficulty</label>
                            <select value={form.difficulty} onChange={e => setForm(p => ({ ...p, difficulty: e.target.value }))}
                                className="w-full border border-gray-200 rounded-2xl px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal/20 focus:border-teal transition-all bg-white">
                                <option value="Easy">Easy</option>
                                <option value="Moderate">Moderate</option>
                                <option value="Challenging">Challenging</option>
                                <option value="Extreme">Extreme</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Max People</label>
                            <input type="number" value={form.maxGroupSize} onChange={e => setForm(p => ({ ...p, maxGroupSize: parseInt(e.target.value, 10) || 0 }))}
                                className="w-full border border-gray-200 rounded-2xl px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal/20 focus:border-teal transition-all" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Description</label>
                        <textarea value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
                            rows={4} className="w-full border border-gray-200 rounded-2xl px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal/20 focus:border-teal resize-none transition-all" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Inclusions (one per line)</label>
                            <textarea value={form.included} onChange={e => setForm(p => ({ ...p, included: e.target.value }))}
                                rows={4} className="w-full border border-gray-200 rounded-2xl px-5 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-teal/20 focus:border-teal resize-none transition-all" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Exclusions (one per line)</label>
                            <textarea value={form.excluded} onChange={e => setForm(p => ({ ...p, excluded: e.target.value }))}
                                rows={4} className="w-full border border-gray-200 rounded-2xl px-5 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-teal/20 focus:border-teal resize-none transition-all" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Highlights (one per line)</label>
                            <textarea value={form.highlights} onChange={e => setForm(p => ({ ...p, highlights: e.target.value }))}
                                rows={4} className="w-full border border-gray-200 rounded-2xl px-5 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-teal/20 focus:border-teal resize-none transition-all" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Location Tags (Himalayas, Skardu, etc.)</label>
                            <textarea value={form.locationTags} onChange={e => setForm(p => ({ ...p, locationTags: e.target.value }))}
                                rows={4} className="w-full border border-gray-200 rounded-2xl px-5 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-teal/20 focus:border-teal resize-none transition-all" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-8">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Main Image (Poster)</label>
                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-2xl hover:border-teal transition-colors">
                                <div className="space-y-1 text-center">
                                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <div className="flex text-sm text-gray-600">
                                        <label className="relative cursor-pointer bg-white rounded-md font-medium text-teal hover:text-teal/80 focus-within:outline-none">
                                            <span>Upload a file</span>
                                            <input type="file" className="sr-only" onChange={e => setImage(e.target.files?.[0] || null)} />
                                        </label>
                                    </div>
                                    <p className="text-xs text-gray-500">{image?.name || 'PNG, JPG, GIF up to 10MB'}</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Gallery Images</label>
                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-2xl hover:border-teal transition-colors">
                                <div className="space-y-1 text-center">
                                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <div className="flex text-sm text-gray-600">
                                        <label className="relative cursor-pointer bg-white rounded-md font-medium text-teal hover:text-teal/80 focus-within:outline-none">
                                            <span>Upload multiple</span>
                                            <input type="file" multiple className="sr-only" onChange={e => setImages(Array.from(e.target.files || []))} />
                                        </label>
                                    </div>
                                    <p className="text-xs text-gray-500">{images.length > 0 ? `${images.length} files selected` : 'Max 10 images'}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-stone-50 p-6 rounded-2xl flex items-center gap-8">
                        <label className="flex items-center gap-3 cursor-pointer group">
                            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${form.featured ? 'bg-teal border-teal' : 'bg-white border-gray-300 group-hover:border-teal'}`}>
                                {form.featured && <Check size={14} className="text-white" />}
                            </div>
                            <input type="checkbox" className="hidden" checked={form.featured} onChange={e => setForm(p => ({ ...p, featured: e.target.checked }))} />
                            <span className="text-sm font-bold text-gray-700">Feature on Page</span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer group">
                            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${form.available ? 'bg-green-500 border-green-500' : 'bg-white border-gray-300 group-hover:border-green-500'}`}>
                                {form.available && <Check size={14} className="text-white" />}
                            </div>
                            <input type="checkbox" className="hidden" checked={form.available} onChange={e => setForm(p => ({ ...p, available: e.target.checked }))} />
                            <span className="text-sm font-bold text-gray-700">Accepting Bookings</span>
                        </label>
                    </div>
                </div>

                <div className="bg-white border-t border-gray-100 px-8 py-5 flex items-center justify-end gap-3">
                    <button onClick={onClose} className="px-6 py-2.5 text-sm font-bold text-gray-400 hover:text-gray-600 transition">Cancel</button>
                    <button onClick={handleSave} disabled={saving}
                        className="px-10 py-3 bg-teal text-white rounded-2xl font-bold hover:bg-teal/90 transition flex items-center justify-center gap-2 disabled:opacity-60 shadow-lg shadow-teal/10">
                        {saving ? <><Loader2 size={18} className="animate-spin" />Processing...</> : trek ? 'Save Changes' : 'Launch Expedition'}
                    </button>
                </div>
            </div>
        </div>
    );
}
