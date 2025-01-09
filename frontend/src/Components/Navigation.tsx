import { NavLink } from "react-router-dom";
import DashboardIcon from "./Icons/DashboardIcon";
import ProjectsIcon from "./Icons/ProjectsIcon";
import PlusIcon from "./Icons/PlusIcon";
import ClientsIcon from "./Icons/ClientsIcon";
import SettingsIcon from "./Icons/SettingsIcon";

export default function Navigation() {
  return (
    <nav className="fixed bottom-0 left-0 z-50 w-full bg-white border-t border-gray-200  dark:border-gray-600">
      <ul className="flex justify-around items-center h-16">
        <li>
          <NavLink
            to="/dashboard"
            className="flex flex-col items-center text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-white"
          >
            <DashboardIcon className="h-6 w-6" />
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/projects"
            className="flex flex-col items-center text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-white"
          >
            <ProjectsIcon className="h-6 w-6" />
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/" //need to change this when the logic is done
            className="flex flex-col items-center text-gray-500 dark:text-gray-400"
          >
            <div className="flex items-center justify-center w-12 h-12 bg-orangebase rounded-full hover:bg-orangelight dark:hover:bg-orangelight">
              <PlusIcon className="h-6 w-6 text-white" />
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/clients"
            className="flex flex-col items-center text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-white"
          >
            <ClientsIcon className="h-6 w-6" />
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/settings"
            className="flex flex-col items-center text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-white"
          >
            <SettingsIcon className="h-6 w-6" />
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
