import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useSetPasswordFromActivationMutation } from "@generated/graphql-types";

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
        alert("Token invalide");
        navigate("/activation-error");
        return;
      }
      setClientName(decoded.clientName || "");
      setEmail(decoded.email);
    }
  }, [navigate]);

  const onSubmit = async (data: FormValues) => {
    const token = sessionStorage.getItem("activationJwt");
    if (!token) {
      alert("Session expirée ou invalide.");
      return;
    }

    try {
      await setPassword({ variables: { token, password: data.password } });
      sessionStorage.removeItem("activationJwt");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Erreur : mot de passe non défini");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 max-w-md mx-auto p-4"
    >
      <h2 className="text-xl font-bold">Définir ton mot de passe</h2>

      <div>
        <label>
          Nom
          <input value={clientName} readOnly className="input bg-gray-100" />
        </label>
      </div>

      <div>
        <label>
          Email
          <input value={email} readOnly className="input bg-gray-100" />
        </label>
      </div>

      <div>
        <label>
          Mot de passe
          <input
            type="password"
            {...register("password", { required: true, minLength: 6 })}
            className="input"
          />
        </label>
        {errors.password && (
          <p className="text-red-500">Mot de passe trop court</p>
        )}
      </div>

      <div>
        <label>
          Confirmation
          <input
            type="password"
            {...register("confirmPassword", {
              required: true,
              validate: (val) =>
                val === watch("password") ||
                "Les mots de passe ne correspondent pas",
            })}
            className="input"
          />
        </label>
        {errors.confirmPassword && (
          <p className="text-red-500">{errors.confirmPassword.message}</p>
        )}
      </div>

      <button type="submit" className="btn w-full">
        Valider
      </button>
    </form>
  );
}
