import { useForm } from "react-hook-form";
import {
  type LoginMutation,
  useLoginMutation,
} from "../__generated__/graphql-types";
import type { ApolloError } from "@apollo/client";
import { useNavigate } from "react-router";
import { useAuth } from "../context/authcontext";

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
      navigate("/test");
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
    <div className="">
      <div className="bg-white flex flex-col items-center gap-10 rounded-t-[3rem] py-10">
        <div className="flex flex-col gap-4  max-w-96 justify-self-center">
          <form onSubmit={handleSubmit(LoginFormSubmitted)}>
            <input
              type="text"
              {...register("email", { required: true })}
              placeholder="Email"
            />{" "}
            <br />
            <input
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
  );
}
