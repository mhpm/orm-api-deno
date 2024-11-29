import { Context } from 'https://deno.land/x/hono@v3.4.1/mod.ts';

export const handleError = (c: Context, error: unknown, status = 500) => {
  if (error instanceof Error) {
    return c.json({ error: error.message }, status);
  }
  return c.json({ error: 'An unknown error occurred' }, status);
};
