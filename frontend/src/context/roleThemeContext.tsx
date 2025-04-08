import { createContext, useContext, ReactNode, useEffect } from "react";
import { useAuth } from "./authContext";

type RoleClass = "client" | "admin" | "visitor";

const RoleThemeContext = createContext<RoleClass>("admin");

export const RoleThemeProvider = ({ children }: { children: ReactNode }) => {
  const { authUserData } = useAuth();
  const role = (authUserData?.role?.toLowerCase() as RoleClass) ?? "visitor";

  if (!role) return null;

  useEffect(() => {
    const html = document.documentElement;

    html.classList.remove("admin", "client", "visitor");
    html.classList.add(role);
  }, [role]);

  return (
    <RoleThemeContext.Provider value={role}>
      {children}
    </RoleThemeContext.Provider>
  );
};

export const useRoleTheme = () => useContext(RoleThemeContext);
