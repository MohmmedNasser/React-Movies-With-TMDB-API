import { imagePath } from "@/services/api";
import type { WatchListData } from "@/types/movies";
import { Star, Trash } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { useFirestore } from "@/services/firestore";
import { useAuth } from "@/hooks/useAuth";
import type React from "react";

interface WatchlistCardProps {
    item: WatchListData;
    type: string;
    setWatchlist: React.Dispatch<React.SetStateAction<WatchListData[]>>;
}

const WatchlistCard = ({ item, type, setWatchlist }: WatchlistCardProps) => {
    const { removeFromWatchlist } = useFirestore();
    const { user } = useAuth();

    const handleRemoveFromWatchList = async () => {
        if (!user?.uid) return;
        await removeFromWatchlist(user?.uid, item.id).then(() => {
            setWatchlist((prev: WatchListData[]) =>
                prev.filter((el: WatchListData) => el.id !== item.id)
            );
        });
    };

    return (
        <div className="flex flex-col md:flex-row items-start gap-3">
            <img
                src={
                    item?.poster_path
                        ? `${imagePath}${item?.poster_path}`
                        : "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"
                }
                alt={item?.title}
                className="w-full md:w-[180px] h-[300px] md:h-[250px] object-cover object-top rounded-lg shrink-0"
                loading="lazy"
            />
            <div className="pt-2 grow">
                <div className="flex items-start md:items-center gap-2 justify-between">
                    <Link
                        to={`/details/${type}/${item?.id}`}
                        onClick={() =>
                            window.scrollTo({ top: 0, behavior: "smooth" })
                        }
                    >
                        <h2 className="text-2xl font-semibold mb-3 text-white">
                            {item?.title}
                        </h2>
                    </Link>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="outline"
                                className="cursor-pointer!"
                                onClick={handleRemoveFromWatchList}
                            >
                                <Trash className="text-red-200" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Remove from watchlist</p>
                        </TooltipContent>
                    </Tooltip>
                </div>
                <p className="mt-3 text-sm">
                    {new Date(item?.release_date).getFullYear() || "N/A"}
                </p>
                <p className=" text-white text-sm font-semibold flex items-center gap-1 mt-3">
                    <Star className="text-amber-400 w-5 h-5" />
                    <span className="">
                        {item?.vote_average
                            ? item?.vote_average.toFixed(1)
                            : "0"}
                    </span>
                </p>
                <p className="mt-3 text-sm ">{item?.overview}</p>
            </div>
        </div>
    );
};

export default WatchlistCard;
