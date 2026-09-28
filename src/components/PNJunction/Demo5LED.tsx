import React, { useState } from 'react';
import { MathTex } from '../MathTex';
import { Sparkles, Lightbulb } from 'lucide-react';

interface Material {
  name: string;
  eg: number; // Bandgap in eV
  colorName: string;
  hexColor: string;
  description: string;
}

const MATERIALS: Material[] = [
  { name: 'GaAs (Gallium Arsenide)', eg: 1.42, colorName: 'Infrared (IR)', hexColor: '#991b1b', description: 'Remote controls, optocouplers, night vision' },
  { name: 'AlGaAs (Red LED)', eg: 1.91, colorName: 'Bright Red (650 nm)', hexColor: '#ef4444', description: 'Indicators, brake lights, laser pointers' },
  { name: 'GaAsP (Yellow/Amber)', eg: 2.10, colorName: 'Amber Yellow (590 nm)', hexColor: '#f59e0b', description: 'Traffic signals, status indicators' },
  { name: 'GaP (Green LED)', eg: 2.26, colorName: 'Emerald Green (550 nm)', hexColor: '#10b981', description: 'Displays, signal lighting' },
  { name: 'InGaN (Royal Blue)', eg: 2.75, colorName: 'Vibrant Blue (450 nm)', hexColor: '#3b82f6', description: 'High-efficiency white LEDs, Blu-Ray' },
  { name: 'GaN (Ultra Violet)', eg: 3.40, colorName: 'UV Light (365 nm)', hexColor: '#a855f7', description: 'Sterilization, curing, blacklights' },
];

