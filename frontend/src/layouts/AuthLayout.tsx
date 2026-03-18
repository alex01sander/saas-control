import { Outlet } from "react-router-dom";

export function AuthLayout() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <h2 className="text-3xl font-bold">SaaS Control</h2>
                </div>
                <Outlet />
            </div>
        </div>
    );
}
