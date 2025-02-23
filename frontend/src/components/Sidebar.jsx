import { IoMdHome } from "react-icons/io";
import { MdSubscriptions, MdOutlineSmartDisplay, MdOutlineWatchLater, MdHistory, MdPlaylistPlay, MdLogout } from "react-icons/md";
import { SiYoutubeshorts } from "react-icons/si";
import { BiLike } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useState } from "react";

const navItems = [
    { name: "Home", icon: <IoMdHome size={25} />, path: "/home" },
    { name: "Shorts", icon: <SiYoutubeshorts size={23} />, path: "/home" },
    { name: "Subscriptions", icon: <MdSubscriptions size={22} />, path: "/subscriptions" },
    { name: "History", icon: <MdHistory size={25} />, path: "/home" },
    { name: "Playlists", icon: <MdPlaylistPlay size={26} />, path: "/home" },
    { name: "Your videos", icon: <MdOutlineSmartDisplay size={22} />, path: "/channel" },
    { name: "Watch later", icon: <MdOutlineWatchLater size={24} />, path: "/home" },
    { name: "Liked videos", icon: <BiLike size={24} />, path: "/home" },
];

function Sidebar({ isSidebarCompact }) {

    return (
        <div className={`w-[${isSidebarCompact ? "75px" : "230px"}] px-3 h-[calc(100vh-57px)] overflow-hidden`}>
            <ul className="py-2">
                {navItems.map((item, index) => (
                    <div key={item.name}>
                        <li>
                            <Link to={item.path} className="flex items-center gap-4 px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-200">
                                <div className="w-[17%]">
                                    {item.icon}
                                </div>
                                {!isSidebarCompact && item.name}
                            </Link>
                        </li>

                        {(index + 1) % 3 === 0 && index !== navItems.length - 1 && (
                            <hr className="my-2 border-t border-gray-200" />
                        )}
                    </div>
                ))}
            </ul>
        </div>
    );
}

export default Sidebar;
