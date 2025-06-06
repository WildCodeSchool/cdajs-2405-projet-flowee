interface CardBackgroundProps {
  className?: string;
  variant: Variant;
  title?: string;
}

const variantToStripesClass = {
  projects: "fill-theme-projectStripes",
  deliverables: "fill-theme-deliverableStripes",
  tasks: "fill-theme-taskStripes",
  toReview: "fill-theme-taskStripes",
} as const;

type Variant = keyof typeof variantToStripesClass;

export const CardBackground: React.FC<CardBackgroundProps> = ({
  className,
  variant,
  title = "Card background",
}) => {
  const stripesClass = variantToStripesClass[variant];
  return (
    <svg
      preserveAspectRatio="none"
      width="100%"
      height="100%"
      viewBox="0 0 262 156"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label={title}
    >
      <g id="bg">
        <path
          d="M0 5.08009C0 2.31867 2.23858 0.0800781 5 0.0800781H256.749C259.511 0.0800781 261.749 2.31865 261.749 5.08008V150.424C261.749 153.185 259.511 155.424 256.749 155.424H5.00001C2.23858 155.424 0 153.185 0 150.424V5.08009Z"
          className="fill-[var(--cardBg)]"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M261.748 64.3026L242.429 64.4424C232.227 64.5163 224.111 56 224.042 39.4323L224.111 31.2066C224.115 30.6849 224.111 29.7669 224.111 29.6445C224.111 29.5221 224.111 29.4805 224.111 29.4805C224.111 29.4805 224.136 28.0357 224.142 27.3937L224.37 0H197.34L197.105 28.2313C197.1 28.753 197.105 29.8551 197.105 29.8551C197.105 29.8551 197.084 30.8806 197.079 31.4022L197.011 39.628C197.079 71.5 217.081 89.8233 242.219 89.6413L261.748 89.5V64.3026Z"
          className={stripesClass}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0 89.5195L7.56982 89.4647C17.7712 89.3909 37.5824 89.6413 37.5387 115.811L37.5824 124V125.5V126L37.5646 127.877V155.424H64.3605L64.4762 127.012C64.4806 126.49 64.4762 125.5 64.4762 125.5C64.4762 125.5 64.4974 124.363 64.5017 123.841L64.5703 115.615C64.3605 72.6139 32.9173 64.0839 7.77971 64.2658L0 64.3221V89.5195Z"
          className={stripesClass}
        />
      </g>
    </svg>
  );
};
