import {pgTable, text, varchar, boolean, timestamp, uuid, pgEnum } from "drizzle-orm/pg-core";

export const statusEnum = pgEnum('status', ['offline', 'online', 'away'])

export const users = pgTable("users", {
    id: uuid('id').primaryKey().defaultRandom(),
    firstName: varchar('first_name', {length: 50}).notNull(),
    lastName: varchar('last_name', {length: 50}).notNull(),
    nickName: varchar('nick_name', {length: 50}).notNull().unique(),
    email: varchar('email', {length: 255}).notNull().unique(),
    password: text('password').notNull(),
    avatarURL: varchar('avatar_url', {length: 255}).notNull(),
    status: statusEnum().notNull().default('online'),
    isVerified: boolean('is_verified').notNull().default(false),
    isReported: boolean('is_reported').notNull().default(false),
    isActive: boolean('is_active').notNull().default(true),
    isBlocked: boolean('is_blocked').notNull().default(false),
    createdAT: timestamp('created_at').notNull().defaultNow(),
    updatedAT: timestamp('updated_at').notNull().defaultNow()
});