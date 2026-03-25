import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, ArrowRight, Loader2 } from "lucide-react";
import { AuthContext } from "../../contexts/AuthContext";

export function SuccessPage() {
    const navigate = useNavigate();
    const { user, refreshUser } = useContext(AuthContext);
    const [isChecking, setIsChecking] = useState(true);

    const isPremium = user?.subscriptionStatus === "ACTIVE";

    useEffect(() => {
        let attempts = 0;
        const maxAttempts = 5;

        const checkStatus = async () => {
            await refreshUser();
            attempts += 1;

            if (user?.subscriptionStatus === "ACTIVE" || attempts >= maxAttempts) {
                setIsChecking(false);
            }
        };

        const interval = setInterval(() => {
            if (user?.subscriptionStatus !== "ACTIVE" && attempts < maxAttempts) {
                checkStatus();
            } else {
                clearInterval(interval);
                setIsChecking(false);
            }
        }, 2000);

        // Initial check
        checkStatus();

        return () => clearInterval(interval);
    }, [refreshUser, user?.subscriptionStatus]);

    useEffect(() => {
        if (!isChecking) {
            const timer = setTimeout(() => {
                navigate("/dashboard");
            }, 8000);
            return () => clearTimeout(timer);
        }
    }, [isChecking, navigate]);


    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center animate-in fade-in zoom-in duration-700">
            <div className="relative">
                <div className="absolute inset-0 bg-green-200 blur-2xl opacity-30 rounded-full animate-pulse"></div>
                <div className="relative bg-green-100 p-6 rounded-full mb-8 shadow-inner">
                    {isChecking ? (
                        <Loader2 size={80} className="text-green-600 animate-spin" />
                    ) : (
                        <CheckCircle size={80} className="text-green-600 animate-in spin-in-12 duration-1000" />
                    )}
                </div>
            </div>
            
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
                {isChecking ? "Verificando assinatura..." : "Pagamento Confirmado!"}
            </h1>
            <p className="text-lg text-gray-600 mt-4 max-w-lg leading-relaxed font-sans">
                {isChecking 
                    ? "Estamos confirmando seu pagamento com o Stripe. Só um momento..."
                    : isPremium 
                        ? "Parabéns! Sua assinatura Premium já está ativa. Aproveite todos os recursos liberados!"
                        : "Sua assinatura está sendo processada. Você será redirecionado para o dashboard em instantes."}
            </p>

            <div className="mt-12 space-y-4">
                {!isChecking && (
                    <button
                        onClick={() => navigate("/dashboard")}
                        className="flex items-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-indigo-700 active:scale-95 transition-all shadow-xl shadow-indigo-100"
                    >
                        Acessar meu Dashboard
                        <ArrowRight size={20} />
                    </button>
                )}
                <p className="text-sm text-gray-400">
                    {isChecking ? "Aguarde a confirmação..." : "Redirecionando automaticamente..."}
                </p>
            </div>
        </div>
    );
}
