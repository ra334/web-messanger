import {pgTable, integer, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const groups = pgTable('groups', {
    ID: uuid('id').primaryKey().defaultRandom(),
    name: text('name').notNull(),
    description: text('description').notNull(),
    membersCount: integer('members_count').default(0),
    createdAt: timestamp('created_at').defaultNow(),
})