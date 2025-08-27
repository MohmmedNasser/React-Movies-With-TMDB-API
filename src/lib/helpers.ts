type GenreInput = number | { id: number };

export const normalizeGenreIds = (genreIds: GenreInput[] | undefined): number[] => {
    if (!Array.isArray(genreIds)) return [];
    return genreIds.map((g) => (typeof g === "number" ? g : g.id));
};

export const minutesTohours = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    return `${hours}h ${mins}m`;
}

export const ratingToPercentage = (rating: number) => {
    if (!rating) return 0;
    return (rating * 10)?.toFixed(0);
};

export const resolveRatingColor = (rating: number) => {
    if (rating >= 7) {
        return "oklch(62.7% 0.194 149.214)";
    } else if (rating >= 5) {
        return "oklch(64.6% 0.222 41.116)";
    } else {
        return "oklch(57.7% 0.245 27.325)";
    }
};