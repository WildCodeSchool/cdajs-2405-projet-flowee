import { NavLink } from "react-router-dom";
import LogoIcon from "@components/atoms/Icons/Logo";
import LogoMarkIcon from "@components/atoms/Icons/LogoMark";
import AuthIllustration from "@illustrations/AuthIllus";
import LoginForm from "@organisms/LoginForm";
export default function Login() {
  return (
    <div className="flex flex-row w-full ">
      <aside className=" hidden sm:block sm:bg-orangeLight sm:w-[55%] sm:p-10">
        <NavLink to="/">
          {" "}
          <LogoIcon className=" w-40" />
        </NavLink>
        <AuthIllustration className="w-[80%] mx-auto" />
      </aside>
      <section className=" flex flex-auto flex-col bg-white gap-2 h-svh sm:justify-center sm:px-8 lg:px-28 justify-end">
        <div className="flex flex-col gap-3 text-center">
          <aside className="flex flex-col sm:flex-row items-center gap-2">
            <LogoMarkIcon className=" w-12 sm:w-8 " />
            <h1 className=" text-2xl sm:text-3xl font-bold ">SIGN IN</h1>
          </aside>

          <h2 className="hidden sm:flex sm:text-lg sm:text-left ">
            Welcome back! <br />
            Everything’s ready – just log in and pick up where you left off.
          </h2>
        </div>
        <div className=" mt-6 relative z-0 sm:w-full">
          <div className=" sm:hidden h-36 bg-[#E9BB8E] rounded-t-[43px]" />
          <div className=" sm:hidden h-36 bg-[#8597D0] rounded-t-[43px] -mt-8 z-10 relative" />
          <div className="bg-white rounded-t-[43px] -mt-8 z-20 relative py-20 p-8 sm:py-6 sm:px-0">
            <LoginForm />
          </div>
        </div>
      </section>
    </div>
  );
}
