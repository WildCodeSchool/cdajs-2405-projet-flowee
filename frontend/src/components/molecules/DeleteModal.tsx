type DeleteModalProps = {
  open: boolean;
  entityType: "task" | "deliverable";
  itemName: string;
  onCancel: () => void;
  onConfirm: () => void;
  onClose?: () => void;
};

export default function DeleteModal({
  open,
  entityType,
  itemName,
  onCancel,

  onConfirm,
}: DeleteModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-[90%] max-w-md flex flex-col gap-4 items-center">
        <aside className="text-center">
          <h2 className="font-semibold text-lg">
            Are you sure you want to delete this {entityType}?
          </h2>
          <p className="mt-2 font-medium">{itemName}</p>
        </aside>
        <div className="flex gap-4 mt-6">
          <button
            type="button"
            className="px-4 py-2 bg-theme-lightGray text-gray-800 rounded-lg border border-theme-gray"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            type="button"
            className="px-4 py-2 bg-red text-white rounded-lg"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
