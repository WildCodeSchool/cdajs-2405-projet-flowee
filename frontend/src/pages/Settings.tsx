import SignedInLayout from "@layout/SignedInLayout";
import { useMeQuery } from "@generated/graphql-types";
import SettingsCompanyUser from "@organisms/SettingsCompanyUser";
import SettingsClient from "@organisms/SettingsClient";
import { useAuth } from "@context/authContext";

export default function Settings() {
  const { data, loading, error } = useMeQuery();

  const { authUserData } = useAuth();
  console.info("Auth user data in Settings:", authUserData);

  console.info("data", data);

  return (
    <SignedInLayout>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      {!loading && !error && !data?.me && <div>User not found.</div>}
      {!loading && !error && authUserData.role === "ADMIN"
        ? data?.me?.companyUser && <SettingsCompanyUser />
        : data?.me?.client && <SettingsClient />}

      {/* Optionnel : fallback si aucun type reconnu */}
      {!loading &&
        !error &&
        data?.me &&
        !data.me.companyUser &&
        !data.me.client && <div>Unknown user type</div>}
    </SignedInLayout>
  );
}
