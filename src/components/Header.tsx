import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, Layers, Activity, Cpu, Download, RefreshCw, Atom } from 'lucide-react';

export type AppMode = 'ohms_law' | 'series_parallel' | 'ac_power' | 'sandbox';

interface HeaderProps {
  currentMode: AppMode;
  onModeChange: (mode: AppMode) => void;
  onExport: () => void;
  onResetAll: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentMode,
  onModeChange,
  onExport,
  onResetAll,
}) => {
  return (
    <header className="w-full bg-[#18191c]/80 backdrop-blur-md border-b border-white/5 sticky top-0 z-40 px-4 sm:px-8 py-3.5 flex flex-col md:flex-row items-center justify-between gap-4">
      {/* Brand Title */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
          <Zap className="w-5 h-5 text-white fill-white" />
        </div>
        <div>
          <h1 className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
            ElectraSim
            <span className="text-[10px] font-semibold tracking-wider uppercase bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded-full">
              PRO v2.0
            </span>
          </h1>
          <p className="text-xs text-gray-400 font-medium">Interactive Electrical & Physics Visualizer</p>
        </div>
      </div>

      {/* Modes Navigation Tab Bar */}
      <nav className="flex items-center bg-[#212226] p-1 rounded-xl border border-white/5 shadow-inner">
        <button
          onClick={() => onModeChange('ohms_law')}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            currentMode === 'ohms_law'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
              : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
          }`}
        >
          <Zap size={14} />
          <span>Ohm's & Power Law</span>
        </button>

        <button
          onClick={() => onModeChange('series_parallel')}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            currentMode === 'series_parallel'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
              : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
          }`}
        >
          <Layers size={14} />
          <span>Series & Parallel</span>
        </button>

        <button
          onClick={() => onModeChange('ac_power')}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            currentMode === 'ac_power'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
              : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
          }`}
        >
          <Activity size={14} />
          <span>AC Power & Impedance</span>
        </button>

        <button
          onClick={() => onModeChange('sandbox')}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            currentMode === 'sandbox'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
              : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
          }`}
        >
          <Cpu size={14} />
          <span>Sandbox</span>
        </button>

        {/* PN Junction Route Link */}
        <Link
          to="/pn-junction"
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-purple-300 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 transition-all cursor-pointer"
        >
          <Atom size={14} className="text-purple-400" />
          <span>PN Junction Demos</span>
        </Link>
      </nav>

      {/* Action Buttons */}
      <div className="flex items-center gap-2">
        <button
          onClick={onResetAll}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#27282d] hover:bg-[#32333a] text-gray-300 text-xs font-medium border border-white/5 transition-all cursor-pointer"
          title="Reset circuit parameters"
        >
          <RefreshCw size={13} />
          <span className="hidden sm:inline">Reset</span>
        </button>

        <button
          onClick={onExport}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-md shadow-blue-500/20 transition-all active:scale-95 cursor-pointer"
        >
          <Download size={13} />
          <span>Export Calculations</span>
        </button>
      </div>
    </header>
  );
};
