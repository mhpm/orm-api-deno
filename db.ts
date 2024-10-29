// db.ts
import { Client } from 'https://deno.land/x/postgres@v0.17.0/mod.ts';

// Configure PostgreSQL connection
const client = new Client({
  hostname: 'localhost',
  port: 7000,
  user: 'postgres', // Replace with your PostgreSQL username
  password: 'mhpm', // Replace with your PostgreSQL password
  database: 'orm', // Replace with your database name
});

export async function connectDB() {
  try {
    await client.connect();
    console.log('Connected to PostgreSQL database.');
  } catch (error) {
    console.error('Failed to connect to the database:', error);
  }
}

export async function disconnectDB() {
  await client.end();
}

export { client };
