import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

interface RouteGuardProps {
    isPrivate?: boolean;
    isSubscriptionRequired?: boolean;
}

export function RouteGuard({
    isPrivate = false,
    isSubscriptionRequired = false,
}: RouteGuardProps) {
    const { user, isAuthenticated, loading } = useContext(AuthContext);

    if (loading) {
        return <div>Carregando...</div>;
    }

    if (isPrivate && !isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (!isPrivate && isAuthenticated) {
        return <Navigate to="/dashboard" replace />;
    }

    if (isSubscriptionRequired && user?.subscriptionStatus !== "ACTIVE") {
        return <Navigate to="/plans" replace />;
    }

    return <Outlet />;
}
