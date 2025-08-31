import type { Genre } from "@/types/movies";
import { createContext } from "react";

type GenresContextType = {
    movieGenres: Genre[];
    tvGenres: Genre[];
    getGenreNames: (ids: number[], type: "movie" | "tv") => string[];
};

export const GenresContext = createContext<GenresContextType | undefined>(
    undefined
);
