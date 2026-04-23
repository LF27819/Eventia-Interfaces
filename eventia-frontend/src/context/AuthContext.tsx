import { createContext, useContext, useState, type ReactNode } from "react";
import {
  clearToken,
  getToken,
  loginRequest,
  saveToken,
} from "../api/authService";
import type { AuthUser, LoginRequest } from "../types/auth";

interface AuthContextType {
  token: string | null;
  user: AuthUser | null;
  login: (data: LoginRequest) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [token, setToken] = useState<string | null>(getToken());
  const [user, setUser] = useState<AuthUser | null>(null);

  const login = async (data: LoginRequest) => {
    const response = await loginRequest(data);

    saveToken(response.token);
    setToken(response.token);

    setUser({
      email: response.email,
      rol: response.rol,
      nombre: response.nombre,
    });
  };

  const logout = () => {
    clearToken();
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth debe usarse dentro de AuthProvider");
  }

  return context;
}