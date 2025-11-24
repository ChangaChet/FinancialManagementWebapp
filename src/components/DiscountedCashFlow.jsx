import React, { useState, useMemo, useEffect, useRef } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, BarChart, Bar } from 'recharts';
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
    <div className="my-8 p-6 border-l-4 border-green-50 bg-green-50 rounded-r-lg shadow-sm">
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

const KeyTerm = ({ children }) => <span className="font-bold text-indigo-600 bg-indigo-50 px-1 rounded border border-indigo-100">{children}</span>;
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
        title: "Module 1: Why Time Matters for Money",
        sections: [
            {
                title: "1.1 The Universal Truth: A Dollar Today is Worth More Than a Dollar Tomorrow",
                content: (
                    <>
                        <p>Welcome to the foundational concept of all finance: the <KeyTerm>Time Value of Money (TVM)</KeyTerm>. It sounds complex, but it's built on a simple, intuitive idea you already understand. If someone offered you $100 today or $100 one year from now, which would you choose? You'd take the money today, of course! But why?</p>
                        <BulletedList items={[
                            "Opportunity Cost: Money you have today can be invested to earn more money. That $100 could be put in a savings account, earning interest. By taking it later, you miss out on that potential growth.",
                            "Inflation: Over time, the prices of goods and services tend to rise. The $100 you receive a year from now will likely buy less than $100 today. Your 'purchasing power' decreases.",
                            "Certainty: Having the money now is a sure thing. The future always carries some uncertainty."
                        ]} />
                        <RealLifeSituation title="The Lottery Dilemma">
                            <p>Imagine you win a $10 million lottery jackpot! 🎉 You are presented with two options:</p>
                            <ul className="list-decimal pl-6 mt-2 mb-4">
                                <li><strong>Lump Sum:</strong> Receive $6 million cash immediately.</li>
                                <li><strong>Annuity:</strong> Receive the full $10 million, but paid out as $333,333 every year for 30 years.</li>
                            </ul>
                            <p>Many people instinctively want the "full" $10 million. However, TVM teaches us that the $333,333 you get in year 30 is worth <em>far less</em> than $333,333 today due to inflation and lost investment opportunity. Financial experts often advise taking the lump sum because if you invest that $6 million wisely (even at a modest 5-6% return), it could grow to significantly more than $10 million over 30 years!</p>
                        </RealLifeSituation>
                        <DidYouKnow>
                            The concept of interest dates back to ancient Babylon (c. 2000 BC)! Grain was loaned out, and the borrower had to return the grain plus a portion of the new harvest as interest.
                        </DidYouKnow>
                    </>
                )
            }
        ]
    },
    module2: {
      title: "Module 2: Future Value (FV)",
      sections: [
        {
          title: "2.1 Core Concept: Compounding",
          content: (
            <>
              <p>Future Value (FV) answers the question: "If I invest money today, how much will it be worth in the future?" The engine that drives this growth is <KeyTerm>compounding</KeyTerm>. It’s what Albert Einstein supposedly called the "eighth wonder of the world."</p>
              <p>Compounding is the process of earning interest on your interest. In the first year, you earn interest on your initial investment (the principal). In the second year, you earn interest on the principal *plus* the interest from the first year. This creates a snowball effect.</p>
              <Formula><Katex latex={"FV = PV \\times (1 + r)^t"} /></Formula>
              <SubHeading>Solving in Excel</SubHeading>
              <p>In Excel, you can easily find the future value using the `FV` function. The structure is <code className="bg-gray-200 p-1 rounded">=FV(rate, nper, pmt, [pv], [type])</code>. For a single lump-sum investment like this, the `pmt` (payment) would be 0.</p>
            </>
          )
        }
      ],
      problems: [
        {
          title: "Retirement Savings",
          question: <p>You make your first $4,000 contribution to a retirement account. Assuming you earn an 11% rate of return and make no additional contributions, what will your account be worth when you retire in 45 years?</p>,
          answer: (
            <>
              <p className="mt-2">PV = $4,000, r = 11%, t = 45 years. In Excel: <code className="bg-gray-200 p-1 rounded">=FV(0.11, 45, 0, -4000)</code></p>
              <Formula><Katex latex={"FV = \\$4,000 \\times (1 + 0.11)^{45} = \\$441,127.53"} /></Formula>
            </>
          )
        }
      ]
    },
    module3: {
      title: "Module 3: Present Value (PV)",
      sections: [
          {
              title: "3.1 Core Concept: Discounting",
              content: (
                   <>
                      <p>Present Value (PV) is the reverse of Future Value. It answers: "If I am promised money in the future, what is its value to me right now?" The process of finding this is called <KeyTerm>discounting</KeyTerm>.</p>
                      <p>The interest rate `r` in this context is often called the <KeyTerm>discount rate</KeyTerm>. Think of it as the 'gravity' of time, pulling the value of future money down. A higher discount rate means future cash is worth much less today.</p>
                       <Formula><Katex latex={"PV = \\frac{FV}{(1 + r)^t}"} /></Formula>
                       <SubHeading>Solving in Excel</SubHeading>
                       <p>Excel's `PV` function is perfect for this. The structure is <code className="bg-gray-200 p-1 rounded">=PV(rate, nper, pmt, [fv], [type])</code>. Just like with the FV function, the `pmt` would be 0 for a single future amount.</p>
                   </>
              )
          }
      ],
      problems: [
          {
              title: "The Lottery Windfall",
              question: <p>You win a $1 million lottery prize to be awarded on your 100th birthday, 80 years from now. What is the present value of your windfall if the appropriate discount rate is 10%?</p>,
              answer: (
                   <>
                      <p className="mt-2">FV = $1,000,000, r = 10%, t = 80 years. In Excel: <code className="bg-gray-200 p-1 rounded">=PV(0.10, 80, 0, -1000000)</code></p>
                      <Formula><Katex latex={"PV = \\frac{\\$1,000,000}{(1 + 0.10)^{80}} = \\$488.19"} /></Formula>
                   </>
              )
          }
      ]
    },
    module4: {
        title: "Module 4: Solving for Rate (r) and Time (t)",
        sections: [
            {
                title: "4.1 Finding the Implied Interest Rate (r)",
                content: (
                    <>
                        <p>Sometimes you know the start and end values but need to find the growth rate. By rearranging the FV formula, we can solve for `r`.</p>
                        <Formula><Katex latex={"r = \\left(\\frac{FV}{PV}\\right)^{\\frac{1}{t}} - 1"} /></Formula>
                        <SubHeading>Solving in Excel</SubHeading>
                        <p>Excel's `RATE` function is ideal here: <code className="bg-gray-200 p-1 rounded">=RATE(nper, pmt, pv, [fv], [type])</code>. It's a powerful tool when you need to find the implied interest rate of a loan or investment.</p>
                    </>
                )
            },
            {
                title: "4.2 Finding the Number of Periods (t)",
                content: (
                    <>
                        <p>Similarly, we can determine how long it will take for an investment to grow to a certain amount.</p>
                        <Formula><Katex latex={"t = \\frac{\\ln(FV / PV)}{\\ln(1 + r)}"} /></Formula>
                        <SubHeading>Solving in Excel</SubHeading>
                        <p>To find the number of periods, use the `NPER` function: <code className="bg-gray-200 p-1 rounded">=NPER(rate, pmt, pv, [fv], [type])</code>.</p>
                    </>
                )
            }
        ],
        problems: [
            {
                title: "Zero-Coupon Bond",
                question: <p>A 30-year zero-coupon bond was sold for $24,099 and has a face value of $100,000 that it will pay at maturity. What is the annual rate of return for an investor who holds it to maturity?</p>,
                answer: (
                    <>
                        <p>PV = $24,099, FV = $100,000, t = 30. In Excel: <code className="bg-gray-200 p-1 rounded">=RATE(30, 0, -24099, 100000)</code></p>
                        <Formula><Katex latex={"r = (\\$100,000 / \\$24,099)^{1/30} - 1 = 4.8\%"} /></Formula>
                    </>
                )
            }
        ]
    },
    module5: {
      title: "Module 5: Annuities",
      sections: [
          {
              title: "5.1 Core Concept: Valuing a Stream of Payments",
              content: (
                   <>
                      <p>An <KeyTerm>annuity</KeyTerm> is a series of equal payments made at regular intervals. Think of a car loan or retirement savings. How do we value the whole stream?</p>
                      <p>The secret is that an annuity is just a collection of single payments. To find its total value, we can simply find the value of each individual payment and add them all up. This is the "long way" to do it, but it's the most intuitive.</p>
                      <SubHeading>The "Long Way" vs. The Excel Way</SubHeading>
                      <p>You could calculate the PV of every single payment and sum them, but that's tedious. In your class, you'll use Excel's powerful functions to do this instantly:</p>
                      <BulletedList items={[
                          <>For Present Value: <code className="bg-gray-200 p-1 rounded">=PV(rate, nper, pmt)</code></>,
                          <>For Future Value: <code className="bg-gray-200 p-1 rounded">=FV(rate, nper, pmt)</code></>
                      ]} />
                      <p>Our interactive tool below shows you both methods at once so you can see how they connect.</p>
                   </>
              )
          }
      ],
      problems: [
        {
          title: "Car Loan",
          question: <p>You borrow $50,000 to buy a car. The loan requires annual payments of $14,000 for the next six years. What is the interest rate on your loan?</p>,
          answer: <p className="mt-2">This requires solving for 'r' in an annuity. It's much faster with Excel's <code className="bg-gray-200 p-1 rounded">=RATE(nper, pmt, pv)</code> function. The answer is approximately 11.9%.</p>
        }
      ]
    },
    module6: {
        title: "Module 6: Perpetuities",
        sections: [
            {
                title: "6.1 Core Concept: Payments Forever",
                content: (
                    <>
                        <p>A <KeyTerm>perpetuity</KeyTerm> is a special type of annuity that continues forever. While rare, they are a key concept for valuing things like university endowments or certain types of preferred stocks.</p>
                        <Formula><Katex latex={"PV = \\frac{C}{r}"} /></Formula>
                        <SubHeading>Solving in Excel</SubHeading>
                        <p>Excel doesn't have a specific PERPETUITY function. Since the formula is so simple, you just calculate it directly in a cell. For example, if your payment `C` is in cell A1 and your rate `r` is in B1, you would just type <code className="bg-gray-200 p-1 rounded">=A1/B1</code>.</p>
                    </>
                )
            }
        ],
        problems: [
            {
                title: "University Endowment",
                question: <p>You want to endow a scholarship that pays out $50,000 every year, forever. If the university can earn 8% on its investments, how much do you need to donate?</p>,
                answer: <Formula><Katex latex={"PV = \\$50,000 / 0.08 = \\$625,000"} /></Formula>
            }
        ]
    },
    module7: {
      title: "Module 7: APR vs. EAR",
      sections: [
          {
              title: "7.1 Core Concept: The True Cost of Borrowing",
              content: (
                   <>
                      <p>Interest rates can be misleading. The <KeyTerm>Annual Percentage Rate (APR)</KeyTerm> is the simple, quoted rate. However, the <KeyTerm>Effective Annual Rate (EAR)</KeyTerm> is the actual rate you pay or earn once compounding is taken into account. Always compare EARs to make a true comparison.</p>
                      <Formula><Katex latex={"EAR = \\left(1 + \\frac{APR}{m}\\right)^m - 1"} /></Formula>
                      <p>Here, 'm' is the number of times the interest is compounded per year.</p>
                      <SubHeading>Solving in Excel</SubHeading>
                      <p>To find the Effective Annual Rate in Excel, you can use the `EFFECT` function. The structure is <code className="bg-gray-200 p-1 rounded">=EFFECT(nominal_rate, npery)</code>, where `nominal_rate` is the APR and `npery` is the number of compounding periods per year (m).</p>
                   </>
              )
          }
      ],
      problems: [
          {
              title: "Pawn Shop Loan",
              question: <p>A pawn shop charges 30% per month. What is the APR they must report, and what is the EAR that customers actually pay?</p>,
              answer: (
                  <>
                      <SubHeading>1. Calculate the APR</SubHeading>
                      <Formula><Katex latex={"APR = 30\\% \\times 12 = 360\\%"} /></Formula>
                      <SubHeading>2. Calculate the EAR</SubHeading>
                      <p className="mt-2">In Excel: <code className="bg-gray-200 p-1 rounded">=EFFECT(3.60, 12)</code></p>
                      <Formula><Katex latex={"EAR = (1 + 0.30)^{12} - 1 = 2,229.8\\%"} /></Formula>
                  </>
              )
          }
      ]
    },
    module8: {
        title: "Module 8: NPV & IRR (Capital Budgeting)",
        sections: [
            {
                title: "8.1 Making Investment Decisions",
                content: (
                    <>
                        <p>How do businesses decide whether to build a new factory or launch a new product? They use <KeyTerm>Net Present Value (NPV)</KeyTerm> and <KeyTerm>Internal Rate of Return (IRR)</KeyTerm>.</p>
                        <BulletedList items={[
                            "NPV: The difference between the present value of cash inflows and the present value of cash outflows. If NPV > 0, the project adds value and should be accepted.",
                            "IRR: The discount rate that makes the NPV equal to zero. It represents the expected annual return of the project. If IRR > Required Return, the project is good."
                        ]} />
                        <Formula><Katex latex={"NPV = \\sum_{t=0}^{n} \\frac{CF_t}{(1+r)^t}"} /></Formula>
                    </>
                )
            }
        ]
    }
};

