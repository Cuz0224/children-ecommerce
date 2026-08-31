export type AccountRole = "CUSTOMER" | "ADMIN";

export interface RegisterAdminInput {
  username: string;
  password: string;
}

export interface RegisterAdminOutput {
  userId: string; // data-from: AccountUser-id
  username: string; // data-from: AccountUser-username
  role: AccountRole; // data-from: AccountUser-role
  token: string;
}

export interface AdminRegisterFormData {
  username: string;
  password: string;
  confirmPassword: string;
  agreedToSecurityPolicy: boolean;
}

export interface PasswordRequirement {
  id: string;
  label: string;
  met: boolean;
}

export interface PasswordStrength {
  score: number;
  label: "Weak" | "Fair" | "Good" | "Strong";
  colorClass: string;
  progressPercent: number;
}