export const Demo5LED: React.FC = () => {
  const [selectedMat, setSelectedMat] = useState<Material>(MATERIALS[1]); // Default Red
  const [forwardCurrentMa, setForwardCurrentMa] = useState<number>(20); // 20 mA standard

  // Wavelength lambda = 1240 / Eg (nm)
  const wavelengthNm = 1240 / selectedMat.eg;
  const photonEnergyEv = selectedMat.eg;

  // Turn on threshold voltage Vf ~ Eg / q
  const turnOnVoltage = selectedMat.eg;

  // Luminance ratio based on current
  const brightness = Math.min(forwardCurrentMa / 30, 1);

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left Panel: Semiconductor Material Selector & Physics */}
      <div className="bg-[#202124] rounded-2xl p-6 sm:p-8 border border-white/5 shadow-2xl flex flex-col justify-between space-y-6">
        <div>
          <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
            <div className="flex items-center gap-2">
              <Sparkles size={18} className="text-pink-400" />
              <h3 className="text-lg font-bold text-white">LED Recombination & Bandgap Color</h3>
            </div>
            <span className="text-xs bg-pink-500/10 text-pink-400 border border-pink-500/20 px-2.5 py-1 rounded-full font-medium">
              Radiative Recombination
            </span>
          </div>

          {/* Planck-Einstein Formula Card */}
          <div className="space-y-3 my-4 bg-[#18191c]/70 rounded-xl p-4 border border-white/5 text-center">
            <div className="text-xl text-white font-serif">
              <MathTex math="E_{photon} = h\nu = \frac{hc}{\lambda} = E_g" displayMode />
            </div>

            <div className="text-base text-pink-300 font-serif">
              <MathTex
                math={`\\lambda = \\frac{1240}{${photonEnergyEv.toFixed(2)}\\text{ eV}} = ${wavelengthNm.toFixed(0)}\\text{ nm}`}
                displayMode
              />
            </div>

            <div className="text-sm text-gray-300 font-serif pt-1">
              <MathTex
                math={`\\text{Forward Threshold Voltage } V_f \\approx \\frac{E_g}{q} = ${turnOnVoltage.toFixed(2)}\\text{ V}`}
                displayMode
              />
            </div>
          </div>
        </div>

        {/* Semiconductor Material Selector Buttons */}
        <div className="space-y-3">
          <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">
            Select Semiconductor Material (Bandgap E_g):
          </label>
          <div className="grid grid-cols-2 gap-2">
            {MATERIALS.map((mat) => (
              <button
                key={mat.name}
                onClick={() => setSelectedMat(mat)}
                className={`p-2.5 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                  selectedMat.name === mat.name
                    ? 'bg-white/10 border-white/30 text-white shadow-lg'
                    : 'bg-[#18191c] border-white/5 text-gray-400 hover:text-gray-200'
                }`}
              >
                <div>
                  <div className="text-xs font-bold text-gray-200">{mat.name.split(' ')[0]}</div>
                  <div className="text-[11px] text-gray-400">{mat.colorName}</div>
                </div>
                <div
                  className="w-3.5 h-3.5 rounded-full border border-white/20"
                  style={{ backgroundColor: mat.hexColor }}
                />
              </button>
            ))}
          </div>

          {/* Current Slider */}
          <div className="flex items-center gap-4 pt-3">
            <div className="w-36 flex items-center justify-between shrink-0">
              <span className="font-serif italic font-bold text-gray-200">Forward Current</span>
              <span className="font-mono text-xs text-pink-400 font-bold">{forwardCurrentMa} mA</span>
            </div>
            <input
              type="range"
              min="1"
              max="40"
              value={forwardCurrentMa}
              onChange={(e) => setForwardCurrentMa(parseFloat(e.target.value))}
              className="custom-slider"
            />
          </div>
        </div>
      </div>

      {/* Right Panel: Animated LED Photon Emission & Visual Spectral Glow */}
      <div className="bg-[#202124] rounded-2xl p-6 sm:p-8 border border-white/5 shadow-2xl flex flex-col justify-between items-center text-center">
        <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400 self-start mb-2">
          Photon Emission & Spectral Output
        </h4>

        {/* Glowing LED Visual */}
        <div className="relative my-8 flex flex-col items-center justify-center">
          {/* Radial Glow Halo */}
          <div
            className="absolute w-56 h-56 rounded-full pointer-events-none transition-all duration-300"
            style={{
              background: `radial-gradient(circle, ${selectedMat.hexColor} 0%, transparent 70%)`,
              opacity: 0.3 + brightness * 0.6,
              transform: `scale(${0.8 + brightness * 0.4})`,
            }}
          />

          {/* LED Bulb Icon */}
          <div className="relative z-10">
            <Lightbulb
              size={120}
              style={{ color: selectedMat.hexColor, filter: `drop-shadow(0 0 30px ${selectedMat.hexColor})` }}
              className="transition-all duration-300"
            />
          </div>

          {/* Emitted Photon Wavelength Readout */}
          <div className="mt-4 font-mono text-sm">
            <span className="text-gray-400">Emitted Wavelength: </span>
            <span className="font-bold text-white" style={{ color: selectedMat.hexColor }}>
              {wavelengthNm.toFixed(0)} nm ({selectedMat.colorName})
            </span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="w-full grid grid-cols-3 gap-3 pt-4 border-t border-white/5 text-center">
          <div className="bg-[#18191c] p-3 rounded-xl border border-white/5">
            <span className="text-[11px] text-gray-400 block uppercase">Bandgap E_g</span>
            <span className="text-base font-bold text-white">{selectedMat.eg.toFixed(2)} eV</span>
          </div>
          <div className="bg-[#18191c] p-3 rounded-xl border border-white/5">
            <span className="text-[11px] text-gray-400 block uppercase">Forward Vf</span>
            <span className="text-base font-bold text-pink-400">~{turnOnVoltage.toFixed(2)} V</span>
          </div>
          <div className="bg-[#18191c] p-3 rounded-xl border border-white/5">
            <span className="text-[11px] text-gray-400 block uppercase">Photon Wavelength</span>
            <span className="text-base font-bold" style={{ color: selectedMat.hexColor }}>
              {wavelengthNm.toFixed(0)} nm
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
