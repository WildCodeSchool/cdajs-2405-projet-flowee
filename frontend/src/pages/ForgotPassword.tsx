import { Input } from "@atoms/Input";
import { useRequestPasswordResetMutation } from "@generated/graphql-types";
import ErrorBanner from "@molecules/ErrorBanner";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface FormData {
  email: string;
}

export default function ForgotPassword() {
  const [success, setSuccess] = useState(false);
  const [requestPasswordReset, { loading, error }] =
    useRequestPasswordResetMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    await requestPasswordReset({ variables: { email: data.email } });
    setSuccess(true);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 w-full max-w-md mx-auto mt-10"
    >
      <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>

      {success ? (
        <p className="text-green-600">
          An email has been sent with reset instructions.
        </p>
      ) : (
        <>
          <Input
            label="Email"
            type="email"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <p className="text-red text-sm">{errors.email.message}</p>
          )}
          {error && <ErrorBanner message="Something went wrong." />}

          <button
            type="submit"
            disabled={loading}
            className="bg-theme-base text-white px-4 py-2 rounded"
          >
            {loading ? "Sending..." : "Send reset link"}
          </button>
        </>
      )}
    </form>
  );
}
