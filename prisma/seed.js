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

    // Seed Games
    console.log('Seeding games...');
    const gamesData = [
      {
        name: 'Catan',
        minPlayers: 3,
        maxPlayers: 4,
        description: 'A strategy game about building settlements.',
        ownerId: createdUsers[1].id, // andrea
      },
      {
        name: 'Ticket to Ride',
        minPlayers: 2,
        maxPlayers: 5,
        description: 'Build train routes across the country.',
        ownerId: createdUsers[2].id, // ethan
      },
      {
        name: 'Codenames',
        minPlayers: 4,
        maxPlayers: 8,
        description: 'A word-based party game.',
        ownerId: createdUsers[3].id, // pablo
      },
      {
        name: 'Pandemic',
        minPlayers: 2,
        maxPlayers: 4,
        description: 'Work together to save the world from diseases.',
        ownerId: createdUsers[1].id, // andrea
      },
      {
        name: 'Azul',
        minPlayers: 2,
        maxPlayers: 4,
        description: 'A tile-placement game.',
        ownerId: createdUsers[2].id, // ethan
      },
    ];

    const createdGames = await Promise.all(
      gamesData.map((game) => prisma.game.create({ data: game })),
    );

    console.log(`Seed completed! Created ${createdGames.length} games.`);
    createdGames.forEach((g) => {
      console.log(
        `   - ${g.name} owned by ${createdUsers.find((u) => u.id === g.ownerId).username}`,
      );
    });

    // Seed Votes
    console.log('Seeding votes...');
    const votesData = [
      // Board Game Night votes
      {
        userId: createdUsers[1].id, // andrea
        eventId: createdEvents[0].id,
        gameId: createdGames[0].id, // Catan
      },
      {
        userId: createdUsers[2].id, // ethan
        eventId: createdEvents[0].id,
        gameId: createdGames[3].id, // Pandemic
      },
      {
        userId: createdUsers[3].id, // pablo
        eventId: createdEvents[0].id,
        gameId: createdGames[0].id, // Catan
      },
      // Trivia Night votes
      {
        userId: createdUsers[1].id, // andrea
        eventId: createdEvents[1].id,
        gameId: createdGames[2].id, // Codenames
      },
      {
        userId: createdUsers[3].id, // pablo
        eventId: createdEvents[1].id,
        gameId: createdGames[2].id, // Codenames
      },
      // Strategy Games Meetup votes
      {
        userId: createdUsers[2].id, // ethan
        eventId: createdEvents[2].id,
        gameId: createdGames[4].id, // Azul
      },
    ];

    const createdVotes = await Promise.all(
      votesData.map((vote) => prisma.vote.create({ data: vote })),
    );

    console.log(`Seed completed! Created ${createdVotes.length} votes.`);
  } catch (error) {
    console.error('Seed failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
