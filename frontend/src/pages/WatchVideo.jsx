import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import VideoPlayer from "../components/VideoPlayer";
import VideoDetails from "../components/VideoDetails";
import SuggestedVideos from "../components/SuggestedVideos";
import Comments from "../components/Comments";

function WatchVideo() {
    const { videoId } = useParams();
    const [video, setVideo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchVideo = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/videos/${videoId}`);
                setVideo(response.data.video);
            } catch (err) {
                setError("Failed to fetch video.");
            } finally {
                setLoading(false);
            }
        };

        fetchVideo();
    }, [videoId]);

    if (loading) return <p className="text-center">Loading...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;
    if (!video) return <p className="text-center text-gray-500">Video not found</p>;

    return (
        <div className="flex flex-col lg:flex-row gap-6 px-4 py-4">
            {/* Left Section (Video, Details, Comments) */}
            <div className="w-full lg:w-[70%] flex flex-col gap-4">
                <VideoPlayer video={video} />
                <VideoDetails video={video} />
                <Comments videoId={video._id} />
            </div>

            {/* Right Section (Recommended Videos) */}
            <div className="w-full lg:w-[30%]">
                <SuggestedVideos currentVideoId={video._id} />
            </div>
        </div>
    );
}

export default WatchVideo;