import { useMeQuery } from "@generated/graphql-types";

export default function Settings() {
  const { data, loading, error } = useMeQuery();
  console.info("Settings query data:", data, error, loading);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data?.me) return <div>User not found or not a company user</div>;

  const user = data?.me.companyUser;
  const account = data?.me;
  const company = user?.company;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-[25px]">Settings</h1>
      <div className="w-full max-w-full mx-auto flex flex-col md:flex-row items-start">
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
          <section aria-labelledby="profile-heading" className="mb-10">
            <h2 id="profile-heading" className="text-xl font-semibold mb-6">
              Profile
            </h2>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 md:ml-6">
              <div>
                <label
                  htmlFor="company"
                  className="block text-base font-medium mb-1"
                >
                  Company name
                </label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  className="w-full rounded border border-theme-gray px-3 py-2 focus:ring-1 focus:ring-theme-light focus:outline-none"
                  value={company?.name || ""}
                  readOnly
                />
              </div>
              <div>
                <label
                  htmlFor="role"
                  className="block text-base font-medium mb-1"
                >
                  Role
                </label>
                <input
                  id="role"
                  name="role"
                  type="text"
                  className="w-full rounded border border-theme-gray px-3 py-2 focus:ring-1 focus:ring-theme-light focus:outline-none"
                  value={account?.role || ""}
                  readOnly
                />
              </div>
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-base font-medium mb-1"
                >
                  First name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  className="w-full rounded border border-theme-gray px-3 py-2 focus:ring-1 focus:ring-theme-light focus:outline-none"
                  value={user?.firstname || ""}
                  readOnly
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-base font-medium mb-1"
                >
                  Last name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  className="w-full rounded border border-theme-gray px-3 py-2 focus:ring-1 focus:ring-theme-light focus:outline-none"
                  value={user?.lastname || ""}
                  readOnly
                />
              </div>
              <div className="md:col-span-2">
                <label
                  htmlFor="email"
                  className="block text-base font-medium mb-1"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="w-full rounded border border-theme-gray px-3 py-2 focus:ring-1 focus:ring-theme-light focus:outline-none"
                  value={account?.email || ""}
                  readOnly
                />
              </div>
            </form>
          </section>

          <section aria-labelledby="notifications-heading" className="mb-12">
            <h2
              id="notifications-heading"
              className="text-xl font-semibold mb-6"
            >
              Notifications
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 md:ml-6">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="accent-emerald-600  w-5 h-5 rounded focus:ring-2 focus:ring-emerald-600"
                  defaultChecked
                />
                <span>Client approves a deliverable</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="accent-emerald-600 w-5 h-5 rounded focus:ring-2 focus:ring-emerald-600"
                  defaultChecked
                />
                <span>Deliverable is sent to client</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="accent-emerald-600 w-5 h-5 rounded focus:ring-2 focus:ring-emerald-600"
                  defaultChecked
                />
                <span>Client adds a comment</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="accent-emerald-600  w-5 h-5 rounded focus:ring-2 focus:ring-emerald-600"
                />
                <span>Client deletes account</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="accent-emerald-600  w-5 h-5 rounded focus:ring-2 focus:ring-emerald-600"
                />
                <span>Client completes sign up</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="accent-emerald-600 w-5 h-5 rounded focus:ring-2 focus:ring-emerald-600"
                />
                <span>Client logs in</span>
              </label>
            </div>
          </section>

          <div className="flex justify-start mb-2">
            <button
              type="button"
              className="w-[208px] h-[40px] bg-red hover:bg-rose-700 text-white rounded-lg py-2 font-medium mb-8"
            >
              Delete account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
