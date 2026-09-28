import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Cpu, ToggleLeft, Shield, Activity, Zap, ArrowLeft } from 'lucide-react';
import { Demo1BjtPhysics } from './Demo1BjtPhysics';
import { Demo2TransistorOperations } from './Demo2TransistorOperations';
import { Demo3EmitterFollower } from './Demo3EmitterFollower';
import { Demo4CommonEmitter } from './Demo4CommonEmitter';
import { Demo5TransistorLogicGates } from './Demo5TransistorLogicGates';

export type TransistorTab = 'bjt_physics' | 'operations' | 'emitter_follower' | 'common_emitter' | 'logic_gates';

export const TransistorsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TransistorTab>('bjt_physics');

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
              Transistor Master Suite
              <span className="text-[10px] font-semibold tracking-wider uppercase bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded-full">
                BJT & Logic Circuits
              </span>
            </h1>
            <p className="text-xs text-gray-400 font-medium">BJT Physics, 5 Operations, Emitter Follower, Common Emitter & Logic Gates</p>
          </div>
        </div>

        {/* 5 Demo Tabs Switcher */}
        <nav className="flex items-center bg-[#212226] p-1 rounded-xl border border-white/5 shadow-inner overflow-x-auto max-w-full">
          <button
            onClick={() => setActiveTab('bjt_physics')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0 cursor-pointer ${
              activeTab === 'bjt_physics' ? 'bg-blue-600 text-white shadow' : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <Cpu size={13} />
            <span>1. BJT Physics</span>
          </button>

          <button
            onClick={() => setActiveTab('operations')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0 cursor-pointer ${
              activeTab === 'operations' ? 'bg-blue-600 text-white shadow' : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <ToggleLeft size={13} />
            <span>2. 5 Operations</span>
          </button>

          <button
            onClick={() => setActiveTab('emitter_follower')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0 cursor-pointer ${
              activeTab === 'emitter_follower' ? 'bg-blue-600 text-white shadow' : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <Shield size={13} />
            <span>3. Emitter Follower</span>
          </button>

          <button
            onClick={() => setActiveTab('common_emitter')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0 cursor-pointer ${
              activeTab === 'common_emitter' ? 'bg-blue-600 text-white shadow' : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <Activity size={13} />
            <span>4. Common Emitter</span>
          </button>

          <button
            onClick={() => setActiveTab('logic_gates')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0 cursor-pointer ${
              activeTab === 'logic_gates' ? 'bg-blue-600 text-white shadow' : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <Zap size={13} />
            <span>5. Logic Gates</span>
          </button>
        </nav>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 flex items-center justify-center">
        {activeTab === 'bjt_physics' && <Demo1BjtPhysics />}
        {activeTab === 'operations' && <Demo2TransistorOperations />}
        {activeTab === 'emitter_follower' && <Demo3EmitterFollower />}
        {activeTab === 'common_emitter' && <Demo4CommonEmitter />}
        {activeTab === 'logic_gates' && <Demo5TransistorLogicGates />}
      </main>

      {/* Footer */}
      <footer className="w-full bg-[#16171a] border-t border-white/5 py-4 px-6 text-center text-xs text-gray-500 flex flex-col sm:flex-row items-center justify-between gap-2">
        <div>
          <span>ElectraSim Transistor Engineering &bull; BJT Circuits & Logic Gates</span>
        </div>
        <div className="flex items-center gap-4 text-gray-400">
          <span>Route: <code className="text-gray-300">/transistors</code></span>
          <span>Current Gain: <code className="text-gray-300">I_C = β I_B</code></span>
        </div>
      </footer>
    </div>
  );
};
