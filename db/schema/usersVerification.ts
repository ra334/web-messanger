import {pgTable, varchar, timestamp, boolean, uuid } from "drizzle-orm/pg-core";
import { users } from "./users";

export const userVerifications = pgTable('user_verifications', {
    userId: uuid('user_id').references(() => users.ID),
    verificationCode: varchar('verification_code', {length: 45}).notNull(),
    isUsed: boolean('is_used').default(false),
    createdAt: timestamp('created_at').defaultNow(),
})