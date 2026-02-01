import React, { useEffect, useState } from 'react';
import { ArrowRight, Calendar, Users, BarChart3, MapPin, Phone, Loader2 } from 'lucide-react';
import { getRistoranti } from '../api/ristoranti';
import type { Ristorante } from '../types';

const Landing = () => {
  const [restaurants, setRestaurants] = useState<Ristorante[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        setLoading(true);
        const data = await getRistoranti();
        setRestaurants(data);
      } catch (err) {
        console.error('Error fetching restaurants:', err);
        setError('Failed to load restaurants');
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-emerald-500/30">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                <Calendar className="text-white w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight">VICO</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Features</a>
              <a href="#about" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">About</a>
              <button className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-sm font-bold rounded-full transition-all duration-300">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl opacity-20 blur-[120px] pointer-events-none">
          <div className="absolute inset-0 bg-emerald-500/50 rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-white via-slate-300 to-slate-500 bg-clip-text text-transparent">
              Elevate Your Restaurant <br className="hidden md:block" /> Experience with VICO
            </h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-400 mb-10 leading-relaxed">
              The all-in-one dashboard designed for modern restaurateurs. Manage bookings, staff, and analytics with seamless efficiency.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="w-full sm:w-auto px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-emerald-500/20 group">
                Try it Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="w-full sm:w-auto px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl border border-slate-800 transition-all duration-300">
                View Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Calendar className="w-6 h-6 text-emerald-400" />}
              title="Table Management"
              description="Visual floor plans and real-time status updates for every table in your restaurant."
            />
            <FeatureCard
              icon={<Users className="w-6 h-6 text-emerald-400" />}
              title="Staff Scheduling"
              description="Ease the burden of roster management with intuitive drag-and-drop scheduling."
            />
            <FeatureCard
              icon={<BarChart3 className="w-6 h-6 text-emerald-400" />}
              title="Smart Analytics"
              description="Comprehensive reports on sales, peak hours, and customer preferences."
            />
          </div>
        </div>
      </section>

      {/* Restaurants Section */}
      <section id="restaurants" className="py-20 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              Our Partner Restaurants
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Discover the elite establishments using VICO to transform their guest experience.
            </p>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <Loader2 className="w-10 h-10 text-emerald-500 animate-spin" />
              <p className="text-slate-500 animate-pulse">Fetching latest restaurant data...</p>
            </div>
          ) : error ? (
            <div className="text-center py-20 bg-red-500/5 border border-red-500/20 rounded-2xl">
              <p className="text-red-400">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 text-sm font-medium text-emerald-500 hover:text-emerald-400"
              >
                Try Again
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {restaurants.map((restaurant) => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} />
              ))}
              {restaurants.length === 0 && (
                <div className="col-span-full text-center py-20 border border-dashed border-slate-800 rounded-2xl">
                  <p className="text-slate-500 text-lg">No restaurants available at the moment.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Calendar className="text-emerald-500 w-6 h-6" />
            <span className="text-lg font-bold">VICO</span>
          </div>
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} Vico Dashboard. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Privacy</a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <div className="p-8 bg-slate-950 border border-slate-800 rounded-2xl hover:border-emerald-500/50 transition-all duration-300 group">
    <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center mb-6 border border-slate-800 group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-3">{title}</h3>
    <p className="text-slate-400 leading-relaxed">{description}</p>
  </div>
);

const RestaurantCard = ({ restaurant }: { restaurant: Ristorante }) => (
  <div className="group relative p-6 bg-slate-900/40 border border-slate-800 rounded-2xl hover:border-emerald-500/30 transition-all duration-300 overflow-hidden">
    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-[50px] group-hover:bg-emerald-500/20 transition-all duration-500" />

    <div className="relative">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold group-hover:text-emerald-400 transition-colors">
          {restaurant.nome}
        </h3>
        <span className="px-2 py-1 bg-emerald-500/10 text-emerald-500 text-[10px] uppercase font-bold tracking-widest rounded-md border border-emerald-500/20">
          Partner
        </span>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-3 text-slate-400 group-hover:text-slate-300 transition-colors">
          <MapPin className="w-4 h-4 text-emerald-500/70" />
          <span className="text-sm">{restaurant.indirizzo}</span>
        </div>
        <div className="flex items-center gap-3 text-slate-400 group-hover:text-slate-300 transition-colors">
          <Phone className="w-4 h-4 text-emerald-500/70" />
          <span className="text-sm font-mono">{restaurant.telefono}</span>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-slate-800/50 flex justify-between items-center">
        <div className="text-[10px] text-slate-500 uppercase tracking-tighter">
          VAT: {restaurant.p_iva}
        </div>
        <button className="text-sm font-bold text-emerald-500 flex items-center gap-1 group/btn">
          View Detail
          <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  </div>
);

export default Landing;
