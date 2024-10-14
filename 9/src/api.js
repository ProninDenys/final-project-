import axios from 'axios';

const API_KEY = 'd8dcb7e08a3cfee26a57a36e4d31599c';
const BASE_URL = 'https://api.themoviedb.org/3';

export const searchMovies = (query) => {
  return axios.get(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`);
};

export const getGenres = () => {
  return axios.get(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
};

export const discoverMovies = (year, genre, rating) => {
  return axios.get(`${BASE_URL}/discover/movie?api_key=${API_KEY}&year=${year}&with_genres=${genre}&vote_average.gte=${rating}`);
};

export const getMovieDetails = (id) => {
  return axios.get(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
};

export const getSimilarMovies = (id) => {
  return axios.get(`${BASE_URL}/movie/${id}/similar?api_key=${API_KEY}`);
};
