import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { paymentService, Plan } from "../../services/paymentService";

export function PlansPage() {
    const [plans, setPlans] = useState<Plan[]>([]);
    const [loadingId, setLoadingId] = useState<string | null>(null);

    useEffect(() => {
        paymentService.getPlans().then(setPlans).catch(console.error);
    }, []);

    async function handleSubscribe(priceId: string) {
        try {
            setLoadingId(priceId);
            const checkoutUrl =
                await paymentService.createCheckoutSession(priceId);

            window.location.href = checkoutUrl;
        } catch (error) {
            alert("Erro ao iniciar checkout. Tente novamente.");
        } finally {
            setLoadingId(null);
        }
    }

    return (
        <div className="max-w-5xl mx-auto py-12">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900">
                    Planos e Preços
                </h2>
                <p className="text-gray-600 mt-4">
                    Escolha o plano ideal para o seu negócio crescer.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {plans.map((plan) => (
                    <div
                        key={plan.id}
                        className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm flex flex-col"
                    >
                        <h3 className="text-xl font-bold text-gray-900">
                            {plan.name}
                        </h3>
                        <div className="mt-4 mb-8">
                            <span className="text-4xl font-extrabold text-gray-900">
                                R$ {plan.price / 100}
                            </span>
                            <span className="text-gray-500">
                                /{plan.interval === "month" ? "mês" : "ano"}
                            </span>
                        </div>

                        <ul className="space-y-4 mb-8 flex-1">
                            <li className="flex items-center gap-3 text-gray-600">
                                <Check size={18} className="text-green-500" />{" "}
                                Acesso ilimitado
                            </li>
                            <li className="flex items-center gap-3 text-gray-600">
                                <Check size={18} className="text-green-500" />{" "}
                                Suporte 24/7
                            </li>
                        </ul>

                        <button
                            onClick={() => handleSubscribe(plan.stripePriceId)}
                            disabled={loadingId === plan.stripePriceId}
                            className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-50"
                        >
                            {loadingId === plan.stripePriceId
                                ? "Processando..."
                                : "Assinar Agora"}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
