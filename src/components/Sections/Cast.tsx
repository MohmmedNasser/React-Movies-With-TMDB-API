import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { imagePath } from "@/services/api";
import type { CastMember } from "@/types/movies";

import Autoplay from "embla-carousel-autoplay";

const Cast = ({ cast }: { cast: CastMember[] }) => {
    return (
        <section className="my-10">
            <div className="container">
                <h6 className="text-xl font-semibold text-white mb-4">
                    Top Cast
                </h6>

                {cast.length == 0 && (
                    <p className="text-center">No cast found</p>
                )}

                {cast && cast.length !== 0 && (
                    <Carousel
                        className="w-full mt-5"
                        opts={{
                            align: "start",
                        }}
                        plugins={[
                            Autoplay({
                                delay: 5000,
                            }),
                        ]}
                    >
                        <CarouselContent className="-ml-1">
                            {cast.map((item, index) => (
                                <CarouselItem
                                    key={index}
                                    className="pl-1 basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/6"
                                >
                                    <div className="p-1">
                                        <div className="flex items-center justify-center gap-2">
                                            <div className="w-[50px] h-[50px] rounded-full  relative shrink-0">
                                                <img
                                                    src={
                                                        item.profile_path
                                                            ? `${imagePath}${item.profile_path}`
                                                            : "https://upload.wikimedia.org/wikipedia/commons/2/2f/No-photo-m.png"
                                                    }
                                                    loading="lazy"
                                                    alt={item.name}
                                                    className="absolute w-full h-full rounded-full object-cover"
                                                />
                                            </div>
                                            <div className="shrink-0">
                                                <p className="text-[13px] text-white">
                                                    {item?.name}
                                                </p>
                                                <span className="text-[10px] text-gray-300">
                                                    {item?.character}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="cursor-pointer hidden lg:block" />
                        <CarouselNext className="cursor-pointer hidden lg:block" />
                    </Carousel>
                )}
            </div>
        </section>
    );
};

export default Cast;
