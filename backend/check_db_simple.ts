import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const count = await prisma.subscription.count();
  const subs = await prisma.subscription.findMany();
  console.log(`Total subscriptions in DB: ${count}`);
  console.log('Subscriptions:', JSON.stringify(subs, null, 2));
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
