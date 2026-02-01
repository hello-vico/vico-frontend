import React from 'react';
import { ArrowRight, Calendar, Users, BarChart3 } from 'lucide-react';

const App = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-emerald-500/30">
      <div className="fixed top-0 left-0 bg-red-500 text-white p-2 z-[9999]">APP IS RUNNING</div>
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

export default App;
