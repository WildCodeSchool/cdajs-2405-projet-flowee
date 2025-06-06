import { useRoleTheme } from "@context/roleThemeContext";
import { useGetTrackerStatsQuery } from "@generated/graphql-types";

export default function Tracker() {
  const role = useRoleTheme();

  const { data, loading, error } = useGetTrackerStatsQuery();
  if (!role || loading || error || !data) return null;

  const { approvedDeliverables, lateProjects, needReview } =
    data.getTrackerStats ?? {};

  const stats = [
    ...(role === "admin"
      ? [
          {
            count: lateProjects ?? 0,
            label: { full: "Projects are late", short: "Late" },
            color: "text-theme-error",
          },
        ]
      : []),
    {
      count: needReview ?? 0,
      label: { full: "Deliverables need review", short: "Need review" },
      color: "text-theme-warning",
    },
    {
      count: approvedDeliverables ?? 0,
      label: { full: "Deliverables approved", short: "Approved" },
      color: "text-theme-success",
    },
  ];
  return (
    <section className="flex flex-row bg-white p-4 rounded-md md:mt-3 md:rounded-lg items-center justify-around shadow-soft w-full  mx-auto">
      {stats.map((item, index) => (
        <div
          key={item.label.short}
          className="flex flex-row items-center gap-5"
        >
          <article className="flex flex-row gap-3 items-center text-start px-1">
            <span
              className={`${item.color} text-xl sm:text-lg md:text-3xl font-semibold`}
            >
              {item.count}
            </span>
            <span className="text-sm sm:text-sm md:text-base">
              <span className="block sm:hidden">{item.label.short}</span>
              <span className="hidden sm:block">{item.label.full}</span>
            </span>
          </article>

          {index < stats.length - 1 && (
            <div className="h-10 w-px bg-gray-300 mr-2" />
          )}
        </div>
      ))}
    </section>
  );
}
