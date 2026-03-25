import { useContext, useState, useEffect } from 'react';
import { Check, Crown, Zap } from 'lucide-react';
import { AuthContext } from '../../contexts/AuthContext';
import { api } from '../../lib/axios';

interface Plan {
  id: string;
  name: string;
  priceCents: number;
  interval: 'month' | 'year';
}

export function PlansPage() {
  const { user } = useContext(AuthContext);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const isPremium = user?.subscriptionStatus === 'ACTIVE';

  useEffect(() => {
    api.get('/plans').then((res) => setPlans(res.data)).catch(console.error);
  }, []);

  async function handleSubscribe(planId: string) {
    if (isPremium) return;

    try {
      setLoadingId(planId);
      // Backend: POST /subscriptions -> { planId } -> returns { checkoutUrl }
      const response = await api.post('/subscriptions', { planId });
      window.location.href = response.data.checkoutUrl;
    } catch (error) {
      alert('Erro ao iniciar checkout. Tente novamente.');
    } finally {
      setLoadingId(null);
    }
  }

  // Format price from cents to BRL
  function formatPrice(cents: number) {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(cents / 100);
  }

  return (
    <div className="max-w-4xl space-y-8 animate-in fade-in duration-700">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Gerenciar Assinatura</h1>
        <p className="text-gray-500 mt-1">Escolha o plano ideal. Cancele quando quiser.</p>
      </div>

      {/* Free Plan (always shown) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Free card */}
        <div className="flex flex-col p-8 rounded-2xl border-2 border-gray-200 bg-white shadow-sm">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Plano Free</h3>
              <div className="mt-2">
                <span className="text-4xl font-extrabold text-gray-900">R$ 0</span>
                <span className="text-gray-500 text-sm">/mês</span>
              </div>
            </div>
            {!isPremium && (
              <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full uppercase">
                Atual
              </span>
            )}
          </div>
          <ul className="flex-1 space-y-3 mb-8">
            {['Acesso ao Dashboard', 'Perfil Básico', 'Suporte via Comunidade'].map((f) => (
              <li key={f} className="flex items-center gap-3 text-sm text-gray-600">
                <div className="flex-shrink-0 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center">
                  <Check size={12} className="text-green-600" strokeWidth={3} />
                </div>
                {f}
              </li>
            ))}
          </ul>
          <button disabled className="w-full py-3 rounded-xl font-bold text-sm bg-gray-100 text-gray-400 cursor-not-allowed">
            Plano Atual
          </button>
        </div>

        {/* Dynamic paid plans from API */}
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="relative flex flex-col p-8 rounded-2xl border-2 border-indigo-500 bg-white shadow-xl shadow-indigo-50 ring-4 ring-indigo-50"
          >
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
              <span className="bg-indigo-600 text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wide shadow">
                Recomendado
              </span>
            </div>

            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  {plan.name} <Crown size={20} className="text-amber-500" />
                </h3>
                <div className="mt-2">
                  <span className="text-4xl font-extrabold text-gray-900">{formatPrice(plan.priceCents)}</span>
                  <span className="text-gray-500 text-sm">/{plan.interval === 'month' ? 'mês' : 'ano'}</span>
                </div>
              </div>
              {isPremium && (
                <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full uppercase">
                  Atual
                </span>
              )}
            </div>

            <ul className="flex-1 space-y-3 mb-8">
              {['Tudo do Free', 'Analytics Avançado', 'Suporte Prioritário', 'Acesso à Coroa 👑'].map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm text-gray-600">
                  <div className="flex-shrink-0 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center">
                    <Check size={12} className="text-green-600" strokeWidth={3} />
                  </div>
                  {f}
                </li>
              ))}
            </ul>

            <button
              onClick={() => handleSubscribe(plan.id)}
              disabled={isPremium || loadingId === plan.id}
              className="w-full py-3 rounded-xl font-bold text-sm bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-100 active:scale-95 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loadingId === plan.id ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Processando...
                </span>
              ) : isPremium ? 'Assinado' : 'Assinar Agora'}
            </button>

            {/* Dev manual activation bypass */}
            {((import.meta as any).env.DEV) && !isPremium && (
              <button
                onClick={async () => {
                  if (confirm('Simular pagamento deste plano? (Apenas em DEV)')) {
                    try {
                      setLoadingId(plan.id);
                      await api.post('/subscriptions/force-active', { planId: plan.id });
                      alert('Plano ativado com sucesso! Redirecionando...');
                      window.location.href = '/success';
                    } catch (error) {
                      alert('Erro ao simular pagamento.');
                    } finally {
                      setLoadingId(null);
                    }
                  }
                }}
                className="mt-4 w-full py-2 rounded-xl border border-dashed border-indigo-300 text-indigo-500 text-xs font-bold hover:bg-indigo-50 transition-colors"
              >
                Simular Pagamento (Dev)
              </button>
            )}
          </div>
        ))}

        {/* Loading state while plans fetch */}
        {plans.length === 0 && (
          <div className="flex items-center justify-center p-8 rounded-2xl border-2 border-dashed border-gray-200 text-gray-400 text-sm">
            Carregando planos...
          </div>
        )}
      </div>

      {/* Stripe notice */}
      <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex items-start gap-4">
        <div className="mt-0.5 p-1.5 bg-blue-100 rounded-lg">
          <Zap size={16} className="text-blue-600" />
        </div>
        <div>
          <p className="text-blue-900 font-semibold text-sm">Pagamento Seguro via Stripe</p>
          <p className="text-blue-600 text-xs mt-0.5 leading-relaxed">
            Seus dados de pagamento são criptografados. Cancele a qualquer momento sem burocracia.
          </p>
        </div>
      </div>
    </div>
  );
}
