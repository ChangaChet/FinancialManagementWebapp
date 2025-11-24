import React, { useState, useMemo, useEffect, useRef } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';

// --- Reusable Components (Shared Style) ---

const CheckCircleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const InteractivePlayground = ({ title, children }) => (
    <div className="my-10 p-8 bg-gray-100 rounded-xl shadow-inner border border-gray-200">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-3 flex items-center gap-2">
            <span className="text-3xl">🧮</span> {title}
        </h3>
        {children}
    </div>
);

const ProfessorNote = ({ title, children, type = "info" }) => {
    const colors = type === "warning" ? "bg-yellow-50 border-yellow-200 text-yellow-900" : "bg-blue-50 border-blue-200 text-blue-900";
    const icon = type === "warning" ? "⚠️" : "🎓";
    return (
        <div className={`my-6 p-6 rounded-lg border ${colors} shadow-sm`}>
            <div className="font-bold flex items-center gap-2 mb-2 text-lg">
                <span>{icon}</span>
                {title}
            </div>
            <div className="leading-relaxed opacity-90">
                {children}
            </div>
        </div>
    );
};

const Section = ({ title, children }) => (
    <section className="mb-12">
        <h3 className="text-3xl font-bold text-gray-800 mb-6 pb-2 border-b-2 border-indigo-500">{title}</h3>
        <div className="prose max-w-none text-lg text-gray-700 space-y-6 leading-relaxed">{children}</div>
    </section>
);

const KeyTerm = ({ children }) => <span className="font-bold text-indigo-600 bg-indigo-50 px-1 rounded border border-indigo-100 cursor-help" title="Key Term">{children}</span>;
const SubHeading = ({ children }) => <h5 className="text-xl font-semibold text-gray-800 mt-6 mb-3">{children}</h5>;
const BulletedList = ({ items }) => <ul className="list-disc pl-6 space-y-2 marker:text-indigo-500">{items.map((item, i) => <li key={i}>{item}</li>)}</ul>;
const Formula = ({ children }) => <div className="my-6 p-6 bg-gray-900 text-white font-mono text-center text-xl rounded-xl shadow-lg overflow-x-auto border border-gray-700">{children}</div>;

const Katex = ({ latex }) => {
    const ref = useRef();
    useEffect(() => {
        if (ref.current && window.katex) {
            window.katex.render(latex, ref.current, { throwOnError: false });
        }
    }, [latex]);
    return <span ref={ref} />;
};

// --- Content Modules ---

