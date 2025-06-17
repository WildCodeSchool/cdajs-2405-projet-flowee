import LogoIcon from "@components/atoms/Icons/Logo";
import LogoMarkIcon from "@components/atoms/Icons/LogoMark";
import { Input } from "@components/atoms/Input";
import AuthIllustration from "@components/atoms/illustrations/AuthIllus";
import { useResetPasswordMutation } from "@generated/graphql-types";
import { useState } from "react";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [resetPassword, { loading }] = useResetPasswordMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      navigate("/activation-error?reason=missing", { replace: true });
      return;
    }

    try {
      const res = await resetPassword({ variables: { token, newPassword } });

      const success = res.data?.resetPassword;

      if (!success) {
        navigate("/activation-error?reason=invalid", { replace: true });
        return;
      }
      toast.success("Password reset successfully! You can now log in.");
      navigate("/login");
    } catch (err) {
      console.error("Reset error:", err);
      console.error(error);
      toast.error("An error occurred while resetting your password.");
      setError("An error occurred. Try again.");
    }
  };
  return (
    <div className="flex flex-row w-full sm:h-screen">
      <aside className=" hidden sm:block sm:bg-orangeLight sm:w-[55%] sm:p-10">
        <NavLink to="/">
          <LogoIcon className=" w-40" />
        </NavLink>
        <AuthIllustration className="w-[80%] mx-auto" />
      </aside>
      <section className=" flex flex-auto flex-col bg-white gap-2  sm:justify-center sm:px-8 lg:px-28 justify-end">
        <div className="flex flex-col gap-3 text-center">
          <aside className="flex flex-col sm:flex-row items-center gap-2 pt-6">
            <LogoMarkIcon className=" w-12 sm:w-8 " />
            <h1 className=" text-2xl sm:text-3xl font-bold ">
              Reset your password
            </h1>
          </aside>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 p-8 w-full max-w-md mx-auto mt-10"
          >
            <Input
              label="New Password"
              type="password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center bg-theme-visitorBtnBG rounded-lg px-12 py-2 text-white text-base w-full"
            >
              {loading ? "Sending..." : "Reset password"}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
