import { pgTable, uuid, text } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name"),
  email: text("email"),
  passowrd: text("passowrd"),
});
