import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  clearToken,
  getToken,
  loginRequest,
  meRequest,
  saveToken,
} from "../api/authService";
import type { AuthUser, LoginRequest } from "../types/auth";

interface AuthContextType {
  token: string | null;
  user: AuthUser | null;
  loadingSession: boolean;
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
  const [loadingSession, setLoadingSession] = useState(true);

  useEffect(() => {
    const restoreSession = async () => {
      const storedToken = getToken();

      if (!storedToken) {
        setLoadingSession(false);
        return;
      }

      try {
        const me = await meRequest(storedToken);

        setToken(storedToken);
        setUser({
          id: me.id,
          email: me.email,
          rol: me.rol,
          nombre: me.nombre,
        });
      } catch (error) {
        console.error("No se pudo restaurar la sesión:", error);
        clearToken();
        setToken(null);
        setUser(null);
      } finally {
        setLoadingSession(false);
      }
    };

    restoreSession();
  }, []);

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
    <AuthContext.Provider value={{ token, user, loadingSession, login, logout }}>
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