// --- Module Components ---

const IntroductionModule = ({ content, onComplete }) => (
    <motion.div>
        <h2 className="text-4xl font-extrabold text-gray-900 mb-4">{content.title}</h2>
        {content.sections.map((section, index) => (
            <Section key={index} title={section.title}>{section.content}</Section>
        ))}
        <button onClick={onComplete} className="w-full mt-8 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 text-xl transition-colors">Mark as Complete</button>
    </motion.div>
);

const FutureValueModule = ({ content, onComplete }) => {
    const [pv, setPv] = useState(1000);
    const [rate, setRate] = useState(10);
    const [time, setTime] = useState(20);
    const [compounding, setCompounding] = useState(1); // 1 = Annual, 12 = Monthly
    
    const fvData = useMemo(() => Array.from({ length: time + 1 }, (_, i) => {
        const years = i;
        const annualFV = pv * Math.pow(1 + rate / 100, years);
        const monthlyFV = pv * Math.pow(1 + (rate / 100) / 12, years * 12);
        return {
            year: years,
            Annual: annualFV,
            Monthly: monthlyFV
        };
    }), [pv, rate, time]);

    return (
        <motion.div>
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">{content.title}</h2>
            {content.sections.map((section, index) => (
                <Section key={index} title={section.title}>{section.content}</Section>
            ))}
            <InteractivePlayground title="Future Value & Compounding Power">
                <div className="grid md:grid-cols-3 gap-8 items-center">
                    <div className="md:col-span-1 space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Present Value (PV)</label>
                            <div className="flex items-center gap-2">
                                <span className="text-lg font-bold text-blue-600 w-20">${pv.toLocaleString()}</span>
                                <input type="range" min="100" max="10000" step="100" value={pv} onChange={e => setPv(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Interest Rate (r)</label>
                            <div className="flex items-center gap-2">
                                <span className="text-lg font-bold text-blue-600 w-20">{rate}%</span>
                                <input type="range" min="1" max="25" value={rate} onChange={e => setRate(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Time Periods (t)</label>
                            <div className="flex items-center gap-2">
                                <span className="text-lg font-bold text-blue-600 w-20">{time} yrs</span>
                                <input type="range" min="1" max="50" value={time} onChange={e => setTime(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
                            </div>
                        </div>
                        <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                            <h5 className="font-bold text-blue-800 mb-2">Impact of Frequency</h5>
                            <p className="text-sm text-blue-700 mb-2">Compare Annual vs. Monthly compounding:</p>
                            <div className="flex justify-between text-sm">
                                <span>Annual FV:</span>
                                <span className="font-bold">${fvData[time].Annual.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span>Monthly FV:</span>
                                <span className="font-bold text-green-600">${fvData[time].Monthly.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
                            </div>
                            <div className="mt-2 text-xs text-gray-500 text-right">Difference: +${(fvData[time].Monthly - fvData[time].Annual).toLocaleString(undefined, {maximumFractionDigits: 0})}</div>
                        </div>
                    </div>
                    <div className="md:col-span-2 h-96 bg-white p-4 rounded-lg border border-gray-100">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={fvData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                <XAxis dataKey="year" label={{ value: 'Years', position: 'insideBottom', offset: -10 }} />
                                <YAxis tickFormatter={(v) => `$${Math.round(v/1000)}k`} label={{ value: 'Value', angle: -90, position: 'insideLeft' }}/>
                                <Tooltip formatter={(v) => `$${v.toLocaleString(undefined, {maximumFractionDigits: 2})}`} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
                                <Legend verticalAlign="top" height={36}/>
                                <Line type="monotone" dataKey="Annual" name="Annual Compounding" stroke="#3b82f6" strokeWidth={3} dot={false} />
                                <Line type="monotone" dataKey="Monthly" name="Monthly Compounding" stroke="#10b981" strokeWidth={3} dot={false} strokeDasharray="5 5" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </InteractivePlayground>
            {content.problems.map((p, i) => <PracticeProblem key={i} title={p.title} problemNumber={i+1}>{p.question}{p.answer}</PracticeProblem>)}
            <button onClick={onComplete} className="w-full mt-8 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 text-xl transition-colors">Mark as Complete</button>
        </motion.div>
    );
};

const PresentValueModule = ({ content, onComplete }) => {
    const [fv, setFv] = useState(10000);
    const [rate, setRate] = useState(8);
    const [time, setTime] = useState(10);

    const chartData = useMemo(() => Array.from({ length: time + 1 }, (_, i) => ({
            year: i,
            value: fv / Math.pow(1 + rate / 100, time - i)
    })), [fv, rate, time]);
    const currentPv = fv / Math.pow(1 + rate/100, time);

    return (
        <motion.div>
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">{content.title}</h2>
            {content.sections.map((s, i) => <Section key={i} title={s.title}>{s.content}</Section>)}
            <InteractivePlayground title="Present Value Interactive Graph">
                 <h4 className="text-center text-2xl font-bold mb-6">Calculated PV: <span className="text-indigo-600">${currentPv.toLocaleString(undefined, {maximumFractionDigits: 2})}</span></h4>
                <div className="grid md:grid-cols-3 gap-8 items-center">
                    <div className="md:col-span-1 space-y-4">
                        <div>
                            <label>Future Value (FV): <span className="font-bold text-blue-600">${fv.toLocaleString()}</span></label>
                            <input type="range" min="1000" max="50000" step="1000" value={fv} onChange={e => setFv(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
                        </div>
                        <div>
                            <label>Discount Rate (r): <span className="font-bold text-blue-600">{rate}%</span></label>
                            <input type="range" min="1" max="25" value={rate} onChange={e => setRate(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
                        </div>
                        <div>
                            <label>Time Periods (t): <span className="font-bold text-blue-600">{time} years</span></label>
                            <input type="range" min="1" max="50" value={time} onChange={e => setTime(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
                        </div>
                    </div>
                    <div className="md:col-span-2 h-80">
                         <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="year" label={{ value: 'Years from Today', position: 'insideBottom', offset: -10 }} />
                                <YAxis domain={[0, fv]} tickFormatter={(v) => `$${Math.round(v/1000)}k`} label={{ value: 'Value', angle: -90, position: 'insideLeft' }} />
                                <Tooltip formatter={(v) => `$${v.toLocaleString(undefined, {maximumFractionDigits: 2})}`} />
                                <Line type="monotone" dataKey="value" name={`Value of receiving $${fv.toLocaleString()} in Year ${time}`} stroke="#3b82f6" strokeWidth={2} dot={false} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </InteractivePlayground>
            {content.problems.map((p, i) => <PracticeProblem key={i} title={p.title} problemNumber={i+1}>{p.question}{p.answer}</PracticeProblem>)}
            <button onClick={onComplete} className="w-full mt-8 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 text-xl transition-colors">Mark as Complete</button>
        </motion.div>
    );
}

const RateAndTimeModule = ({ content, onComplete }) => {
    // Calculator state
    const [calcMode, setCalcMode] = useState('rate'); // 'rate' or 'time'
    const [pv, setPv] = useState(24099);
    const [fv, setFv] = useState(100000);
    const [time, setTime] = useState(30);
    const [rate, setRate] = useState(5);

    const result = useMemo(() => {
        try {
            if (calcMode === 'rate') {
                const r = (Math.pow(fv / pv, 1 / time) - 1) * 100;
                return `Implied Rate (r): ${r.toFixed(2)}%`;
            } else {
                const t = Math.log(fv / pv) / Math.log(1 + rate / 100);
                return `Periods (t): ${t.toFixed(2)} years`;
            }
        } catch {
            return "Invalid inputs";
        }
    }, [calcMode, pv, fv, time, rate]);

    return (
        <motion.div>
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">{content.title}</h2>
            {content.sections.map((s, i) => <Section key={i} title={s.title}>{s.content}</Section>)}
            <InteractivePlayground title="Rate & Time Calculator">
                <div className="flex justify-center mb-6">
                    <button onClick={() => setCalcMode('rate')} className={`px-4 py-2 rounded-l-lg ${calcMode === 'rate' ? 'bg-indigo-600 text-white' : 'bg-gray-300'}`}>Solve for Rate (r)</button>
                    <button onClick={() => setCalcMode('time')} className={`px-4 py-2 rounded-r-lg ${calcMode === 'time' ? 'bg-indigo-600 text-white' : 'bg-gray-300'}`}>Solve for Time (t)</button>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                    <input type="number" placeholder="PV" value={pv} onChange={e => setPv(e.target.value)} className="p-2 border rounded" />
                    <input type="number" placeholder="FV" value={fv} onChange={e => setFv(e.target.value)} className="p-2 border rounded" />
                    {calcMode === 'rate' ? <input type="number" placeholder="Time (t)" value={time} onChange={e => setTime(e.target.value)} className="p-2 border rounded" /> : <div />}
                    {calcMode === 'time' ? <input type="number" placeholder="Rate (r) %" value={rate} onChange={e => setRate(e.target.value)} className="p-2 border rounded" /> : <div />}
                </div>
                <div className="text-center mt-6 text-2xl font-bold bg-white p-4 rounded-lg">{result}</div>
            </InteractivePlayground>
            {content.problems.map((p, i) => <PracticeProblem key={i} title={p.title} problemNumber={i+1}>{p.question}{p.answer}</PracticeProblem>)}
            <button onClick={onComplete} className="w-full mt-8 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 text-xl transition-colors">Mark as Complete</button>
        </motion.div>
    );
};

const AnnuitiesModule = ({ content, onComplete }) => {
    const [c, setC] = useState(100);
    const [rate, setRate] = useState(5);
    const [time, setTime] = useState(5);
    const [mode, setMode] = useState('PV');

    const annuityData = useMemo(() => {
        const data = [];
        for (let t = 1; t <= time; t++) {
            const pv = c / Math.pow(1 + rate / 100, t);
            const fv = c * Math.pow(1 + rate / 100, time - t);
            data.push({ period: t, payment: c, pv, fv });
        }
        return data;
    }, [c, rate, time]);

    const totalPV = useMemo(() => annuityData.reduce((sum, row) => sum + row.pv, 0), [annuityData]);
    const totalFV = useMemo(() => annuityData.reduce((sum, row) => sum + row.fv, 0), [annuityData]);
    
    const formulaPV = c > 0 && rate > 0 ? c * ( (1 - Math.pow(1 + rate/100, -time)) / (rate/100) ) : 0;
    const formulaFV = c > 0 && rate > 0 ? c * ( (Math.pow(1 + rate/100, time) - 1) / (rate/100) ) : 0;


    return (
        <motion.div>
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">{content.title}</h2>
            {content.sections.map((s, i) => <Section key={i} title={s.title}>{s.content}</Section>)}
            <InteractivePlayground title="Annuity Visualizer">
                <div className="grid md:grid-cols-3 gap-8 items-start">
                    <div className="md:col-span-1 space-y-4">
                        <div>
                            <label>Payment (C): <span className="font-bold text-blue-600">${c.toLocaleString()}</span></label>
                            <input type="range" min="50" max="1000" step="50" value={c} onChange={e => setC(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
                        </div>
                        <div>
                            <label>Interest Rate (r): <span className="font-bold text-blue-600">{rate}%</span></label>
                            <input type="range" min="1" max="20" value={rate} onChange={e => setRate(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
                        </div>
                        <div>
                            <label>Time Periods (t): <span className="font-bold text-blue-600">{time} years</span></label>
                            <input type="range" min="2" max="15" value={time} onChange={e => setTime(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
                        </div>
                         <div className="flex justify-center pt-4">
                            <button onClick={() => setMode('PV')} className={`px-4 py-2 rounded-l-lg ${mode === 'PV' ? 'bg-indigo-600 text-white' : 'bg-gray-300'}`}>Calculate PV</button>
                            <button onClick={() => setMode('FV')} className={`px-4 py-2 rounded-r-lg ${mode === 'FV' ? 'bg-indigo-600 text-white' : 'bg-gray-300'}`}>Calculate FV</button>
                        </div>
                    </div>
                    <div className="md:col-span-2">
                        <div className="bg-white p-4 rounded-lg shadow-md max-h-80 overflow-y-auto">
                            <table className="w-full text-center">
                                <thead className="border-b">
                                    <tr>
                                        <th className="py-2">Period</th>
                                        <th className="py-2">Payment</th>
                                        <th className="py-2">{mode === 'PV' ? 'PV of Payment' : 'FV of Payment'}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {annuityData.map(row => (
                                        <tr key={row.period} className="border-b">
                                            <td className="py-2">{row.period}</td>
                                            <td className="py-2">${row.payment.toLocaleString()}</td>
                                            <td className="py-2">${(mode === 'PV' ? row.pv : row.fv).toFixed(2)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="mt-4 grid grid-cols-2 gap-4 text-center">
                            <div className="bg-blue-100 p-4 rounded-lg">
                                <h4 className="font-bold">Total {mode} (Long Way)</h4>
                                <p className="text-2xl font-bold text-blue-700">${(mode === 'PV' ? totalPV : totalFV).toFixed(2)}</p>
                            </div>
                            <div className="bg-green-100 p-4 rounded-lg">
                                <h4 className="font-bold">Total {mode} (Formula)</h4>
                                <p className="text-2xl font-bold text-green-700">${(mode === 'PV' ? formulaPV : formulaFV).toFixed(2)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </InteractivePlayground>
            {content.problems.map((p, i) => <PracticeProblem key={i} title={p.title} problemNumber={i+1}>{p.question}{p.answer}</PracticeProblem>)}
            <button onClick={onComplete} className="w-full mt-8 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 text-xl transition-colors">Mark as Complete</button>
        </motion.div>
    );
};


const PerpetuitiesModule = ({ content, onComplete }) => (
    <motion.div>
        <h2 className="text-4xl font-extrabold text-gray-900 mb-4">{content.title}</h2>
        {content.sections.map((s, i) => <Section key={i} title={s.title}>{s.content}</Section>)}
        {content.problems.map((p, i) => <PracticeProblem key={i} title={p.title} problemNumber={i+1}>{p.question}{p.answer}</PracticeProblem>)}
        <button onClick={onComplete} className="w-full mt-8 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 text-xl transition-colors">Mark as Complete</button>
    </motion.div>
);

const APRvsEARModule = ({ content, onComplete }) => {
    const [apr, setApr] = useState(12);
    const [m, setM] = useState(12);
    const ear = useMemo(() => (Math.pow(1 + (apr / 100) / m, m) - 1) * 100, [apr, m]);

    return (
        <motion.div>
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">{content.title}</h2>
            {content.sections.map((s, i) => <Section key={i} title={s.title}>{s.content}</Section>)}
            <InteractivePlayground title="The Compounding Machine">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="space-y-4">
                        <div>
                            <label>Quoted APR (%): <span className="font-bold text-blue-600">{apr}%</span></label>
                            <input type="range" min="1" max="50" value={apr} onChange={e => setApr(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
                        </div>
                        <div>
                           <label>Compounding Frequency (m): <span className="font-bold text-blue-600">{m}</span></label>
                           <select value={m} onChange={e => setM(Number(e.target.value))} className="w-full p-2 border rounded">
                                <option value="1">Annually (1)</option><option value="2">Semi-Annually (2)</option>
                                <option value="4">Quarterly (4)</option><option value="12">Monthly (12)</option>
                                <option value="365">Daily (365)</option>
                            </select>
                        </div>
                    </div>
                    <div className="text-center bg-green-50 p-4 rounded-lg">
                         <p className="font-semibold text-green-800">True Rate (EAR)</p>
                         <p className="text-4xl font-bold text-green-600">{ear.toFixed(4)}%</p>
                    </div>
                </div>
            </InteractivePlayground>
            {content.problems.map((p, i) => <PracticeProblem key={i} title={p.title} problemNumber={i+1}>{p.question}{p.answer}</PracticeProblem>)}
            <button onClick={onComplete} className="w-full mt-8 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 text-xl transition-colors">Mark as Complete</button>
        </motion.div>
    );
}

const NPVIRRModule = ({ content, onComplete }) => {
    const [initialInvestment, setInitialInvestment] = useState(10000);
    const [cashFlows, setCashFlows] = useState([3000, 3000, 3000, 3000, 3000]);
    const [discountRate, setDiscountRate] = useState(10);

    const updateCashFlow = (index, value) => {
        const newFlows = [...cashFlows];
        newFlows[index] = Number(value);
        setCashFlows(newFlows);
    };

    const npv = useMemo(() => {
        let val = -initialInvestment;
        cashFlows.forEach((cf, i) => {
            val += cf / Math.pow(1 + discountRate / 100, i + 1);
        });
        return val;
    }, [initialInvestment, cashFlows, discountRate]);

    return (
        <motion.div>
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">{content.title}</h2>
            {content.sections.map((s, i) => <Section key={i} title={s.title}>{s.content}</Section>)}
            <InteractivePlayground title="Capital Budgeting Simulator">
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <SubHeading>Project Inputs</SubHeading>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Initial Investment (Year 0)</label>
                            <input type="number" value={initialInvestment} onChange={e => setInitialInvestment(Number(e.target.value))} className="w-full p-2 border rounded text-red-600 font-bold" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Discount Rate (%)</label>
                            <input type="number" value={discountRate} onChange={e => setDiscountRate(Number(e.target.value))} className="w-full p-2 border rounded" />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Future Cash Flows</label>
                            {cashFlows.map((cf, i) => (
                                <div key={i} className="flex items-center gap-2">
                                    <span className="w-16 text-sm text-gray-500">Year {i + 1}</span>
                                    <input type="number" value={cf} onChange={e => updateCashFlow(i, e.target.value)} className="flex-1 p-2 border rounded" />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-center space-y-6">
                        <div className={`p-6 rounded-xl shadow-lg w-full text-center ${npv >= 0 ? 'bg-green-100 border-2 border-green-400' : 'bg-red-100 border-2 border-red-400'}`}>
                            <h3 className="text-xl font-bold text-gray-800">Net Present Value (NPV)</h3>
                            <p className={`text-4xl font-extrabold mt-2 ${npv >= 0 ? 'text-green-700' : 'text-red-700'}`}>
                                ${npv.toLocaleString(undefined, {maximumFractionDigits: 2})}
                            </p>
                            <p className="mt-2 font-semibold">
                                {npv >= 0 ? "✅ ACCEPT PROJECT" : "❌ REJECT PROJECT"}
                            </p>
                        </div>
                        <div className="w-full h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={[{ name: 'Year 0', value: -initialInvestment }, ...cashFlows.map((cf, i) => ({ name: `Year ${i+1}`, value: cf }))]}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                                    <Bar dataKey="value" fill="#4f46e5" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </InteractivePlayground>
            <button onClick={onComplete} className="w-full mt-8 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 text-xl transition-colors">Mark as Complete</button>
        </motion.div>
    );
};

// --- Main Application Component ---
export default function DcfApp() {
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
            setCompletedModules(current => [...current, moduleNumber].sort((a,b) => a-b));
        }
    };

    const moduleData = [
        { id: 1, name: 'Intro to TVM', Component: IntroductionModule, content: content.module1 },
        { id: 2, name: 'Future Value', Component: FutureValueModule, content: content.module2 },
        { id: 3, name: 'Present Value', Component: PresentValueModule, content: content.module3 },
        { id: 4, name: 'Solving for Rate & Time', Component: RateAndTimeModule, content: content.module4 },
        { id: 5, name: 'Annuities', Component: AnnuitiesModule, content: content.module5 },
        { id: 6, name: 'Perpetuities', Component: PerpetuitiesModule, content: content.module6 },
        { id: 7, name: 'APR vs. EAR', Component: APRvsEARModule, content: content.module7 },
        { id: 8, name: 'NPV & IRR', Component: NPVIRRModule, content: content.module8 },
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
                <h1 className="text-3xl font-bold text-gray-800 mb-2">DCF Fundamentals</h1>
                <p className="text-sm text-gray-500 mb-6">Master the Time Value of Money</p>
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
