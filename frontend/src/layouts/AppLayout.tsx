import { Outlet, Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { LayoutDashboard, User, CreditCard, LogOut } from "lucide-react";

export function AppLayout() {
    const { signOut, user } = useContext(AuthContext);

    return (
        <div className="min-h-screen flex bg-gray-100">
            <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
                <div className="p-6 font-bold text-xl border-b">
                    SaaS Control
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <Link
                        to="/dashboard"
                        className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg"
                    >
                        <LayoutDashboard size={20} /> Dashboard
                    </Link>
                    <Link
                        to="/profile"
                        className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg"
                    >
                        <User size={20} /> Perfil
                    </Link>
                    <Link
                        to="/plans"
                        className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg"
                    >
                        <CreditCard size={20} /> Assinatura
                    </Link>
                </nav>

                <button
                    onClick={signOut}
                    className="p-6 border-t flex items-center gap-3 text-red-600 hover:bg-red-50 transition-colors"
                >
                    <LogOut size={20} /> Sair
                </button>
            </aside>

            <main className="flex-1 p-8">
                <header className="mb-8 flex justify-between items-center">
                    <h1 className="text-2xl font-semibold text-gray-800">
                        Bem-vindo, {user?.name}
                    </h1>
                </header>
                <Outlet />
            </main>
        </div>
    );
}
