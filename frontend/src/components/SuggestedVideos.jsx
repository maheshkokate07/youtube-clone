import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function SuggestedVideos() {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/videos`);
                setVideos(response.data.videos);
            } catch (err) {
                console.error("Error fetching recommended videos", err);
            }
        };

        fetchVideos();
    }, []);

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-bold">Recommended</h3>
            {videos.map((video) => (
                <Link to={`/video/${video._id}`} key={video._id} className="flex gap-2">
                    <img src={video.thumbnailUrl} className="w-24 h-16 object-cover rounded-md" alt="thumbnail" />
                    <div>
                        <h4 className="text-sm font-semibold">{video.title}</h4>
                        <p className="text-xs text-gray-600">{video.channelId.channelName}</p>
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default SuggestedVideos;