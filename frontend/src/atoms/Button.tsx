// src/components/atoms/Button.tsx

import { AuthContextUserType } from "../interfaces/AuthContextUserType";
import { NavLink, NavLinkProps } from "react-router-dom";

export type ButtonVariant = "filled" | "DANGER" | "SUCCES" | "GRAY";

interface ButtonProps extends NavLinkProps {
  label: string;
  role: AuthContextUserType["role"];
  variant?: ButtonVariant;
  className?: string;
}

export default function Button({
  label,
  role,
  variant = "filled",
  className = "",
  ...rest
}: ButtonProps) {
  const baseStyle = "px-6 py-2 rounded-lg font-medium text-sm transition-all";

  const roleBasedVariants: Record<
    "filled",
    Record<AuthContextUserType["role"], string>
  > = {
    filled: {
      CLIENT: "bg-bluebase text-white hover:bg-blue-700",
      ADMIN: "bg-orangebase text-white hover:bg-orange-700",
    },
  };

  const staticVariants: Record<Exclude<ButtonVariant, "filled">, string> = {
    DANGER: "bg-red text-white hover:bg-red-700",
    SUCCES: "bg-green text-white hover:bg-green-700",
    GRAY: "bg-lightgray border border-gray text-white",
  };

  let colorStyle = "";

  if (variant in staticVariants) {
    colorStyle = staticVariants[variant as Exclude<ButtonVariant, "filled">];
  } else if (
    variant in roleBasedVariants &&
    role in roleBasedVariants[variant as keyof typeof roleBasedVariants]
  ) {
    colorStyle =
      roleBasedVariants[variant as keyof typeof roleBasedVariants][role];
  }

  const fullClassName = `${baseStyle} ${colorStyle} ${className}`.trim();

  return (
    <NavLink className={fullClassName} {...rest}>
      {label}
    </NavLink>
  );
}
