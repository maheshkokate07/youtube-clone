import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVideos } from "../store/slices/videoSlice";
import VideoCard from "../components/VideoCard";

function Home({searchTerm}) {
    const dispatch = useDispatch();
    const { videos = [] } = useSelector(state => state.videos.videos);
    const [filteredVideos, setFilteredVideos] = useState(videos);
    const { loading, error } = useSelector(state => state.videos);

    useEffect(() => {
        dispatch(fetchVideos());
    }, [dispatch]);

    useEffect(() => {
        if(searchTerm) {
            setFilteredVideos(videos.filter((video) => video?.title?.toLowerCase().includes(searchTerm.toLowerCase()) || video?.description?.toLowerCase().includes(searchTerm.toLowerCase())))
        } else {
            setFilteredVideos(videos);
        }
    }, [searchTerm]);

    return (
        <div className="px-4 py-2 w-full h-[calc(100vh-57px)] overflow-auto">
            {
                loading && <div className="text-center text-md mt-3 mb-5 w-full">Fetching latest videos...</div>
            }
            <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {filteredVideos?.length > 0 ? (
                    filteredVideos?.map((video) => <VideoCard key={video._id} video={video} />)
                ) : (
                    !loading && <p className="text-gray-500">No videos found</p>
                )}
            </div>
        </div>
    );
}

export default Home;