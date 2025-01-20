import {pgTable, varchar, boolean, timestamp, uuid } from "drizzle-orm/pg-core";
import { dialogs } from "./dialogs";
import { users } from "./users";

export const messages = pgTable('messages', {
    id: uuid('id').primaryKey().defaultRandom(),
    dialogID: uuid('dialog_id').notNull().references(() => dialogs.id),
    senderID: uuid('sender_id').notNull().references(() => users.id),
    text: varchar('text', {length: 255}).notNull(),
    is_edited: boolean('is_edited').notNull().default(false),
    is_readed: boolean('is_readed').notNull().default(false),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow()
})
