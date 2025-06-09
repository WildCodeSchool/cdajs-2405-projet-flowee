import { Input } from "@atoms/Input";
import {
  ClientStatus,
  useUpdateClientMutation,
} from "@generated/graphql-types";
import SuccessBanner from "@molecules/SuccesBanner";
import { useState } from "react";
import ErrorBanner from "./molecules/ErrorBanner";
import { capitalize } from "@utils/stringUtils";

interface ModalClientProps {
  id: number;
  currentName?: string | null;
  currentEmail: string;
  currentStatus?: ClientStatus | null;
  currentProjects?: string[];
  onClose: () => void;
}

export default function ModalClient({
  id,
  currentName,
  currentEmail,
  currentStatus,
  currentProjects = [],
  onClose,
}: ModalClientProps) {
  const [name, setName] = useState(currentName ?? "");
  const [email, setEmail] = useState(currentEmail || "");
  const [status, setStatus] = useState<ClientStatus>(
    currentStatus || ClientStatus.Active,
  );

  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [updateClient, { loading }] = useUpdateClientMutation({
    onCompleted: () => {
      setSuccessMessage("Client updated successfully.");
      setTimeout(() => {
        onClose();
      }, 1500);
    },
    onError: (error) => {
      console.error("Update failed:", error);
      setErrorMessage("Update failed. Please try again.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    updateClient({
      variables: {
        id: id,
        newName: name,
        newEmail: email,
        newStatus: status.toString(),
      },
    });
  };
  //TODO: les commentaires sont hardcodés et seront remplacés par une query dès que la fonctionnalité sera implémentée
  const hardcodedComments = [
    { text: "I have a lot to say.." },
    { text: "This isn't a perfect world" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black bg-opacity-20 backdrop-blur-sm">
      <div
        className="absolute inset-0"
        onClick={onClose}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            onClose();
          }
        }}
        tabIndex={0}
        role="button"
        aria-label="Close modal"
      />

      <div className="relative z-50 bg-white p-6 rounded-l-md w-[400px] max-w-full h-full">
        <h2 className="text-xl font-medium mb-6">Edit Client</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Name"
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name"
          />

          <Input
            label="Email"
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
          />

          <div>
            <label htmlFor="projects" className="block text-base mb-1">
              Projects
            </label>
            <div className="w-full py-2 px-4 bg-lightgray rounded-md focus:bg-white focus:outline-blue focus:invalid:border-red focus:invalid:outline-red">
              {currentProjects && currentProjects.length > 0 ? (
                currentProjects.map((project, index) => (
                  <div
                    // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                    key={index}
                    className="bg-orange-100 text-orange-800 rounded px-3 py-1 inline-block mr-2 mb-2"
                  >
                    {project}
                  </div>
                ))
              ) : (
                <span className="text-gray-500 italic">
                  No projects assigned
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value as ClientStatus)}
              className="w-full py-2 px-4 bg-lightgray rounded-md focus:bg-white focus:outline-blue"
            >
              {Object.values(ClientStatus).map((statusOption) => (
                <option key={statusOption} value={statusOption}>
                  {capitalize(statusOption)}
                </option>
              ))}
            </select>
          </div>
          <div>
            <h3 className="text-base mb-3">Comments</h3>
            <div className="space-y-4">
              {hardcodedComments.map((comment, index) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                <div key={index} className="flex items-start">
                  <div className=" flex-shrink-0 w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-3 text-orange-500 text-sm">
                    CD
                  </div>
                  <p className="mt-[6px] text-sm text-gray-700">
                    {comment.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="h-12 mt-2">
            {successMessage && <SuccessBanner message={successMessage} />}
            {errorMessage && <ErrorBanner message={errorMessage} />}
          </div>

          <div className="pt-0">
            <button
              type="submit"
              disabled={loading}
              className="w-[208px] h-[40px] bg-theme-veryDark hover:bg-orange-700 text-white rounded-lg py-2 font-medium"
            >
              {loading ? "Saving changes..." : "Save changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
