import axios from 'axios';

const API_KEY = 'd8dcb7e08a3cfee26a57a36e4d31599c';
const BASE_URL = 'https://api.themoviedb.org/3';

// Поиск фильмов по запросу
export const searchMovies = (query) => {
  return axios.get(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`);
};

// Получить жанры фильмов
export const getGenres = () => {
  return axios.get(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
};

// Получить фильмы по фильтрам (год, жанр, рейтинг)
export const discoverMovies = (year, genre, rating) => {
  return axios.get(`${BASE_URL}/discover/movie?api_key=${API_KEY}&year=${year}&with_genres=${genre}&vote_average.gte=${rating}`);
};

// Получить детали фильма по ID
export const getMovieDetails = (id) => {
  return axios.get(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
};

// Получить похожие фильмы
export const getSimilarMovies = (id) => {
  return axios.get(`${BASE_URL}/movie/${id}/similar?api_key=${API_KEY}`);
};

// Получить новинки
export const getNewMovies = () => {
  return axios.get(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}`);
};

// Получить популярные фильмы
export const getPopularMovies = () => {
  return axios.get(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
};