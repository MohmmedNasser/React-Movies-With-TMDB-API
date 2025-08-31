import type { MoviesCard } from "@/types/movies";
import Card from "../Card";
import { Skeleton } from "../ui/skeleton";

const Recommend = ({
    recommend,
    type,
    loading,
}: {
    recommend: MoviesCard[];
    type: string | undefined;
    loading: boolean;
}) => {
    return (
        <section className="my-10">
            <div className="container">
                <h6 className="text-xl font-semibold text-white mb-4">
                    You may also like
                </h6>

                {recommend.length == 0 && !loading && (
                    <p className="text-center text-neutral-400 py-20">
                        No recommend movies or TV shows found
                    </p>
                )}

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {recommend &&
                        recommend.length !== 0 &&
                        loading &&
                        Array.from({ length: 10 }).map((_, index) => (
                            <Skeleton
                                key={index}
                                className="w-full h-[350px] rounded-lg"
                            />
                        ))}
                    {recommend &&
                        !loading &&
                        recommend.map((item: MoviesCard) => (
                            <Card item={item} key={item.id} type={type} />
                        ))}
                </div>
            </div>
        </section>
    );
};

export default Recommend;
