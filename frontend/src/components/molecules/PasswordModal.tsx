import EyeIcon from "@atoms/Icons/EyeIcon";
import EyeSlashIcon from "@atoms/Icons/EyeSlashIcon";
import { useUpdatePasswordMutation } from "@generated/graphql-types";
import { useEffect, useState } from "react";

interface PasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface PasswordCriteria {
  hasMinLength: boolean;
  hasUpperCase: boolean;
  hasLowerCase: boolean;
  hasNumber: boolean;
  hasSpecialChar: boolean;
}

const getStrengthColor = (criteria: PasswordCriteria): string => {
  const metCriteria = Object.values(criteria).filter(Boolean).length;
  const totalCriteria = Object.keys(criteria).length;
  const percentage = (metCriteria / totalCriteria) * 100;

  if (percentage === 100) return "text-green border-green-600";
  if (percentage >= 60) return "text-yellow-600 border-yellow-600";
  if (percentage >= 20) return "text-orange-600 border-orange-600";
  return "text-red-600 border-red-600";
};

export default function PasswordModal({ isOpen, onClose }: PasswordModalProps) {
  const [updatePassword] = useUpdatePasswordMutation();
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [passwordCriteria, setPasswordCriteria] = useState<PasswordCriteria>({
    hasMinLength: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialChar: false,
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  useEffect(() => {
    if (isOpen) {
      setError("");
      setSuccess(false);
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (formData.newPassword !== formData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    try {
      const result = await updatePassword({
        variables: {
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        },
      });

      if (result.data?.updatePassword) {
        setSuccess(true);
        setTimeout(() => {
          onClose();
          setFormData({
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
          });
        }, 1500);
      }
    } catch (err: unknown) {
      console.error("Complete error:", err);
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setFormData({ ...formData, newPassword: newPassword });

    const criteria = {
      hasMinLength: newPassword.length >= 8,
      hasUpperCase: /[A-Z]/.test(newPassword),
      hasLowerCase: /[a-z]/.test(newPassword),
      hasNumber: /[0-9]/.test(newPassword),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword),
    };
    setPasswordCriteria(criteria);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Change Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="currentPassword"
              className="block text-sm font-medium mb-1"
            >
              Current Password
            </label>
            <div className="relative">
              <input
                type={showPasswords.current ? "text" : "password"}
                id="currentPassword"
                value={formData.currentPassword}
                onChange={(e) =>
                  setFormData({ ...formData, currentPassword: e.target.value })
                }
                className="w-full rounded border border-theme-gray px-3 py-2 focus:ring-1 focus:ring-theme-light focus:outline-none"
                required
              />
              <button
                type="button"
                onClick={() =>
                  setShowPasswords((prev) => ({
                    ...prev,
                    current: !prev.current,
                  }))
                }
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPasswords.current ? <EyeSlashIcon /> : <EyeIcon />}
              </button>
            </div>
          </div>
          <div>
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium mb-1"
            >
              New Password
            </label>
            <div className="relative">
              <input
                type={showPasswords.new ? "text" : "password"}
                id="newPassword"
                value={formData.newPassword}
                onChange={handlePasswordChange}
                className={`w-full rounded border px-3 py-2 focus:ring-1 focus:outline-none transition-colors duration-300 ${
                  formData.newPassword
                    ? getStrengthColor(passwordCriteria)
                    : "border-theme-gray focus:ring-theme-light"
                }`}
                required
              />
              <button
                type="button"
                onClick={() =>
                  setShowPasswords((prev) => ({ ...prev, new: !prev.new }))
                }
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPasswords.new ? <EyeSlashIcon /> : <EyeIcon />}
              </button>
            </div>
            <div className="mt-2">
              {formData.newPassword && (
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden mb-1">
                  <div
                    className={`h-full transition-all duration-300 ${getStrengthColor(
                      passwordCriteria,
                    )}`}
                    style={{
                      width: `${(Object.values(passwordCriteria).filter(Boolean).length / 5) * 100}%`,
                    }}
                  />
                </div>
              )}
              <p
                className={`text-xs transition-colors duration-300 ${
                  formData.newPassword
                    ? getStrengthColor(passwordCriteria)
                    : "text-gray-600"
                }`}
              >
                Password must be at least 8 characters with uppercase,
                lowercase, number and special character
              </p>
            </div>
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium mb-1"
            >
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type={showPasswords.confirm ? "text" : "password"}
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                className="w-full rounded border border-theme-gray px-3 py-2 focus:ring-1 focus:ring-theme-light focus:outline-none"
                required
              />
              <button
                type="button"
                onClick={() =>
                  setShowPasswords((prev) => ({
                    ...prev,
                    confirm: !prev.confirm,
                  }))
                }
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPasswords.confirm ? <EyeSlashIcon /> : <EyeIcon />}
              </button>
            </div>
          </div>
          {error && <p className="text-red text-sm">{error}</p>}
          {success && (
            <p className="text-green text-sm">Password successfully updated!</p>
          )}
          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 rounded-lg font-medium text-sm transition-all border border-theme-gray hover:bg-theme-lightGray"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-lg font-medium text-sm transition-all bg-theme-base text-white hover:bg-blueDark"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
