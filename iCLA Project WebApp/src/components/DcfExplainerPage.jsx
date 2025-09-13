import React, { useState, useMemo, useEffect } from 'react';

// --- Helper Components (Unchanged) --- //

const Formula = ({ children }) => (
  <div className="bg-gray-100 p-4 my-4 rounded-lg text-center font-mono text-xl text-gray-800 tracking-wider overflow-x-auto">
    {children}
  </div>
);

const ContentCard = ({ title, children, titleClassName = "text-3xl" }) => (
  <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10 my-8">
    <h2 className={`font-bold text-gray-800 mb-6 ${titleClassName}`}>{title}</h2>
    <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
      {children}
    </div>
  </div>
);


// --- Sections 1 & 2 (Unchanged) --- //

const IntroductionSection = () => (
    <ContentCard title="The Time Value of Money: Your Financial Superpower">
        <p>Welcome, students. Today we explore the most fundamental concept in finance: the <strong>Time Value of Money</strong>. It's a simple but profound idea: a dollar in your hand today is worth more than a dollar you receive a year from now.</p>
        <p>Why? Because of <strong>opportunity cost</strong>. You could invest that dollar today and earn interest, making it grow. The dollar promised in the future doesn't have that opportunity. Understanding this is the key to making sound financial decisions.</p>
        <div className="flex justify-center items-center gap-4 md:gap-8 my-6 p-4 bg-indigo-50 rounded-lg">
            <div className="text-center"><div className="text-4xl md:text-5xl animate-bounce">💵</div><div className="font-semibold mt-2 text-indigo-800">Money Today</div><div className="text-sm text-gray-600">(Has earning potential)</div></div>
            <div className="text-2xl font-bold text-gray-400">&gt;</div>
            <div className="text-center"><div className="text-4xl md:text-5xl">💵</div><div className="font-semibold mt-2 text-gray-500">Money Tomorrow</div><div className="text-sm text-gray-600">(Just a promise)</div></div>
        </div>
    </ContentCard>
);

const FormulaSection = () => (
    <ContentCard title="The Twin Pillars: Present Value & Future Value">
        <p>To work with the Time Value of Money, we use two key formulas. They allow us to travel through time, financially speaking.</p>
        <div>
            <h3 className="font-bold text-2xl text-gray-800 mt-6 mb-2">1. Future Value (FV)</h3>
            <p>This tells you what an amount of money today (PV) will be worth in the future.</p>
            <Formula>FV = PV × (1 + r)ᵗ</Formula>
        </div>
        <div>
            <h3 className="font-bold text-2xl text-gray-800 mt-6 mb-2">2. Present Value (PV)</h3>
            <p>This tells you what a future amount of money (FV) is worth today. This is the core of "discounting".</p>
            <Formula>PV = FV / (1 + r)ᵗ</Formula>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 text-center">
            <div className="bg-gray-50 p-3 rounded-lg"><strong className="text-indigo-600">PV</strong> = Present Value</div>
            <div className="bg-gray-50 p-3 rounded-lg"><strong className="text-indigo-600">FV</strong> = Future Value</div>
            <div className="bg-gray-50 p-3 rounded-lg"><strong className="text-indigo-600">r</strong> = Discount Rate</div>
            <div className="bg-gray-50 p-3 rounded-lg"><strong className="text-indigo-600">t</strong> = Time Periods</div>
        </div>
    </ContentCard>
);


// --- Section 3: The NEW Step-by-Step Interactive DCF Visualizer --- //

