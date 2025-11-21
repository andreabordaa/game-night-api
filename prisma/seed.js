import bcrypt from 'bcrypt';
import prisma from '../src/config/db.js';

async function main() {
  try {
    console.log('Cleaning database...');
    await prisma.vote.deleteMany();
    await prisma.event.deleteMany();
    await prisma.game.deleteMany();
    await prisma.user.deleteMany();

    console.log('Seeding users...');

    const passwordHash = await bcrypt.hash('password123', 10);

    const usersData = [
      {
        email: 'admin@email.com',
        username: 'admin',
        password: passwordHash,
        role: 'ADMIN',
      },
      {
        email: 'andrea@email.com',
        username: 'andrea',
        password: passwordHash,
        role: 'USER',
      },
      {
        email: 'ethan@email.com',
        username: 'ethan',
        password: passwordHash,
        role: 'USER',
      },
      {
        email: 'pablo@email.com',
        username: 'pablo',
        password: passwordHash,
        role: 'USER',
      },
    ];

    const createdUsers = await Promise.all(
      usersData.map((user) => prisma.user.create({ data: user })),
    );

    console.log(`Seed completed! Created ${createdUsers.length} users.`);

    createdUsers.forEach((u) => {
      console.log(`   - ${u.username} (${u.role})`);
    });
  } catch (error) {
    console.error('Seed failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
