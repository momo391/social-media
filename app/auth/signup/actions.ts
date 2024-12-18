"use server";

import { z } from "zod";
import { signUpSchema } from "./schema";
import { Session, User, userTable } from "@/db/schema/auth";
import { db } from "@/db";
import { hashPassword } from "@/lib/server/password";
import { createSession, generateSessionToken } from "@/lib/server/session";
import { setSessionTokenCookie } from "@/lib/server/cookies";
import { NeonDbError } from "@neondatabase/serverless";

export const signup = async (
  values: z.infer<typeof signUpSchema>
): Promise<SignUpResult> => {
  try {
    const user: User = {
      last_name: values.last_name,
      first_name: values.first_name,
      username: values.username,
      email: values.email,
      password: await hashPassword(values.password),
    };

    console.log("user: ", user);

    const result = await db.insert(userTable).values(user).returning({
      user_id: userTable.id,
    });

    const { user_id } = result[0];
    console.log("user id:", user_id);

    const token: string = generateSessionToken();
    console.log("token: ", token);

    const session: Session = await createSession(token, user_id);
    console.log("session :", session);

    await setSessionTokenCookie(token, session.expires_at);
    return {
      severity: undefined,
      detail: undefined,
      constraint: undefined,
    };
  } catch (err) {
    if (err instanceof NeonDbError) {
      console.log("err: ", err);
      return {
        code: err?.code,
        severity: err?.severity,
        detail: err?.detail,
        constraint: err?.constraint,
      };
    }
    return {
      code: "SERVER ERR",
    };
  }
};

export type SignUpResult = {
  severity?: string | undefined;
  detail?: string | undefined;
  constraint?: string | undefined;
  code?: string | undefined;
};
