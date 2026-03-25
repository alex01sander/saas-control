import { useContext, ReactNode } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

import { Crown, Lock, Sparkles } from "lucide-react";

interface PremiumFeatureProps {
    children: ReactNode;
}

/**
 * PremiumFeature - wraps any content that should only be visible to active subscribers.
 * If the user is NOT subscribed, it renders a beautiful paywall instead.
 */
export function PremiumFeature({ children }: PremiumFeatureProps) {
    const { user } = useContext(AuthContext);

    const isPremium = user?.subscriptionStatus === "ACTIVE";

    if (isPremium) {
        return <>{children}</>;
    }

    // Paywall UI
    return (
        <div className="relative">
            {/* Blurred preview of content underneath */}
            <div className="pointer-events-none select-none blur-sm opacity-40 overflow-hidden max-h-48">
                {children}
            </div>

            {/* Paywall overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/90 backdrop-blur-md border border-indigo-100 rounded-2xl shadow-2xl shadow-indigo-100 p-8 max-w-sm w-full text-center mx-4">
                    <div className="mx-auto w-14 h-14 bg-amber-50 border border-amber-100 rounded-2xl flex items-center justify-center mb-4">
                        <Lock size={28} className="text-amber-500" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Conteúdo Premium</h3>
                    <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                        Este recurso está disponível apenas para assinantes. Faça upgrade para
                        desbloquear acesso total.
                    </p>
                    <div className="mt-6 space-y-3">
                        <Link
                            to="/plans"
                            className="flex items-center justify-center gap-2 w-full bg-indigo-600 text-white font-bold py-3 px-6 rounded-xl hover:bg-indigo-700 active:scale-95 transition-all shadow-lg shadow-indigo-100"
                        >
                            <Crown size={18} />
                            Ver Planos Premium
                        </Link>
                        <p className="text-xs text-gray-400 flex items-center justify-center gap-1">
                            <Sparkles size={12} />
                            Cancele quando quiser
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
