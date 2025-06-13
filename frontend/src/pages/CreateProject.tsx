import Navigation from "@organisms/Navigation";
import { useForm } from "react-hook-form";
import {
  type CreateProjectInput,
  useCreateProjectMutation,
} from "@generated/graphql-types";
import { Input } from "@atoms/Input";
import { Textarea } from "@atoms/TextArea";

import ArrowIcon from "@components/atoms/Icons/Arrow";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import RoleToast from "@components/organisms/RoleToast";
import { useAuth } from "@context/authContext";
import "react-toastify/dist/ReactToastify.css";

export default function CreateProject() {
  const { authUserData } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateProjectInput>();

  const [createProject, { data, loading, error }] = useCreateProjectMutation();

  const onSubmit = async (formData: CreateProjectInput) => {
    try {
      await createProject({
        variables: {
          newProject: {
            ...formData,
          },
        },
        refetchQueries: ["GetProjectsByUser"],
        awaitRefetchQueries: true,
      });

      toast(
        <RoleToast
          message="Project created successfully!"
          role={authUserData.role}
        />,
        {
          progressClassName: "bg-theme-progress-base",
        }
      );
      reset();
      navigate("/dashboard");
    } catch (e) {
      console.error("Error while creating the project :", e);
    }
  };
  return (
    <div className="flex flex-col md:flex-row">
      <div className="md:w-20 md:flex-shrink-0">
        <Navigation />
      </div>
      <div className="flex-1 lg:flex lg:flex-col gap-4 p-4 md:ml-4 pt-4 ">
        <NavLink to="/projects" className="flex gap-4 items-center">
          <ArrowIcon className="text-black rotate-180" />
          <p className="underline">Back to projects</p>{" "}
        </NavLink>
        <h1 className="text-2xl font-bold mb-4">New project</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <Input
              label="Project Name"
              type="text"
              {...register("projectName", {
                required: "This field is required.",
              })}
            />
            {errors.projectName && (
              <p className="text-red-500">{errors.projectName.message}</p>
            )}

            <Input
              label=" Client Email"
              type="email"
              {...register("clientEmail", {
                required: "This field is required.",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address.",
                },
              })}
            />

            {errors.clientEmail && (
              <p className="text-red-500">{errors.clientEmail.message}</p>
            )}

            <Input
              label="Client Name"
              type="text"
              {...register("clientName", {
                required: "This field is required.",
              })}
            />

            {errors.clientName && (
              <p className="text-red-500">{errors.clientName.message}</p>
            )}

            <Input
              label="End Date"
              type="date"
              {...register("endDate", { required: "This field is required." })}
            />

            {errors.endDate && (
              <p className="text-red-500">{errors.endDate.message}</p>
            )}

            <Textarea
              label="Description"
              {...register("description", {
                required: "This field is required.",
              })}
            />

            {errors.description && (
              <p className="text-red-500">{errors.description.message}</p>
            )}
          </div>
          <div>
            <button
              type="submit"
              disabled={loading}
              className="bg-theme-base text-white px-4 py-2 rounded"
            >
              {loading ? "Creating the project ..." : "Create Project"}
            </button>
            {error && (
              <p className="text-red-500 mt-2">Error : {error.message}</p>
            )}
            {data && (
              <div className="text-green-600 mt-2">
                Project created successfully: {data.createProject.projectName}
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
