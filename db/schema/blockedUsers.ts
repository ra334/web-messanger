import {pgTable, timestamp, uuid } from "drizzle-orm/pg-core";
import { users } from "./users";

export const blockedUsers = pgTable('blocked_users', {
    ID: uuid('id').primaryKey().defaultRandom(),
    blockerID: uuid('blocker_id').references(() => users.ID),
    createdAt: timestamp('created_at').defaultNow(),
});
