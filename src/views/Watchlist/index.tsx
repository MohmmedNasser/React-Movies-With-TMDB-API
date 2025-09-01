import Heading from "@/components/Heading";
import { Skeleton } from "@/components/ui/skeleton";
import WatchlistCard from "@/components/WatchlistCard";
import { useAuth } from "@/hooks/useAuth";
import { useFirestore } from "@/services/firestore";
import type { WatchListData } from "@/types/movies";
import { useEffect, useState } from "react";

const Watchlist = () => {
    const { user } = useAuth();
    const { getWatchlist } = useFirestore();

    const [watchlist, setWatchlist] = useState<WatchListData[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        if (user?.uid) {
            getWatchlist(user?.uid)
                .then((data) => {
                    setWatchlist(data);
                })
                .catch((err) => {
                    console.log(err, "error");
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
    }, [user?.uid, getWatchlist]);

    console.log(watchlist);

    return (
        <section className="pt-30 min-h-[70vh]">
            <div className="container">
                <div className="mb-5">
                    <Heading text="Watchlist" />
                </div>

                {watchlist.length === 0 && (
                    <p className="text-center text-neutral-400 py-10">
                        Watchlist is empty
                    </p>
                )}

                <div className="flex flex-col items-baseline space-y-5">
                    {watchlist &&
                        watchlist.length !== 0 &&
                        isLoading &&
                        Array.from({ length: 3 }).map((_, index) => (
                            <Skeleton
                                key={index}
                                className="w-full h-[300px] rounded-lg"
                            />
                        ))}
                    {watchlist &&
                        watchlist.length !== 0 &&
                        watchlist.map((item: WatchListData) => (
                            <div className="pb-5 border-b border-neutral-800 w-full">
                                <WatchlistCard
                                    item={item}
                                    key={item.id}
                                    type={item?.type}
                                    setWatchlist={setWatchlist}
                                />
                            </div>
                        ))}
                </div>
            </div>
        </section>
    );
};

export default Watchlist;