const content = {
    module1: {
        title: "Module 1: The Concept of Cost of Capital",
        sections: [
            {
                title: "1.1 Required Return vs. Cost of Capital",
                content: (
                    <>
                        <p>When we evaluate a new project or investment, we often talk about its <KeyTerm>Required Return</KeyTerm>. For example, if we say a project's required return is 10%, what does that actually mean?</p>
                        <p>It means two things simultaneously:</p>
                        <BulletedList items={[
                            "The firm must earn at least 10% on the project to compensate investors for the use of the capital needed to finance it.",
                            "Therefore, 10% is the Cost of Capital."
                        ]} />
                        <ProfessorNote title="The Golden Rule">
                            <p><strong>Required return</strong>, <strong>cost of capital</strong>, and <strong>appropriate discount rate</strong> all refer to the exact same thing. They are different names for the hurdle rate a project must clear to be viable.</p>
                        </ProfessorNote>
                    </>
                )
            }
        ]
    },
    module2: {
        title: "Module 2: Cost of Equity (Re)",
        sections: [
            {
                title: "2.1 What is Cost of Equity?",
                content: (
                    <>
                        <p>The <KeyTerm>Cost of Equity (Re)</KeyTerm> is the return that stockholders require on their investment in the firm. Unlike debt, where the company promises a specific interest rate, equity returns are not explicitly promised.</p>
                        <p>Because it is not directly observable, it must be <strong>estimated</strong>.</p>
                    </>
                )
            },
            {
                title: "2.2 Estimation Approaches",
                content: (
                    <>
                        <p>There are two primary methods to estimate the Cost of Equity:</p>
                        <BulletedList items={[
                            "The Constant Dividend Growth Model",
                            "The Capital Asset Pricing Model (CAPM)"
                        ]} />
                        <p>In this lesson, we will focus deeply on the <KeyTerm>Dividend Growth Model</KeyTerm>.</p>
                    </>
                )
            }
        ]
    },
    module3: {
        title: "Module 3: Dividend Growth Model",
        sections: [
            {
                title: "3.1 The Formula",
                content: (
                    <>
                        <p>Recall the formula for the price of a stock with constant dividend growth:</p>
                        <Formula><Katex latex={"P_0 = \\frac{D_0(1+g)}{R_E - g} = \\frac{D_1}{R_E - g}"} /></Formula>
                        <p>To find the Cost of Equity, we simply rearrange this formula to solve for <KeyTerm>Re</KeyTerm>:</p>
                        <Formula><Katex latex={"R_E = \\frac{D_1}{P_0} + g"} /></Formula>
                        <p>This formula tells us that the cost of equity comes from two sources: the <strong>Dividend Yield</strong> (D1/P0) and the <strong>Capital Gains Yield</strong> (g).</p>
                    </>
                )
            }
        ]
    },
    module4: {
        title: "Module 4: Estimating Growth (g)",
        sections: [
            {
                title: "4.1 How do we find 'g'?",
                content: (
                    <>
                        <p>The growth rate, <KeyTerm>g</KeyTerm>, is a critical input. There are two main ways to estimate it:</p>
                        <SubHeading>Method 1: Historical Growth Rates</SubHeading>
                        <BulletedList items={[
                            "Collect dividends paid in the past (e.g., last 5 years).",
                            "Compute the annual growth rates between those years.",
                            "Take the average of those annual growth rates and use it as 'g'."
                        ]} />
                        <SubHeading>Method 2: Analysts' Forecasts</SubHeading>
                        <BulletedList items={[
                            "Use forecasts from professional analysts.",
                            "Since different analysts produce different forecasts, we typically average multiple forecasts or use judgment to discard outliers."
                        ]} />
                    </>
                )
            }
        ]
    },
    module5: {
        title: "Module 5: Model Evaluation",
        sections: [
            {
                title: "5.1 Pros and Cons",
                content: (
                    <>
                        <p>Like any financial model, the Dividend Growth Model has its strengths and weaknesses.</p>
                        <div className="grid md:grid-cols-2 gap-6 mt-6">
                            <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                                <h4 className="font-bold text-green-800 mb-2 text-lg">Advantages</h4>
                                <ul className="list-disc pl-5 space-y-2 text-green-900">
                                    <li><strong>Simple:</strong> It is very easy to understand and use.</li>
                                    <li><strong>Intuitive:</strong> It directly relates stock price to dividends and growth.</li>
                                </ul>
                            </div>
                            <div className="bg-red-50 p-6 rounded-lg border border-red-200">
                                <h4 className="font-bold text-red-800 mb-2 text-lg">Disadvantages</h4>
                                <ul className="list-disc pl-5 space-y-2 text-red-900">
                                    <li><strong>Limited Use:</strong> Only works for companies that pay dividends and have constant growth.</li>
                                    <li><strong>Sensitive:</strong> Extremely sensitive to the estimated 'g'. A small change in 'g' causes a large change in Re.</li>
                                    <li><strong>No Risk Adjustment:</strong> Does not explicitly consider risk (unlike CAPM).</li>
                                </ul>
                            </div>
                        </div>
                    </>
                )
            }
        ]
    },
    module6: {
        title: "Module 6: WACC (The Big Picture)",
        sections: [
            {
                title: "6.1 Putting it all together",
                content: (
                    <>
                        <p>The Cost of Equity is just one piece of the puzzle. To find the overall <KeyTerm>Weighted Average Cost of Capital (WACC)</KeyTerm>, we combine the cost of equity with the cost of debt and preferred stock.</p>
                        <Formula><Katex latex={"\\text{WACC} = (w_E \\times R_E) + (w_D \\times R_D(1-T)) + (w_P \\times R_P)"} /></Formula>
                        <p>This represents the average return the company must earn on its existing asset base to satisfy all its creditors, owners, and other providers of capital.</p>
                    </>
                )
            }
        ]
    }
};

// --- Interactive Components ---

