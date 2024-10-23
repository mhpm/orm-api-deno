// routes.ts
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from './modules/users.ts';
import { IUser } from './types/user.ts';

const headers = new Headers({
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*', // Allow requests from any origin
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
});

export async function handler(req: Request): Promise<Response> {
  const url = new URL(req.url);
  const id = url.pathname.split('/')[2];

  // Handle preflight (OPTIONS) requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers });
  }

  if (req.method === 'GET' && url.pathname === '/users') {
    return new Response(JSON.stringify(getUsers()), { status: 200, headers });
  }

  if (req.method === 'GET' && id) {
    const user = getUserById(id);
    return user
      ? new Response(JSON.stringify(user), { status: 200, headers })
      : new Response('User not found', { status: 404, headers });
  }

  if (req.method === 'POST' && url.pathname === '/users') {
    const body: IUser = await req.json();
    const newUser = createUser(body);
    return new Response(JSON.stringify(newUser), { status: 201, headers });
  }

  if (req.method === 'PUT' && id) {
    const body: Partial<IUser> = await req.json();
    const updatedUser = updateUser(id, body);
    return updatedUser
      ? new Response(JSON.stringify(updatedUser), { status: 200, headers })
      : new Response('User not found', { status: 404, headers });
  }

  if (req.method === 'DELETE' && id) {
    const deletedUser = deleteUser(id);
    return deletedUser
      ? new Response(JSON.stringify(deletedUser), { status: 200, headers })
      : new Response('User not found', { status: 404, headers });
  }

  return new Response('Not Found', { status: 404, headers });
}
