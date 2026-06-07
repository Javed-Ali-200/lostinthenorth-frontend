import Image from 'next/image';
import { trekkingApi } from '@/services/api';
import TrekkingCard from '@/components/trekking/TrekkingCard';
import { Search, MapPin, Check, TrendingUp, Users, Award, ShieldCheck, Star } from 'lucide-react';
import type { Trekking } from '@/types';

export const metadata = { title: 'Trekking Expeditions – The Lost in the North' };

async function getTrekkings() {
    try {
        const res = await trekkingApi.getAll();
        return res.data.data;
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
            {/* Hero Section */}
            <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
                <Image
                    src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop"
                    alt="Trekking in Pakistan"
                    fill
                    className="object-cover brightness-[0.7]"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-dark/40" />
                
                <div className="container-max relative z-10 text-center text-white px-4">
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                        <span className="text-[10px] uppercase font-bold tracking-widest">Active Expeditions 2024</span>
                    </div>

                    <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 animate-in fade-in slide-in-from-bottom-6 duration-1000">
                        Trekking Expeditions <br />
                        <span className="text-green-400">in Pakistan</span>
                    </h1>
                    
                    <p className="max-w-2xl mx-auto text-lg text-gray-200 mb-10 leading-relaxed font-light animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
                        Embark on an epic adventure through Pakistan's legendary mountain ranges: the Karakoram, Himalayas, and Hindukush. 
                        Our trekking expeditions offer unparalleled access to pristine alpine meadows and remote valleys.
                    </p>

                    <div className="flex flex-wrap justify-center gap-3 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-500">
                        {LOCATION_TAGS.map((tag) => (
                            <button key={tag} className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-full text-xs font-bold transition-all hover:scale-105 flex items-center gap-2 shadow-lg">
                                <MapPin size={12} /> {tag}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="absolute top-10 right-10 text-white/80 hidden md:block">
                    <div className="flex items-center gap-2">
                        <Star className="text-yellow-400 fill-yellow-400" size={18} />
                        <span className="text-xl font-bold">4.9/5</span>
                        <span className="text-sm border-l border-white/20 pl-2 opacity-70">(127 reviews)</span>
                    </div>
                </div>
                
                <div className="absolute top-10 left-10 text-white/80 hidden md:block">
                    <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-md text-xs font-bold border border-white/20">8-28 Days</span>
                </div>
            </section>

            {/* Search Bar Floating */}
            <div className="container-max relative z-20 -mt-16 px-4">
                <div className="bg-dark/80 backdrop-blur-xl border border-white/10 p-4 rounded-3xl shadow-2xl flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input 
                            type="text" 
                            placeholder="Search by trek name..."
                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
                        />
                    </div>
                    <div className="w-full md:w-48">
                        <select className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 px-4 text-white focus:outline-none focus:ring-2 focus:ring-green-400 transition-all appearance-none cursor-pointer">
                            <option value="">All Trekkings</option>
                            <option value="karakoram">Karakoram</option>
                            <option value="himalayas">Himalayas</option>
                        </select>
                    </div>
                    <button className="bg-green-500 hover:bg-green-600 text-white px-8 py-3.5 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-green-500/20">
                        <Search size={20} /> Search
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <section className="section-padding pt-24 bg-stone-50">
                <div className="container-max px-4">
                    <div className="flex flex-col lg:flex-row gap-12">
                        {/* Listings Grid */}
                        <div className="lg:w-2/3">
                            <h2 className="font-display text-3xl font-bold text-dark mb-10 flex items-center gap-4">
                                Available Trekkings <span className="text-green-500">- all</span>
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
                                    <Award className="text-green-500" /> Treks Highlights
                                </h3>
                                <ul className="space-y-6">
                                    {HIGHLIGHTS.map((h, i) => (
                                        <li key={i} className="flex gap-4">
                                            <span className="w-2 h-2 rounded-full bg-green-500 mt-1.5 shrink-0" />
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
                                    <Check className="text-green-500" /> Inclusions
                                </h3>
                                <ul className="space-y-3">
                                    {INCLUSIONS.map((inc, i) => (
                                        <li key={i} className="flex gap-3 text-xs text-gray-600 leading-relaxed">
                                            <Check className="text-green-500 shrink-0 mt-0.5" size={14} />
                                            <span>{inc}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Quick Stats */}
                            <div className="bg-green-600 p-8 rounded-3xl text-white shadow-xl shadow-green-600/20">
                                <h3 className="font-display text-2xl font-bold mb-8">Quick Stats</h3>
                                <div className="space-y-6">
                                    {STATS.map((stat, i) => (
                                        <div key={i} className="flex items-center justify-between group">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-green-600 transition-all duration-300">
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
