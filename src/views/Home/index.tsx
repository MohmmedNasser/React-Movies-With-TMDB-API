import Heading from "@/components/Heading";
import { fetchTrinding } from "@/services/api";
import { useEffect, useState } from "react";
import Hero from "@/components/Sections/Hero";
import Card from "@/components/Card";
import type { Movies } from "@/types/movies";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const Home = () => {
    const [data, setData] = useState<Movies[]>([]);
    const [loading, setLoading] = useState(true);
    const [timeWindow, setTimeWindow] = useState("day");

    useEffect(() => {
        setLoading(true);
        fetchTrinding("all", timeWindow)
            .then((res) => {
                console.log(res);
                setData(res);
            })
            .catch((err) => {
                console.log("err: ", err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [timeWindow]);
    return (
        <div>
            <Hero />
            <section>
                <div className="container">
                    <div className="flex items-center justify-between mb-5 ">
                        <Heading text="Trinding" />
                        <div className="flex items-center gap-3">
                            <Button
                                variant={"secondary"}
                                className={`cursor-pointer rounded-full ${
                                    timeWindow === "day" ? "!bg-primary" : ""
                                }`}
                                onClick={() => setTimeWindow("day")}
                            >
                                Today
                            </Button>
                            <Button
                                variant={"secondary"}
                                className={`cursor-pointer rounded-full ${
                                    timeWindow === "week" ? "!bg-primary" : ""
                                }`}
                                onClick={() => setTimeWindow("week")}
                            >
                                This Week
                            </Button>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {loading &&
                            Array.from({ length: 20 }).map((_, index) => (
                                <Skeleton
                                    key={index}
                                    className="w-full h-[350px] rounded-lg"
                                />
                            ))}
                        {data &&
                            data.map((item: Movies) => (
                                <Card item={item} key={item.id} />
                            ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
