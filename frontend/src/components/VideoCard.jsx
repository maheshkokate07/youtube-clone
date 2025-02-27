import { Link } from "react-router-dom";
import user from "../assets/user.svg";

function VideoCard({ video }) {

    function formatDuration(durationInSeconds) {
        const minutes = Math.floor(durationInSeconds / 60);
        const seconds = durationInSeconds % 60;
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    }

    return (
        <div className="w-full overflow-hidden transition duration-300 cursor-pointer">
            <Link to={`/watch/${video._id}`} className="relative">
                <div className="w-full rounded-lg overflow-hidden aspect-video bg-gray-200">
                    <img
                        src={video.thumbnailUrl}
                        alt={video.title}
                        className="w-full h-full object-cover"
                    />
                </div>

                {video.duration && (
                    <span className="absolute bottom-2 right-2 bg-black opacity-80 text-white text-xs font-semibold px-2 py-1 rounded">
                        {formatDuration(video?.duration)}
                    </span>
                )}
            </Link>

            <div className="p-3 flex gap-3">
                {
                    video.channelId?.avatarUrl && <div className="flex-shrink-0">
                        <img
                            src={video.channelId?.avatarUrl ? video.channelId.avatarUrl : user}
                            alt="channel-avatar"
                            className="w-10 h-10 rounded-full object-cover"
                        />
                    </div>
                }

                <div className="flex flex-col w-full">
                    <h3 className="text-lg font-semibold line-clamp-2">{video.title}</h3>
                    {
                        video.channelId?.channelName && <p className="text-sm text-gray-600">{video.channelId?.channelName || "Unknown Channel"}</p>
                    }
                    <p className="text-sm text-gray-500">{video.views} views • {new Date(video.uploadDate).toDateString()}</p>
                </div>
            </div>
        </div>
    );
}

export default VideoCard;