import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

interface RouteGuardProps {
    isPrivate?: boolean;
    isSubscriptionRequired?: boolean;
    roleRequired?: "ADMIN" | "CLIENT";
    children?: React.ReactNode;
}

export function RouteGuard({
    isPrivate = false,
    isSubscriptionRequired = false,
    roleRequired,
    children,
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

    if (roleRequired && user?.role !== roleRequired) {
        return <Navigate to="/dashboard" replace />;
    }

    return children ? <>{children}</> : <Outlet />;
}
