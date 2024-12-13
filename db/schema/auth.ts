import { pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import type { InferInsertModel } from "drizzle-orm";

export const userTable = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  username: varchar("username", { length: 255 }).unique().notNull(),
  email: text("email").unique().notNull(),
  password: varchar("password").notNull(),
});

export const sessionTable = pgTable("sessions", {
  id: text("id").primaryKey(),
  user_id: uuid("user_id")
    .notNull()
    .references(() => userTable.id),
  expires_at: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

export type User = InferInsertModel<typeof userTable>;
export type Session = InferInsertModel<typeof sessionTable>;
