import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Login from "../pages/Login";
import CommonLayout from "../components/CommonLayout";
import Home from "../pages/Home";
import ProtectedRoutes from "./ProtectedRoutes";
import { useSelector } from "react-redux";
import Subscriptions from "../pages/Subscriptions";
import Register from "../pages/Register";
import Channel from "../pages/Channel";

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

            <Route element={<ProtectedRoutes />}>

                <Route path="/" element={<Navigate to="/home" />} />

                <Route
                    path="/home"
                    element={
                        <CommonLayout>
                            <Home />
                        </CommonLayout>
                    }
                />

                <Route
                    path="/subscriptions"
                    element={
                        <CommonLayout>
                            <Subscriptions />
                        </CommonLayout>
                    }
                />

                <Route
                    path="/channel/:channelId"
                    element={
                        <CommonLayout>
                            <Channel />
                        </CommonLayout>
                    }
                />
            </Route>

            <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
    )
}

export default AppRoutes;