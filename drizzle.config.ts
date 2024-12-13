import { defineConfig } from "drizzle-kit";
import { env } from "@/env";

export default defineConfig({
  out: "./drizzle",
  schema: "./db/schema",
  dialect: "postgresql",
  dbCredentials: {
    url: env.database_url,
  },
});
