export default function Tracker() {
  //This compomnent will be used to display the tracker on the dashboard
  // dynamic button with how many projects are late
  //onclick it will will show the projects that are late
  // dynamic button with how many deliverables need review
  //onclick it will show the projects with deliverables that need review
  // dynamic button with how many deliverables are approved
  //onclick it will show the projects with deliverables that are approved

  const stats = [
    {
      count: 5,
      label: { full: "Projects are late", short: "Projects are late" },
      color: "text-red-700",
    },
    {
      count: 3,
      label: { full: "Deliverables need review", short: "Need review" },
      color: "text-orangebase",
    },
    {
      count: 10,
      label: { full: "Deliverables approved", short: "Deliverables approved" },
      color: "text-green-700",
    },
  ];

  return (
    <section className="flex flex-row bg-white p-4 rounded-md md:mt-3 md:rounded-lg font-quicksand items-center justify-around shadow-soft w-full  mx-auto">
      {stats.map((item, index) => (
        <div key={index} className="flex flex-row items-center gap-5">
          {/* Article content so things to keep track of */}
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

          {/* Dividers */}
          {index < stats.length - 1 && (
            <div className="h-10 w-px bg-gray-300 mr-2"></div>
          )}
        </div>
      ))}
    </section>
  );
}
