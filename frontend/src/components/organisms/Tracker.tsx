import { useRoleTheme } from "@context/roleThemeContext";
import {
  type Project,
  useGetProjectsByUserQuery,
  useGetTrackerStatsQuery,
} from "@generated/graphql-types";

import { useNavigate } from "react-router-dom";

export default function Tracker() {
  const role = useRoleTheme();
  const navigate = useNavigate();
  const { data, loading, error } = useGetTrackerStatsQuery();
  const { data: projectsData } = useGetProjectsByUserQuery();

  if (!role || loading || error || !data) return null;

  const today = new Date();
  const lateProjectList: Project[] =
    projectsData?.getProjectsByUser.filter((project) => {
      const endDate = project.endDate ? new Date(project.endDate) : null;
      return (
        endDate !== null && endDate < today && project.status !== "COMPLETED"
      );
    }) ?? [];
  const handleClickLateProjects = () => {
    if (lateProjectList.length === 1) {
      const project = lateProjectList[0];
      navigate(`/projects/${project.projectName?.toLowerCase()}-${project.id}`);
    } else {
      navigate("/projects?filter=late");
    }
  };
  const getLabel = (
    count: number,
    labels: { full: string; singular: string; short: string }
  ) => {
    if (count <= 1) {
      return {
        full: labels.singular,
        short: labels.short.replace(/s\b/, ""),
      };
    }
    return labels;
  };

  const { approvedDeliverables, lateProjects, needReview } =
    data.getTrackerStats ?? {};

  const stats = [
    ...(role === "admin"
      ? [
          {
            count: lateProjects ?? 0,
            label: {
              full: "Projects are late",
              singular: "Project is late",
              short: "Late",
            },
            color: "text-theme-error",
            onClick: handleClickLateProjects,
          },
        ]
      : []),
    {
      count: needReview ?? 0,
      label: {
        full: "Deliverables need review",
        singular: "Deliverable needs review",
        short: "Need review",
      },
      color: "text-theme-warning",
    },
    {
      count: approvedDeliverables ?? 0,
      label: {
        full: "Deliverables approved",
        singular: "Deliverable approved",
        short: "Approved",
      },
      color: "text-theme-success",
    },
  ];
  return (
    <section className="flex flex-row bg-white p-4 rounded-md md:mt-3 md:rounded-lg items-center justify-around shadow-soft w-full  mx-auto">
      {stats.map((item, index) => {
        const labelItem = getLabel(item.count, item.label);
        return (
          <div
            key={labelItem.short}
            className="flex flex-row items-center gap-5"
            onClick={item.onClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                item.onClick?.();
              }
            }}
          >
            <article className="flex flex-row gap-3 items-center text-start px-1">
              <span
                className={`${item.color} text-xl sm:text-lg md:text-3xl font-semibold`}
              >
                {item.count}
              </span>
              <span className="text-sm sm:text-sm md:text-base">
                <span className="block sm:hidden">{labelItem.short}</span>
                <span className="hidden sm:block">{labelItem.full}</span>
              </span>
            </article>

            {index < stats.length - 1 && (
              <div className="h-10 w-px bg-gray-300 mr-2" />
            )}
          </div>
        );
      })}
    </section>
  );
}
