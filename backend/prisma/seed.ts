import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  // create two dummy articles
  // const post1 = await prisma.proveedor.upsert({
  //   where: { nombre: 'Prisma Adds Support for MongoDB' },
  //   update: {},
  //   create: {
  //     nombre: 'Prisma Adds Support for MongoDB',
  //     estado: false,
  //   },
  // });;
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
