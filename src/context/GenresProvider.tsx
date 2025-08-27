import { useEffect, useState } from "react";
import { GenresContext } from "./GenresContext";
import type { Genre } from "@/types/movies";
import { fetchMovieGenres, fetchTvGenres } from "@/services/api";

export const GenresProvider = ({ children }: { children: React.ReactNode }) => {
    const [movieGenres, setMovieGenres] = useState<Genre[]>([]);
    const [tvGenres, setTvGenres] = useState<Genre[]>([]);

    useEffect(() => {
        const loadGenres = async () => {
            const movieData = await fetchMovieGenres();
            const tvData = await fetchTvGenres();
            setMovieGenres(movieData.genres);
            setTvGenres(tvData.genres);
        };
        loadGenres();
    }, []);

    const getGenreNames = (ids: number[], type: "movie" | "tv") => {
        const source = type === "movie" ? movieGenres : tvGenres;
        return (
            ids
                .map(
                    (id) =>
                        source.find((g) => g.id === id)?.name ??
                        `Unknown(${id})`
                )
                // أي قيمة “Falsy” مثل undefined أو null أو "" سيتم حذفها.
                // هنا الهدف إزالة العناصر التي لم نجد لها اسم (IDs غير معروفة أو فقدت ترجمتها).
                .filter((name: string) => Boolean(name))
        );
    };
    // getGenreNames([28, 12], "movie"); // "Action, Adventure"

    const value = { movieGenres, tvGenres, getGenreNames };

    return (
        <GenresContext.Provider value={value}>
            {children}
        </GenresContext.Provider>
    );
};
