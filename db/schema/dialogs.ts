import {pgTable, varchar, timestamp, boolean, uuid } from "drizzle-orm/pg-core";
import { users } from "./users";

export const dialogs = pgTable('dialogs', {
    ID: uuid('id').primaryKey().defaultRandom(),
    senderID: uuid('sended_user_id').references(() => users.ID),
    receiverID: uuid('received_user_id').references(() => users.ID),
    isDeletedForSender: boolean('is_deleted_for_sender').default(false),
    isDeletedForReceiver: boolean('is_deleted_for_receiver').default(false),
    lastMessage: varchar('last_message', {length: 150}),
    createdAt: timestamp('created_at').defaultNow()
})