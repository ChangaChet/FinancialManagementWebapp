import React, { useState, useMemo, useEffect, useRef } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, BarChart, Bar } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import 'katex/dist/katex.min.css';
import katex from 'katex';

// --- Reusable Components ---

const CheckCircleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const InteractivePlayground = ({ title, children }) => (
    <div className="my-10 p-8 bg-gray-100 rounded-xl shadow-inner border border-gray-200">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-3 flex items-center gap-2">
            <span className="text-3xl">🎮</span> {title}
        </h3>
        {children}
    </div>
);

const PracticeProblem = ({ title, problemNumber, children }) => (
    <div className="my-8 p-6 border border-indigo-200 bg-indigo-50 rounded-lg shadow-sm">
        <h4 className="text-xl font-bold text-indigo-800 mb-4 flex items-center gap-2">
            <span className="bg-indigo-200 text-indigo-800 py-1 px-3 rounded-full text-sm">Quiz {problemNumber}</span>
            {title}
        </h4>
        <div className="space-y-4">{children}</div>
    </div>
);

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
    const html = useMemo(() => {
        try {
            return katex.renderToString(latex, { throwOnError: false });
        } catch (e) {
            console.error("KaTeX rendering error:", e);
            return latex;
        }
    }, [latex]);
    return <span dangerouslySetInnerHTML={{ __html: html }} />;
};

// --- Content ---

