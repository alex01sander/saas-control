import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { RouteGuard } from "./RouteGuard";

import { LoginPage } from "../pages/Login";
import { RegisterPage } from "../pages/Register";

const DashboardPage = () => <div>Dashboard (Em breve - Precisa de Layout)</div>;

export function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<RouteGuard />}>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                </Route>

                <Route element={<RouteGuard isPrivate />}>
                    <Route path="/dashboard" element={<DashboardPage />} />
                </Route>

                <Route path="*" element={<Navigate to="/dashboard" />} />
            </Routes>
        </BrowserRouter>
    );
}
