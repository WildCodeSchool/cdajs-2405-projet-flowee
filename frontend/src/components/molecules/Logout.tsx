import { useLogout } from "@utils/logout";
import SettingsIcon from "@components/atoms/Icons/SettingsIcon";

export default function Logout() {
  const logout = useLogout();

  return (
    <li className="md:w-full">
      <button
        type="button"
        onClick={logout}
        className="flex flex-col items-center text-gray-500 hover:text-theme-dark md:justify-center"
      >
        <SettingsIcon className="h-6 w-6 md:h-4 md:w-4" />
        <span className="hidden md:block text-xs mt-2">Logout</span>
      </button>
    </li>
  );
}
