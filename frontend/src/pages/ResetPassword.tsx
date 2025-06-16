import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useResetPasswordMutation } from "@generated/graphql-types";
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
      toast.error("An error occurred while resetting your password.");
      setError("An error occurred. Try again.");
    }
  };
  return (
    <div className="reset-container">
      <h2>Reset your password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="New password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Sending..." : "Reset password"}
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
