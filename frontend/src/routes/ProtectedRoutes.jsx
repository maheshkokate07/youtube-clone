import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoutes() {
    const { isAuthenticated } = useSelector(state => state.auth.user);

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />
}

export default ProtectedRoutes;