interface Props {
  open: boolean;
  header: string;
  itemName: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ModalConfirmDelete({
  open,
  header,
  itemName,
  onConfirm,
  onCancel,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-1/5 flex flex-col gap-4 items-center">
        <aside className="flex items-center gap-3 mb-4 whitespace-pre-line flex-col">
          <h2 className="font-semibold text-lg text-center px-8">{header}</h2>
          <p className="">{itemName}</p>
        </aside>
        <aside className="flex justify-end gap-4">
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
        </aside>
      </div>
    </div>
  );
}
