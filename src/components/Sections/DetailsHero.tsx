import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import type { Movie, TvShow, Video } from "@/types/movies";
import {
    ArrowLeft,
    BadgeCheck,
    BookmarkPlus,
    CalendarDays,
    Clock,
} from "lucide-react";

import {
    minutesTohours,
    ratingToPercentage,
    resolveRatingColor,
} from "@/lib/helpers";

import { CircularProgressbar } from "react-circular-progressbar";

import { imagePath, originalImagePath } from "@/services/api";

import TrailerDialog from "../TrailerDialog";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { useFirestore } from "@/services/firestore";
import { useEffect, useState } from "react";
interface DetailsHeroProps {
    details: Movie | TvShow;
    type: string;
    trailer: Video | null;
}

const DetailsHero = ({ details, type, trailer }: DetailsHeroProps) => {
    const navigate = useNavigate();

    const { user } = useAuth();

    const { addToWatchlist, checkIfInWatchlist, removeFromWatchlist } =
        useFirestore();

    const [isInWatchlist, setIsInWatchlist] = useState(false);

    const releaseDate =
        "release_date" in (details ?? {})
            ? (details as Movie)?.release_date
            : (details as TvShow)?.first_air_date;

    const title =
        "title" in (details ?? {})
            ? (details as Movie)?.title
            : (details as TvShow)?.name;

    const rating = ratingToPercentage(details?.vote_average ?? 0);

    const dataId = details?.id?.toString();

    const handleSaveToWatchList = async () => {
        if (!user) {
            toast.info("Login to add to watchlist");
            return;
        }
        const data = {
            id: details.id.toString(),
            title,
            type: type,
            poster_path: details?.poster_path ?? "",
            release_date: releaseDate,
            vote_average: details?.vote_average,
            overview: details?.overview,
        };

        // addDocument("watchlist", data);
        await addToWatchlist(user?.uid, dataId, data);
        const isSetToWatchlist = await checkIfInWatchlist(user?.uid, dataId);
        setIsInWatchlist(isSetToWatchlist);
    };

    const handleRemoveFromWatchlist = async () => {
        if (!user) {
            toast.info("Login to remove from watchlist");
            return;
        }
        await removeFromWatchlist(user?.uid, dataId);
        const isSetToWatchlist = await checkIfInWatchlist(user?.uid, dataId);
        setIsInWatchlist(isSetToWatchlist);
    };

    useEffect(() => {
        if (!user) {
            setIsInWatchlist(false);
            return;
        }
        checkIfInWatchlist(user?.uid, dataId).then((data) => {
            setIsInWatchlist(data);
        });
    }, [dataId, user, checkIfInWatchlist]);

    return (
        <section
            className="min-h-screen xl:min-h-[60vh] w-full bg-cover bg-no-repeat bg-center details-hero relative z-1 py-5"
            style={{
                backgroundImage: `url(${originalImagePath}${details?.backdrop_path})`,
            }}
        >
            <div className="container">
                <div className="mt-20">
                    <Button
                        variant="link"
                        onClick={() => navigate(-1)}
                        className="text-white flex items-center gap-2 text-12 cursor-pointer"
                    >
                        <ArrowLeft className="size-4" />
                        <span>Back</span>
                    </Button>

                    <div className="flex items-start gap-5 flex-col lg:flex-row mt-5 px-5 pb-5 md:pb-0">
                        <div className="w-full sm:w-[270px] h-[350px] sm:h-[400px] rounded-lg overflow-hidden shrink-0">
                            <img
                                src={`${imagePath}${details?.poster_path}`}
                                alt={title}
                                loading="lazy"
                                className="w-full h-full object-cover object-top"
                            />
                        </div>
                        <div className="max-w-2xl">
                            <h1 className="text-xl md:text-2xl lg:text-4xl font-semibold mb-3 text-white lg:leading-12">
                                <span>{title}</span>
                                <Badge
                                    variant="secondary"
                                    className="capitalize ms-3 bg-neutral-700!"
                                >
                                    {type}
                                </Badge>
                            </h1>
                            <div className="flex items-center gap-2 text-white/80 text-sm mb-5">
                                <div className="flex items-center gap-1">
                                    <CalendarDays className="size-4" />
                                    {new Date(releaseDate).toLocaleDateString(
                                        "en-US"
                                    )}
                                </div>

                                <span className="text-neutral-500">
                                    &#x2022;
                                </span>

                                {type === "movie" && details && (
                                    <>
                                        <div className="text-white/80 text-sm flex items-center gap-1">
                                            <Clock className="size-4" />
                                            <span>
                                                {minutesTohours(
                                                    (details as Movie)
                                                        .runtime ?? 0
                                                )}
                                            </span>
                                        </div>
                                        <span className="text-neutral-500">
                                            &#x2022;
                                        </span>
                                    </>
                                )}

                                <div className="uppercase">
                                    {details?.original_language}
                                </div>
                            </div>

                            <div className="flex items-center flex-wrap gap-4">
                                <div className="size-13 lg:size-15">
                                    <CircularProgressbar
                                        value={Number(rating)}
                                        text={`${rating}%`}
                                        styles={{
                                            path: {
                                                stroke: `${resolveRatingColor(
                                                    details?.vote_average ?? 0
                                                )}`,
                                            },
                                            text: {
                                                fill: "#FFF",
                                                fontSize: "22px",
                                                fontWeight: "bold",
                                            },
                                        }}
                                    />
                                </div>

                                {trailer && <TrailerDialog trailer={trailer} />}

                                {isInWatchlist ? (
                                    <Button
                                        variant="outline"
                                        className=" cursor-pointer !border-green-800 !text-white !bg-green-800 flex items-center gap-2 "
                                        onClick={handleRemoveFromWatchlist}
                                    >
                                        <BadgeCheck className="size-5" />
                                        <span>In watchlist</span>
                                    </Button>
                                ) : (
                                    <Button
                                        variant="outline"
                                        className="cursor-pointer !border-white/80 text-white flex items-center gap-2"
                                        onClick={handleSaveToWatchList}
                                    >
                                        <BookmarkPlus className="size-5" />
                                        <span>Add to watchlist</span>
                                    </Button>
                                )}
                            </div>

                            <div className="mt-4">
                                <h6 className="font-semibold text-white capitalize">
                                    overview
                                </h6>
                                <p className="text-sm mt-2">
                                    {details?.overview}
                                </p>
                            </div>

                            <div className="mt-5 flex items-center gap-1">
                                {details?.genres?.map((genre) => (
                                    <Badge
                                        key={genre?.id}
                                        variant="default"
                                        className="text-white"
                                    >
                                        {genre?.name}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DetailsHero;
