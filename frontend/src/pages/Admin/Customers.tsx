import { ExternalLink, Loader2, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import { api } from '../../lib/axios';
import { Customer, generateFakeCustomers } from '../../lib/fakeData';

export function CustomerManagement() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCustomers() {
      try {
        const response = await api.get('/users');
        
        // If there are no real customers (or just 1 admin), add fake ones to the view
        if (response.data.length <= 1) {
            setCustomers([...response.data, ...generateFakeCustomers(10)]);
        } else {
            setCustomers(response.data);
        }
      } catch (error) {
        console.error('Erro ao carregar clientes:', error);
        setCustomers(generateFakeCustomers(10));
      } finally {
        setLoading(false);
      }
    }

    loadCustomers();
  }, []);

  function handleGenerateFake() {
    const fakes = generateFakeCustomers(10);
    setCustomers((prev) => [...fakes, ...prev]);
  }

  function handleViewOnStripe(stripeId?: string) {
    if (!stripeId) {
      alert('Este usuário ainda não possui um ID no Stripe.');
      return;
    }

    if (stripeId.startsWith('cus_fake_')) {
      alert('Este é um cliente fictício, não possui perfil real no Stripe.');
      return;
    }

    // Stripe Test Dashboard URL - Change to live in production
    const stripeUrl = `https://dashboard.stripe.com/test/customers/${stripeId}`;
    window.open(stripeUrl, '_blank');
  }

  function getAvatar(name: string) {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  }

  function formatDate(dateString?: string) {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('pt-BR');
  }

  if (loading) {
    return (
      <div className="h-96 flex items-center justify-center">
        <Loader2 className="animate-spin text-indigo-600" size={40} />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Gestão de Assinantes</h1>
          <p className="text-gray-500 text-sm">Monitore status de pagamento e planos ativos no Stripe.</p>
        </div>
        <div className="flex gap-2">
           <button 
             onClick={handleGenerateFake}
             className="flex items-center gap-2 bg-indigo-50 border border-indigo-200 text-indigo-700 px-4 py-2 rounded-xl text-sm font-bold hover:bg-indigo-100 transition-colors shadow-sm"
           >
             <Users size={16} />
             Gerar Fictícios
           </button>
           <button className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-xl text-sm font-bold hover:bg-gray-50 transition-colors shadow-sm">
             Exportar CSV
           </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50/50 border-b border-gray-100">
              <tr>
                <th className="p-4 text-xs font-bold uppercase text-gray-400 tracking-wider">Usuário</th>
                <th className="p-4 text-xs font-bold uppercase text-gray-400 tracking-wider">Plano</th>
                <th className="p-4 text-xs font-bold uppercase text-gray-400 tracking-wider">Status</th>
                <th className="p-4 text-xs font-bold uppercase text-gray-400 tracking-wider">Última Cobrança</th>
                <th className="p-4 text-xs font-bold uppercase text-gray-400 tracking-wider text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {customers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      {customer.avatarUrl ? (
                        <img 
                          src={customer.avatarUrl} 
                          alt={customer.name} 
                          className="w-10 h-10 rounded-full object-cover shadow-sm bg-gray-50 border border-gray-100" 
                        />
                      ) : (
                        <div className="w-10 h-10 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-bold text-sm shadow-sm border border-indigo-50">
                          {getAvatar(customer.name)}
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-bold text-gray-800">{customer.name}</p>
                        <p className="text-xs text-gray-500">{customer.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-gray-600 font-medium">
                    {customer.subscription?.plan?.name || 'Sem Plano'}
                  </td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold tracking-wider ${
                      customer.subscription?.status?.trim().toUpperCase() === 'ACTIVE' 
                        ? 'bg-green-100 text-green-700' 
                        : customer.subscription?.status?.trim().toUpperCase() === 'PENDING'
                        ? 'bg-amber-100 text-amber-700'
                        : customer.subscription?.status?.trim().toUpperCase() === 'CANCELED' || customer.subscription?.status?.trim().toUpperCase() === 'INACTIVE'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {customer.subscription?.status?.trim().toUpperCase() || 'INATIVO'}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-gray-500">
                    {formatDate(customer.subscription?.updatedAt)}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                       <button 
                        onClick={() => handleViewOnStripe(customer.stripeCustomerId)}
                        className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all" 
                        title="Ver no Stripe"
                       >
                         <ExternalLink size={18} />
                       </button>
                    </div>
                  </td>
                </tr>
              ))}
              {customers.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">
                    Nenhum assinante encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Pagination Placeholder */}
      <div className="flex items-center justify-between text-sm text-gray-500 px-2">
        <p>Mostrando {customers.length} assinantes</p>
        <div className="flex gap-2">
          <button className="px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50" disabled>Anterior</button>
          <button className="px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50" disabled>Próximo</button>
        </div>
      </div>
    </div>
  );
}
