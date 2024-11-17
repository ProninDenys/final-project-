import React, { useState, useEffect } from 'react';
import './App.css';
import SearchMovies from './SearchMovies';
import { getNewMovies, getPopularMovies, getMovieDetails, getSimilarMovies } from './api'; // Импортируем API

function App() {
  const [newMovies, setNewMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // Получение данных о новых и популярных фильмах
  useEffect(() => {
    const fetchMovies = async () => {
      const newMoviesResponse = await getNewMovies();
      const popularMoviesResponse = await getPopularMovies();
      setNewMovies(newMoviesResponse.data.results);
      setPopularMovies(popularMoviesResponse.data.results);
    };
    fetchMovies();
  }, []);

  // Обработка клика на карточку фильма
  const handleMovieClick = async (movieId) => {
    const response = await getMovieDetails(movieId);
    setSelectedMovie(response.data);

    const similarResponse = await getSimilarMovies(movieId);
    setSimilarMovies(similarResponse.data.results);

    setShowModal(true);
  };

  // Закрытие модального окна
  const handleCloseModal = () => setShowModal(false);

  // Отображение звезд для рейтинга
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating / 2);
    const halfStars = rating % 2 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStars;

    return (
      <>
        {Array(fullStars).fill().map((_, index) => (
          <i key={index} className="bi bi-star-fill text-warning"></i>
        ))}
        {halfStars === 1 && <i className="bi bi-star-half text-warning"></i>}
        {Array(emptyStars).fill().map((_, index) => (
          <i key={index} className="bi bi-star text-warning"></i>
        ))}
      </>
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">
          <a href="/" className="text-decoration-none" style={{ color: '#F1E0C6' }}>MOVIE FINDER</a>
        </h1>
        <p className="App-subtitle" style={{ color: '#F1E0C6' }}>Discover the latest and most popular movies</p>
      </header>

      <main>
        <SearchMovies />
        <div className="container mt-5">
          <h2>New Releases</h2>
          <div className="row justify-content-center">
            {newMovies.map((movie) => (
              <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={movie.id}>
                <div className="card h-100" onClick={() => handleMovieClick(movie.id)} style={{ cursor: 'pointer' }}>
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
                    <p className="card-text">
                      {renderStars(movie.vote_average)}
                      <span className="ms-2">({movie.vote_average.toFixed(1)})</span> 
                      <br />
                      Release Year: {movie.release_date ? movie.release_date.split('-')[0] : 'N/A'}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <h2>Popular Movies</h2>
          <div className="row justify-content-center">
            {popularMovies.map((movie) => (
              <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={movie.id}>
                <div className="card h-100" onClick={() => handleMovieClick(movie.id)} style={{ cursor: 'pointer' }}>
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
                    <p className="card-text">
                      {renderStars(movie.vote_average)}
                      <span className="ms-2">({movie.vote_average.toFixed(1)})</span> 
                      <br />
                      Release Year: {movie.release_date ? movie.release_date.split('-')[0] : 'N/A'}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Модальное окно для деталей фильма */}
      {showModal && selectedMovie && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{selectedMovie.title}</h5>
                <button type="button" className="btn-close" onClick={handleCloseModal}></button>
              </div>
              <div className="modal-body">
                <p>{selectedMovie.overview}</p>
                <h4>Similar Movies</h4>
                <ul>
                  {similarMovies.map((similarMovie) => (
                    <li key={similarMovie.id}>{similarMovie.title}</li>
                  ))}
                </ul>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