const content = {
    module1: {
        title: "Module 1: Debt vs. Equity",
        sections: [
            {
                title: "1.1 Fundamental Differences",
                content: (
                    <>
                        <p>Before valuing stocks, it's crucial to understand how <KeyTerm>Equity</KeyTerm> (Stock) differs from <KeyTerm>Debt</KeyTerm> (Bonds).</p>
                        <div className="grid md:grid-cols-2 gap-6 mt-6">
                            <div className="p-6 bg-red-50 rounded-lg border border-red-100">
                                <h4 className="text-xl font-bold text-red-800 mb-4">Debt (Bonds)</h4>
                                <ul className="list-disc pl-5 space-y-2 text-red-900">
                                    <li><strong>No Ownership:</strong> Creditors do not own the company.</li>
                                    <li><strong>No Voting Rights:</strong> Creditors have no say in management.</li>
                                    <li><strong>Tax Deductible:</strong> Interest payments are a cost of business.</li>
                                    <li><strong>Legal Recourse:</strong> Unpaid interest/principal can force bankruptcy.</li>
                                </ul>
                            </div>
                            <div className="p-6 bg-blue-50 rounded-lg border border-blue-100">
                                <h4 className="text-xl font-bold text-blue-800 mb-4">Equity (Stocks)</h4>
                                <ul className="list-disc pl-5 space-y-2 text-blue-900">
                                    <li><strong>Ownership Interest:</strong> Stockholders own the company.</li>
                                    <li><strong>Voting Rights:</strong> Common stockholders vote for directors.</li>
                                    <li><strong>Not Tax Deductible:</strong> Dividends are paid from after-tax profits.</li>
                                    <li><strong>No Recourse:</strong> Dividends are not a liability; no bankruptcy risk if skipped.</li>
                                </ul>
                            </div>
                        </div>
                    </>
                )
            }
        ]
    },
    module2: {
        title: "Module 2: Market Operations",
        sections: [
            {
                title: "2.1 Primary vs. Secondary Markets",
                content: (
                    <>
                        <p>Stock trading happens in two distinct types of markets:</p>
                        <BulletedList items={[
                            <><strong>Primary Market:</strong> Where new securities are created and sold for the first time (e.g., IPOs). This is where companies actually raise capital.</>,
                            <><strong>Secondary Market:</strong> Where existing shares are traded between investors (e.g., NYSE, NASDAQ). These trades do <em>not</em> provide money to the company, but they provide <strong>liquidity</strong> and <strong>price discovery</strong>.</>
                        ]} />
                    </>
                )
            }
        ]
    },
    module3: {
        title: "Module 3: Preferred Stock",
        sections: [
            {
                title: "3.1 A Hybrid Security",
                content: (
                    <>
                        <p><KeyTerm>Preferred Stock</KeyTerm> sits somewhere between debt and common equity. It's often called a "hybrid" because it has features of both.</p>
                        <BulletedList items={[
                            <><strong>Dividends First:</strong> Preferred dividends must be paid before any common dividends.</>,
                            <><strong>Cumulative:</strong> If a dividend is missed, it accumulates. All missed dividends (arrears) must be paid before common stockholders get a penny.</>,
                            <><strong>No Voting:</strong> Generally, preferred shares do not carry voting rights.</>
                        ]} />
                    </>
                )
            }
        ]
    },
    module4: {
        title: "Module 4: Valuation Principles",
        sections: [
            {
                title: "4.1 The Core Principle",
                content: (
                    <>
                        <p>Valuing a stock is like valuing a fruit tree. You don't pay for the tree's current size; you pay for the <strong>future harvests (dividends)</strong> you expect to collect, plus what you think you can sell the tree for later.</p>
                        <p>The core principle is simple: <strong>The price of a stock is the Present Value (PV) of all expected future cash flows.</strong></p>
                    </>
                )
            },
            {
                title: "4.2 One-Period Valuation Model",
                content: (
                    <>
                        <p>Imagine you plan to buy a stock, hold it for exactly one year, collect the dividend, and then sell it. The price you should pay today (<Katex latex="P_0" />) is the present value of the dividend (<Katex latex="D_1" />) plus the present value of the selling price (<Katex latex="P_1" />).</p>
                        <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100 my-4">
                            <h5 className="font-bold text-indigo-800 mb-2">Variable Legend</h5>
                            <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                <li><span className="font-mono font-bold text-indigo-600">P_0</span>: Price Today</li>
                                <li><span className="font-mono font-bold text-indigo-600">D_1</span>: Dividend in Year 1</li>
                                <li><span className="font-mono font-bold text-indigo-600">P_1</span>: Price in Year 1</li>
                                <li><span className="font-mono font-bold text-indigo-600">R</span>: Required Return</li>
                            </ul>
                        </div>
                        <p><strong>Why divide by (1+R)?</strong> This is "discounting". Money in the future is worth less than money today. If you want to earn 10% (<Katex latex="R=0.10" />), \$110 next year is worth exactly \$100 today (<Katex latex="110 / 1.10" />).</p>
                        <Formula><Katex latex={"P_0 = \\frac{D_1 + P_1}{1 + R}"} /></Formula>
                    </>
                ),
                problems: [
                    {
                        title: "Moore Oil, Inc. (One-Period)",
                        question: (
                            <>
                                <p>Suppose you are thinking of purchasing the stock of Moore Oil, Inc. You expect it to pay a <strong>$2 dividend</strong> in one year, and you believe that you can sell the stock for <strong>$14</strong> at that time.</p>
                                <p>If you require a return of <strong>20%</strong> on investments of this risk, what is the maximum you would be willing to pay?</p>
                            </>
                        ),
                        answer: (
                            <>
                                <p>We discount both the dividend and the selling price back one year at 20%.</p>
                                <Formula><Katex latex={"P_0 = \\frac{2 + 14}{1.20} = \\frac{16}{1.20} = \\$13.33"} /></Formula>
                            </>
                        )
                    }
                ]
            },
            {
                title: "4.3 Two-Period Valuation Model",
                content: (
                    <>
                        <p>Now, what if you decide to hold the stock for two years? The principle remains the same. You discount the first year's dividend, the second year's dividend, and the selling price at the end of year two.</p>
                        <Formula><Katex latex={"P_0 = \\frac{D_1}{(1+R)^1} + \\frac{D_2 + P_2}{(1+R)^2}"} /></Formula>
                    </>
                ),
                problems: [
                    {
                        title: "Moore Oil, Inc. (Two-Period)",
                        question: (
                            <>
                                <p>Continuing with Moore Oil: In addition to the $2 dividend in year 1, you now expect a <strong>$2.10 dividend</strong> in year 2 and a stock price of <strong>$14.70</strong> at the end of year 2.</p>
                                <p>With the same 20% required return, how much would you pay today?</p>
                            </>
                        ),
                        answer: (
                            <>
                                <p>We calculate the PV of each cash flow separately:</p>
                                <ul className="list-disc pl-6 mb-4">
                                    <li>PV of Year 1 Dividend: $2 / 1.20 = $1.67</li>
                                    <li>PV of Year 2 Dividend & Price: ($2.10 + $14.70) / (1.20)² = $16.80 / 1.44 = $11.67</li>
                                </ul>
                                <p><strong>Total Price:</strong> $1.67 + $11.67 = <strong>$13.33</strong></p>
                                <p className="mt-2 text-sm italic text-gray-600">Notice the price is the same! This shows that the value of the stock is independent of how long you hold it, as long as the market prices it correctly based on future expectations.</p>
                            </>
                        )
                    }
                ]
            }
        ]
    },
    module5: {
        title: "Module 5: Dividend Discount Models (DDM)",
        sections: [
            {
                title: "5.1 Case 1: Constant Dividend (Zero Growth)",
                content: (
                    <>
                        <p>If a company pays a constant dividend forever (like preferred stock), we value it as a perpetuity.</p>
                        <div className="bg-green-50 p-4 rounded-lg border border-green-100 my-4">
                            <h5 className="font-bold text-green-800 mb-2">Analogy: The Perpetual Bank Account</h5>
                            <p className="text-sm text-green-900">Imagine a bank account that pays you <strong>$100 interest every year</strong> forever. If the bank's interest rate is <strong>5%</strong>, how much money must be in the account?</p>
                            <p className="text-sm font-mono mt-2 text-center bg-white p-2 rounded border border-green-200">Deposit Needed = Interest / Rate = $100 / 0.05 = $2,000</p>
                            <p className="text-sm text-green-900 mt-2">The stock price is just the "deposit" you pay to get the "interest" (dividend).</p>
                        </div>
                        <Formula><Katex latex={"P_0 = \\frac{D}{R}"} /></Formula>
                        <p>Where <strong>D</strong> is the constant dividend and <strong>R</strong> is the required return.</p>
                    </>
                ),
                problems: [
                    {
                        title: "Quarterly Dividend Example",
                        question: "Suppose a stock is expected to pay a $0.50 dividend every quarter and the required return is 10% per annum. What is the price?",
                        answer: (
                            <>
                                <p>First, find the annual dividend: $0.50 × 4 = $2.00.</p>
                                <p>Then apply the perpetuity formula:</p>
                                <Formula><Katex latex={"P_0 = \\frac{\\$2.00}{0.10} = \\$20.00"} /></Formula>
                            </>
                        )
                    }
                ]
            },
            {
                title: "5.2 Case 2: Constant Growth (Gordon Growth Model)",
                content: (
                    <>
                        <p>Most companies try to grow their dividends over time. If dividends grow at a constant rate <strong>g</strong>, we use the Gordon Growth Model.</p>

                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 my-4">
                            <h5 className="font-bold text-blue-800 mb-2">Analogy: The Speeding Train</h5>
                            <p className="text-sm text-blue-900">You are trying to catch a train (the Dividend) that is moving away from you.
                                The train is accelerating (Growth <strong>g</strong>). You are running towards it (Required Return <strong>R</strong>).</p>
                            <ul className="list-disc pl-5 mt-2 text-sm text-blue-900">
                                <li>If <strong>R &gt; g</strong>: You are faster. You catch the train (The price is finite).</li>
                                <li>If <strong>R &le; g</strong>: The train is faster. You never catch it (The price is infinite/undefined).</li>
                            </ul>
                        </div>

                        <details className="mb-4 bg-gray-50 p-3 rounded border border-gray-200">
                            <summary className="font-semibold text-gray-700 cursor-pointer">How is this formula derived?</summary>
                            <div className="mt-2 text-sm text-gray-600 space-y-2">
                                <p>The price is the sum of all future discounted dividends:</p>
                                <div className="text-center font-mono my-2"><Katex latex="P_0 = \frac{D_1}{1+R} + \frac{D_1(1+g)}{(1+R)^2} + \dots" /></div>
                                <p>This is a <strong>Geometric Series</strong> with:</p>
                                <ul className="list-disc pl-5">
                                    <li>First term (a) = <Katex latex="D_1 / (1+R)" /></li>
                                    <li>Common ratio (r) = <Katex latex="(1+g) / (1+R)" /></li>
                                </ul>
                                <p>Using the sum formula <Katex latex="S = a / (1 - r)" />, and simplifying, we get the Gordon Model.</p>
                            </div>
                        </details>

                        <Formula><Katex latex={"P_0 = \\frac{D_1}{R - g}"} /></Formula>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm bg-gray-100 p-4 rounded-lg">
                            <div>
                                <span className="font-bold block text-indigo-600">D_1 (Next Dividend)</span>
                                <span className="text-gray-600">The dividend you expect to receive <strong>one year from now</strong>. If you have D0 (just paid), multiply by (1+g).</span>
                            </div>
                            <div>
                                <span className="font-bold block text-indigo-600">R (Required Return)</span>
                                <span className="text-gray-600">The opportunity cost. What you could earn elsewhere on a similar risk investment.</span>
                            </div>
                            <div>
                                <span className="font-bold block text-indigo-600">g (Growth Rate)</span>
                                <span className="text-gray-600">The constant annual rate at which dividends are expected to grow forever.</span>
                            </div>
                        </div>
                    </>
                )
            }
        ]
    },
    module6: {
        title: "Module 6: Non-Constant Growth",
        sections: [
            {
                title: "6.1 Supernormal Growth",
                content: (
                    <>
                        <p>Young, high-growth companies often grow at a very fast rate for a few years before settling down to a stable, long-term growth rate. This requires a multi-stage valuation.</p>
                        <SubHeading>The 4-Step Process:</SubHeading>
                        <ol className="list-decimal pl-6 space-y-2">
                            <li><strong>Forecast Dividends:</strong> Calculate the dividends individually during the high-growth period.</li>
                            <li>
                                <strong>Find Horizon Price:</strong> Use the Constant Growth Model to find the stock price at the <em>end</em> of the high-growth period (e.g., P3).
                                <div className="text-sm bg-yellow-50 p-2 mt-1 rounded border border-yellow-100 text-yellow-800">
                                    <strong>Analogy:</strong> Think of this as "Selling the Business". After the startup phase (high growth), the company becomes stable. You calculate what you could sell it for at that future date.
                                </div>
                            </li>
                            <li><strong>Discount Everything:</strong> Find the Present Value (PV) of all the individual dividends AND the Horizon Price.</li>
                            <li><strong>Sum it Up:</strong> Add all the PVs together to get the current price (P0).</li>
                        </ol>
                    </>
                ),
                problems: [
                    {
                        title: "ABC Co. (Multi-Stage Growth)",
                        question: (
                            <>
                                <p><strong>ABC Co.</strong> is expected to pay dividends at the end of the next three years of <strong>$2, $3, and $3.50</strong>, respectively.</p>
                                <p>After three years, the dividend is expected to grow at a <strong>5%</strong> constant annual rate forever. If the required rate of return on this stock is <strong>15%</strong>, what is the current stock price?</p>
                            </>
                        ),
                        answer: (
                            <>
                                <p><strong>Step 1: Find PV of dividends during non-constant growth (Years 1-3).</strong></p>
                                <ul className="list-disc pl-6 mb-4">
                                    <li>Year 1: <Katex latex="2.00 / (1.15)^1 = 1.74" /></li>
                                    <li>Year 2: <Katex latex="3.00 / (1.15)^2 = 2.27" /></li>
                                    <li>Year 3: <Katex latex="3.50 / (1.15)^3 = 2.30" /></li>
                                </ul>
                                <p><strong>Step 2: Find the Horizon Price (<Katex latex="P_3" />) at the end of the non-constant period.</strong></p>
                                <p>The dividend in Year 4 will be <Katex latex="3.50 \times 1.05 = 3.675" />.</p>
                                <Formula><Katex latex="P_3 = \frac{D_4}{R - g} = \frac{3.675}{0.15 - 0.05} = \$36.75" /></Formula>
                                <p><strong>Step 3: Discount the Horizon Price to PV.</strong></p>
                                <p>PV of <Katex latex="P_3" />: <Katex latex="36.75 / (1.15)^3 = 24.16" /></p>
                                <p><strong>Step 4: Sum all Present Values.</strong></p>
                                <Formula><Katex latex="P_0 = 1.74 + 2.27 + 2.30 + 24.16 = \$30.47" /></Formula>
                            </>
                        )
                    }
                ]
            }
        ]
    },
    module7: {
        title: "Module 7: Limitations & Alternatives",
        sections: [
            {
                title: "7.1 When DDM Fails",
                content: (
                    <>
                        <p>The Dividend Discount Model has a major flaw: <strong>It assumes the company pays dividends.</strong></p>
                        <p>Many tech giants like Amazon or Google didn't pay dividends for decades. For these companies, analysts use:</p>
                        <BulletedList items={[
                            <><strong>Discounted Cash Flow (DCF):</strong> Valuing the Free Cash Flows of the business instead of dividends.</>,
                            <><strong>Relative Valuation:</strong> Using multiples like P/E (Price-to-Earnings) ratios to compare with similar companies.</>
                        ]} />
                    </>
                )
            }
        ]
    }
};

