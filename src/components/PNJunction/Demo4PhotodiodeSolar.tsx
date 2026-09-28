import React, { useState } from 'react';
import { MathTex } from '../MathTex';
import { Sun, Award } from 'lucide-react';

export const Demo4PhotodiodeSolar: React.FC = () => {
  const [irradiance, setIrradiance] = useState<number>(800); // W/m^2 (0 to 1200)
  const [loadResistor, setLoadResistor] = useState<number>(10); // Load resistance Ohms

  // Photodiode Parameters
  const iscMax = 3.5; // Max short circuit current (Amps) at 1000 W/m^2
  const vocMax = 0.62; // Open circuit voltage (Volts)

  // Photocurrent scales linearly with irradiance
  const isc = (irradiance / 1000) * iscMax;
  
  // Voc scales logarithmically with light: Voc = Vt * ln(Isc / I0 + 1)
  const vt = 0.0259;
  const i0 = 1e-9;
  const voc = Math.max(0, vt * Math.log(isc / i0 + 1));

  // Operating voltage and current with load resistor
  const vOp = Math.min(voc, isc * loadResistor);
  const iOp = loadResistor > 0 ? vOp / loadResistor : isc;
  const powerOutputMw = (vOp * iOp) * 1000; // mW

  // Input solar power on 100 cm^2 cell (0.01 m^2)
  const area = 0.01;
  const pInWatts = irradiance * area;
  const efficiency = pInWatts > 0 ? ((vOp * iOp) / pInWatts) * 100 : 0;

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left Panel: Physics & Solar Formulas */}
      <div className="bg-[#202124] rounded-2xl p-6 sm:p-8 border border-white/5 shadow-2xl flex flex-col justify-between space-y-6">
        <div>
          <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
            <div className="flex items-center gap-2">
              <Sun size={18} className="text-yellow-400" />
              <h3 className="text-lg font-bold text-white">Photovoltaic Solar Cell & Photodiode</h3>
            </div>
            <span className="text-xs bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 px-2.5 py-1 rounded-full font-medium">
              Optoelectronic Conversion
            </span>
          </div>

          {/* Formulas Card */}
          <div className="space-y-3 my-4 bg-[#18191c]/70 rounded-xl p-4 border border-white/5 text-center">
            <div className="text-xl text-white font-serif">
              <MathTex math="I = I_{ph} - I_0 \left(e^{\frac{qV}{k_B T}} - 1\right)" displayMode />
            </div>

            <div className="text-base text-yellow-300 font-serif">
              <MathTex
                math={`I_{sc} = ${isc.toFixed(2)}\\text{ A} \\quad V_{oc} = ${voc.toFixed(2)}\\text{ V}`}
                displayMode
              />
            </div>

            <div className="text-sm text-gray-300 font-serif">
              <MathTex
                math={`\\text{Power Output } P_{\\text{out}} = V \\times I = (${vOp.toFixed(2)}\\text{V})(${iOp.toFixed(2)}\\text{A}) = ${powerOutputMw.toFixed(0)}\\text{ mW}`}
                displayMode
              />
            </div>
          </div>
        </div>

        {/* Sliders for Irradiance & Load Resistance */}
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-40 flex items-center justify-between shrink-0">
              <span className="font-serif italic font-bold text-gray-200">Sunlight (W/m²)</span>
              <span className="font-mono text-sm text-yellow-400 font-bold">{irradiance} W/m²</span>
            </div>
            <input
              type="range"
              min="0"
              max="1200"
              step="20"
              value={irradiance}
              onChange={(e) => setIrradiance(parseFloat(e.target.value))}
              className="custom-slider"
            />
          </div>

          <div className="flex items-center gap-4">
            <div className="w-40 flex items-center justify-between shrink-0">
              <span className="font-serif italic font-bold text-gray-200">Load R (Resistance)</span>
              <span className="font-mono text-xs text-blue-400 font-semibold">{loadResistor} Ω</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="50"
              step="0.5"
              value={loadResistor}
              onChange={(e) => setLoadResistor(parseFloat(e.target.value))}
              className="custom-slider"
            />
          </div>
        </div>
      </div>

      {/* Right Panel: 4th Quadrant Solar Cell I-V Characteristic Curve */}
      <div className="bg-[#202124] rounded-2xl p-6 sm:p-8 border border-white/5 shadow-2xl flex flex-col justify-between">
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-2">
            <Award size={14} className="text-yellow-400" />
            4th Quadrant Solar Power Curve & Efficiency
          </h4>

          <div className="w-full h-[280px] bg-[#18191c] rounded-xl border border-white/5 p-4 flex items-center justify-center">
            <svg viewBox="0 0 440 240" className="w-full h-full">
              {/* Grid axes */}
              <line x1="50" y1="40" x2="380" y2="40" stroke="#475569" strokeWidth="2" />
              <text x="385" y="45" fill="#94a3b8" fontSize="10">V (V)</text>

              <line x1="50" y1="40" x2="50" y2="210" stroke="#475569" strokeWidth="2" />
              <text x="15" y="215" fill="#94a3b8" fontSize="10">I (A)</text>

              {/* 4th Quadrant Illuminated I-V Curve */}
              {/* Curve runs from (0, Isc) to (Voc, 0) */}
              {(() => {
                const iscY = 40 + (isc / iscMax) * 150;
                const vocX = 50 + (voc / vocMax) * 300;

                return (
                  <g>
                    {/* Light Curve Path */}
                    <path
                      d={`M 50 ${iscY} L ${vocX - 40} ${iscY} Q ${vocX} ${iscY}, ${vocX} 40`}
                      fill="none"
                      stroke="#f59e0b"
                      strokeWidth="3.5"
                    />

                    {/* Operating Point */}
                    {(() => {
                      const opX = 50 + (vOp / vocMax) * 300;
                      const opY = 40 + (iOp / iscMax) * 150;

                      return (
                        <g>
                          {/* Maximum Power Box Area */}
                          <rect x="50" y="40" width={opX - 50} height={opY - 40} fill="#f59e0b" opacity="0.15" stroke="#f59e0b" strokeDasharray="3 3" />
                          <circle cx={opX} cy={opY} r="7" fill="#f59e0b" filter="drop-shadow(0 0 6px #f59e0b)" />
                          <circle cx={opX} cy={opY} r="3" fill="#ffffff" />
                        </g>
                      );
                    })()}
                  </g>
                );
              })()}
            </svg>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/5 text-center">
          <div className="bg-[#18191c] p-3 rounded-xl border border-white/5">
            <span className="text-[11px] text-gray-400 block uppercase">Short Circuit Isc</span>
            <span className="text-base font-bold text-yellow-400">{isc.toFixed(2)} A</span>
          </div>
          <div className="bg-[#18191c] p-3 rounded-xl border border-white/5">
            <span className="text-[11px] text-gray-400 block uppercase">Open Circuit Voc</span>
            <span className="text-base font-bold text-white">{voc.toFixed(2)} V</span>
          </div>
          <div className="bg-[#18191c] p-3 rounded-xl border border-white/5">
            <span className="text-[11px] text-gray-400 block uppercase">Efficiency η</span>
            <span className="text-base font-bold text-emerald-400">{efficiency.toFixed(1)} %</span>
          </div>
        </div>
      </div>
    </div>
  );
};
