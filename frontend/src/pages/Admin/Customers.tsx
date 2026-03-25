import { ExternalLink } from 'lucide-react';

export function CustomerManagement() {
  const customers = [
    {
      id: '1',
      name: 'Alex Sander',
      email: 'alexsander01@hotmail.com',
      avatar: 'AS',
      plan: 'Premium Monthly',
      status: 'ACTIVE',
      lastBilling: '25/03/2026',
      stripeId: 'cus_123'
    },
    {
      id: '2',
      name: 'Beatriz Silva',
      email: 'beatriz.silva@email.com',
      avatar: 'BS',
      plan: 'Enterprise Yearly',
      status: 'ACTIVE',
      lastBilling: '20/03/2026',
      stripeId: 'cus_456'
    },
    {
      id: '3',
      name: 'Carlos Oliveira',
      email: 'carlos.o@dev.com',
      avatar: 'CO',
      plan: 'Free Trial',
      status: 'PENDING',
      lastBilling: '-',
      stripeId: 'cus_789'
    },
    {
      id: '4',
      name: 'Daniele Rocha',
      email: 'daniele.rocha@corp.com',
      avatar: 'DR',
      plan: 'Premium Monthly',
      status: 'CANCELED',
      lastBilling: '15/02/2026',
      stripeId: 'cus_012'
    }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Gestão de Assinantes</h1>
          <p className="text-gray-500 text-sm">Monitore status de pagamento e planos ativos no Stripe.</p>
        </div>
        <div className="flex gap-2">
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
                      <div className="w-10 h-10 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-bold text-sm">
                        {customer.avatar}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-800">{customer.name}</p>
                        <p className="text-xs text-gray-500">{customer.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-gray-600 font-medium">
                    {customer.plan}
                  </td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold tracking-wider ${
                      customer.status === 'ACTIVE' 
                        ? 'bg-green-100 text-green-700' 
                        : customer.status === 'PENDING'
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {customer.status}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-gray-500">
                    {customer.lastBilling}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                       <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all" title="Ver no Stripe">
                         <ExternalLink size={18} />
                       </button>
                    </div>
                  </td>
                </tr>
              ))}
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
