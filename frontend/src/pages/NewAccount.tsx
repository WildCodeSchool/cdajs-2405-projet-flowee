import { useState, type ChangeEvent, type FormEvent } from "react";
import LogoClientIcon from "../components/Icons/LogoClient";
import LogoEntrepriseIcon from "../components/Icons/LogoEntreprise";
import { gql, useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import Oops from "../components/Oops";

interface PropsType {
  user: string;
  color: string;
}

interface FormData {
  email: string;
  name: string;
  password: string;
  passwordConfirmation: string;
}

const CREATE_ACCOUNT_MUTATION = gql`
  mutation CreateAccount($role: String!, $password: String!, $email: String!) {
    createAccount(role: $role, password: $password, email: $email) {
      id
      email
      role
    }
  }
`;

export default function NewAccount({ user, color }: PropsType) {
  const initialFormData: FormData = {
    email: "",
    name: "",
    password: "",
    passwordConfirmation: "",
  };

  const [signUpData, setSignUpData] = useState(initialFormData);
  const [createAccount, { loading, error }] = useMutation(
    CREATE_ACCOUNT_MUTATION,
  );
  const [emailError, setEmailError] = useState("");

  const handleChangeForm = (e: ChangeEvent<HTMLInputElement>) => {
    setSignUpData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setEmailError(""); // Réinitialise l'erreur à chaque soumission

    if (signUpData.password !== signUpData.passwordConfirmation) {
      alert("Passwords do not match!");
      return;
    }

    try {
      await createAccount({
        variables: {
          email: signUpData.email,
          password: signUpData.password,
          role: user.toLowerCase(),
        },
      });

      alert("Account successfully created!");
      setSignUpData(initialFormData); // Réinitialisation du formulaire après succès
    } catch (err) {
      console.error("Error creating account:", err);

      // Vérifie si l'erreur vient du backend et concerne l'email
      if (err instanceof Error && "graphQLErrors" in err) {
        const graphQLError = err.graphQLErrors.find((error) =>
          error.message.includes("Email already exists"),
        );

        if (graphQLError) {
          setEmailError(graphQLError.message); // Stocke l'erreur pour l'afficher sous l'input email
          return;
        }
      }

      // Autre erreur (erreur serveur, timeout, etc.)
      alert("Failed to create account! Please try again.");
    }
  };

  return (
    <div
      className={`px-10 min-h-svh ${color} flex flex-col gap-4 justify-center items-center`}
    >
      {user === "admin" ? (
        <LogoEntrepriseIcon className="h-12 w-12" />
      ) : (
        <LogoClientIcon className="h-20 w-20" />
      )}
      <h1 className="text-2xl font-bold">
        CREATE {user.toUpperCase()} ACCOUNT
      </h1>

      <div className="flex flex-col gap-4 w-full max-w-96">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <label htmlFor="email" className="flex flex-col w-full">
            Email
            <input
              type="email"
              name="email"
              value={signUpData.email}
              placeholder="Email"
              className="p-2 border border-gray-300 rounded-md w-full"
              onChange={handleChangeForm}
              required
            />
            {emailError && <p className="text-red-500 text-xs">{emailError}</p>}
          </label>

          <label htmlFor="name" className="flex flex-col">
            {`${user} Name`}
            <input
              type="text"
              name="name"
              value={signUpData.name}
              placeholder={`${user} Name`}
              className="p-2 border border-gray-300 rounded-md w-full"
              onChange={handleChangeForm}
              required
            />
          </label>

          <label htmlFor="password" className="flex flex-col">
            Password
            <input
              type="password"
              name="password"
              value={signUpData.password}
              placeholder="Password"
              className="p-2 border border-gray-300 rounded-md w-full"
              onChange={handleChangeForm}
              required
            />
          </label>

          <label htmlFor="passwordConfirmation" className="flex flex-col">
            Confirm Password
            <input
              type="password"
              name="passwordConfirmation"
              value={signUpData.passwordConfirmation}
              placeholder="Confirm Password"
              className="p-2 border border-gray-300 rounded-md w-full"
              onChange={handleChangeForm}
              required
            />
          </label>

          <button
            type="submit"
            className={`w-56 inline-block rounded-lg py-2 px-4 text-white text-base self-center ${
              user === "client" ? "bg-bluebase" : "bg-orangebase"
            }`}
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        {error && (
          <p className="text-red-500 text-sm text-center">
            Error: {error.message}
          </p>
        )}

        <div className="flex flex-row items-center gap-2 justify-center">
          <p className="text-xs">You already have an account?</p>
          <Link to="/login" className="font-bold text-xs underline">
            Sign in
          </Link>
        </div>
      </div>

      <Oops user={user} />
    </div>
  );
}
