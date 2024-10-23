// types.ts
export interface IUser {
  id?: number | string;
  last_name: string;
  first_name: string;
  email: string;
  avatar?: string;
  role?: 'admin' | 'user';
  password?: string;
}
