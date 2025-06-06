import type React from "react";

interface AvatarProps {
  name: string;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "w-8 h-8 text-sm",
  md: "w-12 h-12 text-base",
  lg: "w-16 h-16 text-lg",
};

export const Avatar: React.FC<AvatarProps> = ({ name, size = "md" }) => {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div
      className={`${sizeClasses[size]} rounded-full bg-theme-veryLight text-theme-base flex items-center justify-center font-semibold`}
    >
      {getInitials(name)}
    </div>
  );
};
