import { useState, type ChangeEvent, type FormEvent } from "react";

import LogoEntrepriseIcon from "@components/atoms/Icons/LogoEntreprise";
import { gql, useMutation } from "@apollo/client";
import { Link } from "react-router-dom";

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
    }
  } 
`;

const CREATE_CLIENT_MUTATION = gql`
 mutation Mutation($accountId: Float!, $name: String!) {
  createClient(accountId: $accountId, name: $name) {
    id
    name  
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

  const [createClient] = useMutation(CREATE_CLIENT_MUTATION);

  const [success, setSuccess] = useState(false);

  const handleChangeForm = (e: ChangeEvent<HTMLInputElement>) => {
    setSignUpData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (signUpData.password !== signUpData.passwordConfirmation) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const { data } = await createAccount({
        variables: {
          email: signUpData.email,
          password: signUpData.password,
          role: user.toLowerCase(),
        },
      });
      const accountId = Number(data.createAccount.id);
      if (!accountId) {
        console.error("No account ID received, aborting client creation.");
        return;
      }
      if (user === "client") {
        try {
          await createClient({
            variables: {
              name: signUpData.name,
              accountId: Number(accountId),
            },
          });
          console.log("Client created successfully");
        } catch (err) {
          console.error("Error creating client:", err);
        }
      }

      setSuccess(true);
      setSignUpData(initialFormData);
    } catch (err) {
      console.error("Error creating account:", err);
    }
  };

  return (
    <div
      className={` pt-10 min-h-svh ${color} flex flex-col gap-10 justify-center items-center`}
    >
      {user === "admin" ? <LogoEntrepriseIcon className="h-20 w-20" /> : null}

      <div
        className={`${user === "admin" ? "bg-orangelight" : "bg-bluelight"} w-full rounded-t-3xl `}
      >
        <div
          className={`${user === "admin" ? "bg-orangelight" : "bg-bluelight"} w-full h-14 rounded-t-[3rem] left-0`}
        />

        <div
          className={`${user === "admin" ? "bg-midorange" : "bg-midblue"} w-full h-14 rounded-t-[3rem] left-0`}
        />
        <div className={`${user === "admin" ? "bg-midorange" : "bg-midblue"}`}>
          <div className="bg-white flex flex-col items-center gap-10 rounded-t-[3rem] py-10">
            <div className="flex flex-col gap-4  max-w-96 justify-self-center">
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
                  {error.message}
                </p>
              )}
              {success && (
                <p className="text-green-700 text-sm text-center">
                  Account successfully created
                </p>
              )}

              <div className="flex flex-row items-center gap-2 justify-center">
                <p className="text-xs">You already have an account?</p>
                <Link to="/login" className="font-bold text-xs underline">
                  Sign in
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
