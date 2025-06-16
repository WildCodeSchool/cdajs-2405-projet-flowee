import { useMeQuery } from "@generated/graphql-types";
import SignedInLayout from "@layout/SignedInLayout";
import SettingsClient from "@organisms/SettingsClient";
import SettingsCompanyUser from "@organisms/SettingsCompanyUser";

export default function Settings() {
  const { data, loading, error } = useMeQuery();
  console.info("data", data);
  if (loading)
    return (
      <SignedInLayout>
        <div>Loading...</div>
      </SignedInLayout>
    );
  if (error)
    return (
      <SignedInLayout>
        <div>Error: {error.message}</div>
      </SignedInLayout>
    );
  if (!data?.me)
    return (
      <SignedInLayout>
        <div>User not found.</div>
      </SignedInLayout>
    );

  return (
    <SignedInLayout>
      {data.me.companyUser && <SettingsCompanyUser />}
      {data.me.client && <SettingsClient />}
      {!data.me.companyUser && !data.me.client && <div>Unknown user type</div>}
    </SignedInLayout>
  );
}
