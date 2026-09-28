import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layers, Flame, Navigation, Atom, TrendingDown, ArrowLeft } from 'lucide-react';
import { Module1Bands } from './Module1Bands';
import { Module2ValenceConduction } from './Module2ValenceConduction';
import { Module3Transport } from './Module3Transport';
import { Module4Doping } from './Module4Doping';
import { Module5Temperature } from './Module5Temperature';

export type PhysicsModuleTab = 'bands' | 'valence_conduction' | 'transport' | 'doping' | 'temperature';

export const SemiconductorPhysicsPage: React.FC = () => {
  const [activeModule, setActiveModule] = useState<PhysicsModuleTab>('bands');

  return (
    <div className="min-h-screen bg-[#121316] text-[#e1e2e6] font-sans flex flex-col justify-between selection:bg-blue-600">
      {/* Top Header Navigation */}
      <header className="w-full bg-[#18191c]/80 backdrop-blur-md border-b border-white/5 sticky top-0 z-40 px-4 sm:px-8 py-3.5 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="p-2 rounded-xl bg-[#27282d] hover:bg-[#33343b] text-gray-300 hover:text-white border border-white/5 transition-all flex items-center gap-1.5 text-xs font-semibold"
          >
            <ArrowLeft size={14} />
            <span>Back to Ohm's Law</span>
          </Link>

          <div>
            <h1 className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
              Semiconductor Physics Essentials
              <span className="text-[10px] font-semibold tracking-wider uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                Fundamentals
              </span>
            </h1>
            <p className="text-xs text-gray-400 font-medium">Bands, Valence & Conduction, Hole Hopping, Doping & Temperature Effects</p>
          </div>
        </div>

        {/* Module Tab Switcher */}
        <nav className="flex items-center bg-[#212226] p-1 rounded-xl border border-white/5 shadow-inner overflow-x-auto max-w-full">
          <button
            onClick={() => setActiveModule('bands')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0 cursor-pointer ${
              activeModule === 'bands' ? 'bg-blue-600 text-white shadow' : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <Layers size={13} />
            <span>1. Band Gaps</span>
          </button>

          <button
            onClick={() => setActiveModule('valence_conduction')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0 cursor-pointer ${
              activeModule === 'valence_conduction' ? 'bg-blue-600 text-white shadow' : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <Flame size={13} />
            <span>2. Valence & Conduction</span>
          </button>

          <button
            onClick={() => setActiveModule('transport')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0 cursor-pointer ${
              activeModule === 'transport' ? 'bg-blue-600 text-white shadow' : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <Navigation size={13} />
            <span>3. Electron/Hole Motion</span>
          </button>

          <button
            onClick={() => setActiveModule('doping')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0 cursor-pointer ${
              activeModule === 'doping' ? 'bg-blue-600 text-white shadow' : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <Atom size={13} />
            <span>4. Doping Mechanics</span>
          </button>

          <button
            onClick={() => setActiveModule('temperature')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0 cursor-pointer ${
              activeModule === 'temperature' ? 'bg-blue-600 text-white shadow' : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <TrendingDown size={13} />
            <span>5. Temp Coefficient</span>
          </button>
        </nav>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 flex items-center justify-center">
        {activeModule === 'bands' && <Module1Bands />}
        {activeModule === 'valence_conduction' && <Module2ValenceConduction />}
        {activeModule === 'transport' && <Module3Transport />}
        {activeModule === 'doping' && <Module4Doping />}
        {activeModule === 'temperature' && <Module5Temperature />}
      </main>

      {/* Footer */}
      <footer className="w-full bg-[#16171a] border-t border-white/5 py-4 px-6 text-center text-xs text-gray-500 flex flex-col sm:flex-row items-center justify-between gap-2">
        <div>
          <span>ElectraSim Semiconductor Physics &bull; Solid State Electronics</span>
        </div>
        <div className="flex items-center gap-4 text-gray-400">
          <span>Route: <code className="text-gray-300">/semiconductor-physics</code></span>
          <span>Einstein Relation: <code className="text-gray-300">D/μ = kT/q</code></span>
        </div>
      </footer>
    </div>
  );
};
