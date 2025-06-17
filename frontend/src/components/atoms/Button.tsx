import { useRoleTheme } from "@context/roleThemeContext";
import type { NavLinkProps } from "react-router-dom";
import { NavLink } from "react-router-dom";

export type ButtonVariant = "filled" | "DANGER" | "SUCCES" | "GRAY" | "OUTLINE";

interface ButtonProps extends NavLinkProps {
  label: string;
  variant?: ButtonVariant;
  className?: string;
}

export default function Button({
  label,
  variant = "filled",
  className = "",
  ...rest
}: ButtonProps) {
  const userRole = useRoleTheme();
  if (!userRole) return null;
  const baseStyle = "px-6 py-2 rounded-lg font-medium text-sm transition-all";

  const roleBasedVariants = {
    filled: {
      client: "bg-theme-base text-white hover:bg-blue-700",
      admin: "bg-theme-base text-white hover:bg-orange-700",
      visitor: "bg-theme-base text-white hover:bg-orange-700",
    },
  } as const;

  const staticVariants = {
    DANGER: "bg-red text-white hover:bg-red-700",
    SUCCES: "bg-green text-white hover:bg-green-700",
    GRAY: "bg-lightgray border border-gray text-white",
    OUTLINE: "bg-white border border-darkGray text-darkGray hover:bg-lightgray",
  } as const;

  let colorStyle = "";

  if (variant !== "filled") {
    colorStyle = staticVariants[variant];
  } else {
    colorStyle = roleBasedVariants.filled[userRole];
  }

  const fullClassName = `${baseStyle} ${colorStyle} ${className}`.trim();

  return (
    <NavLink className={fullClassName} {...rest}>
      {label}
    </NavLink>
  );
}
