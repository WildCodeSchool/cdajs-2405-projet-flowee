import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useSetPasswordFromActivationMutation } from "@generated/graphql-types";
import LogoClientIcon from "@components/atoms/Icons/LogoClient";
import { toast } from "react-toastify";

type JWTContent = {
  accountId: string;
  email: string;
  clientName?: string;
  purpose: string;
};

type FormValues = {
  password: string;
  confirmPassword: string;
};

export function SetPasswordPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>();
  const [setPassword] = useSetPasswordFromActivationMutation();
  const navigate = useNavigate();

  const [clientName, setClientName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const token = sessionStorage.getItem("activationJwt");
    if (token) {
      const decoded = jwtDecode<JWTContent>(token);
      if (decoded.purpose !== "activation") {
        toast.error("Token invalide");
        navigate("/activation-error");
        return;
      }
      setClientName(decoded.clientName || "");
      setEmail(decoded.email);
      toast.info("coucou");
    }
  }, [navigate]);

  const onSubmit = async (data: FormValues) => {
    const token = sessionStorage.getItem("activationJwt");
    if (!token) {
      toast.warn("Session expirée ou invalide.");
      return;
    }

    try {
      await setPassword({ variables: { token, password: data.password } });
      sessionStorage.removeItem("activationJwt");
      navigate("/login");
    } catch (err) {
      console.error(err);
      toast.warn("Erreur : mot de passe non défini");
    }
  };

  return (
    <div className="bg-blueBg min-h-screen flex flex-col items-center justify-center">
      <LogoClientIcon className="h-20 w-20" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 space-y-4 max-w-lg mx-auto p-4"
      >
        <h2 className="text-3xl text-center font-bold">
          Please enter you new password
        </h2>

        <div>
          <label className="flex flex-col w-full ">
            Name :
            <input
              value={clientName}
              readOnly
              className="text-left p-2 border border-gray-300 rounded-md w-full"
            />
          </label>
        </div>

        <div>
          <label className="flex flex-col w-full ">
            Email :
            <input
              value={email}
              readOnly
              className="text-left p-2 border border-gray-300 rounded-md w-full"
            />
          </label>
        </div>

        <div>
          <label className="flex flex-col w-full ">
            Password
            <input
              type="password"
              {...register("password", { required: true, minLength: 6 })}
              className="text-left p-2 border border-gray-300 rounded-md w-full"
            />
          </label>
          {errors.password && (
            <p className="text-red-500">Mot de passe trop court</p>
          )}
        </div>

        <div>
          <label>
            Password Confirmation
            <input
              type="password"
              {...register("confirmPassword", {
                required: true,
                validate: (val) =>
                  val === watch("password") ||
                  "Les mots de passe ne correspondent pas",
              })}
              className="text-left p-2 border border-gray-300 rounded-md w-full"
            />
          </label>
          {errors.confirmPassword && (
            <p className="text-red-500">{errors.confirmPassword.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-blueDark w-56 inline-block rounded-lg py-2 px-4 text-white text-base self-center"
        >
          Valider
        </button>
      </form>
    </div>
  );
}
