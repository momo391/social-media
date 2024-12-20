import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import type { InferInsertModel } from "drizzle-orm";
import { userTable } from "./auth";

export const postTable = pgTable("posts", {
  id: uuid("id").primaryKey().defaultRandom(),
  content: text("content"),
  image: text("image"),
  user_id: uuid("user_id").references(() => userTable.id),
});

export const commentTable = pgTable("comments", {
  id: uuid("id").primaryKey().defaultRandom(),
  content: text("content").notNull(),
  image: text("image"),
  user_id: uuid("user_id").references(() => userTable.id),
  post_id: uuid("post_id").references(() => postTable.id),
});

export const likeTable = pgTable("likes", {
  id: uuid("id").primaryKey().defaultRandom(),
  user_id: uuid("user_id").references(() => userTable.id),
  post_id: uuid("post_id").references(() => postTable.id),
});

export const messageTable = pgTable("messages", {
  id: uuid("id").primaryKey().defaultRandom(),
  content: text("content").notNull(),
  sender: uuid("sender").references(() => userTable.id),
  receiver: uuid("receiver").references(() => userTable.id),
});

export const followTable = pgTable("follows", {
  id: uuid("id").primaryKey().defaultRandom(),
  follower: uuid("follower").references(() => userTable.id),
  followed: uuid("followed").references(() => userTable.id),
});

export type Post = InferInsertModel<typeof postTable>;
export type Comment = InferInsertModel<typeof commentTable>;
export type Like = InferInsertModel<typeof likeTable>;
export type Message = InferInsertModel<typeof messageTable>;
export type Follow = InferInsertModel<typeof followTable>;
