import { corsHeaders } from './cors.ts';
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from './services/userService.ts';

export async function handler(req: Request): Promise<Response> {
  const url = new URL(req.url);
  const id = parseInt(url.pathname.split('/')[2] || '', 10); // Parse ID from path

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders() });
  }

  if (req.method === 'GET' && url.pathname === '/users') {
    const users = await getUsers();
    return new Response(JSON.stringify(users), {
      headers: corsHeaders(),
    });
  }

  if (req.method === 'GET' && !isNaN(id)) {
    const user = await getUserById(id);
    if (!user) return new Response('User not found', { status: 404 });
    return new Response(JSON.stringify(user), { headers: corsHeaders() });
  }

  if (req.method === 'POST' && url.pathname === '/users') {
    const user = await req.json();
    const newUser = await createUser(user);
    return new Response(JSON.stringify(newUser), {
      status: 201,
      headers: corsHeaders(),
    });
  }

  if (req.method === 'PUT' && !isNaN(id)) {
    const updates = await req.json();
    const updatedUser = await updateUser(id, updates);
    if (!updatedUser) return new Response('User not found', { status: 404 });
    return new Response(JSON.stringify(updatedUser), {
      headers: corsHeaders(),
    });
  }

  if (req.method === 'DELETE' && !isNaN(id)) {
    const deletedUser = await deleteUser(id);
    if (!deletedUser) return new Response('User not found', { status: 404 });
    return new Response(JSON.stringify(deletedUser), {
      headers: corsHeaders(),
    });
  }

  return new Response('Not Found', { status: 404, headers: corsHeaders() });
}
