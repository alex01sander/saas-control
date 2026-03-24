import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, ArrowRight } from "lucide-react";

export function SuccessPage() {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/dashboard");
        }, 8000);
        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center animate-in fade-in zoom-in duration-700">
            <div className="relative">
                <div className="absolute inset-0 bg-green-200 blur-2xl opacity-30 rounded-full animate-pulse"></div>
                <div className="relative bg-green-100 p-6 rounded-full mb-8 shadow-inner">
                    <CheckCircle size={80} className="text-green-600 animate-in spin-in-12 duration-1000" />
                </div>
            </div>
            
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
                Pagamento Confirmado!
            </h1>
            <p className="text-lg text-gray-600 mt-4 max-w-lg leading-relaxed font-sans">
                Parabéns! Sua assinatura foi processada com sucesso. Em
                instantes seu acesso premium será liberado automaticamente.
            </p>

            <div className="mt-12 space-y-4">
                <button
                    onClick={() => navigate("/dashboard")}
                    className="flex items-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-indigo-700 active:scale-95 transition-all shadow-xl shadow-indigo-100"
                >
                    Acessar meu Dashboard
                    <ArrowRight size={20} />
                </button>
                <p className="text-sm text-gray-400">Redirecionando em alguns segundos...</p>
            </div>
        </div>
    );
}
