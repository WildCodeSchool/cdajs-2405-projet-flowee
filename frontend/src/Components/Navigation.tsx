import { NavLink } from "react-router-dom";
import DashboardIcon from "./Icons/DashboardIcon";
import ProjectsIcon from "./Icons/ProjectsIcon";
import PlusIcon from "./Icons/PlusIcon";
import ClientsIcon from "./Icons/ClientsIcon";
import SettingsIcon from "./Icons/SettingsIcon";
import LogoEntrepriseIcon from "./Icons/LogoEntreprise";

export default function Navigation() {
  return (
    <nav className="fixed bottom-0 left-0 z-50 w-full bg-white shadow-t-md md:w-20 md:h-[calc(100%-24px)] md:shadow-lg md:border-r md:border-gray-200 md:m-4 md:p-3 md:pt-4 md:pb-4 md:rounded-lg">
      <ul className="flex justify-around items-center h-16 md:flex-col md:justify-between md:items-center md:h-full md:space-y-4">
        <li className="hidden md:block md:w-full">
          <NavLink
            to="/dashboard"
            className="flex flex-col items-center text-gray-500 hover:text-darkorange md:justify-center"
          >
            <LogoEntrepriseIcon className="h-9 w-9" />
          </NavLink>
        </li>
        <li className="md:w-full">
          <NavLink
            to="/dashboard"
            className="flex flex-col items-center text-gray-500 hover:text-darkorange md:justify-center"
          >
            <DashboardIcon className="h-6 w-6 md:h-4 md:w-4" />
            <span className="hidden md:block text-xs mt-2">Dashboard</span>
          </NavLink>
        </li>
        <li className="md:w-full">
          <NavLink
            to="/projects"
            className="flex flex-col items-center text-gray-500 hover:text-darkorange md:justify-center"
          >
            <ProjectsIcon className="h-6 w-6 md:h-4 md:w-4" />
            <span className="hidden md:block text-xs mt-2">Projects</span>
          </NavLink>
        </li>
        <li className="md:w-full">
          <NavLink
            to="/"
            className="flex flex-col items-center text-gray-500 md:justify-center"
          >
            <div className="flex items-center justify-center w-12 h-12 md:w-8 md:h-8 bg-orangebase rounded-full hover:bg-orangelight">
              <PlusIcon className="h-6 w-6 md:h-4 md:w-4 text-white" />
            </div>
          </NavLink>
        </li>
        <li className="md:w-full">
          <NavLink
            to="/clients"
            className="flex flex-col items-center text-gray-500 hover:text-darkorange md:justify-center"
          >
            <ClientsIcon className="h-6 w-6 md:h-5 md:w-5" />
            <span className="hidden md:block text-xs mt-2">Clients</span>
          </NavLink>
        </li>
        <li className="md:w-full">
          <NavLink
            to="/settings"
            className="flex flex-col items-center text-gray-500 hover:text-darkorange md:justify-center"
          >
            <SettingsIcon className="h-6 w-6 md:h-4 md:w-4" />
            <span className="hidden md:block text-xs mt-2">Settings</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
