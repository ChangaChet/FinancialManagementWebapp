import React, { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceDot } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';

// --- Helper Components & Icons ---

const CheckCircleIcon = () => (
    <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
);

const LockIcon = () => (
    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
);

const Formula = ({ children }) => (
    <div className="bg-gray-100 p-4 my-4 rounded-lg text-center font-mono text-lg md:text-xl text-gray-800 tracking-wider overflow-x-auto">
        {children}
    </div>
);

const InteractivePlayground = ({ title, children }) => (
    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 my-8 border border-gray-200">
        <h3 className="text-2xl font-bold text-indigo-700 mb-6">{title}</h3>
        {children}
    </div>
);

const PracticeProblem = ({ title, children, problemNumber }) => (
     <div className="bg-blue-50 border-l-4 border-blue-500 p-6 my-6 rounded-r-lg">
        <h4 className="font-bold text-xl text-blue-800 mb-3">
            <span className="font-mono bg-blue-200 text-blue-700 rounded-full w-8 h-8 inline-flex items-center justify-center mr-3">{problemNumber}</span>
            {title}
        </h4>
        <div className="text-gray-700 space-y-3">{children}</div>
    </div>
);

const Section = ({ title, children }) => (
    <div className="mt-10 mb-6">
        <h3 className="text-3xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-gray-200">{title}</h3>
        <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
            {children}
        </div>
    </div>
);


// --- Module 1: Future Value ---

const FutureValueModule = ({ onComplete }) => {
    const [step, setStep] = useState(0);
    const [pv, setPv] = useState(1000);
    const [rate, setRate] = useState(10);
    const [time, setTime] = useState(20);
    
    const fvData = useMemo(() => Array.from({ length: time + 1 }, (_, i) => ({
        year: i,
        value: pv * Math.pow(1 + rate / 100, i),
    })), [pv, rate, time]);

    return (
        <motion.div>
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Module 1: The Power of Time - Future Value (FV)</h2>
            <Section title="1.1 Core Concept: Planting a Money Tree">
                 <p>Imagine you plant a <strong>$1,000</strong> seed. Future Value (FV) is the size of your money tree at a future date based on its growth rate (interest). It's the powerful idea of your money working for you over time, also known as <strong>compounding</strong>.</p>
            </Section>
            <InteractivePlayground title="1.4 FV Interactive Playground">
                <div className="grid md:grid-cols-3 gap-8 items-center">
                    <div className="md:col-span-1 flex flex-col space-y-4">
                        <div>
                            <label htmlFor="fv-pv-slider" className="block text-sm font-medium text-gray-700">Present Value (PV): <span className="font-bold text-blue-600">${pv.toLocaleString()}</span></label>
                            <input id="fv-pv-slider" type="range" min="100" max="10000" step="100" value={pv} onChange={e => setPv(Number(e.target.value))} className="interactive-slider" />
                        </div>
                        <div>
                            <label htmlFor="fv-rate-slider" className="block text-sm font-medium text-gray-700">Interest Rate (r): <span className="font-bold text-blue-600">{rate}%</span></label>
                            <input id="fv-rate-slider" type="range" min="1" max="25" value={rate} onChange={e => setRate(Number(e.target.value))} className="interactive-slider" />
                        </div>
                        <div>
                            <label htmlFor="fv-time-slider" className="block text-sm font-medium text-gray-700">Time Periods (t): <span className="font-bold text-blue-600">{time} years</span></label>
                            <input id="fv-time-slider" type="range" min="1" max="50" step="1" value={time} onChange={e => setTime(Number(e.target.value))} className="interactive-slider" />
                        </div>
                    </div>
                    <div className="md:col-span-2 h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={fvData} margin={{ top: 5, right: 30, left: 20, bottom: 20 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="year" label={{ value: 'Years', position: 'insideBottom', offset: -10 }} />
                                <YAxis tickFormatter={(value) => `$${value.toLocaleString()}`} label={{ value: 'Value', angle: -90, position: 'insideLeft' }}/>
                                <Tooltip formatter={(value) => [`$${value.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`, "Future Value"]} />
                                <Legend verticalAlign="top" />
                                <Line type="monotone" dataKey="value" name="Future Value Growth" stroke="#3b82f6" strokeWidth={2} dot={false} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </InteractivePlayground>
            <button onClick={onComplete} className="w-full mt-8 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 text-xl transition-colors">Complete Module 1 & Unlock Present Value</button>
        </motion.div>
    );
};

