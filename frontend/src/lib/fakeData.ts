export interface Customer {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  stripeCustomerId?: string;
  createdAt: string;
  subscription?: {
    status: string;
    updatedAt: string;
    plan: {
      name: string;
    };
  } | null;
}

const FIRST_NAMES = ["Ana", "Carlos", "Beatriz", "Daniel", "Eduarda", "Fernando", "Gabriela", "Henrique", "Isabela", "João"];
const LAST_NAMES = ["Silva", "Santos", "Oliveira", "Souza", "Rodrigues", "Ferreira", "Alves", "Pereira", "Lima", "Gomes"];
const PLAN_NAMES = ["Plano Mensal", "Plano Semestral", "Plano Anual"];
const STATUSES = ["ACTIVE", "PENDING", "CANCELED", "INACTIVE"];

export function generateFakeCustomers(count: number = 10): Customer[] {
  return Array.from({ length: count }).map((_, index) => {
    const firstName = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)];
    const lastName = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];
    const name = `${firstName} ${lastName}`;
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${index}@example.com`;
    
    // Generate a random date within the last year
    const createdDate = new Date();
    createdDate.setMonth(createdDate.getMonth() - Math.floor(Math.random() * 12));
    createdDate.setDate(createdDate.getDate() - Math.floor(Math.random() * 28));

    const updatedDate = new Date(createdDate);
    updatedDate.setDate(updatedDate.getDate() + Math.floor(Math.random() * 10));

    const hasSubscription = Math.random() > 0.1; // 90% have some subscription record
    
    // Choose gender for realistic photo
    const gender = Math.random() > 0.5 ? "women" : "men";
    const photoId = Math.floor(Math.random() * 90) + 1; // 1 to 90
    
    return {
      id: `fake-usr-${Math.random().toString(36).substring(2, 9)}`,
      name,
      email,
      avatarUrl: `https://randomuser.me/api/portraits/${gender}/${photoId}.jpg`,
      stripeCustomerId: hasSubscription ? `cus_fake_${Math.random().toString(36).substring(2, 10)}` : undefined,
      createdAt: createdDate.toISOString(),
      subscription: hasSubscription
        ? {
            status: STATUSES[Math.floor(Math.random() * STATUSES.length)],
            updatedAt: updatedDate.toISOString(),
            plan: {
              name: PLAN_NAMES[Math.floor(Math.random() * PLAN_NAMES.length)],
            },
          }
        : null,
    };
  });
}

export function getFakeAdminStats() {
  return {
    totalSubscribers: 156,
    mrr: 12500,
    totalRevenue: 45000,
    recentActivities: [
      { user: "Ana Silva", action: "Assinatura do Plano Anual", time: new Date().toISOString(), status: "ACTIVE" },
      { user: "Carlos Souza", action: "Assinatura do Plano Mensal", time: new Date(Date.now() - 3600000).toISOString(), status: "ACTIVE" },
      { user: "Beatriz Oliveira", action: "Pagamento Falhou", time: new Date(Date.now() - 7200000).toISOString(), status: "PENDING" },
      { user: "Daniel Gomes", action: "Assinatura do Plano Semestral", time: new Date(Date.now() - 86400000).toISOString(), status: "ACTIVE" },
    ]
  };
}

