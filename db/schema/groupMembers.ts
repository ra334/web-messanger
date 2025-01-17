import {pgTable, boolean, timestamp, uuid } from "drizzle-orm/pg-core";
import { groups } from "./groups";
import { users } from "./users";

export const groupsMembers = pgTable('groups_members', {
    id: uuid('id').primaryKey().defaultRandom(),
    groupId: uuid('group_id').references(() => groups.ID),
    userId: uuid('user_id').references(() => users.ID),
    isAdmin: boolean('is_admin').default(false),
    joinedAt: timestamp('joined_at').defaultNow(),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
})