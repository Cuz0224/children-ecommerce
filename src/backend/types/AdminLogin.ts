export type AccountRole = "CUSTOMER" | "ADMIN";

export interface AdminLoginInput {
  username: string;
  password: string;
}

export interface AdminLoginOutput {
  token: string;
  userId: string; // data-from: AccountUser-id
  username: string; // data-from: AccountUser-username
  role: AccountRole; // data-from: AccountUser-role
}

export interface AdminLoginCredentials {
  username: string;
  password: string;
}

export interface AdminLoginState {
  isLoading: boolean;
  errorMessage: string | null;
  successMessage: string | null;
}