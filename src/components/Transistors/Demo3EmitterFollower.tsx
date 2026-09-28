import React, { useState } from 'react';
import { MathTex } from '../MathTex';
import { Shield, Zap } from 'lucide-react';

export const Demo3EmitterFollower: React.FC = () => {
  const [vin, setVin] = useState<number>(5.0); // Input voltage (0.7 to 10V)
  const [re, setRe] = useState<number>(1.0); // Emitter resistor kOhms
  const [beta, setBeta] = useState<number>(100);

  // Emitter Follower Physics
  const vbe = 0.7;
  const vout = Math.max(0, vin - vbe);
  const ieMa = vout / re;
  const ibMa = ieMa / (beta + 1);

  // Impedances
  const rInKohm = (beta + 1) * re;
  const rOutOhm = ieMa > 0 ? (25 / ieMa) : 1000;

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left Panel: Physics & Equations */}
      <div className="bg-[#202124] rounded-2xl p-6 sm:p-8 border border-white/5 shadow-2xl flex flex-col justify-between space-y-6">
        <div>
          <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
            <div className="flex items-center gap-2">
              <Shield size={18} className="text-purple-400" />
              <h3 className="text-lg font-bold text-white">Emitter Follower (Common Collector Buffer)</h3>
            </div>
            <span className="text-xs bg-purple-500/10 text-purple-400 border border-purple-500/20 px-2.5 py-1 rounded-full font-medium">
              Unity Voltage Gain (A_V ≈ 1)
            </span>
          </div>

          {/* Formulas */}
          <div className="space-y-3 my-4 bg-[#18191c]/70 rounded-xl p-4 border border-white/5 text-center">
            <div className="text-xl text-white font-serif">
              <MathTex math="V_{\text{OUT}} = V_{\text{IN}} - V_{BE} = V_{\text{IN}} - 0.7\text{V}" displayMode />
            </div>

            <div className="text-base text-purple-300 font-serif">
              <MathTex
                math={`V_{\\text{OUT}} = ${vin.toFixed(2)}\\text{V} - 0.70\\text{V} = ${vout.toFixed(2)}\\text{ V}`}
                displayMode
              />
            </div>

            <div className="text-sm text-gray-300 font-serif pt-1">
              <MathTex
                math={`R_{\\text{in}} \\approx \\beta R_E = (${beta})(${re}\\text{k}\\Omega) = ${rInKohm.toFixed(0)}\\text{ k}\\Omega \\quad (R_{\\text{out}} \\approx ${rOutOhm.toFixed(1)}\\ \\Omega)`}
                displayMode
              />
            </div>
          </div>
        </div>

        {/* Sliders */}
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-36 flex items-center justify-between shrink-0">
              <span className="font-serif italic font-bold text-gray-200">Input Voltage V_IN</span>
              <span className="font-mono text-xs text-purple-400 font-bold">{vin.toFixed(1)} V</span>
            </div>
            <input
              type="range"
              min="0.7"
              max="10.0"
              step="0.1"
              value={vin}
              onChange={(e) => setVin(parseFloat(e.target.value))}
              className="custom-slider"
            />
          </div>

          <div className="flex items-center gap-4">
            <div className="w-36 flex items-center justify-between shrink-0">
              <span className="font-serif italic font-bold text-gray-200">Emitter Resistor R_E</span>
              <span className="font-mono text-xs text-gray-300">{re} kΩ</span>
            </div>
            <input
              type="range"
              min="0.2"
              max="10.0"
              step="0.2"
              value={re}
              onChange={(e) => setRe(parseFloat(e.target.value))}
              className="custom-slider"
            />
          </div>

          <div className="flex items-center gap-4">
            <div className="w-36 flex items-center justify-between shrink-0">
              <span className="font-serif italic font-bold text-gray-200">Current Gain β</span>
              <span className="font-mono text-xs text-amber-400 font-bold">{beta}</span>
            </div>
            <input
              type="range"
              min="50"
              max="300"
              step="10"
              value={beta}
              onChange={(e) => setBeta(parseFloat(e.target.value))}
              className="custom-slider"
            />
          </div>
        </div>
      </div>

      {/* Right Panel: Schematic & Waveform Buffer Output */}
      <div className="bg-[#202124] rounded-2xl p-6 sm:p-8 border border-white/5 shadow-2xl flex flex-col justify-between">
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-2">
            <Zap size={14} className="text-purple-400" />
            Voltage Tracking Schematic & Output Buffer
          </h4>

          <div className="w-full h-[280px] bg-[#18191c] rounded-xl border border-white/5 p-4 flex items-center justify-center">
            <svg viewBox="0 0 440 240" className="w-full h-full">
              {/* Collector tied to VCC */}
              <line x1="280" y1="30" x2="280" y2="100" stroke="#ef4444" strokeWidth="2.5" />
              <text x="280" y="20" fill="#ef4444" fontSize="11" fontWeight="bold" textAnchor="middle">+12V (VCC)</text>

              {/* Input V_IN */}
              <line x1="60" y1="140" x2="220" y2="140" stroke="#a855f7" strokeWidth="2.5" />
              <text x="100" y="125" fill="#c084fc" fontSize="11" fontWeight="bold">V_IN = {vin.toFixed(1)}V</text>

              {/* BJT Transistor Center */}
              <g transform="translate(240, 140)">
                <line x1="-20" y1="-25" x2="-20" y2="25" stroke="#ffffff" strokeWidth="3.5" />
                <line x1="-20" y1="-12" x2="40" y2="-20" stroke="#ffffff" strokeWidth="2.5" />
                <line x1="-20" y1="12" x2="40" y2="20" stroke="#ffffff" strokeWidth="2.5" />
                <polygon points="38,20 26,12 30,24" fill="#ffffff" />
                <circle cx="5" cy="0" r="32" fill="none" stroke="#a855f7" strokeWidth="2" />
              </g>

              {/* Emitter Output V_OUT */}
              <line x1="280" y1="160" x2="280" y2="190" stroke="#a3a3a3" strokeWidth="2" />
              <line x1="280" y1="190" x2="380" y2="190" stroke="#10b981" strokeWidth="2.5" />
              <text x="340" y="180" fill="#34d399" fontSize="11" fontWeight="bold">V_OUT = {vout.toFixed(2)}V</text>

              {/* RE Resistor to Ground */}
              <rect x="270" y="190" width="20" height="30" fill="#2d2e34" stroke="#64748b" strokeWidth="1.5" rx="3" />
            </svg>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/5 text-center">
          <div className="bg-[#18191c] p-3 rounded-xl border border-white/5">
            <span className="text-[11px] text-gray-400 block uppercase">Input Voltage</span>
            <span className="text-sm font-bold text-purple-400">{vin.toFixed(2)} V</span>
          </div>
          <div className="bg-[#18191c] p-3 rounded-xl border border-white/5">
            <span className="text-[11px] text-gray-400 block uppercase">Output Voltage</span>
            <span className="text-sm font-bold text-emerald-400">{vout.toFixed(2)} V</span>
          </div>
          <div className="bg-[#18191c] p-3 rounded-xl border border-white/5">
            <span className="text-[11px] text-gray-400 block uppercase">Input Impedance</span>
            <span className="text-sm font-bold text-white font-mono">{rInKohm.toFixed(0)} kΩ</span>
          </div>
        </div>
      </div>
    </div>
  );
};
