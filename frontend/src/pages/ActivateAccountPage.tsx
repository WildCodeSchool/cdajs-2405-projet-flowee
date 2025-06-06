import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useActivateAccountAndReturnTokenMutation } from "@generated/graphql-types";

export function ActivateAccountPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [activateAccount, { loading }] =
    useActivateAccountAndReturnTokenMutation();

  useEffect(() => {
    const token = searchParams.get("token");

    const handleActivation = async () => {
      if (!token) {
        navigate("/activation-error?reason=missing", { replace: true }); // avec le replace :true pour éviter de revenir en arrière vers l'ancienne URL
        return;
      }

      try {
        const res = await activateAccount({ variables: { token } });
        const jwtToken = res.data?.activateAccountAndReturnToken;
        if (!jwtToken) {
          navigate("/activation-error?reason=invalid", { replace: true });
          return;
        }

        sessionStorage.setItem("activationJwt", jwtToken);
        window.history.replaceState({}, "", "/set-password");
        navigate("/set-password");
      } catch (err) {
        console.error("Erreur d’activation :", err);
        navigate("/activation-error?reason=invalid", { replace: true });
      }
    };

    handleActivation();
  }, [activateAccount, navigate, searchParams]);

  return (
    <div className="p-4 text-center">
      {loading ? (
        <p>Activation de votre compte en cours...</p>
      ) : (
        <p>Préparation de votre compte...</p>
      )}
    </div>
  );
}
