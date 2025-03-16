import LogoClientIcon from "./Icons/LogoClient";
import LogoEntrepriseIcon from "./Icons/LogoEntreprise";

interface propsType {
  user: string;
}

export default function Oops({ user }: propsType) {
  return (
    <div
      className={`w-full max-w-72 flex flex-row gap-4 items-center p-4 border rounded-md ${
        user === "client"
          ? "bg-orangeBg border-darkorange"
          : "bg-blueBg border-darkblue "
      }`}
    >
      {user === "client" ? (
        <LogoEntrepriseIcon className="h-12 w-12 border border-gray-300 rounded-md p-2" />
      ) : (
        <LogoClientIcon className="h-12 w-12 border border-gray-300 rounded-md p-2" />
      )}
      <div className="">
        <p className="font-bold">Oops, I am not a {user}</p>
        <p className="underline text-sm">Click here to Sign Up</p>
      </div>
    </div>
  );
}
