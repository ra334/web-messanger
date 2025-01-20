import {pgTable, varchar, timestamp, boolean, uuid } from "drizzle-orm/pg-core";
import { users } from "./users";

export const dialogs = pgTable('dialogs', {
    id: uuid('id').primaryKey().notNull().defaultRandom(),
    senderID: uuid('sended_user_id').notNull().references(() => users.id),
    receiverID: uuid('received_user_id').notNull().references(() => users.id),
    isDeletedForSender: boolean('is_deleted_for_sender').notNull().default(false),
    isDeletedForReceiver: boolean('is_deleted_for_receiver').notNull().default(false),
    lastMessage: varchar('last_message', {length: 150}).notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow()
})