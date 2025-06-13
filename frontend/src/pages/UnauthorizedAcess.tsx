import Unauthorized from "@components/atoms/illustrations/Unauthorized";
import { NavLink } from "react-router-dom";

// Error page for visitors

const UnauthorizedAccess = () => {
  return (
    <div className="flex md:flex-row bg-theme-lightGray items-center justify-center min-h-screen overflow-hidden">
      <div className="flex items-center justify-center flex-col gap-8 ">
        <Unauthorized className="h-[40vh]  w-auto  sm:h-[50vh] md:h-[60vh]" />
        <NavLink
          className="bg-theme-visitorBtnBG rounded-lg px-12 py-2 text-white text-base"
          to="/"
        >
          Go back
        </NavLink>
      </div>
    </div>
  );
};

export default UnauthorizedAccess;
