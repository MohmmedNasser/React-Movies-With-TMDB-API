import { fetchTrinding } from "@/services/api";
import { useEffect, useState } from "react";

interface Movies {
    id: number;
    title: string;
    poster_path: string;
    vote_average: number;
}

const Hero = () => {
    const [dateHero, setDataHero] = useState<Movies[]>([]);

    useEffect(() => {
        fetchTrinding("all", "day")
            .then((res) => {
                setDataHero(res.slice(0, 3));
            })
            .catch((err) => {
                console.log("err: ", err);
            });
    }, []);

    return (
        <div className="mb-5">
            {dateHero.map((item: Movies) => (
                <div key={item.id}>
                    <h1>{item.title}</h1>
                </div>
            ))}
        </div>
    );
};

export default Hero;
