// pages/ActivateAccountPage.tsx
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useActivateAccountMutation } from "@generated/graphql-types";

export function ActivateAccountPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [activateAccount] = useActivateAccountMutation();

  useEffect(() => {
    const token = searchParams.get("token");

    console.info(token);

    if (!token) {
      navigate("/activation-error?reason=missing", { replace: true });
      return;
    }

    activateAccount({ variables: { token } })
      .then((res) => {
        if (res.errors || res.data?.activateAccount !== true) {
          throw new Error("Échec de l'activation");
        }
        navigate("/activation-success", { replace: true });
      })
      .catch(() => {
        navigate("/activation-error?reason=invalid", { replace: true });
      });
  }, [activateAccount, navigate, searchParams]);

  return <p>Activation de votre compte en cours...</p>;
}
