interface VideoCardProps {
    id: string;
    key: string;
    name: string;
}

const VideoCard = ({ item }: { item: VideoCardProps }) => {
    return (
        <>
            <iframe
                width="100%"
                height="250px"
                src={`https://www.youtube.com/embed/${item.key}?si=${item.id}`}
                title="YouTube video player"
                allowFullScreen
            ></iframe>
            <div>
                <p className="text-sm text-white mt-2 line-clamp-1">
                    {item.name}
                </p>
            </div>
        </>
    );
};

export default VideoCard;
