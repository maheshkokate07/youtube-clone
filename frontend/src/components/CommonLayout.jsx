import { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

function CommonLayout({ children }) {

    const [isSidebarCompact, setIsSidebarCompact] = useState(false);

    return (
        <div>
            <Header isSidebarCompact={isSidebarCompact} setIsSidebarCompact={setIsSidebarCompact} />
            <div className="flex">
                <Sidebar isSidebarCompact={isSidebarCompact} />
                {children}
            </div>
        </div>
    )
}

export default CommonLayout;