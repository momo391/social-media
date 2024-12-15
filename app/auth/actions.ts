"use server";

import { getCurrentSession } from "@/lib/cache/current-session";
import { delelteSessionTokenCookie } from "@/lib/server/cookies";
import { invalidateSessionToken } from "@/lib/server/session";

export const logout = async () => {
  const { session } = await getCurrentSession();
  if (session) {
    invalidateSessionToken(session.id);
    delelteSessionTokenCookie();
  }
};
