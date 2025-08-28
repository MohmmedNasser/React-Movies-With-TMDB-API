import Card from "@/components/Card";
import Heading from "@/components/Heading";
import Pagination from "@/components/Pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchTvSeries } from "@/services/api";
import type { MoviesCard } from "@/types/movies";
import { useEffect, useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const Shows = () => {
    const [shows, setShows] = useState<MoviesCard[]>([]);
    const [activePage, setActivePage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [sortBy, setSortBy] = useState("popularity.desc");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        fetchTvSeries(activePage, sortBy)
            .then((res) => {
                console.log(res);
                setShows(res?.results);
                setActivePage(res?.page);
                setTotalPages(res?.total_pages);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [activePage, sortBy]);

    console.log(shows);

    return (
        <section className="pt-30">
            <div className="container">
                <div className="flex items-center justify-between mb-5">
                    <Heading text="Discover TV Shows" />
                    <Select
                        onValueChange={(value) => {
                            setSortBy(value);
                            setActivePage(1);
                        }}
                    >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Sort By" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="popularity.desc">
                                Popular
                            </SelectItem>
                            <SelectItem value="vote_average.desc&vote_count.gte">
                                Top Rated
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-5">
                    {isLoading &&
                        Array.from({ length: 20 }).map((_, index) => (
                            <Skeleton
                                key={index}
                                className="w-full h-[350px] rounded-lg"
                            />
                        ))}
                    {shows &&
                        shows.map((item: MoviesCard) => (
                            <Card item={item} key={item.id} type="tv" />
                        ))}
                </div>

                <Pagination
                    activePage={activePage}
                    setActivePage={setActivePage}
                    totalPages={totalPages}
                />
            </div>
        </section>
    );
};

export default Shows;