const SimpleModule = ({ content, onComplete }) => (
    <motion.div>
        <h2 className="text-4xl font-extrabold text-gray-900 mb-4">{content.title}</h2>
        {content.sections.map((section, index) => (
            <Section key={index} title={section.title}>{section.content}</Section>
        ))}
        <button onClick={onComplete} className="w-full mt-8 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 text-xl transition-colors">Mark as Complete</button>
    </motion.div>
);

const DividendModelModule = ({ content, onComplete }) => {
    const [d0, setD0] = useState(2.00);
    const [p0, setP0] = useState(40.00);
    const [g, setG] = useState(5.0);

    // D1 = D0 * (1 + g)
    const d1 = d0 * (1 + (g / 100));
    // Re = (D1 / P0) + g
    const re = ((d1 / p0) * 100) + g;

    return (
        <motion.div>
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">{content.title}</h2>
            {content.sections.map((section, index) => (
                <Section key={index} title={section.title}>{section.content}</Section>
            ))}

            <InteractivePlayground title="Dividend Growth Model Calculator">
                <div className="grid md:grid-cols-2 gap-10">
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Current Dividend (D0)</label>
                            <div className="relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><span className="text-gray-500 sm:text-sm">$</span></div>
                                <input type="number" step="0.10" value={d0} onChange={e => setD0(parseFloat(e.target.value))} className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md p-2 border" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Current Stock Price (P0)</label>
                            <div className="relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><span className="text-gray-500 sm:text-sm">$</span></div>
                                <input type="number" step="1.00" value={p0} onChange={e => setP0(parseFloat(e.target.value))} className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md p-2 border" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Growth Rate (g)</label>
                            <div className="relative rounded-md shadow-sm">
                                <input type="number" step="0.5" value={g} onChange={e => setG(parseFloat(e.target.value))} className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-12 sm:text-sm border-gray-300 rounded-md p-2 border" />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"><span className="text-gray-500 sm:text-sm">%</span></div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-lg border border-indigo-100 flex flex-col justify-center">
                        <div className="text-center mb-6">
                            <div className="text-sm text-gray-500 uppercase tracking-wider font-semibold">Next Dividend (D1)</div>
                            <div className="text-2xl font-bold text-gray-800">${d1.toFixed(2)}</div>
                            <div className="text-xs text-gray-400 mt-1">Calculated as D0 × (1 + g)</div>
                        </div>
                        <div className="text-center border-t pt-6">
                            <div className="text-sm text-indigo-600 uppercase tracking-wider font-bold">Cost of Equity (Re)</div>
                            <div className="text-5xl font-extrabold text-indigo-600 my-2">{re.toFixed(2)}%</div>
                            <div className="text-xs text-gray-500 font-mono bg-gray-100 inline-block px-2 py-1 rounded">
                                ({d1.toFixed(2)} / {p0.toFixed(2)}) + {g.toFixed(2)}%
                            </div>
                        </div>
                    </div>
                </div>
            </InteractivePlayground>

            <button onClick={onComplete} className="w-full mt-8 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 text-xl transition-colors">Mark as Complete</button>
        </motion.div>
    );
};

