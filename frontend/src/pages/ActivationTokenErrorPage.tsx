import { useSearchParams } from "react-router-dom";

export function ActivationErrorPage() {
  const [searchParams] = useSearchParams();
  const reason = searchParams.get("reason");

  let title = "Erreur d’activation";
  let message = "Une erreur est survenue lors de l’activation de votre compte.";

  if (reason === "missing") {
    title = "Lien invalide";
    message =
      "Le lien d’activation est manquant. Veuillez vérifier votre email.";
  } else if (reason === "invalid") {
    title = "Lien expiré ou invalide";
    message = "Ce lien d’activation est incorrect ou a déjà été utilisé.";
  } else if (reason === "expired") {
    title = "Lien expiré";
    message =
      "Ce lien n’est plus valide. Demandez à votre interlocuteur de le renvoyer.";
  }

  return (
    <div className="max-w-md mx-auto p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">{title}</h1>
      <p className="text-gray-700">{message}</p>
      <a href="/" className="mt-6 inline-block text-blue-600 underline">
        Retour à l’accueil
      </a>
    </div>
  );
}
