import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Header, type AppMode } from './components/Header';
import { FormulaPanel } from './components/FormulaPanel';
import { CircuitCanvas } from './components/CircuitCanvas';
import { SeriesParallelCalculator } from './components/CircuitModes/SeriesParallelCalculator';
import { ACPowerCalculator } from './components/CircuitModes/ACPowerCalculator';
import { ComponentSandbox } from './components/CircuitModes/ComponentSandbox';
import { ExportModal } from './components/ExportModal';
import { PNJunctionPage } from './components/PNJunction/PNJunctionPage';

const OhmApp: React.FC = () => {
  // Default values matching exact reference image: V = 15.5 V, R = 12.5 Ω
  const [voltage, setVoltage] = useState<number>(15.5);
  const [resistance, setResistance] = useState<number>(12.5);
  const [isCircuitOpen, setIsCircuitOpen] = useState<boolean>(false);
  const [currentMode, setCurrentMode] = useState<AppMode>('ohms_law');
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);

  // Calculated values
  const current = isCircuitOpen || resistance <= 0 ? 0 : voltage / resistance;
  const power = isCircuitOpen ? 0 : voltage * current;

  // Reset parameters to exact reference values
  const handleReset = () => {
    setVoltage(15.5);
    setResistance(12.5);
    setIsCircuitOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#121316] text-[#e1e2e6] font-sans flex flex-col justify-between selection:bg-blue-600">
      {/* Top Header Navigation */}
      <Header
        currentMode={currentMode}
        onModeChange={setCurrentMode}
        onExport={() => setIsExportOpen(true)}
        onResetAll={handleReset}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 flex items-center justify-center">
        {currentMode === 'ohms_law' && (
          /* Main Card reproducing the exact side-by-side design in the reference image */
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
            {/* Left Card Panel: Formulas, Live Equations & Sliders */}
            <FormulaPanel
              voltage={voltage}
              resistance={resistance}
              onVoltageChange={setVoltage}
              onResistanceChange={setResistance}
              onReset={handleReset}
            />

            {/* Right Card Panel: Interactive Schematic Circuit Visualizer */}
            <CircuitCanvas
              voltage={voltage}
              resistance={resistance}
              current={current}
              power={power}
              isCircuitOpen={isCircuitOpen}
              onToggleCircuit={() => setIsCircuitOpen(!isCircuitOpen)}
            />
          </div>
        )}

        {currentMode === 'series_parallel' && <SeriesParallelCalculator />}

        {currentMode === 'ac_power' && <ACPowerCalculator />}

        {currentMode === 'sandbox' && <ComponentSandbox />}
      </main>

      {/* Footer */}
      <footer className="w-full bg-[#16171a] border-t border-white/5 py-4 px-6 text-center text-xs text-gray-500 flex flex-col sm:flex-row items-center justify-between gap-2">
        <div>
          <span>ElectraSim Physics Engine &bull; Built with React, TypeScript & Tailwind CSS</span>
        </div>
        <div className="flex items-center gap-4 text-gray-400">
          <span>Ohm's Law: <code className="text-gray-300">V = I &times; R</code></span>
          <span>Power Law: <code className="text-gray-300">P = V &times; I = V&sup2;/R</code></span>
        </div>
      </footer>

      {/* Export Report Modal */}
      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        voltage={voltage}
        resistance={resistance}
        current={current}
        power={power}
      />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<OhmApp />} />
      <Route path="/pn-junction" element={<PNJunctionPage />} />
    </Routes>
  );
};

export default App;
