import React, { useState } from 'react';
import { MathTex } from '../MathTex';
import { Cpu, Zap } from 'lucide-react';

type GateType = 'NOT' | 'AND' | 'OR' | 'NAND' | 'NOR' | 'XOR';

interface GateConfig {
  name: string;
  transistorCount: number;
  booleanExp: string;
  truthTable: { a: number; b?: number; out: number }[];
  description: string;
}

const GATES_DATA: Record<GateType, GateConfig> = {
  NOT: {
    name: 'NOT Gate (Inverter)',
    transistorCount: 1,
    booleanExp: 'Y = \\bar{A}',
    truthTable: [
      { a: 0, out: 1 },
      { a: 1, out: 0 },
    ],
    description: '1 Transistor pulling output LOW to ground when input A is HIGH.',
  },
  AND: {
    name: 'AND Gate',
    transistorCount: 2,
    booleanExp: 'Y = A \\cdot B',
    truthTable: [
      { a: 0, b: 0, out: 0 },
      { a: 0, b: 1, out: 0 },
      { a: 1, b: 0, out: 0 },
      { a: 1, b: 1, out: 1 },
    ],
    description: '2 Transistors in SERIES. Output goes HIGH only when BOTH Transistor A AND Transistor B are ON.',
  },
  OR: {
    name: 'OR Gate',
    transistorCount: 2,
    booleanExp: 'Y = A + B',
    truthTable: [
      { a: 0, b: 0, out: 0 },
      { a: 0, b: 1, out: 1 },
      { a: 1, b: 0, out: 1 },
      { a: 1, b: 1, out: 1 },
    ],
    description: '2 Transistors in PARALLEL. Output goes HIGH if Transistor A OR Transistor B is ON.',
  },
  NAND: {
    name: 'NAND Gate (Universal Gate)',
    transistorCount: 2,
    booleanExp: 'Y = \\overline{A \\cdot B}',
    truthTable: [
      { a: 0, b: 0, out: 1 },
      { a: 0, b: 1, out: 1 },
      { a: 1, b: 0, out: 1 },
      { a: 1, b: 1, out: 0 },
    ],
    description: 'Universal Gate! 2 Series Transistors pull output LOW only when BOTH inputs are HIGH.',
  },
  NOR: {
    name: 'NOR Gate (Universal Gate)',
    transistorCount: 2,
    booleanExp: 'Y = \\overline{A + B}',
    truthTable: [
      { a: 0, b: 0, out: 1 },
      { a: 0, b: 1, out: 0 },
      { a: 1, b: 0, out: 0 },
      { a: 1, b: 1, out: 0 },
    ],
    description: 'Universal Gate! 2 Parallel Transistors pull output LOW if EITHER input is HIGH.',
  },
  XOR: {
    name: 'XOR Gate (Exclusive OR)',
    transistorCount: 4,
    booleanExp: 'Y = A \\oplus B = A\\bar{B} + \\bar{A}B',
    truthTable: [
      { a: 0, b: 0, out: 0 },
      { a: 0, b: 1, out: 1 },
      { a: 1, b: 0, out: 1 },
      { a: 1, b: 1, out: 0 },
    ],
    description: 'Output is HIGH when inputs differ (A ≠ B). Fundamental building block for binary adders.',
  },
};

