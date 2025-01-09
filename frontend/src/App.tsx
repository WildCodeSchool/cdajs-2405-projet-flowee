import DisplayProjects from "./Components/DisplayProjects.js";

export default function App() {
  return (
    <>
      <div className=" min-h-screen flex flex-col  items-center justify-center gap-10">
        <img src="/images/logo.svg" alt="logo flowee" />
        <h1 className="text-lg text-center">
          Velit consequatur sapiente. Iusto ut necessitatibus voluptas iusto.{" "}
        </h1>
        <button
          type="button"
          className="px-20 py-3 rounded-xl text-white bg-orangebase"
        >
          Sign up
        </button>
        <button
          type="button"
          className="px-20 py-3 rounded-xl text-black  border-2"
        >
          Sign in
        </button>
      </div>
      <DisplayProjects />
    </>
  );
}
