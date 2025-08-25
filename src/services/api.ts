import axios from "axios";

export const imagePath = "https://image.tmdb.org/t/p/w500";
export const originalImagePath = "https://image.tmdb.org/t/p/original";

const API_KEY = import.meta.env.VITE_API_KRY;
const BASE_URL = import.meta.env.VITE_BASE_URL;

// Trinding
export const fetchTrinding = async (mediaType: string, timeWindow: string) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const { data } = await axios.get(
        `${BASE_URL}/trending/${mediaType}/${timeWindow}?api_key=${API_KEY}`
    );
    return data.results;
};