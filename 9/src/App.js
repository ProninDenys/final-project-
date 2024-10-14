import React, { useState, useEffect } from 'react';
import './App.css';
import SearchMovies from './SearchMovies';
import { getNewMovies, getPopularMovies } from './api';

function App() {
  const [theme, setTheme] = useState('light');
  const [newMovies, setNewMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    const fetchMovies = async () => {
      const newMoviesResponse = await getNewMovies();
      const popularMoviesResponse = await getPopularMovies();
      setNewMovies(newMoviesResponse.data.results);
      setPopularMovies(popularMoviesResponse.data.results);
    };
    fetchMovies();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="text-center display-4 mb-3">
          <a href="/" className="text-decoration-none" style={{ color: 'inherit' }}>Movie Finder</a>
        </h1>
        <p className="text-center header-subtitle">Discover the latest and most popular movies</p>
        <button onClick={toggleTheme} className="btn-modern">
          Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
        </button>
      </header>

      <main>
        <SearchMovies />
        <div className="container mt-5">
          <h2>New Releases</h2>
          <div className="row justify-content-center">
            {newMovies.map((movie) => (
              <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={movie.id}>
                <div className="card h-100">
                  {movie.poster_path ? (
                    <img 
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                      alt={movie.title} 
                      className="card-img-top"
                    />
                  ) : (
                    <div className="card-img-top" style={{ backgroundColor: '#ccc', height: '400px' }}>No Image</div>
                  )}
                  <div className="card-body">
                    <h5 className="card-title">{movie.title}</h5>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <h2>Popular Movies</h2>
          <div className="row justify-content-center">
            {popularMovies.map((movie) => (
              <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={movie.id}>
                <div className="card h-100">
                  {movie.poster_path ? (
                    <img 
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                      alt={movie.title} 
                      className="card-img-top"
                    />
                  ) : (
                    <div className="card-img-top" style={{ backgroundColor: '#ccc', height: '400px' }}>No Image</div>
                  )}
                  <div className="card-body">
                    <h5 className="card-title">{movie.title}</h5>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;