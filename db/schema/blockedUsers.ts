import {pgTable, timestamp, uuid } from "drizzle-orm/pg-core";
import { users } from "./users";

export const blockedUsers = pgTable('blocked_users', {
    id: uuid('id').primaryKey().notNull().defaultRandom(),
    blockedID: uuid('blocker_id').notNull().references(() => users.id),
    createdAt: timestamp('created_at').notNull().defaultNow(),
});
