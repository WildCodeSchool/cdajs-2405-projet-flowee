import LogoClientIcon from "@components/atoms/Icons/LogoClient";
import LogoEntrepriseIcon from "@components/atoms/Icons/LogoEntreprise";

interface RoleToastProps {
  message: string;
  role: "ADMIN" | "CLIENT" | undefined;
}

function RoleToast({ message, role }: RoleToastProps) {
  return role === "ADMIN" ? (
    <div className="flex items-center gap-2 bg-dark">
      <LogoEntrepriseIcon />
      <div className="text-green-500">
        <p>{message} !</p>
      </div>
    </div>
  ) : (
    <LogoClientIcon />
  );
}

export default RoleToast;
