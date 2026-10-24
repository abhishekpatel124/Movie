const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

const fetchMovies = async (path) => {
  if (!API_KEY) {
    throw new Error(
      "TMDB API key is missing. Set VITE_TMDB_API_KEY in frontend/.env.local."
    );
  }

  const response = await fetch(`${BASE_URL}${path}&api_key=${API_KEY}`);
  if (!response.ok) {
    throw new Error(`TMDB request failed with status ${response.status}.`);
  }

  const data = await response.json();
  return data.results ?? [];
};

export const getPopularMovies = async () => {
  return fetchMovies("/movie/popular?");
};

export const searchMovies = async (query) => {
  return fetchMovies(
    `/search/movie?query=${encodeURIComponent(query)}&`
  );
};
