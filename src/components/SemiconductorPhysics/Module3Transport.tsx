import React, { useState } from 'react';
import { MathTex } from '../MathTex';
import { Navigation, Zap } from 'lucide-react';

export const Module3Transport: React.FC = () => {
  const [eField, setEField] = useState<number>(50); // V/cm (0 to 200)
  const [transportMode, setTransportMode] = useState<'drift' | 'diffusion'>('drift');

  // Electron & Hole Mobilities in Silicon
  const muN = 1350; // cm^2 / V*s
  const muP = 480;  // cm^2 / V*s

  // Drift Velocities vd = mu * E (cm/s)
  const vdN = muN * eField;

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left Panel: Physics & Transport Equations */}
      <div className="bg-[#202124] rounded-2xl p-6 sm:p-8 border border-white/5 shadow-2xl flex flex-col justify-between space-y-6">
        <div>
          <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
            <div className="flex items-center gap-2">
              <Navigation size={18} className="text-blue-400" />
              <h3 className="text-lg font-bold text-white">Electron & Hole Transport Mechanics</h3>
            </div>

            <div className="flex bg-[#18191c] p-1 rounded-xl border border-white/10">
              <button
                onClick={() => setTransportMode('drift')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  transportMode === 'drift' ? 'bg-blue-600 text-white shadow' : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                Electric Drift
              </button>
              <button
                onClick={() => setTransportMode('diffusion')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  transportMode === 'diffusion' ? 'bg-blue-600 text-white shadow' : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                Diffusion Gradient
              </button>
            </div>
          </div>

          {/* Formulas */}
          <div className="space-y-3 my-4 bg-[#18191c]/70 rounded-xl p-4 border border-white/5 text-center">
            {transportMode === 'drift' ? (
              <>
                <div className="text-xl text-white font-serif">
                  <MathTex math="v_d = \mu E \quad \Rightarrow \quad J_{\text{drift}} = q(n\mu_n + p\mu_p)E" displayMode />
                </div>
                <div className="text-base text-blue-300 font-serif">
                  <MathTex
                    math={`v_{dn} = (${muN}\\text{ cm}^2/\\text{Vs})(${eField}\\text{ V/cm}) = ${vdN.toExponential(2)}\\text{ cm/s}`}
                    displayMode
                  />
                </div>
              </>
            ) : (
              <>
                <div className="text-xl text-white font-serif">
                  <MathTex math="J_{\text{diff}} = q D_n \frac{dn}{dx} - q D_p \frac{dp}{dx}" displayMode />
                </div>
                <div className="text-xs text-gray-300 font-sans leading-relaxed pt-1">
                  Carriers diffuse randomly from high concentration to low concentration regions.
                  <div className="mt-1">
                    <MathTex math="\text{Einstein Relation: } \frac{D}{\mu} = \frac{k_B T}{q}" displayMode />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Electric Field Control */}
        {transportMode === 'drift' && (
          <div className="space-y-3">
            <div className="flex items-center gap-4">
              <div className="w-40 flex items-center justify-between shrink-0">
                <span className="font-serif italic font-bold text-gray-200">Electric Field (E)</span>
                <span className="font-mono text-xs text-blue-400 font-bold">{eField} V/cm</span>
              </div>
              <input
                type="range"
                min="0"
                max="200"
                step="5"
                value={eField}
                onChange={(e) => setEField(parseFloat(e.target.value))}
                className="custom-slider"
              />
            </div>
          </div>
        )}
      </div>

      {/* Right Panel: Animated Carrier Motion Diagram */}
      <div className="bg-[#202124] rounded-2xl p-6 sm:p-8 border border-white/5 shadow-2xl flex flex-col justify-between">
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-2">
            <Zap size={14} className="text-blue-400" />
            Conduction vs Valence Hole Hopping Motion
          </h4>

          <div className="w-full h-[280px] bg-[#18191c] rounded-xl border border-white/5 p-4 flex flex-col justify-between">
            <svg viewBox="0 0 440 240" className="w-full h-full">
              {/* Electric Field Arrow */}
              {transportMode === 'drift' && (
                <g>
                  <line x1="50" y1="30" x2="390" y2="30" stroke="#3b82f6" strokeWidth="2" />
                  <text x="220" y="24" fill="#60a5fa" fontSize="11" fontWeight="bold" textAnchor="middle">
                    Applied Electric Field E (Pointing Right)
                  </text>
                </g>
              )}

              {/* Electron Motion (Conduction Band) */}
              <g transform="translate(0, 70)">
                <rect x="40" y="0" width="360" height="55" fill="#1e293b" stroke="#3b82f6" strokeWidth="1.5" rx="6" />
                <text x="50" y="20" fill="#60a5fa" fontSize="10" fontWeight="bold">
                  Free Electrons (Move Left - opposite E-field)
                </text>

                {/* Free Electron Dots */}
                <circle cx="160" cy="35" r="6" fill="#3b82f6" />
                <text x="160" y="38" fill="#fff" fontSize="8" textAnchor="middle" fontWeight="bold">−</text>
                <circle cx="260" cy="35" r="6" fill="#3b82f6" />
                <text x="260" y="38" fill="#fff" fontSize="8" textAnchor="middle" fontWeight="bold">−</text>
              </g>

              {/* Hole Motion (Valence Band - Hopping) */}
              <g transform="translate(0, 150)">
                <rect x="40" y="0" width="360" height="65" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" rx="6" />
                <text x="50" y="20" fill="#34d399" fontSize="10" fontWeight="bold">
                  Hole Hopping (Positive charge moves Right - along E-field)
                </text>

                {/* Covalent Bond Lattice Dots */}
                {[100, 160, 220, 280, 340].map((xPos, idx) => (
                  <g key={idx}>
                    {idx === 2 ? (
                      /* Hole Vacancy */
                      <circle cx={xPos} cy="42" r="7" fill="#ef4444" stroke="#fff" strokeWidth="1.5" />
                    ) : (
                      /* Bound Valence Electron */
                      <circle cx={xPos} cy="42" r="5" fill="#34d399" />
                    )}
                  </g>
                ))}
              </g>
            </svg>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/5 text-center">
          <div className="bg-[#18191c] p-3 rounded-xl border border-white/5">
            <span className="text-[11px] text-gray-400 block uppercase">Electron Mobility</span>
            <span className="text-sm font-bold text-blue-400">{muN} cm²/Vs</span>
          </div>
          <div className="bg-[#18191c] p-3 rounded-xl border border-white/5">
            <span className="text-[11px] text-gray-400 block uppercase">Hole Mobility</span>
            <span className="text-sm font-bold text-emerald-400">{muP} cm²/Vs</span>
          </div>
          <div className="bg-[#18191c] p-3 rounded-xl border border-white/5">
            <span className="text-[11px] text-gray-400 block uppercase">Drift Velocity v_dn</span>
            <span className="text-sm font-bold text-white font-mono">{vdN.toExponential(2)} cm/s</span>
          </div>
        </div>
      </div>
    </div>
  );
};
