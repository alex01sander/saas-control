import { useNavigate } from "react-router-dom";
import { XCircle } from "lucide-react";

export function CancelPage() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <div className="bg-red-100 p-4 rounded-full mb-6">
                <XCircle size={64} className="text-red-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">
                Ops! Algo aconteceu.
            </h1>
            <p className="text-gray-600 mt-4 max-w-md">
                O processo de pagamento foi cancelado. Se houve algum problema
                com seu cartão ou dúvida sobre o plano, nossa equipe está à
                disposição.
            </p>
            <div className="flex gap-4 mt-8">
                <button
                    onClick={() => navigate("/plans")}
                    className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700"
                >
                    Tentar Novamente
                </button>
                <button
                    onClick={() => navigate("/dashboard")}
                    className="text-gray-500 px-6 py-2 hover:underline"
                >
                    Voltar ao início
                </button>
            </div>
        </div>
    );
}
