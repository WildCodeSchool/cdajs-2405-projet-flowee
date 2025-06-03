import Navigation from "@organisms/Navigation";
import { useForm } from "react-hook-form";
import {
  type CreateProjectInput,
  useCreateProjectMutation,
} from "@generated/graphql-types";
import { Input } from "@atoms/Input";
import { Textarea } from "@atoms/TextArea";
import { NavLink } from "react-router-dom";
import ArrowIcon from "@components/atoms/Icons/Arrow";

export default function CreateProject() {
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
      });
      alert("Projet créé avec succès !");
      reset();
    } catch (e) {
      console.error("Erreur lors de la création du projet :", e);
    }
  };
  return (
    <div className="flex flex-col md:flex-row">
      <div className="md:w-20 md:flex-shrink-0">
        <Navigation />
      </div>
      <div className="flex-1 lg:flex lg:flex-col gap-4 p-4 md:ml-4 pt-4 ">
        <NavLink to="/projects" className="">
          Back to projects <ArrowIcon />
        </NavLink>
        <h1 className="text-2xl font-bold mb-4">New project</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <Input
              label="Project Name"
              type="text"
              {...register("projectName", {
                required: "Ce champ est requis.",
              })}
            />
            {errors.projectName && (
              <p className="text-red-500">{errors.projectName.message}</p>
            )}

            <Input
              label=" Client Email"
              type="email"
              {...register("clientEmail", {
                required: "Ce champ est requis.",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Adresse email invalide.",
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
                required: "Ce champ est requis.",
              })}
            />

            {errors.clientName && (
              <p className="text-red-500">{errors.clientName.message}</p>
            )}

            <Input
              label="End Date"
              type="date"
              {...register("endDate", { required: "Ce champ est requis." })}
            />

            {errors.endDate && (
              <p className="text-red-500">{errors.endDate.message}</p>
            )}

            <Textarea
              label="Description"
              {...register("description", { required: "Ce champ est requis." })}
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
              {loading ? "Création en cours..." : "Créer le projet"}
            </button>
            {error && (
              <p className="text-red-500 mt-2">Erreur : {error.message}</p>
            )}
            {data && (
              <div className="text-green-600 mt-2">
                Projet créé : {data.createProject.projectName}
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
