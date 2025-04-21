import SuccessIcon from "@atoms/Icons/Success";

export default function SuccessBanner({ message }: { message: string }) {
  return (
    <div className="flex items-center gap-3  bg-theme-veryLight border border-theme-success p-3 mt-4 rounded-md">
      <SuccessIcon className="w-5 h-5 mr-2 fill-theme-success" />
      <p className="font-medium">{message}</p>
    </div>
  );
}