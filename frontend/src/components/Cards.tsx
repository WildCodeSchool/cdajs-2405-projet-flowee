// import { NavLink } from "react-router-dom";
import { ReactNode } from "react";
import { CardBackground } from "./illustrations/cardBackground";

//Variants
type CompanyVariant = "projects" | "deliverables" | "tasks";
type ClientVariant = "projects" | "deliverables" | "toReview";

export type CardVariant = CompanyVariant | ClientVariant;

// Types of cards
export type CardType = "company" | "client";

// Props for the card component
interface CardProps {
  children: ReactNode;
  variant: CardVariant;
  type: CardType;
}

const backgrounds = {
  company: {
    projects: { bg: "#FAF1E7", stripes: "#E9BB8E" },
    deliverables: { bg: "#FAF1E7", stripes: "#D98D44" },
    tasks: { bg: "#FAF1E7", stripes: "#CE6909" },
  },
  client: {
    projects: { bg: "#EDF0FB", stripes: "#8597D0" },
    deliverables: { bg: "#EDF0FB", stripes: "#4A65BE" },
    toReview: { bg: "#EDF0FB", stripes: "#4A65BE" },
  },
} as const;

export const Card = ({ children, type, variant }: CardProps) => {
  let bg: string;
  let stripes: string;

  switch (type) {
    case "company":
      switch (variant) {
        case "projects":
        case "deliverables":
        case "tasks":
          ({ bg, stripes } = backgrounds.company[variant]);
          break;
        default:
          throw new Error("Invalid company variant");
      }
      break;
    case "client":
      switch (variant) {
        case "projects":
        case "deliverables":
        case "toReview":
          ({ bg, stripes } = backgrounds.client[variant]);
          break;
        default:
          throw new Error("Invalid client variant");
      }
      break;
    default:
      throw new Error("Invalid card type");
  }

  return (
    <div className="relative w-[350px] h-[180px] m-5 rounded-xl">
      {/* Background SVG */}
      <CardBackground
        bg={bg}
        stripes={stripes}
        className="absolute h-[180px] w-[350px] inset-0  z-0"
      />

      <div className="relative z-10 p-5 flex flex-col justify-between h-full font-quicksand">
        {children}
      </div>
    </div>
  );
};
