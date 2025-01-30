import {pgTable, varchar, pgEnum, boolean, timestamp, uuid } from "drizzle-orm/pg-core";
import { dialogs } from "./dialogs";
import { medias } from "./medias";
import { users } from "./users";
import { groups } from './groups'

export const messageType = pgEnum('message_type', ['text', 'media'])

export const messages = pgTable('messages', {
    id: uuid('id').primaryKey().defaultRandom(),
    dialogID: uuid('dialog_id').references(() => dialogs.id),
    groupID: uuid('group_id').references(() => groups.id),
    senderID: uuid('sender_id').notNull().references(() => users.id),
    messageType: messageType().notNull(),
    mediaID: uuid('media_id').references(() => medias.id),
    text: varchar('text', {length: 255}),
    is_edited: boolean('is_edited').notNull().default(false),
    is_readed: boolean('is_readed').notNull().default(false),
    isDeleted: boolean('is_deleted').notNull().default(false),
    createdAt: timestamp('created_at').notNull().defaultNow()
})
