import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL
  if(!email){
    throw new Error('ADMIN_EMAIL environment variable is not set');
  }
  const existingAdmin = await prisma.user.findUnique({ where: { email } });

  if (existingAdmin) {
    console.log('Admin already exists.');
    return;
  }
  const password = process.env.ADMIN_PASSWORD ;

  if(!password){
    throw new Error('ADMIN_PASSWORD environment variable is not set');
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const admin = await prisma.user.create({
    data: {
      full_name: 'Super Admin',
      nick_name: 'admin',
      email,
      password: hashedPassword,
      role: 'admin',
    },
  });

  console.log('Admin user created:', admin);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
