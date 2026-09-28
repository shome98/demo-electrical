import React, { useState } from 'react';
import { MathTex } from '../MathTex';
import { Zap, Cpu, ToggleLeft } from 'lucide-react';

type OperationMode = 'switch' | 'amplifier' | 'current_source' | 'voltage_regulator' | 'diff_pair';

interface OpInfo {
  title: string;
  formula: string;
  description: string;
  badge: string;
}

const OP_DATA: Record<OperationMode, OpInfo> = {
  switch: {
    title: '1. Electronic Power Switch (Digital Driver)',
    formula: 'I_C = \\text{Load Current} \\quad V_{CE(\\text{sat})} \\approx 0.2\\text{V}',
    description: 'A tiny micro-controller logic pin signal (3.3V / 1mA) turns ON or OFF a heavy inductive motor, relay, or solenoid load drawing 2 Amperes.',
    badge: 'Digital ON/OFF',
  },
  amplifier: {
    title: '2. Linear Current & Signal Amplifier',
    formula: 'I_C = \\beta \\cdot I_B \\quad A_I = \\beta \\approx 100 - 300',
    description: 'Linearly magnifies weak microphone/sensor audio currents into strong signal levels capable of driving speaker coils.',
    badge: 'Linear Analog',
  },
  current_source: {
    title: '3. Constant Current Source',
    formula: 'I_{\\text{const}} = \\frac{V_B - V_{BE}}{R_E} \\quad (\\text{Independent of } R_L)',
    description: 'Delivers a precise, stable current regardless of fluctuations in load resistance or supply voltage variations.',
    badge: 'Current Regulation',
  },
  voltage_regulator: {
    title: '4. Pass Transistor Voltage Regulator',
    formula: 'V_{\\text{OUT}} = V_Z - V_{BE} = V_Z - 0.7\\text{V}',
    description: 'Uses a Zener diode voltage reference to provide a clean, steady regulated DC voltage rail under varying load currents.',
    badge: 'DC Power Supply',
  },
  diff_pair: {
    title: '5. Differential Pair (Long-Tailed Pair)',
    formula: 'V_{\\text{out}} = A_d (V_1 - V_2) + A_c V_{\\text{cm}}',
    description: 'The core input stage of operational amplifiers (Op-Amps). Amplifies difference between two signals while canceling common-mode noise.',
    badge: 'Op-Amp Input Stage',
  },
};

