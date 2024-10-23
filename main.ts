// main.ts
import { handler } from './routes.ts';

// Use Deno.serve to start the server on port 8000
console.log('Server running on http://localhost:8000/');
Deno.serve({ port: 8000 }, handler);
