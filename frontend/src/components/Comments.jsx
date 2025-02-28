import { useEffect, useState } from "react";
import axios from "axios";
import user from "../assets/user.svg"
import { useSelector } from "react-redux";
import { MdDeleteSweep } from "react-icons/md";

function Comments({ videoId }) {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [totalComments, setTotalComments] = useState(0);
    const [loading, setLoading] = useState(false);

    const { data: userData, token } = useSelector(state => state.auth.user);

    const fetchComments = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/comments/${videoId}`);
            setComments(response.data.data);
            setTotalComments(response?.data?.data?.length);
            // console.log(response.data.data);
        } catch (err) {
            console.error("Error fetching comments", err);
        }
    };

    useEffect(() => {
        fetchComments();
    }, [videoId]);

    const handleCommentSubmit = async () => {
        try {
            setLoading(true);
            await axios.post(`${import.meta.env.VITE_API_URL}/api/comments/add`, {
                userId: userData._id,
                videoId,
                text: newComment
            });
            setNewComment("");
            fetchComments();
        } catch (err) {
            console.error("Error adding comment", err);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteComment = async (commentId) => {
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/api/delete-comment/${commentId}`);
            fetchComments();
        } catch (err) {
            console.log("Error deleting comment", err);
        }
    }

    return (
        <div className="mt-4">
            <h3 className="text-xl font-bold mb-2">{totalComments} Comments</h3>

            <div className="flex gap-2">
                <div className="flex-shrink-0">
                    <img
                        src={userData?.userAvatar ? userData?.userAvatar : user}
                        alt="channel-avatar"
                        className="w-12 h-12 rounded-full object-cover"
                    />
                </div>
                <div className="flex items-center gap-2 w-full">
                    <input
                        type="text"
                        className="flex-grow p-2 border border-gray-300 rounded-md h-10"
                        placeholder="Add a comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                    />
                    <button
                        className="bg-blue-500 text-white px-4 h-10 py-2 rounded-md hover:bg-blue-600 cursor-pointer"
                        onClick={handleCommentSubmit}
                    >
                        {loading ? "Adding..." : "Comment"}
                    </button>
                </div>
            </div>

            {
                comments.length === 0 && <div className="mt-2 font-semibold">No comments</div>
            }
            <ul className="mt-4 space-y-2">
                {comments?.map((comment) => (
                    <li key={comment._id} className="flex gap-2 justify-between">
                        <div className="flex-shrink-0">
                            <img
                                src={comment?.userId?.userAvatar ? comment?.userId?.userAvatar : user}
                                alt="channel-avatar"
                                className="w-12 h-12 rounded-full object-cover"
                            />
                        </div>
                        <div className="w-full">
                            <p className="text-sm text-gray-600">@{comment.userId.userName}<span className="pl-2">{(new Date(comment?.timestamp).toLocaleString("en-IN"))}</span></p>
                            <p className="text-md">{comment.text}</p>
                        </div>
                        <div className="flex items-center justify-center">
                            {
                                (comment?.userId?._id === userData._id) && <MdDeleteSweep size={40} color="#ff333d" className="cursor-pointer hover:bg-gray-200 rounded-full p-2" onClick={() => handleDeleteComment(comment._id)} />
                            }
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Comments;