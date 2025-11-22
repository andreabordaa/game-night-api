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

    const eventsData = [
      {
        name: 'Board Game Night',
        location: 'Community Center',
        eventDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
        description: 'An evening of fun board games with friends.',
        hostId: createdUsers[1].id, // andrea
      },
      {
        name: 'Trivia Night',
        location: 'Local Cafe',
        eventDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
        description: 'Test your knowledge and win prizes!',
        hostId: createdUsers[2].id, // ethan
      },
      {
        name: 'Strategy Games Meetup',
        location: 'Gaming Hub',
        eventDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        description: 'For lovers of strategy and tactical games.',
        hostId: createdUsers[3].id, // pablo
      },
    ];

    const createdEvents = await Promise.all(
      eventsData.map((event) => prisma.event.create({ data: event })),
    );

    console.log(`Seed completed! Created ${createdEvents.length} events.`);

    createdEvents.forEach((e) => {
      console.log(
        `   - ${e.name} hosted by ${createdUsers.find((u) => u.id === e.hostId).username}`,
      );
    });
  } catch (error) {
    console.error('Seed failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
