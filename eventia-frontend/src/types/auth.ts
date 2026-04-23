export interface AuthResponse {
  token: string;
  email: string;
  rol: string;
  nombre: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthUser {
  email: string;
  rol: string;
  nombre: string;
}