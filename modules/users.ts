import type { IUser } from '../types/user.ts';

// Initialize with 3 fake users
const users: IUser[] = [
  {
    id: 1,
    first_name: 'Alice',
    last_name: 'Johnson',
    email: 'alice@example.com',
    avatar: 'https://via.placeholder.com/150',
    role: 'user',
    password: 'password123',
  },
  {
    id: 2,
    first_name: 'Bob',
    last_name: 'Smith',
    email: 'bob@example.com',
    avatar: 'https://via.placeholder.com/150',
    role: 'admin',
    password: 'adminpass',
  },
  {
    id: 3,
    first_name: 'Charlie',
    last_name: 'Brown',
    email: 'charlie@example.com',
    avatar: 'https://via.placeholder.com/150',
    role: 'user',
    password: 'charlie123',
  },
];

// Create a new user
export const createUser = (user: IUser) => {
  user.id = users.length + 1; // Auto-increment ID
  users.push(user);
  return user;
};

// Get all users
export const getUsers = () => users;

// Get a user by ID
export const getUserById = (id: number | string) =>
  users.find((user) => user.id === id);

// Update a user by ID
export const updateUser = (
  id: number | string,
  updatedUser: Partial<IUser>
) => {
  const index = users.findIndex((user) => user.id === id);
  if (index === -1) return null;

  users[index] = { ...users[index], ...updatedUser };
  return users[index];
};

// Delete a user by ID
export const deleteUser = (id: number | string) => {
  const index = users.findIndex((user) => user.id === id);
  if (index === -1) return null;

  return users.splice(index, 1)[0];
};
