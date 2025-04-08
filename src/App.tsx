import React, { useState, useEffect } from 'react';
import { InfoIcon, RotateCcw } from 'lucide-react';

interface CalculationResult {
  year: number;
  expectedBalance: number;
  worstCase: number;
  bestCase: number;
}

function App() {
  const [startAmount, setStartAmount] = useState<number>(350000);
  const [investmentPeriod, setInvestmentPeriod] = useState<number>(3);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(250);
  const [profile, setProfile] = useState<string>("Defensief");
  const [investmentType, setInvestmentType] = useState<'Bloei' | 'Bloei Plus'>('Bloei');
  const [results, setResults] = useState<CalculationResult[]>([]);
  const [isFlipped, setIsFlipped] = useState(false);

  const calculateInvestment = () => {
    const expectedRate = 0.05;
    const worstRate = 0.03;
    const bestRate = 0.07;
    
    const calculations: CalculationResult[] = [];
    let expectedBalance = startAmount;
    let worstCase = startAmount;
    let bestCase = startAmount;
    
    for (let year = 1; year <= investmentPeriod; year++) {
      expectedBalance += monthlyContribution * 12;
      worstCase += monthlyContribution * 12;
      bestCase += monthlyContribution * 12;
      
      expectedBalance *= (1 + expectedRate);
      worstCase *= (1 + worstRate);
      bestCase *= (1 + bestRate);
      
      calculations.push({
        year,
        expectedBalance: Math.round(expectedBalance),
        worstCase: Math.round(worstCase),
        bestCase: Math.round(bestCase)
      });
    }
    
    setResults(calculations);
  };

  useEffect(() => {
    calculateInvestment();
  }, [startAmount, investmentPeriod, monthlyContribution, profile, investmentType]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('nl-NL', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return new Intl.NumberFormat('nl-NL', {
      style: 'percent',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#1B3B36] mb-4">Bereken hetzelf</h1>
          <p className="text-gray-600">Met onze rekentool ontdek je wat jouw vermogen door de jaren heen bij Animo kan opleveren</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <div className="space-y-8">
              <div>
                <label className="flex items-center text-[#1B3B36] font-medium mb-4">
                  Startbedrag
                  <span className="ml-2 text-2xl">{formatCurrency(startAmount)}</span>
                </label>
                <input
                  type="range"
                  min="1000"
                  max="1000000"
                  value={startAmount}
                  onChange={(e) => setStartAmount(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#FF4D4D]"
                />
              </div>

              <div>
                <label className="flex items-center text-[#1B3B36] font-medium mb-4">
                  Beleggingshorizon
                  <span className="ml-2 text-2xl">{investmentPeriod} jaar</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="30"
                  value={investmentPeriod}
                  onChange={(e) => setInvestmentPeriod(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#FF4D4D]"
                />
              </div>

              <div>
                <label className="flex items-center text-[#1B3B36] font-medium mb-4">
                  Profiel
                  <InfoIcon className="w-5 h-5 ml-2 text-gray-400" />
                </label>
                <select
                  value={profile}
                  onChange={(e) => setProfile(e.target.value)}
                  className="w-full p-3 rounded-full bg-gray-100 text-[#1B3B36] border-none"
                >
                  <option>Defensief</option>
                  <option>Neutraal</option>
                  <option>Offensief</option>
                </select>
              </div>

              <div>
                <label className="flex items-center text-[#1B3B36] font-medium mb-4">
                  Inleg per maand
                  <span className="ml-2 text-2xl">{formatCurrency(monthlyContribution)}</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="2000"
                  value={monthlyContribution}
                  onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#FF4D4D]"
                />
              </div>

              <div>
                <label className="block text-[#1B3B36] font-medium mb-4">
                  Ik kies voor
                </label>
                <div className="flex gap-4">
                  <button
                    onClick={() => setInvestmentType('Bloei')}
                    className={`px-6 py-2 rounded-full ${
                      investmentType === 'Bloei'
                        ? 'bg-[#FF4D4D] text-white'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    Bloei
                  </button>
                  <button
                    onClick={() => setInvestmentType('Bloei Plus')}
                    className={`px-6 py-2 rounded-full ${
                      investmentType === 'Bloei Plus'
                        ? 'bg-[#FF4D4D] text-white'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    Bloei Plus
                  </button>
                  <button className="text-[#FF4D4D] underline">
                    Wat is het verschil?
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className={`flip-card h-[600px] ${isFlipped ? 'flipped' : ''}`}>
            <div className="flip-card-inner">
              <div className="flip-card-front bg-white rounded-xl p-6 shadow-lg">
                <div className="grid grid-cols-2 gap-8 mb-12">
                  <div>
                    <h3 className="text-gray-600 mb-2">Verwacht eindvermogen</h3>
                    <p className="text-4xl font-bold text-[#1B3B36]">
                      {results.length > 0 && formatCurrency(results[results.length - 1].expectedBalance)}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-gray-600 mb-2">Verwachte winst</h3>
                    <p className="text-4xl font-bold text-[#1B3B36]">
                      {results.length > 0 && formatCurrency(results[results.length - 1].expectedBalance - (startAmount + (monthlyContribution * 12 * investmentPeriod)))}
                    </p>
                  </div>
                </div>

                <div className="relative h-80">
                  <div className="flex justify-between h-full">
                    <div className="w-1/3 bg-gray-200 rounded-t-lg relative">
                      <div className="absolute bottom-0 w-full text-center p-4">
                        <p className="text-sm text-gray-600">Slechter dan verwacht</p>
                        <p className="font-bold text-[#1B3B36]">
                          {results.length > 0 && formatCurrency(results[results.length - 1].worstCase)}
                        </p>
                      </div>
                    </div>
                    <div className="w-1/3 bg-[#1B3B36] rounded-t-lg relative mx-4">
                      <div className="absolute bottom-0 w-full text-center p-4">
                        <p className="text-sm text-white">Verwacht</p>
                        <p className="font-bold text-white">
                          {results.length > 0 && formatCurrency(results[results.length - 1].expectedBalance)}
                        </p>
                      </div>
                    </div>
                    <div className="w-1/3 bg-gray-200 rounded-t-lg relative">
                      <div className="absolute bottom-0 w-full text-center p-4">
                        <p className="text-sm text-gray-600">Beter dan verwacht</p>
                        <p className="font-bold text-[#1B3B36]">
                          {results.length > 0 && formatCurrency(results[results.length - 1].bestCase)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 text-center">
                  <button 
                    onClick={() => setIsFlipped(true)}
                    className="inline-flex items-center px-8 py-3 rounded-full bg-[#FF4D4D] text-white hover:bg-[#ff3333] transition-colors"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Bekijk je kosten
                  </button>
                </div>
              </div>

              <div className="flip-card-back bg-white rounded-xl p-6 shadow-lg">
                <h2 className="text-2xl font-bold text-[#1B3B36] mb-8">Gemiddelde jaarlijkse kosten</h2>
                
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <span className="text-[#1B3B36]">Beheervergoeding</span>
                    <span className="text-[#1B3B36] font-medium">{formatPercentage(0.0038)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#1B3B36]">Kosten broker</span>
                    <span className="text-[#1B3B36] font-medium">{formatPercentage(0.001)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#1B3B36]">Kosten fondsen</span>
                    <span className="text-[#1B3B36] font-medium">{formatPercentage(0.0017)}</span>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-6 mt-6">
                    <div className="flex justify-between items-center">
                      <span className="text-[#1B3B36] font-bold">Totaal</span>
                      <span className="text-[#1B3B36] font-bold">{formatPercentage(0.0065)}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 text-center">
                  <button 
                    onClick={() => setIsFlipped(false)}
                    className="inline-flex items-center px-8 py-3 rounded-full bg-[#FF4D4D] text-white hover:bg-[#ff3333] transition-colors"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Bekijk je rendement
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;