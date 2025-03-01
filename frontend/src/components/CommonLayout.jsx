import { useEffect, useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

function CommonLayout({ children }) {
    const [isSidebarCompact, setIsSidebarCompact] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [screenWidth, setScreenWidth] = useState("");

    useEffect(() => {

        const handleResize = () => {
            setIsSidebarCompact(window.innerWidth < 1200);
            setScreenWidth(window.innerWidth);
        }

        handleResize();

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize)

    }, [])

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

            <div className={`flex-1 transition-all duration-300 ${!isSidebarCompact ? "opacity-75" : ""} ${screenWidth < 1200 ? "ml-[75px]" : (screenWidth > 1100 && isSidebarCompact) ? "ml-[75px] opacity-100" : "ml-[230px] opacity-100"}`}>
                {children && typeof children === "function" ? children({ searchTerm }) : children}
            </div>
        </div>
    );
}

export default CommonLayout;