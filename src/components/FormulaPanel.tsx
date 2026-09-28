import React, { useState } from 'react';
import { Undo2, Copy, Check, Sliders } from 'lucide-react';
import { MathTex } from './MathTex';

interface FormulaPanelProps {
  voltage: number;
  resistance: number;
  onVoltageChange: (v: number) => void;
  onResistanceChange: (r: number) => void;
  onReset: () => void;
}

export const FormulaPanel: React.FC<FormulaPanelProps> = ({
  voltage,
  resistance,
  onVoltageChange,
  onResistanceChange,
  onReset,
}) => {
  const [copied, setCopied] = useState(false);

  // Calculate live values
  const current = resistance > 0 ? voltage / resistance : 0;
  const power = voltage * current;

  // Format strings safely
  const vStr = voltage.toFixed(1);
  const rStr = resistance.toFixed(1);
  const iStr = current.toFixed(2);
  const pStr = power.toFixed(2);

  // Dynamic qualitative explanation string
  const getDynamicInsight = () => {
    if (resistance >= 50) {
      return `At fixed V (${vStr} V), high resistance (${rStr} Ω) limits current I to ${iStr} A and minimizes power loss.`;
    }
    if (resistance <= 2) {
      return `At fixed V (${vStr} V), ultra-low resistance causes high current spikes (${iStr} A) and rapid thermal power dissipation!`;
    }
    if (voltage >= 50) {
      return `High voltage source (${vStr} V) drives significant current through ${rStr} Ω, scaling power output quadratically (P ∝ V²).`;
    }
    return `At fixed V, higher R lowers I and P`;
  };

  // Copy LaTeX code to clipboard
  const copyLatex = () => {
    const latexText = `P = VI = (${vStr}\\text{ V})(${iStr}\\text{ A}) = ${pStr}\\text{ W}\n` +
      `P = \\frac{V^2}{R} = \\frac{(${vStr}\\text{ V})^2}{${rStr}\\ \\Omega} = ${pStr}\\text{ W}`;
    navigator.clipboard.writeText(latexText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative w-full h-full bg-[#202124] rounded-2xl p-6 sm:p-8 flex flex-col justify-between text-gray-200 border border-white/5 shadow-2xl">
      {/* Top Utility Header (Undo & Copy Buttons matching exact reference) */}
      <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
          <Sliders size={14} className="text-blue-400" />
          <span>Formula & Controls</span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={onReset}
            className="p-2 rounded-lg bg-[#2c2d33] hover:bg-[#383940] text-gray-300 hover:text-white transition-all active:scale-90 cursor-pointer"
            title="Reset to default values (15.5 V, 12.5 Ω)"
          >
            <Undo2 size={18} />
          </button>

          <button
            onClick={copyLatex}
            className="p-2 rounded-lg bg-[#2c2d33] hover:bg-[#383940] text-gray-300 hover:text-white transition-all active:scale-90 relative cursor-pointer"
            title="Copy LaTeX formula equations"
          >
            {copied ? <Check size={18} className="text-green-400" /> : <Copy size={18} />}
          </button>
        </div>
      </div>

      {/* Main Formula Section (Centered LaTeX Display) */}
      <div className="flex-1 flex flex-col justify-center items-center my-4 space-y-5 text-center">
        {/* Main Title Formula */}
        <div className="text-3xl sm:text-4xl text-white font-serif tracking-wide py-1">
          <MathTex math="P = VI" displayMode />
        </div>

        {/* Dynamic Calculation Line 1: P = VI = (15.5 V)(1.24 A) = 19.22 W */}
        <div className="text-lg sm:text-xl text-gray-200 font-serif">
          <MathTex
            math={`P = VI = (${vStr}\\text{ V})(${iStr}\\text{ A}) = ${pStr}\\text{ W}`}
            displayMode
          />
        </div>

        {/* Dynamic Calculation Line 2: P = V^2 / R = (15.5 V)^2 / 12.5 Ω = 19.22 W */}
        <div className="text-lg sm:text-xl text-gray-200 font-serif">
          <MathTex
            math={`P = \\frac{V^2}{R} = \\frac{(${vStr}\\text{ V})^2}{${rStr}\\ \\Omega} = ${pStr}\\text{ W}`}
            displayMode
          />
        </div>

        {/* Dynamic Insight Sentence */}
        <div className="pt-2 pb-1 text-gray-300 font-serif text-base sm:text-lg italic opacity-95">
          {getDynamicInsight()}
        </div>
      </div>

      {/* Interactive Sliders Section matching the exact design */}
      <div className="space-y-5 pt-4 border-t border-white/5">
        {/* Voltage V Slider */}
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="w-24 sm:w-28 flex items-center justify-between shrink-0">
            <span className="font-serif italic text-2xl font-bold text-white">V</span>
            <span className="font-mono text-base font-semibold text-gray-200">{vStr} V</span>
          </div>

          <div className="flex-1 relative flex items-center">
            <input
              type="range"
              min="0.5"
              max="100"
              step="0.5"
              value={voltage}
              onChange={(e) => onVoltageChange(parseFloat(e.target.value))}
              className="custom-slider"
              aria-label="Voltage slider"
            />
          </div>
        </div>

        {/* Resistance R Slider */}
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="w-24 sm:w-28 flex items-center justify-between shrink-0">
            <span className="font-serif italic text-2xl font-bold text-white">R</span>
            <span className="font-mono text-base font-semibold text-gray-200">{rStr} Ω</span>
          </div>

          <div className="flex-1 relative flex items-center">
            <input
              type="range"
              min="0.5"
              max="100"
              step="0.5"
              value={resistance}
              onChange={(e) => onResistanceChange(parseFloat(e.target.value))}
              className="custom-slider"
              aria-label="Resistance slider"
            />
          </div>
        </div>

        {/* Quick Fine-Tuning Chips */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 text-xs text-gray-400">
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-medium text-gray-500 uppercase">Presets:</span>
            <button
              onClick={() => { onVoltageChange(15.5); onResistanceChange(12.5); }}
              className="px-2.5 py-1 rounded bg-[#2c2d33] hover:bg-blue-600/30 text-gray-300 hover:text-blue-300 transition-colors cursor-pointer"
            >
              Default (15.5V / 12.5Ω)
            </button>
            <button
              onClick={() => { onVoltageChange(12.0); onResistanceChange(4.0); }}
              className="px-2.5 py-1 rounded bg-[#2c2d33] hover:bg-blue-600/30 text-gray-300 hover:text-blue-300 transition-colors cursor-pointer"
            >
              12V Car Battery
            </button>
            <button
              onClick={() => { onVoltageChange(5.0); onResistanceChange(2.5); }}
              className="px-2.5 py-1 rounded bg-[#2c2d33] hover:bg-blue-600/30 text-gray-300 hover:text-blue-300 transition-colors cursor-pointer"
            >
              5V USB (2A)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
