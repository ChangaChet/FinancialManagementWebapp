import { Outlet, Link } from 'react-router-dom';

function App() {
  return (
    <div>
      <header>
        <nav style={{ display: 'flex', gap: '1rem', padding: '1rem', borderBottom: '1px solid #ccc' }}>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/dcf-explainer">DCF Lecture"</Link>
        </nav>
      </header>
      <main style={{ padding: '1rem' }}>
        {/* The Outlet is the placeholder for your page content. */}
        {/* React Router will replace this with the correct page component. */}
        <Outlet />
      </main>
    </div>
  );
}

export default App;