const GrowthEstimationModule = ({ content, onComplete }) => {
    // Historical Data State
    const [dividends, setDividends] = useState([1.10, 1.20, 1.35, 1.40, 1.55]);

    const growthRates = useMemo(() => {
        const rates = [];
        for (let i = 1; i < dividends.length; i++) {
            const rate = ((dividends[i] - dividends[i - 1]) / dividends[i - 1]) * 100;
            rates.push(rate);
        }
        return rates;
    }, [dividends]);

    const averageGrowth = growthRates.reduce((a, b) => a + b, 0) / growthRates.length;

    const handleDividendChange = (index, value) => {
        const newDivs = [...dividends];
        newDivs[index] = parseFloat(value);
        setDividends(newDivs);
    };

    return (
        <motion.div>
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">{content.title}</h2>
            {content.sections.map((section, index) => (
                <Section key={index} title={section.title}>{section.content}</Section>
            ))}

            <InteractivePlayground title="Estimating 'g' from History">
                <p className="mb-4 text-gray-600">Enter the dividends paid over the last 5 years to calculate the historical average growth rate.</p>
                <div className="grid grid-cols-5 gap-2 mb-6">
                    {dividends.map((div, i) => (
                        <div key={i}>
                            <label className="block text-xs font-bold text-gray-500 mb-1">Year {i + 1}</label>
                            <input
                                type="number"
                                step="0.05"
                                value={div}
                                onChange={(e) => handleDividendChange(i, e.target.value)}
                                className="w-full p-2 border rounded text-center font-mono"
                            />
                        </div>
                    ))}
                </div>

                <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h4 className="font-bold text-gray-700 mb-3">Year-over-Year Growth:</h4>
                    <div className="flex justify-between text-sm text-gray-600 font-mono mb-4">
                        {growthRates.map((rate, i) => (
                            <div key={i} className="flex flex-col items-center">
                                <span>Y{i + 1}→Y{i + 2}</span>
                                <span className="font-bold text-indigo-600">{rate.toFixed(1)}%</span>
                            </div>
                        ))}
                    </div>
                    <div className="border-t pt-4 text-center">
                        <span className="text-gray-500 uppercase text-xs font-bold tracking-wider">Estimated g (Average)</span>
                        <div className="text-3xl font-bold text-indigo-600">{averageGrowth.toFixed(2)}%</div>
                    </div>
                </div>
            </InteractivePlayground>

            <button onClick={onComplete} className="w-full mt-8 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 text-xl transition-colors">Mark as Complete</button>
        </motion.div>
    );
};

const WaccModule = ({ content, onComplete }) => {
    // WACC State
    const [equity, setEquity] = useState(500);
    const [debt, setDebt] = useState(300);
    const [preferred, setPreferred] = useState(100);

    const [re, setRe] = useState(12);
    const [rd, setRd] = useState(6);
    const [rp, setRp] = useState(9);
    const [tax, setTax] = useState(21);

    const totalValue = equity + debt + preferred;
    const wE = equity / totalValue;
    const wD = debt / totalValue;
    const wP = preferred / totalValue;

    const rdAfter = rd * (1 - (tax / 100));
    const wacc = (wE * re) + (wD * rdAfter) + (wP * rp);

    const data = [
        { name: 'Equity', value: equity, color: '#4f46e5' },
        { name: 'Debt', value: debt, color: '#059669' },
        { name: 'Preferred', value: preferred, color: '#db2777' },
    ];

    return (
        <motion.div>
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">{content.title}</h2>
            {content.sections.map((section, index) => (
                <Section key={index} title={section.title}>{section.content}</Section>
            ))}

            <InteractivePlayground title="WACC Calculator">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Inputs */}
                    <div className="space-y-4 lg:col-span-1">
                        <h4 className="font-bold text-gray-800 border-b pb-2">Capital Values ($M)</h4>
                        <div><label className="text-xs text-gray-500">Equity (E)</label><input type="number" value={equity} onChange={e => setEquity(Number(e.target.value))} className="w-full border rounded p-1" /></div>
                        <div><label className="text-xs text-gray-500">Debt (D)</label><input type="number" value={debt} onChange={e => setDebt(Number(e.target.value))} className="w-full border rounded p-1" /></div>
                        <div><label className="text-xs text-gray-500">Preferred (P)</label><input type="number" value={preferred} onChange={e => setPreferred(Number(e.target.value))} className="w-full border rounded p-1" /></div>

                        <h4 className="font-bold text-gray-800 border-b pb-2 mt-6">Costs (%)</h4>
                        <div><label className="text-xs text-gray-500">Cost of Equity (Re)</label><input type="number" value={re} onChange={e => setRe(Number(e.target.value))} className="w-full border rounded p-1" /></div>
                        <div><label className="text-xs text-gray-500">Pre-tax Cost of Debt (Rd)</label><input type="number" value={rd} onChange={e => setRd(Number(e.target.value))} className="w-full border rounded p-1" /></div>
                        <div><label className="text-xs text-gray-500">Cost of Preferred (Rp)</label><input type="number" value={rp} onChange={e => setRp(Number(e.target.value))} className="w-full border rounded p-1" /></div>
                        <div><label className="text-xs text-gray-500">Tax Rate (T)</label><input type="number" value={tax} onChange={e => setTax(Number(e.target.value))} className="w-full border rounded p-1" /></div>
                    </div>

                    {/* Visualization */}
                    <div className="lg:col-span-2 flex flex-col">
                        <div className="flex-1 min-h-[200px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                                        {data.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                                    </Pie>
                                    <Tooltip formatter={(val) => `$${val}M`} />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="bg-gray-900 text-white p-6 rounded-xl mt-4 text-center">
                            <div className="text-sm uppercase tracking-widest opacity-70 mb-1">Weighted Average Cost of Capital</div>
                            <div className="text-5xl font-bold">{wacc.toFixed(2)}%</div>
                            <div className="text-xs mt-2 opacity-50 font-mono">
                                ({(wE * 100).toFixed(1)}% × {re}%) + ({(wD * 100).toFixed(1)}% × {rdAfter.toFixed(1)}%) + ({(wP * 100).toFixed(1)}% × {rp}%)
                            </div>
                        </div>
                    </div>
                </div>
            </InteractivePlayground>

            <button onClick={onComplete} className="w-full mt-8 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 text-xl transition-colors">Mark as Complete</button>
        </motion.div>
    );
};

