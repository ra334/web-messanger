import {pgTable, varchar, timestamp, boolean, uuid } from "drizzle-orm/pg-core";
import { users } from "./users";

export const userVerifications = pgTable('user_verifications', {
    userID: uuid('user_id').notNull().references(() => users.id),
    verificationCode: varchar('verification_code', {length: 45}).notNull(),
    isUsed: boolean('is_used').notNull().default(false),
    createdAt: timestamp('created_at').notNull().defaultNow(),
})