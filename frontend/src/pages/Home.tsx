import { NavLink } from "react-router-dom";
import LogoIcon from "../components/Icons/Logo";

export default function Home() {
  return (
    <div className="flex flex-col h-full justify-center  items-center md:justify-between min-h-screen px-6 md:px-0 md:pt-10 md:pb-0 py-10">
      <div className="flex w-full md:justify-between justify-center md:px-10 ">
        <div className="md:w-1/3 flex justify-center md:justify-start ">
          <LogoIcon />
        </div>

        {/* Right Side (Sign-in Button) */}
        <div className="hidden md:w-1/3 md:flex items-center justify-center md:justify-end">
          <NavLink
            to="/login"
            className="bg-white border-black border rounded-lg px-12 py-2 text-black text-base md:w-48  text-center"
          >
            Sign in
          </NavLink>
        </div>
      </div>

      {/* Content Section (Only Visible on Desktop) */}
      <section className=" md:flex   md:justify-start flex-col  w-full ">
        <h1 className="font-quicksand text-3xl md:block font-bold hidden md:px-10">
          Welcome to Flowee, <br /> the best project management tool.
        </h1>
        <p className="text-lg max-w-2xl mt-4 text-center md:text-left md:px-10">
          Keep your projects moving effortlessly. <br /> Smooth collaboration
          between teams and clients.
        </p>
        <NavLink
          to="/signup"
          className="bg-midorange rounded-lg px-12 py-2 md:mx-10 md:block hidden text-white text-base mt-6 md:w-48 text-center"
        >
          Sign up
        </NavLink>
        <div
          style={{ backgroundImage: "url(/images/homeImage.png)" }}
          className="mt-8  md:w-full md:h-[50vh] md:bg-cover md:bg-center hidden  md:block"
        ></div>
      </section>

      {/* Mobile Buttons (Stacked) */}
      <aside className="flex flex-col items-center justify-center gap-3 w-3/5 md:hidden mt-6">
        <NavLink
          to="/signup"
          className="bg-midorange rounded-lg px-12 py-2 text-white text-base w-full text-center"
        >
          Sign up
        </NavLink>
        <NavLink
          to="/login"
          className="bg-white border-black border rounded-lg px-12 py-2 text-black text-base w-full text-center"
        >
          Sign in
        </NavLink>
      </aside>
    </div>
  );
}
