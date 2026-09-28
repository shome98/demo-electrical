import React, { useState } from 'react';
import { X, Copy, Download, Check, FileText } from 'lucide-react';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  voltage: number;
  resistance: number;
  current: number;
  power: number;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  voltage,
  resistance,
  current,
  power,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const latexCode = `\\begin{equation*}\n  P = VI = (${voltage.toFixed(1)}\\text{ V})(${current.toFixed(2)}\\text{ A}) = ${power.toFixed(2)}\\text{ W}\n\\end{equation*}\n\\begin{equation*}\n  P = \\frac{V^2}{R} = \\frac{(${voltage.toFixed(1)}\\text{ V})^2}{${resistance.toFixed(1)}\\ \\Omega} = ${power.toFixed(2)}\\text{ W}\n\\end{equation*}`;

  const copyLatex = () => {
    navigator.clipboard.writeText(latexCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadCSV = () => {
    const csvContent = `Parameter,Symbol,Value,Unit\nVoltage,V,${voltage.toFixed(2)},V\nResistance,R,${resistance.toFixed(2)},Ohm\nCurrent,I,${current.toFixed(4)},A\nPower,P,${power.toFixed(4)},W\nTimestamp,,${new Date().toISOString()},\n`;
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `electrasim_export_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-[#202124] border border-white/10 rounded-2xl w-full max-w-lg p-6 shadow-2xl space-y-6 relative">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <FileText size={20} className="text-blue-400" />
            <h3 className="text-lg font-bold text-white">Export Circuit Summary</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Summary Table */}
        <div className="grid grid-cols-2 gap-3 text-sm bg-[#18191c] p-4 rounded-xl border border-white/5">
          <div>
            <span className="text-gray-400 text-xs uppercase block">Voltage (V)</span>
            <span className="font-mono text-white font-bold text-base">{voltage.toFixed(1)} V</span>
          </div>
          <div>
            <span className="text-gray-400 text-xs uppercase block">Resistance (R)</span>
            <span className="font-mono text-white font-bold text-base">{resistance.toFixed(1)} Ω</span>
          </div>
          <div>
            <span className="text-gray-400 text-xs uppercase block">Current (I)</span>
            <span className="font-mono text-blue-400 font-bold text-base">{current.toFixed(2)} A</span>
          </div>
          <div>
            <span className="text-gray-400 text-xs uppercase block">Power (P)</span>
            <span className="font-mono text-amber-400 font-bold text-base">{power.toFixed(2)} W</span>
          </div>
        </div>

        {/* LaTeX Code Box */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-gray-300">
            <span>LaTeX Math Equations</span>
            <button
              onClick={copyLatex}
              className="flex items-center gap-1 text-blue-400 hover:text-blue-300 transition-colors"
            >
              {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
              <span>{copied ? 'Copied!' : 'Copy LaTeX'}</span>
            </button>
          </div>
          <pre className="bg-[#18191c] text-blue-200 font-mono text-xs p-3.5 rounded-xl border border-white/5 overflow-x-auto selection:bg-blue-600">
            {latexCode}
          </pre>
        </div>

        {/* Download Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-400 hover:text-white bg-[#2c2d33] transition-all"
          >
            Cancel
          </button>
          <button
            onClick={downloadCSV}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/30 transition-all active:scale-95"
          >
            <Download size={14} />
            <span>Download CSV Report</span>
          </button>
        </div>
      </div>
    </div>
  );
};
