'use server';

import prisma from '@/tools/prisma';
import { UnauthorizedError, withResult, hashPassword, signToken } from '@/backend/action_utils';
import type { AdminLoginInput, AdminLoginOutput, AccountRole } from '@/backend/types/AdminLogin';

/**
 * Authenticates an administrator against the AccountUser database records.
 * Domain rules:
 * - Only users with role ADMIN are authorized to sign in through the backend portal.
 * - Password verification compares hashPassword(password) against passwordHash in the database.
 * - Generates and returns a signed token using the real account user ID.
 */
export const adminLogin = withResult(
  async (input: AdminLoginInput): Promise<AdminLoginOutput> => {
    const trimmedUsername = input.username?.trim();
    if (!trimmedUsername || !input.password) {
      throw new UnauthorizedError('Username and password are required');
    }

    // 1. Query account user by unique username
    const user = await prisma.accountUser.findUnique({
      where: {
        username: trimmedUsername,
      },
    });

    if (!user) {
      throw new UnauthorizedError('Invalid administrator credentials');
    }

    // 2. Enforce admin role restriction
    if (user.role !== 'ADMIN') {
      throw new UnauthorizedError('Access restricted to administrator accounts only');
    }

    // 3. Compare password hash
    const inputHash = hashPassword(input.password);
    if (inputHash !== user.passwordHash) {
      throw new UnauthorizedError('Invalid administrator credentials');
    }

    // 4. Sign JWT token using real user ID and verified role
    const token = await signToken(user.id, user.role);

    return {
      token,
      userId: user.id, // data-from: AccountUser-id
      username: user.username, // data-from: AccountUser-username
      role: user.role as AccountRole, // data-from: AccountUser-role
    };
  }
);