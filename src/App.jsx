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
                `px-4 py-2 rounded-md text-lg font-medium transition-colors ${
                    isActive 
                    ? 'text-indigo-600' 
                    : 'text-gray-600 hover:text-indigo-600'
                }`
            }
        >
            {children}
        </RouterNavLink>
    );

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        {/* Link to the home page */}
                        <Link to="/" className="text-2xl font-bold text-gray-900">
                           Finance<span className="text-indigo-600">Learn</span>
                        </Link>
                        
                        {/* Navigation links that correspond to the paths in main.jsx */}
                        <div className="hidden md:flex items-center space-x-4">
                            <NavLink to="/">Home</NavLink>
                            <NavLink to="/dcf-explainer">DCF Lecture</NavLink>
                            <NavLink to="/bond-valuation">Bond Lecture</NavLink>
                            <NavLink to="/about">About</NavLink>
                        </div>
                    </div>
                </div>
            </nav>
            
            {/* Main content area where React Router will render the current page */}
            <main className="py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}

