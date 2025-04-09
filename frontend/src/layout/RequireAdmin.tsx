import { useAuth } from "../context/authContext";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const RequireAdmin = ({ children }: Props) => {
  const { authUserData } = useAuth();

  if (!authUserData || authUserData.role !== "ADMIN") {
    return <h1>Unauthorized</h1>;
  }

  return <>{children}</>;
};
