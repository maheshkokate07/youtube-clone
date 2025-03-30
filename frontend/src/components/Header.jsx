import youtubeLogo from "../assets/youtubeLogo.svg";
import user from "../assets/user.svg";
import { CiSearch } from "react-icons/ci";
import { PiListThin } from "react-icons/pi";
import { PiUserCircleThin } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUserProfile, logout } from "../store/slices/authSlice";
import CreateChannelModal from "./CreateChannelModal";
import ConfirmationModal from "./ConfirmationModal";
import { useLayout } from "../context/LayoutContext.jsx";
import { fetchNotifications } from "../store/slices/notificationSlice.js";
import { MdOutlineNotificationsNone } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

function Header({ toggleSidebar, screenWidth }) {

    const { isAuthenticated, data: userData } = useSelector(state => state.auth.user);
    const { loading } = useSelector((state) => state.auth);
    const { notifications } = useSelector((state) => state.notifications);
    const loadingVideos = useSelector((state) => state.videos.loading);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { searchTerm, setSearchTerm } = useLayout();

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [isSearchVisible, setIsSearchVisible] = useState(true);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleLogout = () => {
        dispatch(logout());
        window.location.reload();
    };

    useEffect(() => {
        if (isAuthenticated) {
            dispatch(fetchUserProfile());
        }
    }, [isAuthenticated, dispatch]);

    useEffect(() => {
        if (userData) {
            dispatch(fetchNotifications(userData?._id))
        }
    }, [userData])

    useEffect(() => {
        if (screenWidth < 650) {
            setIsSearchVisible(false);
        } else {
            setIsSearchVisible(true);
        }
    }, [screenWidth])

    return (
        <div className="w-full h-[57px] relative flex px-4 justify-between">
            {(loading || loadingVideos) && (
                <div className="absolute top-0 left-0 w-full h-[2px] bg-red-500 animate-loading"></div>
            )}

            <div className="flex">
                <div className="flex items-center justify-center" onClick={toggleSidebar}>
                    <PiListThin
                        size={40}
                        className="cursor-pointer font-extralight hover:bg-gray-200 rounded-full p-2"
                    />
                </div>
                {
                    (screenWidth >= 650 || !isSearchVisible) && <div className="h-full w-[120px] flex items-center justify-center">
                        <img
                            width={120}
                            onClick={() => navigate("/home")}
                            src={youtubeLogo}
                            className="cursor-pointer"
                            alt="youtube-logo"
                        />
                    </div>
                }
            </div>

            {
                (screenWidth >= 650 || isSearchVisible) && <div className="flex items-center me-2 sm:me-0 w-[80%] sm:w-[45%] md:w-[45%] justify-center">
                    <input
                        type="text"
                        name="searchTerm"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className={`p-4 w-[100%] rounded-s-full h-[40px] text-dark border border-gray-300`}
                        required
                    />
                    <button className="bg-gray-100 h-[40px] border-r border-t border-b rounded-r-full border-gray-300 px-4 cursor-pointer hover:bg-gray-200">
                        <CiSearch size={24} />
                    </button>
                </div>
            }

            <div className="flex items-center justify-center gap-3 lg:gap-10 pe-2">
                {/* {isAuthenticated && (
                    <div
                        className="hidden h-[37px] bg-gray-100 sm:flex items-center justify-center gap-1 cursor-pointer rounded-full ps-2 pe-3 py-1 hover:bg-gray-200"
                        onClick={() => (!userData.channel ? setIsModalOpen(true) : "")}
                    >
                        <span className="text-[32px] text-gray-500 pb-[7px]">+</span>
                        <span
                            className="text-[14px] font-semibold"
                            onClick={() => {
                                userData?.channel ? navigate("/upload-video") : setIsModalOpen(true);
                            }}
                        >
                            {userData?.channel ? "Upload Video" : "Create channal"}
                        </span>
                    </div>
                )} */}

                {!isAuthenticated ? (
                    <div
                        className="flex items-center justify-center gap-1 border border-gray-200 cursor-pointer rounded-full ps-2 pe-3 py-1 hover:bg-blue-100 hover:border-blue-100"
                        onClick={() => navigate("/login")}
                    >
                        <PiUserCircleThin size={24} color="blue" />
                        <span className="font-semibold text-[15px] text-blue-700">Signin</span>
                    </div>
                ) : (
                    <div className="relative flex items-center gap-3">
                        {
                            screenWidth < 650 && <div>
                                <button className=" h-[40px] rounded-full border-gray-300 p-2 cursor-pointer hover:bg-gray-100" onClick={() => setIsSearchVisible(!isSearchVisible)}>
                                    {
                                        isSearchVisible ? <RxCross2 size={26} color="#363636" /> : <CiSearch size={26} color="#363636" />
                                    }
                                </button>
                            </div>
                        }
                        {
                            (screenWidth >= 650 || !isSearchVisible) &&
                            <>
                                <div
                                    className={`hidden sm:flex h-[37px] sm:ml-2 bg-gray-100 items-center justify-center gap-1 cursor-pointer rounded-full ps-2 pe-3 py-1 hover:bg-gray-200`}
                                    onClick={() => (!userData.channel ? setIsModalOpen(true) : "")}
                                >
                                    <span className="text-[32px] text-gray-500 pb-[7px]">+</span>
                                    <span
                                        className="text-[14px] font-semibold"
                                        onClick={() => {
                                            userData?.channel ? navigate("/upload-video") : setIsModalOpen(true);
                                        }}
                                    >
                                        {userData?.channel ? "Upload" : "Create"}
                                    </span>
                                </div>
                                <div>
                                    <div
                                        className="cursor-pointer relative mr-2"
                                        onClick={() => navigate("/notifications")}
                                    >
                                        <span className="text-red-500 transition duration-200">
                                            <MdOutlineNotificationsNone size="30" />
                                        </span>
                                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                            {notifications?.length || 0}
                                        </span>
                                    </div>
                                </div>

                                <div
                                    onClick={toggleMenu}
                                    className="flex items-center rounded-full justify-center cursor-pointer"
                                >
                                    <img
                                        src={userData?.userAvatar ? userData?.userAvatar : user}
                                        alt="user-avatar"
                                        className="rounded-full object-cover w-10 h-10"
                                    />
                                </div>
                            </>
                        }

                        {isMenuOpen && (
                            <div className="absolute top-10 right-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-md overflow-hidden z-50">
                                <div className="block w-full text-left px-4 py-2 border-b-1 border-gray-200">
                                    <p className="font-semibold">{userData?.userName}</p>
                                    <p
                                        className="text-blue-500 cursor-pointer"
                                        onClick={() => {
                                            userData?.channel
                                                ? navigate(`/channel/${userData?.channel}`)
                                                : setIsModalOpen(true);
                                            setIsMenuOpen(false);
                                        }}
                                    >
                                        {userData?.channel ? "View your channal" : "Create channel"}
                                    </p>
                                </div>

                                <button
                                    className="block cursor-pointer w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                                    onClick={() => {
                                        navigate("/account");
                                        setIsMenuOpen(false);
                                    }}
                                >
                                    Your Account
                                </button>
                                {userData?.channel && (
                                    <button
                                        className="block cursor-pointer w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                                        onClick={() => {
                                            navigate("/upload-video");
                                            setIsMenuOpen(false);
                                        }}
                                    >
                                        Upload Video
                                    </button>
                                )}
                                <button
                                    className="block cursor-pointer w-full text-left px-4 py-2 text-red-500 hover:bg-red-100"
                                    onClick={() => setIsConfirmOpen(true)}
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <CreateChannelModal
                isOpen={isModalOpen}
                isEditting={false}
                onClose={() => setIsModalOpen(false)}
            />

            <ConfirmationModal
                isOpen={isConfirmOpen}
                message={"Do you want to logout?"}
                onClose={() => setIsConfirmOpen(false)}
                callbackFunction={handleLogout}
            />
        </div>
    );
}

export default Header;