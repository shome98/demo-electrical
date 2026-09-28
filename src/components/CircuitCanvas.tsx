import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, Zap, Flame } from 'lucide-react';

interface CircuitCanvasProps {
  voltage: number;      // V
  resistance: number;   // R in Ohms
  current: number;      // I = V / R
  power: number;        // P = V * I
  isCircuitOpen: boolean;
  onToggleCircuit: () => void;
  showElectronFlow?: boolean;
}

export const CircuitCanvas: React.FC<CircuitCanvasProps> = ({
  voltage,
  current,
  power,
  isCircuitOpen,
  onToggleCircuit,
  showElectronFlow = true,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const animFrameRef = useRef<number | null>(null);
  const dotOffsetRef = useRef<number>(0);
  const [dotOffset, setDotOffset] = useState(0);

  // Animate dots along wire loop
  useEffect(() => {
    if (!isPlaying || isCircuitOpen || current <= 0) return;

    let lastTime = performance.now();
    const animate = (time: number) => {
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      // Speed proportional to current (clamped for visual smoothness)
      const speed = Math.min(Math.max(current * 25, 5), 180);
      dotOffsetRef.current = (dotOffsetRef.current + speed * delta) % 400;
      setDotOffset(dotOffsetRef.current);

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isPlaying, isCircuitOpen, current]);

  // Determine heat level of resistor based on power
  const getResistorHeatColor = () => {
    if (isCircuitOpen || current === 0) return '#d1d5db'; // neutral light gray
    if (power > 250) return '#ef4444'; // extreme red
    if (power > 100) return '#f97316'; // orange
    if (power > 40) return '#eab308';  // warm yellow
    return '#d1d5db';
  };

  const resistorColor = getResistorHeatColor();
  const isOverheated = power > 100 && !isCircuitOpen;

  // Generate dots along top and bottom wires
  const topDots = [0, 24, 48, 72].map((spacing) => (160 + ((dotOffset + spacing) % 400)));
  const bottomDots = [0, 24, 48, 72].map((spacing) => (560 - ((dotOffset + spacing) % 400)));

  return (
    <div className="relative w-full h-full bg-[#202124] rounded-2xl p-6 flex flex-col justify-between select-none overflow-hidden border border-white/5 shadow-2xl">
      {/* Top Diagram Controls */}
      <div className="flex items-center justify-between z-10 text-xs text-gray-400 mb-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-1.5 bg-[#2b2c31] hover:bg-[#36373e] text-gray-200 px-3 py-1.5 rounded-lg border border-white/10 transition-all font-medium active:scale-95 cursor-pointer"
            title={isPlaying ? "Pause flow animation" : "Play flow animation"}
          >
            {isPlaying ? <Pause size={13} className="text-blue-400" /> : <Play size={13} className="text-green-400" />}
            <span>{isPlaying ? 'Pause Flow' : 'Resume Flow'}</span>
          </button>

          <button
            onClick={onToggleCircuit}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all font-medium active:scale-95 cursor-pointer ${
              isCircuitOpen
                ? 'bg-amber-500/10 border-amber-500/30 text-amber-400 hover:bg-amber-500/20'
                : 'bg-blue-500/10 border-blue-500/30 text-blue-400 hover:bg-blue-500/20'
            }`}
            title="Toggle switch state"
          >
            <Zap size={13} />
            <span>{isCircuitOpen ? 'Circuit Open (OFF)' : 'Circuit Closed (ON)'}</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          {isOverheated && (
            <span className="flex items-center gap-1 bg-red-500/20 text-red-400 border border-red-500/30 px-2.5 py-1 rounded-full text-[11px] font-semibold animate-pulse">
              <Flame size={12} /> High Thermal Dissipation ({power.toFixed(1)}W)
            </span>
          )}
        </div>
      </div>

      {/* Main SVG Schematic Container */}
      <div className="relative flex-1 flex items-center justify-center min-h-[340px]">
        <svg
          viewBox="0 0 720 380"
          className="w-full h-full max-h-[380px] overflow-visible"
        >
          <defs>
            {/* Blue glowing dot filter */}
            <filter id="glow-blue" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            
            {/* Heat glow filter */}
            <filter id="glow-heat" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>

            {/* Marker for current direction arrow */}
            <marker
              id="arrowhead-blue"
              markerWidth="10"
              markerHeight="7"
              refX="9"
              refY="3.5"
              orient="auto"
            >
              <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
            </marker>
          </defs>

          {/* MAIN CIRCUIT WIRES (LIGHT GRAY RECTANGULAR LOOP) */}
          {/* Top horizontal wire */}
          <line x1="140" y1="100" x2="570" y2="100" stroke="#a3a3a3" strokeWidth="3" strokeLinecap="round" />
          
          {/* Right vertical top section (to resistor) */}
          <line x1="570" y1="100" x2="570" y2="140" stroke="#a3a3a3" strokeWidth="3" strokeLinecap="round" />
          
          {/* Right vertical bottom section (from resistor) */}
          <line x1="570" y1="260" x2="570" y2="300" stroke="#a3a3a3" strokeWidth="3" strokeLinecap="round" />
          
          {/* Bottom horizontal wire */}
          <line x1="570" y1="300" x2="140" y2="300" stroke="#a3a3a3" strokeWidth="3" strokeLinecap="round" />
          
          {/* Left vertical bottom section (to battery) */}
          <line x1="140" y1="300" x2="140" y2="230" stroke="#a3a3a3" strokeWidth="3" strokeLinecap="round" />
          
          {/* Left vertical top section (from battery) */}
          <line x1="140" y1="170" x2="140" y2="100" stroke="#a3a3a3" strokeWidth="3" strokeLinecap="round" />

          {/* CURRENT ARROW & VALUE AT TOP WIRE */}
          <g transform="translate(0, 0)">
            {/* Arrow Line */}
            <line
              x1="380"
              y1="56"
              x2="480"
              y2="56"
              stroke="#3b82f6"
              strokeWidth="2.5"
              markerEnd="url(#arrowhead-blue)"
            />
            {/* Current Text Label: I = 1.24 A */}
            <text
              x="430"
              y="40"
              fill="#ffffff"
              fontSize="16"
              fontWeight="600"
              textAnchor="middle"
              fontFamily="system-ui, sans-serif"
            >
              {isCircuitOpen ? 'I = 0.00 A' : `I = ${current.toFixed(2)} A`}
            </text>
          </g>

          {/* ANIMATED ELECTRON / CHARGE DOTS ALONG TOP AND BOTTOM WIRES */}
          {isPlaying && !isCircuitOpen && current > 0 && showElectronFlow && (
            <>
              {/* Top Wire Moving Dots (Left to Right) */}
              {topDots.map((xPos, idx) => (
                <circle
                  key={`top-${idx}`}
                  cx={xPos}
                  cy="100"
                  r="3.5"
                  fill="#60a5fa"
                  filter="url(#glow-blue)"
                />
              ))}

              {/* Bottom Wire Moving Dots (Right to Left) */}
              {bottomDots.map((xPos, idx) => (
                <circle
                  key={`bot-${idx}`}
                  cx={xPos}
                  cy="300"
                  r="3.5"
                  fill="#60a5fa"
                  filter="url(#glow-blue)"
                />
              ))}
            </>
          )}

          {/* BATTERY DC POWER SOURCE (LEFT WIRE) */}
          <g transform="translate(140, 200)" className="cursor-pointer" onClick={onToggleCircuit}>
            {/* Top Plate (+) */}
            <line x1="-32" y1="-18" x2="32" y2="-18" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" />
            <text x="38" y="-14" fill="#e5e7eb" fontSize="15" fontWeight="500">+</text>

            {/* Bottom Plate (-) */}
            <line x1="-18" y1="12" x2="18" y2="12" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
            <text x="24" y="16" fill="#e5e7eb" fontSize="16" fontWeight="500">−</text>

            {/* Label V at bottom */}
            <text
              x="0"
              y="140"
              fill="#ffffff"
              fontSize="20"
              fontWeight="bold"
              fontStyle="italic"
              textAnchor="middle"
              fontFamily="Georgia, serif"
            >
              V
            </text>
          </g>

          {/* VOLTAGE DROP BRACKET & LABEL NEAR RESISTOR */}
          <g transform="translate(540, 200)">
            {/* Voltage drop text beside resistor e.g. 15.5 V */}
            <text
              x="-25"
              y="5"
              fill="#ffffff"
              fontSize="16"
              fontWeight="500"
              textAnchor="end"
              fontFamily="system-ui, sans-serif"
            >
              {voltage.toFixed(1)} V
            </text>

            {/* Top '+' indicator */}
            <text x="5" y="-62" fill="#d1d5db" fontSize="15" fontWeight="400">+</text>

            {/* Dashed vertical bracket line */}
            <line x1="12" y1="-50" x2="12" y2="55" stroke="#6b7280" strokeWidth="1.5" strokeDasharray="3 3" />

            {/* Bottom '-' indicator */}
            <text x="5" y="75" fill="#d1d5db" fontSize="16" fontWeight="400">−</text>
          </g>

          {/* RESISTOR (ZIG-ZAG PATH ON RIGHT WIRE) */}
          <g transform="translate(570, 140)">
            <path
              d="M 0 0 L 0 15 L -14 25 L 14 37.5 L -14 50 L 14 62.5 L -14 75 L 14 87.5 L -14 100 L 0 110 L 0 120"
              fill="none"
              stroke={resistorColor}
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-colors duration-300"
              filter={isOverheated ? 'url(#glow-heat)' : undefined}
            />

            {/* Label R below resistor */}
            <text
              x="0"
              y="200"
              fill="#ffffff"
              fontSize="20"
              fontWeight="bold"
              fontStyle="italic"
              textAnchor="middle"
              fontFamily="Georgia, serif"
            >
              R
            </text>
          </g>
        </svg>
      </div>

      {/* BOTTOM LEGEND matching the image: P power · V voltage · I current */}
      <div className="w-full text-center text-gray-300 font-medium text-sm pt-2 border-t border-white/5 flex items-center justify-center gap-2">
        <span className="text-white font-semibold">P</span> <span className="text-gray-400 font-normal">power</span>
        <span className="text-gray-500 font-bold mx-1">·</span>
        <span className="text-white font-semibold">V</span> <span className="text-gray-400 font-normal">voltage</span>
        <span className="text-gray-500 font-bold mx-1">·</span>
        <span className="text-white font-semibold">I</span> <span className="text-gray-400 font-normal">current</span>
      </div>
    </div>
  );
};
