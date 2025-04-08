import WarningIcon from "../components/Icons/Warning";

export default function ErrorBanner({
  message,
}: {
  message: string;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center gap-3 bg-lightRed p-3 rounded-md border border-red`}
    >
      <WarningIcon className="w-5 h-5 mr-2" color="#d9495b" />
      <p className="font-medium">{message}</p>
    </div>
  );
}
