import React, { useState } from 'react';
import { MathTex } from '../MathTex';
import { Flame, Sparkles } from 'lucide-react';

export const Module2ValenceConduction: React.FC = () => {
  const [temp, setTemp] = useState<number>(300); // Kelvin (100 to 500)

  // Silicon Constants
  const eg = 1.12; // eV at 300K
  const kb = 8.617e-5; // eV/K
  const vt = kb * temp;

  // Intrinsic Carrier Concentration ni = B * T^(3/2) * exp(-Eg / (2 * kT))
  // At 300K, ni ≈ 1.5e10 cm^-3
  const ni300 = 1.5e10;
  const niRatio = Math.pow(temp / 300, 1.5) * Math.exp((-eg / 2) * (1 / vt - 1 / (kb * 300)));
  const niCm3 = ni300 * niRatio;

  // Number of active thermal particles in visual demo
  const activeCount = Math.max(1, Math.min(10, Math.floor(Math.log10(niCm3) - 8)));

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left Panel: Physics & Intrinsic Carrier Math */}
      <div className="bg-[#202124] rounded-2xl p-6 sm:p-8 border border-white/5 shadow-2xl flex flex-col justify-between space-y-6">
        <div>
          <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
            <div className="flex items-center gap-2">
              <Flame size={18} className="text-amber-400" />
              <h3 className="text-lg font-bold text-white">Valence & Conduction Thermal Generation</h3>
            </div>
            <span className="text-xs bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2.5 py-1 rounded-full font-medium">
              EHP Generation (n = p = n_i)
            </span>
          </div>

          {/* Formulas */}
          <div className="space-y-3 my-4 bg-[#18191c]/70 rounded-xl p-4 border border-white/5 text-center">
            <div className="text-xl text-white font-serif">
              <MathTex math="n_i = B T^{3/2} e^{-\frac{E_g}{2 k_B T}}" displayMode />
            </div>

            <div className="text-base text-amber-300 font-serif">
              <MathTex
                math={`n_i(${temp}\\text{K}) = 1.5 \\times 10^{10} \\times \\text{ratio} = ${niCm3.toExponential(2)}\\ \\text{cm}^{-3}`}
                displayMode
              />
            </div>

            <div className="text-xs text-gray-300 font-sans leading-relaxed pt-1">
              Every thermally generated free electron ($e^-$) in the conduction band leaves behind an empty state or <strong>Hole ($h^+$)</strong> in the valence band.
            </div>
          </div>
        </div>

        {/* Temperature Control */}
        <div className="space-y-3">
          <div className="flex items-center gap-4">
            <div className="w-36 flex items-center justify-between shrink-0">
              <span className="font-serif italic font-bold text-gray-200">Temperature (T)</span>
              <span className="font-mono text-xs text-amber-400 font-bold">{temp} K</span>
            </div>
            <input
              type="range"
              min="100"
              max="500"
              step="10"
              value={temp}
              onChange={(e) => setTemp(parseFloat(e.target.value))}
              className="custom-slider"
            />
          </div>
        </div>
      </div>

      {/* Right Panel: Microscopic EHP Particle Animation */}
      <div className="bg-[#202124] rounded-2xl p-6 sm:p-8 border border-white/5 shadow-2xl flex flex-col justify-between">
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-2">
            <Sparkles size={14} className="text-blue-400" />
            Thermal Energy Excitation Visualizer
          </h4>

          <div className="w-full h-[280px] bg-[#18191c] rounded-xl border border-white/5 p-4 flex flex-col justify-between">
            <svg viewBox="0 0 440 240" className="w-full h-full">
              {/* Conduction Band Box (Top) */}
              <rect x="40" y="30" width="360" height="70" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" rx="6" />
              <text x="50" y="50" fill="#60a5fa" fontSize="11" fontWeight="bold">Conduction Band (E_c)</text>

              {/* Valence Band Box (Bottom) */}
              <rect x="40" y="140" width="360" height="70" fill="#064e3b" stroke="#10b981" strokeWidth="2" rx="6" />
              <text x="50" y="160" fill="#34d399" fontSize="11" fontWeight="bold">Valence Band (E_v)</text>

              {/* Dynamic Particles */}
              {Array.from({ length: activeCount }).map((_, idx) => {
                const xPos = 90 + idx * 30;
                return (
                  <g key={idx}>
                    {/* Upward Excitation Arrow */}
                    <line x1={xPos} y1="140" x2={xPos} y2="100" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 3" />
                    <polygon points={`${xPos},96 ${xPos - 4},104 ${xPos + 4},104`} fill="#f59e0b" />

                    {/* Conduction Electron (Blue dot top) */}
                    <circle cx={xPos} cy="75" r="6" fill="#3b82f6" filter="drop-shadow(0 0 4px #3b82f6)" />
                    <text x={xPos} y="78" fill="#fff" fontSize="8" textAnchor="middle" fontWeight="bold">−</text>

                    {/* Valence Hole (Hollow red/green circle bottom) */}
                    <circle cx={xPos} cy="180" r="6" fill="#ef4444" stroke="#ffffff" strokeWidth="1.5" />
                    <text x={xPos} y={183} fill="#fff" fontSize="8" textAnchor="middle" fontWeight="bold">+</text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/5 text-center">
          <div className="bg-[#18191c] p-3 rounded-xl border border-white/5">
            <span className="text-[11px] text-gray-400 block uppercase">Temperature</span>
            <span className="text-sm font-bold text-amber-400">{temp} K</span>
          </div>
          <div className="bg-[#18191c] p-3 rounded-xl border border-white/5">
            <span className="text-[11px] text-gray-400 block uppercase">Thermal Energy kT</span>
            <span className="text-sm font-bold text-white font-mono">{vt.toFixed(3)} eV</span>
          </div>
          <div className="bg-[#18191c] p-3 rounded-xl border border-white/5">
            <span className="text-[11px] text-gray-400 block uppercase">Intrinsic Carrier n_i</span>
            <span className="text-sm font-bold text-emerald-400 font-mono">{niCm3.toExponential(2)} cm⁻³</span>
          </div>
        </div>
      </div>
    </div>
  );
};