export const Demo5TransistorLogicGates: React.FC = () => {
  const [selectedGate, setSelectedGate] = useState<GateType>('NAND');
  const [inputA, setInputA] = useState<number>(1);
  const [inputB, setInputB] = useState<number>(0);

  const gate = GATES_DATA[selectedGate];

  // Evaluate output based on selected gate
  const getOutput = () => {
    switch (selectedGate) {
      case 'NOT': return inputA === 0 ? 1 : 0;
      case 'AND': return (inputA === 1 && inputB === 1) ? 1 : 0;
      case 'OR': return (inputA === 1 || inputB === 1) ? 1 : 0;
      case 'NAND': return !(inputA === 1 && inputB === 1) ? 1 : 0;
      case 'NOR': return !(inputA === 1 || inputB === 1) ? 1 : 0;
      case 'XOR': return (inputA !== inputB) ? 1 : 0;
    }
  };

  const outputVal = getOutput();

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left Panel: Logic Gate Selector & Truth Table */}
      <div className="bg-[#202124] rounded-2xl p-6 sm:p-8 border border-white/5 shadow-2xl flex flex-col justify-between space-y-6">
        <div>
          <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
            <div className="flex items-center gap-2">
              <Cpu size={18} className="text-emerald-400" />
              <h3 className="text-lg font-bold text-white">Transistor Logic Gates (RTL / CMOS)</h3>
            </div>
          </div>

          {/* Gate Selector Chips */}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5 mb-4">
            {(['NOT', 'AND', 'OR', 'NAND', 'NOR', 'XOR'] as GateType[]).map((g) => (
              <button
                key={g}
                onClick={() => setSelectedGate(g)}
                className={`py-2 px-2 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                  selectedGate === g
                    ? 'bg-emerald-600 border-emerald-500 text-white shadow-lg'
                    : 'bg-[#18191c] border-white/5 text-gray-400 hover:text-gray-200'
                }`}
              >
                {g}
              </button>
            ))}
          </div>

          {/* Expression & Description */}
          <div className="bg-[#18191c]/70 rounded-xl p-4 border border-white/5 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-white">{gate.name}</h4>
              <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                {gate.transistorCount} BJT Transistor{gate.transistorCount > 1 ? 's' : ''}
              </span>
            </div>

            <p className="text-xs text-gray-300 font-sans leading-relaxed">{gate.description}</p>

            <div className="pt-2 text-center border-t border-white/5">
              <div className="text-xl text-emerald-300 font-serif">
                <MathTex math={gate.booleanExp} displayMode />
              </div>
            </div>
          </div>
        </div>

        {/* Input Toggle Switches */}
        <div className="space-y-3 bg-[#18191c]/50 p-4 rounded-xl border border-white/5">
          <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">
            Interactive Logic Inputs:
          </label>
          <div className="flex items-center gap-4">
            {/* Input A */}
            <button
              onClick={() => setInputA(inputA === 1 ? 0 : 1)}
              className={`flex-1 py-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                inputA === 1 ? 'bg-blue-600 text-white border-blue-400 shadow' : 'bg-[#27282d] text-gray-400 border-white/5'
              }`}
            >
              Input A = {inputA} ({inputA === 1 ? 'HIGH 5V' : 'LOW 0V'})
            </button>

            {/* Input B (if applicable) */}
            {selectedGate !== 'NOT' && (
              <button
                onClick={() => setInputB(inputB === 1 ? 0 : 1)}
                className={`flex-1 py-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                  inputB === 1 ? 'bg-blue-600 text-white border-blue-400 shadow' : 'bg-[#27282d] text-gray-400 border-white/5'
                }`}
              >
                Input B = {inputB} ({inputB === 1 ? 'HIGH 5V' : 'LOW 0V'})
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Right Panel: Logic Output State & Transistor Schematic */}
      <div className="bg-[#202124] rounded-2xl p-6 sm:p-8 border border-white/5 shadow-2xl flex flex-col justify-between">
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-2">
            <Zap size={14} className="text-emerald-400" />
            Transistor Logic State & Output Readout
          </h4>

          <div className="w-full h-[280px] bg-[#18191c] rounded-xl border border-white/5 p-4 flex flex-col justify-between items-center text-center">
            {/* Output Indicator Bulb / Badge */}
            <div className="my-auto flex flex-col items-center justify-center">
              <div
                className={`w-24 h-24 rounded-full flex items-center justify-center text-3xl font-black transition-all duration-300 ${
                  outputVal === 1
                    ? 'bg-emerald-500 text-white shadow-[0_0_40px_rgba(16,185,129,0.8)] scale-110'
                    : 'bg-gray-800 text-gray-500 border border-white/10'
                }`}
              >
                {outputVal}
              </div>

              <div className="mt-3 font-mono text-sm font-bold">
                Output Y = <span className={outputVal === 1 ? 'text-emerald-400' : 'text-gray-500'}>
                  {outputVal === 1 ? 'LOGIC HIGH (5.0 V)' : 'LOGIC LOW (0.0 V)'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Truth Table Grid */}
        <div className="pt-4 border-t border-white/5">
          <label className="text-[11px] text-gray-400 uppercase tracking-wider block mb-2 font-semibold">
            {gate.name} Truth Table Matrix:
          </label>
          <div className="grid grid-cols-4 gap-1 text-xs text-center font-mono">
            <div className="bg-[#18191c] p-1.5 rounded text-gray-400 font-bold">A</div>
            {selectedGate !== 'NOT' && <div className="bg-[#18191c] p-1.5 rounded text-gray-400 font-bold">B</div>}
            <div className="bg-[#18191c] p-1.5 rounded text-gray-400 font-bold col-span-2">Output Y</div>

            {gate.truthTable.map((row, idx) => {
              const isCurrentRow = row.a === inputA && (selectedGate === 'NOT' || row.b === inputB);
              return (
                <React.Fragment key={idx}>
                  <div className={`p-1.5 rounded ${isCurrentRow ? 'bg-emerald-600 text-white font-bold' : 'bg-[#18191c] text-gray-300'}`}>
                    {row.a}
                  </div>
                  {selectedGate !== 'NOT' && (
                    <div className={`p-1.5 rounded ${isCurrentRow ? 'bg-emerald-600 text-white font-bold' : 'bg-[#18191c] text-gray-300'}`}>
                      {row.b}
                    </div>
                  )}
                  <div className={`p-1.5 rounded col-span-2 ${isCurrentRow ? 'bg-emerald-600 text-white font-bold' : 'bg-[#18191c] text-gray-300'}`}>
                    {row.out}
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
