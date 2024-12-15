"use server";

import { z } from "zod";
import { signUpSchema } from "./schema";
import { Session, User, userTable } from "@/db/schema/auth";
import { db } from "@/db";
import { hashPassword } from "@/lib/server/password";
import { createSession, generateSessionToken } from "@/lib/server/session";
import { setSessionTokenCookie } from "@/lib/server/cookies";
import { NeonDbError } from "@neondatabase/serverless";

// export const signup = async (
//   values: z.infer<typeof signUpSchema>
// ): Promise<RegisterError> => {
//   try {
//     const user: User = {
//       email: values.email,
//       password: await hashPassword(values.password),
//       username: `${values.first_name} ${values.last_name}`,
//     };

//     console.log("created");

//     // const result = await db.insert(userTable).values(user).returning({
//     //   user_id: userTable.id,
//     // });
//     // if (result.length < 1)
//     //   return {
//     //     where: "result length lower than 1",
//     //     message: "Something went wrong",
//     //   };

//     // const { user_id } = result[0];

//     // const token: string = generateSessionToken();
//     // const session: Session = await createSession(token, user_id);
//     // if (!session)
//     //   return {
//     //     where: "session creation",
//     //     message: "Something went wrong",
//     //   };
//     // setSessionTokenCookie(user_id, session.expires_at);
//   } catch (err) {
//     if (err instanceof NeonDbError) {
//       return {
//         severity: err?.severity,
//         code: err?.code,
//         constraint: err?.constraint,
//         where: err?.where,
//       };
//     } else
//       return {
//         where: "err not instanceof NeonDbError",
//         message: "Something went wrong",
//       };
//   }

//   return {
//     severity: undefined,
//     code: undefined,
//     constraint: undefined,
//   };
// };

export const signup = async (
  values: z.infer<typeof signUpSchema>
): Promise<SignUpResult> => {
  try {
    const user: User = {
      email: values.email,
      password: await hashPassword(values.password),
      username: `${values.last_name} ${values.first_name}`,
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
      err: undefined,
    };
  } catch (err) {
    if (err instanceof NeonDbError) {
      console.log("err: ", err);
      return { err };
    }
  }

  return { err: undefined };
};

export type SignUpResult = { err: undefined } | { err: NeonDbError };
