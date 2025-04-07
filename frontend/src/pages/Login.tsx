import { useForm } from "react-hook-form";
import {
  type LoginMutation,
  useLoginMutation,
} from "../__generated__/graphql-types";
import type { ApolloError } from "@apollo/client";
import { useNavigate } from "react-router";
import { useAuth } from "../context/authContext";
import LogoIcon from "../components/Icons/Logo";

interface LoginFormData {
  email: string;
  password: string;
}

export default function Login() {
  const { setToken } = useAuth();
  const navigate = useNavigate();

  const [sendLoginMutation, { loading, error }] = useLoginMutation({
    onCompleted: (data: LoginMutation) => {
      console.info("coucou je suis là");
      const token: string = data.login;

      setToken(token);
      // localStorage.setItem("AUTH_TOKEN", token);
      navigate("/dashboard");
    },
    onError: (error: ApolloError) => {
      console.error("login failed", error);
    },
  });

  const { handleSubmit, register } = useForm<LoginFormData>();

  const LoginFormSubmitted = (formData: LoginFormData) => {
    sendLoginMutation({
      variables: formData,
    });
  };

  return (
    <div className="flex flex-row w-full">
      <div className="w-[50%]  bg-verylightorange"></div>
      <div className=" flex flex-col items-center gap-10 h-svh justify-centerpx-10">
        <LogoIcon className="h-40 w-40" />
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-3xl font-bold">Welcome back to Flowee ! </h1>
          <h2>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Mollitia
            rerum iusto quisquam explicabo!
          </h2>
        </div>
        <div className="bg-white flex flex-col items-center gap-10 rounded-t-[3rem] py-10">
          <div className="flex flex-col gap-4  max-w-100 justify-self-center">
            <form
              onSubmit={handleSubmit(LoginFormSubmitted)}
              className="flex flex-col gap-1  justify-self-center"
            >
              <label htmlFor="email">Email</label>
              <input
                type="text"
                className="w-full py-2 px-4 border border-gray rounded-md"
                {...register("email", { required: true })}
                placeholder=""
              />{" "}
              <br />
              <label htmlFor="password">Password</label>
              <input
                className="w-full py-2 px-4 border border-gray rounded-md"
                type="password"
                {...register("password", { required: true })}
                placeholder="Mot de passe"
              />{" "}
              <br />
              <input type="submit" value="Se connecter" />
              {loading && "Loading..."}
              <br />
              {error && "Une erreur est survenue, merci de réessayer..."}
              <br />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
