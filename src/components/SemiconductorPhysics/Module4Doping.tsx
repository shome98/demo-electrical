import React, { useState } from 'react';
import { MathTex } from '../MathTex';
import { Atom, Zap } from 'lucide-react';

type DopingType = 'intrinsic' | 'n_type' | 'p_type';

export const Module4Doping: React.FC = () => {
  const [dopingType, setDopingType] = useState<DopingType>('n_type');
  const [conc, setConc] = useState<number>(1e16); // cm^-3

  const ni = 1.5e10; // Intrinsic conc at 300K

  // Majority & Minority Concentrations
  const nConc = dopingType === 'n_type' ? conc : dopingType === 'p_type' ? (ni * ni) / conc : ni;
  const pConc = dopingType === 'p_type' ? conc : dopingType === 'n_type' ? (ni * ni) / conc : ni;

  // Fermi level shift delta Ef = kT * ln(ND / ni) in eV
  const vt = 0.0259;
  const deltaEf = dopingType === 'n_type' ? vt * Math.log(conc / ni) : dopingType === 'p_type' ? -vt * Math.log(conc / ni) : 0;

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left Panel: Doping Physics & Math */}
      <div className="bg-[#202124] rounded-2xl p-6 sm:p-8 border border-white/5 shadow-2xl flex flex-col justify-between space-y-6">
        <div>
          <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
            <div className="flex items-center gap-2">
              <Atom size={18} className="text-purple-400" />
              <h3 className="text-lg font-bold text-white">Semiconductor Doping (N-Type & P-Type)</h3>
            </div>
          </div>

          {/* Doping Selector Buttons */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            <button
              onClick={() => setDopingType('intrinsic')}
              className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                dopingType === 'intrinsic' ? 'bg-blue-600 text-white shadow' : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              Pure Intrinsic Si
            </button>
            <button
              onClick={() => setDopingType('n_type')}
              className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                dopingType === 'n_type' ? 'bg-emerald-600 text-white shadow' : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              N-Type (Donor - P)
            </button>
            <button
              onClick={() => setDopingType('p_type')}
              className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                dopingType === 'p_type' ? 'bg-purple-600 text-white shadow' : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              P-Type (Acceptor - B)
            </button>
          </div>

          {/* Formulas */}
          <div className="space-y-3 my-4 bg-[#18191c]/70 rounded-xl p-4 border border-white/5 text-center">
            {dopingType === 'n_type' && (
              <>
                <div className="text-xl text-emerald-300 font-serif">
                  <MathTex math="n \approx N_D = 10^{16} \text{ cm}^{-3} \quad p = \frac{n_i^2}{N_D}" displayMode />
                </div>
                <p className="text-xs text-gray-300 font-sans mt-2">
                  Phosphorus (Group V) donates an extra 5th electron into the conduction band. Fermi level $E_F$ shifts UP towards $E_c$.
                </p>
              </>
            )}

            {dopingType === 'p_type' && (
              <>
                <div className="text-xl text-purple-300 font-serif">
                  <MathTex math="p \approx N_A = 10^{16} \text{ cm}^{-3} \quad n = \frac{n_i^2}{N_A}" displayMode />
                </div>
                <p className="text-xs text-gray-300 font-sans mt-2">
                  Boron (Group III) accepts an electron to complete 4 bonds, leaving a mobile hole ($h^+$). Fermi level $E_F$ shifts DOWN towards $E_v$.
                </p>
              </>
            )}

            {dopingType === 'intrinsic' && (
              <>
                <div className="text-xl text-blue-300 font-serif">
                  <MathTex math="n = p = n_i = 1.5 \times 10^{10} \text{ cm}^{-3}" displayMode />
                </div>
                <p className="text-xs text-gray-300 font-sans mt-2">
                  Pure Silicon lattice without dopants. Fermi level $E_F$ sits near the middle of the bandgap ($E_i$).
                </p>
              </>
            )}
          </div>
        </div>

        {/* Dopant Concentration Slider */}
        {dopingType !== 'intrinsic' && (
          <div className="space-y-3">
            <div className="flex items-center gap-4">
              <div className="w-40 flex items-center justify-between shrink-0">
                <span className="font-serif italic font-bold text-gray-200">Dopant Conc (N)</span>
                <span className="font-mono text-xs text-emerald-400 font-bold">10^{Math.log10(conc).toFixed(1)} cm⁻³</span>
              </div>
              <input
                type="range"
                min="14"
                max="19"
                step="0.1"
                value={Math.log10(conc)}
                onChange={(e) => setConc(Math.pow(10, parseFloat(e.target.value)))}
                className="custom-slider"
              />
            </div>
          </div>
        )}
      </div>

      {/* Right Panel: Atomic Lattice Visualizer & Energy Band Shift */}
      <div className="bg-[#202124] rounded-2xl p-6 sm:p-8 border border-white/5 shadow-2xl flex flex-col justify-between">
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-2">
            <Zap size={14} className="text-purple-400" />
            Atomic Covalent Lattice & Fermi Level Position
          </h4>

          <div className="w-full h-[280px] bg-[#18191c] rounded-xl border border-white/5 p-4 flex flex-col justify-between">
            <svg viewBox="0 0 440 240" className="w-full h-full">
              {/* Energy Band Diagram on Left */}
              <g transform="translate(40, 20)">
                <rect x="0" y="0" width="120" height="35" fill="#1e293b" stroke="#60a5fa" strokeWidth="1.5" rx="4" />
                <text x="60" y="22" fill="#60a5fa" fontSize="10" fontWeight="bold" textAnchor="middle">E_c (Conduction)</text>

                <rect x="0" y="165" width="120" height="35" fill="#064e3b" stroke="#34d399" strokeWidth="1.5" rx="4" />
                <text x="60" y="187" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">E_v (Valence)</text>

                {/* Fermi Level Ef Line */}
                <line
                  x1="0"
                  y1={100 - deltaEf * 120}
                  x2="120"
                  y2={100 - deltaEf * 120}
                  stroke="#ef4444"
                  strokeWidth="2"
                  strokeDasharray="4 2"
                />
                <text x="125" y={103 - deltaEf * 120} fill="#ef4444" fontSize="10" fontWeight="bold">
                  E_F
                </text>
              </g>

              {/* Silicon Covalent Lattice on Right */}
              <g transform="translate(260, 110)">
                {/* Central Dopant or Silicon Atom */}
                <circle cx="0" cy="0" r="22" fill={dopingType === 'n_type' ? '#10b981' : dopingType === 'p_type' ? '#a855f7' : '#3b82f6'} />
                <text x="0" y="5" fill="#fff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  {dopingType === 'n_type' ? 'P⁺⁵' : dopingType === 'p_type' ? 'B⁺³' : 'Si⁺⁴'}
                </text>

                {/* 4 Neighboring Si Atoms */}
                {[-50, 50].map((offset) => (
                  <g key={offset}>
                    <circle cx={offset} cy="0" r="16" fill="#1e293b" stroke="#64748b" strokeWidth="1.5" />
                    <text x={offset} y="4" fill="#94a3b8" fontSize="9" textAnchor="middle">Si</text>
                    <line x1="0" y1="0" x2={offset} y2="0" stroke="#475569" strokeWidth="2" />

                    <circle cx="0" cy={offset} r="16" fill="#1e293b" stroke="#64748b" strokeWidth="1.5" />
                    <text x="0" y={offset + 4} fill="#94a3b8" fontSize="9" textAnchor="middle">Si</text>
                    <line x1="0" y1="0" x2="0" y2={offset} stroke="#475569" strokeWidth="2" />
                  </g>
                ))}

                {/* Extra Donated Electron in N-type */}
                {dopingType === 'n_type' && (
                  <g>
                    <circle cx="28" cy="-28" r="6" fill="#60a5fa" filter="drop-shadow(0 0 4px #60a5fa)" />
                    <text x="28" y="-25" fill="#fff" fontSize="8" textAnchor="middle" fontWeight="bold">−</text>
                    <text x="40" y="-35" fill="#60a5fa" fontSize="9" fontWeight="bold">Free e⁻</text>
                  </g>
                )}

                {/* Vacant Hole in P-type */}
                {dopingType === 'p_type' && (
                  <g>
                    <circle cx="28" cy="-28" r="6" fill="#ef4444" stroke="#fff" strokeWidth="1.5" />
                    <text x="28" y="-25" fill="#fff" fontSize="8" textAnchor="middle" fontWeight="bold">+</text>
                    <text x="40" y="-35" fill="#ef4444" fontSize="9" fontWeight="bold">Hole h⁺</text>
                  </g>
                )}
              </g>
            </svg>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/5 text-center">
          <div className="bg-[#18191c] p-3 rounded-xl border border-white/5">
            <span className="text-[11px] text-gray-400 block uppercase">Majority Carrier</span>
            <span className="text-sm font-bold text-emerald-400 font-mono">{nConc.toExponential(1)} cm⁻³</span>
          </div>
          <div className="bg-[#18191c] p-3 rounded-xl border border-white/5">
            <span className="text-[11px] text-gray-400 block uppercase">Minority Carrier</span>
            <span className="text-sm font-bold text-purple-400 font-mono">{pConc.toExponential(1)} cm⁻³</span>
          </div>
          <div className="bg-[#18191c] p-3 rounded-xl border border-white/5">
            <span className="text-[11px] text-gray-400 block uppercase">Fermi Shift ΔE_F</span>
            <span className="text-sm font-bold text-white font-mono">{deltaEf.toFixed(3)} eV</span>
          </div>
        </div>
      </div>
    </div>
  );
};
