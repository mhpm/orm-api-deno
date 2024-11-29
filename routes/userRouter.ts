import { userService } from '../services/userService.ts';
import { jsonResponse } from '../utils/response.ts';

export async function userRouter(req: Request): Promise<Response> {
  const url = new URL(req.url);
  const id = parseInt(url.pathname.split('/')[2] || '', 10);

  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }

  // Welcome message for the root route
  if (req.method === 'GET' && url.pathname === '/') {
    return jsonResponse({ message: 'Welcome to the ORM API! 🌟' });
  }

  try {
    switch (req.method) {
      case 'GET':
        if (url.pathname === '/users') {
          const page = parseInt(url.searchParams.get('page') || '1', 10);
          const limit = parseInt(url.searchParams.get('limit') || '10', 10);
          const users = await userService.getUsers(page, limit);
          return jsonResponse(users);
        } else if (!isNaN(id)) {
          const user = await userService.getUserById(id);
          if (!user) return jsonResponse({ error: 'User not found' }, 404);
          return jsonResponse(user);
        }
        break;

      case 'POST':
        if (url.pathname === '/users') {
          const user = await req.json();
          const newUser = await userService.createUser(user);
          return jsonResponse(newUser, 201);
        }
        break;

      case 'PUT':
        if (!isNaN(id)) {
          const updates = await req.json();
          const updatedUser = await userService.updateUser(id, updates);
          if (!updatedUser)
            return jsonResponse({ error: 'User not found' }, 404);
          return jsonResponse(updatedUser);
        }
        break;

      case 'DELETE':
        if (!isNaN(id)) {
          const deletedUser = await userService.deleteUser(id);
          if (!deletedUser)
            return jsonResponse({ error: 'User not found' }, 404);
          return jsonResponse({
            message: 'User deleted successfully',
            id: deletedUser.id,
          });
        }
        break;

      default:
        return jsonResponse({ error: 'Method not allowed' }, 405);
    }

    return jsonResponse({ error: 'Not Found' }, 404);
  } catch (_error) {
    if (_error instanceof Error) {
      return jsonResponse({ error: _error.message }, 400);
    }
    return jsonResponse({ error: 'An unknown error occurred' }, 500);
  }
}
