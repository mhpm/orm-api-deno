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

// Serve the index.html file
app.get('/', async (c) => {
  const htmlContent = await Deno.readTextFile('./index.html');
  return c.html(htmlContent);
});

app.route('/users', userRouter);

export default app;
