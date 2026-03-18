import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { RouteGuard } from "./RouteGuard";

export function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<RouteGuard />}>
                    <Route path="/login" element={<h1>Login Page</h1>} />
                    <Route path="/register" element={<h1>Register Page</h1>} />
                </Route>

                <Route element={<RouteGuard isPrivate />}>
                    <Route path="/dashboard" element={<h1>Dashboard</h1>} />
                    <Route path="/profile" element={<h1>Profile</h1>} />
                    <Route path="/plans" element={<h1>Escolha seu Plano</h1>} />
                </Route>

                <Route
                    element={<RouteGuard isPrivate isSubscriptionRequired />}
                >
                    <Route
                        path="/premium-content"
                        element={<h1>Conteúdo Exclusivo</h1>}
                    />
                </Route>

                <Route path="*" element={<Navigate to="/dashboard" />} />
            </Routes>
        </BrowserRouter>
    );
}
