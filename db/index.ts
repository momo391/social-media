import { env } from "@/env";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

if (typeof env.database_url !== "string")
  throw new Error("database url not found");
const sql = neon(env.database_url);
export const db = drizzle({ client: sql });
