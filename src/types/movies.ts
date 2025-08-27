export interface MoviesCard {
    id: number;
    title: string;
    poster_path: string;
    vote_average: number;
    media_type?: string;
    name: string;
    release_date: string;
    first_air_date: string;
    backdrop_path?: string;
    genre_ids?: Genre[],
}

export interface MovieListItem {
    adult: boolean;
    backdrop_path: string | null;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string | null;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export type Genre = { id: number; name: string };


export type Movie = {
    adult: boolean;
    backdrop_path: string | null;
    belongs_to_collection: {
        id: number;
        name: string;
        poster_path: string | null;
        backdrop_path: string | null;
    } | null;
    budget: number;
    genres: {
        id: number;
        name: string;
    }[];
    homepage: string | null;
    id: number;
    imdb_id: string | null;
    origin_country: string[];
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string | null;
    production_companies: {
        id: number;
        logo_path: string | null;
        name: string;
        origin_country: string;
    }[];
    production_countries: {
        iso_3166_1: string;
        name: string;
    }[];
    release_date: string;
    revenue: number;
    runtime: number | null;
    spoken_languages: {
        english_name: string;
        iso_639_1: string;
        name: string;
    }[];
    status: string;
    tagline: string | null;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
};

export type TvShow = {
    adult: boolean;
    backdrop_path: string | null;
    created_by: Creator[];
    episode_run_time: number[];
    first_air_date: string;
    genres: Genre[];
    homepage: string | null;
    id: number;
    in_production: boolean;
    languages: string[];
    last_air_date: string | null;
    last_episode_to_air: Episode | null;
    name: string;
    next_episode_to_air: Episode | null;
    networks: Network[];
    number_of_episodes: number;
    number_of_seasons: number;
    origin_country: string[];
    original_language: string;
    original_name: string;
    overview: string;
    popularity: number;
    poster_path: string | null;
    production_companies: ProductionCompany[];
    production_countries: ProductionCountry[];
    seasons: Season[];
    spoken_languages: SpokenLanguage[];
    status: string;
    tagline: string | null;
    type: string;
    vote_average: number;
    vote_count: number;
};

export type CastMember = {
    adult: boolean;
    gender: number | null; // 0 = not set, 1 = female, 2 = male
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string | null;
    cast_id: number;
    character: string;
    credit_id: string;
    order: number;
};

export type Video = {
    iso_639_1: string;       // لغة الفيديو (مثلاً en)
    iso_3166_1: string;      // الدولة (مثلاً US)
    name: string;            // عنوان الفيديو
    key: string;             // ID للفيديو (مثلاً YouTube video key)
    site: string;            // المنصة (YouTube, Vimeo, …)
    size: number;            // الجودة (360, 720, 1080…)
    type: string;            // Trailer, Teaser, Clip, Featurette, …
    official: boolean;       // هل رسمي أم لا
    published_at: string;    // تاريخ النشر بصيغة ISO
    id: string;              // ID داخلي من TMDB
};




type Episode = {
    id: number;
    name: string;
    overview: string;
    vote_average: number;
    vote_count: number;
    air_date: string;
    episode_number: number;
    episode_type: string;
    production_code: string;
    runtime: number | null;
    season_number: number;
    show_id: number;
    still_path: string | null;
};

type Network = {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
};

type ProductionCompany = {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
};

type ProductionCountry = {
    iso_3166_1: string;
    name: string;
};

type Season = {
    air_date: string | null;
    episode_count: number;
    id: number;
    name: string;
    overview: string;
    poster_path: string | null;
    season_number: number;
    vote_average: number;
};

type SpokenLanguage = {
    english_name: string;
    iso_639_1: string;
    name: string;
};

type Creator = {
    id: number;
    credit_id: string;
    name: string;
    original_name: string;
    gender: number | null;
    profile_path: string | null;
};
