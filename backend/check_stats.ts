import { prisma } from './src/database/client.js';

async function main() {
  const allSubscribers = await prisma.subscription.findMany({
    include: {
      user: true,
      plan: true
    }
  });
  console.log('Total:', allSubscribers.length);
  console.log('Filtro ACTIVE:', allSubscribers.filter(s => s.status === 'ACTIVE').length);
  console.log('Raw data:', JSON.stringify(allSubscribers, null, 2));
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
