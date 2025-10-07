import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Import your global styles
import './index.css';

// Import the main layout component
import App from './App.jsx';

// Import all your page components
// NOTE: Make sure these file paths match your project structure!
import HomePage from './components/Homepage.jsx';
import AboutPage from './components/AboutPage.jsx';
import ContactPage from './components/ContactPage.jsx';
import DiscountedCashFlow from './components/DiscountedCashFlow.jsx';
import BondValuation from './components/BondValuation.jsx';

// This is the router configuration that maps URLs to components
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // App.jsx is the layout for ALL pages
    children: [
      {
        index: true, // This makes HomePage the default for "/"
        element: <HomePage />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "contact",
        element: <ContactPage />,
      },
      {
        path: "dcf-explainer", // When the URL is /dcf-explainer...
        element: <DiscountedCashFlow />, // ...show this component.
      },
      {
        path: "bond-valuation", // When the URL is /bond-valuation...
        element: <BondValuation />, // ...show this component.
      }
    ],
  },
]);

// Start the React application
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);

