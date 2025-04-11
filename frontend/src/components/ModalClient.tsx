import type { ClientStatus } from "../__generated__/graphql-types";

interface ModalClientProps {
  id: number;
  name: string;
  email: string;
  status: ClientStatus;
  onClose: () => void;
}

export default function ModalClient({
  id,
  name,
  email,
  status,
  onClose,
}: ModalClientProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-end bg-black bg-opacity-20 backdrop-blur-sm"
    >
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
      />

      <div className="relative z-50 bg-white p-6 rounded-l-md w-[400px] max-w-full">
        <h2 className="text-xl font-bold mb-4">Edit Client</h2>
        <p className="hidden">ID: {id}</p>
        <p>
          <strong>Name:</strong> {name}
        </p>
        <p>
          <strong>Email:</strong> {email}
        </p>
        <p>
          <strong>Status:</strong> {status}
        </p>
        <button
          type="button"
          onClick={onClose}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
}
