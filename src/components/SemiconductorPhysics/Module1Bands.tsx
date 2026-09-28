import React, { useState } from 'react';
import { MathTex } from '../MathTex';
import { Layers, Zap } from 'lucide-react';

type MaterialType = 'conductor' | 'semiconductor' | 'insulator';

interface MaterialInfo {
  name: string;
  type: MaterialType;
  eg: number; // eV
  color: string;
  description: string;
  example: string;
}

const MATERIALS_INFO: Record<MaterialType, MaterialInfo> = {
  conductor: {
    name: 'Conductor (Copper / Copper Lattice)',
    type: 'conductor',
    eg: 0.0,
    color: '#3b82f6',
    description: 'Conduction band and Valence band OVERLAP. Electrons move freely even at 0 Kelvin with minimal applied voltage.',
    example: 'Copper, Aluminum, Gold (Eg = 0 eV)',
  },
  semiconductor: {
    name: 'Semiconductor (Silicon Lattice)',
    type: 'semiconductor',
    eg: 1.12,
    color: '#10b981',
    description: 'Small energy bandgap (Eg ≈ 1.1 eV). At room temperature (300K), thermal energy promotes some valence electrons to conduction band.',
    example: 'Silicon (1.12 eV), Germanium (0.67 eV), GaAs (1.42 eV)',
  },
  insulator: {
    name: 'Insulator (Glass / Diamond)',
    type: 'insulator',
    eg: 5.5,
    color: '#ef4444',
    description: 'Huge energy bandgap (Eg > 5 eV). Electrons are tightly bound in covalent bonds and cannot cross to conduction band.',
    example: 'Diamond (5.5 eV), Quartz Glass (> 8 eV)',
  },
};

