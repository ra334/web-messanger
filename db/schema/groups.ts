import {pgTable, integer, varchar, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { users } from '@/db/schema/users'

export const groups = pgTable('groups', {
    id: uuid('id').primaryKey().defaultRandom(),
    creatorID: uuid('creator_id').notNull().references(() => users.id),
    name: text('name').notNull(),
    description: text('description'),
    avatarURL: varchar('avatar_url', { length: 255 }).notNull(),
    membersCount: integer('members_count').default(1).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
})