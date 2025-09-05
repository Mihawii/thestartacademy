import { PrismaClient } from '../src/generated/prisma';

const prisma = new PrismaClient();

async function main() {
  const students = [
    'aerthea.branch@gmail.com',
    'khabi0208@gmail.com',
    'lisxwis@gmail.com'
  ];

  for (const email of students) {
    await prisma.allowedStudent.upsert({
      where: { email },
      update: {},
      create: {
        email,
        name: email.split('@')[0],
        addedBy: 'system@startacademy.com'
      },
    });
    console.log(`Added/updated student: ${email}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
