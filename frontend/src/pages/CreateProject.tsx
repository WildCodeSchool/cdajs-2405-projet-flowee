import Navigation from "../components/Navigation";
import { useForm } from "react-hook-form";
import {
  type CreateProjectInput,
  useCreateProjectMutation,
} from "../__generated__/graphql-types";

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
      <div className="flex-1 p-4 md:ml-4">
        <h1>Welcome to the project creation page</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="">
          <div>
            <label className="">
              Project Name
              <input
                type="text"
                {...register("projectName", {
                  required: "Ce champ est requis.",
                })}
                className="w-full border rounded px-3 py-2"
              />
            </label>
            {errors.projectName && (
              <p className="text-red-500">{errors.projectName.message}</p>
            )}
          </div>

          <div>
            <label className="">
              Client Email
              <input
                type="email"
                {...register("clientEmail", {
                  required: "Ce champ est requis.",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Adresse email invalide.",
                  },
                })}
                className="w-full border rounded px-3 py-2"
              />
            </label>
            {errors.clientEmail && (
              <p className="text-red-500">{errors.clientEmail.message}</p>
            )}
          </div>

          <div>
            <label className="">
              Client Name
              <input
                type="text"
                {...register("clientName", {
                  required: "Ce champ est requis.",
                })}
                className="w-full border rounded px-3 py-2"
              />
            </label>
            {errors.clientName && (
              <p className="text-red-500">{errors.clientName.message}</p>
            )}
          </div>

          <div>
            <label className="">
              End Date
              <input
                type="date"
                {...register("endDate", { required: "Ce champ est requis." })}
                className="w-full border rounded px-3 py-2"
              />
            </label>
            {errors.endDate && (
              <p className="text-red-500">{errors.endDate.message}</p>
            )}
          </div>

          <div>
            <label className="">
              Description
              <textarea
                {...register("description", {
                  required: "Ce champ est requis.",
                })}
                className="w-full border rounded px-3 py-2"
              />
            </label>
            {errors.description && (
              <p className="text-red-500">{errors.description.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded"
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
        </form>
      </div>
    </div>
  );
}
