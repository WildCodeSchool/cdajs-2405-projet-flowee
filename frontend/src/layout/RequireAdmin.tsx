import { useAuth } from "@context/authContext";
import UnauthorizedAccess from "@pages/UnauthorizedAcess";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const RequireAdmin = ({ children }: Props) => {
  const { authUserData } = useAuth();

  if (!authUserData || authUserData.role !== "ADMIN") {
    return <UnauthorizedAccess />;
  }

  return <>{children}</>;
};
