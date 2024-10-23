// routes.ts
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from './modules/users.ts';
import { IUser } from './types/user.ts';

export async function handler(req: Request): Promise<Response> {
  const url = new URL(req.url);
  const id = url.pathname.split('/')[2];

  if (req.method === 'GET' && url.pathname === '/users') {
    return new Response(JSON.stringify(getUsers()), { status: 200 });
  }

  if (req.method === 'GET' && id) {
    const user = getUserById(id);
    return user
      ? new Response(JSON.stringify(user), { status: 200 })
      : new Response('User not found', { status: 404 });
  }

  if (req.method === 'POST' && url.pathname === '/users') {
    const body: IUser = await req.json();
    const newUser = createUser(body);
    return new Response(JSON.stringify(newUser), { status: 201 });
  }

  if (req.method === 'PUT' && id) {
    const body: Partial<IUser> = await req.json();
    const updatedUser = updateUser(id, body);
    return updatedUser
      ? new Response(JSON.stringify(updatedUser), { status: 200 })
      : new Response('User not found', { status: 404 });
  }

  if (req.method === 'DELETE' && id) {
    const deletedUser = deleteUser(id);
    return deletedUser
      ? new Response(JSON.stringify(deletedUser), { status: 200 })
      : new Response('User not found', { status: 404 });
  }

  return new Response('Not Found', { status: 404 });
}
