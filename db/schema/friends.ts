import {pgTable, varchar, timestamp, uuid } from "drizzle-orm/pg-core";
import { users } from "./users";

export const friends = pgTable('friends', {
    id: uuid('id').references(() => users.id),
    friendID: uuid('friend_id').references(() => users.id),
    firstName: varchar('first_name', {length: 45}).notNull(),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow()
})