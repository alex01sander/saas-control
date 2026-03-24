import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { RouteGuard } from "./RouteGuard";

import { AuthLayout } from "../layouts/AuthLayout";
import { AppLayout } from "../layouts/AppLayout";

import { LoginPage } from "../pages/Login";
import { RegisterPage } from "../pages/Register";
import { SuccessPage } from "../pages/Success";
import { CancelPage } from "../pages/Cancel";

const DashboardPage = () => (
    <div className="bg-white p-6 rounded-lg shadow-sm">
        Conteúdo do Dashboard
    </div>
);
import { ProfilePage } from "../pages/Profile";

const PlansPage = () => (
    <div className="bg-white p-6 rounded-lg shadow-sm">
        Gerenciamento de Assinatura
    </div>
);

export function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<RouteGuard />}>
                    <Route element={<AuthLayout />}>
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                    </Route>
                </Route>

                <Route element={<RouteGuard isPrivate />}>
                    <Route element={<AppLayout />}>
                        {" "}
                        <Route path="/dashboard" element={<DashboardPage />} />
                        <Route path="/profile" element={<ProfilePage />} />
                        <Route path="/plans" element={<PlansPage />} />
                        <Route path="/success" element={<SuccessPage />} />
                        <Route path="/cancel" element={<CancelPage />} />
                    </Route>
                </Route>

                <Route path="*" element={<Navigate to="/dashboard" />} />
            </Routes>
        </BrowserRouter>
    );
}
