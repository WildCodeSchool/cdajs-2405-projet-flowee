// src/context/roleThemeContext.tsx
import { createContext, useContext, ReactNode, useEffect } from "react";
import { useAuth } from "./authContext";

type RoleClass = "client" | "admin";

const RoleThemeContext = createContext<RoleClass>("admin");

export const RoleThemeProvider = ({ children }: { children: ReactNode }) => {
  const { authUserData } = useAuth();
  const role = (authUserData?.role?.toLowerCase() as RoleClass) ?? "admin";

  if (!role) return null;

  useEffect(() => {
    const html = document.documentElement;

    html.classList.remove("admin", "client");
    html.classList.add(role);
  }, [role]);

  return (
    <RoleThemeContext.Provider value={role}>
      {children}
    </RoleThemeContext.Provider>
  );
};

export const useRoleTheme = () => useContext(RoleThemeContext);
