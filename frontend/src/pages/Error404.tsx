import { NavLink } from "react-router-dom";
import Error404Illustration from "../components/illustrations/Error404";

// Error page for visitors

const Error404visitor = () => {
  return (
    <div className="flex md:flex-row bg-verylightblue items-center justify-center min-h-screen overflow-hidden">
      <div className="flex items-center justify-center flex-col gap-8 ">
        <Error404Illustration
          primary="#8597D0"
          secondary="#E9BB8E"
          className="h-[40vh]  w-auto  sm:h-[50vh] md:h-[60vh]"
        />
        <NavLink
          className="bg-midorange rounded-lg px-12 py-2 text-white text-base"
          to="/home"
        >
          Go back
        </NavLink>
      </div>
    </div>
  );
};

export default Error404visitor;

// Error page for companies
export const Error404Entreprise = () => {
  return (
    <div className="flex md:flex-row bg-orangeBg items-center justify-center min-h-screen overflow-hidden">
      <div className="flex items-center justify-center  flex-col gap-8 ">
        <Error404Illustration
          primary="#E9BB8E"
          secondary="#E9BB8E"
          className="sm:h-[40vh]  sm:w-auto   md:h-[60vh]"
        />
        <NavLink
          className="bg-midorange rounded-lg px-12 py-2 text-white text-base"
          to="/"
        >
          Go back
        </NavLink>
      </div>
    </div>
  );
};

// Error page for clients

export const Error404Client = () => {
  return (
    <div className="flex md:flex-row  bg-verylightblue items-center justify-center min-h-screen overflow-hidden">
      <div className="flex items-center justify-center  flex-col gap-8 ">
        <Error404Illustration
          primary="#8597D0"
          secondary="#8597D0"
          className="sm:h-[40vh]  sm:w-auto   md:h-[60vh]"
        />
        <NavLink
          className="bg-midorange rounded-lg px-12 py-2 text-white text-base"
          to="/"
        >
          Go back
        </NavLink>
      </div>
    </div>
  );
};
