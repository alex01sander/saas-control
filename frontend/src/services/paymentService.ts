import { api } from "../lib/axios";

export interface Plan {
    id: string;
    name: string;
    price: number;
    currency: string;
    interval: "month" | "year";
    stripePriceId: string;
}

export const paymentService = {
    getPlans: async (): Promise<Plan[]> => {
        const response = await api.get("/plans");
        return response.data;
    },

    createCheckoutSession: async (priceId: string): Promise<string> => {
        const response = await api.post("/checkout", { priceId });
        return response.data.url;
    },
};
