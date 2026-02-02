import React from 'react';
import { Link } from 'react-router-dom';
import {
  Phone,
  BarChart3,
  CheckCircle2,
  Clock,
  ShieldCheck,
  ArrowRight,
  Smartphone,
  Play
} from 'lucide-react';

const Landing = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-emerald-500/30 overflow-x-hidden font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <span className="text-white font-bold text-xl">V</span>
              </div>
              <span className="text-2xl font-bold tracking-tight text-white">VICO</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm font-medium text-slate-400 hover:text-emerald-400 transition-colors">Vantaggi</a>
              <Link to="/login" className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-sm font-bold rounded-full border border-slate-700 hover:border-slate-600 transition-all duration-300">
                Accedi
              </Link>
              <button className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-sm font-bold rounded-full transition-all duration-300 shadow-lg shadow-emerald-500/20">
                Richiedi Demo
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl z-0 pointer-events-none">
          <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-emerald-500/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/50 border border-slate-800 mb-8 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">AI Receptionist per Ristoranti</span>
              </div>

              <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
                Lei risponde, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                  tu pensi al resto.
                </span>
              </h1>

              <p className="text-lg lg:text-xl text-slate-400 mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Vico gestisce e verifica la disponibilità dei tavoli in tempo reale, riempiendo la tua agenda di prenotazioni certe e senza errori. 24/7.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button className="w-full sm:w-auto px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-xl shadow-emerald-500/20 hover:shadow-emerald-500/40 hover:-translate-y-1">
                  RICHIEDI DEMO
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() => document.getElementById('demo-section')?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-full sm:w-auto px-8 py-4 bg-slate-900/50 hover:bg-slate-800 text-white font-bold rounded-xl border border-slate-700/50 hover:border-slate-600 backdrop-blur-sm transition-all duration-300 flex items-center justify-center gap-2 group"
                >
                  <Play className="w-5 h-5 fill-current text-slate-400 group-hover:text-emerald-400 transition-colors" />
                  Guarda come funziona
                </button>
              </div>
            </div>

            {/* Hero Visual/Dashboard Mockup */}
            <div className="flex-1 w-full max-w-[600px] lg:max-w-none relative">
              <div className="relative z-10 bg-slate-900 border border-slate-800 rounded-2xl p-2 shadow-2xl shadow-black/50 overflow-hidden transform rotate-1 hover:rotate-0 transition-transform duration-500">
                <div className="bg-slate-950 rounded-xl overflow-hidden border border-slate-800/50 aspect-video relative flex items-center justify-center group">
                  <img
                    src="https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?auto=format&fit=crop&q=80&w=1600"
                    alt="Dashboard Preview"
                    className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-30 transition-opacity"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
                  <div className="relative z-20 text-center p-8">
                    <p className="text-emerald-400 font-mono text-sm mb-2">Nuova Prenotazione</p>
                    <h3 className="text-3xl font-bold text-white mb-1">Tavolo 4 • 4 Persone</h3>
                    <p className="text-slate-400 text-sm">Domani, Ore 13:00</p>
                  </div>
                </div>
              </div>
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -left-6 z-20 bg-slate-800/90 backdrop-blur-md border border-slate-700 p-4 rounded-xl shadow-xl flex items-center gap-3 animate-bounce-slow">
                <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium">Stato Prenotazione</p>
                  <p className="text-white font-bold">Confermata</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo-section" className="py-24 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Parla ora con Vico e scopri quanto è semplice prenotare
          </h2>
          <p className="text-lg text-slate-400 mb-12 max-w-2xl mx-auto">
            Simula una finta prenotazione per provare te stesso le funzionalità.
            <br />
            <span className="text-emerald-400 italic">"prenota un tavolo per 4 persone domani alle 13.00"</span>
          </p>

          <div className="bg-slate-950 rounded-3xl border border-slate-800 p-8 shadow-2xl relative max-w-sm mx-auto group">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-[2rem] opacity-20 group-hover:opacity-40 blur transition-opacity duration-500"></div>
            <div className="relative flex flex-col items-center">
              <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mb-6 ring-4 ring-emerald-500/10 animate-[pulse_3s_infinite]">
                <Smartphone className="w-10 h-10 text-emerald-500" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Chiama Vico</h3>
              <p className="text-slate-500 text-sm mb-8">Prova la demo interattiva</p>

              <button className="w-full py-4 bg-white text-slate-950 font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-slate-200 transition-colors shadow-lg">
                <Phone className="w-5 h-5 fill-slate-950" />
                CHIAMA ADESSO
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Advantages Grid */}
      <section id="features" className="py-24 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold mb-4">
              Alcuni vantaggi che <br className="hidden md:block" />
              <span className="text-emerald-500">miglioreranno il tuo modo di lavorare</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <AdvantageCard
              icon={<Phone className="w-6 h-6 text-rose-400" />}
              title="Zero chiamate perse"
              description="Il Software intercetta e gestisce tutte le chiamate in entrata, e se la linea è occupata il cliente riceve un promemoria mentre tu una notifica di chiamata persa."
              color="rose"
            />
            <AdvantageCard
              icon={<ShieldCheck className="w-6 h-6 text-cyan-400" />}
              title="Zero Errori"
              description="Grazie all’Intelligenza Artificiale, il Software capta ogni sfumatura, sembrerà di parlare con una persona reale."
              color="cyan"
            />
            <AdvantageCard
              icon={<Clock className="w-6 h-6 text-amber-400" />}
              title="24/7 - 365"
              description="Vico non dorme mai e funziona sempre, anche quando sei chiuso. Così non perdi nemmeno una prenotazione."
              color="amber"
            />
            <AdvantageCard
              icon={<CheckCircle2 className="w-6 h-6 text-emerald-400" />}
              title="Miglior Esperienza"
              description="Un servizio telefonico sempre cortese ed efficace, che riflette l'immagine professionale del tuo locale."
              color="emerald"
            />
          </div>
        </div>
      </section>

      {/* Real-time Dashboard Feature */}
      <section className="py-24 bg-slate-900 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 order-2 lg:order-1">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-700 group">
                <img
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1600"
                  alt="Dashboard Interface"
                  className="w-full rounded-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
              </div>
            </div>

            <div className="flex-1 order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
                <BarChart3 className="w-4 h-4 text-blue-400" />
                <span className="text-xs font-bold text-blue-400 uppercase">Dashboard & Analytics</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                Vedi le prenotazioni in <br />
                <span className="text-blue-500">tempo reale</span>
              </h2>
              <p className="text-lg text-slate-400 mb-8 leading-relaxed">
                Accedi tramite Web al portale riservato per vedere tutte le prenotazioni e gestire al meglio il flusso della giornata. In tempo reale e ovunque.
              </p>
              <ul className="space-y-4 mb-8">
                {['Sincronizzazione istantanea', 'Accessibile da mobile e desktop', 'Statistiche dettagliate'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-300">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Setup Section */}
      <section className="py-24 bg-slate-950 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Start in 5 minuti</h2>
          <p className="text-xl text-slate-400 mb-16 max-w-3xl mx-auto">
            Sia che tu abbia un telefono fisso o un numero di cellulare, con la prova gratuita è inclusa l’installazione e la configurazione per la tua attività.*
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <StepCard
              number="01"
              title="Registrati"
              description="Crea il tuo account in pochi secondi e accedi alla dashboard."
            />
            <div className="hidden md:block absolute top-[60%] left-[30%] w-[10%] border-t-2 border-dashed border-slate-800 -translate-y-1/2"></div>
            <StepCard
              number="02"
              title="Collega il Numero"
              description="Imposta il trasferimento di chiamata quando sei occupato o chiuso."
            />
            <div className="hidden md:block absolute top-[60%] right-[30%] w-[10%] border-t-2 border-dashed border-slate-800 -translate-y-1/2"></div>
            <StepCard
              number="03"
              title="Vico Risponde"
              description="Goditi il tempo libero mentre Vico riempie il tuo locale."
            />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-emerald-900/10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/80 to-slate-950"></div>

        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight">
            Pronto a rivoluzionare <br /> il tuo ristorante?
          </h2>
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            <span className="px-4 py-2 bg-slate-800 rounded-full text-slate-300 text-sm font-semibold border border-slate-700">AUMENTA PRODUTTIVITÀ</span>
            <span className="px-4 py-2 bg-slate-800 rounded-full text-slate-300 text-sm font-semibold border border-slate-700">CONCENTRAZIONE</span>
            <span className="px-4 py-2 bg-slate-800 rounded-full text-slate-300 text-sm font-semibold border border-slate-700">MASSIMIZZA I COPERTI</span>
          </div>

          <button className="px-10 py-5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-lg font-bold rounded-2xl transition-all duration-300 shadow-xl shadow-emerald-500/20 hover:scale-105">
            RICHIEDI DEMO GRATUITA
          </button>
          <p className="mt-6 text-slate-500 text-sm">*Nessuna carta di credito richiesta per iniziare</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-800 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-white">VICO</span>
          </div>
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} Vico AI. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Privacy Policy</a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

const AdvantageCard = ({ icon, title, description, color }: { icon: React.ReactNode, title: string, description: string, color: 'rose' | 'cyan' | 'amber' | 'emerald' }) => {
  const colorClasses = {
    rose: 'group-hover:border-rose-500/50 hover:shadow-rose-500/10',
    cyan: 'group-hover:border-cyan-500/50 hover:shadow-cyan-500/10',
    amber: 'group-hover:border-amber-500/50 hover:shadow-amber-500/10',
    emerald: 'group-hover:border-emerald-500/50 hover:shadow-emerald-500/10'
  };

  return (
    <div className={`p-8 bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 rounded-2xl transition-all duration-300 group hover:-translate-y-1 hover:shadow-2xl ${colorClasses[color]}`}>
      <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center mb-6 border border-slate-800 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
      <p className="text-slate-400 leading-relaxed text-sm">{description}</p>
    </div>
  );
};

const StepCard = ({ number, title, description }: { number: string, title: string, description: string }) => (
  <div className="relative p-8 bg-slate-900 border border-slate-800 rounded-2xl text-left hover:border-emerald-500/30 transition-colors group">
    <span className="absolute top-4 right-4 text-4xl font-black text-slate-800 group-hover:text-emerald-500/10 transition-colors select-none">
      {number}
    </span>
    <h3 className="text-xl font-bold text-white mb-2 relative z-10">{title}</h3>
    <p className="text-slate-400 relative z-10">{description}</p>
  </div>
);

export default Landing;
