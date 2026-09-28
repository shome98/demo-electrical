import React, { useState } from 'react';
import { MathTex } from '../MathTex';
import { ShieldAlert, Zap, Cpu } from 'lucide-react';

export const Demo3Breakdown: React.FC = () => {
  const [reverseVoltage, setReverseVoltage] = useState<number>(6.5); // Reverse bias V (0 to 12V)
  const [zenerVoltage, setZenerVoltage] = useState<number>(5.1); // Zener rating (5.1V)
  const [mechanism, setMechanism] = useState<'zener' | 'avalanche'>('zener');

  // Breakdown state
  const isBreakdown = reverseVoltage >= zenerVoltage;
  const deltaV = Math.max(0, reverseVoltage - zenerVoltage);
  
  // Dynamic zener resistance Rz ~ 5 Ohms
  const rZener = 5;
  const breakdownCurrentMa = isBreakdown ? (deltaV / rZener) * 1000 : 0.001; // mA

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left Panel: Physics & Controls */}
      <div className="bg-[#202124] rounded-2xl p-6 sm:p-8 border border-white/5 shadow-2xl flex flex-col justify-between space-y-6">
        <div>
          <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
            <div className="flex items-center gap-2">
              <ShieldAlert size={18} className="text-red-400" />
              <h3 className="text-lg font-bold text-white">Reverse Breakdown Mechanisms</h3>
            </div>

            <div className="flex bg-[#18191c] p-1 rounded-xl border border-white/10">
              <button
                onClick={() => setMechanism('zener')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  mechanism === 'zener' ? 'bg-purple-600 text-white shadow' : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                Zener Tunneling
              </button>
              <button
                onClick={() => setMechanism('avalanche')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  mechanism === 'avalanche' ? 'bg-purple-600 text-white shadow' : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                Impact Avalanche
              </button>
            </div>
          </div>

          {/* Breakdown Explanation Card */}
          <div className="bg-[#18191c]/70 rounded-xl p-4 border border-white/5 space-y-3">
            <div className="text-center">
              {mechanism === 'zener' ? (
                <div className="text-base text-purple-300 font-serif">
                  <MathTex math="\text{Quantum Tunneling: } E_{\text{field}} > 10^6 \text{ V/cm}" displayMode />
                  <p className="text-xs text-gray-300 font-sans mt-2">
                    In heavily-doped junctions, the depletion width is extremely narrow (less than 10 nm). Valence band electrons tunnel directly across the thin potential barrier into the conduction band.
                  </p>
                </div>
              ) : (
                <div className="text-base text-red-300 font-serif">
                  <MathTex math="\text{Impact Ionization: } M = \frac{1}{1 - (V_R / V_{BV})^n}" displayMode />
                  <p className="text-xs text-gray-300 font-sans mt-2">
                    In lightly-doped junctions, high reverse electric fields accelerate free carriers to high kinetic energies. Collisions with lattice atoms knock out additional electron-hole pairs, creating a multiplying avalanche cascade.
                  </p>
                </div>
              )}
            </div>

            {/* Breakdown Status Badge */}
            <div className="pt-2 flex items-center justify-center">
              {isBreakdown ? (
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-bold animate-pulse">
                  <Zap size={13} /> BREAKDOWN ACTIVE &mdash; Conducting {breakdownCurrentMa.toFixed(1)} mA
                </span>
              ) : (
                <span className="px-3 py-1 rounded-full bg-gray-500/10 text-gray-400 border border-white/10 text-xs font-semibold">
                  Blocking Region (V_R &lt; V_Z)
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Sliders */}
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-36 flex items-center justify-between shrink-0">
              <span className="font-serif italic font-bold text-gray-200">Reverse Voltage V_R</span>
              <span className={`font-mono text-sm font-bold ${isBreakdown ? 'text-red-400' : 'text-blue-400'}`}>
                {reverseVoltage.toFixed(1)} V
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="12"
              step="0.1"
              value={reverseVoltage}
              onChange={(e) => setReverseVoltage(parseFloat(e.target.value))}
              className="custom-slider"
            />
          </div>

          <div className="flex items-center gap-4">
            <div className="w-36 flex items-center justify-between shrink-0">
              <span className="font-serif italic font-bold text-gray-200">Zener Rating V_Z</span>
              <span className="font-mono text-xs text-purple-400 font-semibold">{zenerVoltage.toFixed(1)} V</span>
            </div>
            <input
              type="range"
              min="2.4"
              max="10.0"
              step="0.1"
              value={zenerVoltage}
              onChange={(e) => setZenerVoltage(parseFloat(e.target.value))}
              className="custom-slider"
            />
          </div>
        </div>
      </div>

      {/* Right Panel: Zener Voltage Regulator Application & Breakdown I-V Graph */}
      <div className="bg-[#202124] rounded-2xl p-6 sm:p-8 border border-white/5 shadow-2xl flex flex-col justify-between">
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-2">
            <Cpu size={14} className="text-purple-400" />
            Zener Voltage Regulator Schematic & Curve
          </h4>

          <div className="w-full h-[280px] bg-[#18191c] rounded-xl border border-white/5 p-4 flex items-center justify-center">
            <svg viewBox="0 0 440 240" className="w-full h-full">
              {/* Reverse Breakdown Curve */}
              {/* Horizontal V axis */}
              <line x1="40" y1="120" x2="400" y2="120" stroke="#475569" strokeWidth="2" />
              <text x="390" y="140" fill="#94a3b8" fontSize="10">V_R</text>

              {/* Vertical I axis */}
              <line x1="280" y1="20" x2="280" y2="220" stroke="#475569" strokeWidth="2" />
              <text x="288" y="30" fill="#94a3b8" fontSize="10">I (Reverse)</text>

              {/* Breakdown Curve Path */}
              {/* Knee at Vz */}
              <path
                d={`M 80 210 L 80 125 Q 80 120, 100 120 L 280 120 L 360 40`}
                fill="none"
                stroke="#a855f7"
                strokeWidth="3"
              />

              {/* Dotted Zener Voltage Marker */}
              <line x1="80" y1="20" x2="80" y2="220" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4 3" />
              <text x="85" y="40" fill="#ef4444" fontSize="11" fontWeight="bold">V_Z = {zenerVoltage.toFixed(1)}V</text>

              {/* Dynamic Operating Marker */}
              {(() => {
                // Map reverseVoltage (0 to 12V) to SVG X (280 down to 40)
                const vRatio = Math.min(reverseVoltage / 12, 1);
                const curX = 280 - vRatio * 240;
                const curY = isBreakdown ? 120 + (breakdownCurrentMa / 200) * 80 : 120;

                return (
                  <g>
                    <circle cx={curX} cy={curY} r="7" fill={isBreakdown ? '#ef4444' : '#3b82f6'} filter="drop-shadow(0 0 6px #ef4444)" />
                    <circle cx={curX} cy={curY} r="3" fill="#ffffff" />
                  </g>
                );
              })()}
            </svg>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/5 text-center">
          <div className="bg-[#18191c] p-3 rounded-xl border border-white/5">
            <span className="text-[11px] text-gray-400 block uppercase">Reverse Voltage</span>
            <span className="text-base font-bold text-white">{reverseVoltage.toFixed(1)} V</span>
          </div>
          <div className="bg-[#18191c] p-3 rounded-xl border border-white/5">
            <span className="text-[11px] text-gray-400 block uppercase">Clamped Output</span>
            <span className="text-base font-bold text-purple-400">
              {isBreakdown ? zenerVoltage.toFixed(1) + ' V' : reverseVoltage.toFixed(1) + ' V'}
            </span>
          </div>
          <div className="bg-[#18191c] p-3 rounded-xl border border-white/5">
            <span className="text-[11px] text-gray-400 block uppercase">Breakdown Current</span>
            <span className={`text-base font-bold ${isBreakdown ? 'text-red-400' : 'text-gray-400'}`}>
              {breakdownCurrentMa.toFixed(1)} mA
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
