import { useLogout } from "@utils/logout";

import LogOutIcon from "@components/atoms/Icons/LogOutIcon";

export default function Logout() {
  const logout = useLogout();

  return (
    <li className="md:w-full">
      <button
        type="button"
        onClick={logout}
        className="flex flex-col items-center text-gray-500 hover:text-theme-dark md:justify-center w-full"
      >
        <LogOutIcon className="h-5 w-5 md:h-3 md:w-3 fill-black" />
        <span className="hidden md:block text-xs mt-2">Logout</span>
      </button>
    </li>
  );
}
