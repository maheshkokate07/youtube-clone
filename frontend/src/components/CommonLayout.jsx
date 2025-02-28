import { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

function CommonLayout({ children }) {
    const [isSidebarCompact, setIsSidebarCompact] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <div className="relative h-screen">
            <Header
                isSidebarCompact={isSidebarCompact}
                setIsSidebarCompact={setIsSidebarCompact}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
            />

            <div
                className={`fixed top-[67] left-0 h-full bg-white transition-all duration-300 z-50`}
            >
                <Sidebar isSidebarCompact={isSidebarCompact} />
            </div>

            <div className={`flex-1 transition-all duration-300 ml-[75px] ${!isSidebarCompact ? "opacity-75" : ""}`}>
                {children && typeof children === "function" ? children({ searchTerm }) : children}
            </div>
        </div>
    );
}

export default CommonLayout;