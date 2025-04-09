export default function SelectIcon({ className }: { className?: string }) {
  return (
        // biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
    <svg
      width="8"
      height="5"
      viewBox="0 0 8 5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M4.00033 4.26204L0.666992 0.928711H7.33366L4.00033 4.26204Z"
        fill="fill-current"
      />
    </svg>
  );
}
