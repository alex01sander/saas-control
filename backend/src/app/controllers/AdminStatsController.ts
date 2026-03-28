import type { Request, Response } from "express";
import { prisma } from "../../database/client.js";

class AdminStatsController {
    async index(req: Request, res: Response) {
        try {
            const allSubscriptions = await prisma.subscription.findMany({
                include: {
                    user: { select: { email: true, name: true } },
                    plan: { select: { name: true, priceCents: true } }
                }
            });

            // Count ACTIVE subscribers (case-insensitive and trimmed)
            const activeSubscriptions = allSubscriptions.filter(s => 
                s.status?.trim().toUpperCase() === "ACTIVE"
            );

            const totalSubscribers = activeSubscriptions.length;

            // Calculate MRR
            const mrrCents = activeSubscriptions.reduce((acc, sub) => {
                return acc + (sub.plan?.priceCents || 0);
            }, 0);

            // Fetch recent activities (top 5 from all)
            const recentSubscriptions = [...allSubscriptions]
                .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
                .slice(0, 5);

            const recentActivities = recentSubscriptions.map((sub) => ({
                user: sub.user?.name || "Usuário Desconhecido",
                action: sub.status?.trim().toUpperCase() === "ACTIVE" 
                    ? `Assinou o plano ${sub.plan?.name || "Desconhecido"}` 
                    : `Status alterado para ${sub.status}`,
                time: sub.updatedAt,
                status: sub.status?.trim().toUpperCase(),
            }));

            return res.json({
                totalSubscribers,
                mrr: mrrCents / 100,
                totalRevenue: mrrCents / 100,
                recentActivities,
            });
        } catch (error) {
            console.error("❌ Erro ao buscar estatísticas:", error);
            return res.status(500).json({ message: "Erro ao buscar estatísticas" });
        }
    }
}

export default new AdminStatsController();
