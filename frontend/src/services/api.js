const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const PLACEHOLDER_KEY = "your_tmdb_api_key_here";

const localMovies = [
  {
    id: 603,
    title: "The Matrix",
    release_date: "1999-03-30",
    poster_path: "/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
  },
  {
    id: 155,
    title: "The Dark Knight",
    release_date: "2008-07-16",
    poster_path: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
  },
  {
    id: 13,
    title: "Forrest Gump",
    release_date: "1994-06-23",
    poster_url:
      "https://upload.wikimedia.org/wikipedia/en/6/67/Forrest_Gump_poster.jpg",
  },
  {
    id: 27205,
    title: "Inception",
    release_date: "2010-07-15",
    poster_path: "/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg",
  },
  {
    id: 157336,
    title: "Interstellar",
    release_date: "2014-11-05",
    poster_path: "/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
  },
  {
    id: 680,
    title: "Pulp Fiction",
    release_date: "1994-09-10",
    poster_path: "/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
  },
];

const hasApiKey = API_KEY && API_KEY !== PLACEHOLDER_KEY;

const searchLocalMovies = (query) => {
  const normalizedQuery = query.trim().toLowerCase();
  return localMovies.filter((movie) =>
    movie.title.toLowerCase().includes(normalizedQuery)
  );
};

const fetchMovies = async (path) => {
  if (!hasApiKey) {
    return localMovies;
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
  if (!hasApiKey) {
    return searchLocalMovies(query);
  }

  return fetchMovies(
    `/search/movie?query=${encodeURIComponent(query)}&`
  );
};
