"use server";

import { getCurrentSession } from "@/lib/cache/current-session";

export const AuthView = async ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const { user } = await getCurrentSession();
  if (user) return <>{children}</>;
};
