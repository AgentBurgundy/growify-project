export interface LoginCredentials {
  email: string;
  password: string;
}

export interface User {
  id: number;
  email: string;
  role: string;
  fullName: string;
  onboarding: boolean;
  lastActivityAt: string;
  avatarUrl: string;
  createdAt: string;
  orgName: string;
}

export interface TokenInfo {
  type: string;
  expiresIn: number;
  accessToken: string;
}

export interface AuthResponse {
  data: {
    user: User;
    token: TokenInfo;
  };
}
