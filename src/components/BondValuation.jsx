import React, { useState, useMemo, useEffect, useRef } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';

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

const RealLifeSituation = ({ title, children }) => (
    <div className="my-8 p-6 border-l-4 border-green-500 bg-green-50 rounded-r-lg shadow-sm">
        <h4 className="text-xl font-bold text-green-800 mb-4 flex items-center gap-2">
            <span>🌍</span> Real Life Situation: {title}
        </h4>
        <div className="prose max-w-none text-green-900">{children}</div>
    </div>
);

const DidYouKnow = ({ children }) => (
    <div className="my-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start gap-3">
        <span className="text-2xl">💡</span>
        <div className="text-yellow-900 italic">{children}</div>
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
    const ref = useRef();
    useEffect(() => {
        if (ref.current && window.katex) {
            window.katex.render(latex, ref.current, { throwOnError: false });
        }
    }, [latex]);
    return <span ref={ref} />;
};


// --- Content for All Modules ---
const content = {
    module1: {
        title: "Module 1: The Bond Indenture",
        sections: [
            {
                title: "1.1 The Rulebook of a Bond",
                content: (
                    <>
                        <p>While we know a bond is a loan, the specific rules of that loan are laid out in a legally binding document called the <KeyTerm>bond indenture</KeyTerm>. Think of it as the detailed contract between the bond issuer (borrower) and the bondholder (lender).</p>
                        <p>This document specifies all the critical details, including the par value, coupon rate, and maturity date. It also includes other important clauses to protect the bondholder.</p>
                        <SubHeading>Debt Covenants</SubHeading>
                        <p>These are rules the issuer must follow. They are designed to prevent the company from doing things that would make it harder for them to repay their debt.</p>
                        <BulletedList items={[
                            <><strong>Negative Covenants:</strong> Prohibit the company from taking certain actions. For example, a covenant might say "The company cannot sell specific assets" or "The company cannot take on additional debt beyond a certain limit."</>,
                            <><strong>Positive Covenants:</strong> Require the company to take certain actions. For example, a covenant might state "The company must maintain a specific financial ratio (like keeping debt below a certain level)" or "The company must provide audited financial statements every year."</>
                        ]} />
                        <DidYouKnow>
                            The first known bond in history dates back to 2400 BC in Mesopotamia! It guaranteed the payment of grain.
                        </DidYouKnow>
                    </>
                )
            }
        ]
    },
    module2: {
        title: "Module 2: Valuing Different Bond Types",
        sections: [
            {
                id: "2.1",
                title: "Fixed-Coupon Bonds (The Standard)",
                content: (
                    <>
                        <p>This is the most common type of bond. It pays a fixed coupon payment every period and the par value at maturity. As we've learned, its value is the PV of the coupon annuity plus the PV of the par value lump sum.</p>
                        <Formula><Katex latex={"\\text{Price} = \\left( C \\times \\frac{1 - (1+r)^{-t}}{r} \\right) + \\frac{FV}{(1+r)^t}"} /></Formula>
                    </>
                ),
                problems: [
                    {
                        title: "Valuing a Basic Bond",
                        question: "A bond has a $1,000 face value, a 5% coupon rate (paid annually), and 3 years to maturity. If the market interest rate for similar bonds is 6%, what is the price of this bond?",
                        answer: (
                            <>
                                <p>The annual coupon is $1000 * 5% = $50. We need to find the PV of each of the 3 coupon payments and the final $1000 par value, using the 6% market rate.</p>
                                <ul className="list-decimal pl-6">
                                    <li>PV of Year 1 Coupon: $50 / (1.06)¹ = $47.17</li>
                                    <li>PV of Year 2 Coupon: $50 / (1.06)² = $44.50</li>
                                    <li>PV of Year 3 Coupon: $50 / (1.06)³ = $41.98</li>
                                    <li>PV of Face Value: $1000 / (1.06)³ = $839.62</li>
                                </ul>
                                <p className="font-bold">Total Price = $47.17 + $44.50 + $41.98 + $839.62 = $973.27</p>
                            </>
                        )
                    },
                    {
                        title: "Premium Bond",
                        question: "What if the market interest rate in the previous question was 4% instead of 6%? What would the new bond price be?",
                        answer: (
                            <>
                                <p>The coupon is still $50. We just use the new market rate of 4% to discount the cash flows.</p>
                                <ul className="list-decimal pl-6">
                                    <li>PV of Year 1 Coupon: $50 / (1.04)¹ = $48.08</li>
                                    <li>PV of Year 2 Coupon: $50 / (1.04)² = $46.23</li>
                                    <li>PV of Year 3 Coupon: $50 / (1.04)³ = $44.45</li>
                                    <li>PV of Face Value: $1000 / (1.04)³ = $889.00</li>
                                </ul>
                                <p className="font-bold">Total Price = $48.08 + $46.23 + $44.45 + $889.00 = $1027.76</p>
                                <p className="mt-2 text-sm">Notice that because the coupon rate (5%) is higher than the market rate (4%), the bond sells for more than its face value (a premium).</p>
                            </>
                        )
                    }
                ]
            },
            {
                id: "2.2",
                title: "Zero-Coupon Bonds",
                content: (
                    <>
                        <p>A <KeyTerm>zero-coupon bond</KeyTerm> makes no periodic interest payments. Instead, it is sold at a deep discount to its face value and pays the full face value at maturity. The investor's return comes from the difference between the purchase price and the face value.</p>
                        <p>Valuing a zero-coupon bond is simple—it's just a single lump-sum PV calculation.</p>
                        <Formula><Katex latex={"\\text{Price} = \\frac{FV}{(1+r)^t}"} /></Formula>
                    </>
                ),
                problems: [
                    {
                        title: "Basic Zero",
                        question: "What is the price of a zero-coupon bond with a $1,000 face value, 10 years to maturity, and a market interest rate of 7%?",
                        answer: <p>Price = $1000 / (1.07)¹⁰ = $508.35</p>
                    },
                    {
                        title: "Long-Term Zero",
                        question: "Find the price of a zero-coupon bond with a $1,000 face value that matures in 30 years, if the market rate is 5%.",
                        answer: <p>Price = $1000 / (1.05)³⁰ = $231.38</p>
                    }
                ]
            },
            {
                id: "2.3",
                title: "Perpetual Bonds (Consols)",
                content: (
                    <>
                        <p>A <KeyTerm>perpetual bond</KeyTerm>, or consol, is a theoretical type of bond with no maturity date. It promises to pay a coupon forever. While very rare in practice, it's a useful concept in finance.</p>
                        <p>The valuation uses the perpetuity formula we've seen before.</p>
                        <Formula><Katex latex={"\\text{Price} = \\frac{C}{r}"} /></Formula>
                    </>
                ),
                problems: [
                    {
                        title: "University Consol",
                        question: "A university issues a perpetual bond that will pay $80 per year, forever. If the required return on this bond is 5%, what is its price?",
                        answer: <p>Price = $80 / 0.05 = $1,600</p>
                    },
                    {
                        title: "Finding the Yield",
                        question: "If a perpetual bond pays a $60 coupon and is currently selling for $1,200, what is its yield (the market rate)?",
                        answer: <p>We rearrange the formula: r = C / Price. So, r = $60 / $1200 = 0.05, or 5%.</p>
                    }
                ]
            }
        ]
    },
    module3: {
        title: "Module 3: Bond Ratings & Default Risk",
        sections: [
            {
                title: "3.1 Who Measures a Bond's Risk?",
                content: (
                    <>
                        <p>The biggest risk for a bondholder is that the issuer will fail to make its promised payments. This is called <KeyTerm>default risk</KeyTerm>. To help investors assess this risk, independent agencies like <KeyTerm>Moody's</KeyTerm> and <KeyTerm>Standard & Poor's (S&P)</KeyTerm> analyze the financial health of issuers and assign credit ratings to their bonds.</p>
                        <p>These ratings are a simple letter grade to indicate the level of default risk. The higher the rating (e.g., AAA), the lower the perceived risk.</p>
                        <BulletedList items={[
                            <><strong>Investment-Grade Bonds:</strong> Rated Baa (Moody's) or BBB (S&P) and higher. These are considered safe, stable investments suitable for institutions like pension funds.</>,
                            <><strong>Speculative-Grade (Junk) Bonds:</strong> Rated below Baa/BBB. These bonds carry higher default risk but must offer a much higher yield to compensate investors for that risk.</>
                        ]} />
                    </>
                )
            }
        ]
    },
    module4: {
        title: "Module 4: The Fisher Effect & Inflation",
        sections: [
            {
                title: "4.1 Real vs. Nominal Returns",
                content: (
                    <>
                        <p>Inflation erodes the purchasing power of your investment returns. It's crucial to distinguish between the rate you earn in dollars and the rate you earn in actual purchasing power.</p>
                        <BulletedList items={[
                            <><strong>Nominal Rate (R):</strong> The quoted interest rate. It's the percentage by which the number of dollars you have grows.</>,
                            <><strong>Real Rate (r):</strong> The rate at which your purchasing power grows. It's the nominal rate adjusted for inflation.</>,
                            <><strong>Inflation Rate (h):</strong> The rate at which prices are increasing.</>
                        ]} />
                        <p>The <KeyTerm>Fisher Effect</KeyTerm> describes the precise relationship between these three rates.</p>
                        <Formula><Katex latex={"(1+R) = (1+r)(1+h)"} /></Formula>
                        <DidYouKnow>
                            During the hyperinflation in Zimbabwe in 2008, prices doubled every 24 hours! This extreme example shows why understanding real vs. nominal rates is critical.
                        </DidYouKnow>
                    </>
                )
            }
        ]
    },
    module5: {
        title: "Module 5: The Yield Curve",
        sections: [
            {
                title: "5.1 The Term Structure of Interest Rates",
                content: (
                    <>
                        <p>The <KeyTerm>term structure of interest rates</KeyTerm> describes the relationship between the maturity of a bond and its yield, holding all other factors (like risk) constant. A graphical representation of this relationship is called the <KeyTerm>yield curve</KeyTerm>.</p>
                        <p>The shape of the yield curve is closely watched by economists as it can provide insights into the future direction of the economy.</p>
                        <BulletedList items={[
                            <><strong>Normal Yield Curve:</strong> Upward-sloping. Long-term bonds have higher yields than short-term bonds. This is the most common shape and suggests the economy is expected to grow.</>,
                            <><strong>Inverted Yield Curve:</strong> Downward-sloping. Short-term bonds have higher yields than long-term bonds. This is rare and often seen as a predictor of an economic recession.</>
                        ]} />
                    </>
                )
            }
        ]
    },
    module6: {
        title: "Module 6: Duration & Price Sensitivity",
        sections: [
            {
                title: "6.1 Why Bond Prices Change",
                content: (
                    <>
                        <p>Bond prices and interest rates have an <KeyTerm>inverse relationship</KeyTerm>. When interest rates go up, bond prices go down, and vice versa. But <em>how much</em> do they change? That depends on <KeyTerm>Duration</KeyTerm>.</p>
                        <p>Duration is a measure of a bond's sensitivity to changes in interest rates. It's essentially the weighted average time it takes to receive all the bond's cash flows.</p>
                        <BulletedList items={[
                            "Higher Duration = Higher Sensitivity. Long-term bonds and low-coupon bonds have higher durations.",
                            "Lower Duration = Lower Sensitivity. Short-term bonds and high-coupon bonds have lower durations."
                        ]} />
                        <RealLifeSituation title="The 2022 Rate Hikes">
                            <p>In 2022, Central Banks around the world raised interest rates aggressively to fight inflation. This caused a massive sell-off in the bond market.</p>
                            <p>Investors holding long-term government bonds (which are usually considered 'safe') saw the value of their portfolios drop by 20% or more! Why? Because those bonds had a high duration. When rates jumped from near 0% to 4%, the prices of those existing low-coupon bonds crashed to align with the new market yields.</p>
                        </RealLifeSituation>
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
            <Section key={index} title={section.title}>{section.content}</Section>
        ))}
        <button onClick={onComplete} className="w-full mt-8 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 text-xl transition-colors">Mark as Complete</button>
    </motion.div>
);

const BondTypesModule = ({ content, onComplete }) => {
    // State for Fixed-Coupon Bond Calculator
    const [fcPar, setFcPar] = useState(1000);
    const [fcCouponRate, setFcCouponRate] = useState(5);
    const [fcMarketRate, setFcMarketRate] = useState(6);
    const [fcYears, setFcYears] = useState(10);

    // State for Zero-Coupon Bond Calculator
    const [zcPar, setZcPar] = useState(1000);
    const [zcMarketRate, setZcMarketRate] = useState(7);
    const [zcYears, setZcYears] = useState(10);

    // State for Perpetual Bond Calculator
    const [pCoupon, setPCoupon] = useState(80);
    const [pMarketRate, setPMarketRate] = useState(5);

    const fcBondPrice = useMemo(() => {
        const c = fcPar * (fcCouponRate / 100);
        const r = fcMarketRate / 100;
        if (r <= 0) return fcPar + c * fcYears;
        const pvAnnuityFactor = (1 - Math.pow(1 + r, -fcYears)) / r;
        const pvCoupons = c * pvAnnuityFactor;
        const pvPar = fcPar / Math.pow(1 + r, fcYears);
        return pvCoupons + pvPar;
    }, [fcPar, fcCouponRate, fcMarketRate, fcYears]);

    const zcBondPrice = useMemo(() => {
        const r = zcMarketRate / 100;
        if (r < 0) return Infinity;
        return zcPar / Math.pow(1 + r, zcYears);
    }, [zcPar, zcMarketRate, zcYears]);

    const pBondPrice = useMemo(() => {
        const r = pMarketRate / 100;
        if (r <= 0) return Infinity;
        return pCoupon / r;
    }, [pCoupon, pMarketRate]);

    return (
        <motion.div>
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">{content.title}</h2>
            {content.sections.map((section, index) => (
                <React.Fragment key={index}>
                    <Section title={section.title}>{section.content}</Section>
                    {section.problems && section.problems.map((p, i) => (
                        <PracticeProblem key={i} title={p.title} problemNumber={`${section.id}.${i + 1}`}>
                            <p>{p.question}</p>
                            <details className="bg-white p-3 rounded-md cursor-pointer hover:bg-gray-50">
                                <summary className="font-semibold text-indigo-700">Show Answer</summary>
                                <div className="mt-4 p-4 bg-gray-50 rounded">{p.answer}</div>
                            </details>
                        </PracticeProblem>
                    ))}
                </React.Fragment>
            ))}
            <InteractivePlayground title="Bond Type Calculators">
                <div className="grid md:grid-cols-3 gap-8">
                    {/* Fixed Coupon Bond Area */}
                    <div className="bg-white p-6 rounded-lg shadow space-y-3">
                        <SubHeading>Fixed-Coupon Bond</SubHeading>
                        <div><label>Par Value: <span className="font-bold">${fcPar}</span></label><input type="range" min="100" max="2000" step="100" value={fcPar} onChange={e => setFcPar(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" /></div>
                        <div><label>Coupon Rate: <span className="font-bold">{fcCouponRate}%</span></label><input type="range" min="1" max="15" step="0.5" value={fcCouponRate} onChange={e => setFcCouponRate(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" /></div>
                        <div><label>Market Rate: <span className="font-bold">{fcMarketRate}%</span></label><input type="range" min="1" max="15" step="0.5" value={fcMarketRate} onChange={e => setFcMarketRate(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" /></div>
                        <div><label>Years: <span className="font-bold">{fcYears}</span></label><input type="range" min="1" max="30" value={fcYears} onChange={e => setFcYears(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" /></div>
                        <div className="text-center text-indigo-600 font-bold text-2xl mt-4 p-4 bg-indigo-50 rounded">${fcBondPrice.toFixed(2)}</div>
                    </div>
                    {/* Zero-Coupon Bond Area */}
                    <div className="bg-white p-6 rounded-lg shadow space-y-3">
                        <SubHeading>Zero-Coupon Bond</SubHeading>
                        <div><label>Face Value: <span className="font-bold">${zcPar}</span></label><input type="range" min="1000" max="5000" step="500" value={zcPar} onChange={e => setZcPar(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" /></div>
                        <div><label>Market Rate: <span className="font-bold">{zcMarketRate}%</span></label><input type="range" min="1" max="15" step="0.5" value={zcMarketRate} onChange={e => setZcMarketRate(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" /></div>
                        <div><label>Years: <span className="font-bold">{zcYears}</span></label><input type="range" min="1" max="30" value={zcYears} onChange={e => setZcYears(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" /></div>
                        <div className="text-center text-indigo-600 font-bold text-2xl mt-4 p-4 bg-indigo-50 rounded">${zcBondPrice.toFixed(2)}</div>
                    </div>
                    {/* Perpetual Bond Area */}
                    <div className="bg-white p-6 rounded-lg shadow space-y-3">
                        <SubHeading>Perpetual Bond</SubHeading>
                        <div><label>Annual Coupon: <span className="font-bold">${pCoupon}</span></label><input type="range" min="10" max="200" step="10" value={pCoupon} onChange={e => setPCoupon(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" /></div>
                        <div><label>Market Rate: <span className="font-bold">{pMarketRate}%</span></label><input type="range" min="1" max="15" step="0.5" value={pMarketRate} onChange={e => setPMarketRate(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" /></div>
                        <div className="text-center text-indigo-600 font-bold text-2xl mt-4 p-4 bg-indigo-50 rounded">${pBondPrice === Infinity ? 'N/A' : pBondPrice.toFixed(2)}</div>
                    </div>
                </div>
            </InteractivePlayground>
            <button onClick={onComplete} className="w-full mt-8 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 text-xl transition-colors">Mark as Complete</button>
        </motion.div>
    );
};

const BondRatingModule = ({ content, onComplete }) => {
    const [rating, setRating] = useState(8); // 1-10 scale
    const ratings = ['AAA', 'AA', 'A', 'BBB', 'BB', 'B', 'CCC', 'CC', 'C', 'D'];
    const baseYield = 3.0;
    const spreads = [0.5, 0.7, 1.0, 1.5, 2.5, 4.0, 6.0, 8.5, 11.0, 15.0];
    const bondYield = baseYield + spreads[rating - 1];

    return (
        <motion.div>
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">{content.title}</h2>
            {content.sections.map((s, i) => <Section key={i} title={s.title}>{s.content}</Section>)}
            <InteractivePlayground title="Ratings and Yield Spreads">
                <p className="text-center mb-6">See how a bond's credit rating impacts the yield it must offer. Lower ratings mean higher risk, so investors demand a higher return.</p>
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="space-y-4">
                        <label>Bond Credit Rating: <span className="font-bold text-blue-600">{ratings[rating - 1]}</span></label>
                        <input type="range" min="1" max="10" step="1" value={rating} onChange={e => setRating(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md text-center">
                        <h4 className="text-xl font-semibold mb-2">Required Yield to Maturity</h4>
                        <p className="text-4xl font-bold text-indigo-600">{bondYield.toFixed(2)}%</p>
                        <p className="text-sm mt-2">({baseYield}% Risk-Free Rate + {spreads[rating - 1]}% Default Risk Premium)</p>
                    </div>
                </div>
            </InteractivePlayground>
            <button onClick={onComplete} className="w-full mt-8 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 text-xl transition-colors">Mark as Complete</button>
        </motion.div>
    );
};

const FisherEffectModule = ({ content, onComplete }) => {
    const [realRate, setRealRate] = useState(2);
    const [inflation, setInflation] = useState(3);
    const nominalRate = useMemo(() => {
        const r = realRate / 100;
        const h = inflation / 100;
        return ((1 + r) * (1 + h) - 1) * 100;
    }, [realRate, inflation]);

    return (
        <motion.div>
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">{content.title}</h2>
            {content.sections.map((s, i) => <Section key={i} title={s.title}>{s.content}</Section>)}
            <InteractivePlayground title="Fisher Effect Calculator">
                <div className="grid md:grid-cols-3 gap-8 items-center">
                    <div className="space-y-2">
                        <label>Real Rate (r): <span className="font-bold text-blue-600">{realRate}%</span></label>
                        <input type="range" min="0" max="10" step="0.5" value={realRate} onChange={e => setRealRate(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
                    </div>
                    <div className="space-y-2">
                        <label>Inflation (h): <span className="font-bold text-blue-600">{inflation}%</span></label>
                        <input type="range" min="0" max="10" step="0.5" value={inflation} onChange={e => setInflation(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md text-center">
                        <h4 className="text-xl font-semibold mb-2">Nominal Rate (R)</h4>
                        <p className="text-4xl font-bold text-indigo-600">{nominalRate.toFixed(2)}%</p>
                    </div>
                </div>
            </InteractivePlayground>
            <button onClick={onComplete} className="w-full mt-8 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 text-xl transition-colors">Mark as Complete</button>
        </motion.div>
    );
};

const YieldCurveModule = ({ content, onComplete }) => {
    const [curveType, setCurveType] = useState('normal');
    const data = [
        { m: 1, normal: 3.0, inverted: 5.0 }, { m: 2, normal: 3.5, inverted: 4.5 },
        { m: 5, normal: 4.0, inverted: 4.0 }, { m: 10, normal: 4.3, inverted: 3.5 },
        { m: 20, normal: 4.5, inverted: 3.2 }, { m: 30, normal: 4.6, inverted: 3.1 }
    ];

    return (
        <motion.div>
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">{content.title}</h2>
            {content.sections.map((s, i) => <Section key={i} title={s.title}>{s.content}</Section>)}
            <InteractivePlayground title="Yield Curve Shapes">
                <div className="flex justify-center mb-4">
                    <button onClick={() => setCurveType('normal')} className={`px-4 py-2 rounded-l-lg ${curveType === 'normal' ? 'bg-indigo-600 text-white' : 'bg-gray-300'}`}>Normal</button>
                    <button onClick={() => setCurveType('inverted')} className={`px-4 py-2 rounded-r-lg ${curveType === 'inverted' ? 'bg-indigo-600 text-white' : 'bg-gray-300'}`}>Inverted</button>
                </div>
                <div className="h-96">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 20 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="m" unit="-yr" label={{ value: 'Maturity', position: 'insideBottom', offset: -10 }} />
                            <YAxis unit="%" domain={[2, 6]} />
                            <Tooltip />
                            <Line type="monotone" name="Yield" dataKey={curveType} stroke="#8884d8" strokeWidth={3} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </InteractivePlayground>
            <button onClick={onComplete} className="w-full mt-8 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 text-xl transition-colors">Mark as Complete</button>
        </motion.div>
    )
}

const DurationModule = ({ content, onComplete }) => {
    const [coupon, setCoupon] = useState(5);
    const [years, setYears] = useState(10);

    // Generate price-yield curve data
    const curveData = useMemo(() => {
        const data = [];
        for (let y = 0; y <= 15; y += 0.5) {
            const r = y / 100;
            let price;
            if (r === 0) {
                price = 1000 + (1000 * (coupon / 100) * years);
            } else {
                const c = 1000 * (coupon / 100);
                price = (c * (1 - Math.pow(1 + r, -years)) / r) + (1000 / Math.pow(1 + r, years));
            }
            data.push({ yield: y, price });
        }
        return data;
    }, [coupon, years]);

    return (
        <motion.div>
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">{content.title}</h2>
            {content.sections.map((s, i) => <Section key={i} title={s.title}>{s.content}</Section>)}
            <InteractivePlayground title="Price-Yield Curve & Sensitivity">
                <div className="grid md:grid-cols-3 gap-8 items-center">
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Coupon Rate (%)</label>
                            <input type="range" min="0" max="15" step="0.5" value={coupon} onChange={e => setCoupon(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
                            <div className="text-right font-bold text-blue-600">{coupon}%</div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Years to Maturity</label>
                            <input type="range" min="1" max="30" step="1" value={years} onChange={e => setYears(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
                            <div className="text-right font-bold text-blue-600">{years} years</div>
                        </div>
                        <div className="p-4 bg-blue-50 rounded text-sm text-blue-800">
                            <p>Observe how the curve gets <strong>steeper</strong> as you increase the years. A steeper curve means the price changes <em>more</em> for a small change in yield (High Duration).</p>
                        </div>
                    </div>
                    <div className="md:col-span-2 h-96">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={curveData} margin={{ top: 10, right: 30, left: 20, bottom: 30 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="yield" label={{ value: 'Yield (%)', position: 'insideBottom', offset: -20 }} type="number" domain={[0, 15]} />
                                <YAxis label={{ value: 'Bond Price ($)', angle: -90, position: 'insideLeft' }} domain={['auto', 'auto']} />
                                <Tooltip formatter={(val) => `$${val.toFixed(2)}`} labelFormatter={(val) => `Yield: ${val}%`} />
                                <Line type="monotone" dataKey="price" stroke="#4f46e5" strokeWidth={3} dot={false} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </InteractivePlayground>
            <button onClick={onComplete} className="w-full mt-8 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 text-xl transition-colors">Mark as Complete</button>
        </motion.div>
    );
};

// --- Main Application Component ---
export default function BondValuationApp() {
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
        { id: 1, name: 'The Bond Indenture', Component: SimpleModule, content: content.module1 },
        { id: 2, name: 'Valuing Bond Types', Component: BondTypesModule, content: content.module2 },
        { id: 3, name: 'Bond Ratings & Risk', Component: BondRatingModule, content: content.module3 },
        { id: 4, name: 'Inflation & Fisher Effect', Component: FisherEffectModule, content: content.module4 },
        { id: 5, name: 'The Yield Curve', Component: YieldCurveModule, content: content.module5 },
        { id: 6, name: 'Duration & Sensitivity', Component: DurationModule, content: content.module6 },
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
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Advanced Bond Valuation</h1>
                <p className="text-sm text-gray-500 mb-6">A Deep Dive</p>
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
