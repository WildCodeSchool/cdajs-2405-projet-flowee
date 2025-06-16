import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useInitAdminMutation } from "@generated/graphql-types";
import { toast } from "react-toastify";

type InitForm = {
  secret: string;
  companyName: string;
  companyAddress: string;
  contactInfo: string;
  email: string;
  password: string;
  firstname: string;
  lastname: string;
};

export default function InitPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InitForm>();

  const [initAdmin, { loading }] = useInitAdminMutation();

  const onSubmit = async (data: InitForm) => {
    try {
      await initAdmin({ variables: { data } });
      toast.success("Admin initialized successfully");
      navigate("/login");
    } catch (err) {
      toast.error("Unable to perform this operation");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 shadow-md rounded-md w-full max-w-lg space-y-4"
      >
        <h1 className="text-3xl font-bold text-center mb-4">
          Welcome to our Flowee App
        </h1>

        <fieldset className="space-y-2">
          <legend className="font-semibold">Company</legend>
          <input
            {...register("companyName", { required: true })}
            placeholder="Company Name"
            className="w-full border p-2 rounded"
          />
          {errors.companyName && (
            <span className="text-red-500 text-sm">Required</span>
          )}

          <input
            {...register("companyAddress", { required: true })}
            placeholder="Company Address"
            className="w-full border p-2 rounded"
          />
          {errors.companyAddress && (
            <span className="text-red-500 text-sm">Required</span>
          )}

          <input
            {...register("contactInfo", { required: true })}
            placeholder="Contact Info"
            className="w-full border p-2 rounded"
          />
          {errors.contactInfo && (
            <span className="text-red-500 text-sm">Required</span>
          )}
        </fieldset>

        <fieldset className="space-y-2">
          <legend className="font-semibold">Admin User</legend>
          <input
            {...register("firstname", { required: true })}
            placeholder="Firstname"
            className="w-full border p-2 rounded"
          />
          {errors.firstname && (
            <span className="text-red-500 text-sm">Required</span>
          )}

          <input
            {...register("lastname", { required: true })}
            placeholder="Lastname"
            className="w-full border p-2 rounded"
          />
          {errors.lastname && (
            <span className="text-red-500 text-sm">Required</span>
          )}

          <input
            {...register("email", { required: true })}
            type="email"
            placeholder="Email"
            className="w-full border p-2 rounded"
          />
          {errors.email && (
            <span className="text-red-500 text-sm">Required</span>
          )}

          <input
            {...register("password", { required: true })}
            type="password"
            placeholder="Password"
            className="w-full border p-2 rounded"
          />
          {errors.password && (
            <span className="text-red-500 text-sm">Required</span>
          )}
        </fieldset>

        <input
          {...register("secret", { required: true })}
          type="password"
          placeholder="Secret Key"
          className="w-full border p-2 rounded"
        />
        {errors.secret && (
          <span className="text-red-500 text-sm">Required</span>
        )}

        <button
          type="submit"
          // disabled={loading}
          className="w-full bg-theme-base text-white py-2 rounded hover:bg-gray-800 "
        >
          {loading ? "Creating..." : "Initialize Admin"} Initialize Admin
        </button>
      </form>
    </div>
  );
}
