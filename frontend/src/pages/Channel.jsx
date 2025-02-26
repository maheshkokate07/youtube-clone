import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import userImg from "../assets/user.svg";
import VideoCard from "../components/VideoCard";
import { MdEdit } from "react-icons/md";
import CreateChannelModal from "../components/CreateChannelModal";

function Channel() {
    const { channelId } = useParams();

    const { data: userData } = useSelector((state) => state.auth.user);
    const [channel, setChannel] = useState(null);
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchChannelData = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/channel/${channelId}`);
            setChannel(data?.data);
            setVideos(data?.data?.videos);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching channel:", err);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchChannelData();
    }, [channelId]);

    const handleSubscribe = () => {

    };

    if (loading) return <p className="mt-50 text-center font-semibold text-lg">Loading...</p>;

    return (
        <div className="w-full h-[calc(100vh-57px)] overflow-auto mx-auto p-4">
            <div className="flex items-center gap-6">
                <img src={channel.avatarUrl ? channel.avatarUrl : userImg} alt="Channel Avatar" className="w-24 h-24 rounded-full object-cover" />
                <div className="flex gap-4">
                    <div>
                        <h1 className="text-2xl font-bold">{channel.channelName}</h1>
                        <p className="text-gray-500">{channel.subscribers.length} Subscribers</p>
                        <p className="text-gray-700">{channel.description}</p>
                    </div>
                    {
                        (userData.channel === channelId) && <div style={{ marginTop: "-3px" }} onClick={() => setIsModalOpen(true)}>
                            <MdEdit size={40} className="cursor-pointer font-extralight hover:bg-gray-200 rounded-full p-2" />
                        </div>
                    }
                </div>

                {
                    (userData.channel !== channelId) && <button
                        onClick={handleSubscribe}
                        className={`px-4 py-2 rounded-lg text-white font-semibold ${channel.isSubscribed ? "bg-gray-500" : "bg-red-500"
                            }`}
                    >
                        {channel.isSubscribed ? "Unsubscribe" : "Subscribe"}
                    </button>
                }
            </div>

            <h2 className="text-xl font-semibold my-6">Uploaded Videos</h2>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {videos.length > 0 ? (
                    videos.map((video) => <VideoCard key={video._id} video={video} />)
                ) : (
                    <p className="col-span-full text-center text-gray-500">No videos uploaded yet.</p>
                )}
            </div>

            <CreateChannelModal
                isOpen={isModalOpen}
                isEditting={true}
                channel={{
                    channelName: channel.channelName,
                    description: channel.description,
                    avatarUrl: channel.avatarUrl
                }}
                onClose={() => {
                    setIsModalOpen(false)
                }}
                fetchChannelData={fetchChannelData}
            />
        </div>
    );
}

export default Channel;