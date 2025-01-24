import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { users } from "./users";

export const tokens = pgTable("tokens", {
    id: uuid("id").primaryKey().defaultRandom(),
    userID: uuid("user_id").notNull().references(() => users.id),
    token: text("token").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    expiresAt: timestamp("expires_at").notNull(),
})
  