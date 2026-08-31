'use server';

import prisma from '@/tools/prisma';
import {
  hashPassword,
  signToken,
  UnauthorizedError,
  withResult,
} from '@/frontend/action_utils';
import type { CustomerLoginInput, CustomerLoginResult } from '@/frontend/types/CustomerLogin';

/**
 * Customer authentication server action
 * - Domain Rule: Only accounts with role='CUSTOMER' can sign in to the storefront customer portal.
 * - Validation: Checks that username exists, passwordHash matches hashPassword(password), and role is CUSTOMER.
 * - Token Generation: Uses signToken with the verified database AccountUser ID.
 */
export async function loginCustomer(
  input: CustomerLoginInput
): Promise<CustomerLoginResult> {
  return withResult(async () => {
    const trimmedUsername = input.username?.trim();
    if (!trimmedUsername || !input.password) {
      throw new UnauthorizedError('Please provide both username and password.');
    }

    // Query matching AccountUser record from database
    const user = await prisma.accountUser.findUnique({
      where: {
        username: trimmedUsername,
      },
    });

    if (!user) {
      throw new UnauthorizedError('Invalid username or password.');
    }

    // Verify hashed password
    const hashedInput = hashPassword(input.password);
    if (user.passwordHash !== hashedInput) {
      throw new UnauthorizedError('Invalid username or password.');
    }

    // Role enforcement: Allowed role is strictly CUSTOMER for this frontend storefront portal
    if (user.role !== 'CUSTOMER') {
      throw new UnauthorizedError('Access restricted. Please use a Customer account.');
    }

    // Generate authenticated JWT token for the session
    const token = await signToken(user.id, user.role);

    return {
      token,
      userId: user.id, // data-from: AccountUser-id
      username: user.username, // data-from: AccountUser-username
      role: 'CUSTOMER' as const, // data-from: AccountUser-role
    };
  })();
}