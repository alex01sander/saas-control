import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import {
    BarChart3,
    TrendingUp,
    Users,
    DollarSign,
    Zap,
    ArrowUpRight,
    ArrowDownRight,
    CalendarDays
} from "lucide-react";

export function DashboardPage() {
    const { user } = useContext(AuthContext);

    const stats = [
        { 
            label: 'MRR (Receita Mensal)', 
            value: 'R$ 12.450', 
            grow: '+12%', 
            isPositive: true,
            icon: <DollarSign size={24} className="text-green-600" />,
            bgColor: "bg-green-50"
        },
        { 
            label: 'Assinantes Ativos', 
            value: '148', 
            grow: '+5%', 
            isPositive: true,
            icon: <Users size={24} className="text-blue-600" />,
            bgColor: "bg-blue-50"
        },
        { 
            label: 'Churn Rate (Cancelamentos)', 
            value: '2.4%', 
            grow: '-1%', 
            isPositive: true, // Churn down is positive
            icon: <TrendingUp size={24} className="text-purple-600" />,
            bgColor: "bg-purple-50"
        },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            {/* Header */}
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
                <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                    <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-6">
                        <BarChart3 size={20} className="text-indigo-600" /> Crescimento da Receita
                    </h3>
                    <div className="h-64 bg-gray-50 rounded-xl flex items-end justify-between p-6 gap-2">
                        {/* Placeholder for a chart */}
                        {[30, 45, 35, 60, 55, 80, 75, 90, 85, 100].map((h, i) => (
                            <div key={i} className="w-full bg-indigo-200 rounded-t-lg hover:bg-indigo-600 transition-all cursor-pointer" style={{ height: `${h}%` }}></div>
                        ))}
                    </div>
                    <div className="flex justify-between mt-4 text-xs text-gray-400 font-medium px-2">
                        <span>Jan</span>
                        <span>Mar</span>
                        <span>Mai</span>
                        <span>Jul</span>
                        <span>Set</span>
                        <span>Nov</span>
                    </div>
                </div>

                <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                    <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-6">
                        <Zap size={20} className="text-amber-500" /> Atividades Recentes
                    </h3>
                    <div className="space-y-6">
                        {[
                            { user: "Alex Sander", action: "Assinou o plano Premium", time: "Há 2 minutos", color: "bg-green-500" },
                            { user: "Beatriz Silva", action: "Upgrade para Enterprise", time: "Há 45 minutos", color: "bg-indigo-500" },
                            { user: "Carlos Oliveira", action: "Novo cadastro realizado", time: "Há 2 horas", color: "bg-amber-500" },
                            { user: "Daniele Rocha", action: "Cancelou a renovação", time: "Há 5 horas", color: "bg-red-500" },
                        ].map((activity, i) => (
                            <div key={i} className="flex gap-4 items-start">
                                <div className={`w-2 h-2 mt-2 rounded-full ${activity.color}`}></div>
                                <div className="flex-1">
                                    <p className="text-sm font-bold text-gray-800">{activity.user}</p>
                                    <p className="text-xs text-gray-500">{activity.action}</p>
                                </div>
                                <span className="text-xs text-gray-400">{activity.time}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

