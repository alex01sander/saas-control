import { PremiumGuard } from "../../components/PremiumGuard";
import { BarChart3, TrendingUp, Users, DollarSign, Zap } from "lucide-react";

const fakeMetrics = [
    { label: "Receita Mensal (MRR)", value: "R$ 12.480", trend: "+18%", icon: <DollarSign size={20} className="text-green-600" />, color: "bg-green-50" },
    { label: "Usuários Ativos", value: "1.847", trend: "+7%", icon: <Users size={20} className="text-blue-600" />, color: "bg-blue-50" },
    { label: "Churn Rate", value: "2.3%", trend: "-0.4%", icon: <TrendingUp size={20} className="text-purple-600" />, color: "bg-purple-50" },
    { label: "Novas Assinaturas", value: "148", trend: "+12%", icon: <Zap size={20} className="text-amber-600" />, color: "bg-amber-50" },
];

export function AnalyticsPage() {
    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
                <p className="text-gray-500 mt-1">Métricas detalhadas do seu negócio.</p>
            </div>

            {/* Free content - visible to everyone */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-1">
                    <BarChart3 size={20} className="text-indigo-600" />
                    <h2 className="font-semibold text-gray-900">Visão Geral</h2>
                </div>
                <p className="text-gray-500 text-sm">Resumo básico disponível para todos os usuários.</p>
                <div className="mt-4 grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-xl p-4">
                        <p className="text-xs text-gray-500">Plano Atual</p>
                        <p className="text-2xl font-bold text-gray-800 mt-1">Free</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4">
                        <p className="text-xs text-gray-500">Recursos Ativos</p>
                        <p className="text-2xl font-bold text-gray-800 mt-1">3/12</p>
                    </div>
                </div>
            </div>

            {/* Premium content - Protected by PremiumGuard */}
            <PremiumGuard>
                <div className="space-y-6">
                    <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                        <BarChart3 size={20} className="text-indigo-600" /> Métricas Avançadas
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {fakeMetrics.map((m) => (
                            <div key={m.label} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                                <div className={`w-10 h-10 ${m.color} rounded-xl flex items-center justify-center mb-3`}>
                                    {m.icon}
                                </div>
                                <p className="text-xs text-gray-500">{m.label}</p>
                                <p className="text-2xl font-bold text-gray-900 mt-1">{m.value}</p>
                                <p className="text-xs text-green-600 font-semibold mt-1">{m.trend} este mês</p>
                            </div>
                        ))}
                    </div>
                    <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-2xl p-6 text-white">
                        <h3 className="font-bold text-lg">Relatório Mensal Completo</h3>
                        <p className="text-indigo-200 text-sm mt-1">
                            Visualize tendências, previsões e análise de cohort detalhadas.
                        </p>
                        <div className="mt-6 h-24 flex items-end gap-2">
                            {[40, 65, 50, 80, 60, 90, 75, 100, 85, 70, 95, 88].map((h, i) => (
                                <div
                                    key={i}
                                    className="flex-1 bg-white/20 rounded-t-md hover:bg-white/30 transition-colors"
                                    style={{ height: `${h}%` }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </PremiumGuard>
        </div>
    );
}
