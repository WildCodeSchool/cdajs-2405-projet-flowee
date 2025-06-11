import Unauthorized from "@components/atoms/illustrations/Unauthorized";
import { useAuth } from "@context/authContext";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const RequireAdmin = ({ children }: Props) => {
  const { authUserData } = useAuth();

  if (!authUserData || authUserData.role !== "ADMIN") {
    return <Unauthorized className="w-full h-screen" />;
  }

  return <>{children}</>;
};
