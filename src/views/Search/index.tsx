import Card from "@/components/Card";
import Heading from "@/components/Heading";
import Pagination from "@/components/Pagination";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useDebounce } from "@/hooks/useDebounce";
import { searchData } from "@/services/api";
import type { MoviesCard } from "@/types/movies";
import { useEffect, useRef, useState } from "react";
const Search = () => {
    const [searchValue, setSearchValue] = useState("");
    const [activePage, setActivePage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState<MoviesCard[]>([]);
    const debouncedSearch = useDebounce(searchValue, 500);
    const inputSearch = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setIsLoading(true);
        if (inputSearch.current) {
            inputSearch.current.focus();
        }
        searchData(debouncedSearch, activePage)
            .then((res) => {
                console.log(res, "res");
                setData(res?.results);
                setActivePage(res?.page);
                setTotalPages(res?.total_pages);
            })
            .catch((err) => {
                console.log("err: ", err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [debouncedSearch, activePage]);

    console.log(data);

    return (
        <section className="pt-30 min-h-[70vh]">
            <div className="container">
                <Heading text="Search" />

                <div className="my-5">
                    <Input
                        ref={inputSearch}
                        type="text"
                        className="h-[50px]"
                        placeholder="Search movies, tv shows..."
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                </div>
                {searchValue && (
                    <>
                        <h2 className="text-base font-bold text-neutral-300">
                            Search result for :{" "}
                            <span className="text-white ps-1 capitalize">
                                {searchValue}
                            </span>
                        </h2>
                    </>
                )}

                <div>
                    {data.length === 0 && !isLoading && searchValue && (
                        <p className="text-center text-neutral-400 pt-10">
                            No Results found
                        </p>
                    )}

                    {data.length === 0 && !isLoading && !searchValue && (
                        <p className="text-center text-neutral-400 pt-10">
                            Type something to search...
                        </p>
                    )}

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-5">
                        {isLoading &&
                            Array.from({ length: 20 }).map((_, index) => (
                                <Skeleton
                                    key={index}
                                    className="w-full h-[350px] rounded-lg"
                                />
                            ))}
                        {data.length > 0 &&
                            !isLoading &&
                            data.map((item: MoviesCard) => (
                                <Card item={item} key={item.id} type="movie" />
                            ))}
                    </div>
                </div>

                {data.length > 0 && !isLoading && (
                    <Pagination
                        activePage={activePage}
                        setActivePage={setActivePage}
                        totalPages={totalPages}
                    />
                )}
            </div>
        </section>
    );
};

export default Search;
