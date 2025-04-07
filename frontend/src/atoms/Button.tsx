import { NavLink, NavLinkProps } from "react-router-dom";
import { useRoleTheme } from "../context/roleThemeContext";

export type ButtonVariant = "filled" | "DANGER" | "SUCCES" | "GRAY";

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
  const role = useRoleTheme();
  if (!role) return null;
  const baseStyle = "px-6 py-2 rounded-lg font-medium text-sm transition-all";

  const roleBasedVariants = {
    filled: {
      client: "bg-bluebase text-white hover:bg-blue-700",
      admin: "bg-orangebase text-white hover:bg-orange-700",
      visitor: "bg-orangebase text-white hover:bg-orange-700",
    },
  } as const;

  const staticVariants = {
    DANGER: "bg-red text-white hover:bg-red-700",
    SUCCES: "bg-green text-white hover:bg-green-700",
    GRAY: "bg-lightgray border border-gray text-white",
  } as const;

  let colorStyle = "";

  if (variant !== "filled") {
    colorStyle = staticVariants[variant];
  } else {
    colorStyle = roleBasedVariants.filled[role];
  }

  const fullClassName = `${baseStyle} ${colorStyle} ${className}`.trim();

  return (
    <NavLink className={fullClassName} {...rest}>
      {label}
    </NavLink>
  );
}