// --- Main Component ---

export default function CostOfCapital() {
    const [activeModule, setActiveModule] = useState(1);
    const [completedModules, setCompletedModules] = useState([]);

    useEffect(() => {
        const loadScript = (src) => new Promise((resolve, reject) => {
            if (document.querySelector(`script[src="${src}"]`)) return resolve();
            const script = document.createElement('script');
            script.src = src;
            script.onload = () => resolve();
            script.onerror = () => reject(new Error(`Script load error for ${src}`));
            document.head.appendChild(script);
        });

        const katexCSS = document.createElement('link');
        katexCSS.href = "https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css";
        katexCSS.rel = "stylesheet";
        document.head.appendChild(katexCSS);

        loadScript("https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js");

        return () => { if (document.head.contains(katexCSS)) document.head.removeChild(katexCSS) };
    }, []);

    const handleComplete = (moduleNumber) => {
        if (!completedModules.includes(moduleNumber)) {
            setCompletedModules(current => [...current, moduleNumber].sort((a, b) => a - b));
        }
    };

    const moduleData = [
        { id: 1, name: 'Concept & Definition', Component: SimpleModule, content: content.module1 },
        { id: 2, name: 'Cost of Equity (Re)', Component: SimpleModule, content: content.module2 },
        { id: 3, name: 'Dividend Growth Model', Component: DividendModelModule, content: content.module3 },
        { id: 4, name: 'Estimating Growth (g)', Component: GrowthEstimationModule, content: content.module4 },
        { id: 5, name: 'Pros & Cons', Component: SimpleModule, content: content.module5 },
        { id: 6, name: 'WACC (Overview)', Component: WaccModule, content: content.module6 },
    ];

    const NavItem = ({ module }) => {
        const isCompleted = completedModules.includes(module.id);
        const isActive = activeModule === module.id;

        return (
            <button onClick={() => setActiveModule(module.id)} className={`w-full text-left p-4 rounded-lg flex items-center justify-between transition-all duration-200 ${isActive ? 'bg-indigo-600 text-white shadow-lg' : 'hover:bg-gray-200'}`}>
                <div>
                    <div className="text-sm font-light">Module {module.id}</div>
                    <div className="font-bold">{module.name}</div>
                </div>
                {isCompleted ? <CheckCircleIcon /> : null}
            </button>
        );
    };

    const ActiveComponent = moduleData.find(m => m.id === activeModule)?.Component;
    const activeContent = moduleData.find(m => m.id === activeModule)?.content;

    return (
        <div className="min-h-screen bg-gray-50 font-sans flex flex-col md:flex-row">
            <aside className="w-full md:w-80 bg-white p-6 border-r border-gray-200 flex-shrink-0 shadow-md z-10 overflow-y-auto h-screen sticky top-0">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Cost of Capital</h1>
                <p className="text-sm text-gray-500 mb-6">Step-by-Step Guide</p>
                <nav className="space-y-2">
                    {moduleData.map(m => <NavItem key={m.id} module={m} />)}
                </nav>
            </aside>
            <main className="flex-1 p-6 md:p-10 overflow-y-auto">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeModule}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        {ActiveComponent && <ActiveComponent content={activeContent} onComplete={() => handleComplete(activeModule)} />}
                    </motion.div>
                </AnimatePresence>
            </main>
        </div>
    );
}
