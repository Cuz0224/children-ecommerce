export type AccountRole = "CUSTOMER" | "ADMIN";

export interface RegisterFormData {
  username: string;
  password: string;
}

export interface FormValidationErrors {
  username?: string;
  password?: string;
}

export interface PrivilegeItem {
  id: string;
  iconName: "rocket" | "box" | "sparkles" | "shield";
  title: string;
  description: string;
  badgeText: string;
  accentColor: string;
}

export interface RegisterCustomerInput {
  username: string;
  password: string;
}

export interface RegisterCustomerOutput {
  userId: string; // data-from: AccountUser-id
  username: string; // data-from: AccountUser-username
  role: AccountRole; // data-from: AccountUser-role
  token: string;
}