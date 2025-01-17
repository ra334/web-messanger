import {pgTable, text, varchar, boolean, timestamp, uuid, pgEnum } from "drizzle-orm/pg-core";

export const statusEnum = pgEnum('status', ['offline', 'online', 'away'])

export const users = pgTable("users", {
    ID: uuid('id').primaryKey().defaultRandom(),
    firstName: varchar('first_name', {length: 50}).notNull(),
    lastName: varchar('last_name', {length: 50}).notNull(),
    username: varchar('username', {length: 50}).notNull().unique(),
    email: varchar('email', {length: 255}).notNull().unique(),
    password: text('password').notNull(),
    avatarURL: varchar('avatar_url', {length: 255}),
    status: statusEnum(),
    is_verified: boolean('is_verified').default(false),
    is_reported: boolean('is_reported').default(false),
    is_active: boolean('is_active').default(true),
    is_blocked: boolean('is_blocked').default(false),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow()
});