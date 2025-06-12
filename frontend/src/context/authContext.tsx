import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import type { AuthContextType } from "@interfaces/AuthContextType";
import type { AuthContextUserType } from "@interfaces/AuthContextUserType";
import { useApolloClient } from "@apollo/client";

function decodeContextData(token: string | null): Partial<AuthContextUserType> {
  if (!token || token.split(".").length !== 3) {
    // localStorage.removeItem("AUTH_TOKEN");
    return {};
  }

  try {
    const tokenData: AuthContextUserType = jwtDecode(token);
    console.log("update context data from tokenData", tokenData);
    return {
      email: tokenData.email,
      role: tokenData.role,
      clientName: tokenData.clientName,
      firstname: tokenData.firstname,
      lastname: tokenData.lastname,
    };
  } catch (e) {
    console.error("Error while decoding token :", e);
    return {};
  }
}

export const authContext = createContext<AuthContextType>({
  authUserData: {},
  setToken: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const client = useApolloClient();
  const [authUserData, setAuthUserData] = useState<
    Partial<AuthContextUserType>
  >(decodeContextData(localStorage.getItem("AUTH_TOKEN")));

  const [token, setToken] = useState(localStorage.getItem("AUTH_TOKEN") ?? "");

  useEffect(() => {
    const syncAuth = async () => {
      if (token) {
        // login / token changed
        localStorage.setItem("AUTH_TOKEN", token);
        setAuthUserData(decodeContextData(token));
        try {
          await client.resetStore(); // re-fetch active queries
        } catch (e) {
          console.error("Apollo reset error:", e);
        }
      } else {
        // logout / token emptied
        localStorage.removeItem("AUTH_TOKEN"); // ← deleting here
        setAuthUserData({}); // reset context
        try {
          await client.clearStore(); // purge cache Apollo
        } catch (e) {
          console.error("Error clear Apollo:", e);
        }
      }
    };

    syncAuth();
  }, [token, client]);

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
