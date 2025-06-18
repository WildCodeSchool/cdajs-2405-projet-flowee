import { Input } from "@components/atoms/Input";
import { useInitAdminMutation } from "@generated/graphql-types";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface SignUpFormData {
  secret: string;
  companyName: string;
  companyAddress: string;
  contactInfo: string;
  email: string;
  password: string;
  firstname: string;
  lastname: string;
}

export default function SignUpForm() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<SignUpFormData>();

  const [initAdmin, { loading }] = useInitAdminMutation();
  const onSubmit = async (data: SignUpFormData) => {
    try {
      await initAdmin({ variables: { data } });
      toast.success("Admin initialized successfully");
      navigate("/login");
    } catch (err) {
      toast.error("Unable to perform this operation");
      console.error(err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 w-full"
    >
      <fieldset>
        <legend className="font-semibold mb-2">Company informations</legend>
        <Input
          label="Company"
          type="text"
          {...register("companyName", { required: true })}
          required
        />

        <Input
          label="Address"
          type="text"
          {...register("companyAddress", { required: true })}
          required
        />

        <Input
          label="Contact Info"
          type="text"
          {...register("contactInfo", { required: true })}
        />
      </fieldset>

      <fieldset>
        <legend className="font-semibold mb-2">Admin User</legend>

        <Input
          label="First name"
          type="text"
          {...register("firstname", { required: true })}
          required
        />

        <Input
          label="Last name"
          type="text"
          {...register("lastname", { required: true })}
          required
        />
        <Input
          label="Email"
          type="email"
          {...register("email", { required: true })}
          required
        />

        <Input
          label="Password"
          type="password"
          {...register("password", { required: true })}
          required
        />
      </fieldset>
      <Input
        label="Secret key"
        type="password"
        {...register("secret", { required: true })}
        required
      />

      <button
        type="submit"
        className="bg-theme-visitorBtnBG flex gap-3 items-center justify-center rounded-lg px-12 py-2   text-white text-base  md:w-48 text-center"
      >
        {loading ? "Creating..." : "Sign up"}
      </button>
      <p className=" text-center md:text-start  w-full text-sm ">
        You already have an account?{" "}
        <NavLink className="underline font-medium" to="/login">
          Sign in
        </NavLink>
      </p>
    </form>
  );
}
