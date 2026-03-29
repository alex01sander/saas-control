import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { api } from "../../lib/axios";
import {
    BarChart3,
    TrendingUp,
    Users,
    DollarSign,
    Zap,
    ArrowUpRight,
    ArrowDownRight,
    CalendarDays,
    Crown,
    ShieldCheck,
    ArrowRight,
    CreditCard,
    User,
    Loader2
} from "lucide-react";
import { getFakeAdminStats } from "../../lib/fakeData";

interface AdminStats {
    totalSubscribers: number;
    mrr: number;
    totalRevenue: number;
    recentActivities: Array<{
        user: string;
        action: string;
        time: string;
        status: string;
    }>;
}

export function DashboardPage() {
    const { user } = useContext(AuthContext);
    const [adminStats, setAdminStats] = useState<AdminStats | null>(null);
    const [loading, setLoading] = useState(true);

    const isPremium = user?.subscriptionStatus === "ACTIVE";
    const isPending = user?.subscriptionStatus === "PENDING";

    useEffect(() => {
        if (user?.role === "ADMIN") {
            async function loadStats() {
                try {
                    const response = await api.get('/admin/stats');
                    if (response.data.totalSubscribers === 0 && response.data.mrr === 0) {
                        setAdminStats(getFakeAdminStats());
                    } else {
                        setAdminStats(response.data);
                    }
                } catch (error) {
                    console.error('Erro ao carregar stats:', error);
                    setAdminStats(getFakeAdminStats());
                } finally {
                    setLoading(false);
                }
            }
            loadStats();
        } else {
            setLoading(false);
        }
    }, [user]);

    const statusConfig: any = {
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

    function formatPrice(value: number) {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(value);
    }

    function getTimeAgo(dateString: string) {
        const now = new Date();
        const past = new Date(dateString);
        const diffInMinutes = Math.floor((now.getTime() - past.getTime()) / 60000);

        if (diffInMinutes < 1) return 'Agora';
        if (diffInMinutes < 60) return `${diffInMinutes}m`;
        const diffInHours = Math.floor(diffInMinutes / 60);
        if (diffInHours < 24) return `${diffInHours}h`;
        return past.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
    }

    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center">
                <Loader2 className="animate-spin text-indigo-600" size={40} />
            </div>
        );
    }

    if (user?.role === "ADMIN") {
        const stats = [
            { 
                label: 'MRR (Receita Mensal)', 
                value: formatPrice(adminStats?.mrr || 0), 
                grow: '+100%', 
                isPositive: true,
                icon: <DollarSign size={24} className="text-green-600" />,
                bgColor: "bg-green-50"
            },
            { 
                label: 'Assinantes Ativos', 
                value: String(adminStats?.totalSubscribers || 0), 
                grow: '+100%', 
                isPositive: true,
                icon: <Users size={24} className="text-blue-600" />,
                bgColor: "bg-blue-50"
            },
            { 
                label: 'Churn Rate', 
                value: '0%', 
                grow: '0%', 
                isPositive: true,
                icon: <TrendingUp size={24} className="text-purple-600" />,
                bgColor: "bg-purple-50"
            },
        ];

        return (
            <div className="space-y-8 animate-in fade-in duration-700">
                {/* Admin Header */}
                <div className="flex justify-between items-end">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            Olá, Administrador {user?.name?.split(" ")[0]} 👋
                        </h1>
                        <p className="text-gray-500 mt-1">
                            Aqui estão os indicadores de saúde do seu SaaS.
                        </p>
                    </div>
                    <div className="bg-white border border-gray-100 p-2 px-4 rounded-xl shadow-sm text-sm font-medium text-gray-500 flex items-center gap-2">
                        <CalendarDays size={16} />
                        Hoje: {new Date().toLocaleDateString("pt-BR", { day: "2-digit", month: "long" })}
                    </div>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {stats.map((stat) => (
                        <div key={stat.label} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all group">
                            <div className="flex justify-between items-start mb-4">
                                <div className={`p-3 ${stat.bgColor} rounded-xl group-hover:scale-110 transition-transform`}>
                                    {stat.icon}
                                </div>
                                <span className={`flex items-center gap-0.5 text-xs font-bold px-2 py-1 rounded-lg ${stat.isPositive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                    {stat.isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                                    {stat.grow}
                                </span>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
                                <h3 className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</h3>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Business Insights Placeholder */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col">
                        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-6">
                            <BarChart3 size={20} className="text-indigo-600" /> Crescimento da Receita
                        </h3>
                        <div className="flex-1 bg-gray-50 rounded-xl flex items-end justify-between p-6 gap-2">
                            {[30, 45, 35, 60, 55, 80, 75, 90, 85, 100].map((h, i) => (
                                <div key={i} className="w-full bg-indigo-200 rounded-t-lg hover:bg-indigo-600 transition-all cursor-pointer" style={{ height: `${h}%` }}></div>
                            ))}
                        </div>
                        <div className="flex justify-between mt-4 text-xs text-gray-400 font-medium px-2">
                            <span>Jan</span><span>Mar</span><span>Mai</span><span>Jul</span><span>Set</span><span>Nov</span>
                        </div>
                    </div>

                    <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-6">
                            <Zap size={20} className="text-amber-500" /> Atividades Recentes
                        </h3>
                        <div className="space-y-6">
                            {adminStats?.recentActivities.map((activity, i) => (
                                <div key={i} className="flex gap-4 items-start">
                                    <div className={`w-2 h-2 mt-2 rounded-full ${activity.status === 'ACTIVE' ? 'bg-green-500' : 'bg-amber-500'}`}></div>
                                    <div className="flex-1">
                                        <p className="text-sm font-bold text-gray-800">{activity.user}</p>
                                        <p className="text-xs text-gray-500">{activity.action}</p>
                                    </div>
                                    <span className="text-xs text-gray-400">{getTimeAgo(activity.time)}</span>
                                </div>
                            ))}
                            {(!adminStats?.recentActivities || adminStats.recentActivities.length === 0) && (
                                <p className="text-sm text-gray-500 text-center py-4">Nenhuma atividade recente.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Client Dashboard
    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900">
                    Olá, {user?.name?.split(" ")[0]} 👋
                </h1>
                <p className="text-gray-500 mt-1">
                    Aqui está um resumo da sua assinatura.
                </p>
            </div>

            {/* Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                        <Link to="/plans" className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 hover:text-indigo-500 transition-colors group">
                            Ver planos disponíveis
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    )}
                </div>

                <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col gap-4">
                    <div className="p-3 bg-indigo-50 w-fit rounded-xl">
                        <CalendarDays size={28} className="text-indigo-600" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-gray-900">Dados da Conta</h3>
                        <div className="mt-3 space-y-3">
                            <div className="flex items-center justify-between py-2 border-b border-gray-50">
                                <span className="text-sm text-gray-500">E-mail</span>
                                <span className="text-sm font-medium text-gray-800 truncate max-w-[150px]">{user?.email}</span>
                            </div>
                            <div className="flex items-center justify-between py-2 border-b border-gray-50">
                                <span className="text-sm text-gray-500">Papel</span>
                                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 ring-1 ring-indigo-100">{user?.role}</span>
                            </div>
                            <div className="flex items-center justify-between py-2">
                                <span className="text-sm text-gray-500">Status</span>
                                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${config.badgeClass}`}>{config.label}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Access */}
            <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Acesso Rápido</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Link to="/profile" className="group flex items-center gap-4 bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:border-indigo-200 hover:shadow-md transition-all">
                        <div className="p-3 bg-indigo-50 rounded-xl group-hover:bg-indigo-100 transition-colors">
                            <User size={22} className="text-indigo-600" />
                        </div>
                        <div className="flex-1">
                            <p className="font-semibold text-gray-900">Meus Dados</p>
                            <p className="text-xs text-gray-500 mt-0.5">Nome e e-mail</p>
                        </div>
                        <ArrowRight size={18} className="text-gray-300 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
                    </Link>
                    <Link to="/plans" className="group flex items-center gap-4 bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:border-amber-200 hover:shadow-md transition-all">
                        <div className="p-3 bg-amber-50 rounded-xl group-hover:bg-amber-100 transition-colors">
                            <CreditCard size={22} className="text-amber-500" />
                        </div>
                        <div className="flex-1">
                            <p className="font-semibold text-gray-900">Planos</p>
                            <p className="text-xs text-gray-500 mt-0.5">{isPremium ? "Ver detalhes" : "Fazer upgrade"}</p>
                        </div>
                        <ArrowRight size={18} className="text-gray-300 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
                    </Link>
                </div>
            </div>
        </div>
    );
}

