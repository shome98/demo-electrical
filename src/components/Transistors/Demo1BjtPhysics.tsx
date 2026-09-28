import React, { useState } from 'react';
import { MathTex } from '../MathTex';
import { Cpu, Zap } from 'lucide-react';

export const Demo1BjtPhysics: React.FC = () => {
  const [vBe, setVBe] = useState<number>(0.70); // Base-Emitter voltage (0.0 to 0.85V)
  const [beta, setBeta] = useState<number>(100); // Current Gain (hFE)
  const [rb, setRb] = useState<number>(10); // Base resistor kOhms
  const [rc, setRc] = useState<number>(1); // Collector resistor kOhms

  // BJT Physics Calculations
  const isCutoff = vBe < 0.60;
  const isSaturation = vBe > 0.78;

  // Base current Ib (mA)
  const ibMa = isCutoff ? 0 : Math.max(0, (vBe - 0.6) / rb);
  const ibUa = ibMa * 1000; // µA

  // Collector current Ic (mA)
  const idealIcMa = beta * ibMa;
  const maxIcMa = 12 / rc; // VCC / RC
  const icMa = Math.min(idealIcMa, maxIcMa);
  const isSaturatedActual = idealIcMa >= maxIcMa && !isCutoff;

  // Emitter current Ie = Ic + Ib
  const ieMa = icMa + ibMa;

  // Collector-Emitter Voltage VCE = VCC - Ic * RC
  const vce = Math.max(0.2, 12 - icMa * rc);

  // Operating Region
  const region = isCutoff ? 'Cutoff (OFF Switch)' : isSaturatedActual ? 'Saturation (Fully ON Switch)' : 'Active (Amplifier Region)';

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left Panel: Physics & Formulas */}
      <div className="bg-[#202124] rounded-2xl p-6 sm:p-8 border border-white/5 shadow-2xl flex flex-col justify-between space-y-6">
        <div>
          <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
            <div className="flex items-center gap-2">
              <Cpu size={18} className="text-blue-400" />
              <h3 className="text-lg font-bold text-white">How BJT Transistors Work (NPN Physics)</h3>
            </div>
            <span
              className={`text-xs px-2.5 py-1 rounded-full font-semibold border ${
                isCutoff
                  ? 'bg-gray-500/10 text-gray-400 border-gray-500/30'
                  : isSaturatedActual
                  ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                  : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
              }`}
            >
              {region}
            </span>
          </div>

          {/* Formulas */}
          <div className="space-y-3 my-4 bg-[#18191c]/70 rounded-xl p-4 border border-white/5 text-center">
            <div className="text-xl text-white font-serif">
              <MathTex math="I_C = \beta I_B \quad I_E = I_C + I_B \quad V_{CE} = V_{CC} - I_C R_C" displayMode />
            </div>

            <div className="text-base text-blue-300 font-serif">
              <MathTex
                math={`I_B = ${ibUa.toFixed(1)}\\ \\mu\\text{A} \\quad I_C = ${icMa.toFixed(2)}\\text{ mA} \\quad V_{CE} = ${vce.toFixed(2)}\\text{ V}`}
                displayMode
              />
            </div>

            <div className="text-xs text-gray-300 font-sans leading-relaxed pt-1">
              A tiny base current ($I_B$) controls a large collector current ($I_C$) by lowering the Base-Emitter depletion barrier ($V_{'BE'} \approx 0.7\text{'V'}$).
            </div>
          </div>
        </div>

        {/* Sliders */}
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-36 flex items-center justify-between shrink-0">
              <span className="font-serif italic font-bold text-gray-200">Base Voltage V_BE</span>
              <span className="font-mono text-xs text-blue-400 font-bold">{vBe.toFixed(2)} V</span>
            </div>
            <input
              type="range"
              min="0.0"
              max="0.85"
              step="0.01"
              value={vBe}
              onChange={(e) => setVBe(parseFloat(e.target.value))}
              className="custom-slider"
            />
          </div>

          <div className="flex items-center gap-4">
            <div className="w-36 flex items-center justify-between shrink-0">
              <span className="font-serif italic font-bold text-gray-200">Current Gain β (hFE)</span>
              <span className="font-mono text-xs text-amber-400 font-bold">{beta}</span>
            </div>
            <input
              type="range"
              min="20"
              max="300"
              step="5"
              value={beta}
              onChange={(e) => setBeta(parseFloat(e.target.value))}
              className="custom-slider"
            />
          </div>

          <div className="flex items-center gap-4">
            <div className="w-36 flex items-center justify-between shrink-0">
              <span className="font-serif italic font-bold text-gray-200">Collector R_C</span>
              <span className="font-mono text-xs text-gray-300">{rc} kΩ</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="10"
              step="0.5"
              value={rc}
              onChange={(e) => setRc(parseFloat(e.target.value))}
              className="custom-slider"
            />
          </div>
        </div>
      </div>

      {/* Right Panel: Interactive NPN BJT Circuit Diagram & Charge Carrier Flow */}
      <div className="bg-[#202124] rounded-2xl p-6 sm:p-8 border border-white/5 shadow-2xl flex flex-col justify-between">
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-2">
            <Zap size={14} className="text-blue-400" />
            NPN BJT Circuit Schematic & Carrier Injection
          </h4>

          <div className="w-full h-[280px] bg-[#18191c] rounded-xl border border-white/5 p-4 flex items-center justify-center">
            <svg viewBox="0 0 440 240" className="w-full h-full">
              {/* VCC Power Supply Line Top */}
              <line x1="280" y1="20" x2="280" y2="60" stroke="#ef4444" strokeWidth="2.5" />
              <text x="280" y="15" fill="#ef4444" fontSize="11" fontWeight="bold" textAnchor="middle">+12V (VCC)</text>

              {/* Collector Resistor RC */}
              <rect x="270" y="60" width="20" height="35" fill="#2d2e34" stroke="#64748b" strokeWidth="1.5" rx="3" />
              <text x="300" y="80" fill="#94a3b8" fontSize="10">R_C = {rc}kΩ</text>

              {/* Collector Wire to Transistor */}
              <line x1="280" y1="95" x2="280" y2="120" stroke="#a3a3a3" strokeWidth="2" />
              <text x="290" y="112" fill="#60a5fa" fontSize="10" fontWeight="bold">I_C = {icMa.toFixed(1)}mA</text>

              {/* Base Input Resistor & Wire */}
              <line x1="60" y1="140" x2="110" y2="140" stroke="#a3a3a3" strokeWidth="2" />
              <rect x="110" y="130" width="35" height="20" fill="#2d2e34" stroke="#64748b" strokeWidth="1.5" rx="3" />
              <line x1="145" y1="140" x2="220" y2="140" stroke="#a3a3a3" strokeWidth="2" />
              <text x="80" y="130" fill="#3b82f6" fontSize="10" fontWeight="bold">V_BE = {vBe.toFixed(2)}V</text>

              {/* BJT Transistor Symbol Center (x=240, y=140) */}
              <g transform="translate(240, 140)">
                {/* Base Vertical Bar */}
                <line x1="-20" y1="-25" x2="-20" y2="25" stroke="#ffffff" strokeWidth="3.5" />
                
                {/* Collector Diagonal Line */}
                <line x1="-20" y1="-12" x2="40" y2="-20" stroke="#ffffff" strokeWidth="2.5" />

                {/* Emitter Diagonal Line with Arrow pointing OUT (NPN) */}
                <line x1="-20" y1="12" x2="40" y2="20" stroke="#ffffff" strokeWidth="2.5" />
                <polygon points="38,20 26,12 30,24" fill="#ffffff" />

                {/* Transistor Circle Outer */}
                <circle cx="5" cy="0" r="32" fill="none" stroke="#60a5fa" strokeWidth="2" />
                <text x="5" y="4" fill="#60a5fa" fontSize="11" fontWeight="bold" textAnchor="middle">NPN</text>
              </g>

              {/* Emitter Ground Line Bottom */}
              <line x1="280" y1="160" x2="280" y2="210" stroke="#a3a3a3" strokeWidth="2" />
              {/* Ground Symbol */}
              <line x1="265" y1="210" x2="295" y2="210" stroke="#ffffff" strokeWidth="2" />
              <line x1="270" y1="215" x2="290" y2="215" stroke="#ffffff" strokeWidth="1.5" />
              <line x1="275" y1="220" x2="285" y2="220" stroke="#ffffff" strokeWidth="1" />
            </svg>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/5 text-center">
          <div className="bg-[#18191c] p-3 rounded-xl border border-white/5">
            <span className="text-[11px] text-gray-400 block uppercase">Base Current I_B</span>
            <span className="text-sm font-bold text-blue-400 font-mono">{ibUa.toFixed(1)} µA</span>
          </div>
          <div className="bg-[#18191c] p-3 rounded-xl border border-white/5">
            <span className="text-[11px] text-gray-400 block uppercase">Collector Current I_C</span>
            <span className="text-sm font-bold text-amber-400 font-mono">{icMa.toFixed(2)} mA</span>
          </div>
          <div className="bg-[#18191c] p-3 rounded-xl border border-white/5">
            <span className="text-[11px] text-gray-400 block uppercase">Collector V_CE</span>
            <span className="text-sm font-bold text-emerald-400 font-mono">{vce.toFixed(2)} V</span>
          </div>
        </div>
      </div>
    </div>
  );
};
