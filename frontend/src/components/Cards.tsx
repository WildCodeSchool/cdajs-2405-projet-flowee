import { ReactNode } from "react";
import { CardBackground } from "./illustrations/cardBackground";
import { useRoleTheme } from "../context/roleThemeContext";

export type CardVariant = "projects" | "deliverables" | "tasks" | "toReview";

interface CardProps {
  children?: ReactNode;
  variant: CardVariant;
}

export const Card = ({ children, variant }: CardProps) => {
  const role = useRoleTheme();
  if (!role) return null;

  return (
    <div className="card relative h-[180px] w-full min-w-[250px] md:w-[280px]  md:h-[160px] rounded-lg overflow-hidden bg-theme-cardBg">
      <CardBackground
        variant={variant}
        className="absolute h-full w-full inset-0 z-0"
      />
      <div className="relative z-10 p-5 flex flex-col justify-between h-full ">
        <div className="text-3xl font-bold flex flex-col h-full justify-between ">
          {children}
        </div>
      </div>
    </div>
  );
};
