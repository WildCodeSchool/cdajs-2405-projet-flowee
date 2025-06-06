import SignedInLayout from "@layout/SignedInLayout";
import { useMeQuery } from "@generated/graphql-types";
import SettingsCompanyUser from "@organisms/SettingsCompanyUser";
import SettingsClient from "@organisms/SettingsClient";

export default function Settings() {
  const { data, loading, error } = useMeQuery();

  return (
    <SignedInLayout>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      {!loading && !error && !data?.me && <div>User not found.</div>}
      {!loading && !error && data?.me?.companyUser && <SettingsCompanyUser />}
      {!loading && !error && data?.me?.client && <SettingsClient />}
      {/* Optionnel : fallback si aucun type reconnu */}
      {!loading &&
        !error &&
        data?.me &&
        !data.me.companyUser &&
        !data.me.client && <div>Unknown user type</div>}
    </SignedInLayout>
  );
}
