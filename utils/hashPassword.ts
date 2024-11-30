import * as _bcrypt from 'bcrypt';

export const hashPassword = async (password: string): Promise<string> => {
  const hash = await _bcrypt.hash(password);
  return hash;
};

export const verifyPassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  const result = await _bcrypt.compare(password, hashedPassword);
  return result;
};
