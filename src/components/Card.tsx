import { imagePath } from "@/services/api";
import type { MoviesCard } from "@/types/movies";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";
interface CardProps {
    item: MoviesCard;
    type?: string;
}

const Card = ({ item, type }: CardProps) => {
    return (
        <Link
            to={
                item?.media_type
                    ? `/details/${item?.media_type}/${item?.id}`
                    : type == "movie"
                    ? `/details/movie/${item?.id}`
                    : `/details/tv/${item?.id}`
            }
            className="relative h-[280px] sm:h-[350px]  rounded-xl overflow-hidden cs-card transition-transform duration-300"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
            <img
                src={
                    item?.poster_path
                        ? `${imagePath}${item?.poster_path}`
                        : "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"
                }
                alt={item?.title || item?.name}
                className="w-full h-[280px] sm:h-[350px] object-cover rounded-lg transition-transform duration-300"
                loading="lazy"
            />
            <div className="absolute z-2 bottom-0 start-0 w-full p-3">
                <h2 className="text-sm font-semibold mt-2">
                    {item?.title || item?.name}
                </h2>
                <div className="flex items-center gap-2 mt-2">
                    <p className=" text-white text-12 font-semibold flex items-center gap-1">
                        <Star className="text-amber-400 w-4 h-4" />
                        <span className="">
                            {item?.vote_average
                                ? item?.vote_average.toFixed(1)
                                : "0"}
                        </span>
                    </p>
                    <span className="w-[1px] h-[15px] bg-neutral-500"></span>
                    <p className="text-neutral-400 text-12 flex items-center gap-1">
                        {new Date(
                            item?.release_date || item?.first_air_date
                        ).getFullYear() || "N/A"}
                        <span className="text-neutral-500">&#x2022;</span>
                        <span>
                            {item?.media_type
                                ? item?.media_type
                                : type == "movie"
                                ? "movie"
                                : "tv"}
                        </span>
                    </p>
                </div>
            </div>
        </Link>
    );
};

export default Card;
