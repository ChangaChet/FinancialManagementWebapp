import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// Import your global styles
import './index.css'

// Import the main layout component
import App from './App.jsx'

// Import your page components from the CORRECT folder ('./components/')
import HomePage from './components/Homepage.jsx' // Make sure the filename matches!
import AboutPage from './components/AboutPage.jsx'
import ContactPage from './components/ContactPage.jsx'
import DcfExplainerPage from './components/DcfExplainerPage.jsx'


// This is the correct, simple structure for your routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // <App> is the layout for ALL pages
    children: [
      {
        path: "/", // On the home URL, show the HomePage component
        element: <HomePage />,
      },
      {
        path: "about", // On the "/about" URL, show the AboutPage
        element: <AboutPage />,
      },
      {
        path: "contact", // On the "/contact" URL, show the ContactPage
        element: <ContactPage />,
      },
      {
        path: "dcf-explainer", // On the "/dcf-explainer" URL, show the DcfExplainerPage
        element: <DcfExplainerPage />,
      }
    ],
  },
]);

// This is the ONLY render call you need.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

