'use server';

import prisma from '@/tools/prisma';
import { hashPassword, signToken, withResult } from '@/backend/action_utils';
import { RegisterAdminInput, RegisterAdminOutput, AccountRole } from '@/backend/types/AdminRegister';

/**
 * Register a new platform administrator account.
 * Domain rules:
 * - Username is unique across all account_user records.
 * - Password credential stored through the platform authentication flow as password_hash.
 * - Role is strictly assigned as ADMIN on the server; client cannot request arbitrary roles.
 * - Valid registration signs a persistent JWT token for the new user ID.
 */
export const registerAdmin = withResult(async (input: RegisterAdminInput): Promise<RegisterAdminOutput> => {
  const cleanUsername = input.username?.trim();

  if (!cleanUsername || cleanUsername.length < 3) {
    throw new Error('Username must be at least 3 characters long.');
  }

  if (cleanUsername.length > 255) {
    throw new Error('Username cannot exceed 255 characters.');
  }

  if (!input.password || input.password.length < 8) {
    throw new Error('Password must be at least 8 characters long.');
  }

  // Check unique username constraint
  const existingUser = await prisma.accountUser.findUnique({
    where: { username: cleanUsername },
    select: { id: true },
  });

  if (existingUser) {
    throw new Error('An administrator account with this username already exists. Please choose another username or sign in.');
  }

  // Create persistent AccountUser with ADMIN role and hashed password
  const newUser = await prisma.accountUser.create({
    data: {
      username: cleanUsername,
      passwordHash: hashPassword(input.password),
      role: 'ADMIN',
    },
  });

  // Issue authentication token for the registered administrator
  const token = await signToken(newUser.id, newUser.role);

  return {
    userId: newUser.id, // data-from: AccountUser-id
    username: newUser.username, // data-from: AccountUser-username
    role: newUser.role as AccountRole, // data-from: AccountUser-role
    token,
  };
});