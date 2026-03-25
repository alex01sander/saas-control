import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { RouteGuard } from "./RouteGuard";

import { AuthLayout } from "../layouts/AuthLayout";
import { AppLayout } from "../layouts/AppLayout";

import { LoginPage } from "../pages/Login";
import { RegisterPage } from "../pages/Register";
import { DashboardPage } from "../pages/Dashboard";
import { CustomerManagement } from "../pages/Admin/Customers";
import { SuccessPage } from "../pages/Success";
import { CancelPage } from "../pages/Cancel";
import { PlansPage } from "../pages/Plans";

import { ProfilePage } from "../pages/Profile";


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
                        <Route
                            path="/admin/customers"
                            element={
                                <RouteGuard isPrivate roleRequired="ADMIN">
                                    <CustomerManagement />
                                </RouteGuard>
                            }
                        />
                        <Route path="/profile" element={<ProfilePage />} />

                        <Route
                            path="/plans"
                            element={
                                <RouteGuard isPrivate roleRequired="CLIENT">
                                    <PlansPage />
                                </RouteGuard>
                            }
                        />
                        <Route path="/success" element={<SuccessPage />} />
                        <Route path="/cancel" element={<CancelPage />} />
                    </Route>
                </Route>

                <Route path="*" element={<Navigate to="/dashboard" />} />
            </Routes>
        </BrowserRouter>
    );
}
