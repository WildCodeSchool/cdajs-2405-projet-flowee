export const Tag = ({ text }: { text: string }) => {
  return (
    <div className="flex items-center justify-center bg-theme-veryLight rounded-md px-4 py-1 font-medium text-sm  ">
      {text}
    </div>
  );
};
