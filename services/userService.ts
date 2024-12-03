import { supabase } from '../lib/supabaseClient.ts';
import type { IUser } from '../types/user.ts';
import { hashPassword } from '../utils/hashPassword.ts';

export const userService = {
  async createUser(user: IUser): Promise<IUser> {
    // Check if email already exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('email', user.email)
      .single();

    if (existingUser) {
      throw new Error('Email already exists');
    }

    // Hash the password before saving to the database
    const hashedPassword = await hashPassword(user.password as string);
    const userWithHashedPassword: IUser = {
      ...user,
      password: hashedPassword,
      avatar: 'https://avatars.githubusercontent.com/u/273650',
    };

    const { data, error } = await supabase
      .from('users')
      .insert(userWithHashedPassword)
      .select()
      .single();

    if (error) throw new Error(error.message);

    const { password, ...userWithoutPassword } = data;

    console.log('userWithoutPassword: ', userWithoutPassword);
    return userWithoutPassword;
  },

  async getUsers(
    page: number,
    limit: number
  ): Promise<{
    users: Omit<IUser, 'password'>[];
    page: number;
    limit: number;
    total: number;
  }> {
    const start = (page - 1) * limit;
    const end = start + limit - 1;

    // Get total count of users
    const { count, error: countError } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true });

    if (countError) throw new Error(countError.message);

    // Fetch paginated users
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .order('id', { ascending: false })
      .range(start, end);

    if (error) throw new Error(error.message);

    // Exclude the password field for each user
    const users = data.map(({ password, ...user }) => user);

    return {
      users,
      page,
      limit,
      total: count || 0,
    };
  },

  async getUserById(id: number): Promise<IUser | null> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();

    if (error) return null;

    const { password, ...userWithoutPassword } = data;

    return userWithoutPassword;
  },

  async updateUser(
    id: number,
    updatedUser: Partial<IUser>
  ): Promise<IUser | null> {
    if (updatedUser.email) {
      const { data: existingUser } = await supabase
        .from('users')
        .select('id')
        .eq('email', updatedUser.email)
        .single();

      if (existingUser && existingUser.id !== id) {
        throw new Error('Email already exists');
      }
    }

    if (updatedUser.password) {
      updatedUser.password = await hashPassword(updatedUser.password);
    }

    const { data, error } = await supabase
      .from('users')
      .update(updatedUser)
      .eq('id', id)
      .select()
      .single();

    if (error) return null;

    const { password, ...userWithoutPassword } = data;
    return userWithoutPassword;
  },

  async deleteUser(id: number): Promise<IUser | null> {
    const { data, error } = await supabase
      .from('users')
      .delete()
      .eq('id', id)
      .select()
      .single();

    if (error) return null;

    return data.id;
  },
};
