import { LoginCredentials, AuthResponse, User } from "@/types/auth";

export const login = async (
  credentials: LoginCredentials
): Promise<AuthResponse> => {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  const data = await response.json();

  // We only store user data in localStorage now, token is in HTTP-only cookie
  localStorage.setItem("auth_user", JSON.stringify(data.data.user));

  return data;
};

export const getStoredUser = (): User | null => {
  if (typeof window === "undefined") return null;
  const userStr = localStorage.getItem("auth_user");
  return userStr ? JSON.parse(userStr) : null;
};

export const clearAuthData = async (): Promise<void> => {
  localStorage.removeItem("auth_user");

  // Call logout endpoint to clear the cookie server-side
  await fetch("/api/auth/logout", {
    method: "POST",
    credentials: "include",
  });
};

export const isAuthenticated = (): boolean => {
  return document.cookie.includes("auth_token=");
};
