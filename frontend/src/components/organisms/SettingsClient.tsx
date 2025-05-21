import { Avatar } from "@atoms/Avatar";
import EditBtn from "@atoms/Icons/editBtn";
import {
  useGetProjectsByUserQuery,
  useMeQuery,
} from "@generated/graphql-types";

export default function SettingsClient() {
  const { data, loading, error } = useMeQuery();
  const {
    data: projectsData,
    loading: projectsLoading,
    error: projectsError,
  } = useGetProjectsByUserQuery();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data?.me) return <div>User not found.</div>;

  if (projectsLoading) return <div>Loading...</div>;
  if (projectsError) return <div>Error: {projectsError.message}</div>;

  const client = data.me.client;
  const account = data.me;
  const projects = projectsData?.getProjectsByUser || [];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-[25px]">Settings</h1>
      <main className="w-full max-w-full mx-auto flex flex-col md:flex-row items-start">
        <div className="w-full md:w-auto mb-8 md:mb-0 flex-shrink-0">
          <div
            className="relative inline-block px-3 py-2 bg-theme-veryLight text-black font-semibold
              before:content-[''] before:absolute before:right-0 before:top-0 before:bottom-0 before:w-1 before:bg-theme-light"
            style={{ minWidth: 140 }}
          >
            Account
          </div>
        </div>
        <div className="flex-1 w-full max-w-4xl md:ml-12">
          <div className="flex items-center gap-6 mb-12">
            <Avatar name={`${client?.clientName || ""}`} size="lg" />
            <div>
              <h3 className="text-lg font-semibold">{client?.clientName}</h3>
              <button
                type="button"
                className="mt-1 px-3 py-1 border border-gray bg-theme-lightGray hover:bg-zinc-200 rounded-md text-theme-darkGray text-sm font-medium"
              >
                Upload profile picture
              </button>
            </div>
          </div>
          <section aria-labelledby="profile-heading" className="mb-4">
            <h2 id="profile-heading" className="text-xl font-bold mb-6">
              Profile
            </h2>
            <form className="space-y-6 md:ml-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-base font-semibold mb-1"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={account?.email || ""}
                    readOnly
                    className="w-full rounded border border-theme-gray px-3 py-2 focus:ring-1 focus:ring-theme-light focus:outline-none"
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-base font-semibold mb-1"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      value={"********"}
                      readOnly
                      className="w-full rounded border border-theme-gray px-3 py-2 pr-5 focus:ring-1 focus:ring-theme-light focus:outline-none"
                    />
                    <button
                      type="button"
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-theme-light hover:text-theme-dark font-medium"
                      aria-label="Edit password"
                    >
                      <EditBtn className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </section>
          <section aria-labelledby="project-heading" className="mb-12">
            <h2
              id="project-heading"
              className="md:ml-6 text-base font-semibold "
            >
              Projects
            </h2>
            <div className="md:ml-6 space-y-2">
              {projects.length === 0 && (
                <div className="text-gray-400 text-sm">No project found</div>
              )}
              {projects.map((project) => (
                <button
                  key={project.id}
                  type="button"
                  className="border border-[#D4711D] bg-[#FAF1E7] text-[#3A3631] text-sm font-medium rounded-md px-3 py-1 shadow-none hover:bg-[#f9d9b5] transition-colors mr-2"
                >
                  {project.projectName}
                </button>
              ))}
            </div>
          </section>
          <section aria-labelledby="notifications-heading" className="mb-12">
            <h2 id="notifications-heading" className="text-xl font-bold mb-6">
              Notifications
            </h2>
            <div className="flex flex-col space-y-4 md:ml-6">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-theme-light"
                  defaultChecked
                />
                <span>Deliverable needs approval</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-theme-light"
                  defaultChecked
                />
                <span>Company saw a comment</span>
              </label>
            </div>
          </section>
          <div className="flex justify-start">
            <button
              type="button"
              className="w-[245px] h-[40px] bg-red hover:bg-rose-700 text-white rounded-lg py-2 font-medium mb-10"
            >
              Request account deletion
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
