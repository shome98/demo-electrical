import React, { useState } from 'react';
import { MathTex } from '../MathTex';
import { Layers, Zap } from 'lucide-react';

export const SeriesParallelCalculator: React.FC = () => {
  const [networkType, setNetworkType] = useState<'series' | 'parallel'>('series');
  const [voltage, setVoltage] = useState<number>(24);
  const [r1, setR1] = useState<number>(10);
  const [r2, setR2] = useState<number>(20);
  const [r3, setR3] = useState<number>(30);

  // Calculations
  const rTotalSeries = r1 + r2 + r3;
  const rTotalParallel = 1 / ((1 / (r1 || 1)) + (1 / (r2 || 1)) + (1 / (r3 || 1)));

  const rTotal = networkType === 'series' ? rTotalSeries : rTotalParallel;
  const iTotal = rTotal > 0 ? voltage / rTotal : 0;
  const pTotal = voltage * iTotal;

  // Individual component values
  const v1 = networkType === 'series' ? iTotal * r1 : voltage;
  const v2 = networkType === 'series' ? iTotal * r2 : voltage;
  const v3 = networkType === 'series' ? iTotal * r3 : voltage;

  const i1 = networkType === 'series' ? iTotal : (r1 > 0 ? voltage / r1 : 0);
  const i2 = networkType === 'series' ? iTotal : (r2 > 0 ? voltage / r2 : 0);
  const i3 = networkType === 'series' ? iTotal : (r3 > 0 ? voltage / r3 : 0);

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left Panel - Calculations & Sliders */}
      <div className="bg-[#202124] rounded-2xl p-6 sm:p-8 border border-white/5 shadow-2xl flex flex-col justify-between space-y-6">
        <div>
          {/* Header & Network Toggle */}
          <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
            <div className="flex items-center gap-2">
              <Layers size={18} className="text-blue-400" />
              <h2 className="text-lg font-bold text-white">Resistor Network Analysis</h2>
            </div>

            <div className="flex bg-[#18191c] p-1 rounded-xl border border-white/10">
              <button
                onClick={() => setNetworkType('series')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  networkType === 'series'
                    ? 'bg-blue-600 text-white shadow'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                Series Circuit
              </button>
              <button
                onClick={() => setNetworkType('parallel')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  networkType === 'parallel'
                    ? 'bg-blue-600 text-white shadow'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                Parallel Circuit
              </button>
            </div>
          </div>

          {/* Formulas Display */}
          <div className="text-center space-y-4 my-4 py-2 bg-[#18191c]/60 rounded-xl p-4 border border-white/5">
            <div className="text-xl text-white font-serif">
              {networkType === 'series' ? (
                <MathTex math="R_{\text{eq}} = R_1 + R_2 + R_3" displayMode />
              ) : (
                <MathTex math="\frac{1}{R_{\text{eq}}} = \frac{1}{R_1} + \frac{1}{R_2} + \frac{1}{R_3}" displayMode />
              )}
            </div>

            <div className="text-base text-blue-300 font-serif">
              {networkType === 'series' ? (
                <MathTex
                  math={`R_{\\text{eq}} = ${r1}\\Omega + ${r2}\\Omega + ${r3}\\Omega = ${rTotal.toFixed(2)}\\ \\Omega`}
                  displayMode
                />
              ) : (
                <MathTex
                  math={`R_{\\text{eq}} = \\left(\\frac{1}{${r1}} + \\frac{1}{${r2}} + \\frac{1}{${r3}}\\right)^{-1} = ${rTotal.toFixed(2)}\\ \\Omega`}
                  displayMode
                />
              )}
            </div>

            <div className="text-sm text-gray-300 font-serif pt-1">
              <MathTex
                math={`I_{\\text{total}} = \\frac{V}{R_{\\text{eq}}} = \\frac{${voltage}\\text{ V}}{${rTotal.toFixed(2)}\\ \\Omega} = ${iTotal.toFixed(2)}\\text{ A}`}
                displayMode
              />
            </div>
          </div>
        </div>

        {/* Sliders for V, R1, R2, R3 */}
        <div className="space-y-4">
          {/* Voltage Slider */}
          <div className="flex items-center gap-4">
            <div className="w-28 flex items-center justify-between shrink-0">
              <span className="font-serif italic font-bold text-gray-200">V Source</span>
              <span className="font-mono text-sm text-blue-400 font-semibold">{voltage} V</span>
            </div>
            <input
              type="range"
              min="1"
              max="100"
              value={voltage}
              onChange={(e) => setVoltage(parseFloat(e.target.value))}
              className="custom-slider"
            />
          </div>

          {/* R1 Slider */}
          <div className="flex items-center gap-4">
            <div className="w-28 flex items-center justify-between shrink-0">
              <span className="font-serif italic font-bold text-gray-200">R₁</span>
              <span className="font-mono text-sm text-gray-300">{r1} Ω</span>
            </div>
            <input
              type="range"
              min="1"
              max="100"
              value={r1}
              onChange={(e) => setR1(parseFloat(e.target.value))}
              className="custom-slider"
            />
          </div>

          {/* R2 Slider */}
          <div className="flex items-center gap-4">
            <div className="w-28 flex items-center justify-between shrink-0">
              <span className="font-serif italic font-bold text-gray-200">R₂</span>
              <span className="font-mono text-sm text-gray-300">{r2} Ω</span>
            </div>
            <input
              type="range"
              min="1"
              max="100"
              value={r2}
              onChange={(e) => setR2(parseFloat(e.target.value))}
              className="custom-slider"
            />
          </div>

          {/* R3 Slider */}
          <div className="flex items-center gap-4">
            <div className="w-28 flex items-center justify-between shrink-0">
              <span className="font-serif italic font-bold text-gray-200">R₃</span>
              <span className="font-mono text-sm text-gray-300">{r3} Ω</span>
            </div>
            <input
              type="range"
              min="1"
              max="100"
              value={r3}
              onChange={(e) => setR3(parseFloat(e.target.value))}
              className="custom-slider"
            />
          </div>
        </div>
      </div>

      {/* Right Panel - Dynamic Visual Network Schematic */}
      <div className="bg-[#202124] rounded-2xl p-6 sm:p-8 border border-white/5 shadow-2xl flex flex-col justify-between">
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4 flex items-center gap-2">
            <Zap size={14} className="text-amber-400" />
            Schematic Topology & Branch Measurements
          </h3>

          <div className="w-full h-[280px] bg-[#18191c] rounded-xl border border-white/5 flex items-center justify-center p-4">
            <svg viewBox="0 0 500 240" className="w-full h-full">
              {/* Outer Loop Wires */}
              <rect x="60" y="40" width="380" height="160" fill="none" stroke="#6b7280" strokeWidth="2.5" rx="6" />

              {/* Battery on left */}
              <g transform="translate(60, 120)">
                <circle cx="0" cy="0" r="14" fill="#202124" />
                <line x1="-12" y1="-8" x2="12" y2="-8" stroke="#ffffff" strokeWidth="3" />
                <line x1="-6" y1="8" x2="6" y2="8" stroke="#ffffff" strokeWidth="2" />
                <text x="-24" y="4" fill="#60a5fa" fontSize="11" fontWeight="bold">{voltage}V</text>
              </g>

              {networkType === 'series' ? (
                /* SERIES TOPOLOGY (3 Resistors along top wire) */
                <g>
                  {/* R1 */}
                  <g transform="translate(140, 40)">
                    <rect x="-20" y="-12" width="40" height="24" fill="#2d2e34" stroke="#60a5fa" strokeWidth="2" rx="4" />
                    <text x="0" y="4" fill="#ffffff" fontSize="11" textAnchor="middle" fontWeight="bold">R₁ ({r1}Ω)</text>
                    <text x="0" y="-18" fill="#9ca3af" fontSize="10" textAnchor="middle">{v1.toFixed(1)}V</text>
                  </g>
                  {/* R2 */}
                  <g transform="translate(250, 40)">
                    <rect x="-20" y="-12" width="40" height="24" fill="#2d2e34" stroke="#60a5fa" strokeWidth="2" rx="4" />
                    <text x="0" y="4" fill="#ffffff" fontSize="11" textAnchor="middle" fontWeight="bold">R₂ ({r2}Ω)</text>
                    <text x="0" y="-18" fill="#9ca3af" fontSize="10" textAnchor="middle">{v2.toFixed(1)}V</text>
                  </g>
                  {/* R3 */}
                  <g transform="translate(360, 40)">
                    <rect x="-20" y="-12" width="40" height="24" fill="#2d2e34" stroke="#60a5fa" strokeWidth="2" rx="4" />
                    <text x="0" y="4" fill="#ffffff" fontSize="11" textAnchor="middle" fontWeight="bold">R₃ ({r3}Ω)</text>
                    <text x="0" y="-18" fill="#9ca3af" fontSize="10" textAnchor="middle">{v3.toFixed(1)}V</text>
                  </g>
                </g>
              ) : (
                /* PARALLEL TOPOLOGY (3 Vertical Parallel Branches) */
                <g>
                  {/* Branch Wires */}
                  <line x1="180" y1="40" x2="180" y2="200" stroke="#6b7280" strokeWidth="2" />
                  <line x1="300" y1="40" x2="300" y2="200" stroke="#6b7280" strokeWidth="2" />
                  <line x1="420" y1="40" x2="420" y2="200" stroke="#6b7280" strokeWidth="2" />

                  {/* Branch 1 R1 */}
                  <g transform="translate(180, 120)">
                    <rect x="-12" y="-20" width="24" height="40" fill="#2d2e34" stroke="#60a5fa" strokeWidth="2" rx="4" />
                    <text x="0" y="-26" fill="#ffffff" fontSize="10" textAnchor="middle" fontWeight="bold">R₁ ({r1}Ω)</text>
                    <text x="0" y="34" fill="#9ca3af" fontSize="10" textAnchor="middle">{i1.toFixed(2)}A</text>
                  </g>
                  {/* Branch 2 R2 */}
                  <g transform="translate(300, 120)">
                    <rect x="-12" y="-20" width="24" height="40" fill="#2d2e34" stroke="#60a5fa" strokeWidth="2" rx="4" />
                    <text x="0" y="-26" fill="#ffffff" fontSize="10" textAnchor="middle" fontWeight="bold">R₂ ({r2}Ω)</text>
                    <text x="0" y="34" fill="#9ca3af" fontSize="10" textAnchor="middle">{i2.toFixed(2)}A</text>
                  </g>
                  {/* Branch 3 R3 */}
                  <g transform="translate(420, 120)">
                    <rect x="-12" y="-20" width="24" height="40" fill="#2d2e34" stroke="#60a5fa" strokeWidth="2" rx="4" />
                    <text x="0" y="-26" fill="#ffffff" fontSize="10" textAnchor="middle" fontWeight="bold">R₃ ({r3}Ω)</text>
                    <text x="0" y="34" fill="#9ca3af" fontSize="10" textAnchor="middle">{i3.toFixed(2)}A</text>
                  </g>
                </g>
              )}
            </svg>
          </div>
        </div>

        {/* Summary Breakdown Grid */}
        <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/5 text-center">
          <div className="bg-[#18191c] p-3 rounded-xl border border-white/5">
            <span className="text-[11px] text-gray-400 block uppercase">Total Req</span>
            <span className="text-base font-bold text-white">{rTotal.toFixed(2)} Ω</span>
          </div>
          <div className="bg-[#18191c] p-3 rounded-xl border border-white/5">
            <span className="text-[11px] text-gray-400 block uppercase">Total Current</span>
            <span className="text-base font-bold text-blue-400">{iTotal.toFixed(2)} A</span>
          </div>
          <div className="bg-[#18191c] p-3 rounded-xl border border-white/5">
            <span className="text-[11px] text-gray-400 block uppercase">Total Power</span>
            <span className="text-base font-bold text-amber-400">{pTotal.toFixed(1)} W</span>
          </div>
        </div>
      </div>
    </div>
  );
};
