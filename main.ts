// main.ts
import { handler } from './routes.ts';
import { connectDB, disconnectDB } from './db.ts';

// Connect to the database when the server starts
await connectDB();

console.log('Server running on http://localhost:8000/');
Deno.serve(handler);

// Close the database connection when the process exits
addEventListener('unload', async () => {
  await disconnectDB();
});
