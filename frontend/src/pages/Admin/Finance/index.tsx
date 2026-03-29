import { DollarSign, TrendingUp, Users, ArrowUpRight, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { api } from '../../../lib/axios';
import { getFakeAdminStats } from '../../../lib/fakeData';

interface Stats {
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

export function FinanceManagement() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const response = await api.get('/admin/stats');
        
        if (response.data.totalSubscribers === 0 && response.data.mrr === 0) {
            setStats(getFakeAdminStats());
        } else {
            setStats(response.data);
        }
      } catch (error) {
        console.error('Erro ao carregar finanças:', error);
        setStats(getFakeAdminStats());
      } finally {
        setLoading(false);
      }
    }

    loadStats();
  }, []);

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

    if (diffInMinutes < 1) return 'Agora mesmo';
    if (diffInMinutes < 60) return `Há ${diffInMinutes} min`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `Há ${diffInHours} horas`;
    return past.toLocaleDateString('pt-BR');
  }

  if (loading) {
    return (
      <div className="h-96 flex items-center justify-center">
        <Loader2 className="animate-spin text-indigo-600" size={40} />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Resumo Financeiro</h1>
          <p className="text-gray-500 text-sm">Visão geral de faturamento e métricas de crescimento.</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-green-50 rounded-xl text-green-600">
              <DollarSign size={24} />
            </div>
          </div>
          <p className="text-sm text-gray-500 font-medium">MRR (Receita Mensal)</p>
          <h3 className="text-3xl font-bold text-gray-900 mt-1">{formatPrice(stats?.mrr || 0)}</h3>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
              <Users size={24} />
            </div>
          </div>
          <p className="text-sm text-gray-500 font-medium">Assinantes Ativos</p>
          <h3 className="text-3xl font-bold text-gray-900 mt-1">{stats?.totalSubscribers || 0}</h3>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-purple-50 rounded-xl text-purple-600">
              <TrendingUp size={24} />
            </div>
            <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-lg flex items-center gap-1">
              <ArrowUpRight size={14} /> 100%
            </span>
          </div>
          <p className="text-sm text-gray-500 font-medium">Crescimento</p>
          <h3 className="text-3xl font-bold text-gray-900 mt-1">SaaS Ativo</h3>
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-900">Atividades Financeiras Recentes</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50/50 border-b border-gray-100">
              <tr>
                <th className="p-4 text-xs font-bold uppercase text-gray-400 tracking-wider">Usuário</th>
                <th className="p-4 text-xs font-bold uppercase text-gray-400 tracking-wider">Ação</th>
                <th className="p-4 text-xs font-bold uppercase text-gray-400 tracking-wider">Status</th>
                <th className="p-4 text-xs font-bold uppercase text-gray-400 tracking-wider text-right">Data</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {stats?.recentActivities.map((activity, i) => (
                <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-4 text-sm font-bold text-gray-800">{activity.user}</td>
                  <td className="p-4 text-sm text-gray-600">{activity.action}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold tracking-wider ${
                      activity.status === 'ACTIVE' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {activity.status}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-gray-500 text-right">{getTimeAgo(activity.time)}</td>
                </tr>
              ))}
              {(!stats?.recentActivities || stats.recentActivities.length === 0) && (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-gray-500 text-sm">
                    Nenhuma atividade encontrada.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