const MultiPeriodDcfVisualizer = () => {
    const [cashFlows, setCashFlows] = useState([
        { year: 1, amount: 100 },
        { year: 2, amount: 125 },
        { year: 3, amount: 150 },
        { year: 4, amount: 175 },
        { year: 5, amount: 200 },
    ]);
    const [discountRate, setDiscountRate] = useState(8);
    const [currentStep, setCurrentStep] = useState(0);
    const [animationKey, setAnimationKey] = useState(0);


    const handleCashFlowChange = (index, amount) => {
        const newCashFlows = [...cashFlows];
        newCashFlows[index].amount = amount;
        setCashFlows(newCashFlows);
    };
    
    const handleReset = () => {
        setCurrentStep(0);
        setAnimationKey(prev => prev + 1);
    }

    const discountedCashFlows = useMemo(() => {
        return cashFlows.map(cf => {
            const pv = cf.amount / Math.pow(1 + discountRate / 100, cf.year);
            return { ...cf, presentValue: pv };
        });
    }, [cashFlows, discountRate]);

    const visibleCashFlows = useMemo(() => {
        return discountedCashFlows.slice(0, currentStep);
    }, [currentStep, discountedCashFlows]);

    const netPresentValue = useMemo(() => {
        return visibleCashFlows.reduce((sum, cf) => sum + cf.presentValue, 0);
    }, [visibleCashFlows]);

    const lastVisibleCashFlow = visibleCashFlows[visibleCashFlows.length - 1];

    // SVG dimensions
    const svgWidth = 800;
    const svgHeight = 300;
    const padding = 60;

    return (
        <ContentCard title="The DCF Visualizer: A Step-by-Step Guide">
            <p>
                Follow along as we build a valuation. Click "Next" to discount each year's future cash flow to its present value. Watch the timeline and see how the math works below.
            </p>

            {/* --- CONTROLS --- */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 my-8 p-6 bg-gray-50 rounded-lg">
                <div className="md:col-span-3">
                    <label className="font-bold flex justify-between text-lg">Master Discount Rate (r): <span>{discountRate}%</span></label>
                    <input type="range" min="0" max="25" step="1" value={discountRate} onChange={(e) => setDiscountRate(Number(e.target.value))} className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer range-lg accent-indigo-600" disabled={currentStep > 0} />
                    {currentStep > 0 && <small className="text-gray-500">Reset the simulation to change the discount rate.</small>}
                </div>
            </div>

            {/* --- VISUALIZATION --- */}
            <div className="w-full overflow-x-auto border-2 border-gray-200 rounded-lg p-4">
                 <style>
                    {`@keyframes draw{from{stroke-dashoffset:1000}to{stroke-dashoffset:0}}@keyframes fadeIn{from{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:translateY(0)}}.arrow-path{stroke-dasharray:1000;stroke-dashoffset:1000;animation:draw 1.5s ease-out forwards}.pv-text{opacity:0;animation:fadeIn 1s ease-out .5s forwards}`}
                </style>
                <svg key={animationKey} viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full min-w-[600px]">
                    <line x1={padding} y1={svgHeight - padding} x2={svgWidth - padding} y2={svgHeight - padding} stroke="black" strokeWidth="2" />
                    {cashFlows.map((cf, index) => {
                        const x = padding + (index + 1) * ((svgWidth - 2 * padding) / (cashFlows.length + 1));
                        const isVisible = index < currentStep;
                        return (
                            <g key={`tick-${cf.year}`} style={{transition: 'opacity 0.5s', opacity: isVisible ? 1 : 0.2}}>
                                <line x1={x} y1={svgHeight - padding - 5} x2={x} y2={svgHeight - padding + 5} stroke="black" strokeWidth="2" />
                                <text x={x} y={svgHeight - padding + 25} textAnchor="middle" fontWeight="bold">Year {cf.year}</text>
                                <text x={x} y={svgHeight - padding - 40} textAnchor="middle" fill="#4f46e5" fontWeight="bold">${cf.amount}</text>
                                <text x={x} y={svgHeight - padding - 20} textAnchor="middle" fill="#6b7280" fontSize="0.8em">(Future Value)</text>
                                
                                {isVisible && (
                                    <g>
                                        <path className="arrow-path" d={`M ${x} ${svgHeight - padding - 15} Q ${x - (x - padding)/2} ${svgHeight - padding - 100}, ${padding + 10} ${padding + 10}`} stroke="#818cf8" strokeWidth="2" fill="none"/>
                                        <circle cx={padding + 10} cy={padding + 10} r="3" fill="#4f46e5" />
                                        <text className="pv-text" x={padding + 20} y={padding - 5 + (index * 20)} textAnchor="start" fontSize="0.9em">
                                            <tspan fill="#4f46e5" fontWeight="bold">PV:</tspan> ${discountedCashFlows[index].presentValue.toFixed(2)}
                                        </text>
                                    </g>
                                )}
                            </g>
                        );
                    })}
                     <text x={padding} y={svgHeight - padding + 25} textAnchor="middle" fontWeight="bold">Year 0</text>
                </svg>
            </div>
            
            {/* --- EXPLANATION CARD --- */}
            {lastVisibleCashFlow && (
                 <div className="mt-6 p-6 bg-indigo-50 rounded-lg border border-indigo-200 transition-all duration-500 animate-[fadeIn_1s_ease-out]">
                    <h3 className="font-bold text-2xl text-indigo-800">Calculation for Year {lastVisibleCashFlow.year}</h3>
                    <p className="mt-2">We take the future cash flow and divide it by `(1 + r)ᵗ` to find its value today.</p>
                    <Formula>PV = ${lastVisibleCashFlow.amount} / (1 + {discountRate / 100}) ^{lastVisibleCashFlow.year}</Formula>
                    <p className="text-center font-bold text-xl">Resulting Present Value: ${lastVisibleCashFlow.presentValue.toFixed(2)}</p>
                </div>
            )}

             {/* --- RESULTS & NAVIGATION --- */}
            <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-6 bg-green-50 p-6 rounded-lg border border-green-200">
                <div>
                    <h3 className="text-xl font-semibold text-gray-700">Total Net Present Value (NPV)</h3>
                    <p className="text-4xl font-bold text-green-600 mt-1">
                        ${netPresentValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                </div>
                <div className="flex gap-4">
                    <button onClick={handleReset} className="px-6 py-3 bg-gray-600 text-white font-bold rounded-lg hover:bg-gray-700 transition-colors">Reset</button>
                    <button onClick={() => setCurrentStep(s => s + 1)} disabled={currentStep >= cashFlows.length} className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed">
                        {currentStep >= cashFlows.length ? 'Complete!' : 'Next Step'}
                    </button>
                </div>
            </div>
        </ContentCard>
    );
};


// --- Section 4 (Unchanged) --- //
const DerivationSection = () => (
    <ContentCard title="Deriving the Formula: No Magic Involved">
        <p> The Future Value formula might seem complex, but it's just a simple idea repeated over time. Let's build it step-by-step. Assume you invest a Present Value (PV) at a rate (r). </p>
        <div className="space-y-4 mt-6">
            <div className="p-4 bg-gray-50 rounded-lg"> <p><strong>After 1 Year:</strong> Your money grows by the interest rate.</p> <Formula>FV₁ = PV × (1 + r)</Formula> </div>
            <div className="p-4 bg-gray-50 rounded-lg"> <p><strong>After 2 Years:</strong> You earn interest on your initial investment AND on the interest from the first year. This is <strong>compounding</strong>.</p> <Formula>FV₂ = FV₁ × (1 + r) = [PV × (1 + r)] × (1 + r) = PV × (1 + r)²</Formula> </div>
            <div className="p-4 bg-gray-50 rounded-lg"> <p><strong>After 3 Years:</strong> The pattern continues.</p> <Formula>FV₃ = FV₂ × (1 + r) = [PV × (1 + r)²] × (1 + r) = PV × (1 + r)³</Formula> </div>
        </div>
        <p className="mt-6">By observing this pattern, we can generalize for any number of time periods, 't'. This gives us our final, powerful formula for Future Value.</p>
        <div className="mt-4 p-6 bg-green-50 text-green-800 rounded-lg border border-green-200">
            <h3 className="font-bold text-2xl text-center">Generalization for 't' periods</h3>
            <Formula>FV = PV × (1 + r)ᵗ</Formula>
        </div>
    </ContentCard>
);


// --- Main Page Component --- //
export default function DcfExplainerPage() {
  return (
    <div className="bg-gray-100 font-sans">
      <div className="container mx-auto px-4 py-8">
        
        <div className="text-center mb-12">
            <h1 className="text-5xl font-extrabold text-gray-900">Discounted Cash Flow (DCF)</h1>
            <p className="text-xl text-gray-600 mt-4 max-w-3xl mx-auto">An Interactive Lecture on Valuing the Future</p>
        </div>

        <IntroductionSection />
        <FormulaSection />
        <MultiPeriodDcfVisualizer />
        <DerivationSection />

      </div>
    </div>
  );
}

