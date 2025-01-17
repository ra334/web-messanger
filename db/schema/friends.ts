import {pgTable, varchar, timestamp, uuid } from "drizzle-orm/pg-core";
import { users } from "./users";

export const friends = pgTable('friends', {
    ID: uuid('id').references(() => users.ID),
    friendID: uuid('friend_id').references(() => users.ID),
    firstName: varchar('first_name', {length: 45}).notNull(),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow()
})