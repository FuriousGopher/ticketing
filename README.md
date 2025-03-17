# Ticketing Platform API

A backend API for a ticketing platform built with Nest.js and Prisma,
handling ticket tiers and platform fees.

## Tech Stack
- Nest.js
- TypeScript
- PostgreSQL (Prisma ORM)
- Jest
- Swagger (API documentation)

## Setup
1. **Start PostgreSQL:**
   ```bash
   docker-compose up -d

2. **Install dependencies:**
   ```bash
   npm install
   
3. **Install dependencies:**
   ```bash
   npx prisma init
   
4. **Run migrations:**
   ```bash
   npx prisma migrate dev --name init
   
5. **Install dependencies:**
   ```bash
   npm run start:dev
   
## Test the Project

1. **Run all tests:**
   ```bash
   npm run test
   
## Swagger Documentation

Access the Swagger UI at http://localhost:3000/api after starting the app to
explore and test endpoints interactively.

