import {
    fetchCredits,
    fetchDetails,
    fetchRecommend,
    fetchVideos,
} from "@/services/api";
import {
    type CastMember,
    type Movie,
    type MoviesCard,
    type TvShow,
    type Video,
} from "@/types/movies";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "react-circular-progressbar/dist/styles.css";
import Videos from "@/components/Sections/Videos";
import Cast from "@/components/Sections/Cast";
import DetailsHero from "@/components/Sections/DetailsHero";
import Recommend from "@/components/Sections/Recommend";
import LoadingSpinner from "@/components/LoadingSpinner";

const DetailsPage = () => {
    const { id, type } = useParams();
    const [details, setDetails] = useState<Movie | TvShow>();
    const [cast, setCast] = useState<CastMember[]>([]);
    const [trailer, setTrailer] = useState<Video | null>(null);
    const [videos, setVideos] = useState<Video[]>([]);
    const [recommend, setRecommend] = useState<MoviesCard[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            if (!type || !id) return;
            setLoading(true);
            try {
                const [detailsData, creditsData, videosData, recommendData] =
                    await Promise.all([
                        fetchDetails(type, Number(id)),
                        fetchCredits(type, Number(id)),
                        fetchVideos(type, Number(id)),
                        fetchRecommend(type, Number(id)),
                    ]);

                // Set Details
                setDetails(detailsData);

                // Set Cast
                setCast(creditsData.cast.slice(0, 10));

                // Set Trailer
                const foundTrailer = videosData?.results?.find(
                    (video: Video) => video?.type === "Trailer"
                );
                setTrailer(foundTrailer || null);

                // Set Videos
                const videos = videosData?.results
                    .filter((video: Video) => video?.type !== "Trailer")
                    .slice(0, 10);
                setVideos(videos);

                setRecommend(recommendData.results.slice(0, 10));
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [type, id]);

    // console.log(details, cast, trailer, videos, similar);
    // console.log(similar);

    return (
        <div>
            {loading && (
                <div className="min-h-screen flex items-center justify-center">
                    <LoadingSpinner />
                </div>
            )}

            {details && (
                <DetailsHero
                    details={details}
                    type={type ?? ""}
                    trailer={trailer}
                />
            )}

            {cast.length > 0 && !loading && <Cast cast={cast} />}

            {videos.length > 0 && !loading && <Videos videos={videos} />}

            <Recommend recommend={recommend} loading={loading} type={type} />
        </div>
    );
};

export default DetailsPage;
