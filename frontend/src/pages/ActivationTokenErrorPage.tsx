import { useSearchParams } from "react-router-dom";

export function ActivationErrorPage() {
  const [searchParams] = useSearchParams();
  const reason = searchParams.get("reason");

  let title = "Activation Error";
  let message = "An error occured while activating the account.";

  if (reason === "missing") {
    title = "Invalid link";
    message = "The activation link in missing. Please check your email.";
  } else if (reason === "invalid") {
    title = "Link is expired or invalid";
    message =
      "This activation link is either expired or already used. Please request a new one.";
  } else if (reason === "expired") {
    title = "Expired Link";
    message = "This activation link has expired. Please request a new one.";
  }

  return (
    <div className="max-w-md mx-auto p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">{title}</h1>
      <p className="text-gray-700">{message}</p>
      <a href="/" className="mt-6 inline-block text-blue-600 underline">
        Back to Home
      </a>
    </div>
  );
}
