import { client } from '../db.ts';
import type { IUser } from '../types/user.ts';

// Create a new user
export const createUser = async (user: IUser): Promise<IUser> => {
  const result = await client.queryObject<IUser>(
    `INSERT INTO users (first_name, last_name, email, role, avatar, password)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [
      user.first_name,
      user.last_name,
      user.email,
      user.role,
      user.avatar,
      user.password,
    ]
  );
  return result.rows[0];
};

// Get all users
export const getUsers = async (): Promise<IUser[]> => {
  const result = await client.queryObject<IUser>('SELECT * FROM users');
  return result.rows;
};

// Get a user by ID
export const getUserById = async (id: number): Promise<IUser | null> => {
  const result = await client.queryObject<IUser>(
    'SELECT * FROM users WHERE id = $1',
    [id]
  );
  return result.rows.length > 0 ? result.rows[0] : null;
};

// Update a user by ID
export const updateUser = async (
  id: number,
  updatedUser: Partial<IUser>
): Promise<IUser | null> => {
  const { first_name, last_name, email, role, avatar, password } = updatedUser;
  const result = await client.queryObject<IUser>(
    `UPDATE users
     SET first_name = COALESCE($1, first_name),
         last_name = COALESCE($2, last_name),
         email = COALESCE($3, email),
         role = COALESCE($4, role),
         avatar = COALESCE($5, avatar),
         password = COALESCE($6, password)
     WHERE id = $7
     RETURNING *`,
    [first_name, last_name, email, role, avatar, password, id]
  );
  return result.rows.length > 0 ? result.rows[0] : null;
};

// Delete a user by ID
export const deleteUser = async (id: number): Promise<IUser | null> => {
  const result = await client.queryObject<IUser>(
    'DELETE FROM users WHERE id = $1 RETURNING *',
    [id]
  );
  return result.rows.length > 0 ? result.rows[0] : null;
};
