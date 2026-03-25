import { Outlet, NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { LayoutDashboard, BookOpen, User, CreditCard, LogOut, Crown } from "lucide-react";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
        isActive
            ? "bg-indigo-50 text-indigo-700"
            : "text-gray-600 hover:bg-gray-100"
    }`;

export function AppLayout() {
    const { signOut, user } = useContext(AuthContext);
    const isPremium = user?.subscriptionStatus === "ACTIVE";

    return (
        <div className="min-h-screen flex bg-gray-100">
            <aside className="w-64 bg-white border-r border-gray-100 flex flex-col">
                {/* Logo */}
                <div className="p-6 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                        <div className="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">S</div>
                        <span className="font-bold text-lg text-gray-900">SaaS Control</span>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-1">
                    <NavLink to="/dashboard" className={navLinkClass}>
                        <LayoutDashboard size={18} /> Dashboard
                    </NavLink>
                    <NavLink to="/ebook" className={navLinkClass}>
                        <BookOpen size={18} />
                        <span>Ebook</span>
                        {!isPremium && (
                            <span title="Premium">
                                <Crown size={13} className="ml-auto text-amber-500" />
                            </span>
                        )}
                    </NavLink>
                    <NavLink to="/profile" className={navLinkClass}>
                        <User size={18} /> Perfil
                    </NavLink>
                    <NavLink to="/plans" className={navLinkClass}>
                        <CreditCard size={18} /> Assinatura
                    </NavLink>
                </nav>

                {/* Sign Out */}
                <div className="p-4 border-t border-gray-100">
                    <div className="mb-4 px-3 py-2">
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Conta</p>
                        <p className="text-sm font-medium text-gray-800 mt-0.5 truncate">{user?.name}</p>
                        <p className="text-xs text-gray-400 truncate">{user?.email}</p>
                    </div>
                    <button
                        onClick={signOut}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                    >
                        <LogOut size={18} /> Sair
                    </button>
                </div>
            </aside>

            {/* Main content */}
            <main className="flex-1 p-8 overflow-auto">
                <Outlet />
            </main>
        </div>
    );
}
