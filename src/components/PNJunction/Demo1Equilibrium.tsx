import React, { useState } from 'react';
import { MathTex } from '../MathTex';
import { Atom, Layers } from 'lucide-react';

export const Demo1Equilibrium: React.FC = () => {
  const [na, setNa] = useState<number>(1e16); // Acceptor conc (cm^-3)
  const [nd, setNd] = useState<number>(1e16); // Donor conc (cm^-3)
  const [temperature, setTemperature] = useState<number>(300); // Kelvin

  // Physical Constants
  const q = 1.602e-19;
  const ni = 1.5e10; // Si intrinsic conc at 300K
  const eps = 11.7 * 8.854e-14; // Si permittivity F/cm

  // Built-in Potential Vbi = (kT/q) * ln(Na * Nd / ni^2)
  const vt = (8.617e-5 * temperature); // Thermal voltage in V
  const vbi = Math.max(0.1, vt * Math.log((na * nd) / (ni * ni)));

  // Depletion Width W = sqrt( (2 * eps / q) * Vbi * (1/Na + 1/Nd) )
  const wCm = Math.sqrt(((2 * eps) / q) * vbi * (1 / na + 1 / nd));
  const wNm = wCm * 1e7; // Convert to nanometers

  // Depletion width in P and N sides
  const xnNm = wNm * (na / (na + nd));
  const xpNm = wNm * (nd / (na + nd));

  // Peak Electric Field Emax = q * Nd * xn / eps
  const eMaxKv = (q * nd * (xnNm * 1e-7) / eps) / 1000;

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left Panel: Physics & Energy Band Diagram */}
      <div className="bg-[#202124] rounded-2xl p-6 sm:p-8 border border-white/5 shadow-2xl flex flex-col justify-between space-y-6">
        <div>
          <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
            <div className="flex items-center gap-2">
              <Atom size={18} className="text-blue-400" />
              <h3 className="text-lg font-bold text-white">Equilibrium PN Junction & Energy Bands</h3>
            </div>
            <span className="text-xs bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2.5 py-1 rounded-full font-medium">
              Zero Bias (V = 0V)
            </span>
          </div>

          {/* Formulas */}
          <div className="space-y-3 my-4 bg-[#18191c]/70 rounded-xl p-4 border border-white/5 text-center">
            <div className="text-lg text-white font-serif">
              <MathTex math="V_{bi} = \frac{kT}{q} \ln\left(\frac{N_A N_D}{n_i^2}\right)" displayMode />
            </div>

            <div className="text-base text-blue-300 font-serif">
              <MathTex
                math={`V_{bi} = (${vt.toFixed(3)}\\text{ V}) \\ln\\left(\\frac{10^{${Math.log10(na).toFixed(0)}} \\cdot 10^{${Math.log10(nd).toFixed(0)}}}{(1.5 \\times 10^{10})^2}\\right) = ${vbi.toFixed(3)}\\text{ V}`}
                displayMode
              />
            </div>

            <div className="text-sm text-gray-300 font-serif">
              <MathTex math={`W = \\sqrt{\\frac{2\\varepsilon_s V_{bi}}{q} \\left(\\frac{N_A + N_D}{N_A N_D}\\right)} = ${wNm.toFixed(1)}\\text{ nm}`} displayMode />
            </div>
          </div>
        </div>

        {/* Sliders for Na, Nd, Temperature */}
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-36 flex items-center justify-between shrink-0">
              <span className="font-serif italic font-bold text-gray-200">N_A (P-Doping)</span>
              <span className="font-mono text-xs text-blue-400 font-semibold">10^{Math.log10(na).toFixed(1)} cm⁻³</span>
            </div>
            <input
              type="range"
              min="15"
              max="18"
              step="0.1"
              value={Math.log10(na)}
              onChange={(e) => setNa(Math.pow(10, parseFloat(e.target.value)))}
              className="custom-slider"
            />
          </div>

          <div className="flex items-center gap-4">
            <div className="w-36 flex items-center justify-between shrink-0">
              <span className="font-serif italic font-bold text-gray-200">N_D (N-Doping)</span>
              <span className="font-mono text-xs text-green-400 font-semibold">10^{Math.log10(nd).toFixed(1)} cm⁻³</span>
            </div>
            <input
              type="range"
              min="15"
              max="18"
              step="0.1"
              value={Math.log10(nd)}
              onChange={(e) => setNd(Math.pow(10, parseFloat(e.target.value)))}
              className="custom-slider"
            />
          </div>

          <div className="flex items-center gap-4">
            <div className="w-36 flex items-center justify-between shrink-0">
              <span className="font-serif italic font-bold text-gray-200">Temperature</span>
              <span className="font-mono text-xs text-amber-400 font-semibold">{temperature} K</span>
            </div>
            <input
              type="range"
              min="200"
              max="450"
              step="10"
              value={temperature}
              onChange={(e) => setTemperature(parseFloat(e.target.value))}
              className="custom-slider"
            />
          </div>
        </div>
      </div>

      {/* Right Panel: Animated Microscopic Junction & Energy Band Profile */}
      <div className="bg-[#202124] rounded-2xl p-6 sm:p-8 border border-white/5 shadow-2xl flex flex-col justify-between">
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-2">
            <Layers size={14} className="text-blue-400" />
            Carrier Distribution & Energy Band Diagram E(x)
          </h4>

          {/* SVG Junction & Energy Bands */}
          <div className="w-full h-[300px] bg-[#18191c] rounded-xl border border-white/5 p-4 flex flex-col justify-between">
            <svg viewBox="0 0 500 240" className="w-full h-full">
              {/* Background regions */}
              {/* P-Type region left */}
              <rect x="20" y="20" width="230" height="90" fill="#1e293b" rx="6" />
              <text x="70" y="45" fill="#60a5fa" fontSize="13" fontWeight="bold">P-Type Region</text>
              <text x="70" y="65" fill="#94a3b8" fontSize="11">Holes (h⁺) & Acceptors (−)</text>

              {/* N-Type region right */}
              <rect x="250" y="20" width="230" height="90" fill="#064e3b" rx="6" />
              <text x="350" y="45" fill="#34d399" fontSize="13" fontWeight="bold">N-Type Region</text>
              <text x="350" y="65" fill="#a7f3d0" fontSize="11">Electrons (e⁻) & Donors (+)</text>

              {/* Depletion Layer Overlay */}
              <rect
                x={250 - xpNm * 0.8}
                y="20"
                width={(xpNm + xnNm) * 0.8}
                height="90"
                fill="url(#depletionPattern)"
                stroke="#f59e0b"
                strokeWidth="1.5"
                strokeDasharray="4 2"
                opacity="0.9"
              />

              <pattern id="depletionPattern" width="10" height="10" patternUnits="userSpaceOnUse">
                <line x1="0" y1="10" x2="10" y2="0" stroke="#f59e0b" strokeWidth="1" opacity="0.3" />
              </pattern>

              {/* Fixed Space Charge Ions in Depletion Layer */}
              {/* Negative Acceptor Ions on P-side */}
              <circle cx={250 - xpNm * 0.4} cy="55" r="7" fill="#ef4444" opacity="0.8" />
              <text x={250 - xpNm * 0.4} y="58" fill="#fff" fontSize="9" textAnchor="middle" fontWeight="bold">−</text>

              {/* Positive Donor Ions on N-side */}
              <circle cx={250 + xnNm * 0.4} cy="55" r="7" fill="#3b82f6" opacity="0.8" />
              <text x={250 + xnNm * 0.4} y="58" fill="#fff" fontSize="9" textAnchor="middle" fontWeight="bold">+</text>

              {/* Depletion Width Label */}
              <line
                x1={250 - xpNm * 0.8}
                y1="100"
                x2={250 + xnNm * 0.8}
                y2="100"
                stroke="#f59e0b"
                strokeWidth="2"
              />
              <text x="250" y="116" fill="#fbbf24" fontSize="11" fontWeight="bold" textAnchor="middle">
                Depletion Width W = {wNm.toFixed(1)} nm
              </text>

              {/* ENERGY BAND DIAGRAM AT BOTTOM */}
              {/* Conduction Band Ec */}
              <path
                d={`M 20 160 L ${250 - xpNm * 0.8} 160 C 250 160, 250 ${160 + vbi * 40}, ${250 + xnNm * 0.8} ${160 + vbi * 40} L 480 ${160 + vbi * 40}`}
                fill="none"
                stroke="#60a5fa"
                strokeWidth="2.5"
              />
              <text x="30" y="152" fill="#60a5fa" fontSize="11" fontWeight="bold">E_c (Conduction)</text>

              {/* Fermi Level Ef (Flat in Equilibrium) */}
              <line x1="20" y1="185" x2="480" y2="185" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="5 3" />
              <text x="440" y="180" fill="#ef4444" fontSize="10" fontWeight="bold">E_F</text>

              {/* Valence Band Ev */}
              <path
                d={`M 20 210 L ${250 - xpNm * 0.8} 210 C 250 210, 250 ${210 + vbi * 40}, ${250 + xnNm * 0.8} ${210 + vbi * 40} L 480 ${210 + vbi * 40}`}
                fill="none"
                stroke="#a7f3d0"
                strokeWidth="2.5"
              />
              <text x="30" y="228" fill="#a7f3d0" fontSize="11" fontWeight="bold">E_v (Valence)</text>
            </svg>
          </div>
        </div>

        {/* Calculated Stats Grid */}
        <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/5 text-center">
          <div className="bg-[#18191c] p-3 rounded-xl border border-white/5">
            <span className="text-[11px] text-gray-400 block uppercase">Built-in Vbi</span>
            <span className="text-base font-bold text-white">{vbi.toFixed(3)} V</span>
          </div>
          <div className="bg-[#18191c] p-3 rounded-xl border border-white/5">
            <span className="text-[11px] text-gray-400 block uppercase">Depletion W</span>
            <span className="text-base font-bold text-amber-400">{wNm.toFixed(1)} nm</span>
          </div>
          <div className="bg-[#18191c] p-3 rounded-xl border border-white/5">
            <span className="text-[11px] text-gray-400 block uppercase">Peak E-Field</span>
            <span className="text-base font-bold text-blue-400">{eMaxKv.toFixed(1)} kV/cm</span>
          </div>
        </div>
      </div>
    </div>
  );
};
