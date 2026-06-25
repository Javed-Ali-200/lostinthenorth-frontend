import Image from 'next/image';
import prisma from '@/lib/prisma';
import TrekkingCard from '@/components/trekking/TrekkingCard';
import { Search, MapPin, Check, TrendingUp, Users, Award, ShieldCheck, Star } from 'lucide-react';
import type { Trekking } from '@/types';

export const metadata = { title: 'Trekking Expeditions – The Lost in the North' };

async function getTrekkings() {
    try {
        return await prisma.trekking.findMany({ orderBy: { createdAt: 'desc' } });
    } catch {
        return [];
    }
}

const LOCATION_TAGS = ['Karakoram', 'Himalayas', 'Hindukush', 'Baltistan', 'Gilgit', 'Chitral', 'Skardu', 'Nagar'];

const HIGHLIGHTS = [
    { title: 'K2 Base Camp & Concordia', desc: 'Trek to the base of the world\'s second-highest mountain, surrounded by a breathtaking amphitheater of 8,000-meter peaks at Concordia.' },
    { title: 'Nanga Parbat Circuits', desc: 'Experience the majestic \'Killer Mountain\' from its formidable Rupal Face, the serene Fairy Meadows, or via the challenging Mazeno Pass.' },
    { title: 'Snow Lake & Glacial Traverse', desc: 'Undertake one of the longest continuous glacier traverses outside the polar regions, reaching the vast glacial basin of Snow Lake.' },
    { title: 'Hindukush Exploration', desc: 'Discover the less-traveled Chitral region, with treks to Tirich Mir Base Camp and over high passes, engaging with unique Kalasha and Wakhi cultures.' },
];

const INCLUSIONS = [
    'Assistance upon arrival/departure.',
    'Briefing/Debriefing at Tourism Department.',
    'Hotel accommodation with full board meals.',
    'All meals during trek as per itinerary.',
    'Porterage of 16 kg per person.',
    'Road transfers between airport/hotel and within city as per itinerary.',
    'Sleeping tents, mattresses, mess, kitchen and toilet tent with tables/field stools and camping ground fees.',
    'Kitchen equipment, crockery, cutlery, fuel and related community gear.',
    'Wages of English speaking guide, sardar, cook and assistant (s).',
    'Insurance of our field staff and low altitude porters (except helicopter rescue).',
    'Porterage at airports, hotels, toll taxes and parking fee etc.',
];

const STATS = [
    { label: 'Success Rate', value: '98%', icon: TrendingUp },
    { label: 'Happy Travelers', value: '1,200+', icon: Users },
    { label: 'Years Experience', value: '30+', icon: Award },
    { label: 'Expert Guides', value: '25+', icon: ShieldCheck },
];

export default async function TrekkingPage() {
    const trekkings = await getTrekkings();

    return (
        <div className="bg-white">
            {/* Page Header */}
            <div 
                className="page-header section-padding"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop')" }}
            >
                <div className="container-max px-4">
                    <span className="section-tag text-white">
                        <span className="section-tag-line bg-white" style={{ backgroundColor: '#ffffff' }} />
                        Active Expeditions 2024
                    </span>
                    <h1 className="font-display text-4xl md:text-5xl font-bold mt-2 mb-4 text-white text-shadow-md">
                        Trekking Expeditions <span className="text-[var(--color-accent)]">in Pakistan</span>
                    </h1>
                    <p className="text-gray-200 max-w-lg leading-relaxed text-shadow-sm font-medium mb-6">
                        Embark on an epic adventure through Pakistan's legendary mountain ranges: the Karakoram, Himalayas, and Hindukush. Our trekking expeditions offer unparalleled access to pristine alpine meadows and remote valleys.
                    </p>
                    <div className="flex flex-wrap gap-2.5">
                        {LOCATION_TAGS.map((tag) => (
                            <button key={tag} className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-light)] text-white px-4 py-1.5 rounded-full text-xs font-bold transition-all hover:scale-105 flex items-center gap-1.5 shadow-md">
                                <MapPin size={12} className="shrink-0" /> {tag}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Search Bar Floating */}
            <div className="container-max relative z-20 -mt-10 px-4">
                <div className="bg-dark/80 backdrop-blur-xl border border-white/10 p-4 rounded-3xl shadow-2xl flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input 
                            type="text" 
                            placeholder="Search by trek name..."
                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all"
                        />
                    </div>
                    <div className="w-full md:w-48">
                        <select className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 px-4 text-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all appearance-none cursor-pointer">
                            <option value="">All Trekkings</option>
                            <option value="karakoram">Karakoram</option>
                            <option value="himalayas">Himalayas</option>
                        </select>
                    </div>
                    <button className="btn bg-[var(--color-accent)] hover:bg-[var(--color-accent-dark)] text-white px-8 py-3.5 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-95 shadow-lg">
                        <Search size={20} /> Search
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <section className="section-padding pt-24 bg-[var(--color-surface)]">
                <div className="container-max px-4">
                    <div className="flex flex-col lg:flex-row gap-12">
                        {/* Listings Grid */}
                        <div className="lg:w-2/3">
                            <h2 className="font-display text-3xl font-bold text-dark mb-10 flex items-center gap-4">
                                Available Trekkings <span className="text-[var(--color-primary)]">- all</span>
                            </h2>

                            {trekkings.length === 0 ? (
                                <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
                                    <div className="text-6xl mb-4 opacity-30">🏔️</div>
                                    <p className="text-gray-500 font-medium">No trekking expeditions found matching your criteria.</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {trekkings.map((trek) => (
                                        <TrekkingCard key={trek.id} trek={trek} />
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Sidebars */}
                        <div className="lg:w-1/3 space-y-8">
                            {/* Treks Highlights */}
                            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                                <h3 className="font-display text-xl font-bold text-dark mb-6 flex items-center gap-3">
                                    <Award className="text-[var(--color-primary)]" /> Treks Highlights
                                </h3>
                                <ul className="space-y-6">
                                    {HIGHLIGHTS.map((h, i) => (
                                        <li key={i} className="flex gap-4">
                                            <span className="w-2 h-2 rounded-full bg-[var(--color-primary)] mt-1.5 shrink-0" />
                                            <div>
                                                <h4 className="font-bold text-sm text-dark mb-1">{h.title}:</h4>
                                                <p className="text-xs text-gray-500 leading-relaxed font-light">{h.desc}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Inclusions */}
                            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                                <h3 className="font-display text-xl font-bold text-dark mb-6 flex items-center gap-3">
                                    <Check className="text-[var(--color-primary)]" /> Inclusions
                                </h3>
                                <ul className="space-y-3">
                                    {INCLUSIONS.map((inc, i) => (
                                        <li key={i} className="flex gap-3 text-xs text-gray-600 leading-relaxed">
                                            <Check className="text-[var(--color-primary)] shrink-0 mt-0.5" size={14} />
                                            <span>{inc}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Quick Stats */}
                            <div className="bg-[var(--color-primary)] p-8 rounded-3xl text-white shadow-xl shadow-primary/20">
                                <h3 className="font-display text-2xl font-bold mb-8">Quick Stats</h3>
                                <div className="space-y-6">
                                    {STATS.map((stat, i) => (
                                        <div key={i} className="flex items-center justify-between group">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-[var(--color-primary)] transition-all duration-300">
                                                    <stat.icon size={20} />
                                                </div>
                                                <span className="text-sm font-medium text-white/90">{stat.label}</span>
                                            </div>
                                            <span className="text-xl font-bold">{stat.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
