import LoadingSpinner from "@/components/LoadingSpinner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchDetails, fetchPeopleMovie, imagePath } from "@/services/api";
import type { MovieCastCredit, PersonDetails } from "@/types/movies";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const PeopleDetails = () => {
    const { id } = useParams();

    const [details, setDetails] = useState<PersonDetails>();
    const [movies, setMovies] = useState<MovieCastCredit[]>();
    const [loading, setLoading] = useState(true);
    const [showFullBiography, setShowFullBiography] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [detailsData, moviesData] = await Promise.all([
                    fetchDetails("person", Number(id)),
                    fetchPeopleMovie(Number(id)),
                ]);
                setDetails(detailsData);
                setMovies(moviesData.cast.slice(0, 10));
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    // console.log(details);
    // console.log(movies);

    let biography = details?.biography;
    if (!showFullBiography && biography) {
        biography = biography.substring(0, 520) + "...";
    }

    const formatDate = (date?: string | null) => {
        if (!date) return "Unknown";
        const formattedDate = new Date(date).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
        });
        return formattedDate;
    };

    return (
        <div>
            {loading && (
                <div className="min-h-screen flex items-center justify-center">
                    <LoadingSpinner />
                </div>
            )}

            <section className="pt-30">
                <div className="container">
                    <div className="flex flex-col items-center gap-2">
                        <div className="w-40 h-40 overflow-hidden rounded-full">
                            <img
                                src={`${imagePath}${details?.profile_path}`}
                                alt={details?.name}
                                loading="lazy"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <h1 className="text-2xl font-bold mt-5 text-white">
                            {details?.name}
                        </h1>
                        <p className="capitalize text-neutral-400 text-sm">
                            {details?.gender === 1 ? "actress" : "actor"}
                        </p>
                        <p className="text-neutral-400 text-sm">
                            {details?.birthday && (
                                <>
                                    Born on {formatDate(details?.birthday)} in{" "}
                                    {details?.place_of_birth}
                                </>
                            )}
                        </p>
                    </div>

                    <div className="mt-7">
                        <h6 className="text-lg capitalize font-semibold mb-2 text-white">
                            biography :
                        </h6>
                        <p className="text-sm leading-7">
                            {details?.biography &&
                            details?.biography.length <= 520 ? (
                                details?.biography
                            ) : (
                                <>
                                    {biography}{" "}
                                    <Button
                                        variant={"link"}
                                        className="p-0 text-blue-500! cursor-pointer"
                                        onClick={() =>
                                            setShowFullBiography(
                                                (prev) => !prev
                                            )
                                        }
                                    >
                                        {showFullBiography
                                            ? "Less Show"
                                            : "Show More"}
                                    </Button>
                                </>
                            )}
                        </p>
                    </div>

                    {details?.also_known_as && (
                        <div className="mt-7">
                            <h6 className="text-lg capitalize font-semibold mb-4 text-white">
                                Also known as :
                            </h6>

                            <div className="flex gap-3 flex-wrap">
                                {details?.also_known_as.map((name, index) => (
                                    <Badge variant={"secondary"} key={index}>
                                        {name}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="mt-7">
                        <h6 className="text-lg capitalize font-semibold mb-4 text-white">
                            Movies :
                        </h6>

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-5">
                            {movies &&
                                loading &&
                                movies.length !== 0 &&
                                Array.from({ length: 10 }).map((_, index) => (
                                    <Skeleton
                                        key={index}
                                        className="w-full h-[350px] rounded-lg"
                                    />
                                ))}

                            {movies &&
                                !loading &&
                                movies.map((item: MovieCastCredit) => (
                                    <Link
                                        to={`/details/movie/${item?.id}`}
                                        className="relative h-[280px] sm:h-[350px] rounded-xl overflow-hidden cs-card transition-transform duration-300"
                                        key={item.id}
                                        onClick={() =>
                                            window.scrollTo({
                                                top: 0,
                                                behavior: "smooth",
                                            })
                                        }
                                    >
                                        <img
                                            src={
                                                item?.poster_path
                                                    ? `${imagePath}${item?.poster_path}`
                                                    : "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"
                                            }
                                            alt={item?.title}
                                            className="w-full h-[280px] sm:h-[350px]  object-cover rounded-lg transition-transform duration-300"
                                            loading="lazy"
                                        />
                                        <div className="absolute z-2 bottom-0 start-0 w-full p-3">
                                            <h2 className="text-sm font-semibold mt-2">
                                                {item?.title}
                                            </h2>
                                            <div className="flex items-center gap-2 mt-2">
                                                <p className=" text-white text-12 font-semibold flex items-center gap-1">
                                                    <Star className="text-amber-400 w-4 h-4" />
                                                    <span className="">
                                                        {item?.vote_average
                                                            ? item?.vote_average.toFixed(
                                                                  1
                                                              )
                                                            : "0"}
                                                    </span>
                                                </p>
                                                <span className="w-[1px] h-[15px] bg-neutral-500"></span>
                                                <p className="text-neutral-400 text-12 flex items-center gap-1">
                                                    {new Date(
                                                        item?.release_date
                                                    ).getFullYear() || "N/A"}
                                                    <span className="text-neutral-500">
                                                        &#x2022;
                                                    </span>
                                                    <span>{"Movie"}</span>
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PeopleDetails;
