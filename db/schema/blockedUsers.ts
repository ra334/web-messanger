import {pgTable, timestamp, uuid } from "drizzle-orm/pg-core";
import { users } from "./users";

export const blockedUsers = pgTable('blocked_users', {
    id: uuid('id').primaryKey().defaultRandom(),
    blockerID: uuid('blocker_id').references(() => users.id),
    createdAt: timestamp('created_at').defaultNow(),
});
