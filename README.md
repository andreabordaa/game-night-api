# Game-Night-API

## About The Project
The **Game-Night-API** is a backend service used to plan and create board game events, games, and user participation.
Users can:

- Add, Update, and Delete games to their account
- Create, Update, and Delete Events
- Join events and see any other event attendees
- Manage votes on favorite games

## Built With

- Node.js
- Express
- Prisma
- PostgresSQL

## Deployment

This API was deployed on **Render**

## Installation

1. Clone the repository
2. Install dependences

```
npm install
```

3. Set up the .env

```
PORT=3000
DATABASE_URL=your_postgres_url
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=15m
```

4. Run prisma migrations

```
npx prisma migrate dev
```

5. Start the server

```
npm run dev
```
