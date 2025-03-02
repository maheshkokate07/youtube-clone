import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import CommonLayout from "../components/CommonLayout";
import Home from "../pages/Home";
import ProtectedRoutes from "./ProtectedRoutes";
import { useSelector } from "react-redux";
import Subscriptions from "../pages/Subscriptions";
import Register from "../pages/Register";
import Channel from "../pages/Channel";
import Account from "../pages/Account";
import UploadVideo from "../pages/UploadVideo";
import WatchVideo from "../pages/WatchVideo";

const AppRoutes = () => {

    const { isAuthenticated } = useSelector(state => state.auth.user);

    return (
        <Routes>

            <Route
                path="/login"
                element={!isAuthenticated ? <Login /> : <Navigate to="/home" />}
            />

            <Route
                path="/register"
                element={!isAuthenticated ? <Register /> : <Navigate to="/home" />}
            />

            <Route element={<CommonLayout />}>

                <Route path="/" element={<Navigate to="/home" />} />
                <Route
                    path="/home"
                    element={
                        <Home />
                    }
                />

                <Route element={<ProtectedRoutes />}>

                    <Route
                        path="/subscriptions"
                        element={
                            <Subscriptions />
                        }
                    />

                    <Route
                        path="/channel/:channelId"
                        element={
                            <Channel />
                        }
                    />

                    <Route
                        path="/account"
                        element={
                            <Account />
                        }
                    />

                    <Route
                        path="/upload-video"
                        element={
                            <UploadVideo />
                        }
                    />

                    <Route
                        path="/watch/:videoId"
                        element={
                            <WatchVideo />
                        }
                    />
                </Route>
            </Route>

            <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
    )
}

export default AppRoutes;