import {pgTable, varchar, timestamp, uuid } from "drizzle-orm/pg-core";
import { users } from "./users";

export const dialogs = pgTable('dialogs', {
    ID: uuid('id').primaryKey().defaultRandom(),
    sendedUserID: uuid('sended_user_id').references(() => users.ID),
    receivedUserID: uuid('received_user_id').references(() => users.ID),
    lastMessage: varchar('last_message', {length: 150}),
    createdAt: timestamp('created_at').defaultNow()
})