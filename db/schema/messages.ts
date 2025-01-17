import {pgTable, varchar, boolean, timestamp, uuid } from "drizzle-orm/pg-core";
import { dialogs } from "./dialogs";
import { users } from "./users";

export const messages = pgTable('messages', {
    ID: uuid('id').primaryKey().defaultRandom(),
    dialogID: uuid('dialog_id').references(() => dialogs.ID),
    senderID: uuid('sender_id').references(() => users.ID),
    message: varchar('message', {length: 255}).notNull(),
    is_edited: boolean('is_edited').default(false),
    is_readed: boolean('is_readed').default(false),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow()
})
