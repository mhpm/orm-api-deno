import { Hono } from 'https://deno.land/x/hono@v3.4.1/mod.ts';
import userRouter from './routes/userRouter.ts';

const app = new Hono();

app.get('/', (c) => c.json({ message: 'Welcome to the User API! 🌟' }));
app.route('/users', userRouter);

console.log('Server running on http://localhost:8000');

app.fire(); // Start the Hono app

Deno.serve(app.fetch);
