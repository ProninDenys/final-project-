import React, { useState, useEffect } from 'react';
import './App.css';
import SearchMovies from './SearchMovies';

function App() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="App">
    
      <main>
        <h1 className="text-center display-4 mb-3">
          <a href="/" className="text-decoration-none" style={{ color: 'inherit' }}>Film Finder</a>
        </h1>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <SearchMovies />
         
          <button onClick={toggleTheme} className="btn-modern">
            Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
          </button>
        </div>
      </main>
    </div>
  );
}

export default App;
