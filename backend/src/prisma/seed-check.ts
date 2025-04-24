// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

export async function run() {
  const existingUsers = await prisma.user.count();

  if (existingUsers === 0) {
    const hashedPassword = await hash(process.env.ADM_PASSWORD, 10);
    await prisma.user.create({
      data: {
        username: 'Admin',
        password: hashedPassword,
        accessLevel: 'ADMIN',
      },
    });

    console.log('✅ Usuário admin criado com sucesso.');
  } else {
    console.log('ℹ️ Usuários já existem, seed ignorado.');
  }
}

 run()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
