import type { ApolloError } from "@apollo/client";
import { Input } from "@atoms/Input";
import { useAuth } from "@context/authContext";
import { type LoginMutation, useLoginMutation } from "@generated/graphql-types";
import ErrorBanner from "@molecules/ErrorBanner";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { NavLink } from "react-router-dom";

interface LoginFormData {
  email: string;
  password: string;
}

export default function LoginForm() {
  const { setToken } = useAuth();
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginFormData>();

  const [sendLogin, { error, loading }] = useLoginMutation({
    onCompleted: (data: LoginMutation) => {
      const token: string = data.login;
      setToken(token);
      navigate("/dashboard");
    },
    onError: (error: ApolloError) => {
      console.error("login failed", error);
    },
  });
  const onSubmit = (data: LoginFormData) => sendLogin({ variables: data });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 w-full"
    >
      <Input
        label="Email"
        type="email"
        {...register("email", { required: "Email is required" })}
      />
      {errors.email && (
        <p className="text-red text-sm">{errors.email.message}</p>
      )}

      <Input
        label="Password"
        type="password"
        {...register("password", { required: "Password is required" })}
      />
      {errors.password && (
        <p className="text-red text-sm">{errors.password.message}</p>
      )}

      <NavLink className="text-end text-sm w-full" to="">
        Forgot your password?
      </NavLink>
      {error && <ErrorBanner message="Wrong credentials, please try again." />}
      <section className=" flex flex-col gap-2 items-center justify-center mt-2 sm:items-start">
        <button
          className="bg-theme-visitorBtnBG flex gap-3 items-center justify-center rounded-lg px-12 py-2   text-white text-base  md:w-48 text-center"
          type="submit"
          disabled={loading}
        >
          {loading && (
            <div
              className="h-4 w-4 border-2 border-white  border-t-transparent rounded-full animate-spin"
              aria-hidden="true"
            />
          )}
          {loading ? "Loading" : "Sign in"}
          {loading && <span className="sr-only">Loading</span>}
        </button>
        <p className=" text-center md:text-start  w-full text-sm">
          You don't have an account?{" "}
          <NavLink className="underline font-medium" to="/signup">
            Sign up{" "}
          </NavLink>
        </p>
      </section>
    </form>
  );
}
