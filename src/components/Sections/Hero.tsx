import { fetchTrinding, originalImagePath } from "@/services/api";
import { useEffect, useState } from "react";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    // CarouselNext,
    // CarouselPrevious,
} from "@/components/ui/carousel";
import type { MoviesCard } from "@/types/movies";
import { Skeleton } from "../ui/skeleton";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import { Badge } from "../ui/badge";
import { CalendarDays, Star } from "lucide-react";
import { useGenresContext } from "@/hooks/useGenresContext";
import { normalizeGenreIds } from "@/lib/helpers";

const Hero = () => {
    const [dateHero, setDataHero] = useState<MoviesCard[]>([]);
    const [loading, setLoading] = useState(true);

    const { getGenreNames } = useGenresContext();

    useEffect(() => {
        setLoading(true);
        fetchTrinding("all", "day")
            .then((res) => {
                setDataHero(res.slice(0, 3));
            })
            .catch((err) => {
                console.log("err: ", err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <section className="h-screen w-full hero-section">
            {loading && <Skeleton className="w-full h-screen rounded-lg" />}
            {dateHero.length > 0 && !loading && (
                <Carousel
                    opts={{
                        loop: true,
                    }}
                    plugins={[
                        Autoplay({
                            delay: 3000,
                        }),
                        Fade(),
                    ]}
                >
                    <CarouselContent className="">
                        {dateHero.map((item: MoviesCard) => (
                            <CarouselItem key={item.id}>
                                {item.backdrop_path && (
                                    <img
                                        src={`${originalImagePath}${item.backdrop_path}`}
                                        alt={item.title}
                                        className="w-full h-screen object-cover object-top"
                                        loading="lazy"
                                    />
                                )}

                                <div className="absolute z-10 bottom-0 start-0 p-8 md:p-25">
                                    <div className="flex flex-col gap-4 max-w-2xl">
                                        <Badge
                                            variant="default"
                                            className="text-sm capitalize"
                                        >
                                            {item.media_type || "movie"}
                                        </Badge>
                                        <p className="text-2xl md:text-5xl font-bold text-white">
                                            {item.title || item.name}
                                        </p>
                                        <div className="flex items-center gap-2 mt-2">
                                            <p className="text-sm flex items-center gap-1 text-white">
                                                <CalendarDays className="size-5" />
                                                <span className="text-md mt-1">
                                                    {new Date(
                                                        item?.release_date ||
                                                            item?.first_air_date
                                                    ).getFullYear() || "N/A"}
                                                </span>
                                            </p>
                                            <span className="text-white">
                                                &#x2022;
                                            </span>
                                            <p className=" text-white text-sm font-semibold flex items-center gap-1">
                                                <Star className="size-5" />
                                                <span>
                                                    {item.vote_average.toFixed(
                                                        1
                                                    )}
                                                </span>
                                            </p>
                                            <span className="text-white">
                                                &#x2022;
                                            </span>
                                            <p className="flex items-center gap-1 text-sm">
                                                {(item.media_type === "movie" ||
                                                    item.media_type === "tv") &&
                                                    getGenreNames(
                                                        normalizeGenreIds(
                                                            item.genre_ids
                                                        ),
                                                        item.media_type
                                                    ).map((genre) => (
                                                        <span
                                                            key={genre}
                                                            className=""
                                                        >
                                                            <Badge variant="secondary">
                                                                {genre}
                                                            </Badge>
                                                        </span>
                                                    ))}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    {/* <CarouselPrevious className="!start-4 z-2 !border-white cursor-pointer hidden" />
                    <CarouselNext className="!end-4 z-2 !border-white cursor-pointer hidden" /> */}
                </Carousel>
            )}
        </section>
    );
};

export default Hero;
