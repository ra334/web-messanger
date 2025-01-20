import {pgTable, boolean, timestamp, uuid } from "drizzle-orm/pg-core";
import { groups } from "./groups";
import { users } from "./users";

export const groupsMembers = pgTable('groups_members', {
    id: uuid('id').primaryKey().defaultRandom(),
    groupID: uuid('group_id').notNull().references(() => groups.id),
    userID: uuid('user_id').notNull().references(() => users.id),
    isAdmin: boolean('is_admin').notNull().default(false),
    joinedAt: timestamp('joined_at').notNull().defaultNow(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
})