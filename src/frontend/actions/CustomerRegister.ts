'use server';

import prisma from '@/tools/prisma';
import { hashPassword, signToken, withResult } from '@/frontend/action_utils';
import type {
  RegisterCustomerInput,
  RegisterCustomerOutput,
  AccountRole,
} from '@/frontend/types/CustomerRegister';

/**
 * Customer Self-Registration Action
 *
 * Domain Rules:
 * - Username is unique across all accounts.
 * - Registration always assigns role CUSTOMER (role selector is not available to visitors).
 * - Password credential is securely hashed and stored as passwordHash.
 * - Initializing an active shopping cart for newly registered customers.
 */
export const registerCustomer = withResult(
  async (input: RegisterCustomerInput): Promise<RegisterCustomerOutput> => {
    const trimmedUsername = input.username?.trim();

    if (!trimmedUsername || trimmedUsername.length < 3) {
      throw new Error('Username must be at least 3 characters long.');
    }

    if (trimmedUsername.length > 255) {
      throw new Error('Username must not exceed 255 characters.');
    }

    if (!input.password || input.password.length < 6) {
      throw new Error('Password must be at least 6 characters long.');
    }

    if (input.password.length > 255) {
      throw new Error('Password must not exceed 255 characters.');
    }

    // 1. Check uniqueness of username across account_user table
    const existingUser = await prisma.accountUser.findUnique({
      where: {
        username: trimmedUsername,
      },
    });

    if (existingUser) {
      throw new Error('Username is already taken. Please pick another explorer name.');
    }

    // 2. Hash password and persist user with role CUSTOMER
    const hashedPassword = hashPassword(input.password);

    const newUser = await prisma.accountUser.create({
      data: {
        username: trimmedUsername,
        passwordHash: hashedPassword,
        role: 'CUSTOMER',
      },
    });

    // 3. Initialize an ACTIVE shopping cart for the new customer
    await prisma.shoppingCart.create({
      data: {
        customerId: newUser.id,
        cartStatus: 'ACTIVE',
      },
    });

    // 4. Generate and sign authentication JWT token
    const token = await signToken(newUser.id, newUser.role);

    return {
      userId: newUser.id, // data-from: AccountUser-id
      username: newUser.username, // data-from: AccountUser-username
      role: newUser.role as AccountRole, // data-from: AccountUser-role
      token: token,
    };
  }
);