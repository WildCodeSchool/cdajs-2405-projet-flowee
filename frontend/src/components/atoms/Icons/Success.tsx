interface SuccessIconProps {
  className?: string;
}

const SuccessIcon: React.FC<SuccessIconProps> = ({ className }) => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Success icon"
    >
      <path
        id="success"
        d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM13.78 8.22L9.44 12.56C9.19 12.81 8.84 12.94 8.5 12.94C8.16 12.94 7.81 12.81 7.56 12.56L6.22 11.22C5.73 10.73 5.73 9.91 6.22 9.42C6.71 8.93 7.53 8.93 8.02 9.42L8.5 9.9L11.98 6.42C12.47 5.93 13.29 5.93 13.78 6.42C14.27 6.91 14.27 7.73 13.78 8.22Z"
        fill="fill-current"
      />
    </svg>
  );
};

export default SuccessIcon;
