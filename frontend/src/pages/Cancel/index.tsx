import { useNavigate } from "react-router-dom";
import { XCircle, AlertCircle, ArrowLeft } from "lucide-react";

export function CancelPage() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center animate-in fade-in slide-in-from-top-4 duration-700">
            <div className="bg-red-50 p-6 rounded-full mb-8">
                <XCircle size={80} className="text-red-500" />
            </div>
            
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
                Pagamento Interrompido
            </h1>
            <p className="text-lg text-gray-600 mt-4 max-w-lg leading-relaxed font-sans">
                O processo de pagamento não foi concluído. Se você teve algum problema
                técnico ou mudou de ideia, pode tentar novamente quando desejar.
            </p>

            <div className="mt-12 flex flex-col sm:flex-row gap-4">
                <button
                    onClick={() => navigate("/plans")}
                    className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-indigo-700 active:scale-95 transition-all shadow-xl shadow-indigo-100 flex items-center justify-center gap-2"
                >
                    <AlertCircle size={20} />
                    Ver Planos Novamente
                </button>
                <button
                    onClick={() => navigate("/dashboard")}
                    className="bg-white text-gray-600 border border-gray-200 px-8 py-4 rounded-2xl font-bold hover:bg-gray-50 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                    <ArrowLeft size={20} />
                    Voltar ao Dashboard
                </button>
            </div>
        </div>
    );
}
