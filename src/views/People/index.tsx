import Heading from "@/components/Heading";
import Pagination from "@/components/Pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchPeople, imagePath } from "@/services/api";
import type { Person } from "@/types/movies";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const People = () => {
    const [people, setPeople] = useState<Person[]>([]);
    const [activePage, setActivePage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        fetchPeople(activePage)
            .then((res) => {
                setPeople(res?.results);
                setActivePage(res?.page);
                setTotalPages(res?.total_pages);
            })
            .catch((err) => {
                console.log("err: ", err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [activePage]);

    console.log(people);

    return (
        <section className="pt-30">
            <div className="container">
                <div className="">
                    <Heading text="Trinding People" />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-5">
                    {isLoading &&
                        people.length !== 0 &&
                        Array.from({ length: 20 }).map((_, index) => (
                            <Skeleton
                                key={index}
                                className="w-full h-[350px] rounded-lg"
                            />
                        ))}
                    {people &&
                        !isLoading &&
                        people.map((item) => (
                            <Link
                                to={`/people/details/${item?.id}`}
                                key={item.id}
                                className="relative h-[280px] sm:h-[350px]  rounded-xl overflow-hidden cs-card transition-transform duration-300"
                            >
                                <img
                                    src={`${imagePath}${item?.profile_path}`}
                                    alt={item?.name}
                                    className="w-full h-[280px] sm:h-[350px] object-cover rounded-lg transition-transform duration-300"
                                    loading="lazy"
                                />
                                <div className="absolute z-2 bottom-0 start-0 w-full p-3">
                                    <p className="text-sm font-semibold mt-2">
                                        {item.name}
                                    </p>
                                </div>
                            </Link>
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

export default People;
