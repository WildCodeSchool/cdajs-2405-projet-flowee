import { ReactNode } from "react";
import { CardBackground } from "./illustrations/cardBackground";
import { useAuth } from "../context/authContext";

type CompanyVariant = "projects" | "deliverables" | "tasks";
type ClientVariant = "projects" | "deliverables" | "toReview";

export type CardVariant = CompanyVariant | ClientVariant;
export type CardType = "company" | "client";

interface CardProps {
  children?: ReactNode;
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

function isCompanyVariant(variant: CardVariant): variant is CompanyVariant {
  return ["projects", "deliverables", "tasks"].includes(variant);
}

function isClientVariant(variant: CardVariant): variant is ClientVariant {
  return ["projects", "deliverables", "toReview"].includes(variant);
}

export const Card = ({ children, variant }: CardProps) => {
  const { authUserData } = useAuth();
  const role = authUserData.role === "CLIENT" ? "client" : "company";

  let bg = "#fff";
  let stripes = "#ccc";

  if (role === "company" && isCompanyVariant(variant)) {
    ({ bg, stripes } = backgrounds.company[variant]);
  } else if (role === "client" && isClientVariant(variant)) {
    ({ bg, stripes } = backgrounds.client[variant]);
  } else {
    throw new Error("Invalid role/variant combination");
  }

  return (
    <div className="relative h-[180px] w-full min-w-[250px] max-w-[350px] md:h-[160px] rounded-lg overflow-hidden">
      <CardBackground
        bg={bg}
        stripes={stripes}
        className="absolute h-full w-full inset-0 z-0"
      />
      <div className="relative z-10 p-5 flex flex-col justify-between h-full font-quicksand">
        <div className="text-3xl font-bold">{children}</div>
        <div className="text-base capitalize">{variant}</div>
        {children}
      </div>
    </div>
  );
};
