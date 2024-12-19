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

    const result = await db.insert(userTable).values(user).returning({
      user_id: userTable.id,
    });

    const { user_id } = result[0];
    const token: string = generateSessionToken();
    const session: Session = await createSession(token, user_id);

    await setSessionTokenCookie(token, session.expires_at);
    return {
      where: null,
      message: null,
    };
  } catch (err) {
    if (err instanceof NeonDbError) {
      console.log("err: ", err);

      if (err?.constraint === "users_email_unique")
        return {
          where: "email",
          message: "email already used",
        };
      if (err?.constraint === "users_username_unique")
        return {
          where: "username",
          message: "username already used",
        };
      else
        return {
          where: "Database",
          message: "Something went wrong",
        };
    }
    return {
      where: "Server",
      message: "something went wrong",
    };
  }
};

export type SignUpResult =
  | { where: string; message: string }
  | { where: null; message: null };
