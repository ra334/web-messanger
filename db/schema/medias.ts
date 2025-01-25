import {pgTable, bigint, json, varchar, timestamp, uuid, pgEnum } from "drizzle-orm/pg-core";
import { users } from "./users";

export const mediaType = pgEnum('media_type', ['image', 'video', 'audio', 'file'])

export const medias = pgTable("medias", {
    id: uuid("id").primaryKey().defaultRandom(),
    userID: uuid("user_id").notNull().references(() => users.id),
    type: mediaType("type").notNull(),
    url: varchar("url", {length: 255}).notNull(),
    fileName: varchar("file_name", {length: 255}).notNull(),
    size: bigint("size", { mode: "number" }).notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    metadata: json("metadata"),
});