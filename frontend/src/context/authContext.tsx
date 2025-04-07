import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export interface AuthContextClientType {
  email: string;
  role: string;
  clientName: string;
}

interface AuthContextType {
  authUserData: Partial<AuthContextClientType>;
  setToken: (token: string) => void;
}

function decodeContextData(
  token: string | null,
): Partial<AuthContextClientType> {
  if (!token || token.split(".").length !== 3) {
    // localStorage.removeItem("AUTH_TOKEN");
    return {};
  }

  try {
    const tokenData: AuthContextClientType = jwtDecode(token);
    console.log("update context data from tokenData", tokenData);
    return {
      email: tokenData.email,
      role: tokenData.role,
      clientName: tokenData.clientName,
    };
  } catch (e) {
    console.error("Erreur lors du décodage du token :", e);
    return {};
  }
}

export const authContext = createContext<AuthContextType>({
  authUserData: {},
  setToken: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authUserData, setAuthUserData] = useState<
    Partial<AuthContextClientType>
  >(decodeContextData(localStorage.getItem("AUTH_TOKEN")));

  const [token, setToken] = useState(localStorage.getItem("AUTH_TOKEN") ?? "");

  useEffect(() => {
    if (token) {
      localStorage.setItem("AUTH_TOKEN", token);
      setAuthUserData(decodeContextData(token));
    }
  }, [token]);

  return (
    <authContext.Provider value={{ authUserData, setToken }}>
      {children}
    </authContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(authContext);

  if (!context) {
    throw new Error("No existing context");
  }

  return context;
}