export const Demo2TransistorOperations: React.FC = () => {
  const [selectedOp, setSelectedOp] = useState<OperationMode>('switch');
  const [inputSignal, setInputSignal] = useState<number>(3.3); // Volts
  const [loadResistance, setLoadResistance] = useState<number>(10); // Ohms

  const op = OP_DATA[selectedOp];

  // Dynamic calculations based on mode
  const outputCurrentMa = selectedOp === 'switch'
    ? (inputSignal > 1.5 ? (12 / loadResistance) * 1000 : 0)
    : selectedOp === 'current_source'
    ? 250 // Const 250 mA
    : (inputSignal * 100) / (loadResistance || 1);

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left Panel: Operation Selector & Math */}
      <div className="bg-[#202124] rounded-2xl p-6 sm:p-8 border border-white/5 shadow-2xl flex flex-col justify-between space-y-6">
        <div>
          <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
            <div className="flex items-center gap-2">
              <ToggleLeft size={18} className="text-amber-400" />
              <h3 className="text-lg font-bold text-white">5 Fundamental Transistor Circuit Applications</h3>
            </div>
          </div>

          {/* 5 Mode Selector Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
            {(['switch', 'amplifier', 'current_source', 'voltage_regulator', 'diff_pair'] as OperationMode[]).map((mode) => (
              <button
                key={mode}
                onClick={() => setSelectedOp(mode)}
                className={`p-2.5 rounded-xl border text-xs font-semibold text-left transition-all cursor-pointer ${
                  selectedOp === mode
                    ? 'bg-blue-600 border-blue-500 text-white shadow-lg'
                    : 'bg-[#18191c] border-white/5 text-gray-400 hover:text-gray-200'
                }`}
              >
                {OP_DATA[mode].title.split('.')[1]}
              </button>
            ))}
          </div>

          {/* Description & Formula Card */}
          <div className="bg-[#18191c]/70 rounded-xl p-4 border border-white/5 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-white">{op.title}</h4>
              <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                {op.badge}
              </span>
            </div>

            <p className="text-xs text-gray-300 font-sans leading-relaxed">{op.description}</p>

            <div className="pt-2 text-center border-t border-white/5">
              <div className="text-base text-amber-300 font-serif">
                <MathTex math={op.formula} displayMode />
              </div>
            </div>
          </div>
        </div>

        {/* Sliders */}
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-36 flex items-center justify-between shrink-0">
              <span className="font-serif italic font-bold text-gray-200">Input Control V_in</span>
              <span className="font-mono text-xs text-blue-400 font-bold">{inputSignal.toFixed(1)} V</span>
            </div>
            <input
              type="range"
              min="0.0"
              max="5.0"
              step="0.1"
              value={inputSignal}
              onChange={(e) => setInputSignal(parseFloat(e.target.value))}
              className="custom-slider"
            />
          </div>

          <div className="flex items-center gap-4">
            <div className="w-36 flex items-center justify-between shrink-0">
              <span className="font-serif italic font-bold text-gray-200">Load R_L</span>
              <span className="font-mono text-xs text-gray-300">{loadResistance} Ω</span>
            </div>
            <input
              type="range"
              min="1"
              max="100"
              value={loadResistance}
              onChange={(e) => setLoadResistance(parseFloat(e.target.value))}
              className="custom-slider"
            />
          </div>
        </div>
      </div>

      {/* Right Panel: Circuit Application Visualizer */}
      <div className="bg-[#202124] rounded-2xl p-6 sm:p-8 border border-white/5 shadow-2xl flex flex-col justify-between">
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-2">
            <Zap size={14} className="text-amber-400" />
            Circuit Response & Output State
          </h4>

          <div className="w-full h-[280px] bg-[#18191c] rounded-xl border border-white/5 p-4 flex flex-col justify-between items-center text-center">
            <svg viewBox="0 0 440 220" className="w-full h-full">
              {/* Transistor Switch Schematic */}
              <g transform="translate(180, 110)">
                <circle cx="0" cy="0" r="35" fill="#202124" stroke="#60a5fa" strokeWidth="2" />
                <text x="0" y="4" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">
                  {selectedOp.toUpperCase()}
                </text>
              </g>

              {/* Input Arrow */}
              <line x1="50" y1="110" x2="140" y2="110" stroke="#3b82f6" strokeWidth="3" markerEnd="url(#arrowhead-blue)" />
              <text x="95" y="95" fill="#60a5fa" fontSize="11" fontWeight="bold" textAnchor="middle">
                V_IN = {inputSignal.toFixed(1)}V
              </text>

              {/* Output Arrow */}
              <line x1="220" y1="110" x2="380" y2="110" stroke="#f59e0b" strokeWidth="3" markerEnd="url(#arrowhead-blue)" />
              <text x="300" y="95" fill="#fbbf24" fontSize="11" fontWeight="bold" textAnchor="middle">
                I_LOAD = {outputCurrentMa.toFixed(0)} mA
              </text>
            </svg>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/5 text-center">
          <div className="bg-[#18191c] p-3 rounded-xl border border-white/5">
            <span className="text-[11px] text-gray-400 block uppercase">Mode Selected</span>
            <span className="text-xs font-bold text-white capitalize">{selectedOp.replace('_', ' ')}</span>
          </div>
          <div className="bg-[#18191c] p-3 rounded-xl border border-white/5">
            <span className="text-[11px] text-gray-400 block uppercase">Control Input</span>
            <span className="text-sm font-bold text-blue-400">{inputSignal.toFixed(1)} V</span>
          </div>
          <div className="bg-[#18191c] p-3 rounded-xl border border-white/5">
            <span className="text-[11px] text-gray-400 block uppercase">Output Load Current</span>
            <span className="text-sm font-bold text-amber-400 font-mono">{outputCurrentMa.toFixed(0)} mA</span>
          </div>
        </div>
      </div>
    </div>
  );
};
