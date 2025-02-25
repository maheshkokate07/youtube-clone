import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVideos } from "../store/slices/videoSlice";
import VideoCard from "../components/VideoCard";

function Home() {
    const dispatch = useDispatch();
    const { videos = [], loading, error } = useSelector(state => state.videos.videos);

    useEffect(() => {
        dispatch(fetchVideos());
    }, [dispatch]);

    return (
        <div className="px-4 py-2 w-full">
            {loading && <p>Loading videos...</p>}
            {error && <p className="text-red-500">{error}</p>}

            <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {videos?.length > 0 ? (
                    videos?.map((video) => <VideoCard key={video._id} video={video} />)
                ) : (
                    !loading && <p className="text-gray-500">No videos found</p>
                )}
            </div>
        </div>
    );
}

export default Home;
