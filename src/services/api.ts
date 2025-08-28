import axios from "axios";

export const imagePath = "https://image.tmdb.org/t/p/w500";
export const originalImagePath = "https://image.tmdb.org/t/p/original";

const API_KEY = import.meta.env.VITE_API_KRY;
const BASE_URL = import.meta.env.VITE_BASE_URL;

// Trinding
export const fetchTrinding = async (mediaType: string, timeWindow: string) => {
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    const { data } = await axios.get(
        `${BASE_URL}/trending/${mediaType}/${timeWindow}?api_key=${API_KEY}`
    );
    return data.results;
};

export const fetchMovieGenres = async () => {
    const { data } = await axios.get(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
    return data
}

export const fetchTvGenres = async () => {
    const { data } = await axios.get(`${BASE_URL}/genre/tv/list?api_key=${API_KEY}`);
    return data
}

// Details Movies and TVShows
export const fetchDetails = async (type: string, id: number) => {
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    const { data } = await axios.get(`${BASE_URL}/${type}/${id}?api_key=${API_KEY}`);
    return data
}

// MOVIES & SERIES - Credits
export const fetchCredits = async (type: string, id: number) => {
    const { data } = await axios.get(`${BASE_URL}/${type}/${id}/credits?api_key=${API_KEY}`);
    return data
}

// MOVIES & SERIES - Videos

export const fetchVideos = async (type: string, id: number) => {
    const { data } = await axios.get(`${BASE_URL}/${type}/${id}/videos?api_key=${API_KEY}`);
    return data
}

export const fetchRecommend = async (type: string, id: number) => {
    const { data } = await axios.get(`${BASE_URL}/${type}/${id}/recommendations?api_key=${API_KEY}&page=1`);
    return data
}

export const fetchMovies = async (page: number, sortBy: string) => {
    const { data } = await axios.get(`${BASE_URL}/discover/movie?api_key=${API_KEY}&page=${page}&sort_by=${sortBy}`);
    return data;
}

export const fetchTvSeries = async (page: number, sortBy: string) => {
    const { data } = await axios.get(`${BASE_URL}/discover/tv?api_key=${API_KEY}&page=${page}&sort_by=${sortBy}`);
    return data;
}

// SEARCH
export const searchData = async (query: string, page: number) => {
    const { data } = await axios.get(`${BASE_URL}/search/multi?api_key=${API_KEY}&query=${query}&page=${page}`);
    return data;
}