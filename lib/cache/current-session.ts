import { cache } from "react";
import {
  SessionValidateResult,
  validateSessionToken,
} from "@/lib/server/session";
import { cookies } from "next/headers";

export const getCurrentSession = cache(
  async (): Promise<SessionValidateResult> => {
    const cookieStore = await cookies();
    const token: string | null = cookieStore.get("session")?.value ?? null;
    if (token === null) {
      return { session: null, user: null };
    }
    const result: SessionValidateResult = await validateSessionToken(token);
    return result;
  }
);
