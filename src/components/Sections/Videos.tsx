import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import type { Video } from "@/types/movies";
import VideoCard from "../VideoCard";

const Videos = ({ videos }: { videos: Video[] }) => {
    return (
        <section className="my-10">
            <div className="container">
                <h6 className="text-xl font-semibold text-white mb-4">
                    Videos
                </h6>

                {videos.length == 0 && (
                    <p className="text-center text-neutral-400 py-10">
                        No videos found
                    </p>
                )}

                {videos && videos.length !== 0 && (
                    <Carousel
                        className="w-full mt-5"
                        opts={{
                            align: "start",
                        }}
                    >
                        <CarouselContent className="-ml-1">
                            {videos.map((item, index) => (
                                <CarouselItem
                                    key={index}
                                    className="pl-1 basis-1/2 md:basis-1/3"
                                >
                                    <div className="p-1">
                                        <div className="flex flex-col justify-center gap-2 bg-neutral-900 p-3 rounded-md">
                                            <VideoCard item={item} />
                                        </div>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="cursor-pointer" />
                        <CarouselNext className="cursor-pointer" />
                    </Carousel>
                )}
            </div>
        </section>
    );
};

export default Videos;
