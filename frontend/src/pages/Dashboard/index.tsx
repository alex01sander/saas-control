import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import {
    Crown,
    CalendarDays,
    User,
    CreditCard,
    ArrowRight,
    Zap,
    ShieldCheck,
} from "lucide-react";

export function DashboardPage() {
    const { user } = useContext(AuthContext);

    const isPremium = user?.subscriptionStatus === "ACTIVE";
    const isPending = user?.subscriptionStatus === "PENDING";

    const statusConfig = {
        ACTIVE: {
            label: "Premium",
            description: "Seu plano está ativo e todas as funcionalidades estão liberadas.",
            icon: <Crown size={28} className="text-amber-500" />,
            badgeClass: "bg-amber-50 text-amber-700 border border-amber-200",
            cardClass: "border-amber-100 from-amber-50/50",
        },
        PENDING: {
            label: "Pendente",
            description: "Seu pagamento está sendo processado. Aguarde a confirmação.",
            icon: <Zap size={28} className="text-blue-500" />,
            badgeClass: "bg-blue-50 text-blue-700 border border-blue-200",
            cardClass: "border-blue-100 from-blue-50/50",
        },
        FREE: {
            label: "Gratuito",
            description: "Você está no plano gratuito. Faça upgrade para acessar todos os recursos.",
            icon: <ShieldCheck size={28} className="text-gray-400" />,
            badgeClass: "bg-gray-100 text-gray-600 border border-gray-200",
            cardClass: "border-gray-200 from-gray-50/50",
        },
    };

    const status = isPremium ? "ACTIVE" : isPending ? "PENDING" : "FREE";
    const config = statusConfig[status];

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900">
                    Olá, {user?.name?.split(" ")[0]} 👋
                </h1>
                <p className="text-gray-500 mt-1">
                    Aqui está um resumo da sua conta.
                </p>
            </div>

            {/* Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Plan Status Card */}
                <div className={`bg-white bg-gradient-to-br ${config.cardClass} to-white border rounded-2xl p-6 shadow-sm flex flex-col gap-4`}>
                    <div className="flex items-start justify-between">
                        <div className="p-3 bg-white rounded-xl shadow-sm border border-gray-100">
                            {config.icon}
                        </div>
                        <span className={`text-xs font-bold px-3 py-1 rounded-full ${config.badgeClass}`}>
                            {config.label}
                        </span>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-gray-900">Status do Plano</h3>
                        <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                            {config.description}
                        </p>
                    </div>
                    {!isPremium && (
                        <Link
                            to="/plans"
                            className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 hover:text-indigo-500 transition-colors group"
                        >
                            Ver planos disponíveis
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    )}
                </div>

                {/* Account Info Card */}
                <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col gap-4">
                    <div className="p-3 bg-indigo-50 w-fit rounded-xl">
                        <CalendarDays size={28} className="text-indigo-600" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-gray-900">Detalhes da Conta</h3>
                        <div className="mt-3 space-y-3">
                            <div className="flex items-center justify-between py-2 border-b border-gray-50">
                                <span className="text-sm text-gray-500">E-mail</span>
                                <span className="text-sm font-medium text-gray-800 truncate max-w-[200px]">
                                    {user?.email}
                                </span>
                            </div>
                            <div className="flex items-center justify-between py-2 border-b border-gray-50">
                                <span className="text-sm text-gray-500">Status</span>
                                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${config.badgeClass}`}>
                                    {config.label}
                                </span>
                            </div>
                            <div className="flex items-center justify-between py-2">
                                <span className="text-sm text-gray-500">Membro dia</span>
                                <span className="text-sm font-medium text-gray-800">
                                    {new Date().toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Access */}
            <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Acesso Rápido</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Link
                        to="/profile"
                        className="group flex items-center gap-4 bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:border-indigo-200 hover:shadow-md transition-all"
                    >
                        <div className="p-3 bg-indigo-50 rounded-xl group-hover:bg-indigo-100 transition-colors">
                            <User size={22} className="text-indigo-600" />
                        </div>
                        <div className="flex-1">
                            <p className="font-semibold text-gray-900">Editar Perfil</p>
                            <p className="text-xs text-gray-500 mt-0.5">Nome, e-mail e senha</p>
                        </div>
                        <ArrowRight size={18} className="text-gray-300 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
                    </Link>

                    <Link
                        to="/plans"
                        className="group flex items-center gap-4 bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:border-amber-200 hover:shadow-md transition-all"
                    >
                        <div className="p-3 bg-amber-50 rounded-xl group-hover:bg-amber-100 transition-colors">
                            <CreditCard size={22} className="text-amber-500" />
                        </div>
                        <div className="flex-1">
                            <p className="font-semibold text-gray-900">Gerenciar Plano</p>
                            <p className="text-xs text-gray-500 mt-0.5">
                                {isPremium ? "Ver detalhes da assinatura" : "Fazer upgrade para Premium"}
                            </p>
                        </div>
                        <ArrowRight size={18} className="text-gray-300 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