// --- Module Components ---

const SimpleModule = ({ content, onComplete }) => (
    <motion.div>
        <h2 className="text-4xl font-extrabold text-gray-900 mb-4">{content.title}</h2>
        {content.sections.map((section, index) => (
            <React.Fragment key={index}>
                <Section title={section.title}>{section.content}</Section>
                {section.problems && section.problems.map((p, i) => (
                    <PracticeProblem key={i} title={p.title} problemNumber={`${index + 1}.${i + 1}`}>
                        {p.question}
                        <details className="bg-white p-3 rounded-md cursor-pointer hover:bg-gray-50 mt-2">
                            <summary className="font-semibold text-indigo-700">Show Answer</summary>
                            <div className="mt-4 p-4 bg-gray-50 rounded">{p.answer}</div>
                        </details>
                    </PracticeProblem>
                ))}
            </React.Fragment>
        ))}
        <button onClick={onComplete} className="w-full mt-8 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 text-xl transition-colors">Mark as Complete</button>
    </motion.div>
);

const DDMModule = ({ content, onComplete }) => {
    // Zero Growth State
    const [zgDividend, setZgDividend] = useState(2.00);
    const [zgRate, setZgRate] = useState(10);
    const zgPrice = zgDividend / (zgRate / 100);

    // Constant Growth State
    const [cgDividend, setCgDividend] = useState(2.00);
    const [cgRate, setCgRate] = useState(12);
    const [cgGrowth, setCgGrowth] = useState(5);

    const cgPrice = useMemo(() => {
        const r = cgRate / 100;
        const g = cgGrowth / 100;
        if (r <= g) return "Undefined (R must be > g)";
        return (cgDividend * (1 + g)) / (r - g);
    }, [cgDividend, cgRate, cgGrowth]);

    const chartData = useMemo(() => {
        const data = [];
        const r = cgRate / 100;
        const g = cgGrowth / 100;
        if (r <= g) return [];

        // Project for 20 years
        let currentDiv = cgDividend;
        for (let i = 0; i <= 20; i++) {
            data.push({
                year: i,
                dividend: currentDiv,
                price: (currentDiv * (1 + g)) / (r - g) // Price at year i
            });
            currentDiv = currentDiv * (1 + g);
        }
        return data;
    }, [cgDividend, cgRate, cgGrowth]);

    return (
        <motion.div>
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">{content.title}</h2>
            {content.sections.map((section, index) => (
                <React.Fragment key={index}>
                    <Section title={section.title}>{section.content}</Section>
                    {section.problems && section.problems.map((p, i) => (
                        <PracticeProblem key={i} title={p.title} problemNumber={`${index + 1}.${i + 1}`}>
                            {p.question}
                            <details className="bg-white p-3 rounded-md cursor-pointer hover:bg-gray-50 mt-2">
                                <summary className="font-semibold text-indigo-700">Show Answer</summary>
                                <div className="mt-4 p-4 bg-gray-50 rounded">{p.answer}</div>
                            </details>
                        </PracticeProblem>
                    ))}
                </React.Fragment>
            ))}

            <InteractivePlayground title="Dividend Discount Model Calculator">
                <div className="space-y-12">
                    {/* Zero Growth Section */}
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <h4 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Case 1: Zero Growth (Perpetuity)</h4>
                        <div className="grid md:grid-cols-2 gap-8 items-center">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Constant Dividend ($)</label>
                                    <input type="number" step="0.10" value={zgDividend} onChange={e => setZgDividend(Number(e.target.value))} className="w-full p-2 border rounded" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Required Return (R) %</label>
                                    <input type="number" step="0.5" value={zgRate} onChange={e => setZgRate(Number(e.target.value))} className="w-full p-2 border rounded" />
                                </div>
                            </div>
                            <div className="text-center p-6 bg-indigo-50 rounded-xl">
                                <div className="text-sm text-indigo-600 font-semibold uppercase tracking-wide">Stock Price</div>
                                <div className="text-4xl font-bold text-indigo-900">${zgPrice.toFixed(2)}</div>
                            </div>
                        </div>
                    </div>

                    {/* Constant Growth Section */}
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <h4 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Case 2: Constant Growth (Gordon Model)</h4>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Current Dividend (D0)</label>
                                    <input type="number" step="0.10" value={cgDividend} onChange={e => setCgDividend(Number(e.target.value))} className="w-full p-2 border rounded" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Growth Rate (g) %</label>
                                    <input type="range" min="0" max={cgRate - 1} step="0.5" value={cgGrowth} onChange={e => setCgGrowth(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
                                    <div className="text-right text-sm font-bold text-blue-600">{cgGrowth}%</div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Required Return (R) %</label>
                                    <input type="range" min={cgGrowth + 1} max="20" step="0.5" value={cgRate} onChange={e => setCgRate(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
                                    <div className="text-right text-sm font-bold text-blue-600">{cgRate}%</div>
                                </div>
                            </div>
                            <div className="md:col-span-2 flex flex-col justify-between">
                                <div className="text-center p-4 bg-green-50 rounded-xl mb-4">
                                    <div className="text-sm text-green-600 font-semibold uppercase tracking-wide">Projected Stock Price</div>
                                    <div className="text-4xl font-bold text-green-900">
                                        {typeof cgPrice === 'number' ? `$${cgPrice.toFixed(2)}` : cgPrice}
                                    </div>
                                    <div className="text-xs text-gray-500 mt-1">Next Dividend (D1): ${(cgDividend * (1 + cgGrowth / 100)).toFixed(2)}</div>
                                </div>
                                <div className="h-64 w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={chartData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="year" label={{ value: 'Years', position: 'insideBottom', offset: -5 }} />
                                            <YAxis yAxisId="left" label={{ value: 'Stock Price', angle: -90, position: 'insideLeft' }} />
                                            <YAxis yAxisId="right" orientation="right" label={{ value: 'Dividend', angle: 90, position: 'insideRight' }} />
                                            <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
                                            <Legend />
                                            <Line yAxisId="left" type="monotone" dataKey="price" name="Stock Price" stroke="#059669" strokeWidth={2} dot={false} />
                                            <Line yAxisId="right" type="monotone" dataKey="dividend" name="Dividend" stroke="#3b82f6" strokeWidth={2} dot={false} strokeDasharray="5 5" />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </InteractivePlayground>
            <button onClick={onComplete} className="w-full mt-8 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 text-xl transition-colors">Mark as Complete</button>
        </motion.div>
    );
};

const NonConstantGrowthModule = ({ content, onComplete }) => {
    const [d0, setD0] = useState(2.00);
    const [g1, setG1] = useState(20); // Supernormal growth
    const [years, setYears] = useState(3); // Duration of supernormal growth
    const [g2, setG2] = useState(5); // Stable growth
    const [r, setR] = useState(15); // Required return

    const calculation = useMemo(() => {
        const dividends = [];
        let currentD = d0;
        let pvDividends = 0;

        // 1. Forecast Dividends during high growth
        for (let t = 1; t <= years; t++) {
            currentD = currentD * (1 + g1 / 100);
            dividends.push({ year: t, amount: currentD, pv: currentD / Math.pow(1 + r / 100, t) });
            pvDividends += currentD / Math.pow(1 + r / 100, t);
        }

        // 2. Find Horizon Price (P_t)
        // The dividend at t+1 will grow at g2
        const d_next = currentD * (1 + g2 / 100);
        const horizonPrice = d_next / ((r / 100) - (g2 / 100));

        // 3. Discount Horizon Price
        const pvHorizon = horizonPrice / Math.pow(1 + r / 100, years);

        // 4. Total Price
        const totalPrice = pvDividends + pvHorizon;

        return { dividends, horizonPrice, pvHorizon, pvDividends, totalPrice };
    }, [d0, g1, years, g2, r]);

    return (
        <motion.div>
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">{content.title}</h2>
            {content.sections.map((section, index) => (
                <React.Fragment key={index}>
                    <Section title={section.title}>{section.content}</Section>
                    {section.problems && section.problems.map((p, i) => (
                        <PracticeProblem key={i} title={p.title} problemNumber={`${index + 1}.${i + 1}`}>
                            {p.question}
                            <details className="bg-white p-3 rounded-md cursor-pointer hover:bg-gray-50 mt-2">
                                <summary className="font-semibold text-indigo-700">Show Answer</summary>
                                <div className="mt-4 p-4 bg-gray-50 rounded">{p.answer}</div>
                            </details>
                        </PracticeProblem>
                    ))}
                </React.Fragment>
            ))}

            <InteractivePlayground title="Supernormal Growth Calculator">
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="space-y-4">
                        <SubHeading>Inputs</SubHeading>
                        <div><label>Current Dividend (D0): <span className="font-bold">${d0}</span></label><input type="number" step="0.1" value={d0} onChange={e => setD0(Number(e.target.value))} className="w-full p-2 border rounded" /></div>
                        <div><label>High Growth Rate (g1): <span className="font-bold text-blue-600">{g1}%</span></label><input type="range" min="0" max="50" value={g1} onChange={e => setG1(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" /></div>
                        <div><label>High Growth Years (t): <span className="font-bold text-blue-600">{years} yrs</span></label><input type="range" min="1" max="10" value={years} onChange={e => setYears(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" /></div>
                        <div><label>Stable Growth Rate (g2): <span className="font-bold text-green-600">{g2}%</span></label><input type="range" min="0" max="10" value={g2} onChange={e => setG2(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" /></div>
                        <div><label>Required Return (R): <span className="font-bold text-red-600">{r}%</span></label><input type="range" min="11" max="30" value={r} onChange={e => setR(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" /></div>
                    </div>

                    <div className="md:col-span-2 space-y-6">
                        <div className="bg-indigo-50 p-6 rounded-xl text-center border border-indigo-100">
                            <h4 className="text-lg font-semibold text-indigo-800">Calculated Stock Price (P0)</h4>
                            <p className="text-5xl font-bold text-indigo-900">${calculation.totalPrice.toFixed(2)}</p>
                            <div className="mt-2 text-sm text-indigo-600 flex justify-center gap-4">
                                <span>PV of Dividends: ${calculation.pvDividends.toFixed(2)}</span>
                                <span>+</span>
                                <span>PV of Horizon Price: ${calculation.pvHorizon.toFixed(2)}</span>
                            </div>
                        </div>

                        <div className="bg-white p-4 rounded-lg shadow-sm">
                            <h5 className="font-bold mb-2">Step-by-Step Breakdown</h5>
                            <table className="w-full text-sm text-left">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="p-2">Year</th>
                                        <th className="p-2">Dividend</th>
                                        <th className="p-2">PV of Div</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {calculation.dividends.map(d => (
                                        <tr key={d.year} className="border-t">
                                            <td className="p-2">{d.year}</td>
                                            <td className="p-2">${d.amount.toFixed(2)}</td>
                                            <td className="p-2 text-gray-500">${d.pv.toFixed(2)}</td>
                                        </tr>
                                    ))}
                                    <tr className="bg-green-50 border-t-2 border-green-100 font-semibold">
                                        <td className="p-2">Year {years} (Horizon)</td>
                                        <td className="p-2">Price: ${calculation.horizonPrice.toFixed(2)}</td>
                                        <td className="p-2 text-green-700">PV: ${calculation.pvHorizon.toFixed(2)}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </InteractivePlayground>
            <button onClick={onComplete} className="w-full mt-8 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 text-xl transition-colors">Mark as Complete</button>
        </motion.div>
    );
}

// --- Main Component ---

export default function StockValuationApp() {
    const [activeModule, setActiveModule] = useState(1);
    const [completedModules, setCompletedModules] = useState([]);

    const handleComplete = (moduleNumber) => {
        if (!completedModules.includes(moduleNumber)) {
            setCompletedModules(current => [...current, moduleNumber].sort((a, b) => a - b));
        }
    };

    const moduleData = [
        { id: 1, name: 'Debt vs. Equity', Component: SimpleModule, content: content.module1 },
        { id: 2, name: 'Market Operations', Component: SimpleModule, content: content.module2 },
        { id: 3, name: 'Preferred Stock', Component: SimpleModule, content: content.module3 },
        { id: 4, name: 'Valuation Principles', Component: SimpleModule, content: content.module4 },
        { id: 5, name: 'Dividend Discount Models', Component: DDMModule, content: content.module5 },
        { id: 6, name: 'Non-Constant Growth', Component: NonConstantGrowthModule, content: content.module6 },
        { id: 7, name: 'Limitations & Alternatives', Component: SimpleModule, content: content.module7 },
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
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Stock Valuation</h1>
                <p className="text-sm text-gray-500 mb-6">Equity Markets & DDM</p>
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
