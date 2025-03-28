// import { useEffect, useState } from "react";
// import Header from "./Header";
// import Sidebar from "./Sidebar";
// import { Outlet } from "react-router-dom";
// import { useLayout } from "../context/LayoutContext.jsx";

// // Common layout
// function CommonLayout() {

//     const { isSidebarCompact, setIsSidebarCompact } = useLayout();
//     const [screenWidth, setScreenWidth] = useState("");

//     // Set screen width to handle responsiveness
//     useEffect(() => {
//         const handleResize = () => {
//             setIsSidebarCompact(window.innerWidth < 1280);
//             setScreenWidth(window.innerWidth);
//         }

//         handleResize();
//         window.addEventListener("resize", handleResize);
//         return () => window.removeEventListener("resize", handleResize)
//     }, [])

//     return (
//         <div className="relative h-screen">
//             <Header />
//             <div
//                 className={`fixed top-[57px] left-0 h-full bg-white transition-all duration-300 z-50`}
//             >
//                 <Sidebar />
//             </div>

//             <div className={`flex-1 transition-all duration-300 ${!isSidebarCompact ? "opacity-75" : ""} ${screenWidth < 1280 ? "ml-[75px]" : (screenWidth > 1280 && isSidebarCompact) ? "ml-[75px] opacity-100" : "ml-[230px] opacity-100"}`}>
//                 <Outlet />
//             </div>
//         </div>
//     );
// }

// export default CommonLayout;


import { useEffect, useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { useLayout } from "../context/LayoutContext.jsx";

function CommonLayout() {
    const { isSidebarCompact, setIsSidebarCompact } = useLayout();
    const [screenWidth, setScreenWidth] = useState("");
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            setScreenWidth(width);
            if (width < 800) {
                setIsSidebarVisible(false);
                setIsSidebarCompact(false);
            } else if (width < 1200 && width > 800) {
                setIsSidebarCompact(true);
                setIsSidebarVisible(false);
            } else {
                setIsSidebarVisible(true);
                setIsSidebarCompact(false);
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [setIsSidebarCompact]);

    const toggleSidebar = () => {
        if (screenWidth < 800) {
            setIsSidebarVisible((prev) => !prev);
        } else {
            setIsSidebarCompact((prev) => !prev);
        }
    };

    return (
        <div className="relative h-screen">
            <Header toggleSidebar={toggleSidebar} />
            <div
                className={`fixed top-[57px] left-0 h-[calc(100vh-57px)] bg-white transition-all duration-300 z-50 ${screenWidth < 800
                    ? `${isSidebarVisible ? "translate-x-0" : "-translate-x-full"} w-[230px]`
                    : `w-${isSidebarCompact ? "[75px]" : "[230px]"} translate-x-0`
                    }`}
            >
                <Sidebar />
            </div>

            <div
                className={`flex-1 transition-all duration-300 ${screenWidth < 1200
                    ? "ml-0"
                    : !isSidebarCompact
                        ? "ml-[230px]"
                        : "ml-[70px]"
                    } 
                    ${(screenWidth < 1200 && screenWidth > 800) && "ml-[70px]"} 
                    ${(screenWidth < 800 && isSidebarVisible) && "opacity-75"}
                    ${(screenWidth < 1200 && screenWidth > 800 && !isSidebarCompact) && "opacity-75"}`}
            >
                <Outlet />
            </div>
        </div>
    );
}

export default CommonLayout;