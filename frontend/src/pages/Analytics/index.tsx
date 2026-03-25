import { PremiumFeature } from '../../components/PremiumFeature';
import { BookOpen, Download } from 'lucide-react';

export function AnalyticsPage() { // Keep it named AnalyticsPage for route convenience, or change it below
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <h1 className="text-2xl font-bold text-gray-800">Meu Ebook: Guia de Engenharia</h1>
        <p className="text-gray-500">Leia o primeiro capítulo gratuitamente.</p>
      </div>

      {/* PARTE GRATUITA (Sempre Visível) */}
      <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm animate-in fade-in duration-500">
        <h3 className="text-lg font-bold mb-4">Capítulo 1: A Mentalidade do Desenvolvedor</h3>
        <p className="text-gray-600 leading-relaxed">
          Neste capítulo, exploramos como a arquitetura de software resolve problemas reais...
          O desenvolvimento de software não é apenas sobre escrever código, mas sim sobre construir sistemas que sejam sustentáveis, escaláveis e de fácil manutenção ao longo do tempo.
        </p>
      </div>

      {/* PARTE PREMIUM (O Ebook Completo) */}
      <PremiumFeature>
        <div className="space-y-4 animate-in slide-in-from-bottom-5 duration-700">
          <div className="bg-indigo-600 p-8 rounded-xl text-white flex justify-between items-center shadow-xl shadow-indigo-100">
            <div>
              <h3 className="text-xl font-bold">Conteúdo Completo Liberado! 🎉</h3>
              <p className="opacity-90">Você agora tem acesso aos 15 capítulos e materiais extras.</p>
            </div>
            <button className="bg-white text-indigo-600 px-6 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-gray-100 active:scale-95 transition-all">
              <Download size={18} /> Baixar PDF
            </button>
          </div>

          <div className="grid grid-cols-1 gap-2">
            {[2, 3, 4, 5].map(cap => (
              <div key={cap} className="p-4 bg-white border border-gray-100 rounded-lg flex items-center gap-4 hover:border-indigo-100 transition-colors group">
                <BookOpen size={20} className="text-indigo-500 group-hover:scale-110 transition-transform" />
                <span className="font-medium text-gray-700">Capítulo {cap}: Tópicos Avançados</span>
              </div>
            ))}
          </div>
        </div>
      </PremiumFeature>
    </div>
  );
}
