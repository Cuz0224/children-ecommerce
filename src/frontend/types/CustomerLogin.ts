export type AccountRole = "CUSTOMER" | "ADMIN";

export interface CustomerLoginInput {
  username: string;
  password: string;
}

export interface CustomerLoginResult {
  token: string;
  userId: string; // data-from: AccountUser-id
  username: string; // data-from: AccountUser-username
  role: "CUSTOMER"; // data-from: AccountUser-role
}

export interface LoginFormValues {
  username: string;
  password: string;
}

export interface FormErrorState {
  username?: string;
  password?: string;
  form?: string;
}

export interface ClubPerkItem {
  id: string;
  title: string;
  description: string;
  iconName: "ShieldCheck" | "Coins" | "Heart" | "Gift";
  badgeText?: string;
}