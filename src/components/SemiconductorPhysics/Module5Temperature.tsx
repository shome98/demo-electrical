import React, { useState } from 'react';
import { Flame, TrendingDown, TrendingUp } from 'lucide-react';

export const Module5Temperature: React.FC = () => {
  const [tempC, setTempC] = useState<number>(25); // Temperature in Celsius (-50 to 200)

  const tempK = tempC + 273.15;

  // Resistance models
  // Metal (Copper) PTC: R(T) = R0 * (1 + alpha * (T - T0))
  const alphaCu = 0.00393; // per °C
  const rMetal = 10 * (1 + alphaCu * (tempC - 25)); // Ohms

  // Semiconductor (Silicon NTC): R(T) = R0 * exp(B * (1/T - 1/T0))
  const bConst = 3800; // Kelvin
  const rSemi = 1000 * Math.exp(bConst * (1 / tempK - 1 / 298.15)); // Ohms

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left Panel: Physics & Temperature Coefficients */}
      <div className="bg-[#202124] rounded-2xl p-6 sm:p-8 border border-white/5 shadow-2xl flex flex-col justify-between space-y-6">
        <div>
          <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
            <div className="flex items-center gap-2">
              <Flame size={18} className="text-amber-400" />
              <h3 className="text-lg font-bold text-white">Temperature Dependence: Metal vs. Semiconductor</h3>
            </div>
          </div>

          {/* Explanation Cards */}
          <div className="space-y-4 my-4">
            <div className="bg-[#18191c]/70 rounded-xl p-4 border border-white/5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-blue-400 flex items-center gap-1">
                  <TrendingUp size={16} /> Metal Conductor (PTC)
                </span>
                <span className="text-xs font-mono font-bold text-gray-300">R(T) Increases with Heat</span>
              </div>
              <p className="text-xs text-gray-300 font-sans leading-relaxed">
                Carrier density n is fixed and massive. Heating causes intense lattice vibrations (phonons) that scatter electrons, decreasing mobility μ. Overall resistance R increases!
              </p>
            </div>

            <div className="bg-[#18191c]/70 rounded-xl p-4 border border-white/5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-emerald-400 flex items-center gap-1">
                  <TrendingDown size={16} /> Semiconductor (NTC)
                </span>
                <span className="text-xs font-mono font-bold text-gray-300">R(T) Drops Exponentially</span>
              </div>
              <p className="text-xs text-gray-300 font-sans leading-relaxed">
                Heating breaks covalent bonds and generates exponential free charge carriers (electrons &amp; holes). The massive carrier surge far outweighs lattice scattering, so overall resistance R drops rapidly!
              </p>
            </div>
          </div>
        </div>

        {/* Temperature Slider */}
        <div className="space-y-3">
          <div className="flex items-center gap-4">
            <div className="w-44 flex items-center justify-between shrink-0">
              <span className="font-serif italic font-bold text-gray-200">Temperature (°C)</span>
              <span className="font-mono text-xs text-amber-400 font-bold">{tempC}°C ({tempK.toFixed(1)} K)</span>
            </div>
            <input
              type="range"
              min="-50"
              max="200"
              step="5"
              value={tempC}
              onChange={(e) => setTempC(parseFloat(e.target.value))}
              className="custom-slider"
            />
          </div>
        </div>
      </div>

      {/* Right Panel: Resistance vs Temperature Comparison Curves */}
      <div className="bg-[#202124] rounded-2xl p-6 sm:p-8 border border-white/5 shadow-2xl flex flex-col justify-between">
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-2">
            <Flame size={14} className="text-amber-400" />
            Resistance R(T) Response Curve
          </h4>

          <div className="w-full h-[280px] bg-[#18191c] rounded-xl border border-white/5 p-4 flex items-center justify-center">
            <svg viewBox="0 0 440 240" className="w-full h-full">
              {/* Axes */}
              <line x1="50" y1="200" x2="400" y2="200" stroke="#475569" strokeWidth="2" />
              <text x="390" y="218" fill="#94a3b8" fontSize="10">Temp (°C)</text>

              <line x1="50" y1="30" x2="50" y2="200" stroke="#475569" strokeWidth="2" />
              <text x="15" y="35" fill="#94a3b8" fontSize="10">R (Ω)</text>

              {/* Metal Conductor Line (Linear PTC increase) */}
              <line x1="50" y1="180" x2="380" y2="120" stroke="#3b82f6" strokeWidth="3" />
              <text x="340" y="110" fill="#60a5fa" fontSize="11" fontWeight="bold">Metal (PTC)</text>

              {/* Semiconductor Curve (Exponential NTC drop) */}
              <path d="M 50 40 Q 120 160, 380 190" fill="none" stroke="#10b981" strokeWidth="3" />
              <text x="130" y="130" fill="#34d399" fontSize="11" fontWeight="bold">Semiconductor (NTC)</text>

              {/* Current Temperature Vertical Marker */}
              {(() => {
                // Map tempC (-50 to 200) to SVG X (50 to 380)
                const curX = 50 + ((tempC + 50) / 250) * 330;
                return (
                  <g>
                    <line x1={curX} y1="30" x2={curX} y2="200" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 3" />
                    <circle cx={curX} cy="195" r="4" fill="#f59e0b" />
                  </g>
                );
              })()}
            </svg>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/5 text-center">
          <div className="bg-[#18191c] p-3 rounded-xl border border-white/5">
            <span className="text-[11px] text-gray-400 block uppercase">Temperature</span>
            <span className="text-sm font-bold text-amber-400">{tempC} °C</span>
          </div>
          <div className="bg-[#18191c] p-3 rounded-xl border border-white/5">
            <span className="text-[11px] text-gray-400 block uppercase">Metal R (PTC)</span>
            <span className="text-sm font-bold text-blue-400 font-mono">{rMetal.toFixed(2)} Ω</span>
          </div>
          <div className="bg-[#18191c] p-3 rounded-xl border border-white/5">
            <span className="text-[11px] text-gray-400 block uppercase">Semiconductor R (NTC)</span>
            <span className="text-sm font-bold text-emerald-400 font-mono">
              {rSemi > 1000 ? (rSemi / 1000).toFixed(2) + ' kΩ' : rSemi.toFixed(1) + ' Ω'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
