import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";

export function SuccessPage() {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/dashboard");
        }, 5000);
        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <div className="bg-green-100 p-4 rounded-full mb-6">
                <CheckCircle size={64} className="text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">
                Pagamento Confirmado!
            </h1>
            <p className="text-gray-600 mt-4 max-w-md">
                Parabéns! Sua assinatura foi processada com sucesso. Em
                instantes seu acesso premium será liberado.
            </p>
            <button
                onClick={() => navigate("/dashboard")}
                className="mt-8 text-indigo-600 font-semibold hover:underline"
            >
                Ir para o Dashboard agora →
            </button>
        </div>
    );
}
