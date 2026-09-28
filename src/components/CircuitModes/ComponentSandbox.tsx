import React, { useState } from 'react';
import { Cpu, Lightbulb, RefreshCw, Zap, ShieldAlert } from 'lucide-react';
import { MathTex } from '../MathTex';

export const ComponentSandbox: React.FC = () => {
  const [voltage, setVoltage] = useState<number>(12);
  const [loadResistance, setLoadResistance] = useState<number>(6);
  const [fuseRating, setFuseRating] = useState<number>(3); // 3 Amps max
  const [isFuseTripped, setIsFuseTripped] = useState<boolean>(false);

  // Calculations
  const rawCurrent = loadResistance > 0 ? voltage / loadResistance : 0;
  const current = isFuseTripped ? 0 : rawCurrent;
  const power = voltage * current;

  // Auto trip fuse if raw current exceeds fuse rating
  const handleVoltageChange = (newV: number) => {
    setVoltage(newV);
    if (newV / loadResistance > fuseRating) {
      setIsFuseTripped(true);
    }
  };

  const handleResistanceChange = (newR: number) => {
    setLoadResistance(newR);
    if (voltage / newR > fuseRating) {
      setIsFuseTripped(true);
    }
  };

  const resetFuse = () => {
    setIsFuseTripped(false);
  };

  // Bulb brightness calculation (0 to 1)
  const maxBulbPower = 40; // Watts
  const bulbGlowRatio = Math.min(power / maxBulbPower, 1);
  const isBulbOverheated = power > maxBulbPower && !isFuseTripped;

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Control Panel */}
      <div className="bg-[#202124] rounded-2xl p-6 sm:p-8 border border-white/5 shadow-2xl flex flex-col justify-between space-y-6">
        <div>
          <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
            <div className="flex items-center gap-2">
              <Cpu size={18} className="text-emerald-400" />
              <h2 className="text-lg font-bold text-white">Component Load & Fuse Protection Sandbox</h2>
            </div>
            
            {isFuseTripped && (
              <button
                onClick={resetFuse}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold hover:bg-amber-500/30 transition-all cursor-pointer"
              >
                <RefreshCw size={12} /> Reset Fuse
              </button>
            )}
          </div>

          {/* Alert Status */}
          {isFuseTripped ? (
            <div className="bg-red-500/15 border border-red-500/30 rounded-xl p-4 flex items-center gap-3 text-red-300 mb-4 animate-pulse">
              <ShieldAlert size={24} className="shrink-0 text-red-400" />
              <div>
                <h4 className="font-bold text-sm">FUSE TRIPPED! (Circuit Broken)</h4>
                <p className="text-xs text-red-300/80">
                  Current ({rawCurrent.toFixed(2)}A) exceeded safety limit ({fuseRating}A). Lower voltage or increase load resistance to reset.
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 flex items-center justify-between text-emerald-300 mb-4">
              <div className="flex items-center gap-2">
                <Zap size={18} className="text-emerald-400" />
                <span className="text-xs font-semibold">Circuit Operating Normally</span>
              </div>
              <span className="text-xs font-mono font-bold">
                {current.toFixed(2)}A / {fuseRating}A Max
              </span>
            </div>
          )}

          {/* Formulas */}
          <div className="text-center space-y-2 py-3 bg-[#18191c]/60 rounded-xl border border-white/5">
            <div className="text-lg text-white font-serif">
              <MathTex math={`P_{\\text{load}} = V \\times I = ${voltage}\\text{ V} \\times ${current.toFixed(2)}\\text{ A} = ${power.toFixed(2)}\\text{ W}`} displayMode />
            </div>
          </div>
        </div>

        {/* Sliders */}
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-32 flex items-center justify-between shrink-0">
              <span className="font-serif italic font-bold text-gray-200">DC Voltage</span>
              <span className="font-mono text-sm text-emerald-400 font-semibold">{voltage} V</span>
            </div>
            <input
              type="range"
              min="1"
              max="48"
              value={voltage}
              onChange={(e) => handleVoltageChange(parseFloat(e.target.value))}
              className="custom-slider"
            />
          </div>

          <div className="flex items-center gap-4">
            <div className="w-32 flex items-center justify-between shrink-0">
              <span className="font-serif italic font-bold text-gray-200">Load R (Bulb)</span>
              <span className="font-mono text-sm text-gray-300">{loadResistance} Ω</span>
            </div>
            <input
              type="range"
              min="1"
              max="50"
              value={loadResistance}
              onChange={(e) => handleResistanceChange(parseFloat(e.target.value))}
              className="custom-slider"
            />
          </div>

          <div className="flex items-center gap-4">
            <div className="w-32 flex items-center justify-between shrink-0">
              <span className="font-serif italic font-bold text-gray-200">Fuse Limit</span>
              <span className="font-mono text-sm text-amber-400 font-semibold">{fuseRating} A</span>
            </div>
            <input
              type="range"
              min="1"
              max="15"
              value={fuseRating}
              onChange={(e) => setFuseRating(parseFloat(e.target.value))}
              className="custom-slider"
            />
          </div>
        </div>
      </div>

      {/* Interactive Visualization */}
      <div className="bg-[#202124] rounded-2xl p-6 sm:p-8 border border-white/5 shadow-2xl flex flex-col justify-between items-center text-center">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 self-start mb-2">
          Incandescent Load & Filament Luminance
        </h3>

        {/* Lightbulb Visual */}
        <div className="relative my-6 flex flex-col items-center justify-center">
          {/* Bulb Glow Background */}
          {!isFuseTripped && power > 0 && (
            <div
              className="absolute w-48 h-48 rounded-full pointer-events-none transition-all duration-300"
              style={{
                background: `radial-gradient(circle, rgba(253, 224, 71, ${bulbGlowRatio * 0.8}) 0%, rgba(245, 158, 11, ${bulbGlowRatio * 0.3}) 50%, transparent 70%)`,
                transform: `scale(${0.8 + bulbGlowRatio * 0.6})`,
              }}
            />
          )}

          {/* Lightbulb Icon */}
          <div className="relative z-10 transition-transform duration-200">
            <Lightbulb
              size={120}
              className={`transition-colors duration-300 ${
                isFuseTripped
                  ? 'text-gray-600'
                  : power > 0
                  ? 'text-yellow-300 drop-shadow-[0_0_25px_rgba(234,179,8,0.8)]'
                  : 'text-gray-500'
              }`}
            />
          </div>

          <div className="mt-4 font-mono text-sm">
            <span className="text-gray-400">Filament Power: </span>
            <span className={`font-bold ${isBulbOverheated ? 'text-red-400' : 'text-yellow-400'}`}>
              {power.toFixed(1)} W
            </span>
          </div>
        </div>

        {/* Meters Readout */}
        <div className="w-full grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
          <div className="bg-[#18191c] p-3 rounded-xl border border-white/5 text-center">
            <span className="text-[11px] text-gray-400 block uppercase">Voltmeter Readout</span>
            <span className="text-lg font-bold text-blue-400">{voltage.toFixed(1)} V</span>
          </div>
          <div className="bg-[#18191c] p-3 rounded-xl border border-white/5 text-center">
            <span className="text-[11px] text-gray-400 block uppercase">Ammeter Readout</span>
            <span className={`text-lg font-bold ${isFuseTripped ? 'text-red-400' : 'text-emerald-400'}`}>
              {current.toFixed(2)} A
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
