import { Hono } from 'hono';
import { cors } from 'hono/cors';
import userRouter from './routes/userRouter.ts';

const app = new Hono();

// Apply CORS middleware
app.use(
  '*',
  cors({
    origin: '*', // Allow all origins (or specify your domain, e.g., 'https://example.com')
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    allowHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  })
);

app.get('/', (c) => c.json({ message: 'Welcome to the User API! 🌟' }));

app.route('/users', userRouter);

export default app;
