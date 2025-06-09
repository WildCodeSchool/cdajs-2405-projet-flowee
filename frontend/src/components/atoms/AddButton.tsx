import PlusIcon from "./Icons/PlusIcon";

export const AddButton = ({ onClick }: { onClick: () => void }) => (
  <button
    className="flex items-center justify-center w-6 h-6 border-2 border-theme-darkGray rounded-full"
    type="button"
    onClick={onClick}
  >
    <PlusIcon className="fill-theme-darkGray w-3 h-3" />
  </button>
);
