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
    ID: uuid('id').primaryKey().defaultRandom(),
    userID: uuid('user_id').references(() => users.ID),
    reportedUser: uuid('reported_user_id').references(() => users.ID),
    reportType: reportEnum(),
    notes: text('notes'),
    status: statusEnum(),
    createdAt: timestamp('created_at').defaultNow(),
});