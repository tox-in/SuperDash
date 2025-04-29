import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const protectedRoute = () => {
    const { isAuthenticated, isLoading } = useAuth();

    if(isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-supamenu-orange"></div>
            </div>
        );
    }

    if(!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default protectedRoute;