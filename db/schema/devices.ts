import {pgTable, text, varchar, boolean, timestamp, uuid} from "drizzle-orm/pg-core";
import { users } from "./users";

export const devices = pgTable('devices', {
    id: uuid().primaryKey().defaultRandom(),
    userID: uuid().notNull().references(() => users.id),
    deviceName: varchar('device_name', {length: 255}).notNull(),
    deviceType: varchar('device_type', {length: 100}).notNull(),
    userAgent: text('user_agent').notNull(),
    isActive: boolean('is_active').notNull().default(true),
    lastAccessedAt: timestamp('last_accessed_at').notNull().defaultNow(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow()
})