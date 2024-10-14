import React, { useState, useEffect } from 'react';
import { searchMovies, getGenres, getMovieDetails, getSimilarMovies, discoverMovies } from './api';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Импорт Bootstrap Icons

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'; 

const years = Array.from(new Array(100), (val, index) => 2024 - index); // Массив лет от 2024 до 1924
const ratings = Array.from(new Array(11), (val, index) => index); // Массив рейтингов от 0 до 10

const SearchMovies = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [year, setYear] = useState('');
  const [rating, setRating] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchGenres = async () => {
      const response = await getGenres();
      setGenres(response.data.genres);
    };
    fetchGenres();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (query.trim() !== '') {
      const response = await searchMovies(query);
      setMovies(response.data.results);
    } else if (year || selectedGenre || rating) {
      const response = await discoverMovies(year, selectedGenre, rating);
      setMovies(response.data.results);
    }
  };

  const handleMovieClick = async (movieId) => {
    const response = await getMovieDetails(movieId);
    setSelectedMovie(response.data);

    const similarResponse = await getSimilarMovies(movieId);
    setSimilarMovies(similarResponse.data.results);

    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  // Функция для отображения звезд рейтинга
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
    <div className="container mt-5">
      <form onSubmit={handleSearch} className="mb-5">
        <div className="row g-3">
          <div className="col-md-4">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for a movie"
              className="form-control"
            />
          </div>

          <div className="col-md-2">
            <select value={year} onChange={(e) => setYear(e.target.value)} className="form-select">
              <option value="">Year</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-3">
            <select value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)} className="form-select">
              <option value="">Select Genre</option>
              {genres.map((genre) => (
                <option key={genre.id} value={genre.id}>
                  {genre.name}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-2">
            <select value={rating} onChange={(e) => setRating(e.target.value)} className="form-select">
              <option value="">Rating</option>
              {ratings.map((rating) => (
                <option key={rating} value={rating}>
                  {rating}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-1">
            <button type="submit" className="btn btn-primary w-100">Search</button>
          </div>
        </div>
      </form>

      <div className="row justify-content-center"> 
        {movies.map((movie) => (
          <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={movie.id}>
            <div className="card h-100" onClick={() => handleMovieClick(movie.id)} style={{ cursor: 'pointer' }}>
              {movie.poster_path ? (
                <img 
                  src={`${IMAGE_BASE_URL}${movie.poster_path}`} 
                  alt={movie.title} 
                  className="card-img-top"
                  loading="lazy" 
                />
              ) : (
                <div className="card-img-top" style={{ backgroundColor: '#ccc', height: '400px' }}>No Image</div>
              )}
              <div className="card-body">
                <h5 className="card-title">{movie.title}</h5>
                <p className="card-text d-flex justify-content-center align-items-center">
                  {renderStars(movie.vote_average)} 
                  <span className="ms-2">({movie.vote_average.toFixed(1)})</span> 
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedMovie && (
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedMovie.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>{selectedMovie.overview}</p>
            <h4>Similar Movies</h4>
            <ul>
              {similarMovies.map((similarMovie) => (
                <li key={similarMovie.id}>{similarMovie.title}</li>
              ))}
            </ul>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default SearchMovies;