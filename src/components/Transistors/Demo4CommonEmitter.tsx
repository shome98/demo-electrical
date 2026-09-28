import React, { useState } from 'react';
import { MathTex } from '../MathTex';
import { Activity, Zap } from 'lucide-react';

export const Demo4CommonEmitter: React.FC = () => {
  const [vinPeak, setVinPeak] = useState<number>(50); // mV AC Peak
  const [rc, setRc] = useState<number>(4.7); // kOhms
  const [re, setRe] = useState<number>(1.0); // kOhms
  const [beta, setBeta] = useState<number>(150);

  // Common Emitter Calculations
  // Voltage Gain Av ≈ - RC / RE (or RC / re' unbypassed/bypassed)
  const av = - (rc / re);
  const voutPeak = Math.min(6.0, Math.abs(av) * (vinPeak / 1000)); // Volts peak

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left Panel: Equations & Biasing Controls */}
      <div className="bg-[#202124] rounded-2xl p-6 sm:p-8 border border-white/5 shadow-2xl flex flex-col justify-between space-y-6">
        <div>
          <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
            <div className="flex items-center gap-2">
              <Activity size={18} className="text-red-400" />
              <h3 className="text-lg font-bold text-white">Common Emitter Voltage Amplifier</h3>
            </div>
            <span className="text-xs bg-red-500/10 text-red-400 border border-red-500/20 px-2.5 py-1 rounded-full font-medium">
              180° Inverting Gain
            </span>
          </div>

          {/* Formulas */}
          <div className="space-y-3 my-4 bg-[#18191c]/70 rounded-xl p-4 border border-white/5 text-center">
            <div className="text-xl text-white font-serif">
              <MathTex math="A_V = -\frac{R_C}{R_E} \quad v_{\text{out}}(t) = - A_V \cdot v_{\text{in}}(t)" displayMode />
            </div>

            <div className="text-base text-red-300 font-serif">
              <MathTex
                math={`A_V = -\\frac{${rc}\\text{k}\\Omega}{${re}\\text{k}\\Omega} = ${av.toFixed(1)} \\quad (v_{\\text{out peak}} = ${voutPeak.toFixed(2)}\\text{ V})`}
                displayMode
              />
            </div>

            <div className="text-xs text-gray-300 font-sans leading-relaxed pt-1">
              Provides high voltage and power gain with a <strong>180° phase inversion</strong> between input and output AC signals.
            </div>
          </div>
        </div>

        {/* Sliders */}
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-36 flex items-center justify-between shrink-0">
              <span className="font-serif italic font-bold text-gray-200">AC Input Peak</span>
              <span className="font-mono text-xs text-blue-400 font-bold">{vinPeak} mV</span>
            </div>
            <input
              type="range"
              min="10"
              max="200"
              step="5"
              value={vinPeak}
              onChange={(e) => setVinPeak(parseFloat(e.target.value))}
              className="custom-slider"
            />
          </div>

          <div className="flex items-center gap-4">
            <div className="w-36 flex items-center justify-between shrink-0">
              <span className="font-serif italic font-bold text-gray-200">Collector R_C</span>
              <span className="font-mono text-xs text-red-400 font-bold">{rc} kΩ</span>
            </div>
            <input
              type="range"
              min="1.0"
              max="10.0"
              step="0.5"
              value={rc}
              onChange={(e) => setRc(parseFloat(e.target.value))}
              className="custom-slider"
            />
          </div>

          <div className="flex items-center gap-4">
            <div className="w-36 flex items-center justify-between shrink-0">
              <span className="font-serif italic font-bold text-gray-200">Emitter R_E</span>
              <span className="font-mono text-xs text-gray-300">{re} kΩ</span>
            </div>
            <input
              type="range"
              min="0.2"
              max="3.0"
              step="0.1"
              value={re}
              onChange={(e) => setRe(parseFloat(e.target.value))}
              className="custom-slider"
            />
          </div>
        </div>
      </div>

      {/* Right Panel: Waveform Visualization (180° Inverted Sine Waves) */}
      <div className="bg-[#202124] rounded-2xl p-6 sm:p-8 border border-white/5 shadow-2xl flex flex-col justify-between">
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-2">
            <Zap size={14} className="text-red-400" />
            AC Input vs 180° Inverted Output Waveform
          </h4>

          <div className="w-full h-[280px] bg-[#18191c] rounded-xl border border-white/5 p-4 flex items-center justify-center">
            <svg viewBox="0 0 440 240" className="w-full h-full">
              {/* Zero Reference Line */}
              <line x1="40" y1="120" x2="400" y2="120" stroke="#475569" strokeWidth="1.5" strokeDasharray="4 2" />

              {/* Input Sine Wave (Blue, small amplitude) */}
              <path
                d="M 40 120 Q 90 80, 140 120 T 240 120 T 340 120"
                fill="none"
                stroke="#3b82f6"
                strokeWidth="2.5"
              />
              <text x="140" y="70" fill="#60a5fa" fontSize="11" fontWeight="bold">Input v_in ({vinPeak}mV)</text>

              {/* Inverted Output Sine Wave (Red, 180° phase flipped & amplified) */}
              <path
                d={`M 40 120 Q 90 ${120 + voutPeak * 15}, 140 120 T 240 120 T 340 120`}
                fill="none"
                stroke="#ef4444"
                strokeWidth="3"
              />
              <text x="240" y="180" fill="#ef4444" fontSize="11" fontWeight="bold">
                Inverted v_out ({voutPeak.toFixed(2)}V Peak)
              </text>
            </svg>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/5 text-center">
          <div className="bg-[#18191c] p-3 rounded-xl border border-white/5">
            <span className="text-[11px] text-gray-400 block uppercase">Voltage Gain A_V</span>
            <span className="text-sm font-bold text-red-400 font-mono">{av.toFixed(1)}</span>
          </div>
          <div className="bg-[#18191c] p-3 rounded-xl border border-white/5">
            <span className="text-[11px] text-gray-400 block uppercase">Phase Shift</span>
            <span className="text-sm font-bold text-amber-400 font-mono">180° Flipped</span>
          </div>
          <div className="bg-[#18191c] p-3 rounded-xl border border-white/5">
            <span className="text-[11px] text-gray-400 block uppercase">Peak Output</span>
            <span className="text-sm font-bold text-emerald-400 font-mono">{voutPeak.toFixed(2)} V</span>
          </div>
        </div>
      </div>
    </div>
  );
};
