import Header from "./Header";
import Sidebar from "./Sidebar";

function CommonLayout({ children }) {
    return (
        <div>
            <Header />
            <div className="flex">
                <Sidebar />
                {children}
            </div>
        </div>
    )
}

export default CommonLayout;