import { Hono } from 'https://deno.land/x/hono@v3.4.1/mod.ts';
import { userService } from '../services/userService.ts';
import { handleError } from '../utils/errorHandler.ts';

const userRouter = new Hono();

// Get all users with pagination
userRouter.get('/', async (c) => {
  const page = parseInt(c.req.query('page') || '1', 10);
  const limit = parseInt(c.req.query('limit') || '10', 10);

  try {
    const users = await userService.getUsers(page, limit);
    return c.json(users);
  } catch (error) {
    return handleError(c, error);
  }
});

// Get a single user by ID
userRouter.get('/:id', async (c) => {
  const id = parseInt(c.req.param('id'), 10);

  try {
    const user = await userService.getUserById(id);
    if (!user) return c.json({ error: 'User not found' }, 404);
    return c.json(user);
  } catch (error) {
    return handleError(c, error);
  }
});

// Create a new user
userRouter.post('/', async (c) => {
  const body = await c.req.json();

  try {
    const newUser = await userService.createUser(body);
    return c.json(newUser, 201);
  } catch (error) {
    return handleError(c, error);
  }
});

// Update an existing user by ID
userRouter.put('/:id', async (c) => {
  const id = parseInt(c.req.param('id'), 10);
  const body = await c.req.json();

  try {
    const updatedUser = await userService.updateUser(id, body);
    if (!updatedUser) return c.json({ error: 'User not found' }, 404);
    return c.json(updatedUser);
  } catch (error) {
    return handleError(c, error);
  }
});

// Delete a user by ID
userRouter.delete('/:id', async (c) => {
  const id = parseInt(c.req.param('id'), 10);

  try {
    const deletedUser = await userService.deleteUser(id);
    if (!deletedUser) return c.json({ error: 'User not found' }, 404);
    return c.json(deletedUser);
  } catch (error) {
    return handleError(c, error);
  }
});

export default userRouter;
