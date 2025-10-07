import React from 'react';
import { Link } from 'react-router-dom';

// This component serves as the main landing page for your application.
// It provides a welcome message and clear navigation to the main lecture sections.
export default function HomePage() {
  return (
    <div className="text-center">
      {/* Hero Section */}
      <section className="py-12">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
          Interactive <span className="text-indigo-600">Finance</span> Lectures
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-600">
          A modern, hands-on approach to learning the fundamentals of finance. Choose a topic below to get started.
        </p>
      </section>
      
      {/* Cards Section */}
      <section className="mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          
          {/* Card for DCF Lecture */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300">
            <div className="p-8">
              <h3 className="text-2xl font-bold text-gray-900">DCF Fundamentals</h3>
              <p className="mt-2 text-gray-600 h-20">
                Learn the core concepts of Discounted Cash Flow, from Future Value to Annuities, with interactive graphs and quizzes.
              </p>
              {/* This Link component will navigate to the path defined in your main.jsx */}
              <Link
                to="/dcf-explainer"
                className="mt-6 inline-block bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-indigo-700 transition-colors"
              >
                Start Learning
              </Link>
            </div>
          </div>
          
          {/* Card for Bond Valuation Lecture */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300">
            <div className="p-8">
              <h3 className="text-2xl font-bold text-gray-900">Advanced Bond Valuation</h3>
              <p className="mt-2 text-gray-600 h-20">
                A deep dive into bond pricing, yield to maturity, credit ratings, and the term structure of interest rates.
              </p>
              {/* This Link component will navigate to the path defined in your main.jsx */}
              <Link
                to="/bond-valuation"
                className="mt-6 inline-block bg-gray-800 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-gray-900 transition-colors"
              >
                Explore Bonds
              </Link>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
