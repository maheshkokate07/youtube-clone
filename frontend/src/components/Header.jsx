import youtubeLogo from "../assets/youtubeLogo.svg";
import user from "../assets/user.svg";
import { CiSearch } from "react-icons/ci";
import { PiListThin } from "react-icons/pi";
import { PiUserCircleThin } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/slices/authSlice";

function Header({ isSidebarCompact, setIsSidebarCompact }) {

    const { isAuthenticated } = useSelector(state => state.auth.user);
    const userImg = "";
    const channel = true;
    const { loading } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="w-full h-[57px] relative flex md:px-4 justify-between">

            {loading && <div className="absolute top-0 left-0 w-full h-[2px] bg-red-500 animate-loading"></div>}

            <div className="flex">
                <div className="flex items-center justify-center" onClick={() => setIsSidebarCompact(!isSidebarCompact)}>
                    <PiListThin size={40} className="cursor-pointer font-extralight hover:bg-gray-200 rounded-full p-2" />
                </div>
                <div className="h-full w-[120px] flex items-center justify-center">
                    <img width={120} src={youtubeLogo} className="cursor-pointer" alt="youtube-logo" />
                </div>
            </div>
            <div className="flex items-center md:w-[45%] justify-center">
                <input
                    type="text"
                    name="searchTerm"
                    placeholder="Search"
                    // value={""}
                    // onChange={""}
                    className="p-4 w-[100%] rounded-s-full h-[40px] text-dark border border-gray-300"
                    required
                />
                <button className="bg-gray-100 h-[40px] border-r border-t border-b rounded-r-full border-gray-300 px-4 cursor-pointer hover:bg-gray-200">
                    <CiSearch size={24} />
                </button>
            </div>
            <div className="flex items-center justify-center gap-10 pe-2">
                <div className="h-[37px] bg-gray-100 flex items-center justify-center gap-1 cursor-pointer rounded-full ps-2 pe-3 py-1 hover:bg-gray-200 ">
                    <span className="text-[35px] text-gray-500 pb-[7px]">+</span>
                    <span className="text-[15px]">
                        {
                            channel ? "Upload Video" : "Create channal"
                        }
                    </span>
                </div>
                {
                    !isAuthenticated ?
                        <div className="flex items-center justify-center gap-1 border border-gray-200 cursor-pointer rounded-full ps-2 pe-3 py-1 hover:bg-blue-100 hover:border-blue-100">
                            <PiUserCircleThin size={24} color="blue" />
                            <span className="font-semibold text-[15px] text-blue-700">
                                Sign in
                            </span>
                        </div> :
                        <div className="relative">
                            <div
                                onClick={toggleMenu}
                                className="flex items-center rounded-full justify-center cursor-pointer"
                            >
                                <img
                                    src={userImg ? userImg : user}
                                    width={34}
                                    alt="user-avatar"
                                    className="rounded-full"
                                />
                            </div>

                            {isMenuOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-md overflow-hidden z-50">
                                    <button
                                        className="block cursor-pointer w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                                        onClick={() => navigate("/account")}
                                    >
                                        Your Account
                                    </button>
                                    <button
                                        className="block cursor-pointer w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                                        onClick={() => channel ? navigate("/channel") : navigate("/create-channel")}
                                    >
                                        {channel ? "Your Channel" : "Create Channel"}
                                    </button>
                                    {
                                        channel &&
                                        <button
                                            className="block cursor-pointer w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                                            onClick={() => navigate("upload-video")}
                                        >
                                            Upload Video
                                        </button>
                                    }
                                    <button
                                        className="block cursor-pointer w-full text-left px-4 py-2 text-red-600 hover:bg-red-100"
                                        onClick={() => {
                                            dispatch(logout());
                                            navigate("/login");
                                        }}
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                }
            </div>
        </div >
    )
}

export default Header;