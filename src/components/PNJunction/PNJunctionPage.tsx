import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Atom, Zap, ShieldAlert, Sun, Sparkles, ArrowLeft } from 'lucide-react';
import { Demo1Equilibrium } from './Demo1Equilibrium';
import { Demo2BiasDynamics } from './Demo2BiasDynamics';
import { Demo3Breakdown } from './Demo3Breakdown';
import { Demo4PhotodiodeSolar } from './Demo4PhotodiodeSolar';
import { Demo5LED } from './Demo5LED';

export type PNDemoTab = 'equilibrium' | 'bias_dynamics' | 'breakdown' | 'opto_solar' | 'led';

export const PNJunctionPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<PNDemoTab>('equilibrium');

  return (
    <div className="min-h-screen bg-[#121316] text-[#e1e2e6] font-sans flex flex-col justify-between selection:bg-blue-600">
      {/* Navigation Header */}
      <header className="w-full bg-[#18191c]/80 backdrop-blur-md border-b border-white/5 sticky top-0 z-40 px-4 sm:px-8 py-3.5 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Brand & Back Button */}
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
              PN Junction Master Suite
              <span className="text-[10px] font-semibold tracking-wider uppercase bg-purple-500/10 text-purple-400 border border-purple-500/20 px-2 py-0.5 rounded-full">
                Semiconductor Physics
              </span>
            </h1>
            <p className="text-xs text-gray-400 font-medium">5 Interactive Demos on Bandgap, Bias, Breakdown & Optoelectronics</p>
          </div>
        </div>

        {/* 5 Demo Tabs Switcher */}
        <nav className="flex items-center bg-[#212226] p-1 rounded-xl border border-white/5 shadow-inner overflow-x-auto max-w-full">
          <button
            onClick={() => setActiveTab('equilibrium')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0 cursor-pointer ${
              activeTab === 'equilibrium'
                ? 'bg-blue-600 text-white shadow'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <Atom size={13} />
            <span>1. Equilibrium</span>
          </button>

          <button
            onClick={() => setActiveTab('bias_dynamics')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0 cursor-pointer ${
              activeTab === 'bias_dynamics'
                ? 'bg-blue-600 text-white shadow'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <Zap size={13} />
            <span>2. Bias Dynamics</span>
          </button>

          <button
            onClick={() => setActiveTab('breakdown')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0 cursor-pointer ${
              activeTab === 'breakdown'
                ? 'bg-blue-600 text-white shadow'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <ShieldAlert size={13} />
            <span>3. Breakdown</span>
          </button>

          <button
            onClick={() => setActiveTab('opto_solar')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0 cursor-pointer ${
              activeTab === 'opto_solar'
                ? 'bg-blue-600 text-white shadow'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <Sun size={13} />
            <span>4. Solar Cell</span>
          </button>

          <button
            onClick={() => setActiveTab('led')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0 cursor-pointer ${
              activeTab === 'led'
                ? 'bg-blue-600 text-white shadow'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <Sparkles size={13} />
            <span>5. LED Colors</span>
          </button>
        </nav>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 flex items-center justify-center">
        {activeTab === 'equilibrium' && <Demo1Equilibrium />}
        {activeTab === 'bias_dynamics' && <Demo2BiasDynamics />}
        {activeTab === 'breakdown' && <Demo3Breakdown />}
        {activeTab === 'opto_solar' && <Demo4PhotodiodeSolar />}
        {activeTab === 'led' && <Demo5LED />}
      </main>

      {/* Footer */}
      <footer className="w-full bg-[#16171a] border-t border-white/5 py-4 px-6 text-center text-xs text-gray-500 flex flex-col sm:flex-row items-center justify-between gap-2">
        <div>
          <span>ElectraSim Semiconductor Physics &bull; PN Junction Demos</span>
        </div>
        <div className="flex items-center gap-4 text-gray-400">
          <span>Route: <code className="text-gray-300">/pn-junction</code></span>
          <span>Shockley Equation: <code className="text-gray-300">I = I₀(e^(qV/nkT) - 1)</code></span>
        </div>
      </footer>
    </div>
  );
};
