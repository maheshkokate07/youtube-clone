import { Link } from "react-router-dom";

function VideoCard({ video }) {
    return (
        <div className="w-full overflow-hidden transition duration-300 cursor-pointer">
            <Link to={`/video/${video._id}`}>
                <div className="w-full rounded-lg overflow-hidden aspect-video bg-gray-200">
                    <img 
                        src={video.thumbnailUrl} 
                        alt={video.title} 
                        className="w-full h-full object-cover"
                    />
                </div>
            </Link>
            
            <div className="p-3">
                <h3 className="text-lg font-semibold line-clamp-2">{video.title}</h3>
                <p className="text-sm text-gray-600">{video.channelId?.channelName || "Unknown Channel"}</p>
                <p className="text-sm text-gray-500">{video.views} views • {new Date(video.uploadDate).toDateString()}</p>
            </div>
        </div>
    );
}

export default VideoCard;