// --- Module 2: Present Value ---

const PresentValueModule = ({ onComplete }) => {
    const [fv, setFv] = useState(10000);
    const [rate, setRate] = useState(8);
    const [time, setTime] = useState(10);

    const { chartData, currentPv } = useMemo(() => {
        const data = Array.from({ length: 25 }, (_, i) => {
            const r = i + 1;
            return {
                rate: r,
                value: fv / Math.pow(1 + r / 100, time)
            }
        });
        const current = fv / Math.pow(1 + rate / 100, time);
        return { chartData: data, currentPv: current };
    }, [fv, time, rate]);

    return (
        <motion.div>
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Module 2: What is Future Money Worth Today? - Present Value (PV)</h2>
             <Section title="2.1 Core Concept: Time Travel for Money">
                <p>Present Value (PV) is the reverse of Future Value. It answers the question: "If I'm promised money in the future, what is its actual worth today?" To find this, we must <strong>"discount"</strong> that future cash flow. This is crucial because money today is worth more than money tomorrow due to inflation and opportunity cost.</p>
            </Section>
            <InteractivePlayground title="2.4 PV Interactive Playground">
                 <h4 className="text-center text-2xl font-bold text-gray-800 mb-6">
                    Calculated Present Value: <span className="text-indigo-600">${currentPv.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                </h4>
                <div className="grid md:grid-cols-3 gap-8 items-center">
                    <div className="md:col-span-1 flex flex-col space-y-4">
                        <div>
                            <label htmlFor="pv-fv-slider" className="block text-sm font-medium text-gray-700">Future Value (FV): <span className="font-bold text-blue-600">${fv.toLocaleString()}</span></label>
                            <input id="pv-fv-slider" type="range" min="1000" max="50000" step="1000" value={fv} onChange={e => setFv(Number(e.target.value))} className="interactive-slider" />
                        </div>
                        <div>
                            <label htmlFor="pv-rate-slider" className="block text-sm font-medium text-gray-700">Discount Rate (r): <span className="font-bold text-blue-600">{rate}%</span></label>
                            <input id="pv-rate-slider" type="range" min="1" max="25" value={rate} onChange={e => setRate(Number(e.target.value))} className="interactive-slider" />
                        </div>
                        <div>
                            <label htmlFor="pv-time-slider" className="block text-sm font-medium text-gray-700">Time Periods (t): <span className="font-bold text-blue-600">{time} years</span></label>
                            <input id="pv-time-slider" type="range" min="1" max="50" step="1" value={time} onChange={e => setTime(Number(e.target.value))} className="interactive-slider" />
                        </div>
                    </div>
                    <div className="md:col-span-2 h-80">
                         <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 20 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="rate" type="number" domain={[1, 25]} tickFormatter={(r) => `${r}%`} label={{ value: 'Discount Rate', position: 'insideBottom', offset: -10 }} />
                                <YAxis tickFormatter={(value) => `$${value.toLocaleString()}`} label={{ value: 'Present Value', angle: -90, position: 'insideLeft' }} />
                                <Tooltip formatter={(value) => `$${value.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`} labelFormatter={(label) => `Rate: ${label}%`} />
                                <Legend verticalAlign="top"/>
                                <Line type="monotone" dataKey="value" name="PV Curve" stroke="#3b82f6" strokeWidth={2} dot={false} />
                                <ReferenceDot x={rate} y={currentPv} r={8} fill="#ef4444" stroke="white" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </InteractivePlayground>
            <button onClick={onComplete} className="w-full mt-8 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 text-xl transition-colors">Complete Module 2 & Unlock Annuities</button>
        </motion.div>
    )
}

// --- Module 3: Annuities ---

const AnnuitiesModule = ({ onComplete }) => {
    return (
        <motion.div>
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Module 3: Dealing with Multiple Payments - Annuities & Perpetuities</h2>
            <Section title="3.1 Core Concept: Streams of Cash">
                <p>Real-world finance is full of payment streams: car loans, mortgages, retirement savings. An <strong>Annuity</strong> is a series of equal payments made at regular intervals for a finite period. A <strong>Perpetuity</strong> is a special annuity that continues forever.</p>
            </Section>
            <Section title="3.2 The Formulas">
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="border border-gray-200 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">PV of an Annuity</h4>
                        <Formula>PV = C × [ (1 - (1+r)⁻ᵗ) / r ]</Formula>
                        <p>This formula is the shortcut for summing the present value of all payments ('C') for 't' periods at rate 'r'.</p>
                    </div>
                    <div className="border border-gray-200 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">PV of a Perpetuity</h4>
                        <Formula>PV = C / r</Formula>
                        <p>When 't' becomes infinite, the annuity formula simplifies to this elegant equation.</p>
                    </div>
                </div>
            </Section>
             <PracticeProblem title="University Endowment" problemNumber={1}>
                <p>You want to endow a scholarship that pays out $50,000 every year, forever. If the university can earn 8% on its investments, how much do you need to donate?</p>
                <details className="bg-white p-3 rounded-md cursor-pointer hover:bg-gray-50">
                    <summary className="font-semibold text-indigo-700">Show Answer</summary>
                    <p className="mt-2">This is a perpetuity! We use the formula PV = C / r.</p>
                    <Formula>$50,000 / 0.08 = $625,000</Formula>
                </details>
            </PracticeProblem>
            <button onClick={onComplete} className="w-full mt-8 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 text-xl transition-colors">Complete Module 3 & Unlock APR vs. EAR</button>
        </motion.div>
    );
}

// --- Module 4: APR vs EAR ---

const APRvsEARModule = ({ onComplete }) => {
    const [compoundingPeriods, setCompoundingPeriods] = useState(12); // Default to Monthly

    const { finalBalance, ear, breakdown } = useMemo(() => {
        const principal = 1000;
        const apr = 0.12;
        const m = compoundingPeriods;
        
        if (m === 0) return { finalBalance: principal, ear: apr, breakdown: []};

        const periodicRate = apr / m;
        let balance = principal;
        let breakdownSteps = [];

        for (let i = 1; i <= m; i++) {
            const interest = balance * periodicRate;
            balance += interest;
            breakdownSteps.push(`Period ${i}: $${(balance - interest).toFixed(2)} + $${interest.toFixed(2)} interest = $${balance.toFixed(2)}`);
        }
        
        const effectiveRate = (balance / principal) - 1;

        return {
            finalBalance: balance,
            ear: effectiveRate,
            breakdown: breakdownSteps
        };
    }, [compoundingPeriods]);

    return (
        <motion.div>
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Module 4: The True Cost of Money - APR vs. EAR</h2>
             <Section title="4.1 Core Concept: Advertised vs. Actual Rate">
                <p>The <strong>Annual Percentage Rate (APR)</strong> is the simple, advertised rate. The <strong>Effective Annual Rate (EAR)</strong> is the true rate you earn or pay after accounting for the effect of compounding within the year. More frequent compounding results in a higher EAR.</p>
            </Section>
            <InteractivePlayground title="4.2 The Compounding Machine">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="flex flex-col space-y-6">
                        <div>
                           <label htmlFor="compounding-m" className="block text-sm font-medium text-gray-700 mb-2">Compounding Frequency (m)</label>
                           <select 
                                id="compounding-m" 
                                value={compoundingPeriods} 
                                onChange={(e) => setCompoundingPeriods(Number(e.target.value))}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-lg p-2"
                            >
                                <option value="1">Annually (1)</option>
                                <option value="2">Semi-Annually (2)</option>
                                <option value="4">Quarterly (4)</option>
                                <option value="12">Monthly (12)</option>
                                <option value="52">Weekly (52)</option>
                                <option value="365">Daily (365)</option>
                            </select>
                        </div>
                        <div className="text-center">
                             <p className="font-semibold mb-2">True Rate (EAR)</p>
                             <p className="text-4xl font-bold text-green-600">{(ear * 100).toFixed(2)}%</p>
                        </div>
                        <div className="text-center">
                            <p className="font-semibold mb-2">Year-End Balance on $1,000 at 12% APR</p>
                            <p className="text-4xl font-bold text-blue-600">${finalBalance.toFixed(2)}</p>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-2 text-center">Calculation Breakdown</h4>
                        <div className="mt-2 text-sm font-mono text-gray-600 bg-gray-50 p-3 rounded-md h-64 overflow-y-auto border">
                            {breakdown.length > 30 ? (
                                <p>Breakdown for {breakdown.length} periods is too long to display.</p>
                            ) : (
                                breakdown.map((step, index) => <div key={index}>{step}</div>)
                            )}
                        </div>
                    </div>
                </div>
            </InteractivePlayground>
            <button onClick={onComplete} className="w-full mt-8 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 text-xl transition-colors">Finish Course</button>
        </motion.div>
    );
}


// --- Main Application Component ---
export default function DcfApp() {
    const [activeModule, setActiveModule] = useState(1);
    const [completedModules, setCompletedModules] = useState([0]); // Module 0 is pre-completed

    const handleComplete = (moduleNumber) => {
        if (!completedModules.includes(moduleNumber)) {
            setCompletedModules(current => [...current, moduleNumber].sort((a,b) => a-b));
        }
        if (moduleNumber + 1 <= 4) {
            setActiveModule(moduleNumber + 1);
        } else {
             alert("Congratulations! You've completed the entire course on DCF fundamentals.");
        }
    };

    const modules = [
        { id: 1, name: 'Future Value', component: <FutureValueModule onComplete={() => handleComplete(1)} /> },
        { id: 2, name: 'Present Value', component: <PresentValueModule onComplete={() => handleComplete(2)} /> },
        { id: 3, name: 'Annuities', component: <AnnuitiesModule onComplete={() => handleComplete(3)} /> },
        { id: 4, name: 'APR vs. EAR', component: <APRvsEARModule onComplete={() => handleComplete(4)} /> },
    ];

    const NavItem = ({ module }) => {
        const isCompleted = completedModules.includes(module.id);
        const isLocked = !completedModules.includes(module.id - 1);
        const isActive = activeModule === module.id;

        return (
            <button
                onClick={() => !isLocked && setActiveModule(module.id)}
                disabled={isLocked}
                className={`w-full text-left p-4 rounded-lg flex items-center justify-between transition-all duration-200 ${
                    isActive ? 'bg-indigo-600 text-white shadow-lg' : 'hover:bg-gray-200'
                } ${isLocked ? 'cursor-not-allowed bg-gray-100 text-gray-400' : ''}`}
            >
                <div>
                    <div className="text-sm font-light">Module {module.id}</div>
                    <div className="font-bold">{module.name}</div>
                </div>
                {isCompleted ? <CheckCircleIcon /> : isLocked ? <LockIcon /> : null}
            </button>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans flex flex-col md:flex-row">
            {/* Sidebar - Topic Hub */}
            <aside className="w-full md:w-80 bg-white p-6 border-r border-gray-200 flex-shrink-0 shadow-md z-10">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">DCF Fundamentals</h1>
                <nav className="space-y-4">
                    {modules.map(m => <NavItem key={m.id} module={m} />)}
                </nav>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 p-6 md:p-10 overflow-y-auto">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeModule}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        {modules.find(m => m.id === activeModule)?.component}
                    </motion.div>
                </AnimatePresence>
            </main>
        </div>
    );
}