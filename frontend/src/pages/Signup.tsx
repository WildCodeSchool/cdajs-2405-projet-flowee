import { type ChangeEvent, type FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import LogoClientIcon from "../components/Icons/LogoClient";
import LogoEntrepriseIcon from "../components/Icons/LogoEntreprise";

interface FormData {
  email: string;
  accessCode: string;
}
export default function Signup() {
  const initialFormData: FormData = {
    email: "",
    accessCode: "",
  };
  const [signUpData, setSignUpData] = useState(initialFormData);

  const handleChangeForm = (e: ChangeEvent<HTMLInputElement>) => {
    setSignUpData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSignUpData(initialFormData);
  };

  return (
    <div className="px-10 bg-blueBg flex flex-col items-center gap-10 h-svh justify-center">
      <LogoClientIcon className="h-20 w-20" />
      <div className="flex flex-col gap-2 text-center">
        <h1 className="text-3xl font-bold">Welcome to Flowee ! </h1>
        <h2>Du blabla sur une nouvelle façon de gerer ses projets</h2>
      </div>
      <div className="flex flex-col gap-4 w-full max-w-96">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <label htmlFor="email" className="flex flex-col w-full ">
            Email
            <input
              type="email"
              name="email"
              value={signUpData.email}
              placeholder="Email"
              className="text-center p-2 border border-gray-300 rounded-md w-full"
              onChange={handleChangeForm}
              required
            />
          </label>
          <label htmlFor="accessCode" className="flex flex-col">
            Code
            <input
              type="text"
              name="accessCode"
              value={signUpData.accessCode}
              placeholder="Code"
              className="text-center p-2 border border-gray-300 rounded-md w-full"
              onChange={handleChangeForm}
              required
            />
          </label>
          <button
            type="submit"
            className="bg-bluebase w-56 inline-block rounded-lg py-2 px-4 text-white text-base self-center"
          >
            Link to project
          </button>
        </form>

        <div className="flex flex-row items-center gap-2 justify-center">
          <p className="text-xs ">You already have an account ?</p>
          <Link to="/Login" className="font-bold text-xs underline ">
            Sign in
          </Link>
        </div>
      </div>
      <div className="w-full max-w-72 flex flex-row gap-4 items-center bg-orangeBg p-4 border rounded-md border-darkorange">
        <LogoEntrepriseIcon className="h-12 w-12 border border-gray-300 rounded-md p-2" />
        <div className="">
          <p className="font-bold">Oops, I am not a client</p>
          <p className="underline text-sm">Click here to Sign Up</p>
        </div>
      </div>
    </div>
  );
}
