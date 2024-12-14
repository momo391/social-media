"use server";

import { getCurrentSession } from "@/lib/cache/current-session";

export const AuthTest = async () => {
  const { user } = await getCurrentSession();
  if (user)
    return (
      <>
        <p className="text-center">user</p>
      </>
    );
  else
    return (
      <>
        <p className="text-center">guest</p>
      </>
    );
};
