import { GenresContext } from "@/context/GenresContext";
import { useContext } from "react";

export const useGenresContext = () => {
    const context = useContext(GenresContext);
    if (!context) {
        throw new Error("useGenresContext must be used within a GenresProvider");
    }
    return context;
};