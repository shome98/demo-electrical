import React, { useState } from 'react';
import { MathTex } from '../MathTex';
import { Activity, Compass } from 'lucide-react';

export const ACPowerCalculator: React.FC = () => {
  const [vRms, setVRms] = useState<number>(120);
  const [resistance, setResistance] = useState<number>(40);
  const [inductance, setInductance] = useState<number>(30); // XL
  const [capacitance, setCapacitance] = useState<number>(10); // XC

  // AC Impedance calculations
  const netX = inductance - capacitance; // XL - XC
  const impedance = Math.sqrt(resistance * resistance + netX * netX); // Z
  const iRms = impedance > 0 ? vRms / impedance : 0;
  
  const realPowerP = iRms * iRms * resistance; // P (Watts)
  const reactivePowerQ = iRms * iRms * netX; // Q (VAR)
  const apparentPowerS = vRms * iRms; // S (VA)
  
  const powerFactor = impedance > 0 ? resistance / impedance : 1;
  const phaseAngleRad = Math.atan2(netX, resistance);
  const phaseAngleDeg = (phaseAngleRad * 180) / Math.PI;

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left Panel - Controls & Math */}
      <div className="bg-[#202124] rounded-2xl p-6 sm:p-8 border border-white/5 shadow-2xl flex flex-col justify-between space-y-6">
        <div>
          <div className="flex items-center gap-2 border-b border-white/5 pb-4 mb-4">
            <Activity size={18} className="text-purple-400" />
            <h2 className="text-lg font-bold text-white">AC Impedance & Power Triangle</h2>
          </div>

          <div className="text-center space-y-3 my-4 bg-[#18191c]/60 rounded-xl p-4 border border-white/5">
            <div className="text-xl text-white font-serif">
              <MathTex math="Z = \sqrt{R^2 + (X_L - X_C)^2}" displayMode />
            </div>

            <div className="text-base text-purple-300 font-serif">
              <MathTex
                math={`Z = \\sqrt{${resistance}^2 + (${inductance} - ${capacitance})^2} = ${impedance.toFixed(2)}\\ \\Omega`}
                displayMode
              />
            </div>

            <div className="text-sm text-gray-300 font-serif">
              <MathTex
                math={`\\text{Power Factor } (\\cos\\theta) = \\frac{R}{Z} = ${powerFactor.toFixed(3)} \\quad (\\theta = ${phaseAngleDeg.toFixed(1)}^\\circ)`}
                displayMode
              />
            </div>
          </div>
        </div>

        {/* Sliders */}
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-32 flex items-center justify-between shrink-0">
              <span className="font-serif italic font-bold text-gray-200">V RMS</span>
              <span className="font-mono text-sm text-purple-400 font-semibold">{vRms} V</span>
            </div>
            <input
              type="range"
              min="10"
              max="240"
              value={vRms}
              onChange={(e) => setVRms(parseFloat(e.target.value))}
              className="custom-slider"
            />
          </div>

          <div className="flex items-center gap-4">
            <div className="w-32 flex items-center justify-between shrink-0">
              <span className="font-serif italic font-bold text-gray-200">R (Resistance)</span>
              <span className="font-mono text-sm text-gray-300">{resistance} Ω</span>
            </div>
            <input
              type="range"
              min="1"
              max="100"
              value={resistance}
              onChange={(e) => setResistance(parseFloat(e.target.value))}
              className="custom-slider"
            />
          </div>

          <div className="flex items-center gap-4">
            <div className="w-32 flex items-center justify-between shrink-0">
              <span className="font-serif italic font-bold text-gray-200">X_L (Induction)</span>
              <span className="font-mono text-sm text-gray-300">{inductance} Ω</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={inductance}
              onChange={(e) => setInductance(parseFloat(e.target.value))}
              className="custom-slider"
            />
          </div>

          <div className="flex items-center gap-4">
            <div className="w-32 flex items-center justify-between shrink-0">
              <span className="font-serif italic font-bold text-gray-200">X_C (Capacitance)</span>
              <span className="font-mono text-sm text-gray-300">{capacitance} Ω</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={capacitance}
              onChange={(e) => setCapacitance(parseFloat(e.target.value))}
              className="custom-slider"
            />
          </div>
        </div>
      </div>

      {/* Right Panel - AC Power Triangle Diagram */}
      <div className="bg-[#202124] rounded-2xl p-6 sm:p-8 border border-white/5 shadow-2xl flex flex-col justify-between">
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4 flex items-center gap-2">
            <Compass size={14} className="text-purple-400" />
            Vector Power Triangle (P, Q, S)
          </h3>

          <div className="w-full h-[260px] bg-[#18191c] rounded-xl border border-white/5 flex items-center justify-center p-4">
            <svg viewBox="0 0 400 220" className="w-full h-full">
              {/* Origin at (80, 180) */}
              <g transform="translate(80, 180)">
                {/* Horizontal Axis Real Power P */}
                <line x1="0" y1="0" x2="220" y2="0" stroke="#3b82f6" strokeWidth="3.5" strokeLinecap="round" />
                <text x="110" y="24" fill="#60a5fa" fontSize="12" fontWeight="bold" textAnchor="middle">
                  P Real = {realPowerP.toFixed(1)} W
                </text>

                {/* Vertical Axis Reactive Power Q */}
                <line x1="220" y1="0" x2="220" y2="-120" stroke="#a855f7" strokeWidth="3.5" strokeLinecap="round" />
                <text x="232" y="-60" fill="#c084fc" fontSize="12" fontWeight="bold" textAnchor="start">
                  Q = {reactivePowerQ.toFixed(1)} VAR
                </text>

                {/* Hypotenuse Apparent Power S */}
                <line x1="0" y1="0" x2="220" y2="-120" stroke="#f59e0b" strokeWidth="3.5" strokeDasharray="5 3" />
                <text x="100" y="-70" fill="#fbbf24" fontSize="12" fontWeight="bold" textAnchor="middle" transform="rotate(-28, 100, -70)">
                  S Apparent = {apparentPowerS.toFixed(1)} VA
                </text>

                {/* Angle Arc θ */}
                <path d="M 40 0 A 40 40 0 0 0 35 -18" fill="none" stroke="#e5e7eb" strokeWidth="1.5" />
                <text x="48" y="-8" fill="#e5e7eb" fontSize="11" fontWeight="bold">θ = {phaseAngleDeg.toFixed(1)}°</text>
              </g>
            </svg>
          </div>
        </div>

        {/* Breakdown Stats */}
        <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/5 text-center">
          <div className="bg-[#18191c] p-3 rounded-xl border border-white/5">
            <span className="text-[11px] text-gray-400 block uppercase">Impedance Z</span>
            <span className="text-base font-bold text-white">{impedance.toFixed(2)} Ω</span>
          </div>
          <div className="bg-[#18191c] p-3 rounded-xl border border-white/5">
            <span className="text-[11px] text-gray-400 block uppercase">RMS Current</span>
            <span className="text-base font-bold text-purple-400">{iRms.toFixed(2)} A</span>
          </div>
          <div className="bg-[#18191c] p-3 rounded-xl border border-white/5">
            <span className="text-[11px] text-gray-400 block uppercase">Power Factor</span>
            <span className="text-base font-bold text-amber-400">{powerFactor.toFixed(3)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
