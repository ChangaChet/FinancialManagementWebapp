import React from 'react';
import { Link } from 'react-router-dom';

// This component serves as the main landing page for your application.
// It provides a welcome message and clear navigation to the main lecture sections.
export default function HomePage() {
  const chapters = [
    {
      title: "DCF Fundamentals",
      description: "Master the core concepts of Discounted Cash Flow, from Future Value to Annuities, with interactive graphs.",
      path: "/dcf-explainer",
      color: "indigo",
      icon: "💰"
    },
    {
      title: "Bond Valuation",
      description: "Dive deep into bond pricing, yields, credit ratings, and the term structure of interest rates.",
      path: "/bond-valuation",
      color: "emerald",
      icon: "📜"
    },
    {
      title: "Stock Valuation",
      description: "Learn how to value stocks using the Dividend Discount Model (DDM) and understand market mechanics.",
      path: "/stock-valuation",
      color: "blue",
      icon: "📈"
    },
    {
      title: "Cost of Capital",
      description: "Calculate WACC, Cost of Equity, and Cost of Debt using interactive models and real-world examples.",
      path: "/cost-of-capital",
      color: "purple",
      icon: "⚖️"
    }
  ];

  return (
    <div className="text-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <section className="py-16 md:py-24 relative">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-100/50 via-slate-50 to-slate-50 opacity-70"></div>

        <div className="inline-flex items-center rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-800 mb-6">
          <span className="flex h-2 w-2 rounded-full bg-indigo-600 mr-2"></span>
          New Modules Available
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 leading-tight tracking-tight mb-6">
          Interactive <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Finance</span> Lectures
        </h1>
        <p className="max-w-2xl mx-auto text-xl md:text-2xl text-slate-600 leading-relaxed mb-10">
          A modern, hands-on approach to learning the fundamentals of finance. <br className="hidden md:block" />
          Select a module below to begin your journey.
        </p>
      </section>

      {/* Cards Section */}
      <section className="pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">

          {chapters.map((chapter, index) => (
            <Link
              key={index}
              to={chapter.path}
              className={`group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-slate-100 text-left flex flex-col h-full transform hover:-translate-y-1`}
            >
              <div className={`absolute top-0 left-0 w-full h-1.5 bg-${chapter.color}-500`}></div>
              <div className="p-8 md:p-10 flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-6">
                  <div className={`h-12 w-12 rounded-xl bg-${chapter.color}-50 flex items-center justify-center text-2xl shadow-sm border border-${chapter.color}-100`}>
                    {chapter.icon}
                  </div>
                  <span className={`text-xs font-bold uppercase tracking-wider text-${chapter.color}-700 bg-${chapter.color}-50 px-3 py-1 rounded-full border border-${chapter.color}-100`}>
                    Module {index + 1}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">
                  {chapter.title}
                </h3>
                <p className="text-lg text-slate-600 leading-relaxed mb-8 flex-1">
                  {chapter.description}
                </p>
                <div className="flex items-center font-semibold text-indigo-600 group-hover:translate-x-2 transition-transform mt-auto">
                  Start Learning <span className="ml-2">→</span>
                </div>
              </div>
            </Link>
          ))}

        </div>
      </section>
    </div>
  );
}