export const Module1Bands: React.FC = () => {
  const [selectedType, setSelectedType] = useState<MaterialType>('semiconductor');
  const [temperature, setTemperature] = useState<number>(300); // Kelvin

  const mat = MATERIALS_INFO[selectedType];

  // Thermal energy kT in eV
  const ktEv = 8.617e-5 * temperature;

  // Probability of electron crossing bandgap (Fermi-Dirac approximation)
  const excitationProb = mat.eg === 0 ? 1.0 : Math.exp(-mat.eg / (2 * ktEv));

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left Panel: Theory & Controls */}
      <div className="bg-[#202124] rounded-2xl p-6 sm:p-8 border border-white/5 shadow-2xl flex flex-col justify-between space-y-6">
        <div>
          <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
            <div className="flex items-center gap-2">
              <Layers size={18} className="text-emerald-400" />
              <h3 className="text-lg font-bold text-white">Band Gap Theory: Conductors, Semiconductors & Insulators</h3>
            </div>
          </div>

          {/* Type Selector Buttons */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            {(['conductor', 'semiconductor', 'insulator'] as MaterialType[]).map((t) => (
              <button
                key={t}
                onClick={() => setSelectedType(t)}
                className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all capitalize cursor-pointer ${
                  selectedType === t
                    ? 'bg-white/10 border-white/30 text-white shadow-lg'
                    : 'bg-[#18191c] border-white/5 text-gray-400 hover:text-gray-200'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Description Card */}
          <div className="bg-[#18191c]/70 rounded-xl p-4 border border-white/5 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-white">{mat.name}</h4>
              <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-white/10" style={{ color: mat.color }}>
                E_g = {mat.eg.toFixed(2)} eV
              </span>
            </div>

            <p className="text-xs text-gray-300 leading-relaxed font-sans">{mat.description}</p>

            <div className="pt-2 text-center border-t border-white/5">
              <div className="text-sm text-gray-200 font-serif">
                <MathTex math={`E_g = ${mat.eg.toFixed(2)}\\text{ eV} \\quad (k_B T = ${ktEv.toFixed(3)}\\text{ eV at } ${temperature}\\text{K})`} displayMode />
              </div>
            </div>
          </div>
        </div>

        {/* Temperature Slider */}
        <div className="space-y-3">
          <div className="flex items-center gap-4">
            <div className="w-36 flex items-center justify-between shrink-0">
              <span className="font-serif italic font-bold text-gray-200">Temperature (T)</span>
              <span className="font-mono text-xs text-amber-400 font-bold">{temperature} K ({temperature - 273}°C)</span>
            </div>
            <input
              type="range"
              min="0"
              max="600"
              step="10"
              value={temperature}
              onChange={(e) => setTemperature(parseFloat(e.target.value))}
              className="custom-slider"
            />
          </div>
        </div>
      </div>

      {/* Right Panel: Interactive Energy Band Diagram Graphic */}
      <div className="bg-[#202124] rounded-2xl p-6 sm:p-8 border border-white/5 shadow-2xl flex flex-col justify-between">
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-2">
            <Zap size={14} className="text-emerald-400" />
            Energy Band Structure & Electron Excitation
          </h4>

          <div className="w-full h-[280px] bg-[#18191c] rounded-xl border border-white/5 p-4 flex items-center justify-center">
            <svg viewBox="0 0 440 240" className="w-full h-full">
              {/* Conduction Band Region (Top) */}
              <rect x="80" y="30" width="280" height="50" fill="#1e293b" stroke="#60a5fa" strokeWidth="2" rx="6" />
              <text x="220" y="60" fill="#60a5fa" fontSize="13" fontWeight="bold" textAnchor="middle">
                Conduction Band (E_c) &mdash; Free Electrons
              </text>

              {/* Energy Bandgap Eg Space */}
              {selectedType === 'conductor' ? (
                /* Overlapping Bands */
                <g>
                  <text x="220" y="100" fill="#3b82f6" fontSize="12" fontWeight="bold" textAnchor="middle">
                    Bands Overlap (E_g = 0 eV) &bull; Continuous Electron Flow
                  </text>
                </g>
              ) : (
                <g>
                  {/* Dotted lines showing Eg gap */}
                  <line x1="80" y1="80" x2="360" y2="80" stroke="#64748b" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="80" y1="160" x2="360" y2="160" stroke="#64748b" strokeWidth="1" strokeDasharray="3 3" />

                  {/* Double arrow for Eg */}
                  <line x1="220" y1="85" x2="220" y2="155" stroke={mat.color} strokeWidth="2" />
                  <polygon points="220,82 216,90 224,90" fill={mat.color} />
                  <polygon points="220,158 216,150 224,150" fill={mat.color} />

                  <text x="235" y="124" fill={mat.color} fontSize="14" fontWeight="bold">
                    E_g = {mat.eg.toFixed(2)} eV
                  </text>
                </g>
              )}

              {/* Valence Band Region (Bottom) */}
              <rect x="80" y="160" width="280" height="50" fill="#064e3b" stroke="#34d399" strokeWidth="2" rx="6" />
              <text x="220" y="190" fill="#34d399" fontSize="13" fontWeight="bold" textAnchor="middle">
                Valence Band (E_v) &mdash; Bound Covalent Electrons
              </text>
            </svg>
          </div>
        </div>

        {/* Calculated Stats Grid */}
        <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/5 text-center">
          <div className="bg-[#18191c] p-3 rounded-xl border border-white/5">
            <span className="text-[11px] text-gray-400 block uppercase">Material Type</span>
            <span className="text-sm font-bold text-white capitalize">{selectedType}</span>
          </div>
          <div className="bg-[#18191c] p-3 rounded-xl border border-white/5">
            <span className="text-[11px] text-gray-400 block uppercase">Bandgap E_g</span>
            <span className="text-sm font-bold font-mono" style={{ color: mat.color }}>
              {mat.eg.toFixed(2)} eV
            </span>
          </div>
          <div className="bg-[#18191c] p-3 rounded-xl border border-white/5">
            <span className="text-[11px] text-gray-400 block uppercase">Excitation Factor</span>
            <span className="text-sm font-bold text-amber-400 font-mono">
              {selectedType === 'conductor' ? '100%' : (excitationProb * 100).toExponential(1) + '%'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
