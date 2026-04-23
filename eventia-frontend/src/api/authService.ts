import api from "./api";
import type { AuthResponse, LoginRequest } from "../types/auth";

const TOKEN_KEY = "eventia_token";

export const loginRequest = async (
  payload: LoginRequest
): Promise<AuthResponse> => {
  const response = await api.post("/auth/login", payload);
  return response.data;
};

export const saveToken = (token: string): void => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

export const clearToken = (): void => {
  localStorage.removeItem(TOKEN_KEY);
};