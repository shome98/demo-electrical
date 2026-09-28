import React, { useState } from 'react';
import { MathTex } from '../MathTex';
import { Zap, TrendingUp } from 'lucide-react';

export const Demo2BiasDynamics: React.FC = () => {
  const [vBias, setVBias] = useState<number>(0.65); // Applied bias voltage (-3.0V to +0.85V)
  const [i0, setI0] = useState<number>(1e-12); // Reverse saturation current (1 pA)
  const [ideality, setIdeality] = useState<number>(1.1); // Ideality factor n

  // Constants at T = 300K
  const vt = 0.0259; // Thermal voltage (V)
  const vbi = 0.72; // Built-in potential (V)

  // Shockley Diode Current I = I0 * ( exp(V / (n * Vt)) - 1 )
  const exponent = Math.min(vBias / (ideality * vt), 40); // prevent numerical overflow
  const currentAmp = i0 * (Math.exp(exponent) - 1);
  const currentMa = currentAmp * 1000;

  // Barrier height q(Vbi - V)
  const effectiveBarrier = Math.max(0, vbi - vBias);

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left Panel: Shockley Equation & Controls */}
      <div className="bg-[#202124] rounded-2xl p-6 sm:p-8 border border-white/5 shadow-2xl flex flex-col justify-between space-y-6">
        <div>
          <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
            <div className="flex items-center gap-2">
              <Zap size={18} className="text-amber-400" />
              <h3 className="text-lg font-bold text-white">Forward & Reverse Bias Dynamics</h3>
            </div>
            <span
              className={`text-xs px-2.5 py-1 rounded-full font-semibold border ${
                vBias > 0.5
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                  : vBias < 0
                  ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30'
                  : 'bg-gray-500/10 text-gray-400 border-gray-500/30'
              }`}
            >
              {vBias > 0.5 ? 'Forward Conduction' : vBias < 0 ? 'Reverse Blocking' : 'Equilibrium'}
            </span>
          </div>

          {/* Shockley Formula Display */}
          <div className="space-y-3 my-4 bg-[#18191c]/70 rounded-xl p-4 border border-white/5 text-center">
            <div className="text-xl text-white font-serif">
              <MathTex math="I = I_0 \left( e^{\frac{qV}{n k_B T}} - 1 \right)" displayMode />
            </div>

            <div className="text-base text-amber-300 font-serif">
              <MathTex
                math={`I = (${(i0 * 1e12).toFixed(1)}\\text{ pA}) \\left( e^{\\frac{${vBias.toFixed(2)}\\text{ V}}{${(ideality * vt).toFixed(3)}\\text{ V}}} - 1 \\right) = ${
                  Math.abs(currentMa) < 0.001
                    ? (currentAmp * 1e12).toFixed(2) + '\\text{ pA}'
                    : currentMa.toFixed(2) + '\\text{ mA}'
                }`}
                displayMode
              />
            </div>

            <div className="text-sm text-gray-300 font-serif pt-1">
              <MathTex
                math={`\\text{Effective Barrier } q(V_{bi} - V_a) = ${vbi.toFixed(2)}\\text{V} - ${vBias.toFixed(2)}\\text{V} = ${effectiveBarrier.toFixed(2)}\\text{ eV}`}
                displayMode
              />
            </div>
          </div>
        </div>

        {/* Sliders */}
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-36 flex items-center justify-between shrink-0">
              <span className="font-serif italic font-bold text-gray-200">Applied Bias (V_a)</span>
              <span className={`font-mono text-sm font-bold ${vBias >= 0 ? 'text-emerald-400' : 'text-indigo-400'}`}>
                {vBias.toFixed(2)} V
              </span>
            </div>
            <input
              type="range"
              min="-3.0"
              max="0.80"
              step="0.01"
              value={vBias}
              onChange={(e) => setVBias(parseFloat(e.target.value))}
              className="custom-slider"
            />
          </div>

          <div className="flex items-center gap-4">
            <div className="w-36 flex items-center justify-between shrink-0">
              <span className="font-serif italic font-bold text-gray-200">Saturation I₀</span>
              <span className="font-mono text-xs text-amber-400">{(i0 * 1e12).toFixed(0)} pA</span>
            </div>
            <input
              type="range"
              min="1e-13"
              max="1e-11"
              step="1e-13"
              value={i0}
              onChange={(e) => setI0(parseFloat(e.target.value))}
              className="custom-slider"
            />
          </div>

          <div className="flex items-center gap-4">
            <div className="w-36 flex items-center justify-between shrink-0">
              <span className="font-serif italic font-bold text-gray-200">Ideality Factor (n)</span>
              <span className="font-mono text-xs text-gray-300">{ideality.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min="1.0"
              max="2.0"
              step="0.05"
              value={ideality}
              onChange={(e) => setIdeality(parseFloat(e.target.value))}
              className="custom-slider"
            />
          </div>
        </div>
      </div>

      {/* Right Panel: Shockley I-V Characteristic Curve & Operating Point */}
      <div className="bg-[#202124] rounded-2xl p-6 sm:p-8 border border-white/5 shadow-2xl flex flex-col justify-between">
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-2">
            <TrendingUp size={14} className="text-emerald-400" />
            Diode I-V Characteristic Curve & Q-Point
          </h4>

          <div className="w-full h-[280px] bg-[#18191c] rounded-xl border border-white/5 p-4 flex items-center justify-center">
            <svg viewBox="0 0 440 240" className="w-full h-full">
              {/* Grid axes */}
              {/* Horizontal Voltage Axis */}
              <line x1="40" y1="180" x2="400" y2="180" stroke="#475569" strokeWidth="2" />
              <text x="400" y="198" fill="#94a3b8" fontSize="11" fontWeight="bold">V (Volts)</text>

              {/* Vertical Current Axis */}
              <line x1="160" y1="20" x2="160" y2="210" stroke="#475569" strokeWidth="2" />
              <text x="165" y="30" fill="#94a3b8" fontSize="11" fontWeight="bold">I (mA)</text>

              {/* Origin Marker 0V */}
              <text x="150" y="195" fill="#64748b" fontSize="10">0</text>
              <text x="320" y="195" fill="#64748b" fontSize="10">0.7V</text>
              <line x1="320" y1="176" x2="320" y2="184" stroke="#64748b" strokeWidth="1.5" />

              {/* Exponential Diode Curve Path */}
              {/* Path mapping: V from -3.0 (x=40) to +0.80 (x=380). I=0 at y=180, I=50mA at y=30 */}
              <path
                d="M 40 180 L 160 180 Q 280 180, 310 160 T 360 40"
                fill="none"
                stroke="#10b981"
                strokeWidth="3"
                strokeLinecap="round"
              />

              {/* Dynamic Q-Operating Point */}
              {(() => {
                // Map vBias (-3.0 to 0.8) to SVG X (40 to 380)
                const clampedV = Math.max(-3.0, Math.min(0.8, vBias));
                const qX = 160 + (clampedV / 0.8) * 200;
                
                // Map currentMa (0 to 40mA) to SVG Y (180 to 40)
                const clampedI = Math.max(-10, Math.min(60, currentMa));
                const qY = 180 - (clampedI / 40) * 140;

                return (
                  <g>
                    {/* Dotted lines to axes */}
                    <line x1={qX} y1={qY} x2={qX} y2="180" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 3" />
                    <line x1={qX} y1={qY} x2="160" y2={qY} stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 3" />

                    {/* Glowing Q-Point Circle */}
                    <circle cx={qX} cy={qY} r="7" fill="#f59e0b" filter="drop-shadow(0 0 6px #f59e0b)" />
                    <circle cx={qX} cy={qY} r="3" fill="#ffffff" />

                    {/* Readout label beside Q-point */}
                    <text x={qX + 10} y={qY - 8} fill="#fbbf24" fontSize="11" fontWeight="bold">
                      ({vBias.toFixed(2)}V, {currentMa < 0.01 ? '0 mA' : currentMa.toFixed(1) + 'mA'})
                    </text>
                  </g>
                );
              })()}
            </svg>
          </div>
        </div>

        {/* Dynamic Summary Stats */}
        <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/5 text-center">
          <div className="bg-[#18191c] p-3 rounded-xl border border-white/5">
            <span className="text-[11px] text-gray-400 block uppercase">Bias Voltage</span>
            <span className={`text-base font-bold ${vBias >= 0 ? 'text-emerald-400' : 'text-indigo-400'}`}>
              {vBias.toFixed(2)} V
            </span>
          </div>
          <div className="bg-[#18191c] p-3 rounded-xl border border-white/5">
            <span className="text-[11px] text-gray-400 block uppercase">Diode Current</span>
            <span className="text-base font-bold text-amber-400">
              {Math.abs(currentMa) < 0.001 ? (currentAmp * 1e12).toFixed(1) + ' pA' : currentMa.toFixed(2) + ' mA'}
            </span>
          </div>
          <div className="bg-[#18191c] p-3 rounded-xl border border-white/5">
            <span className="text-[11px] text-gray-400 block uppercase">Barrier Height</span>
            <span className="text-base font-bold text-white">{effectiveBarrier.toFixed(2)} eV</span>
          </div>
        </div>
      </div>
    </div>
  );
};
