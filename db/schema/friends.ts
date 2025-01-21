import {pgTable, varchar, timestamp, uuid } from "drizzle-orm/pg-core";
import { users } from "./users";

export const friends = pgTable('friends', {
    id: uuid('id').primaryKey().defaultRandom(),
    userID: uuid('user_id').references(() => users.id).notNull(),
    friendID: uuid('friend_id').references(() => users.id).notNull(),
    firstName: varchar('first_name', {length: 45}).notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
})