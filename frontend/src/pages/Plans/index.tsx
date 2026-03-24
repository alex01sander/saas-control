import { useContext, useState } from 'react';
import { Check, Crown, Zap } from 'lucide-react';
import { AuthContext } from '../../contexts/AuthContext';
import { api } from '../../lib/axios';

export function PlansPage() {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const isPremium = user?.subscriptionStatus === 'ACTIVE';

  const plans = [
    {
      id: 'price_free',
      name: 'Plano Free',
      price: 'R$ 0',
      period: '/mês',
      features: ['Acesso ao Dashboard', 'Perfil Básico', 'Suporte via Comunidade'],
      current: !isPremium,
      buttonText: 'Plano Atual',
      premium: false,
    },
    {
      id: 'price_premium_id_do_stripe', // Substitua com o Price ID real do Stripe
      name: 'Plano Premium',
      price: 'R$ 29,90',
      period: '/mês',
      features: [
        'Tudo do Free',
        'Analytics Avançado',
        'Suporte Prioritário',
        'Acesso à Coroa 👑',
      ],
      current: isPremium,
      buttonText: isPremium ? 'Assinado' : 'Assinar Agora',
      premium: true,
    },
  ];

  async function handleSubscribe(priceId: string) {
    if (isPremium || priceId === 'price_free') return;

    try {
      setLoading(true);
      const response = await api.post('/checkout', { priceId });
      window.location.href = response.data.url;
    } catch (error) {
      alert('Erro ao iniciar checkout. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-4xl space-y-8 animate-in fade-in duration-700">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Gerenciar Assinatura</h1>
        <p className="text-gray-500 mt-1">
          Escolha o plano ideal. Cancele quando quiser.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`relative flex flex-col p-8 rounded-2xl border-2 transition-all ${
              plan.premium
                ? 'border-indigo-500 bg-white shadow-xl shadow-indigo-50 ring-4 ring-indigo-50'
                : 'border-gray-200 bg-white shadow-sm'
            }`}
          >
            {plan.premium && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                <span className="bg-indigo-600 text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wide shadow">
                  Recomendado
                </span>
              </div>
            )}

            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  {plan.name}
                  {plan.premium && <Crown size={20} className="text-amber-500" />}
                </h3>
                <div className="mt-2">
                  <span className="text-4xl font-extrabold text-gray-900">{plan.price}</span>
                  <span className="text-gray-500 text-sm">{plan.period}</span>
                </div>
              </div>
              {plan.current && (
                <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                  Atual
                </span>
              )}
            </div>

            <ul className="flex-1 space-y-3 mb-8">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-3 text-sm text-gray-600">
                  <div className="flex-shrink-0 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center">
                    <Check size={12} className="text-green-600" strokeWidth={3} />
                  </div>
                  {feature}
                </li>
              ))}
            </ul>

            <button
              onClick={() => handleSubscribe(plan.id)}
              disabled={plan.current || loading}
              className={`w-full py-3 rounded-xl font-bold text-sm transition-all active:scale-95 ${
                plan.premium && !plan.current
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-100'
                  : 'bg-gray-100 text-gray-500 cursor-not-allowed'
              } disabled:opacity-70`}
            >
              {loading && !plan.current ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Processando...
                </span>
              ) : (
                plan.buttonText
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Stripe Security Notice */}
      <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex items-start gap-4">
        <div className="mt-0.5 p-1.5 bg-blue-100 rounded-lg">
          <Zap size={16} className="text-blue-600" />
        </div>
        <div>
          <p className="text-blue-900 font-semibold text-sm">Pagamento Seguro via Stripe</p>
          <p className="text-blue-600 text-xs mt-0.5 leading-relaxed">
            Seus dados de pagamento são criptografados e protegidos. Cancele a qualquer momento
            sem burocracia ou taxas.
          </p>
        </div>
      </div>
    </div>
  );
}
