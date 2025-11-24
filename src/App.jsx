import React from 'react';
import { Outlet, Link, NavLink as RouterNavLink } from 'react-router-dom';

// This is the main layout for your entire application.
// It provides the consistent navigation bar and a space for the page content.
export default function App() {

    // Helper component to style the active navigation link
    const NavLink = ({ to, children }) => (
        <RouterNavLink
            to={to}
            className={({ isActive }) =>
                `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActive
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`
            }
        >
            {children}
        </RouterNavLink>
    );

    return (
        <div className="min-h-screen bg-slate-50 font-sans flex flex-col">
            {/* Premium Dark Navbar */}
            <nav className="bg-slate-900 shadow-lg sticky top-0 z-50 border-b border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <Link to="/" className="flex items-center gap-2 group">
                            <div className="bg-indigo-600 text-white p-1.5 rounded-lg font-bold text-xl group-hover:bg-indigo-500 transition-colors">
                                FL
                            </div>
                            <span className="text-xl font-bold text-white tracking-tight">
                                Finance<span className="text-indigo-400">Learn</span>
                            </span>
                        </Link>

                        {/* Navigation Links */}
                        <div className="hidden md:flex items-center space-x-1">
                            <NavLink to="/">Home</NavLink>
                            <div className="h-4 w-px bg-slate-700 mx-2"></div>
                            <NavLink to="/dcf-explainer">DCF</NavLink>
                            <NavLink to="/bond-valuation">Bonds</NavLink>
                            <NavLink to="/stock-valuation">Stocks</NavLink>
                            <NavLink to="/cost-of-capital">WACC</NavLink>
                        </div>

                        {/* Mobile Menu Button (Placeholder) */}
                        <div className="md:hidden">
                            <button className="text-slate-300 hover:text-white">
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main content area */}
            <main className="flex-grow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <Outlet />
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-white border-t border-slate-200 mt-auto">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="text-slate-500 text-sm mb-4 md:mb-0">
                            © 2025 FinanceLearn. Designed for Education.
                        </div>
                        <div className="flex space-x-6 text-sm text-slate-400">
                            <Link to="/about" className="hover:text-indigo-600 transition-colors">About</Link>
                            <Link to="/contact" className="hover:text-indigo-600 transition-colors">Contact</Link>
                            <a href="#" className="hover:text-indigo-600 transition-colors">Privacy</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
