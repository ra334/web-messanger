import {pgTable, text, timestamp, uuid, pgEnum } from "drizzle-orm/pg-core";
import { users } from "./users";

const reportTypes = [
    "spam",
    "abuse",
    "scam",
    "impersonation",
    "offensive",
    "fraud",
    "violence",
    "harassment",
    "nudity",
    "copyright",
    "fake"
] as const

const reportStatuses = [
    "pending",
    "in_review",
    "resolved",
    "rejected",
    "escalated",
    "closed"
] as const
  

export const reportEnum = pgEnum('report_type', reportTypes);
export const statusEnum = pgEnum('status', reportStatuses);

export const reports = pgTable("reports", {
    id: uuid('id').primaryKey().notNull().defaultRandom(),
    userID: uuid('user_id').notNull().references(() => users.id),
    reportedUserID: uuid('reported_user_id').notNull().references(() => users.id),
    reportType: reportEnum().notNull(),
    notes: text('notes').notNull(),
    status: statusEnum().notNull().default('pending'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
});