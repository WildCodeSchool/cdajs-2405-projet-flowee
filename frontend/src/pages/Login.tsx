import { gql, useMutation } from "@apollo/client";
import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router";

interface FormData {
  email: string;
  password: string;
}

const LOGIN_MUTATION = gql`
  mutation Login($password: String!, $email: String!) {
    login(password: $password, email: $email)
  }
`;

export default function Login() {
  let navigate = useNavigate();

  const initialSignInData: FormData = {
    email: "",
    password: "",
  };

  const [signInData, setsignInData] = useState(initialSignInData);
  const [login, { loading, error }] = useMutation(LOGIN_MUTATION);
  const [success, setSuccess] = useState(false);

  const handleChangeForm = (e: ChangeEvent<HTMLInputElement>) => {
    setsignInData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    try {
      await login({
        variables: {
          email: signInData.email,
          password: signInData.password,
        },
      });
    } catch (error) {
      console.error("Unable to login");
    }

    setSuccess(true);
    navigate("/dashboard");
  };

  return (
    <div className="">
      <div className="bg-white flex flex-col items-center gap-10 rounded-t-[3rem] py-10">
        <div className="flex flex-col gap-4  max-w-96 justify-self-center">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <label htmlFor="email" className="flex flex-col w-full">
              Email
              <input
                type="email"
                name="email"
                value={signInData.email}
                placeholder="Email"
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
                value={signInData.password}
                placeholder="Password"
                className="p-2 border border-gray-300 rounded-md w-full"
                onChange={handleChangeForm}
                required
              />
            </label>

            <button type="submit" className="" disabled={loading}>
              {loading ? "Signing Up..." : "Sign In"}
            </button>
          </form>

          {error && (
            <p className="text-red-500 text-sm text-center">{error.message}</p>
          )}
          {success && (
            <p className="text-green-700 text-sm text-center">
              You are logged in
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
