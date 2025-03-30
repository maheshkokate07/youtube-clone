import { BiLike, BiDislike, BiSolidLike, BiSolidDislike } from "react-icons/bi";
import { useEffect, useState } from "react";
import axios from "axios";
import user from "../assets/user.svg"
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../store/slices/authSlice";
import { useNavigate } from "react-router-dom";

// Video Details component
function VideoDetails({ video }) {
    const [likes, setLikes] = useState(video.likes?.length);
    const [dislikes, setDislikes] = useState(video.dislikes?.length);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [likeLoading, setLikeLoading] = useState(false);
    const [dislikeLoading, setDislikeLoading] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [shortDescription, setShortDescription] = useState(video.description.length > 180 ? video.description.slice(0, 180) : "");

    const { data: userData, token } = useSelector(state => state.auth.user);

    // Check if user subscribed to the channel
    const [isSubscribed, setIsSubscribed] = useState(userData?.subscribedChannels?.includes(video.channelId?._id));
    const [isLiked, setIsLiked] = useState(video.likes?.includes(userData._id));
    const [isDisliked, setIsDisliked] = useState(video.dislikes?.includes(userData._id));
    const [totalSubscribers, setTotalSubscribers] = useState(video?.channelId?.subscribers.length);

    useEffect(() => {
        setLikes(video.likes?.length);
        setDislikes(video.dislikes?.length);
        setIsSubscribed(userData?.subscribedChannels?.includes(video.channelId?._id));
        setIsLiked(video.likes?.includes(userData._id));
        setIsDisliked(video.dislikes?.includes(userData._id));
        setTotalSubscribers(video?.channelId?.subscribers.length);
        setShortDescription(video.description.length > 180 ? video.description.slice(0, 180) : "")
        setIsExpanded(false);
    }, [video])

    // Function for handle like
    const handleLike = async () => {
        try {
            setLikeLoading(true);
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/like-video/${video._id}`, { userId: userData._id });
            setLikes(response?.data?.likes);
            setDislikes(response?.data?.dislikes);

            // Handle like and dislike states locally avoiding API call after like update
            if (isLiked) {
                setIsLiked(false);
            } else {
                setIsLiked(true);
                setIsDisliked(false);
            }
        } catch (err) {
            console.error("Error liking video", err);
        } finally {
            setLikeLoading(false);
        }
    };

    // Function for dislike
    const handleDislike = async () => {
        try {
            setDislikeLoading(true);
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/dislike-video/${video._id}`, { userId: userData._id });
            setLikes(response?.data?.likes);
            setDislikes(response?.data?.dislikes);

            if (isDisliked) {
                setIsDisliked(false);
            } else {
                setIsDisliked(true);
                setIsLiked(false);
            }
        } catch (err) {
            console.error("Error disliking video", err);
        } finally {
            setDislikeLoading(false);
        }
    };

    // Function for subscribing the channel
    const handleSubscribe = async () => {
        try {
            setLoading(true);
            await axios.post(`${import.meta.env.VITE_API_URL}/api/channel/subscribe/${video.channelId?._id}`, { userId: userData._id });
            dispatch(fetchUserProfile());

            // Handle subscribed and count state locally to avoid API call when subscribe or unsubscribe 
            if (isSubscribed) {
                setTotalSubscribers(totalSubscribers - 1);
            } else {
                setTotalSubscribers(totalSubscribers + 1);
            }
            setIsSubscribed(!isSubscribed);
        } catch (err) {
            console.log("Error subscribing channel", err)
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <h2 className="text-xl font-bold">{video.title}</h2>

            <div className="flex flex-col items-start sm:flex-row sm:items-center gap-3 mt-3">
                <div className="flex gap-2">

                    <div className="flex-shrink-0 cursor-pointer" onClick={() => navigate(`/channel/${video.channelId._id}`)}>
                        <img
                            src={video.channelId?.avatarUrl ? video.channelId.avatarUrl : user}
                            alt="channel-avatar"
                            className="w-12 h-12 rounded-full object-cover"
                        />
                    </div>
                    <div className="flex flex-col cursor-pointer" onClick={() => navigate(`/channel/${video.channelId._id}`)}>
                        {
                            video.channelId?.channelName && <p className="text-[17px] font-semibold">{video.channelId?.channelName || "Unknown Channel"}</p>
                        }
                        <p className="text-[15px] text-gray-600">{totalSubscribers} subscribers</p>
                    </div>
                </div>
                <div className="flex gap-2">

                    <div className="ml-1">
                        <button
                            onClick={handleSubscribe}
                            className={`px-4 py-2 cursor-pointer rounded-lg text-white font-semibold ${isSubscribed ? "bg-gray-500 hover:bg-gray-600" : "bg-red-500 hover:bg-red-600"}`}
                        >
                            {!loading && (isSubscribed ? "Unsubscribe" : "Subscribe")}
                            {loading && <div className="w-6 h-6 border-4 border-t-4 border-r-4 border-gray-200 border-t-red-500 border-r-red-500 rounded-full animate-spin"></div>}
                        </button>
                    </div>
                    <div className="flex bg-gray-200 rounded-lg overflow-hidden">
                        <button className="flex items-center p-2 gap-2 hover:bg-gray-300 cursor-pointer pr-3 border-r border-gray-300" onClick={handleLike}>
                            {!likeLoading && (isLiked ? <BiSolidLike size={24} /> : <BiLike size={24} />)} {!likeLoading && likes}
                            {likeLoading && <div className="w-6 h-6 border-4 border-t-4 border-r-4 border-gray-200 border-t-red-500 border-r-red-500 rounded-full animate-spin"></div>}
                        </button>
                        <button className="flex items-center gap-2 p-2 hover:bg-gray-300 cursor-pointer pl-3" onClick={handleDislike}>
                            {!dislikeLoading && (isDisliked ? <BiSolidDislike size={24} /> : <BiDislike size={24} />)} {!dislikeLoading && dislikes}
                            {dislikeLoading && <div className="w-6 h-6 border-4 border-t-4 border-r-4 border-gray-200 border-t-red-500 border-r-red-500 rounded-full animate-spin"></div>}
                        </button>
                    </div>
                </div>
            </div>

            <div className="mt-4 rounded-lg bg-gray-200 p-3">
                <p className="text-[15px] font-semibold">{video.views} views <span className="ml-2">{new Date(video.uploadDate).toDateString().split(" ").slice(-3).join(" ")}</span></p>
                <p className="text-gray-700">
                    {(isExpanded || !shortDescription) ? video.description : shortDescription}
                    {video.description.length > 180 && (
                        <span 
                            className="text-blue-700 font-semibold cursor-pointer"
                            onClick={() => setIsExpanded(!isExpanded)}
                        >
                            {isExpanded ? " show less" : " ...more"}
                        </span>
                    )}
                </p>
            </div>
        </div>
    );
}

export default VideoDetails;