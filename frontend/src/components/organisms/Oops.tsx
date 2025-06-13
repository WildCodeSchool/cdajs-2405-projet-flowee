import LogoClientIcon from "@components/atoms/Icons/LogoClient";
import LogoEntrepriseIcon from "@components/atoms/Icons/LogoEntreprise";
import { useRoleTheme } from "@context/roleThemeContext";

export default function Oops() {
  const role = useRoleTheme();
  if (!role) return null;

  return (
    <div
      className={`w-full max-w-72 flex flex-row gap-4 items-center p-4 border rounded-md ${
        role === "client"
          ? "bg-orangeBg border-darkorange"
          : "bg-blueBg border-darkblue "
      }`}
    >
      {role === "client" ? (
        <LogoEntrepriseIcon className="h-12 w-12 border border-gray-300 rounded-md p-2" />
      ) : (
        <LogoClientIcon className="h-12 w-12 border border-gray-300 rounded-md p-2" />
      )}
      <div className="">
        <p className="font-bold">Oops, I am not a {role}</p>
        <p className="underline text-sm">Click here to Sign Up</p>
      </div>
    </div>
  );
}
