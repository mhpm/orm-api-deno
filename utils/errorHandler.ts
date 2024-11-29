import { Context } from 'hono';

export const handleError = (c: Context, error: unknown, status = 500) => {
  if (error instanceof Error) {
    return c.json({ error: error.message }, status);
  }
  return c.json({ error: 'An unknown error occurred' }, status);
};
